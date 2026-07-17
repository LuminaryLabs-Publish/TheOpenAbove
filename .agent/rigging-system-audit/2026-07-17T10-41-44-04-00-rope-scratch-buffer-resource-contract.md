# Rigging System Audit: Rope Scratch, Buffer, and Resource Contract

**Timestamp:** `2026-07-17T10-41-44-04-00`

## Current implementation

- Four rope groups are created by `buildRigging()`.
- Each rope owns one dynamic position buffer and one dynamic normal buffer.
- `animateRigging()` computes tension and updates every rope each frame.
- `computePoints()` creates a fresh points array and point vectors.
- `updateTubeGeometry()` creates fresh tangent, frame-normal, binormal, ring-normal, and ring-position vectors.
- No rope or rigging `dispose()` service exists.
- Balloon replacement removes old children without an explicit retirement transaction.

## Required contract

```txt
RiggingResourceManifest
  riggingGeneration
  ropeGenerations[]
  geometries[]
  materials[]
  dynamicBuffers[]
  scratchSets[]
  owner
  state

RopeScratchSet
  endpoints
  points[segmentCount + 1]
  tangent
  frameNormal
  binormal
  ringNormal
  ringPosition

RiggingFrameUpdateResult
  accepted
  riggingGeneration
  simulationRevision
  tensionRevision
  updatedRopes
  updatedVertices
  bufferRevisions[]
  updateDurationMs
  temporaryAllocationCount
  rejectionReason

RiggingResourceRetirementResult
  accepted
  retiredGeneration
  disposedGeometries
  disposedMaterials
  detachedObjects
  duplicateRetirement
```

## Required invariants

- Scratch capacity is topology-bound and reused.
- Typed-array identities remain stable until retirement.
- A rope buffer has one live owner.
- Replacement cannot orphan prior geometries or materials.
- Retirement clears updater references before disposal.
- Repeated retirement is harmless and observable.

## Proof matrix

```txt
steady 10-minute flight -> allocation plateau
resize / quality change -> no rope topology corruption
map pause / resume -> no hidden extra rigging owner
model replacement -> predecessor retired before successor frame
route disposal -> no post-retirement buffer writes
source / artifact / Pages -> matching results
```

No runtime changes or executable proof were added.