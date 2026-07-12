# Terrain System Audit: Shared Frame and Atomic Adoption Contract

**Timestamp:** `2026-07-12T13-29-56-04-00`

## Summary

The source now separates near and horizon ownership deterministically. This contract preserves that improvement while adding the missing aggregate lifecycle required for safe replacement and proof.

## Existing contract retained

```txt
near chunk size: 520
horizon scale: 2
horizon chunk size: 1040
one camera-derived frozen frame
stable negative/positive grid rounding
exact near bounds
horizon partitioning at near boundaries
visible horizon cells exclude near-owned interiors
LOD and clip-signature reclassification
near and horizon skirts
world-surface intersection filtering
```

## Missing aggregate contract

### Plan

The plan must identify:

```txt
session
world artifact
quality and geometry configuration
camera sample
near/horizon ownership
seam policy
plan fingerprint
```

### Build

Every chunk build must be detached from the live group and return:

```txt
chunkGenerationId
owner: near | horizon
coordinates and bounds
LOD/segments/clip signature
world and stream frame IDs
geometry/resource lease
success or typed failure
```

### Admission

Before commit, validate:

```txt
all required chunks have successful results or accepted reuse
near and horizon interiors are disjoint
all bounds remain inside admitted world policy
shared seams have compatible edge samples
all chunks cite the same world and stream frame
candidate resource total is inside budget
```

### Commit

```txt
attach complete candidate aggregate
publish active terrain revision
publish consumer receipts
retire predecessor aggregate exactly once
return commit receipt
```

No predecessor mesh may be disposed before candidate admission succeeds.

### Rollback

```txt
candidate failure
  -> detach and dispose candidate resources only
  -> preserve predecessor groups and active revision
  -> publish rollback receipt
```

### Frame proof

```txt
render frame
  -> cite committed terrain aggregate fingerprint
  -> cite near and horizon receipts
  -> acknowledge first visible use
```

## Current source deltas

```txt
resolved:
  duplicate near/horizon interior coverage
  coarse retained-chunk classification drift
  horizon scale expansion and offset
  unskirted transition boundaries
  flat field/road overlays
  divergent lake descriptors
  missing landmark/water disposal

remaining:
  typed identities and fingerprints
  detached candidate construction
  aggregate parity result
  atomic adoption and rollback
  exactly-once retirement receipts
  first-visible-frame acknowledgement
```

## Status

The shared classification logic is implemented. Atomic aggregate adoption is not.