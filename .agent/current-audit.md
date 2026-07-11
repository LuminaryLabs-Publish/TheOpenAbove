# Current Audit: TheOpenAbove

**Last aligned:** `2026-07-10T23-20-41-04-00`

## Status

```txt
status: runtime-admission-import-purity-lifecycle-first-campaign-objective-authority-fourth
runtime source changed: no
branch: main
root .agent state: refreshed
central ledger sync: complete
central change log: complete
```

`TheOpenAbove` remains a static Vite/Three.js Balloon Drift route with NexusEngine telemetry, procedural balloon rendering, physical atmosphere, deterministic terrain and grass, adaptive render scale, GameHost readback, static smoke checks, and headless command routing.

## Selection

The complete accessible Publish inventory contained ten repositories. `TheCavalryOfRome` remained excluded. All nine eligible repositories were centrally tracked and had root `.agent` state. `TheOpenAbove` was the oldest eligible direct ledger entry at selection and was the only product repository changed.

## Files reviewed

```txt
AGENTS.md
README.md
package.json
src/main.js
src/data/campaign.config.js
src/runtime/balloon-simulation-kit.js
src/runtime/balloon-telemetry-kit.js
src/visual/visual-domain.js
tests/smoke.mjs
.agent root state
central Publish ledgers
```

## Interaction loop

```txt
static ESM resolution
  -> create visual domain, balloon, simulation, camera, presentation and telemetry
  -> publish GameHost live references
  -> keyboard input controls burner/vent
  -> wheel input controls camera zoom
  -> requestAnimationFrame computes clamped variable dt
  -> simulation updates wind, buoyancy, altitude and distance
  -> balloon, camera, atmosphere, terrain, grass, water and postprocess update
  -> Nexus telemetry snapshots aggregate state before render
  -> renderer submits and adaptive resolution samples frame cost
  -> HUD projects drift state
  -> no objective evaluation or mission transition occurs
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
declared Meadow Lift mission source
planned immutable runtime admission
planned session generation, teardown and restart authority
planned route objective, phase, progress, completion and unlock authority
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
- Campaign source: region metadata, objective target values, world counts, perch coordinates and planned unlock relationship.
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
open-above-campaign-source-kit
```

## Main findings

1. NexusEngine is imported from mutable `main`, so immutable runtime admission remains the first gate.
2. `hot-air-balloon-object-kit.js` schedules a compatibility RAF during module evaluation.
3. Neither the compatibility RAF nor the primary route RAF is owned by a root session lifecycle.
4. The README and `AGENTS.md` define a mission loop that is not present in the active runtime.
5. `CAMPAIGN.regions[0].objectives` defines thermal, gate, return-radius and time-limit targets, but no runtime consumer evaluates them.
6. `WORLD.gateCount`, `WORLD.thermalCount`, `WORLD.perch`, `WORLD.start`, and `FLIGHT` are not part of the active Balloon Drift authority chain.
7. The simulation exposes only `drifting` status, aggregate distance and physical state; it has no mission phase, progress, completion, failure, unlock or restart result.
8. The visual domain creates no thermal, gate or perch objective projection, and telemetry/GameHost publish no campaign proof.
9. `tests/smoke.mjs` validates source strings and visual composition only; it cannot detect an endless-drift product loop.

## Ordered safe ledges

```txt
1. TheOpenAbove Immutable Runtime Admission + Boot Capability Fixture Gate
2. TheOpenAbove Import-Pure Balloon Object Kit + Frame Ownership Fixture Gate
3. TheOpenAbove Runtime Session Lifecycle + Ordered Disposal/Reboot Fixture Gate
4. TheOpenAbove Meadow Lift Objective Authority + Deterministic Route Fixture Gate
```

## Validation

Documentation only. Runtime source, package scripts, dependencies, route behavior, render behavior and deployment configuration were unchanged. No branch or pull request was created. Repo-local documentation, central ledger and central change log were pushed to `main`.
