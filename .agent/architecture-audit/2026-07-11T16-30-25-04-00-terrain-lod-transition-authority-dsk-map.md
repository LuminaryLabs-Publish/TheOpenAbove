# Architecture Audit: Terrain LOD Transition Authority DSK Map

**Timestamp:** `2026-07-11T16-30-25-04-00`

## Goal

Define one composed terrain-streaming authority that keeps camera-relative LOD classification, built geometry, source revision, edge policy, replacement state and observable results aligned across near and horizon terrain.

## Existing ownership

```txt
open-above-visual-domain
  -> open-above-terrain-surface-kit
       -> open-above-terrain-chunk-streaming-kit
       -> open-above-terrain-horizon-streaming-kit
       -> shared terrainHeight
       -> shared terrainColor
       -> shared material and cloud-shadow adapter
```

### Near streamer

```txt
chunk identity: x:z
stored metadata: x, z, lod
policy: distance in near chunks -> lod 0/1/2
transition behavior:
  compare actual lod with required lod
  remove and dispose mismatched geometry
  synchronously create replacement
```

### Horizon streamer

```txt
chunk identity: x:z
stored metadata: x, z
policy at creation: world distance -> 10/6/4 segments
transition behavior:
  required set contains keys only
  retained keys skip createChunk
  no actual segment metadata
  no reclassification or replacement on band changes
```

## Authority defect

Geometry identity is implicit in a mutable `THREE.BufferGeometry` instance. The horizon chunk map cannot answer:

```txt
which terrain-source revision produced this mesh?
which LOD band was intended when it was created?
which segment count does it currently contain?
which LOD does current camera position require?
is a replacement pending, building, committed or failed?
did the visible frame consume the old or new geometry?
```

This makes current output history-dependent.

## Required parent domain

```txt
open-above-terrain-lod-transition-authority-domain
```

## Candidate DSK composition

```txt
open-above-terrain-chunk-identity-kit
  owns stable near/horizon chunk IDs and coordinate spaces

open-above-terrain-source-revision-kit
  owns height, color, slope, edge and material-policy identity

open-above-terrain-lod-policy-kit
  owns quality-tier and distance bands for near and horizon terrain

open-above-terrain-lod-classification-kit
  returns intended LOD and segment count for each active chunk

open-above-terrain-lod-transition-plan-kit
  diffs active geometry against intended classification

open-above-terrain-geometry-build-request-kit
  creates immutable build requests with source and LOD identities

open-above-terrain-build-budget-kit
  admits bounded per-frame vertex, height-sample and build counts

open-above-terrain-geometry-build-result-kit
  returns success, failure, cost, geometry identity and bounds

open-above-terrain-edge-stitch-policy-kit
  owns overlap, skirts, stitching and near/horizon edge tolerance

open-above-terrain-atomic-replacement-kit
  retains complete old geometry until complete new geometry is ready

open-above-terrain-chunk-observation-kit
  reports intended and actual source/LOD identities without raw mesh access

open-above-terrain-lod-journal-kit
  records bounded classification, build, replacement and rejection rows

open-above-terrain-lod-fixture-kit
  proves reclassification, budget, replacement and edge invariants
```

## Required command/result flow

```txt
TerrainStreamingUpdate(cameraFrame, qualityRevision, terrainRevision)
  -> classify required near and horizon chunk set
  -> classify intended LOD for every required key
  -> compare with committed chunk observations
  -> plan creates, releases and replacements
  -> admit work under current frame budget
  -> build detached geometry candidates
  -> validate bounds, edge identity and source revision
  -> atomically swap complete candidates
  -> retire replaced geometry after frame ownership releases it
  -> publish TerrainTransitionResult
```

## Required result

```txt
TerrainTransitionResult {
  terrainRevision
  cameraFrameId
  classificationRevision
  requiredChunkCount
  matchedChunkCount
  createResults[]
  replacementResults[]
  releaseResults[]
  deferredResults[]
  failedResults[]
  workBudgetResult
  edgeContinuityResult
  activeTerrainFingerprint
}
```

## Invariants

```txt
1. Every active key has one intended LOD under the current classification revision.
2. Every committed mesh reports the LOD and terrain revision that built it.
3. A retained key with mismatched actual and intended LOD enters a typed transition.
4. No partial candidate replaces a complete committed mesh.
5. Build admission is bounded and observable.
6. Near and horizon replacement edges follow one declared seam policy.
7. Raw Three.js mesh identity is not the public authority record.
8. Disposal occurs only after the replacement frame no longer references the old geometry.
```

## Existing domains to update first

```txt
open-above-terrain-surface-kit
open-above-terrain-chunk-streaming-kit
open-above-terrain-horizon-streaming-kit
open-above-visual-domain
open-above-committed-observation-frame-authority-domain
```

## Dependency order

```txt
terrain source revision
  -> chunk identity
  -> LOD policy and classification
  -> transition plan
  -> work admission
  -> geometry build result
  -> edge validation
  -> atomic replacement
  -> frame observation
  -> bounded journal and fixtures
```

This audit defines contracts only. It does not implement the domain.