# Architecture Audit: HDR Attachment and Resolution Authority DSK Map

**Timestamp:** `2026-07-12T05:11:46-04:00`

## Goal

Define one parent domain that owns the renderer drawing buffer, EffectComposer color targets and depth attachments as a single revisioned render surface.

## Current ownership split

```txt
quality-tier-kit
  owns DPR cap and initial dynamic scale

dynamic-resolution-kit
  owns frame-time smoothing, scale mutation and renderer/composer resize

visual-domain
  owns browser resize listener and calls both resize paths

hdr-composer-kit
  owns initial target, replacement depth attachments, wrapper resize and disposal

Three.js EffectComposer
  internally owns two color targets and pixel-ratio-scaled setSize behavior
```

No owner currently commits these parts as one compatible aggregate.

## Required parent domain

```txt
open-above-hdr-attachment-resolution-authority-domain
```

## DSK composition

```txt
open-above-render-surface-id-kit
open-above-render-surface-revision-kit
open-above-resize-source-kit
open-above-resize-generation-kit
open-above-quality-state-revision-kit
open-above-effective-pixel-ratio-plan-kit
open-above-composer-target-plan-kit
open-above-depth-attachment-id-kit
open-above-depth-attachment-plan-kit
open-above-attachment-dimension-admission-kit
open-above-framebuffer-completeness-result-kit
open-above-render-surface-commit-kit
open-above-render-surface-rollback-kit
open-above-stale-resize-rejection-kit
open-above-dynamic-scale-transition-result-kit
open-above-attachment-replacement-kit
open-above-attachment-resource-lease-kit
open-above-attachment-retirement-result-kit
open-above-render-surface-observation-kit
open-above-visible-render-surface-frame-ack-kit
open-above-hdr-attachment-resolution-fixture-kit
open-above-browser-dpr-resize-smoke-kit
open-above-pages-render-surface-smoke-kit
```

## Command and result flow

```txt
RenderSurfaceResizeCommand
  commandId
  runtimeSessionId
  resizeSource
  resizeGeneration
  expectedSurfaceRevision
  cssWidth
  cssHeight
  observedDpr
  qualityStateRevision

RenderSurfacePlan
  effectivePixelRatio
  physicalWidth
  physicalHeight
  colorFormat
  colorType
  sampleCount
  depthFormat
  targetIds
  attachmentIds

FramebufferAdmissionResult
  accepted
  colorDepthDimensionsMatch
  completenessStatus
  fallbackTier
  failureReason

RenderSurfaceCommitResult
  predecessorRevision
  committedRevision
  committedTargetIds
  committedAttachmentIds
  retiredResourceIds
  visibleFramePending
```

## Boundary rules

```txt
quality policy proposes; surface authority commits
EffectComposer does not receive independent unjournaled resize calls
depth textures are created only from the committed physical-size plan
replacement cannot orphan predecessor attachments
resize generations commit in order
framebuffer failure leaves predecessor active
disposal consumes explicit leases and returns retirement results
readback cannot report a scale without target and attachment dimensions
```
