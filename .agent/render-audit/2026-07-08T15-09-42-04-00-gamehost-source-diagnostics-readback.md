# TheOpenAbove GameHost Source Diagnostics Readback

**Timestamp:** `2026-07-08T15-09-42-04-00`

## Render surface status

`TheOpenAbove` has a live visual/render surface:

```txt
canvas#game
Three.js WebGLRenderer
procedural terrain / lakes / trees / clouds / wind ribbons
procedural hot-air-balloon object kit family
basket-follow camera
wheel zoom / first-person blend
HUD DOM telemetry
window.GameHost diagnostics
```

## Current render loop

```txt
createGame()
  -> create scene / camera / renderer
  -> makeTerrain(scene)
  -> makeLakes(scene)
  -> makeTrees(scene)
  -> makeClouds(scene)
  -> makeWindRibbons(scene)
  -> buildHotAirBalloon()
  -> update(dt)
  -> engine.tick(dt)
  -> draw(dt)
  -> updateHud()
  -> requestAnimationFrame(frame)
```

## Main render finding

The renderer should remain stable during the next pass.

The next implementation should only add source diagnostics beside the existing render path. The existing visual output should not be retuned while the source fixture queue is being built.

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

## Missing source diagnostics shape

Add this additively:

```txt
window.GameHost.getState().source = {
  product,
  balloonDrift,
  sourceFingerprint,
  sourceSnapshot,
  acceptanceLedger,
  altitudeBands,
  routeObjects,
  windLaneHints,
  fixtureStatus
}
```

## Source diagnostics must preserve

```txt
window.GameHost.getState().local
window.GameHost.getState().nexusEngine
window.GameHost.scene
window.GameHost.renderer
window.GameHost.camera
window.GameHost.balloon
burner / vent input behavior
wheel zoom behavior
basket-follow camera behavior
first-person visibility behavior
HUD string content unless intentionally updated for source parity
```

## Render-readback records to fixture

```txt
01_canvas_route_present
02_renderer_identity_three_webgl
03_balloon_object_kit_present
04_balloon_subdomains_present
05_gamehost_local_snapshot_preserved
06_gamehost_nexus_snapshot_preserved
07_gamehost_source_snapshot_added
08_camera_zoom_blend_preserved
09_first_person_visibility_preserved
10_hud_balloon_drift_text_preserved_or_source_matched
```

## Render extraction deferred

Do not extract these before source authority passes:

```txt
terrain renderer
lake renderer
tree scatter renderer
cloud scatter renderer
wind-ribbon renderer
balloon renderer
camera renderer
HUD renderer
Nexus telemetry runtime kit
```

## Next render-safe implementation

```txt
source modules
  -> source fixture
  -> source diagnostics projection
  -> GameHost source readback
  -> local/nexus snapshot preservation smoke
  -> then renderer/world/camera extraction planning
```