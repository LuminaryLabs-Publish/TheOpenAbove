# START HERE: TheOpenAbove

**Last aligned:** `2026-07-11T16-30-25-04-00`

**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

**Branch:** `main`

## Summary

The far-horizon terrain streamer chooses 10, 6 or 4 geometry segments from camera-relative distance only when a chunk is created. Retained horizon keys are never reclassified after the camera center moves, so the visible mesh can keep an obsolete segment count even when the current policy requires another LOD.

The next terrain ledge is one transition authority spanning chunk identity, terrain-source revision, intended and actual LOD, work admission, detached geometry builds, edge validation, atomic replacement, frame observation and bounded evidence.

## Current ledge

```txt
TheOpenAbove Terrain LOD Transition Authority
+ Retained Horizon Reclassification / Atomic Replacement / Work-Budget Fixture Gate
```

## Plan ledger

**Goal:** ensure every active near and horizon chunk renders geometry matching the current terrain revision and current camera-relative LOD policy, with bounded and atomic replacement.

- [x] Compare all ten accessible Publish repositories with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have ledger and root `.agent` coverage.
- [x] Select only `TheOpenAbove` as the oldest eligible central entry.
- [x] Trace camera movement through near and horizon center updates.
- [x] Identify the interaction loop, domains, kits and services.
- [x] Compare near retained-chunk LOD replacement with horizon retained-key behavior.
- [x] Record the horizon LOD staleness path.
- [x] Define chunk classification, transition, build-budget, edge, replacement and observation kits.
- [x] Add timestamped architecture and system audits.
- [x] Refresh all required root `.agent` documents.
- [x] Change no runtime or deployment behavior.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Runtime implementation and executable terrain-transition fixtures remain future work.

## Read first

```txt
.agent/trackers/2026-07-11T16-30-25-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-11T16-30-25-04-00.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-11T16-30-25-04-00-terrain-lod-transition-authority-dsk-map.md
.agent/render-audit/2026-07-11T16-30-25-04-00-retained-horizon-chunk-lod-staleness-gap.md
.agent/interaction-audit/2026-07-11T16-30-25-04-00-camera-center-lod-reclassification-map.md
.agent/terrain-system-audit/2026-07-11T16-30-25-04-00-horizon-lod-reclassification-contract.md
.agent/performance-audit/2026-07-11T16-30-25-04-00-terrain-lod-build-budget-contract.md
.agent/deploy-audit/2026-07-11T16-30-25-04-00-terrain-lod-transition-fixture-gate.md
```

## Current terrain update order

```txt
visual.update
  -> terrain.update(camera, weather)
  -> near streamer update
       required key + intended LOD map
       replace retained wrong-LOD meshes
  -> horizon streamer update
       required key set only
       retain existing keys without reclassification
  -> render scene
```

## Concrete stale-LOD case

```txt
horizon chunk 5:0 created from center 0:0
  distance 5200 m -> 4 segments

camera advances to center 2:0
  current distance 3120 m -> policy requires 10 segments
  key 5:0 remains required
  existing key skips createChunk
  actual mesh remains 4 segments
```

## Required authority flow

```txt
camera frame + quality revision + terrain revision
  -> classify every required near and horizon key
  -> compare intended and committed geometry identities
  -> plan creates, releases and LOD replacements
  -> admit bounded build work
  -> build and validate detached geometry candidates
  -> atomically commit complete replacements
  -> correlate first visible replacement frame
  -> retire old geometry after frame release
  -> publish intended/actual observations and bounded journal rows
```

## Priority order

```txt
1. Immutable Runtime Admission
2. Import Purity and Frame Ownership
3. Runtime Session Lifecycle and Ordered Disposal
4. Fixed-Step Clock and Sequenced Input
4a. Product Source Supersession and Acceptance Contract Parity
5. Air Mail Route and Delivery Authority
5a. Air Mail Mission Restart Transaction and Mission Epoch
5b. Committed Observation Frame Authority
6. Terrain Source, LOD Transition and Horizon Continuity Authority
6a. Bounded Terrain Build and Atomic Replacement
```

Documentation only. Runtime implementation and executable terrain LOD fixtures remain future work.