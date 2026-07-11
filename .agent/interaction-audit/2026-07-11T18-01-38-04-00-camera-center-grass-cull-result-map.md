# Interaction Audit: Camera Center to Grass Cull Result Map

**Timestamp:** `2026-07-11T18-01-38-04-00`

## Current map

```txt
camera moves
  -> grass.update(elapsed, camera)
  -> round camera x/z to chunk center
  -> optionally rebuild required chunks
  -> loop active meshes
  -> compute distance to mesh.position
  -> mesh.position is 0,0,0 for each chunk
  -> culling kit returns Boolean
  -> assign mesh.visible
  -> no typed decision or acknowledgement
```

## Current inputs

```txt
camera.position
chunkSize
constant multiplier 4.2
mesh.position
```

## Missing inputs

```txt
chunk ID
chunk world center
chunk world bounds
camera-center revision
quality revision
LOD revision
cull-policy revision
runtime session and frame identity
```

## Current output

```txt
true | false
```

## Required output

```txt
GrassCullDecision
  decisionId
  runtimeSessionId
  renderFrameId
  cameraCenterRevision
  chunkId
  chunkBoundsRevision
  intendedLod
  qualityRevision
  policyRevision
  backendId
  executionId
  distanceMode
  distance
  maximumDistance
  status: visible | culled | deferred | failed | stale
  reason
```

## Current false interaction

```txt
camera crosses origin radius
  -> all chunk decisions flip together
  -> no individual chunk changed its own relative distance policy
  -> no interaction/result row explains the field-wide disappearance
```

## Required decision flow

```txt
accepted camera frame
  -> accepted camera-center revision
  -> required chunk identities
  -> chunk bounds
  -> intended LOD
  -> backend selection
  -> one typed decision per chunk
  -> completeness and stale-result validation
  -> atomic visible-set commit
  -> frame submission acknowledgement
```

## Stale decision cases

```txt
camera center changes before culling finishes
quality tier changes before commit
chunk is released or rebuilt before commit
runtime or mission epoch changes
render frame is superseded
backend execution fails or is unavailable
```

All stale or failed results must be explicit. They must not silently mutate `mesh.visible` for a newer frame.

## Public readback

The current `grass.getState()` returns backend, chunk count and total accepted instances. It needs a detached read model containing:

```txt
cameraCenterRevision
requiredChunkCount
visibleChunkCount
culledChunkCount
visibleInstanceCount
backendId
actualDispatchCount
visibleSetRevision
lastCommittedFrameId
stateFingerprint
```

## Scope

Documentation only. No interaction, camera, culling or rendering behavior changed.
