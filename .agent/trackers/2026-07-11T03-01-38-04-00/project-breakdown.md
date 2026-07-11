# Project Breakdown: TheOpenAbove Terrain Surface Authority

**Timestamp:** `2026-07-11T03-01-38-04-00`

**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

**Branch:** `main`

## Summary

This documentation-only pass reconciles the smooth world-space terrain change and its source-text smoke coverage. The new terrain art direction is materially cleaner and deterministic, but the runtime has no versioned surface descriptor, LOD-invariant slope contract, mixed-LOD normal policy, bounded chunk-build authority or numeric fixture.

## Plan ledger

### Goal

Document the complete terrain interaction, domain, kit and service graph, then define the smallest safe terrain authority boundary that preserves the new Frutiger Aero appearance while preventing LOD-dependent color seams and unbounded synchronous rebuild work.

### Checklist

- [x] Review all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Compare all nine eligible repositories against the central ledger.
- [x] Confirm every eligible repository has root `.agent` state.
- [x] Detect terrain runtime commits newer than the prior `TheOpenAbove` audit.
- [x] Select only `TheOpenAbove`.
- [x] Read terrain surface, chunk streaming, visual-domain and smoke/package sources.
- [x] Identify the interaction loop.
- [x] Identify all domains in use.
- [x] Identify all source-backed and runtime-implied kits.
- [x] Record every kit service boundary.
- [x] Derive high-quality chunk and vertex workload from source constants.
- [x] Record LOD slope, color, normal and rebuild gaps.
- [x] Refresh required root `.agent` files.
- [x] Add timestamped architecture, render, gameplay, interaction, terrain-system and deploy audits.
- [x] Push repo-local documentation directly to `main`.
- [ ] Synchronize the central ledger and internal change log.
- [ ] Runtime implementation and fixtures remain future work.

## Selection result

The current Publish inventory is:

```txt
AetherVale
HorrorCorridor
IntoTheMeadow
MyCozyIsland
PhantomCommand
PrehistoricRush
TheCavalryOfRome
TheOpenAbove
TheUnmappedHouse
ZombieOrchard
```

`TheCavalryOfRome` was excluded. `TheOpenAbove` was prioritized because these runtime commits were newer than the previous central documentation state:

```txt
5ce61d3a995ab5dfa0d26bd2bd38f4072de91b7b
aa447b2ccdb06ea43e9940a45f7e5263169b579b
```

## Product interaction loop

```txt
load route and resolve ESM
  -> construct visual domain
  -> construct terrain surface
  -> construct terrain chunk streamer
  -> construct vegetation, grass, water, sky, weather and postprocess
  -> construct balloon simulation, object, camera, presentation and telemetry
  -> sample keyboard and wheel input
  -> RAF advances flight and camera
  -> terrain update rounds camera position to one chunk center
  -> center change computes required chunk and LOD set
  -> stale or wrong-LOD meshes are removed and their geometry disposed
  -> missing chunks are built synchronously
  -> each vertex samples height, LOD-scaled slope and world-space color
  -> geometry receives vertex colors, computed normals and bounds
  -> cloud-shadow uniforms update
  -> composer renders and HUD/GameHost project state
  -> repeat
```

## Domains in use

```txt
application shell and static publishing
ESM and CDN source admission
world and campaign source
browser input
RAF and visibility cadence
balloon flight simulation
procedural balloon presentation
camera and clipping
quality and dynamic resolution
physical sky, lighting, weather and clouds
terrain height and moisture
terrain palette and world-space color fields
finite-difference slope sampling
chunk identity and camera-centered membership
terrain LOD selection
synchronous geometry generation
vertex-color buffers
per-chunk normal and bounds generation
shared terrain material and cloud-shadow shader
vegetation, grass, water and landmarks
HDR composition and lens response
telemetry, HUD and GameHost projection
headless routing, smoke tests and Pages deployment
runtime lifecycle and disposal
planned fixed-step time authority
planned terrain surface authority
planned Meadow Lift objective authority
```

## Kits and services

### Terrain kits

```txt
open-above-terrain-surface-kit
  terrain height
  moisture field
  world-space terrain color
  shared standard material
  cloud-shadow installation
  terrain-streamer composition

open-above-terrain-chunk-streaming-kit
  chunk keying
  distance-based LOD
  camera-centered membership
  synchronous geometry construction
  vertex heights and colors
  computed normals and bounds
  chunk release and disposal
  cloud-shadow shader patch and weather update
```

### Other source-backed kits

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

### Runtime-implied kits

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

## Terrain source read

The new surface removes:

```txt
seeded random texture generation
64x64 color DataTexture
64x64 normal DataTexture
repeat wrapping and repeat scales
material color map
material normal map and normal scale
```

It adds:

```txt
six-color Frutiger Aero palette
height and moisture weighting
large, medium and local smooth world fields
soft-rock blending from slope
vertex-color-only material
```

## Workload read

High-quality radius-three terrain membership can include:

```txt
37 chunks
5 near chunks at 72 segments
16 middle chunks at 40 segments
16 far chunks at 20 segments
60,597 vertices
302,985 minimum terrainHeight calls for center and finite-difference slope
```

This is an operation census from source constants. It is not a measured timing result.

## Main finding

The new color field is deterministic in world coordinates, but its slope input is not independent of render LOD:

```txt
sampleStep = chunkSize / segments
slope = finite difference at sampleStep
terrainColor(..., slope)
softRock weight = smoothstep(slope, 0.2, 0.5)
```

A shared world coordinate can therefore receive a different rock blend when generated at another LOD. Chunk normals are also computed separately, and mixed-resolution edges have no continuity contract. Because the normal map was removed, geometric normal discontinuity is now the only normal detail and may be more visible. Rebuild work remains synchronous and has no queue or frame budget.

## Next safe ledge

```txt
TheOpenAbove Terrain Surface Authority
+ LOD Continuity and Chunk-Rebuild Fixture Gate
```

Required order:

```txt
surface descriptor and revision
  -> stable palette/field fingerprint
  -> LOD-invariant slope service
  -> shared edge and normal policy
  -> preflighted atomic chunk replacement
  -> chunk generation queue and budget
  -> detached surface/build/seam observations
  -> numeric Node fixtures
  -> browser transition smoke
```

## Validation state

```txt
runtime changed by this pass: no
packages changed: no
dependencies changed: no
route behavior changed: no
rendering behavior changed by this pass: no
deployment changed: no
branch created: no
pull request created: no
npm run check: not run
npm run build: not run
browser smoke: not run
Pages smoke: not run
numeric terrain fixture: unavailable
LOD seam fixture: unavailable
rebuild budget fixture: unavailable
```