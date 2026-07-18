# Architecture Audit: Balloon Simulation Tick Allocation and Terrain Sample DSK Map

**Timestamp:** `2026-07-18T01-41-38-04-00`  
**Status:** `balloon-simulation-tick-allocation-terrain-sample-budget-authority-audited`

## Current DSK and domain chain

```txt
open-above-meadow-lift-scene
  -> open-above-journey-domain
  -> open-above-ballooning-domain
       -> open-above-balloon-simulation-kit
            -> open-above-airstream-balloon-force-kit
            -> open-above-wind-relative-steering-kit
            -> terrainHeight provider from open-above-terrain-surface-kit
  -> open-above-sky-domain
       -> open-above-airstream-domain
  -> open-above-experience-domain
       -> open-above-balloon-presentation-domain
       -> open-above-visual-domain
```

## Existing ownership

| Surface | Current service |
|---|---|
| Journey | admits bounded active frames and suppresses update while map is open |
| Ballooning | owns mount/update/apply/animate ordering around Balloon Simulation |
| Balloon Simulation | owns input, buoyancy, venting, steering, integration, terrain contact, telemetry and snapshots |
| Airstream Balloon Force | normalizes sampler output and copies flow evidence into public simulation state |
| Wind-relative Steering | resolves flow-relative turn offset, heading and target horizontal velocity |
| Terrain Surface | supplies `terrainHeight(x, z)` |
| Experience | binds accepted simulation state to camera, balloon presentation and the rendered frame |

## Architectural finding

The simulation is behaviorally centralized but tick memory and query ownership are not explicit. Each accepted update constructs short-lived flow, velocity, contributor, steering and vector objects. It also eagerly computes fallback wind before sampler success is known and performs two same-coordinate terrain-height queries.

The current public state replacement path means `state.airstream` changes object identity each tick. That may be acceptable, but it is not declared as an immutable-result boundary or a stable mutable-state contract.

## Proposed parent authority

`open-above-balloon-simulation-tick-allocation-terrain-sample-budget-authority-domain`

```txt
BalloonSimulationGenerationAdmissionCommand
  -> BalloonSimulationGenerationResult

BalloonSimulationTickCommand
  -> BalloonSimulationTickResult

BalloonTerrainSampleCommand
  -> BalloonTerrainSampleResult

BalloonSimulationBudgetSettlementCommand
  -> BalloonSimulationBudgetResult

BalloonSimulationProjectionCommitCommand
  -> BalloonSimulationTickDigest
  -> FirstAllocationBoundFlightFrameAck
```

## Proposed DSK responsibilities

```txt
balloon-simulation-generation-kit
  owns one simulation generation and its reusable scratch resources

balloon-simulation-tick-plan-kit
  binds dt, input, sampler, terrain provider and prior state

lazy-fallback-wind-kit
  evaluates fallback only when live sampling cannot produce velocity

airstream-flow-scratch-kit
  owns reusable normalized flow storage

airstream-state-in-place-copy-kit
  updates public airstream fields without undocumented identity churn

airstream-contributor-scratch-kit
  reuses contributor storage under an explicit capacity policy

wind-relative-steering-result-scratch-kit
  writes steering output into generation-owned state

balloon-velocity-target-scratch-kit
  reuses one THREE.Vector3 target for velocity interpolation

balloon-terrain-sample-reuse-kit
  publishes one post-integration terrain sample for floor and altitude

balloon-simulation-allocation-budget-kit
  records allocation evidence and accepted limits

balloon-terrain-query-budget-kit
  records terrain query count and provider revision

balloon-simulation-tick-result-kit
  publishes accepted state transition evidence

stale-balloon-simulation-tick-rejection-kit
  rejects retired or mismatched generation work

balloon-simulation-budget-diagnostics-kit
  exposes scratch identity, allocation and query evidence

balloon-simulation-tick-digest-kit
  binds accepted tick and terrain sample to projected state

first-allocation-bound-flight-frame-ack-kit
  proves the accepted tick reached the matching frame
```

## Compatibility constraints

Preserve:

- Journey pause and frame admission;
- current burner, vent, buoyancy, damping and ceiling equations;
- Airstream influence, route, contributor and capture-state semantics;
- ±15-degree wind-relative steering;
- terrain floor offset of 30 units;
- altitude, distance and message behavior;
- deterministic state evolution for identical input, dt, terrain and sampler evidence;
- existing snapshots and external readback unless explicitly versioned.

## Boundary

This audit proposes ownership only. No DSK, runtime, sampler, terrain provider, simulation equation, render path, test, workflow or deployment was changed.