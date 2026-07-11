# Project Breakdown: TheOpenAbove Terrain Surface Authority

**Timestamp:** `2026-07-11T03-01-38-04-00`

**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

**Branch:** `main`

## Summary

This documentation-only pass reconciles the smooth world-space terrain change and its source-text smoke coverage. The new terrain art direction is deterministic and removes repeated random textures, but the runtime has no versioned surface descriptor, LOD-invariant slope contract, mixed-LOD normal policy, bounded chunk-build authority or numeric fixture.

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
- [x] Synchronize the central ledger and internal change log.
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

`TheCavalryOfRome` was excluded. `TheOpenAbove` was prioritized because these commits were newer than the previous central documentation state:

```txt
5ce61d3a995ab5dfa0d26bd2bd38f4072de91b7b
aa447b2ccdb06ea43e9940a45f7e5263169b579b
```

## Product interaction loop

```txt
load route and resolve ESM
  -> construct visual domain and terrain streamer
  -> construct balloon simulation, object, camera, presentation and telemetry
  -> sample keyboard and wheel input
  -> RAF advances flight and camera
  -> terrain update rounds camera position to one chunk center
  -> center change computes required chunk and LOD set
  -> stale or wrong-LOD geometry is removed
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
ESM/CDN source admission
world and campaign source
browser input
RAF and visibility cadence
balloon simulation and presentation
camera and clipping
quality and dynamic resolution
sky, lighting, weather and clouds
terrain height and moisture
world-space terrain palette and color fields
LOD-dependent slope sampling
chunk identity, membership, LOD and synchronous build
vertex colors, normals, bounds and cloud shadows
vegetation, grass, water and landmarks
HDR composition and lens response
telemetry, HUD and GameHost projection
runtime lifecycle and disposal
headless routing, smoke tests and Pages deployment
planned fixed-step time authority
planned terrain surface authority
planned Meadow Lift objective authority
```

## Kits and services

The complete inventory remains in `.agent/current-audit.md` and `.agent/kit-registry.json`. Terrain-specific services are:

```txt
open-above-terrain-surface-kit
  height
  moisture
  palette and world-space color
  shared material
  terrain-streamer composition

open-above-terrain-chunk-streaming-kit
  chunk key and membership
  camera-distance LOD
  synchronous geometry build
  height and color buffers
  computed normals and bounds
  chunk release/disposal
  cloud-shadow shader adaptation
```

The pass proposes:

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

## Main finding

The new color field is deterministic in world coordinates, but its slope input is derived from `sampleStep = chunkSize / segments`. A shared world coordinate can receive a different soft-rock blend at another LOD. Chunk normals are computed separately, mixed-resolution edges have no continuity contract, and rebuild work is synchronous with no frame budget.

High-quality initial membership can include:

```txt
37 chunks
60,597 vertices
302,985 minimum terrainHeight evaluations for height and slope
```

The current smoke test verifies source strings, not numeric color output, LOD parity, seam continuity or measured transition cost.

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
repo-local docs pushed to main: yes
central ledger synchronized: yes
central internal change log added: yes
```