# Render Audit — GameHost Source Fixture Readback

**Timestamp:** `2026-07-08T17-31-22-04-00`

## Summary

The visual route already renders the balloon-drift experience through `src/main.js`, Three.js, and the hot-air-balloon object kit. The render blocker is not a missing scene pass; it is missing source readback that proves the scene belongs to the canonical balloon product/config route.

## Current render loop

```txt
src/main.js
  -> create THREE.Scene
  -> create PerspectiveCamera
  -> create WebGLRenderer
  -> create sun + hemisphere lighting
  -> makeTerrain(scene)
  -> makeLakes(scene)
  -> makeTrees(scene)
  -> makeClouds(scene)
  -> makeWindRibbons(scene)
  -> buildHotAirBalloon()
  -> update balloon drift state
  -> animateHotAirBalloon(balloon, performance.now(), state.burner)
  -> draw basket/third-person camera blend
  -> set first-person visibility and rope fade
  -> renderer.render(scene, camera)
  -> updateHud()
  -> expose window.GameHost.getState().local and .nexusEngine
```

## Current render-backed facts

```txt
page title/HUD route: The Open Above: Balloon Drift
main object type: hot-air-balloon
telemetry kit id: open-above-balloon-telemetry-kit
Nexus runtime marker: Nexus Engine Realtime Core
camera modes: basket view / third person
controls projected in HUD: burner, vent, scroll zoom
visual domains present: terrain, lakes, trees, clouds, wind ribbons, balloon, basket, rigging, burner, rope
```

## Missing readback

```txt
window.GameHost.getState().source is absent.
window.GameHost.getState().source.product is absent.
window.GameHost.getState().source.driftConfig is absent.
window.GameHost.getState().source.fingerprint is absent.
window.GameHost.getState().source.snapshot is absent.
window.GameHost.getState().source.acceptanceLedger is absent.
window.GameHost.getState().source.routeObjects is absent.
window.GameHost.getState().source.altitudeBand is absent.
window.GameHost.getState().source.windLaneHints is absent.
window.GameHost.getState().source.fixtureStatus is absent.
```

## Required additive readback shape

```txt
window.GameHost.getState()
  -> nexusEngine: existing shape preserved
  -> local: existing shape preserved
  -> source:
       product
       driftConfig
       fingerprint
       snapshot
       acceptanceLedger
       routeObjects
       altitudeBand
       windLaneHints
       fixtureStatus
       compatibility
```

## Source readback acceptance rows

```txt
existing_local_snapshot_shape_preserved:
  local.status
  local.region
  local.objectType
  local.elapsed
  local.altitude
  local.burner
  local.vent
  local.windSpeed
  local.distance
  local.cameraZoom
  local.firstPersonBlend
  local.position
  local.velocity
  local.wind
  local.message

existing_nexus_snapshot_shape_preserved:
  nexusEngine.status
  nexusEngine.region
  nexusEngine.objectType
  nexusEngine.altitude
  nexusEngine.windSpeed
  nexusEngine.burner

gamehost_reports_balloon_source_snapshot:
  source.product.currentRoute == balloon-drift
  source.snapshot.objectType == hot-air-balloon
  source.snapshot.visualObjectKit == open-above-hot-air-balloon-object-kit
  source.snapshot.runtimeConsumer == src/main.js
  source.fixtureStatus.sourceFixture == pass after fixture integration
```

## Why this should precede renderer extraction

Renderer/world/camera extraction would multiply seams before the product route is source-authoritative. The safer ledge is to keep the current render frame stable and add readback proof that the current frame consumes the current source manifest.

## Stop line

Do not touch Three.js materials, terrain geometry, cloud count, wind ribbons, camera constants, or balloon object geometry during this readback ledge unless a fixture row explicitly requires a no-op marker.
