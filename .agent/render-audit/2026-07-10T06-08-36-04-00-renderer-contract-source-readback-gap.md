# Render Audit: Renderer Contract Source Readback Gap

**Timestamp:** `2026-07-10T06-08-36-04-00`

## Current render surface

`TheOpenAbove` has a full browser visual/render surface.

The current path is:

```txt
index.html canvas#game
  -> src/main.js
  -> createVisualDomain({ canvas, worldConfig: WORLD })
  -> THREE.WebGLRenderer
  -> scene/camera/quality/dynamic resolution
  -> streamed terrain + vegetation + grass + water
  -> physical sky + sun + volumetric clouds + aerial perspective
  -> HDR composer + neutral color grade + lens response
  -> visual.render(dt, frameMs)
```

## Render services in use

```txt
quality-tier service
dynamic-resolution service
WebGLRenderer host service
scene/camera service
streamed terrain surface service
terrain chunk streaming service
vegetation cluster service
grass detail service
water surface service
physical sky service
sun light service
aerial perspective service
cloud weather map service
volumetric cloud service
HDR composer service
neutral color grade service
lens response service
render stats service
resize service
```

## Current render validation

`tests/smoke.mjs` already verifies source-level render contracts:

```txt
visual domain exists
createTerrainSurface is used
streamed terrain is used
neutral exposure is used
bloom/god rays are disabled
neutral color grade is used
terrain cloud shadow is soft, not multiply overlay
water uses explicit fog uniforms
headless renderer hooks exist
```

`tools/headless-editor-environment.mjs` exposes:

```txt
project.inspect
renderer.validate
project.check
project.build
runtime.getState
```

## Render gap

The renderer is contract-checked, but not source-row checked.

Missing rows:

```txt
render_source_manifest_row
visual_domain_source_consumer_row
terrain_source_consumer_row
cloud_source_consumer_row
water_source_consumer_row
camera_source_consumer_row
renderer_stats_readback_row
gamehost_render_source_row
headless_renderer_source_fixture_row
```

## Non-goals next

```txt
renderer replacement
WebGPU rewrite
terrain extraction
cloud shader rewrite
camera retune
balloon visual polish
post-process expansion
```

## Next render-safe ledge

Add source/readback rows around the existing renderer and headless checks.

Do not change the visible render route until source fixtures can prove what the renderer consumed.
