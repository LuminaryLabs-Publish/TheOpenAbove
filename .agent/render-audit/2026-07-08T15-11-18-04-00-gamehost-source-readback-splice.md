# Render Audit — GameHost Source Readback Splice

**Timestamp:** `2026-07-08T15-11-18-04-00`

## Intent

Define the render/host readback contract for the next implementation without changing current Three.js visuals.

The issue is not that the route fails to render. The issue is that source/config/runtime agreement is not visible from the host surface.

## Current render host

```txt
src/main.js
  -> create THREE.Scene
  -> create THREE.PerspectiveCamera
  -> create THREE.WebGLRenderer
  -> build terrain, lakes, trees, clouds, wind ribbons
  -> build hot-air-balloon object
  -> update route state
  -> draw camera
  -> renderer.render(scene, camera)
  -> update HUD
  -> expose window.GameHost
```

## Current GameHost shape

```txt
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
}
```

This is useful for live debugging, but it does not expose:

```txt
product source
balloon drift config source
README/package/campaign parity
source fingerprint
source snapshot
acceptance rows
route object descriptors
altitude band descriptors
wind lane hints
fixture status
```

## Required additive source readback

The next implementation should preserve the existing `local` and `nexusEngine` keys and add a new `source` key.

```txt
window.GameHost.getState()
  -> local       existing live balloon telemetry
  -> nexusEngine existing NexusEngine resource snapshot
  -> source      new source-authority readback
```

Target shape:

```js
{
  local: { /* existing snapshot shape */ },
  nexusEngine: { /* existing telemetry kit shape */ },
  source: {
    product: OPEN_ABOVE_PRODUCT,
    balloonDrift: BALLOON_DRIFT.summary,
    fingerprint,
    snapshot,
    acceptanceLedger,
    altitudeBands,
    routeObjects,
    windLaneHints,
    fixtureStatus,
    preservedShapes: {
      local: true,
      nexusEngine: true
    }
  }
}
```

## Render contract

Do not change these in the source readback pass:

```txt
scene background / fog
camera FOV and clipping
renderer pixel ratio
shadow settings
tone mapping and exposure
terrain mesh generation
lake discs
tree scatter count
cloud puff scatter
wind ribbon geometry
hot-air-balloon geometry
burner/rigging animation
basket-follow camera tuning
first-person blend tuning
HUD visual layout
```

## Readback services to add

```txt
createGameHostSourceReadback(input)
  input:
    product
    balloonDrift
    altitudeBands
    routeObjects
    windLaneHints
    fingerprint
    snapshot
    acceptanceLedger
    fixtureStatus
    localSnapshotShape
    nexusSnapshotShape

  output:
    serializable source readback object
```

```txt
projectPreservedShapeStatus(input)
  verifies:
    existing local snapshot keys remain present
    existing nexusEngine snapshot remains reachable
    source diagnostics are additive
```

## Fixture expectations

```txt
gamehost_reports_balloon_source_snapshot
existing_local_snapshot_shape_preserved
existing_nexus_snapshot_shape_preserved
source_fingerprint_reports_copy_config_runtime_markers
source_snapshot_reports_visual_object_kit
```

## Stop condition

Stop before render extraction. The next pass is complete when a DOM-free fixture can create the source readback object and the browser route can expose it additively through `window.GameHost.getState().source`.
