# START HERE: TheOpenAbove

**Last aligned:** `2026-07-11T03-01-38-04-00`

**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

**Branch:** `main`

## Summary

`TheOpenAbove` is a Vite-hosted Three.js hot-air-balloon drift route with procedural balloon presentation, physical atmosphere, streamed terrain, deterministic grass, adaptive rendering, Nexus telemetry, and GameHost readback.

This pass reconciles the terrain-surface runtime changes that landed after the prior documentation audit. Random repeated color and normal textures were replaced with deterministic world-space Frutiger Aero color fields, while the smoke test was updated to lock that source shape. The remaining gap is terrain-surface authority across LOD slope sampling, per-chunk normals, synchronous rebuild cost, render consumption, and numeric proof.

## Ordered safe ledges

```txt
1. Immutable Runtime Admission + Boot Capability Fixture Gate
2. Import-Pure Balloon Object Kit + Frame Ownership Fixture Gate
3. Runtime Session Lifecycle + Ordered Disposal/Reboot Fixture Gate
4. Fixed-Step Simulation Clock + Visibility/Cadence Parity Fixture Gate
5. Terrain Surface Authority + LOD Continuity/Chunk-Rebuild Fixture Gate
6. Meadow Lift Objective Authority + Deterministic Route Fixture Gate
```

## Selection result

The accessible `LuminaryLabs-Publish` inventory contained ten repositories. `TheCavalryOfRome` remained excluded. All nine eligible repositories were centrally tracked and had root `.agent` state.

`TheOpenAbove` was selected before the oldest documented fallback because its runtime changed after the central `2026-07-11T00-49-45-04-00` audit:

```txt
5ce61d3a995ab5dfa0d26bd2bd38f4072de91b7b  feat: smooth terrain into Frutiger Aero gradients
aa447b2ccdb06ea43e9940a45f7e5263169b579b  test: lock smooth world-space terrain surface
```

Only `LuminaryLabs-Publish/TheOpenAbove` was changed in the Publish organization.

## Read first

```txt
.agent/trackers/2026-07-11T03-01-38-04-00/project-breakdown.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
```

Then read:

```txt
.agent/turn-ledger/2026-07-11T03-01-38-04-00.md
.agent/architecture-audit/2026-07-11T03-01-38-04-00-terrain-surface-authority-dsk-map.md
.agent/render-audit/2026-07-11T03-01-38-04-00-world-gradient-lod-seam-rebuild-gap.md
.agent/gameplay-audit/2026-07-11T03-01-38-04-00-camera-chunk-transition-frame-cost-loop.md
.agent/interaction-audit/2026-07-11T03-01-38-04-00-camera-chunk-transition-admission-map.md
.agent/terrain-system-audit/2026-07-11T03-01-38-04-00-gradient-slope-normal-continuity-contract.md
.agent/deploy-audit/2026-07-11T03-01-38-04-00-terrain-surface-numeric-fixture-gate.md
```

## Active interaction loop

```txt
browser resolves ESM
  -> createGame constructs visual, balloon, simulation, camera, presentation and telemetry
  -> createVisualDomain creates terrain surface and terrain chunk streamer
  -> camera motion selects a rounded 520-meter chunk center
  -> a center change synchronously rebuilds required chunk/LOD membership
  -> each new vertex samples terrain height, LOD-scaled slope and world-space color
  -> vertex colors and independently computed chunk normals feed one shared material
  -> weather updates the shared soft cloud-shadow shader
  -> renderer submits the streamed terrain with the rest of the balloon route
  -> next RAF repeats
```

## Main finding

The new terrain color function is deterministic and no longer depends on repeated 64×64 random textures. However, `terrainColor()` receives a slope derived from `sampleStep = chunkSize / segments`, so the same world coordinate can receive different steepness and rock blending at different LODs. Each chunk also computes normals independently, and rebuilds remain synchronous on the render thread. The current smoke test verifies source strings only; it does not prove numeric color continuity, seam-normal continuity, deterministic fingerprints, or a rebuild frame budget.

## Guardrails

```txt
Push only to main.
Create no branches or pull requests.
Do not work on TheCavalryOfRome.
Preserve the visible Balloon Drift route and the new smooth terrain art direction.
Do not restore repeated color or normal textures.
Do not retune simulation, camera, grass, atmosphere, water, lighting or postprocess.
Make terrain samples LOD-invariant before further surface tuning.
Keep proof deterministic, bounded and JSON-safe.
```