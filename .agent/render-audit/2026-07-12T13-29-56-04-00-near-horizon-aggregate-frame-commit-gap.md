# Render Audit: Near/Horizon Aggregate Frame Commit Gap

**Timestamp:** `2026-07-12T13-29-56-04-00`

## Summary

Near and horizon terrain now derive from the same camera-relative frame and no longer intentionally cover the same interior cells. Rendering still consumes two independently mutated live groups without an aggregate terrain commit or first-visible-frame receipt.

## Current render path

```txt
camera update
  -> create TerrainStreamingFrame
  -> near live group removes/rebuilds meshes
  -> horizon live group removes/rebuilds/reclassifies meshes
  -> activeFrame is assigned
  -> visual renderer draws scene
```

## Resolved visual defects

```txt
coarse horizon cells covered by near terrain are omitted
horizon geometry expansion removed
horizon vertical offset removed
retained horizon chunks reclassify when clip signature changes
near and horizon skirts mask boundary cracks
fields and roads follow terrain height
lake surfaces share authored descriptors and feather edges
```

## Remaining render risk

### Partial live replacement

Near and horizon rebuild functions remove old meshes before constructing every replacement. If any geometry build throws, the live scene can contain a partial predecessor/candidate mixture. There is no last-good aggregate or rollback result.

### Sequential adoption

Near adoption completes before horizon adoption begins. No render barrier proves both consumers reached the same streaming frame before draw submission.

### Incomplete mesh provenance

Near mesh metadata includes coordinates, LOD and bounds. Horizon metadata includes coordinates, LOD, segments, clip signature and frame revision. Neither side cites a typed terrain aggregate commit or world artifact fingerprint.

### No first-frame proof

The render snapshot exposes chunk counts and the world descriptor but does not identify:

```txt
TerrainStreamFrameId
TerrainStreamCommitResult
near/horizon parity fingerprint
created/reused/retired/rejected counts
rollback status
first visible render frame for the commit
```

## Required render admission

```txt
complete candidate near set
  + complete candidate horizon set
  + ownership parity result
  -> atomic scene-group swap
  -> predecessor retirement
  -> render frame submission
  -> TerrainVisibleFrameAck
```

## Browser proof matrix

```txt
cross positive and negative 520-unit boundaries
cross 1,040-unit horizon-center boundaries
fly diagonally across simultaneous X/Z transitions
change altitude while crossing boundaries
exercise low, medium and high quality profiles
inject one candidate geometry failure
verify last-good terrain remains visible
verify one aggregate fingerprint in machine state and screenshot record
```

## Status

No runtime rendering behavior changed in this documentation pass. Existing pure tests prove ownership classification, not atomic visible-frame adoption.