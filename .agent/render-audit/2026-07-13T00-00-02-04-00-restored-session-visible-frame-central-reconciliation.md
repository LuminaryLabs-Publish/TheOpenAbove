# Render Audit: Restored Session Visible-Frame Reconciliation

**Run:** `2026-07-13T00-00-02-04-00`

## Summary

The visual stack renders the current live balloon, mail, world, map and telemetry projections, but no frame identifies a persistence generation or restore commit. A future sequential restore could therefore expose a frame containing mixed participant generations.

## Plan ledger

**Goal:** make the first visible frame after restore prove that every rendered consumer adopted the same committed persistence generation.

- [x] Trace balloon, camera, world, map and telemetry projection from live state.
- [x] Confirm current frames have no save/restore identity.
- [x] Define render adoption receipts and stale-generation rejection.
- [x] Define a first-restored-frame acknowledgement.
- [ ] Implement browser and Pages proof.

## Current visible path

```txt
live balloon and mail mutation
  -> balloon object transform
  -> camera rig
  -> world and environment update
  -> telemetry snapshot
  -> parchment map snapshot
  -> HDR render
```

Missing evidence:

```txt
PersistenceGeneration
RestoreCommitId
balloon adoption receipt
mail adoption receipt
map adoption receipt
telemetry adoption receipt
render-frame persistence provenance
first matching RestoredVisibleFrameAck
```

## Required frame contract

```txt
RestoredFramePlan {
  runtimeSessionId
  restoreCommitId
  persistenceGeneration
  balloonRevision
  mailRevision
  worldCompatibilityRevision
  routeCompatibilityRevision
  telemetrySnapshotId
  mapProjectionRevision
}
```

The renderer may present only when all required consumer receipts cite the same restore commit and persistence generation. A stale, partial or incompatible plan must produce zero visible successor mutation.

## Required proof

```txt
save mid-flight
reload
restore one verified generation
confirm balloon position, elapsed and distance
confirm parcel route and delivery state
confirm map and telemetry cite the same generation
confirm first visible frame cites RestoreCommitId
```

## Non-claim

No render behavior changed and no restored-frame browser or Pages fixture was run.