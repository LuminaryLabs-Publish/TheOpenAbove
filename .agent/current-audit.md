# Current Audit: TheOpenAbove

**Last aligned:** `2026-07-10T19-18-39-04-00`

## Status

`TheOpenAbove` is a static Vite/Three.js Balloon Drift route with NexusEngine telemetry, deterministic terrain and grass placement, volumetric atmosphere, adaptive render scale, browser GameHost readback, static smoke checks, and a Nexus headless-editor command surface.

The highest-value next work is a session generation fence plus terminal GameHost projection. Local kits can remove some listeners and resources, but no root authority invalidates stale callbacks or proves that old sessions cannot mutate a replacement session.

## Files reviewed

```txt
package.json
tests/smoke.mjs
src/main.js
src/runtime/balloon-simulation-kit.js
src/visual/visual-domain.js
src/visual/camera-presentation/balloon-camera-rig-kit.js
.agent root state
central Publish repo ledgers
```

## Interaction loop

```txt
open route
  -> resolve Three.js and NexusEngine CDN modules
  -> create visual domain and resize listener
  -> create balloon object
  -> create simulation and keyboard/blur listeners
  -> create camera rig and wheel listener
  -> create presentation domain and telemetry
  -> seed camera, visual and telemetry state
  -> requestAnimationFrame recursion
       -> simulation update
       -> balloon transform and presentation
       -> camera update
       -> environment update
       -> telemetry tick
       -> render and adaptive-resolution sample
       -> renderer statistics
       -> HUD projection
       -> queue next frame
  -> expose live runtime objects and snapshots through GameHost
```

## Domains in use

```txt
browser shell and Vite static publishing
Three.js and NexusEngine CDN runtimes
runtime composition
campaign, world and legacy-flight source configuration
keyboard and wheel input
burner and vent intent
wind, buoyancy, damping, ceiling and terrain-clearance simulation
altitude, velocity and distance state
hot-air-balloon object and presentation
camera follow, basket-view blend and clipping fade
visual composition
quality-tier detection and dynamic resolution
physical sky, sun, aerial perspective and weather map
volumetric clouds
terrain surface and chunk streaming
vegetation clusters
world-seeded grass density, exclusions, placement, LOD, culling and instancing
water surfaces and distant landmarks
HDR composer, neutral grade and lens response
Nexus telemetry
HUD and GameHost readback
partial resource disposal
static smoke and headless command contracts
planned session identity, generation, ownership, rollback and terminal proof
```

## Services offered

- Route shell: canvas, HUD, fatal-error projection, import resolution, and boot.
- Source configuration: campaign, region, world, weather, terrain, and legacy flight constants.
- Input: burner/vent key state, blur clearing, wheel zoom, bounds, and camera-mode transition.
- Simulation: wind, buoyancy, venting, damping, ceiling control, terrain clearance, altitude, velocity, distance, transforms, and snapshots.
- Balloon: geometry, materials, basket, ropes, burner, envelope, transform application, and presentation animation.
- Camera: wind-relative follow, basket view, FOV, clipping fade, zoom bounds, state readback, and wheel-listener disposal.
- Environment: sky, sun, aerial perspective, weather, clouds, terrain, vegetation, water, landmarks, and grass.
- Grass: deterministic world/chunk seeds, density, exclusions, candidate generation, LOD, culling, instancing, rebuild, wind animation, state, and disposal.
- Rendering: hardware tier selection, dynamic render scale, frame-cost sampling, resize, HDR composition, render submission, calls, triangles, and partial disposal.
- Telemetry/readback: Nexus resources/events, HUD, GameHost.local, GameHost.nexusEngine, and live handles.
- Validation: required-file and source-text smoke assertions, npm check/build routing, and headless command routing.

## Kit inventory

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

Inactive source-backed kit:

```txt
open-above-grass-detail-kit
```

Runtime-implied adapters:

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

## Main finding

`src/main.js` owns construction and recursive scheduling but returns no root session object. The frame request is discarded, callbacks have no session generation, partial startup has no rollback, and `window.GameHost` publishes live mutable handles without a terminal disposed projection. Calling local `dispose()` methods alone would not prove that already-queued callbacks or stale host references cannot affect a restarted session.

## Next safe ledge

```txt
TheOpenAbove Session Generation Fence + Terminal GameHost Fixture Gate
```
