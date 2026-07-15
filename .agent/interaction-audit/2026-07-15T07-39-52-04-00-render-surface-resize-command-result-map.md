# Interaction Audit: Render-Surface Resize Command and Result Map

**Timestamp:** `2026-07-15T07-39-52-04-00`

## Summary

Resize is currently an imperative sequence across camera, renderer, EffectComposer, local depth textures, and cloud sizing. It has no command identity, candidate generation, admission result, rollback, retirement receipt, or first-frame acknowledgement.

## Plan ledger

**Goal:** turn boot, viewport resize, DPR change, quality change, dynamic-scale change, and context recovery into one idempotent command/result interaction.

- [x] Identify every resize initiator and participant.
- [x] Map current direct calls and missing results.
- [x] Define the minimal command/result surface.
- [ ] Implement command admission and exact browser fixtures.

## Current direct interaction

```txt
window resize event
  -> visual.resize()
  -> camera aspect mutation
  -> resolution.resize()
  -> renderer pixel-ratio mutation
  -> renderer canvas mutation
  -> composer pixel-ratio mutation
  -> composer target mutation
  -> hdrComposer.resize()
  -> composer target mutation again
  -> depth texture image mutation
  -> no result

dynamic-resolution sample
  -> resolution.resize()
  -> renderer and composer mutate
  -> no target-generation result
  -> no visible-frame acknowledgement
```

## Required command

```txt
RenderSurfaceResizeCommand {
  commandId
  expectedRenderSurfaceGeneration
  viewportRevision
  contextRevision
  rendererGeneration
  composerGeneration
  qualityRevision
  dynamicScaleRevision
  cssWidth
  cssHeight
  deviceDpr
  reason: Boot | Viewport | Dpr | Quality | DynamicScale | ContextRecovery
}
```

## Required result

```txt
RenderSurfaceResizeResult {
  commandId
  status: Adopted | NoChange | PreservedPredecessor | Rejected
  previousGeneration
  acceptedGeneration
  descriptor
  colorTargetReceipts
  depthAttachmentReceipts
  passSizeReceipts
  cloudCorrelationReceipt
  retirementReceipts
  rejectionReason
}
```

## Admission rules

```txt
reject non-finite or zero viewport dimensions
reject stale expected generation
coalesce equivalent descriptors
prepare successor before mutating accepted resources
require exact color/depth physical-size equality
require supported formats filters and samples
require both composer targets and both depth attachments
preserve predecessor on any failed participant
retire predecessor only after successor adoption
reject late work against retired generations
```

## Visible acknowledgement

```txt
FirstHdrResizeFrameAck {
  frameId
  renderSurfaceGeneration
  gameplayPresentationRevision
  cloudTargetGeneration
  cssSize
  physicalSize
  effectivePixelRatio
}
```

## Validation boundary

No runtime command or result exists yet. This file defines the required interaction contract only.