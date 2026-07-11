# Terrain System Audit: Horizon Streaming Workload Contract

**Timestamp:** `2026-07-11T05-25-29-04-00`

## Goal

Extend the previous terrain-surface audit to the new far-horizon streamer and define one shared continuity and work-budget boundary.

## Current composition

```txt
open-above-terrain-surface-kit
  -> open-above-terrain-chunk-streaming-kit
       near chunk size 520
       quality-dependent segments
       camera-centered radius 2 or 3
  -> open-above-terrain-horizon-streaming-kit
       coarse chunk size 1040
       outer radius 6240
       inner radius 1742
       segments 10 / 6 / 4 by distance
  -> shared height source
  -> shared color source
  -> shared material
```

## Source-derived origin census

```txt
near chunks: 37
near vertices: 60,597
horizon chunks: 136
horizon vertices: 7,624
combined vertices: 68,221
minimum height evaluations for height and finite-difference slope: 341,105
```

This is not a measured runtime duration.

## Positive changes

```txt
far destinations remain backed by terrain rather than empty horizon
near and horizon meshes share height and color functions
horizon uses fixed 24-meter slope sampling
horizon omits shadows to reduce cost
horizon chunks are disposable
```

## Gaps

```txt
near slope sampling remains LOD-dependent
horizon slope sampling differs from near sampling
near and horizon grids use different chunk sizes and memberships
both compute normals independently
horizon geometry is lowered by 0.08 but no seam policy explains the offset
near and horizon rebuild independently on different rounded centers
all missing geometry is created synchronously
no shared build queue or atomic replacement
no overlap/gap/height/color/normal fixture
no measured initial or transition cost
no source revision or build-result journal
```

## Required shared descriptor

```txt
terrainSourceRevision
heightAlgorithmRevision
colorAlgorithmRevision
slopeSamplingPolicy
nearChunkSize
nearRadius
nearLodSegments
horizonChunkSize
horizonInnerRadius
horizonOuterRadius
horizonLodSegments
edgeOverlapPolicy
normalContinuityPolicy
buildBudget
```

## Required results

```txt
chunkBuildResult
chunkReleaseResult
membershipTransitionResult
nearHorizonSeamResult
frameWorkBudgetResult
activeTerrainObservation
```

## Fixture gate

```txt
same world coordinate produces equal authoritative height, slope and color in both streamers
near/horizon edges meet declared positional and normal tolerances
no camera transition creates uncovered terrain within the declared view range
initial and transition builds respect the declared work budget
observations report both chunk maps under one terrain revision
```