# Interaction Audit: Cloud Depth Composite Command and Result Map

**Timestamp:** `2026-07-15T02-09-29-04-00`

## Summary

The current visual host calls `clouds.render(renderer, camera)` imperatively and receives no result. Target resizing, offscreen rendering, state restoration, main-scene compositing, and disposal therefore have no shared command identity or acceptance result.

## Plan ledger

**Goal:** convert the existing imperative cloud pass into a result-bearing frame interaction without exposing renderer implementation to gameplay.

- [x] Identify current calls and silent outcomes.
- [x] Define command, result, rejection, fallback, and retirement rows.
- [ ] Implement and execute the result matrix.

## Current map

| Caller | Operation | Current response |
|---|---|---|
| visual update | `clouds.update(camera, sun, elapsed)` | none |
| visual render | `clouds.render(renderer, camera)` | none |
| render target | resize on drawing-buffer/scale change | boolean internal only |
| private scene | render ray-marched cloud | none |
| main scene | sample composite texture | no pass receipt |
| visual teardown | `clouds.dispose()` | none |
| diagnostics | `getRenderSize()` | dimensions and scale only |

## Required command

```txt
CloudDepthCompositeCommand
  commandId
  frameId
  rendererGeneration
  qualityRevision
  viewportRevision
  dprRevision
  weatherRevision
  cameraRevision
  sceneDepthRevision
  expectedTargetGeneration
```

## Required result

```txt
CloudFrameResult
  commandId
  frameId
  status
  executionProfile
  targetGeneration
  targetDimensions
  targetFormats
  executedViewSamples
  executedLightSamples
  depthEncoding
  sceneDepthRevision
  upscaleReceipt
  compositeReceipt
  terrainShadowReceipt
  timingReceipt
  fallbackReason
  retirementReceipt
```

## Result statuses

```txt
accepted-full
accepted-reduced
accepted-color-only
accepted-far-depth-fallback
accepted-disabled
rejected-stale-frame
rejected-target-generation
rejected-renderer-generation
rejected-scene-depth-mismatch
failed-resource-allocation
failed-render
failed-composite
```

## Visible acknowledgement

```txt
FirstVisibleCloudFrameAck
  -> cites CloudFrameResult.frameId
  -> cites renderer and target generations
  -> cites scene-depth and weather revisions
  -> records the first presented frame using that result
```

## Validation boundary

No typed command or result currently exists. This document defines the contract only.