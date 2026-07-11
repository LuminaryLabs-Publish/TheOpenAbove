# Render Audit: Retained Horizon Chunk LOD Staleness

**Timestamp:** `2026-07-11T16-30-25-04-00`

## Goal

Document why the visible horizon mesh can violate the current camera-relative segment policy and define the render proof needed for safe LOD replacement.

## Current render path

```txt
visual.update
  -> terrain.update(camera)
  -> near.update(camera)
  -> horizon.update(camera)
  -> grass/water/lens/composer update

visual.render
  -> HDR composer submits scene containing current terrain groups
```

## Source-backed gap

The horizon streamer chooses geometry segments only during `buildGeometry()`:

```txt
distance < 3400 -> 10 segments
distance < 5000 -> 6 segments
otherwise       -> 4 segments
```

The active chunk map stores only `x` and `z`. On later camera-center changes, retained keys skip `createChunk()`. The renderer therefore receives a mesh whose actual segment count may not match the LOD band implied by the current camera.

## Visible consequences

```txt
far-created 4-segment chunk enters the near-horizon band
  -> it remains visibly coarse beside denser terrain

near-created 10-segment chunk moves outward
  -> it remains over-detailed and consumes unexpected geometry work

mixed historical LODs meet around the horizon annulus
  -> edge density and normal interpolation depend on traversal history

replacement happens only after removal/re-entry
  -> the same camera pose can render different geometry after different paths
```

The `1.004` geometry scale and `-0.08` vertical offset can hide some positional gaps, but they do not establish segment, normal, material, revision or frame parity.

## Missing render identities

```txt
terrainRevision
chunkId
intendedLod
actualLod
segmentCount
geometryRevision
replacementState
edgePolicyRevision
firstVisibleFrameId
retiredAfterFrameId
```

## Required render contract

```txt
TerrainChunkRenderReceipt {
  frameId
  chunkId
  terrainRevision
  intendedLod
  actualLod
  segmentCount
  geometryRevision
  materialRevision
  edgePolicyRevision
  replacementState
}
```

## Required frame behavior

```txt
old geometry remains complete and visible
  until
new geometry is complete and edge-valid
  then
one frame commits the replacement
  then
old geometry is retired after no submitted frame references it
```

## Required render fixtures

```txt
far-to-near retained chunk upgrades to current intended LOD
near-to-far retained chunk downgrades to current intended LOD
identical camera pose after different traversal paths yields same active-terrain fingerprint
replacement frame contains either old-complete or new-complete geometry, never a gap
near/horizon edge remains inside positional and normal tolerances during replacement
render receipt reports the geometry actually submitted
```

No visual LOD or seam correctness claim is made by this documentation pass.