# Interaction Audit: Simulation Tick Command and Result Map

**Timestamp:** `2026-07-18T01-41-38-04-00`  
**Status:** `balloon-simulation-tick-allocation-terrain-sample-budget-authority-audited`

## Current evidence flow

```txt
keyboard state + bounded dt
  -> simulation.update(dt)
  -> eager fallback wind object
  -> live sampler normalization objects
  -> replacement public airstream object
  -> steering result object
  -> velocity target vector
  -> two same-coordinate terrain queries
  -> mutable flight state
  -> balloon pose and visible frame
```

## Proposed command/result flow

```txt
BalloonSimulationGenerationAdmissionCommand
  -> BalloonSimulationGenerationResult
     generationId
     samplerRevision
     terrainProviderRevision
     scratchManifest

BalloonSimulationTickCommand
  -> BalloonSimulationTickResult
     tickRevision
     acceptedInputRevision
     acceptedDt
     normalizedFlowRevision
     steeringRevision
     integratedPosition

BalloonTerrainSampleCommand
  -> BalloonTerrainSampleResult
     terrainSampleRevision
     sampledPosition
     height
     grounded
     altitude

BalloonSimulationBudgetSettlementCommand
  -> BalloonSimulationBudgetResult
     allocationCount
     reusedScratchCount
     terrainQueryCount
     tickDuration
     failureOrDegradationState

BalloonSimulationProjectionCommitCommand
  -> BalloonSimulationTickDigest
  -> FirstAllocationBoundFlightFrameAck
```

## Rejection classes

```txt
stale-generation
disposed-generation
invalid-dt
invalid-input-revision
sampler-revision-mismatch
terrain-provider-revision-mismatch
non-finite-flow
non-finite-terrain-sample
budget-observation-failed
projection-revision-mismatch
```

## Current gaps

- No command/result boundary identifies one accepted tick.
- No explicit scratch-resource manifest exists.
- Fallback work is performed before failure or absence of the live sampler is known.
- Terrain floor and altitude do not share an identified sample result.
- Projection cannot prove it consumed the accepted tick and terrain revision.

## Boundary

This map is proposed documentation. No public command, result, diagnostic, or rejection surface exists yet.