# Current Audit: TheOpenAbove

**Last aligned:** `2026-07-10T16-20-09-04-00`

## Status

`TheOpenAbove` is a static Vite/Three.js Balloon Drift experience with NexusEngine telemetry, deterministic terrain and grass placement, volumetric atmosphere, adaptive render scale, browser GameHost readback, static smoke checks, and a Nexus headless-editor command surface.

The highest-value next work is not visual expansion. It is to make frame-phase authority explicit so simulation, camera, visual update, telemetry, render submission, adaptive-resolution decisions, HUD, and GameHost can all be attributed to one committed frame.

## Files reviewed

```txt
package.json
src/main.js
src/runtime/balloon-simulation-kit.js
src/runtime/balloon-telemetry-kit.js
src/visual/visual-domain.js
src/visual/quality-tier-kit.js
src/visual/camera-presentation/balloon-camera-rig-kit.js
src/visual/grass-field/grass-field-domain.js
src/visual/grass-field/grass-world-seed-kit.js
src/visual/grass-field/grass-biome-density-kit.js
src/visual/grass-field/grass-exclusion-mask-kit.js
src/visual/grass-field/grass-chunk-placement-kit.js
src/visual/landscape/grass-detail-kit.js
tests/smoke.mjs
tools/headless-editor-environment.mjs
.agent root state
central Publish repo ledgers
```

## Interaction loop

```txt
open route
  -> resolve Three.js and NexusEngine CDN modules
  -> create visual domain and environment
  -> build balloon object
  -> create keyboard-driven drift simulation
  -> create wheel-driven camera rig
  -> create presentation domain
  -> create Nexus telemetry runtime
  -> requestAnimationFrame
       -> update simulation
       -> apply object transform
       -> animate object and presentation
       -> update camera
       -> update visual environment and copy current resolution scale
       -> tick telemetry using getSnapshot()
       -> render composer
       -> sample frame cost and possibly change resolution scale
       -> write renderer calls and triangles
       -> project HUD
  -> expose live objects and latest snapshots through GameHost
  -> expose static project/renderer/check/build commands through headless editor
```

## Domains in use

```txt
browser-shell
vite-static-publish
three-cdn-runtime
nexusengine-cdn-runtime
runtime-composition
campaign-source
world-source
legacy-flight-source
keyboard-input
wheel-zoom-input
burner-intent
vent-intent
wind-field
buoyancy-integration
vertical-damping
ceiling-soft-limit
terrain-clearance
altitude-distance-state
hot-air-balloon-object
balloon-presentation
camera-follow
basket-view-blend
clipping-fade
visual-domain
quality-tier-detection
dynamic-resolution
frame-cost-smoothing
physical-sky
sun-light
aerial-perspective
cloud-weather-map
volumetric-clouds
terrain-surface
terrain-chunk-streaming
vegetation-clusters
grass-world-seed
grass-biome-density
grass-exclusion-mask
grass-chunk-placement
grass-lod
grass-compute-culling
grass-field-domain
legacy-grass-detail
water-surfaces
distant-landmarks
hdr-composer
neutral-color-grade
lens-response
nexus-telemetry
hud-projection
gamehost-readback
static-smoke-contract
headless-renderer-contract
planned-frame-phase-authority
planned-adaptive-quality-decision-ledger
planned-source-input-correlation
planned-dom-free-fixture
central-ledger-sync
```

## Services offered

