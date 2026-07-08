# Render Audit — GameHost Source Diagnostics Contract

**Timestamp:** `2026-07-08T17-21-32-04-00`

## Current render surface

```txt
index.html
  -> canvas#game
  -> aside#hud
  -> pre#error
  -> src/main.js
  -> Three.js WebGLRenderer
  -> scene/camera/balloon/world objects
  -> renderer.render(scene, camera)
```

## Current visual route

The live route is already a hot-air-balloon scene:

```txt
terrain mesh
lakes
trees
clouds
wind ribbons
procedural hot-air-balloon object
basket-follow / first-person camera blend
HUD telemetry
```

## Current host diagnostics

`window.GameHost.getState()` currently exposes:

```txt
nexusEngine: engine.openAbove.getState()
local: snapshot()
```

The local snapshot currently contains:

```txt
status
region
objectType
elapsed
altitude
burner
vent
windSpeed
distance
cameraZoom
firstPersonBlend
position
velocity
wind
message
```

## Gap

The renderer and route are usable, but the host has no source-level diagnostics proving the runtime matches the intended product/config source.

Missing additive source branch:

```txt
window.GameHost.getState().source.product
window.GameHost.getState().source.config
window.GameHost.getState().source.fingerprint
window.GameHost.getState().source.snapshot
window.GameHost.getState().source.acceptanceLedger
window.GameHost.getState().source.altitudeBand
window.GameHost.getState().source.routeObjects
window.GameHost.getState().source.windLaneHints
window.GameHost.getState().source.fixtureStatus
```

## Contract for next implementation

```txt
Do not change renderer visuals first.
Do not remove local/nexusEngine state branches.
Add source diagnostics as a third branch.
Make source diagnostics serializable.
Make source diagnostics independent from WebGL object identity.
Make source diagnostics fixture-readable without DOM.
```

## GameHost source readback shape

```txt
{
  local: existingLocalSnapshot,
  nexusEngine: existingNexusSnapshot,
  source: {
    product,
    config,
    fingerprint,
    snapshot,
    acceptanceLedger,
    altitudeBand,
    routeObjects,
    windLaneHints,
    fixtureStatus
  }
}
```

## Renderer acceptance rows

```txt
existing_local_snapshot_shape_preserved
existing_nexus_snapshot_shape_preserved
gamehost_reports_balloon_source_snapshot
source_snapshot_reports_visual_object_kit
source_fingerprint_reports_copy_config_runtime_markers
altitude_band_matches_local_altitude
wind_lane_hints_match_route_objects
```

## Main finding

`GameHost` is the right first render/host seam. Additive source diagnostics will make the current visual route inspectable without forcing renderer extraction or changing the balloon scene.
