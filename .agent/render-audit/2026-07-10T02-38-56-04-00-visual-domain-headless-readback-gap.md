# Render Audit: Visual Domain Headless Readback Gap

**Timestamp:** `2026-07-10T02-38-56-04-00`

## Render surface

The repo has a full visual/render surface.

`src/visual/visual-domain.js` creates the Three.js renderer, scene, camera, terrain, vegetation, grass, water, clouds, lighting, post-process composer, quality policy, dynamic resolution, and render stats.

## Current render loop

```txt
createVisualDomain({ canvas, worldConfig })
  -> detectQualityTier()
  -> create WebGLRenderer
  -> create terrain / vegetation / grass / landmarks
  -> create weather / sun / sky / volumetric clouds / aerial perspective / cloud shadows / water / lens
  -> create HDR composer
  -> create dynamic resolution controller
  -> resize camera and composer

frame
  -> visual.update({ dt, elapsed, flightState, cameraContext })
  -> weather/sun/sky/clouds/aerial/shadows/grass/water/lens/composer update
  -> visual.render(dt, frameMs)
  -> composer.render(dt)
  -> dynamic resolution sample
  -> renderer.info.render.calls and triangles copied to state
```

## Current readback

`src/main.js` adds visual stats to `getSnapshot()`:

```txt
quality
exposure
averageLuminance
sunFacing
sunOnScreen
renderScale
drawCalls
triangles
```

`window.GameHost.getState()` exposes that through `local` and through the Nexus telemetry resource.

## Headless renderer validation

`tools/headless-editor-environment.mjs` already exposes:

```txt
renderer.validate
project.inspect
project.check
project.build
runtime.getState
```

The current validation checks file presence, HDR depth target safety, water fog configuration, smoke tests, and build command execution.

## Gap

Render readback is aggregate-only.

There is still no source-consumer ledger that proves which source records produced which render/presentation state.

Missing rows:

```txt
visual_domain_source_loaded
world_config_consumed
terrain_surface_config_consumed
weather_map_config_consumed
clouds_config_consumed
water_config_consumed
quality_policy_consumed
postprocess_config_consumed
render_stats_snapshot_emitted
gamehost_source_projection_emitted
headless_source_fixture_validated
```

## Guardrail

Do not rewrite the visual domain next.

The next useful render work is source/readback proof through headless and GameHost rows, not a shader or scene overhaul.
