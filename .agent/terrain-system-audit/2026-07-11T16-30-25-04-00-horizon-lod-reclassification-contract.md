# Terrain System Audit: Horizon LOD Reclassification Contract

**Timestamp:** `2026-07-11T16-30-25-04-00`

## Goal

Require the far-horizon active chunk map to converge on the current camera-relative LOD classification instead of preserving the segment count selected at first creation.

## Current horizon state

```txt
chunkSize: 1040 m
outer radius: 6240 m on non-low quality
inner radius: 1742 m when near radius is 3
segment policy:
  < 3400 m -> 10
  < 5000 m -> 6
  otherwise -> 4
stored mesh metadata:
  x
  z
```

## Defect

`rebuild()` calculates the required key set but not the required LOD map. It removes keys outside the annulus and creates keys not already present. A retained key is never reclassified.

```txt
required.has(key) && chunks.has(key)
  -> no buildGeometry call
  -> no segment-policy evaluation
  -> no actual-versus-intended comparison
```

The horizon mesh set is therefore path-dependent.

## Required canonical chunk record

```txt
TerrainChunkRecord {
  chunkId
  layer: near | horizon
  coordinate
  terrainRevision
  qualityRevision
  classificationRevision
  intendedLod
  intendedSegments
  committedGeometryRevision
  actualLod
  actualSegments
  transitionState
  edgePolicyRevision
  lastCommittedFrameId
}
```

## Required classification rule

Classification must be pure and detached from geometry creation:

```txt
classifyTerrainChunk({
  layer,
  chunkCoordinate,
  cameraPosition,
  qualityRevision,
  terrainRevision
})
  -> { intendedLod, intendedSegments, classificationRevision }
```

Every required key must be classified on every accepted center revision, including retained keys.

## Required transition states

```txt
matched
create-pending
create-building
replacement-pending
replacement-building
replacement-ready
replacement-committed
release-pending
released
deferred-budget
failed-build
failed-edge-validation
stale-result
```

## Required replacement policy

```txt
actual == intended
  -> keep committed geometry

actual != intended
  -> retain old committed geometry
  -> enqueue detached candidate under work budget
  -> validate source, bounds and edge policy
  -> swap candidate atomically
  -> mark first visible frame
  -> retire old geometry after frame release
```

## Near/horizon parity

The near and horizon streamers may retain different distance bands and geometry densities, but they must share:

```txt
chunk identity format
terrain source revision
classification revision semantics
build request/result schema
work-budget admission
replacement-state model
edge policy
observation and journal format
```

## Required fixtures

```txt
horizon-retained-upgrade
horizon-retained-downgrade
horizon-three-band-traversal
horizon-path-independence
near-horizon-classification-parity
stale-build-result-rejection
terrain-revision-rebuild
quality-revision-rebuild
atomic-replacement-no-gap
old-geometry-frame-retirement
```

## Completion boundary

Do not claim distance-based horizon LOD until current intended and actual segment counts are observable and equal for every committed active chunk, except for explicitly reported budget-deferred transitions.