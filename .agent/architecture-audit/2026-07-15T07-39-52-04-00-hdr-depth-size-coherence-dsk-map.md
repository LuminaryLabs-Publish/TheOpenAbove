# Architecture Audit: HDR Depth Size Coherence DSK Map

**Timestamp:** `2026-07-15T07-39-52-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

## Summary

HDR target sizing is currently split between the quality/dynamic-resolution services, Three.js `EffectComposer`, the local HDR composer helper, and the cloud renderer. No domain owns one versioned physical render-surface descriptor or atomic color/depth target adoption.

## Plan ledger

**Goal:** define a minimal semantic DSK family that coordinates existing renderer services without moving gameplay, world, cloud, or product content into the new authority.

- [x] Map current sizing owners and service boundaries.
- [x] Preserve existing kit APIs and 101 active surfaces.
- [x] Identify the missing parent authority and child contracts.
- [ ] Implement only after exact browser fixtures define the accepted physical-size invariant.

## Current ownership map

```txt
open-above-quality-tier-kit
  -> pixelRatioCap dynamicScale quality descriptors

open-above-dynamic-resolution-kit
  -> effective pixel ratio frame-time scale changes renderer/composer resize

open-above-visual-domain
  -> camera viewport resize ordering frame update render and disposal

open-above-hdr-composer-kit
  -> half-float color targets independent depth textures RenderPass color grade resize render disposal

three@0.165.0 EffectComposer
  -> target pixel ratio physical target size pass size buffer swap

open-above-volumetric-cloud-kit
  -> cloud target size from renderer drawing buffer and LOD scale
```

## Missing parent domain

```txt
open-above-hdr-render-target-depth-size-coherence-authority-domain
```

## Proposed child kits

| Kit | Service |
|---|---|
| `open-above-render-surface-identity-kit` | viewport renderer composer context and target-generation identity |
| `open-above-render-surface-descriptor-kit` | CSS size DPR caps dynamic scale effective ratio and physical size |
| `open-above-quality-revision-kit` | immutable quality-tier revision |
| `open-above-dynamic-scale-revision-kit` | immutable accepted dynamic-scale revision |
| `open-above-color-target-preparation-kit` | prepare both composer half-float color targets |
| `open-above-depth-attachment-preparation-kit` | prepare both unsigned-int depth textures at matching dimensions |
| `open-above-render-pass-size-kit` | size RenderPass and post-process passes from the accepted descriptor |
| `open-above-render-target-validation-kit` | validate dimensions formats samples filters ownership and compatibility |
| `open-above-render-surface-adoption-kit` | atomic target and attachment adoption |
| `open-above-render-surface-predecessor-kit` | preserve accepted predecessor on failure |
| `open-above-render-surface-retirement-kit` | exactly-once target texture and attachment retirement |
| `open-above-render-surface-conflict-kit` | stale duplicate retired and superseded request rejection |
| `open-above-cloud-surface-correlation-kit` | bind cloud target dimensions to accepted renderer drawing-buffer generation |
| `open-above-render-surface-result-kit` | typed resize adoption and rejection result |
| `open-above-render-surface-telemetry-kit` | dimensions formats bytes timing and fallback receipts |
| `open-above-first-hdr-resize-frame-ack-kit` | first visible frame acknowledgement |
| `open-above-render-surface-context-recovery-kit` | context-loss recovery and generation replacement |
| `open-above-render-surface-fixture-kit` | headless browser GPU build artifact and Pages proof |

## Command boundary

```txt
RenderSurfaceResizeCommand
  input:
    ViewportRevision
    RendererGeneration
    ComposerGeneration
    ContextRevision
    QualityRevision
    DynamicScaleRevision
    cssWidth cssHeight deviceDpr

  prepare:
    effectivePixelRatio
    physicalWidth physicalHeight
    colorTarget1 colorTarget2
    depthAttachment1 depthAttachment2
    pass sizes
    cloud correlation

  validate:
    exact color/depth equality
    supported formats and samples
    matching generation and ownership
    complete target set

  settle:
    atomically adopt successor
    preserve predecessor on failure
    retire replaced resources

  publish:
    RenderSurfaceResizeResult
    attachment receipts
    FirstHdrResizeFrameAck
```

## Dependency rule

```txt
quality and dynamic resolution describe intent
  -> render-surface authority resolves physical dimensions
  -> HDR composer and cloud renderer consume the accepted descriptor
  -> renderer adapters allocate and execute
  -> telemetry and visible proof consume immutable results
```

## Non-goals

Do not move balloon simulation, airstreams, Air Mail, Core World, terrain, vegetation, cloud weather, ray marching, color grading, or deployment ownership into this domain.

## Validation boundary

This is a documentation-only DSK map. No implementation or runtime proof exists.