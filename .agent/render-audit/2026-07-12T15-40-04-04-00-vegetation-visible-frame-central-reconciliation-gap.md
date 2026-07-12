# Render Audit: Vegetation Visible-Frame Central Reconciliation Gap

**Timestamp:** `2026-07-12T15-40-04-04-00`

## Summary

The renderer always draws the two boot-created tree instanced meshes while terrain, grass and flowers change with camera movement. Render state and GameHost readback contain no vegetation frame, required bounds, active chunks, retirement counts or visible acknowledgement.

## Plan ledger

**Goal:** make each rendered tree frame cite the admitted vegetation coverage generation that produced it.

- [x] Trace vegetation mesh creation and frame updates.
- [x] Compare tree ownership with terrain/grass/flower streaming.
- [x] Inspect runtime render readback.
- [x] Define the missing frame receipt.
- [ ] Prove visible continuity through browser and Pages traversal.

## Current path

```txt
boot -> construct trunks/crowns InstancedMesh -> scene.add()
frame -> update terrain/grass/flowers -> render unchanged tree meshes
```

## Missing render evidence

```txt
vegetationFrameId
worldArtifactFingerprint
coverageFingerprint
cameraCell and required bounds
active/visible/deferred chunk counts
active/visible instance counts
created/reused/retired/failed counts
renderer generation
first matching visible frame acknowledgement
```

## Required receipt

```txt
VegetationVisibleFrameAck {
  runtimeSessionId
  renderFrameId
  vegetationFrameId
  worldArtifactFingerprint
  coverageFingerprint
  cameraCell
  requiredChunkCount
  activeChunkCount
  visibleChunkCount
  visibleInstanceCount
  rendererGeneration
  result
}
```

## Completion boundary

A static source inspection establishes the ownership mismatch but not a pixel defect. Do not claim continuous tree coverage until long-traversal screenshots and readback cite the same committed vegetation generation.

Documentation only. Rendering was not changed or executed.