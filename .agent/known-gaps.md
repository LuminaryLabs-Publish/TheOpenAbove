# Known Gaps: TheOpenAbove Balloon Simulation Tick Allocation and Terrain Sample Authority

**Last aligned:** `2026-07-18T01-41-38-04-00`  
**Status:** `balloon-simulation-tick-allocation-terrain-sample-budget-authority-audited`

## Summary

The balloon simulation has clear behavior ownership and persistent primary vectors. Its accepted tick still performs repeated short-lived construction, eager fallback work, and duplicate same-coordinate terrain sampling without explicit budget or frame evidence.

## Intent

Keep performance and correctness claims provisional until one authority owns scratch state, lazy fallback, terrain-sample identity, tick budgets, retirement, diagnostics, deterministic parity, and rendered-frame proof.

## Generation and scratch gaps

```txt
BalloonSimulationGeneration: absent
scratch resource manifest: absent
reusable normalized-flow scratch: absent
reusable contributor scratch: absent
stable public airstream identity contract: absent
reusable steering result: absent
reusable velocity target vector: absent
stale generation rejection: absent
```

## Work and query gaps

```txt
source-local minimum allocations per accepted tick: 9
source-local minimum at 60 accepted ticks/second: 540
measured allocation result: absent
measured retained-memory result: absent
GC observation: absent
fallback need/admission result: absent
fallback evaluation count: absent
post-integration same-coordinate terrain queries: 2
TerrainSampleRevision: absent
terrain query budget result: absent
measured tick duration: absent
```

The allocation figures are construction-site arithmetic only. They do not include allocations inside Sky/Airstream sampling, animation, rendering, browser internals, or Three.js internals.

## Projection and lifecycle gaps

```txt
BalloonSimulationTickResult: absent
BalloonTerrainSampleResult: absent
BalloonSimulationBudgetResult: absent
BalloonSimulationTickDigest: absent
FirstAllocationBoundFlightFrameAck: absent
retirement result: absent
repeated retirement result: absent
public allocation/query diagnostics: absent
```

## Proof gaps

```txt
current deterministic golden trace: absent
10,000-tick controlled fixture: absent
scratch identity fixture: absent
fallback laziness fixture: absent
one-terrain-query fixture: absent
stale-generation fixture: absent
browser long-flight heap/GC fixture: absent
source/build/Pages parity: absent
```

## Current risk boundary

Source inspection proves repeated construction and duplicate terrain-provider calls. It does not prove a browser hitch, harmful garbage collection, meaningful terrain-query cost, a gameplay defect, or that a scratch-state change would improve performance.

## Retained product gaps

Wind-particle budgeting, balloon rigging allocation/retirement, camera pointer admission, Gaussian cloud membership, camera zoom, photo artifacts, validation severity, weather-clock ownership, page lifecycle, WebGL recovery, audio, control coverage, fixed-step pacing, HDR/depth coherence, provider identity, route retirement, terrain/flora proof, and persistence remain unresolved.

## Do not claim

Do not claim measured allocation rate, garbage-collection impact, reduced tick cost, deterministic parity, exact tick/frame convergence, artifact parity, Pages parity, or production readiness until implementation and fixtures exist.