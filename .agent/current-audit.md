# Current Audit: TheOpenAbove

**Last aligned:** `2026-07-10T17-51-35-04-00`

## Status

`TheOpenAbove` is a static Vite/Three.js Balloon Drift experience with NexusEngine telemetry, deterministic terrain and grass placement, volumetric atmosphere, adaptive render scale, browser GameHost readback, static smoke checks, and a Nexus headless-editor command surface.

The highest-value next work is runtime-session lifecycle authority. The route can create and run a session but cannot stop, dispose, roll back, or restart it through one deterministic owner.

## Files reviewed

```txt
package.json
src/main.js
src/runtime/balloon-simulation-kit.js
src/visual/visual-domain.js
src/visual/quality-tier-kit.js
src/visual/camera-presentation/balloon-camera-rig-kit.js
src/visual/post-process/hdr-composer-kit.js
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
  -> create presentation domain
  -> create Nexus telemetry runtime
  -> seed camera, visual, and telemetry state
  -> requestAnimationFrame
       -> update simulation
       -> apply balloon transform
       -> animate balloon and presentation
       -> update camera
       -> update environment
       -> tick telemetry
       -> render composer
       -> sample adaptive resolution
       -> write renderer statistics
       -> project HUD
       -> queue next frame
  -> expose live objects and snapshots through GameHost
```

There is no corresponding stop/dispose/restart loop.

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
resource-disposal
planned-runtime-session-authority
planned-lifecycle-state
planned-frame-ownership
planned-listener-ownership
planned-resource-ownership
planned-partial-start-rollback
planned-lifecycle-fixture
planned-frame-phase-authority
central-ledger-sync
```

## Services offered

- Route shell: canvas, HUD, fatal-error projection, import resolution, and boot.
- Source configuration: campaign, region, world, weather, terrain, and legacy flight constants.
- Input: burner/vent key state, blur clearing, wheel zoom, bounds, and camera mode transition.
- Simulation: wind, buoyancy, venting, damping, ceiling control, terrain clearance, altitude, velocity, distance, transforms, and snapshots.
- Balloon object/presentation: geometry, materials, basket, ropes, burner, envelope, transform application, and animation.
- Camera: wind-relative follow, basket view, FOV, clipping fade, zoom bounds, state readback, and wheel-listener disposal.
- Environment: sky, sun, aerial perspective, weather map, volumetric clouds, streamed terrain, vegetation, water, landmarks, and grass.
- Grass: deterministic world/chunk seeds, density, exclusions, candidate generation, LOD, culling, instancing, rebuild, wind animation, state, and disposal.
- Render policy: hardware tier selection, dynamic render scale, frame-cost smoothing, resize, submission, calls, and triangle totals.
- Post-processing: HDR composer, neutral grade, lens response, depth textures, and composer disposal.
- Telemetry: Nexus resources/events for balloon and visual snapshots.
- Presentation readback: HUD, GameHost.local, GameHost.nexusEngine, and live runtime handles.
- Validation: required-file smoke assertions, renderer-text contracts, npm check/build routing, and static headless state.
- Partial lifecycle: simulation input disposal, camera input disposal, visual resize/resource disposal.

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

### Runtime-implied adapters

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

### Next-cut lifecycle proof kits

```txt
open-above-runtime-session-authority-kit
open-above-runtime-lifecycle-state-kit
open-above-runtime-start-transaction-kit
open-above-animation-frame-ownership-kit
open-above-listener-ownership-ledger-kit
open-above-resource-ownership-ledger-kit
open-above-partial-start-rollback-kit
open-above-ordered-teardown-kit
open-above-session-result-journal-kit
open-above-gamehost-lifecycle-proof-kit
open-above-lifecycle-restart-fixture-kit
```

### Companion frame-proof kits

```txt
open-above-frame-phase-authority-kit
open-above-adaptive-quality-decision-ledger-kit
open-above-render-result-row-kit
open-above-telemetry-publication-row-kit
open-above-committed-frame-snapshot-kit
open-above-gamehost-frame-proof-kit
```

## Main finding

`src/main.js` owns construction and recursive frame scheduling but returns no session object. `simulation.dispose()`, `cameraRig.dispose()`, and `visual.dispose()` exist yet are never called. The animation-frame request is not retained, partial startup failure has no rollback, and `GameHost` exposes no lifecycle control or terminal status. Repeated creation can therefore leave parallel frame chains, duplicate listeners, hidden sessions, and unproven GPU/resource cleanup.

## Next safe ledge

```txt
TheOpenAbove Runtime Session Lifecycle Authority + Dispose/Reboot Fixture Gate
```
