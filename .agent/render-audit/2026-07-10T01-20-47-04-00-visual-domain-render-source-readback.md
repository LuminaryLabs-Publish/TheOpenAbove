# Render Audit: Visual Domain Render Source Readback

**Timestamp:** `2026-07-10T01-20-47-04-00`

## Render surface

`TheOpenAbove` has a visual/render surface through Three.js and the local visual-domain kit family.

The render path is already modular enough for the next documentation ledge. The renderer should remain stable while source/readback proof is added.

## Current render loop

```txt
src/main.js
  -> createVisualDomain({ canvas, worldConfig: WORLD })
  -> buildHotAirBalloon()
  -> visual.scene.add(balloon)
  -> simulation.applyToBalloon(balloon)
  -> createBalloonCameraRig(visual.camera, balloon, ...)
  -> createBalloonPresentationDomain(balloon)
  -> frame updates simulation, object animation, presentation, camera rig, visual domain, telemetry, render, and HUD
```

## Render domains in use

```txt
three-importmap-runtime
webgl-renderer
scene-root
camera-root
quality-tier
dynamic-resolution
physical-sky
sun-light
aerial-perspective
cloud-shadow-overlay
cloud-weather-map
volumetric-clouds
terrain-surface
vegetation-clusters
grass-detail
water-surfaces
distant-landmarks
hdr-composer
auto-exposure
bloom
god-rays
color-grade
lens-response
hot-air-balloon-object
balloon-presentation
camera-rig
hud-telemetry
```

## Render kits in use

```txt
open-above-visual-domain
open-above-quality-tier-kit
open-above-dynamic-resolution-kit
open-above-physical-sky-kit
open-above-sun-light-kit
open-above-aerial-perspective-kit
open-above-cloud-shadow-kit
open-above-cloud-weather-map-kit
open-above-volumetric-cloud-kit
open-above-terrain-surface-kit
open-above-vegetation-cluster-kit
open-above-grass-detail-kit
open-above-water-surface-kit
open-above-distant-landmark-kit
open-above-hdr-composer-kit
open-above-auto-exposure-kit
open-above-god-ray-kit
open-above-bloom-kit
open-above-color-grade-kit
open-above-lens-response-kit
open-above-balloon-camera-rig-kit
open-above-clipping-fade-kit
open-above-balloon-presentation-domain
open-above-envelope-fabric-material-kit
open-above-basket-material-kit
open-above-rope-material-kit
open-above-burner-illumination-kit
```

## Readback state

Current `GameHost` readback exposes local route snapshots and Nexus telemetry snapshots.

It does not expose a stable `.source` block with route-copy parity, campaign/current-route parity, source fingerprints, accepted legacy fields, or consumed manifest rows.

## Render-source risk

The visual domain is now a consumer of `WORLD`, balloon pose, camera rig, presentation, and quality policy.

Without source-consumer rows, the route cannot prove which product/campaign/runtime records were current at the time the render snapshot was produced.

## Next render-safe work

```txt
Add source manifest rows.
Add source fingerprint rows.
Add source snapshot normalization.
Add source acceptance ledger rows.
Add GameHost source readback.
Add DOM-free source fixture rows.
Keep render visuals unchanged.
```

## Do not do next

```txt
Do not replace the renderer.
Do not rewrite visual-domain kits.
Do not retune camera feel.
Do not change balloon visuals.
Do not change world fidelity.
Do not expand route progression.
```
