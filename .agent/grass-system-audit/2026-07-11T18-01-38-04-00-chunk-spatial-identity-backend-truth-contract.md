# Grass System Audit: Chunk Spatial Identity and Backend Truth Contract

**Timestamp:** `2026-07-11T18-01-38-04-00`

## Summary

The active grass system has deterministic placement, biome filtering, quality-based LOD and camera-centered chunk membership. Its missing boundary is authoritative spatial identity: chunk meshes do not carry their own world center or bounds, so manual culling falls back to the scene-object origin.

The system also conflates WebGPU capability with WebGPU execution. A browser exposing `navigator.gpu` is labeled `webgpu-compute` even though the runtime performs CPU chunk comparisons only.

## Current active stack

```txt
open-above-grass-field-domain
  -> open-above-grass-chunk-placement-kit
       -> open-above-grass-world-seed-kit
       -> open-above-grass-biome-density-kit
       -> open-above-grass-exclusion-mask-kit
  -> open-above-grass-lod-kit
  -> open-above-grass-compute-culling-kit
```

## Correct existing behavior

```txt
world seed, chunk X, chunk Z and attempt index determine candidate values
placement does not use Math.random
candidate x/z are derived from chunk coordinate and chunk size
terrain height, moisture and slope drive density and exclusions
camera position determines the active chunk center
LOD profile determines count, planes and wind level
released chunk geometry is disposed
material and root are disposed by grass.dispose
```

## Spatial identity defect

```txt
candidate coordinates: absolute world space
instance matrices: absolute world space
mesh.position: default origin
chunk center metadata: stored only in mesh.userData.grass x/z
chunk bounds: absent
manual cull position: mesh.position
```

`mesh.userData.grass.x` and `.z` identify chunk coordinates, but the culling path does not use them.

## Backend truth defect

```txt
capability check:
  navigator.gpu ? webgpu-compute : cpu-chunk-culling

execution:
  cullChunk(distance, maxDistance)
  return distance <= maxDistance

reported work:
  dispatchedWorkgroups += 1
```

No WebGPU adapter, device, pipeline, bind group, buffer or dispatch is created. The counter represents calls to a CPU helper, not dispatched GPU workgroups.

## Required chunk descriptor

```txt
GrassChunkDescriptor
  chunkId
  worldSeed
  chunkX
  chunkZ
  chunkSize
  center
  bounds
  terrainRevision
  placementRevision
  qualityRevision
  intendedLod
  acceptedInstanceCount
  geometryRevision
```

## Required backend descriptor

```txt
GrassCullBackendDescriptor
  backendId
  capabilityStatus
  capabilityReason
  selectedExecutionPath
  pipelineRevision
  supportsChunkCulling
  supportsInstanceCulling
  actualDispatchCount
```

## Required decision contract

```txt
GrassCullDecision
  chunkId
  cameraCenterRevision
  chunkBoundsRevision
  policyRevision
  backendExecutionId
  nearestBoundsDistance
  maximumDistance
  visible
  reason
  resultRevision
```

## Required observation contract

```txt
GrassSystemObservation
  runtimeSessionId
  renderFrameId
  cameraCenterRevision
  qualityRevision
  requiredChunkCount
  committedChunkCount
  visibleChunkCount
  culledChunkCount
  acceptedInstanceCount
  visibleInstanceCount
  backendId
  actualDispatchCount
  visibleSetRevision
  stateFingerprint
```

## Required invariants

```txt
chunk bounds derive from chunk coordinates and accepted geometry
manual culling never uses the default mesh transform as chunk location
center chunk visibility is evaluated against center chunk bounds
CPU execution cannot report webgpu-compute
actualDispatchCount increments only after an actual GPU dispatch
aggregate state distinguishes accepted from visible instances
all visibility decisions identify the camera, quality and frame revisions used
```

## Safe implementation sequence

```txt
1. Add pure chunk center and bounds functions.
2. Add chunk IDs and bounds to mesh metadata.
3. Replace camera-to-mesh-origin distance with camera-to-chunk-bounds distance.
4. Split capability, selected backend and executed backend fields.
5. Keep CPU chunk culling as the truthful initial backend.
6. Add visible and culled counts plus per-chunk observations.
7. Add stale-result rejection and atomic visible-set commit.
8. Add real WebGPU execution only behind device/pipeline proof.
9. Correlate visible set with a submitted frame.
10. Add origin-crossing and Pages traversal fixtures.
```

## Scope

Documentation only. The current runtime remains unchanged and no WebGPU execution claim is made.
