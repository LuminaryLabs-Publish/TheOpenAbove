# Interaction Audit: Camera to Vegetation Admission Reconciliation

**Timestamp:** `2026-07-12T15-40-04-04-00`

## Summary

The camera drives terrain, grass and flower updates but has no command/result boundary with vegetation. The tree field therefore cannot reject stale camera generations, defer work by budget, preserve last-good chunks after failure or report what coverage was admitted.

## Plan ledger

**Goal:** turn each relevant camera movement into a sequenced vegetation command with typed admission and adoption results.

- [x] Trace camera update order.
- [x] Trace current vegetation construction order.
- [x] Confirm no per-frame vegetation command exists.
- [x] Define command, predecessor and result evidence.
- [ ] Implement command sequencing and stale-result rejection.

## Required command map

```txt
CameraVegetationFrameCommand {
  commandId
  runtimeSessionId
  worldBuildId
  expectedVegetationFrameId
  cameraRevision
  cameraPosition
  frustumRevision
  qualityRevision
  configurationFingerprint
  workBudget
}

  -> validate session/world/quality predecessors
  -> derive deterministic required cells
  -> classify inside/edge/outside world membership
  -> reuse current chunks
  -> schedule bounded missing candidates
  -> validate complete candidate aggregate
  -> adopt, defer, reject or preserve last-good
  -> return VegetationFrameResult
```

## Typed outcomes

```txt
committed
unchanged
deferred-budget
rejected-stale-camera
rejected-stale-world
rejected-invalid-input
failed-candidate-preserved-last-good
failed-adoption-preserved-last-good
stopped-session
```

## Required evidence

```txt
command and result sequence
predecessor/successor vegetation frame IDs
created/reused/retired chunk counts
required/covered/treeless/deferred/failed cell counts
world/config/quality fingerprints
exclusion artifact revision
first visible frame acknowledgement
```

Documentation only. No interaction command was implemented.