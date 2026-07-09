# Render Audit — GameHost Source Readback Consumer Freeze

**Timestamp:** `2026-07-09T11-50-08-04-00`

## Render surface

`TheOpenAbove` has a visual/render surface.

```txt
canvas#game
  -> Three.WebGLRenderer
  -> scene background and fog
  -> terrain plane vertex colors
  -> lake circles
  -> scatter trees
  -> cloud groups
  -> wind ribbons
  -> hot-air-balloon object kit
  -> basket/first-person camera blend
  -> renderer.render(scene, camera)
```

## Current render loop

```txt
frame(now)
  -> update(dt)
  -> engine.tick(dt)
  -> draw(dt)
  -> updateHud()
  -> requestAnimationFrame(frame)
```

`draw(dt)` owns camera blend, ride bob, sway, burner vibration, first-person visibility, rope fade, and final render.

## Current readback

```txt
window.GameHost.getState()
  -> nexusEngine: engine.openAbove.getState()
  -> local: snapshot()
```

There is no source/readback consumer evidence for whether the renderer is aligned with product copy, package metadata, campaign config, or source authority.

## Render risk

Low for this pass.

No render source changed.

The next implementation should add source diagnostics additively under `GameHost.getState().source` without moving render functions, changing renderer settings, retuning camera constants, or editing object-kit geometry.

## Required next render proof

```txt
source snapshot reports active product: Balloon Drift
source snapshot reports objectType: hot-air-balloon
source snapshot reports controls: burner / vent / wheel zoom
source snapshot reports camera mode: third-person + basket blend
source consumer ledger includes src/main.js draw/updateHud/GameHost consumers
GameHost.getState().local shape is unchanged
GameHost.getState().nexusEngine shape is unchanged
GameHost.getState().source exists additively
```

## Deferred render extractions

```txt
open-above-terrain-sampler-kit
open-above-world-generation-kit
open-above-wind-ribbon-render-kit
open-above-basket-follow-camera-kit
open-above-camera-zoom-blend-kit
open-above-first-person-visibility-kit
open-above-hud-telemetry-kit
```

These should wait until source authority is fixture-safe.
