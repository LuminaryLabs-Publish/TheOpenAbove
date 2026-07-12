# Architecture Audit: Terrain Streaming Ownership Authority DSK Map

**Timestamp:** `2026-07-12T13-29-56-04-00`

## Summary

The new terrain contract correctly establishes one immutable camera-relative classification frame and disjoint near/horizon coverage. The architecture still lacks a transaction that stages both terrain consumer sets, validates them together, commits them atomically and proves which aggregate reached the visible frame.

## Goal

Promote terrain streaming from two cooperating live-group mutators into one bounded domain authority with typed identities, candidate construction, aggregate admission, rollback, retirement and frame provenance.

## Current composition

```txt
open-above-terrain-surface-kit
  -> createTerrainStreamingFrame(camera)
  -> open-above-terrain-chunk-streaming-kit.updateFromFrame(frame)
  -> open-above-terrain-horizon-streaming-kit.updateFromFrame(frame)
  -> activeFrame = frame
```

The shared frame contains camera position, near/horizon centers, chunk sizes, near requirements, near bounds and a deterministic string revision. Horizon requirements partition coarse chunks around exact near bounds and omit near-owned cells.

## Missing bounded domain

```txt
open-above-terrain-streaming-ownership-authority-domain
```

### Identity and inputs

```txt
open-above-terrain-stream-session-id-kit
open-above-terrain-stream-frame-id-kit
open-above-terrain-stream-input-fingerprint-kit
open-above-terrain-chunk-generation-id-kit
```

Services:

```txt
bind stream work to one runtime session
bind every plan and mesh to one world artifact revision
fingerprint quality, chunk sizes, radii, LOD tables, geometry schema and material generation
reject stale work and stale adoption
```

### Planning and admission

```txt
open-above-terrain-chunk-ownership-plan-kit
open-above-terrain-near-requirements-kit
open-above-terrain-horizon-requirements-kit
open-above-terrain-partition-admission-kit
open-above-terrain-stream-parity-result-kit
```

Services:

```txt
derive near/horizon ownership from one camera sample
prove world membership
prove no interior surface overlap
prove required seam adjacency and skirts
validate LOD and clip-signature consistency
publish accepted or rejected aggregate plan
```

### Candidate construction and commit

```txt
open-above-terrain-chunk-build-result-kit
open-above-terrain-stream-candidate-set-kit
open-above-terrain-stream-aggregate-commit-kit
open-above-terrain-stream-rollback-kit
open-above-terrain-chunk-retirement-kit
```

Services:

```txt
build geometry outside live scene groups
record allocation, sample and geometry failures per chunk
validate complete candidate set before visibility
atomically attach near and horizon candidates
retain predecessor aggregate until commit succeeds
retire predecessor resources exactly once
return rollback and retirement receipts
```

### Consumer and frame proof

```txt
open-above-terrain-consumer-receipt-kit
open-above-terrain-visible-frame-ack-kit
open-above-terrain-stream-observation-kit
open-above-terrain-stream-journal-kit
```

Services:

```txt
record near and horizon adoption against one frame ID
publish active/created/reused/retired/rejected counts
correlate terrain commit with render frame and world fingerprint
retain bounded transition history
```

### Fixtures

```txt
open-above-terrain-boundary-transition-fixture-kit
open-above-terrain-build-failure-rollback-fixture-kit
open-above-terrain-browser-pages-fixture-kit
```

## Required aggregate

```txt
TerrainStreamPlan {
  sessionId
  frameId
  worldBuildId
  worldFingerprint
  inputFingerprint
  cameraCell
  nearRequirements
  horizonRequirements
  ownershipFingerprint
}

TerrainStreamCommitResult {
  status
  frameId
  nearReceipt
  horizonReceipt
  createdCount
  reusedCount
  retiredCount
  rollbackReceipt
  aggregateFingerprint
}

TerrainVisibleFrameAck {
  renderFrameId
  frameId
  aggregateFingerprint
  worldFingerprint
}
```

## Invariants

```txt
one world coordinate has at most one authoritative terrain surface owner
near and horizon consumers adopt the same frame ID or neither commits
failed candidate construction leaves the predecessor aggregate visible
retired geometry is disposed exactly once
all visible terrain meshes cite stream frame and world identities
render acknowledgement occurs only after aggregate commit
```

## Status

Documentation only. The current runtime contains the shared classification frame and disjoint partitioning, but not the aggregate authority above.