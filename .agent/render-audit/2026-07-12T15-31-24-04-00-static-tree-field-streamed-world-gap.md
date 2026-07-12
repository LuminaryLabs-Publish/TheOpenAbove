# Render Audit: Static Tree Field in a Streamed World

**Timestamp:** `2026-07-12T15-31-24-04-00`

## Summary

The renderer receives two boot-created tree `InstancedMesh` objects while terrain, grass and flowers track camera movement. No render-frame record states which world or vegetation coverage generation the trees represent, and no visible acknowledgement proves continuous tree coverage during long traversal.

## Plan ledger

**Goal:** ensure every visible tree frame derives from an admitted vegetation coverage plan tied to the same world and camera frame as surrounding terrain and flora.

- [x] Trace vegetation mesh creation and scene insertion.
- [x] Trace per-frame visual updates.
- [x] Compare vegetation behavior with terrain, grass and flower streaming.
- [x] Inspect telemetry for vegetation coverage provenance.
- [x] Define render-facing vegetation receipts.
- [ ] Add browser pixel/instance proof across long traversal.

## Current render path

```txt
boot
  -> create trunk geometry/material
  -> create crown geometry/material
  -> generate all matrices
  -> add one trunks InstancedMesh and one crowns InstancedMesh to scene

frame
  -> update terrain
  -> update grass
  -> update flowers
  -> update water/HDR
  -> render existing tree meshes unchanged
```

## Gaps

```txt
no vegetation frame ID on tree meshes
no world artifact or input fingerprint on tree meshes
no camera-relative required-coverage descriptor
no chunk-level bounds or LOD metadata
no created/reused/retired tree counts
no per-chunk frustum/visibility result
no vegetation coverage state in GameHost snapshot
no render-frame correlation to vegetation adoption
no first visible vegetation-frame acknowledgement
no explicit tree mesh/material disposal path
```

## Visible-risk model

```txt
balloon and camera travel beyond boot cluster field
  -> terrain continues streaming
  -> grass and flowers continue streaming
  -> tree instances remain at initial coordinates
  -> rendered biome can lose tree coverage without a typed transition or diagnostic result
```

The source establishes the ownership mismatch; this audit does not claim a measured pixel defect because no browser traversal was run.

## Required render receipt

```txt
VegetationVisibleFrameAck {
  runtimeSessionId
  renderFrameId
  vegetationFrameId
  worldArtifactFingerprint
  coverageFingerprint
  requiredChunkCount
  visibleChunkCount
  visibleInstanceCount
  rendererGeneration
  cameraCell
  result
}
```

## Required proof matrix

```txt
initial camera cell
positive and negative X traversal
positive and negative Z traversal
diagonal traversal
world edge approach
low / medium / high quality
cold start / map-prewarmed start
candidate failure with last-good rendering
source / dist / Pages parity
```

Documentation only. No render source changed.