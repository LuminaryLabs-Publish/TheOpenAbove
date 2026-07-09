# Render Audit — GameHost Source Readback Ledger Map

**Timestamp:** `2026-07-09T00-40-20-04-00`

## Render surface

`TheOpenAbove` has a live visual/render surface.

```txt
Three.js WebGLRenderer
PerspectiveCamera
Fog + lights
Generated terrain mesh
Generated lake discs
Generated tree groups
Generated cloud groups
Generated wind ribbon lines
Procedural hot-air-balloon object kit
HUD DOM projection
window.GameHost debug projection
```

## Current render consumer chain

```txt
src/main.js
  -> makeTerrain / makeLakes / makeTrees / makeClouds / makeWindRibbons
  -> buildHotAirBalloon
  -> update(dt)
  -> draw(dt)
  -> renderer.render(scene, camera)
  -> updateHud()
  -> window.GameHost.getState()
```

## Current GameHost readback

```txt
window.GameHost.getState() currently returns:
  nexusEngine: engine.openAbove?.getState?.()
  local: snapshot()
```

## Missing render/readback diagnostics

```txt
No source field on GameHost state.
No route/source fingerprint on GameHost state.
No product/config/runtime mismatch rows on GameHost state.
No object-kit readback ledger on GameHost state.
No camera default/source parity row.
No fixture-readable confirmation that source diagnostics are additive only.
```

## Render facts to preserve

```txt
renderer antialias stays enabled.
renderer pixel ratio cap stays min(devicePixelRatio, 1.65).
ACES filmic tone mapping stays active.
scene fog and lighting stay untouched.
balloon group stays built by buildHotAirBalloon().
first-person blend stays driven by wheel zoom.
rope fade and envelope visibility remain unchanged.
HUD copy remains compatible during source-readback pass.
```

## Browser consumer fixture target

```txt
GameHost.getState().source.routeId === "balloon-drift"
GameHost.getState().source.objectType === "hot-air-balloon"
GameHost.getState().source.manifest.consumers includes README/package/campaign/runtime/object-kit/smoke/gamehost
GameHost.getState().source.acceptance contains legacy_free_flight_copy_mismatch rows until product copy is corrected
GameHost.getState().local shape is unchanged
GameHost.getState().nexusEngine shape is unchanged
```

## Do not change during this ledge

```txt
Do not alter render resolution, camera position, model scale, terrain, clouds, trees, wind ribbons, or HUD layout.
Do not extract renderer systems.
Do not replace the procedural balloon object.
```
