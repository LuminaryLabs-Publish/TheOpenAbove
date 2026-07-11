# Interaction Audit: Camera Chunk Transition Admission Map

**Timestamp:** `2026-07-11T03-01-38-04-00`

## Trigger map

```txt
keyboard input
  -> balloon flight state
  -> camera follow position
  -> terrain.update(camera, weather)
  -> rounded camera chunk coordinate
  -> implicit rebuild when center changes
```

Wheel input also changes camera distance and framing, but chunk membership is based on camera world position rather than balloon position. Terrain streaming is therefore indirectly controlled by input and camera presentation without a typed interaction boundary.

## Current implicit admission

```txt
if nextCenterX or nextCenterZ changes:
  center is replaced immediately
  rebuild runs immediately
  required set becomes authoritative immediately
  stale meshes are removed before all replacements are proven
  missing chunks are created synchronously
```

## Missing identities

```txt
cameraFocusRevision
terrainFocusRequestId
terrainSurfaceRevision
chunkBuildId
chunkCommitId
renderFrameId
sessionId
```

## Missing outcomes

```txt
accepted
unchanged
queued
deferred
cancelled
stale-focus
stale-surface
build-failed
seam-rejected
committed
```

## Proposed interaction contract

```txt
CameraFocusSample
  cameraPosition
  balloonPosition
  renderFrameId
  sessionId

TerrainFocusRequest
  focusRevision
  centerChunk
  desiredChunkLods
  surfaceRevision

TerrainFocusResult
  accepted
  queuedBuilds
  releasedChunks
  retainedChunks
  deferredBuilds
  reason

TerrainCommitResult
  focusRevision
  committedChunks
  rejectedChunks
  seamResults
  committedRenderFrameId
```

## Admission rules

```txt
same center and same surface revision -> unchanged
new center -> queue plan, do not block simulation
newer focus revision -> supersede uncommitted older work
new surface revision -> reject stale generated chunks
failed build -> retain prior committed chunk when safe
failed seam validation -> do not swap replacement
session disposal -> cancel all pending work
```

## Readback requirement

GameHost should expose detached bounded rows for the most recent focus request, build results and commit result. It should not expose mutable chunk meshes as the only evidence.

## Next safe ledge

```txt
TheOpenAbove Terrain Surface Authority
+ LOD Continuity and Chunk-Rebuild Fixture Gate
```