- Route shell: canvas, HUD, fatal-error projection, import resolution, and module boot.
- Source configuration: campaign, region, world, weather, terrain, and legacy flight constants.
- Input: burner/vent key state, blur clearing, wheel zoom, bounds, and camera mode transition.
- Simulation: wind, buoyancy, venting, damping, ceiling control, terrain clearance, altitude, velocity, distance, transforms, and snapshots.
- Balloon object/presentation: geometry, materials, basket, ropes, burner, envelope, transform application, and animation.
- Camera: wind-relative follow, basket view, FOV, clipping fade, zoom bounds, and state readback.
- Environment: sky, sun, aerial perspective, weather map, volumetric clouds, streamed terrain, vegetation, water, and landmarks.
- Grass: deterministic world/chunk seeds, density classification, exclusions, candidate generation, per-distance LOD, backend culling, instanced patch construction, chunk rebuild, wind animation, and aggregate state.
- Render policy: hardware tier selection, dynamic render scale, frame-cost smoothing, resize, render submission, calls, and triangle totals.
- Post-processing: HDR composer, neutral grade, lens response, and explicit fog handling.
- Telemetry: Nexus resources/events for balloon and visual snapshots.
- Presentation readback: HUD, GameHost.local, GameHost.nexusEngine, and live runtime object handles.
- Validation: required-file smoke assertions, renderer-text contract checks, npm check/build routing, and static headless state.

## All kits

### Active source-backed kits

```txt
open-above-balloon-simulation-kit
open-above-balloon-telemetry-kit
open-above-hot-air-balloon-object-kit
open-above-balloon-camera-rig-kit
open-above-clipping-fade-kit
open-above-balloon-presentation-domain
open-above-visual-domain
open-above-quality-tier-kit
open-above-dynamic-resolution-kit
open-above-physical-sky-kit
open-above-sun-light-kit
open-above-aerial-perspective-kit
open-above-cloud-weather-map-kit
open-above-volumetric-cloud-kit
open-above-terrain-surface-kit
open-above-terrain-chunk-streaming-kit
open-above-vegetation-cluster-kit
open-above-grass-world-seed-kit
open-above-grass-biome-density-kit
open-above-grass-exclusion-mask-kit
open-above-grass-chunk-placement-kit
open-above-grass-lod-kit
open-above-grass-compute-culling-kit
open-above-grass-field-domain
open-above-water-surface-kit
open-above-distant-landmark-kit
open-above-hdr-composer-kit
open-above-neutral-color-grade-kit
open-above-lens-response-kit
open-above-headless-editor-environment
open-above-static-smoke-test-kit
```

### Source-backed but inactive/legacy

```txt
open-above-grass-detail-kit
```

`visual-domain.js` imports `createGrassFieldDomain`; it does not import `createGrassDetail`. The legacy implementation remains available in source but is not part of the active render composition.

### Runtime-implied adapter kits

```txt
open-above-route-shell-kit
open-above-importmap-kit
open-above-runtime-composer-kit
open-above-keyboard-input-kit
open-above-wheel-zoom-input-kit
open-above-hud-projection-kit
open-above-error-panel-kit
open-above-gamehost-legacy-readback-kit
open-above-nexusengine-cdn-adapter-kit
```

### Next-cut proof kits

```txt
open-above-frame-phase-authority-kit
open-above-adaptive-quality-decision-ledger-kit
open-above-render-result-row-kit
open-above-telemetry-publication-row-kit
open-above-committed-frame-snapshot-kit
open-above-gamehost-frame-proof-kit
open-above-grass-kit-truth-ledger-kit
open-above-render-phase-fixture-kit
open-above-browser-frame-parity-kit
```

## Main finding

`src/main.js` ticks telemetry before `visual.render()`. `visual.update()` copies `resolution.state.scale` before `resolution.sample()` runs. `visual.render()` then submits the frame, may change scale and resize, and writes renderer statistics. As a result, one visible frame can expose different phase combinations:

```txt
Nexus telemetry = pre-render stats + pre-sample scale
HUD/GameHost.local = post-render stats + pre-sample scale
GameHost.nexusEngine = prior telemetry publication
```

The active grass system is also under-documented: the current runtime uses a seven-part grass-field stack while the prior registry centered the inactive `open-above-grass-detail-kit`.

## Next safe ledge

```txt
TheOpenAbove Render Phase Authority Ledger + Adaptive Resolution Fixture Gate
```