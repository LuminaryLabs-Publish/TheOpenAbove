# Performance Audit: Terrain LOD Build Budget Contract

**Timestamp:** `2026-07-11T16-30-25-04-00`

## Goal

Bound terrain geometry creation and LOD replacement work so correcting stale horizon meshes does not introduce unbounded main-thread stalls.

## Current work model

```txt
camera center changes
  -> compute required membership
  -> dispose removed geometry immediately
  -> synchronously build every missing geometry
  -> each vertex samples terrain height
  -> each vertex performs four more height samples for slope
  -> compute vertex colors
  -> compute vertex normals
  -> compute bounding sphere
```

The retained horizon LOD defect avoids some rebuild cost by accident, but correcting it with immediate rebuilds would increase synchronous work whenever multiple retained chunks cross LOD bands.

## Missing budget dimensions

```txt
maximum builds per frame
maximum replacement builds per frame
maximum generated vertices per frame
maximum terrainHeight samples per frame
maximum normal-generation work per frame
maximum geometry allocation bytes per frame
maximum disposal count per frame
maximum transition latency
priority policy
cancellation and stale-result policy
```

## Required budget result

```txt
TerrainBuildBudgetResult {
  frameId
  budgetRevision
  requestedBuilds
  admittedBuilds
  deferredBuilds
  requestedVertices
  admittedVertices
  estimatedHeightSamples
  elapsedBuildMs
  allocationEstimateBytes
  disposalCount
  deadlineMissed
}
```

## Required priority order

```txt
1. fill uncovered required terrain
2. replace terrain with wrong source revision
3. upgrade chunks entering the near-horizon band
4. repair edge-policy violations
5. downgrade over-detailed distant chunks
6. prebuild future candidates when budget remains
```

## Required scheduling behavior

```txt
classification is immediate and deterministic
build admission is bounded
old complete geometry remains visible while replacement is deferred
stale candidates are rejected after camera, quality or terrain revision changes
completed candidates commit only through atomic replacement
journals remain bounded
```

## Required fixture cases

```txt
single coarse-center transition
fast traversal across multiple centers
teleport across the horizon annulus
simultaneous terrain-revision and quality-tier changes
budget exhaustion with complete old geometry retained
candidate becomes stale before completion
repeated oscillation around a distance threshold
steady-state no-op produces zero build work
```

## Required measurements

```txt
initial near terrain build cost
initial horizon terrain build cost
one-center transition cost
worst admitted LOD upgrade batch
worst admitted LOD downgrade batch
height-sample count
vertex count
allocation/disposal count
frame-time contribution
transition completion latency
```

This pass records required evidence only. No runtime performance measurement was executed.