# Current Audit: TheOpenAbove

**Last aligned:** `2026-07-10T19-58-34-04-00`

## Status

```txt
status: immutable-runtime-admission-boot-capability-fixture-gate-planned
runtime source changed: no
branch: main
root .agent state: refreshed
central ledger sync: complete
```

`TheOpenAbove` remains a static Vite/Three.js Balloon Drift route with NexusEngine telemetry, deterministic terrain and grass, volumetric atmosphere, adaptive render scale, browser GameHost readback, static smoke checks, and a Nexus headless-editor command surface.

## Selection

All nine eligible non-Cavalry repositories were centrally tracked and had root `.agent` state. `TheOpenAbove` was selected because its repo-local audit had advanced beyond the central ledger, leaving the current session-generation audit unsynchronized centrally. `TheCavalryOfRome` remained excluded.

## Files reviewed

```txt
index.html
package.json
tests/smoke.mjs
tools/headless-editor-environment.mjs
src/main.js
.agent root state
central Publish repository ledgers
```

## Interaction loop

```txt
index.html
  -> browser resolves static ESM graph
       -> Three.js 0.165.0
       -> NexusEngine @main
       -> local modules
  -> createGame()
       -> visual domain and resize listener
       -> balloon object
       -> simulation and keyboard/blur listeners
       -> camera rig and wheel listener
       -> presentation and telemetry
       -> initial state
       -> recursive requestAnimationFrame
            -> simulation update
            -> balloon transform/presentation
            -> camera update
            -> visual update
            -> telemetry tick
            -> render/adaptive-resolution sample
            -> HUD projection
            -> next frame
  -> GameHost live-object and snapshot readback
```

## Domains in use

```txt
browser shell and Vite static publishing
static ESM graph resolution
Three.js CDN runtime
NexusEngine CDN runtime
runtime composition
campaign, world and legacy-flight source configuration
keyboard, blur and wheel input
wind, buoyancy, damping, ceiling and terrain-clearance simulation
altitude, velocity and distance state
hot-air-balloon object and presentation
camera follow, basket-view blend, clipping fade and zoom
visual composition
quality-tier detection and dynamic resolution
physical sky, sun, aerial perspective and weather
volumetric clouds
terrain surface and chunk streaming
vegetation clusters
deterministic grass seed, density, exclusions, placement, LOD, culling and instancing
water and distant landmarks
HDR composer, neutral grading and lens response
Nexus telemetry
HUD and GameHost projection
partial resource/listener disposal
static smoke and headless command contracts
planned immutable source manifest and module admission
planned capability preflight, boot transaction, source fingerprint and failure projection
planned session identity, generation, ownership, rollback and terminal proof
```

## Services offered

- Route shell: canvas, HUD, error panel, module entry and boot.
- Source configuration: campaign, region, world, weather, terrain and legacy flight constants.
- Input: burner/vent key state, blur clearing, wheel zoom and camera transition.
- Simulation: wind, buoyancy, venting, damping, ceiling, terrain clearance, altitude, velocity, distance, transforms and snapshots.
- Balloon: geometry, materials, basket, ropes, burner, envelope, transforms and animation.
- Camera: follow, basket view, FOV, clipping fade, zoom, state and wheel disposal.
- Environment: sky, sun, aerial perspective, weather, clouds, terrain, vegetation, grass, water and landmarks.
- Grass: world/chunk seeds, density, exclusions, candidates, LOD, culling, instancing, animation, state and disposal.
- Rendering: quality tier, dynamic scale, frame-cost sampling, resize, HDR composition, render submission and statistics.
- Telemetry/readback: Nexus resources/events, HUD, GameHost local state and live handles.
- Validation: local source-text smoke assertions and headless check/build routing.

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

## Source findings

```txt
src/main.js imports Three.js from an exact 0.165.0 URL.
src/main.js imports NexusEngine from LuminaryLabs-Dev/NexusEngine@main.
The same TheOpenAbove commit can therefore resolve different NexusEngine code over time.
No manifest records an immutable NexusEngine revision or required export matrix.
The route-level try/catch begins after static module linking and cannot classify all CDN failures.
tests/smoke.mjs verifies local files and source text only.
headless project.check delegates to the same local smoke.
GameHost exposes live runtime objects but no requested/resolved source proof or boot result.
```

## Main finding

The next blocker is immutable runtime admission. The route cannot currently prove which NexusEngine revision it executed, whether required capabilities were accepted before construction, or why a static module graph failed. This must be resolved before the session-generation fence can produce reproducible lifecycle proof.

## Next safe ledge

```txt
TheOpenAbove Immutable Runtime Admission + Boot Capability Fixture Gate
```

## Validation

```txt
runtime source changed: no
package scripts changed: no
dependencies changed: no
routes changed: no
deployment changed: no
branch created: no
pull request created: no
existing checks run: no
runtime-admission fixture: unavailable
repo-local docs pushed to main: yes
central ledger updated: yes
central change log added: yes
```