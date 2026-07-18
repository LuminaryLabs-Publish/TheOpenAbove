# Next Steps: TheOpenAbove Balloon Simulation Tick Allocation and Terrain Sample Authority

**Last aligned:** `2026-07-18T01-41-38-04-00`  
**Status:** `balloon-simulation-tick-allocation-terrain-sample-budget-authority-audited`

## Summary

Preserve current flight behavior while replacing repeated tick construction and duplicate terrain sampling with generation-owned scratch state and explicit result boundaries.

## Intent

Produce one deterministic path from accepted input and dt through normalized flow, steering, one terrain sample, bounded tick work, pose projection, and the matching frame.

## What needs to happen

### Gate 1: Generation and scratch admission

- [ ] Add `BalloonSimulationGeneration` and immutable sampler/terrain-provider revisions.
- [ ] Allocate reusable flow, contributor, steering, and velocity-target scratch state once.
- [ ] Publish `BalloonSimulationGenerationResult` with a diagnostic scratch manifest.

### Gate 2: Lazy flow settlement

- [ ] Avoid evaluating fallback wind until the live sampler is unavailable or invalid.
- [ ] Normalize live or fallback flow into reusable scratch state.
- [ ] Choose and document stable mutable public airstream state or a versioned immutable result.
- [ ] Publish `BalloonSimulationTickResult`.

### Gate 3: Terrain sample reuse

- [ ] Sample post-integration terrain once at accepted horizontal coordinates.
- [ ] Bind height to `TerrainSampleRevision` and provider revision.
- [ ] Reuse the sample for floor settlement and altitude.
- [ ] Publish `BalloonTerrainSampleResult`.

### Gate 4: Budget settlement

- [ ] Record attributed allocations, reused scratch writes, fallback evaluations, terrain queries, and tick duration.
- [ ] Define accepted budgets from measurements rather than source arithmetic.
- [ ] Publish `BalloonSimulationBudgetResult`.

### Gate 5: Diagnostics and frame proof

- [ ] Expose simulation generation, tick, flow, terrain sample, scratch identity, query count, and budget state.
- [ ] Publish `BalloonSimulationTickDigest` after pose projection.
- [ ] Publish `FirstAllocationBoundFlightFrameAck` after the matching frame is presented.

### Gate 6: Retirement

- [ ] Reject updates after simulation generation retirement.
- [ ] Clear contributor scratch and listener ownership exactly once.
- [ ] Make repeated retirement harmless and observable.

### Gate 7: Fixtures

- [ ] Capture a current deterministic golden trace.
- [ ] Run warm-up and at least 10,000 accepted controlled ticks.
- [ ] Require one post-integration terrain query per accepted tick.
- [ ] Verify fallback evaluation occurs only when required.
- [ ] Compare all accepted flight and pose outputs after scratch adoption.
- [ ] Observe browser heap, GC, frame pacing, and visible stability during long flights.
- [ ] Verify source, Vite artifact, and Pages parity.

## Recommended file cut

```txt
src/domains/ballooning/simulation-budget/
  balloon-simulation-tick-allocation-terrain-sample-budget-authority-domain.js
  balloon-simulation-generation-kit.js
  balloon-simulation-tick-plan-kit.js
  balloon-simulation-allocation-budget-kit.js
  balloon-terrain-sample-reuse-kit.js
  balloon-simulation-tick-digest-kit.js

src/runtime/
  balloon-simulation-kit.js
  airstream-domain/airstream-balloon-force-kit.js

src/domains/ballooning/
  wind-relative-steering-kit.js

tests/
  balloon-simulation-allocation.mjs
  balloon-terrain-sample-count.mjs
  balloon-deterministic-flight-parity.mjs
```

## Compatibility constraints

Preserve all current control mappings, simulation equations, Airstream semantics, terrain floor clearance, map suspension, balloon pose, camera, wind visuals, clouds, sightseeing, snapshots, and deployment behavior.

## Do not claim

Do not claim allocation reduction, garbage-collection improvement, faster ticks, deterministic parity, exact frame convergence, artifact parity, Pages parity, or production readiness until implementation and fixtures exist.