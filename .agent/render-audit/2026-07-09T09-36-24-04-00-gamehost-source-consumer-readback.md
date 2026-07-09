# Render Audit — GameHost Source Consumer Readback

**Timestamp:** `2026-07-09T09-36-24-04-00`

## Render surface

`TheOpenAbove` has a visual/render surface. The current route renders a Three.js scene directly from `src/main.js`.

## Current render loop

```txt
createGame()
  -> new THREE.Scene()
  -> new THREE.PerspectiveCamera(...)
  -> new THREE.WebGLRenderer({ canvas })
  -> makeTerrain(scene)
  -> makeLakes(scene)
  -> makeTrees(scene)
  -> makeClouds(scene)
  -> makeWindRibbons(scene)
  -> buildHotAirBalloon()
  -> requestAnimationFrame(frame)
  -> update(dt)
  -> engine.tick(dt)
  -> draw(dt)
  -> updateHud()
```

## Render consumers

```txt
terrain consumer:
  consumes WORLD.terrainSize, WORLD.terrainSegments, terrainHeight, terrainColor, moistureAt

lake consumer:
  consumes inline lake descriptors and water material

tree consumer:
  consumes WORLD.treeCount, seeded random, terrainHeight, moistureAt

cloud consumer:
  consumes seeded random, translucent puff material, inline cloud count/profile

wind-ribbon consumer:
  consumes inline ribbon counts, line material, live state.position offsets

balloon visual consumer:
  consumes hot-air-balloon object kit and sub-kit metadata

camera consumer:
  consumes wind direction, camera zoom, first-person blend, basket focus, ride bob/sway/vibration

hud consumer:
  consumes burner state, camera mode, altitude, wind speed, distance, route message

GameHost consumer:
  exposes local and Nexus telemetry, but not source/readback diagnostics yet
```

## Render risk

The render route is playable and should not be retuned in the next pass. The real risk is that visual behavior cannot yet be proven against the source ledger.

## Required next readback

```txt
window.GameHost.getState().source.routeId
window.GameHost.getState().source.productName
window.GameHost.getState().source.objectType
window.GameHost.getState().source.controls
window.GameHost.getState().source.cameraModes
window.GameHost.getState().source.runtimeConstants
window.GameHost.getState().source.objectKit.id
window.GameHost.getState().source.objectKit.subdomains
window.GameHost.getState().source.fingerprint
window.GameHost.getState().source.acceptanceRows
window.GameHost.getState().source.consumerLedger
```

## Defer

Do not extract `makeTerrain`, `makeTrees`, `makeClouds`, `draw`, or HUD rendering before the source/readback fixture exists.