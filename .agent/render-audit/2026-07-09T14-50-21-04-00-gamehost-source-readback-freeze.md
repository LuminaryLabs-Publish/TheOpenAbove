# Render Audit — GameHost Source Readback Freeze

**Timestamp:** `2026-07-09T14-50-21-04-00`

## Current render surface

```txt
src/main.js
  -> makeTerrain(scene)
  -> makeLakes(scene)
  -> makeTrees(scene)
  -> makeClouds(scene)
  -> makeWindRibbons(scene)
  -> buildHotAirBalloon()
  -> renderer.render(scene, camera)
```

## Visual object surface

`src/hot-air-balloon-object-kit.js` is already split into sub-kits:

```txt
open-above-hot-air-balloon-object-kit
  -> open-above-balloon-envelope-panel-kit
  -> open-above-balloon-mouth-kit
  -> open-above-balloon-streamer-fit-kit
  -> open-above-balloon-fabric-seam-kit
  -> open-above-hot-air-balloon-basket-kit
  -> open-above-hot-air-balloon-rigging-kit
  -> open-above-hot-air-balloon-burner-kit
  -> open-above-rope-kit
```

## Renderer readback state

```txt
available:
  window.GameHost.scene
  window.GameHost.renderer
  window.GameHost.camera
  window.GameHost.balloon
  window.GameHost.getState().local
  window.GameHost.getState().nexusEngine

missing:
  window.GameHost.getState().source
  source fingerprint
  source consumer ledger rows
  object-kit metadata readback
  product/copy/runtime compatibility status
  browser consumer fixture status
```

## Render conclusion

The render surface is not the next blocker.

The browser already draws the route, animates the balloon object, blends basket/third-person camera, fades rigging for near-basket view, updates ride bob/sway/burner vibration, and renders HUD telemetry.

The next pass should add source readback without changing scene construction, material choices, camera constants, or visual object hierarchy.

## Readback contract to add

```txt
window.GameHost.getState() returns:
  local: existing shape, unchanged
  nexusEngine: existing shape, unchanged
  source: additive source readback projection
```

## Render safety rules

```txt
Do not mutate renderer setup.
Do not replace terrain/lake/tree/cloud/wind-ribbon functions.
Do not change hot-air-balloon object-kit profile.
Do not retune firstPersonBlend, ropeFade, rideBob, rideSway, or burnerVibration.
Do not move source proof into WebGL-only code.
```
