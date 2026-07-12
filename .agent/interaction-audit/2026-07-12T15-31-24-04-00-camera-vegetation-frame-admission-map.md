# Interaction Audit: Camera to Vegetation Frame Admission

**Timestamp:** `2026-07-12T15-31-24-04-00`

## Summary

Camera movement currently drives terrain, grass and flower updates but produces no vegetation command, requirement set or result. Tree coverage therefore has no interaction boundary between camera/world state and live render ownership.

## Plan ledger

**Goal:** normalize camera/world changes into revisioned vegetation-frame commands whose results can be admitted, rejected, deferred or rolled back without partial scene mutation.

- [x] Trace camera movement into visual update.
- [x] Confirm no vegetation update is called.
- [x] Define command inputs and result classes.
- [x] Define stale-world, stale-camera and duplicate handling.
- [ ] Implement command production and consumption.

## Current map

```txt
simulation state
  -> cameraRig.update()
  -> visual.update()
      -> terrain.update(camera)
      -> grass.update(elapsed, camera)
      -> flowers.update(elapsed, camera)
      -> no vegetation update
```

## Required command

```txt
VegetationFrameCommand {
  commandId
  runtimeSessionId
  expectedWorldBuildId
  expectedWorldFingerprint
  expectedVegetationGeneration
  cameraFrameId
  cameraPosition
  cameraCell
  qualityRevision
  vegetationConfigFingerprint
  budgetProfileId
}
```

## Admission map

```txt
receive VegetationFrameCommand
  -> validate session and world generation
  -> reject duplicate or stale command IDs
  -> derive required coverage cells
  -> classify cells as inside, edge or outside world
  -> reuse admitted current chunks
  -> stage missing candidates under budget
  -> validate exclusions and aggregate coverage
  -> commit complete successor set or preserve predecessor
  -> publish VegetationFrameResult
  -> render and publish VegetationVisibleFrameAck
```

## Typed results

```txt
Committed
NoChange
DeferredBudget
DegradedPolicy
RejectedStaleSession
RejectedStaleWorld
RejectedStaleCamera
RejectedInvalidInput
FailedCandidateLastGoodRetained
FailedNoLastGood
```

## Zero-mutation rejection rule

Rejected, duplicate or stale commands must not:

```txt
change live tree matrices
change grass/flower exclusion data
retire predecessor resources
advance vegetation generation
publish a success observation
```

## Correlation requirements

```txt
commandId -> coveragePlanId -> candidateSetId -> adoptionResultId
adoptionResultId -> vegetationFrameId -> renderFrameId
worldBuildId + vegetationFrameId must match grass/flower exclusion receipts
```

Documentation only. No command surface exists yet.