# Current Audit: TheOpenAbove

**Last aligned:** `2026-07-11T00-49-45-04-00`

## Status

```txt
status: runtime-admission-import-purity-lifecycle-clock-first-campaign-objective-authority-fifth
runtime source changed: no
branch: main
root .agent state: refreshed
central ledger sync: complete
central change log: complete
```

## Interaction loop

```txt
static ESM resolution
  -> construct visual, balloon, simulation, camera, presentation and telemetry
  -> keydown/keyup/blur mutate a private input Set
  -> wheel mutates camera zoom
  -> RAF supplies now
  -> frameMs = min(80, now - last)
  -> dt = min(1/30, frameMs / 1000)
  -> simulation.update(dt)
  -> balloon/presentation/camera/visual update once
  -> Nexus engine.tick(dt) once
  -> render and HUD once
```

## Clock behavior

```txt
60 Hz: simulation advances close to wall time
30 Hz: simulation advances close to wall time
20 Hz: 50ms render frames advance simulation only 33.3ms
long frame: nearly all time beyond 33.3ms is discarded
hidden-tab resume: hidden duration is discarded without a suspension result
```

## Domains in use

```txt
browser shell and Vite publishing
static ESM and CDN resolution
campaign and world source
keyboard, blur and wheel input
browser visibility and RAF cadence
balloon drift simulation
procedural balloon object and presentation
camera follow, basket view, clipping and zoom
quality tier and dynamic resolution
physical sky, sun, aerial perspective, weather and volumetric clouds
terrain surface and chunk streaming
vegetation, deterministic grass, water and landmarks
HDR composition, grading and lens response
Nexus telemetry
HUD and GameHost projection
import-time compatibility installation
animation-frame ownership and lifecycle
partial listener/resource disposal
static smoke and headless routing
declared Meadow Lift mission source
planned immutable runtime admission
planned session teardown/restart authority
planned fixed-step clock and input admission
planned objective/progress/completion/unlock authority
```

## Services offered

- Route shell: canvas, HUD, error panel, module boot.
- Simulation: burner/vent polling, wind, buoyancy, damping, ceiling, terrain clearance, transforms and snapshots.
- Balloon: geometry, materials, envelope, basket, ropes, burner, animation and legacy installation.
- Camera: follow, basket blend, zoom, clipping, FOV, state and wheel-listener disposal.
- Environment: sky, sun, weather, clouds, terrain, vegetation, grass, water and landmarks.
- Grass: deterministic seed, density, exclusions, placement, LOD, culling, instancing, animation and disposal.
- Rendering: quality classification, dynamic resolution, HDR render and statistics.
- Telemetry/readback: Nexus resources/events, HUD and GameHost live state.
- Campaign source: objective targets, world counts, perch coordinates and unlock relationship.
- Validation: source assertions and headless check/build routing.

## Active source-backed kits

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
open-above-raf-clock-adapter-kit
```

## Main findings

1. NexusEngine is imported from mutable `main`.
2. The balloon object module schedules a compatibility RAF during import.
3. No root session owns either RAF or all resources.
4. One browser RAF equals one simulation step.
5. `dt` is capped at `1/30`, dropping slow-frame and hidden-tab elapsed time.
6. Input has no sequence ID or target simulation tick.
7. Telemetry frame identity is render-driven.
8. No visibility, max-substep, overrun or dropped-time policy exists.
9. The configured 300-second mission limit would inherit this ambiguity.
10. Current smoke coverage cannot prove cadence parity or visibility recovery.

## Ordered safe ledges

```txt
1. Immutable Runtime Admission + Boot Capability Fixture Gate
2. Import-Pure Balloon Object Kit + Frame Ownership Fixture Gate
3. Runtime Session Lifecycle + Ordered Disposal/Reboot Fixture Gate
4. Fixed-Step Simulation Clock + Visibility/Cadence Parity Fixture Gate
5. Meadow Lift Objective Authority + Deterministic Route Fixture Gate
```

Documentation only. Runtime source, packages, dependencies, route behavior, rendering and deployment were unchanged.
