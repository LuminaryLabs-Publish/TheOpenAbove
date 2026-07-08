# Render Audit — GameHost Source Readback

**Timestamp:** `2026-07-08T11-49-04-04-00`

## Summary

The render loop currently draws the correct balloon route and writes useful HUD text, but render/source parity is not fixture-readable. `window.GameHost.getState()` exposes local and Nexus balloon telemetry, but not product copy, source fingerprint, config provenance, route-object state, altitude-band state, fixture status, or source acceptance rows.

## Current render surface

```txt
canvas#game
  -> THREE.WebGLRenderer
  -> PerspectiveCamera
  -> terrain mesh
  -> lake discs
  -> tree groups
  -> cloud groups
  -> wind ribbon line group
  -> hot-air-balloon object group
  -> HUD aside#hud
  -> pre#error
```

## Current render ownership

```txt
src/main.js owns:
  renderer construction
  camera construction
  fog and lights
  world geometry generation
  balloon object mounting
  wind ribbon animation
  camera blend and basket focus
  first-person visibility fade
  HUD string construction
  window.GameHost projection
```

## Existing GameHost readback

Current shape:

```js
window.GameHost = {
  engine,
  NexusEngine,
  scene,
  renderer,
  camera,
  balloon,
  getState: () => ({
    nexusEngine: engine.openAbove?.getState?.(),
    local: snapshot()
  })
};
```

That is good for runtime debugging, but insufficient for source acceptance because it cannot prove that `README.md`, `package.json`, `campaign.config.js`, and inline runtime constants agree.

## Required additive readback

Add this without changing current visual behavior:

```txt
window.GameHost.getState().source.product
window.GameHost.getState().source.config
window.GameHost.getState().source.fingerprint
window.GameHost.getState().source.snapshot
window.GameHost.getState().source.acceptanceLedger
window.GameHost.getState().source.routeObjects
window.GameHost.getState().source.altitudeBand
window.GameHost.getState().source.windLaneHints
window.GameHost.getState().source.fixtureStatus
```

## Source readback contract

```txt
GameHostSourceReadback
  product:
    id
    title
    currentRoute
    vehicle
    controls
    objectiveShape
    legacyCompatibility
  config:
    seed
    driftDefaults
    windDefaults
    altitudeSafety
    cameraDefaults
  fingerprint:
    productCopyHash
    packageDescriptionHash
    campaignRouteHash
    runtimeConfigHash
    routeObjectHash
    generatedAtFrame
  snapshot:
    routeId
    regionId
    objectType
    altitudeBandId
    activeRouteObjectId
    windLaneHintId
    compatibilityFlightPresent
  acceptanceLedger:
    rows[]
    passed
    failed
    blocked
```

## Render parity rows

```txt
gamehost_local_snapshot_still_present
nexus_engine_snapshot_still_present
source_readback_present
source_readback_product_is_balloon_drift
source_readback_marks_legacy_flight_compatibility_only
source_readback_reports_runtime_config_defaults
source_readback_reports_altitude_band
source_readback_reports_route_object_candidates
source_readback_reports_fixture_status
hud_text_and_source_product_agree
```

## Reason catalog

```txt
accepted.product.current_route_matches_runtime
accepted.config.inline_constants_mirrored
accepted.gamehost.source_snapshot_present
accepted.hud.copy_matches_product
rejected.product.copy_still_free_flight
rejected.package.description_still_free_flight
rejected.campaign.current_region_still_thermal_gate_route
rejected.config.missing_balloon_drift
rejected.gamehost.source_missing
blocked.dom_free_fixture_not_implemented
blocked.browser_only_renderer_dependency
```

## Do not change yet

```txt
Do not move renderer setup out of src/main.js first.
Do not alter camera composition.
Do not replace balloon object geometry.
Do not remove the legacy local/nexus GameHost state keys.
Do not remove FLIGHT until compatibility-only status is proven by fixture rows.
```

## Next readback gate

```txt
SourceAcceptanceLedger rows should be readable from both:
  - DOM-free fixture output
  - window.GameHost.getState().source.acceptanceLedger
```
