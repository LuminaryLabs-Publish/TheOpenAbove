# Render Audit — GameHost Source Consumer Readback

**Timestamp:** `2026-07-09T17-58-53-04-00`

## Current visual surface

The render surface is a single full-screen Three.js canvas with a compact HUD and error panel.

`src/main.js` creates the renderer, terrain, lakes, trees, clouds, wind ribbons, hot-air-balloon object, camera, lights, HUD projection, and GameHost readback.

## Render loop

```txt
update(dt)
  -> mutates balloon state and world animation inputs
  -> engine.tick(dt)
  -> draw(dt)
  -> camera blend resolves third-person or basket view
  -> setFirstPersonVisibility() fades rigging ropes
  -> renderer.render(scene, camera)
  -> updateHud()
```

## Current readback

```txt
window.GameHost.getState().local
window.GameHost.getState().nexusEngine
```

## Missing readback

```txt
window.GameHost.getState().source
```

The next implementation should add source readback as an additive field only. Do not change existing `local` or `nexusEngine` snapshot shapes.

## Do not do next

```txt
Do not split the renderer yet.
Do not retune camera constants.
Do not replace terrain, lakes, trees, clouds, or wind ribbons.
Do not rewrite HUD projection.
Do not modify balloon visual profile.
```
