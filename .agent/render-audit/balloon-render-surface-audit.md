# Render Audit — Balloon Render Surface

**Timestamp:** `2026-07-08T03:21:22-04:00`

## Current render surface

The active render surface is a single Three.js canvas:

```txt
index.html
  -> canvas#game
  -> src/main.js
  -> THREE.WebGLRenderer
```

## What renders now

```txt
scene background / fog
procedural terrain plane with vertex colors
lake discs
tree groups
cloud puff groups
wind ribbon line groups
hot-air-balloon object family
burner / rigging animation
basket-follow / near-basket camera blend
HUD telemetry overlay
```

## Render kits already separated

```txt
open-above-hot-air-balloon-object-kit
open-above-balloon-envelope-panel-kit
open-above-balloon-mouth-kit
open-above-balloon-streamer-fit-kit
open-above-balloon-fabric-seam-kit
open-above-hot-air-balloon-basket-kit
open-above-hot-air-balloon-rigging-kit
open-above-hot-air-balloon-burner-kit
open-above-rope-kit
```

## Render logic still inline

```txt
terrain geometry generation
terrain color sampling
lake disc placement
tree scatter
cloud scatter
wind ribbon line generation
camera setup
camera blend
renderer setup
shadow/tone-mapping setup
HUD telemetry formatting
GameHost render/debug projection
```

## Immediate render risk

The current render looks like the balloon-drift product, but the rendering systems are not descriptor-driven yet.

A full renderer extraction before source authority would be premature.

## Correct next render move

Keep render behavior stable and add source/route diagnostics first.

After the Product Copy Authority + Balloon Drift Config Fixture Gate passes, split render domains in this order:

```txt
1. world-generation descriptors
2. terrain sampler / terrain render kit
3. cloud descriptor / cloud render kit
4. wind ribbon descriptor / wind ribbon render kit
5. camera descriptor / basket-follow camera kit
6. HUD projection from mission snapshot
```

## Render validation needed later

```txt
visual route still loads
balloon remains visible
burner/vent animation remains active
camera wheel blend still works
HUD text still matches GameHost state
no console fatal error
renderer reports same or better baseline performance
```
