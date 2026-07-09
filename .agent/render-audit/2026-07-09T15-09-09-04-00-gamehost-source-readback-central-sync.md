# Render Audit — GameHost Source Readback Central Sync

**Timestamp:** `2026-07-09T15-09-09-04-00`

## Current render surface

```txt
src/main.js
  -> create Three.Scene
  -> create PerspectiveCamera
  -> create WebGLRenderer
  -> create terrain mesh from terrainHeight / terrainColor
  -> create lake circles
  -> create tree groups
  -> create cloud puff groups
  -> create wind ribbon line groups
  -> buildHotAirBalloon()
  -> update balloon position and animation
  -> draw basket/third-person camera blend
  -> renderer.render(scene, camera)
```

## Current GameHost readback

```txt
window.GameHost.getState() returns:
  local: snapshot()
  nexusEngine: engine.openAbove?.getState?.()
```

The existing readback covers route status, region, object type, elapsed time, altitude, burner, vent, wind speed, drift distance, camera zoom, first-person blend, position, velocity, wind, and message.

## Render-relevant source gaps

```txt
GameHost does not expose source status.
GameHost does not expose README/package/campaign/runtime parity.
GameHost does not expose hot-air-balloon object-kit metadata beyond runtime object references.
GameHost does not expose source fingerprint.
GameHost does not expose source consumer ledger rows.
No browser consumer fixture reads the same source fields expected by central docs.
```

## Render recommendation

Do not change visual output next.

The next source pass should only add source readback projection:

```txt
window.GameHost.getState().source = {
  product,
  route,
  objectType,
  controls,
  cameraMode,
  sourceStatus,
  sourceFingerprint,
  objectKit,
  consumers,
  acceptanceRows
}
```

## Must preserve

```txt
window.GameHost.getState().local
window.GameHost.getState().nexusEngine
Three.js scene object
balloon object
renderer object
camera object
current balloon motion constants
current basket camera blend
current HUD text behavior
```

## Fixture implication

The source fixture should not require `canvas`, `window`, `document`, Three.js, WebGL, or NexusEngine. Browser readback should consume the same source ledger data through an additive adapter.
