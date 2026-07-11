# START HERE: TheOpenAbove

**Last aligned:** `2026-07-11T18-01-38-04-00`

**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

**Branch:** `main`

## Summary

The active grass domain rebuilds deterministic chunks around the moving camera, but the instances use absolute world-space transforms while each `InstancedMesh` remains at the global origin. Manual culling measures camera distance to `mesh.position`, so every chunk receives the same origin-based visibility decision.

The current threshold is `520 * 4.2 = 2184 m`. After the camera crosses that radius, all newly generated camera-centered grass chunks can remain invisible. The culling helper can also report `webgpu-compute` without constructing or dispatching a GPU compute pipeline.

## Current ledge

```txt
TheOpenAbove Grass Spatial Culling Authority
+ Chunk Bounds / Backend Truth / Origin-Crossing Frame Fixture Gate
```

## Plan ledger

**Goal:** keep streamed grass spatially attached to the current camera neighborhood and make culling backend, work and visible-frame observations truthful.

- [x] Compare all ten accessible Publish repositories with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have ledger and root `.agent` coverage.
- [x] Select only `TheOpenAbove` as the oldest eligible central entry.
- [x] Trace grass seed, placement, LOD, rebuild, culling, observation and render order.
- [x] Identify the interaction loop, domains, kits and services.
- [x] Prove the camera-to-global-origin culling path from checked-in source.
- [x] Record the WebGPU capability-versus-execution mismatch.
- [x] Define chunk identity, bounds, backend selection, typed decisions, visible-set commit and frame acknowledgement kits.
- [x] Add timestamped architecture and system audits.
- [x] Refresh all required root `.agent` documents.
- [x] Change no runtime or deployment behavior.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Runtime implementation and executable traversal fixtures remain future work.

## Read first

```txt
.agent/trackers/2026-07-11T18-01-38-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-11T18-01-38-04-00.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-11T18-01-38-04-00-grass-spatial-culling-authority-dsk-map.md
.agent/render-audit/2026-07-11T18-01-38-04-00-camera-centered-grass-origin-culling-gap.md
.agent/gameplay-audit/2026-07-11T18-01-38-04-00-balloon-traversal-grass-visibility-loop.md
.agent/interaction-audit/2026-07-11T18-01-38-04-00-camera-center-grass-cull-result-map.md
.agent/grass-system-audit/2026-07-11T18-01-38-04-00-chunk-spatial-identity-backend-truth-contract.md
.agent/performance-audit/2026-07-11T18-01-38-04-00-grass-culling-work-backend-observation-contract.md
.agent/deploy-audit/2026-07-11T18-01-38-04-00-grass-traversal-culling-fixture-gate.md
```

## Current grass update order

```txt
visual.update
  -> grass.update(elapsed, camera)
  -> round camera position to 520 m center
  -> rebuild required deterministic chunks when center changes
  -> place instances at absolute world coordinates
  -> keep chunk mesh transform at 0,0,0
  -> calculate each chunk distance from camera to mesh.position
  -> apply one origin-based visibility result per chunk
  -> render
```

## Concrete failure case

```txt
camera center moves beyond 2184 m from origin
  -> active chunk set rebuilds around camera
  -> accepted instance count remains nonzero
  -> every new mesh remains positioned at origin
  -> every cull distance remains camera-to-origin
  -> every active grass mesh becomes invisible
```

## Backend truth case

```txt
navigator.gpu exists
  -> backend reports webgpu-compute

actual path
  -> CPU Boolean comparison
  -> no GPU pipeline or dispatch
  -> dispatchedWorkgroups still increments
```

## Required authority flow

```txt
camera frame + quality revision + runtime epoch
  -> accept camera-center revision
  -> enumerate required grass chunks
  -> derive stable chunk identities and bounds
  -> classify intended LOD
  -> select an actually available backend
  -> execute culling against chunk bounds
  -> reject stale or incomplete results
  -> atomically commit visible set
  -> submit frame and acknowledge visible grass counts
  -> publish detached observation and bounded journal row
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
7. Grass Spatial Culling and Backend Truth Authority
7a. Origin-Crossing / Visible-Set / Frame Fixture Gate
```

Documentation only. Runtime implementation and executable grass traversal fixtures remain future work.
