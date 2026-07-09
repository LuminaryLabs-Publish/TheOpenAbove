# Render Audit — GameHost Source Readback Consumer Map

**Timestamp:** `2026-07-09T14-58-42-04-00`

## Visual/render surface

`TheOpenAbove` has a direct Three.js browser render surface in `src/main.js`.

```txt
canvas#game
  -> WebGLRenderer
  -> PerspectiveCamera
  -> fog / sun / hemisphere light
  -> terrain mesh with vertex colors
  -> lake circles
  -> procedural tree groups
  -> cloud puff groups
  -> wind ribbon lines
  -> procedural hot-air-balloon object
  -> renderer.render(scene, camera)
```

## Render-owned services

```txt
makeTerrain
makeLakes
makeTrees
makeClouds
makeWindRibbons
buildHotAirBalloon
animateHotAirBalloon
setFirstPersonVisibility
draw
updateHud
```

## Render findings

The renderer is stable enough to leave alone next. The missing render proof is readback, not fidelity: the browser route should expose `window.GameHost.getState().source` so a fixture or live inspector can determine which source records the renderer is consuming.

## Deferred render work

```txt
Do not extract terrain generation.
Do not extract camera blend.
Do not retune fog, lighting, clouds, trees, wind ribbons, or balloon profile.
Do not alter object kit geometry.
```

## Next render-safe contract

```txt
Existing GameHost fields remain:
  local
  nexusEngine

Additive field planned:
  source
    product route
    current object type
    source mismatch status
    copy/config/runtime fingerprints
    object-kit metadata
    source consumer ledger rows
```
