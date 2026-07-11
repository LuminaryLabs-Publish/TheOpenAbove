# Current Audit: TheOpenAbove

**Last aligned:** `2026-07-11T03-01-38-04-00`

## Status

```txt
status: runtime-admission-import-purity-lifecycle-clock-terrain-surface-first-campaign-objective-sixth
runtime source changed by this pass: no
recent runtime changes reconciled: yes
branch: main
root .agent state: refreshed
central ledger sync: pending until central commit
central change log: pending until central commit
```

## Selection and change reconciliation

The accessible `LuminaryLabs-Publish` inventory contains ten repositories. `TheCavalryOfRome` is excluded. All nine eligible repositories are tracked and have root `.agent` state.

`TheOpenAbove` was prioritized because two commits newer than the prior central audit changed the terrain surface and its smoke assertions:

```txt
5ce61d3a995ab5dfa0d26bd2bd38f4072de91b7b  smooth world-space Frutiger Aero terrain gradients
aa447b2ccdb06ea43e9940a45f7e5263169b579b  source-text smoke for the new surface
```

## Interaction loop

```txt
static ESM resolution
  -> construct visual, balloon, simulation, camera, presentation and telemetry
  -> createVisualDomain creates one shared terrain material
  -> createTerrainChunkStreamer owns streamed chunk meshes
  -> keydown/keyup/blur mutate private flight input
  -> wheel mutates camera zoom
  -> RAF advances simulation and camera
  -> camera position is rounded to a 520-meter chunk coordinate
  -> changed chunk coordinate triggers synchronous terrain membership rebuild
  -> each new chunk selects LOD from camera distance
  -> each vertex evaluates terrainHeight five times for height and finite-difference slope
  -> terrainColor blends height, moisture, slope and three smooth world fields
  -> chunk writes vertex colors and computes normals independently
  -> soft cloud-shadow uniforms update from weather
  -> render and HUD once
```

## Terrain surface behavior

```txt
surface palette:
  valleyGreen  #3f7850
  meadowGreen  #67a653
  sunlitGreen  #9bc65b
  dryGreen     #b5bd68
  wetGreen     #376d58
  softRock     #8d927d

world fields:
  largeField   broad valley/sunlit variation
  mediumField  meadow/dry variation
  localField   subtle wet/meadow variation

material:
  vertexColors true
  roughness    0.88
  metalness    0
  envMap       0.3
  repeated map none
  normal map   none
```

The random 64×64 color and normal textures, repeat settings and normal scale were removed. The terrain now derives color entirely from world coordinates, height, moisture and slope.

## Streamed terrain geometry

```txt
chunkSize: 520
chunkRadius: 2 low / 3 medium-high
high quality LOD segments:   72 / 40 / 20
medium quality LOD segments: 56 / 32 / 16
low quality LOD segments:    40 / 24 / 12
LOD decision: camera-distance in chunk units
center decision: round(camera.position / chunkSize)
rebuild mode: synchronous on center transition
```

At high quality, the initial radius-three set can contain 37 chunks and 60,597 terrain vertices. Each vertex samples the height field for the center and four slope offsets, evaluates moisture, multiple smoothsteps, six trigonometric field inputs, color cloning and several lerps before geometry normals and bounds are computed.

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
terrain height and moisture source
world-space terrain color fields
LOD-dependent finite-difference slope sampling
terrain chunk identity, membership, rebuild and disposal
per-chunk vertex-color and normal generation
soft cloud-shadow shader adaptation
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
planned terrain-surface descriptor, revision and numeric proof
planned LOD-invariant slope/normal continuity
planned objective/progress/completion/unlock authority
```

## Services offered

- Route shell: canvas, HUD, fatal panel and module boot.
- Simulation: burner/vent polling, wind, buoyancy, damping, ceiling, terrain clearance, transforms and snapshots.
- Balloon: geometry, materials, envelope, basket, ropes, burner, animation and legacy installation.
- Camera: follow, basket blend, zoom, clipping, FOV, state and wheel-listener disposal.
- Environment: sky, sun, weather, clouds, terrain, vegetation, grass, water and landmarks.
- Terrain source: deterministic height, moisture and Frutiger Aero color evaluation.
- Terrain streaming: chunk selection, distance LOD, synchronous geometry generation, vertex colors, normals, bounds, release and disposal.
- Terrain shading: shared standard material plus world-position soft cloud shadows.
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

## Proposed terrain authority kits

```txt
open-above-terrain-surface-descriptor-kit
open-above-terrain-palette-kit
open-above-terrain-color-field-kit
open-above-lod-invariant-slope-sampler-kit
open-above-terrain-normal-continuity-kit
open-above-terrain-chunk-build-budget-kit
open-above-terrain-surface-revision-kit
open-above-terrain-surface-observation-kit
open-above-terrain-seam-fixture-kit
open-above-terrain-chunk-rebuild-fixture-kit
```

## Main findings

1. The new world-space gradient removes repeated texture noise and is deterministic from source coordinates.
2. The source has no versioned terrain-surface descriptor, algorithm revision or fingerprint.
3. `sampleStep = chunkSize / segments` makes slope sampling LOD-dependent.
4. The same world position can therefore receive different steepness and soft-rock weight across LODs.
5. Each chunk computes normals independently; mixed-resolution boundaries have no normal continuity contract.
6. Removing the normal map makes geometric normal discontinuities more visually significant.
7. Chunk creation and LOD replacement remain synchronous on the render thread.
8. No queue, per-frame generation budget, prewarm, cache or build-result ledger exists.
9. The smoke test checks source strings, not numeric palette output, seam parity, LOD parity or frame cost.
10. GameHost and HUD expose no terrain revision, active LOD map, build duration, seam result or surface fingerprint.

## Ordered safe ledges

```txt
1. Immutable Runtime Admission + Boot Capability Fixture Gate
2. Import-Pure Balloon Object Kit + Frame Ownership Fixture Gate
3. Runtime Session Lifecycle + Ordered Disposal/Reboot Fixture Gate
4. Fixed-Step Simulation Clock + Visibility/Cadence Parity Fixture Gate
5. Terrain Surface Authority + LOD Continuity/Chunk-Rebuild Fixture Gate
6. Meadow Lift Objective Authority + Deterministic Route Fixture Gate
```

Documentation only. This pass changed no runtime source, package script, dependency, route behavior, rendering behavior or deployment configuration.