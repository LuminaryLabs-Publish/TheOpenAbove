# Render Audit: Terrain and Grass Boundary Frame Gap

**Timestamp:** `2026-07-11T21-08-57-04-00`

## Summary

Near and horizon terrain stop allocating chunks outside the bounded disk. Grass does not consume that membership policy, so a frame can contain grass instances at the edge floor where no supporting terrain mesh exists. Current diagnostics cannot prove that the terrain and grass visible sets came from the same surface revision.

## Render path

```txt
camera position
  -> terrain.update
       -> near required set filtered by worldSurface.intersectsBounds
       -> horizon required set filtered by worldSurface.intersectsBounds
  -> grass.update
       -> 7x7 required set from camera chunk and LOD
       -> no world-surface bounds filter
       -> manual visibility from camera.distanceTo(mesh.position)
  -> composer.render
  -> renderer statistics
```

## Concrete mismatch

```txt
camera near or beyond radius 10000
  -> terrain chunk bounds outside disk are rejected
  -> boundedTerrainHeight returns edgeFloor outside disk
  -> grass placement still creates candidates for those chunks
  -> candidates receive y = edgeFloor
  -> grass meshes can be accepted without terrain support
```

The manual grass culling path compounds the mismatch:

```txt
candidate transforms: absolute world space
InstancedMesh position: global origin
distance used: camera.position.distanceTo(mesh.position)
result: all grass chunks share one origin-based visibility distance
```

## Missing frame evidence

```txt
surfaceRevision
terrainRequiredChunkIds
terrainCommittedChunkIds
grassRequiredChunkIds
grassCommittedChunkIds
grassVisibleChunkIds
unsupportedGrassChunkIds
boundaryClassification
frameSubmissionId
visibleFrameId
consumerParityResult
```

## Required render transaction

```txt
surface revision
  -> derive terrain and grass candidate membership
  -> reject unsupported grass chunks
  -> prepare complete terrain and grass visible sets
  -> atomically commit matching sets
  -> submit frame
  -> acknowledge rendered surface revision and consumer parity
```

## Required fixtures

```txt
fixture:terrain-grass-membership-parity
fixture:no-grass-without-support-surface
fixture:edge-blend-frame-continuity
fixture:outside-disk-zero-terrain-zero-grass
fixture:grass-origin-independent-culling
fixture:first-visible-boundary-frame
fixture:pages-boundary-traversal
```

## Completion boundary

Do not claim a bounded visible world merely because terrain chunk creation uses `intersectsBounds`. The claim requires terrain and grass to share the same admitted surface revision and a rendered-frame receipt showing no unsupported visible grass.