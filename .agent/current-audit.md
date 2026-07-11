# Current Audit: TheOpenAbove

**Last aligned:** `2026-07-10T21-31-01-04-00`

## Status

```txt
status: runtime-admission-first-import-purity-frame-ownership-second
runtime source changed: no
branch: main
root .agent state: refreshed
central ledger sync: pending in this turn
```

`TheOpenAbove` remains a static Vite/Three.js Balloon Drift route with NexusEngine telemetry, procedural balloon rendering, physical atmosphere, deterministic terrain and grass, adaptive render scale, GameHost readback, static smoke checks and headless command routing.

## Selection

All nine eligible non-Cavalry repositories were centrally tracked and had root `.agent` state. `TheOpenAbove` was the oldest eligible documented repository when this pass began. `TheCavalryOfRome` remained excluded.

## Files reviewed

```txt
src/main.js
src/hot-air-balloon-object-kit.js
src/runtime/balloon-simulation-kit.js
src/visual/camera-presentation/balloon-camera-rig-kit.js
src/visual/visual-domain.js
tests/smoke.mjs
.agent root state
central Publish ledgers
```

## Interaction loop

```txt
browser resolves static ESM graph
  -> hot-air-balloon-object-kit evaluates
       -> requestAnimationFrame(attachWhenReady)
  -> createGame builds direct balloon route
  -> GameHost is published
  -> attachWhenReady observes host
       -> legacy wing/tail vehicle not found
       -> compatibility tick starts anyway
  -> primary route RAF advances simulation, presentation, camera, visual, telemetry, render and HUD
```

## Domains in use

```txt
browser shell and Vite publishing
static ESM and CDN runtime resolution
campaign and world source configuration
keyboard, blur and wheel input
balloon drift simulation
procedural balloon object and presentation
camera follow, basket view, clipping fade and zoom
quality tier and dynamic resolution
physical sky, sun, aerial perspective, weather and volumetric clouds
terrain surface and chunk streaming
vegetation, deterministic grass, water and distant landmarks
HDR composition, neutral grading and lens response
Nexus telemetry
HUD and GameHost projection
import-time compatibility installation
animation-frame ownership and runtime lifecycle
partial listener/resource disposal
static smoke and headless command routing
planned immutable source admission
planned session generation, teardown and restart authority
```

## Services offered

- Route shell: canvas, HUD, error panel, module entry and boot.
- Simulation: burner/vent input, wind, buoyancy, damping, ceiling, terrain clearance, transforms and snapshots.
- Balloon: geometry, materials, envelope, basket, ropes, burner, animation and legacy host installation.
- Camera: follow, basket blend, zoom, clipping fade, FOV, state and wheel-listener disposal.
- Environment: sky, sun, aerial perspective, weather, clouds, terrain, vegetation, grass, water and landmarks.
- Grass: deterministic seed, density, exclusions, placement, LOD, culling, instancing, animation, state and disposal.
- Rendering: quality classification, dynamic resolution, resize, HDR composition, render submission and statistics.
- Telemetry/readback: Nexus resources/events, HUD and GameHost live state.
- Validation: local source assertions and headless check/build command routing.

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

Inactive source-backed kit: `open-above-grass-detail-kit`.

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

## Main findings

1. NexusEngine is still imported from mutable `main`, so immutable runtime admission remains the first gate.
2. `hot-air-balloon-object-kit.js` is not import-pure. It schedules `attachWhenReady` during module evaluation.
3. The active direct-balloon route has no legacy wing/tail vehicle, but the compatibility code still starts a perpetual no-op RAF.
4. The main RAF handle is discarded, while simulation, camera and visual disposers are never composed.
5. GameHost exposes live objects but no session, generation, frame-owner, listener-owner, resource-owner or terminal lifecycle rows.

## Ordered safe ledges

```txt
1. TheOpenAbove Immutable Runtime Admission + Boot Capability Fixture Gate
2. TheOpenAbove Import-Pure Balloon Object Kit + Frame Ownership Fixture Gate
3. TheOpenAbove Runtime Session Lifecycle + Ordered Disposal/Reboot Fixture Gate
```

## Validation

Documentation only. Runtime source, package scripts, dependencies, route behavior, render behavior and deployment configuration were unchanged. No branch or pull request was created.