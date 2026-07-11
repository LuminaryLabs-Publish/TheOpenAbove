# Render Audit: Camera-Centered Grass Origin-Culling Gap

**Timestamp:** `2026-07-11T18-01-38-04-00`

## Summary

The grass renderer rebuilds chunks around the camera but manually culls those chunks using the camera's distance to each `InstancedMesh.position`. Every grass mesh remains at the default global origin, so the visibility decision is unrelated to the chunk's actual instance positions.

## Source-backed render path

```txt
generateGrassChunkCandidates
  -> absolute x/y/z for each candidate

buildChunk
  -> create InstancedMesh
  -> put absolute candidate transforms in instanceMatrix
  -> do not set mesh.position to chunk center
  -> add mesh to root

update
  -> calculate camera-centered chunk membership
  -> rebuild changed chunks
  -> for each mesh:
       camera.position.distanceTo(mesh.position)
       cullChunk(distance, chunkSize * 4.2)
       assign mesh.visible
```

## Spatial mismatch

```txt
scene object transform:
  mesh.position = 0,0,0

rendered instance positions:
  chunkX * 520 + local offset
  terrain height
  chunkZ * 520 + local offset

manual culling position:
  0,0,0 for every chunk
```

The renderer therefore has valid instance geometry in the camera's current neighborhood while the manual visibility flag can hide it because the camera is far from the original world origin.

## Exact threshold

```txt
chunkSize = 520 m
maxDistance = 520 * 4.2
maxDistance = 2184 m
```

The current comparison includes camera altitude because it uses full 3D Euclidean distance.

## Failure sequence

```txt
camera begins near origin
  -> all generated chunks use approximately the same camera-to-origin distance
  -> all pass the manual range test

camera moves beyond 2184 m from origin
  -> grass center advances
  -> old chunks are removed
  -> new chunks are generated around camera
  -> new meshes still have position 0,0,0
  -> every new chunk fails the same origin-distance test
  -> the entire active grass field disappears
```

## Reverse inefficiency

Inside the origin radius, distant active chunks and nearby active chunks receive the same visibility result. The manual culling pass therefore does not reduce work according to per-chunk distance within the generated set.

## Missing render evidence

```txt
chunk ID
chunk center
chunk bounds
camera center revision
quality and LOD revision
cull distance
cull reason
selected backend
actual backend execution
visible chunk count
culled chunk count
visible instance count
rendered instance count
visible-set revision
render-frame acknowledgement
```

## Required render contract

```txt
GrassRenderPlan
  runtimeSessionId
  renderFrameId
  cameraCenterRevision
  qualityRevision
  cullPolicyRevision
  visibleSetRevision
  chunks[]:
    chunkId
    worldBounds
    intendedLod
    acceptedInstanceCount
    cullDistance
    cullDecision
    backendExecutionId
```

## Required frame result

```txt
GrassRenderResult
  renderFrameId
  visibleSetRevision
  submittedChunkCount
  submittedInstanceCount
  culledChunkCount
  staleDecisionCount
  backendId
  actualDispatchCount
  stateFingerprint
```

## Required proof

```txt
camera near origin
  -> nearby chunk visible
  -> farther chunk decision based on its own bounds

camera beyond 2184 m
  -> camera-centered chunk remains visible
  -> old origin distance does not control the new visible set

same camera pose after different traversal paths
  -> same required chunk and visible-set fingerprint

CPU backend
  -> backend reports CPU
  -> GPU dispatch count is zero

WebGPU backend
  -> backend reports WebGPU only after successful pipeline execution
```

## Scope

No renderer or runtime code changed. Browser, WebGL and WebGPU behavior were not executed during this documentation pass.
