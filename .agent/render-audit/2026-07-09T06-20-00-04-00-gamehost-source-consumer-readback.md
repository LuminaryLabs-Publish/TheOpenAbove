# Render Audit — GameHost Source Consumer Readback

**Timestamp:** `2026-07-09T06-20-00-04-00`

## Current visual surface

```txt
src/main.js
  -> creates Three.js scene, fog, camera, renderer, sun, hemisphere light
  -> creates terrain, lakes, trees, clouds, wind ribbons
  -> builds procedural hot-air-balloon object
  -> updates balloon state every frame
  -> draws third-person / basket camera blend
  -> renders with renderer.render(scene, camera)
  -> writes HUD telemetry
```

## Current readback surface

```txt
window.GameHost.getState()
  local: snapshot()
  nexusEngine: engine.openAbove.getState()
```

`local` and `nexusEngine` are useful for runtime telemetry, but neither says whether the source files agree with the actual rendered product.

## Render authority gap

The route visually renders Balloon Drift, but the source layer still contains free-flight language.

The render readback should not mutate visuals. It should report source state:

```txt
window.GameHost.getState().source
  productId
  currentRoute
  objectType
  activeRuntimeFile
  sourceConsumerLedgerStatus
  copyParity
  packageParity
  campaignParity
  legacyFlightCompatibility
  visualObjectKitId
  fixtureStatus
```

## Required render fixture rows

```txt
renders_hot_air_balloon_route
keeps_local_snapshot_shape
keeps_nexus_engine_snapshot_shape
adds_source_snapshot_without_visual_mutation
reports_object_kit_metadata
reports_basket_camera_default
reports_legacy_flight_as_compatibility_only
reports_campaign_copy_mismatch_until_fixed
reports_package_description_mismatch_until_fixed
```

## Next implementation boundary

Add `GameHostSourceReadback` and `SourceReadbackProjection` as additive data only.

Do not change:

```txt
camera position
camera blend
rope fade
ride bob
burner vibration
balloon model
terrain / lake / tree / cloud / wind-ribbon render output
HUD wording
```
