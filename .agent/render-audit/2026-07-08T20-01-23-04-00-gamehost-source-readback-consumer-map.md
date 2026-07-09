# Render Audit — GameHost Source Readback Consumer Map

**Timestamp:** `2026-07-08T20-01-23-04-00`

## Current render surface

```txt
src/main.js
  -> new THREE.Scene()
  -> fog/background/lights
  -> terrain plane with vertex colors
  -> lake discs
  -> procedural tree groups
  -> cloud groups
  -> wind ribbon lines
  -> hot-air-balloon object group
  -> perspective camera
  -> WebGLRenderer
  -> animation frame loop
```

## Current GameHost readback

`window.GameHost.getState()` currently returns:

```txt
{
  nexusEngine: engine.openAbove?.getState?.(),
  local: snapshot()
}
```

This is useful for runtime telemetry, but not yet useful for product/source proof.

## Missing source readback fields

```txt
source.product
source.packageDescription
source.campaignRoute
source.balloonDriftConfig
source.sourceManifest
source.sourceFingerprint
source.sourceSnapshot
source.acceptanceLedger
source.altitudeBands
source.routeObjects
source.windLaneHints
source.fixtureStatus
source.runtimeConsumerVersion
```

## Consumer splice target

The source pass should add readback without changing render behavior:

```txt
window.GameHost.getState()
  -> local: unchanged existing balloon runtime snapshot
  -> nexusEngine: unchanged existing NexusEngine telemetry snapshot
  -> source: new additive source-authority readback
```

## Renderer systems to leave untouched next

```txt
terrain geometry generation
lake disc generation
tree scatter mesh generation
cloud puff mesh generation
wind ribbon line generation
balloon object construction
balloon visual animation
camera blend
first-person visibility / rope fade
HUD wording until source copy pass is implemented
```

## Render fixture rows to add

```txt
existing_local_snapshot_shape_preserved
existing_nexus_snapshot_shape_preserved
gamehost_source_readback_added_without_render_mutation
source_fingerprint_available_from_gamehost
source_snapshot_available_from_gamehost
source_acceptance_ledger_available_from_gamehost
camera_zoom_and_first_person_blend_still_reported
balloon_object_type_still_hot_air_balloon
```

## Current render risk

The main render risk is accidental behavior drift while moving constants into source modules.

The next implementation should mirror constants from `src/main.js` into `BALLOON_DRIFT` first, prove parity in fixtures, then use those constants in the runtime only after fixture proof exists.
