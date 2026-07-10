# Render Audit: Visual Domain Source Proof Gap

**Timestamp:** `2026-07-10T04-40-52-04-00`

## Visual surface

`TheOpenAbove` renders a Vite-hosted Three.js 0.165.0 hot-air-balloon scene on `canvas#game`.

## Active visual domain consumers

```txt
createTerrainSurface
createVegetationClusters
createGrassDetail
createDistantLandmarks
createCloudWeatherMap
createSunLight
createPhysicalSky
createVolumetricClouds
createAerialPerspective
createCloudShadowOverlay
createWaterSurfaces
createLensResponse
createHdrComposer
createDynamicResolutionController
```

## Current readback

`getSnapshot()` includes visual quality, exposure, average luminance, sun-facing facts, render scale, draw calls, and triangles.

The headless editor environment validates selected renderer/build safety contracts by source inspection.

## Gap

The visual domain has useful modular kits, but no source ledger says which product/campaign/runtime source facts the visual domain consumed.

No render source row ties `WORLD` seed, terrain size, terrain segments, tree count, sky config, visual quality policy, and runtime route identity into `GameHost.getState().source`.

## Do not start next

```txt
renderer extraction
terrain extraction
visual-domain rewrite
cloud retune
lighting retune
camera retune
postprocess retune
```

## Next render gate

Add source-to-render readback rows and headless source fixture coverage before changing visual output.
