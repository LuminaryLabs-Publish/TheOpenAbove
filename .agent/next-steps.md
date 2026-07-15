# Next Steps: TheOpenAbove HDR Depth Size Coherence

**Last aligned:** `2026-07-15T07-39-52-04-00`  
**Status:** `hdr-dynamic-resolution-depth-attachment-size-coherence-authority-audited`

## Summary

The next work should replace independent CSS-size rewrites with one immutable render-surface descriptor that owns effective pixel ratio, physical color/depth dimensions, target generation, retirement, telemetry, and the first matching HDR frame.

## Plan ledger

**Goal:** repair only HDR resize ownership while preserving the current renderer, EffectComposer, color grade, cloud path, world simulation, gameplay, and public visual-domain API.

### Completed understanding

- [x] Locate quality-tier caps and dynamic-scale policy.
- [x] Trace renderer and composer pixel-ratio sizing.
- [x] Identify two independently attached depth textures.
- [x] Prove the local helper rewrites depth dimensions to CSS size after composer sizing.
- [x] Preserve the 101-surface domain and service inventory.

### Gate 1: render-surface identity

- [ ] Add `ViewportRevision`, `RenderSurfaceGeneration`, `QualityRevision`, and `DynamicScaleRevision`.
- [ ] Normalize CSS width, CSS height, device DPR, capped DPR, dynamic scale, effective pixel ratio, and physical width/height once.
- [ ] Publish immutable color/depth target descriptors.
- [ ] Reject non-finite, zero, stale, or superseded resize requests.

### Gate 2: target preparation

- [ ] Allocate or resize both composer color targets from the physical dimensions.
- [ ] Allocate or resize both independent depth textures to exactly the same physical dimensions.
- [ ] Preserve required formats, half-float color, unsigned-int depth, nearest depth filtering, samples, and stencil policy.
- [ ] Validate every attachment before adoption.
- [ ] Stop manually writing CSS dimensions into physical depth attachments.

### Gate 3: atomic adoption and retirement

- [ ] Prepare the candidate generation without mutating the accepted generation.
- [ ] Atomically adopt both color targets, both depth attachments, and pass sizes.
- [ ] Preserve the accepted predecessor if any allocation or validation step fails.
- [ ] Retire replaced textures and targets exactly once.
- [ ] Fence late work from retired generations.

### Gate 4: dynamic resolution and cloud correlation

- [ ] Route boot, browser resize, DPR change, quality change, and frame-time scale change through the same command.
- [ ] Bind the cloud target dimensions to the accepted renderer drawing-buffer generation.
- [ ] Publish actual CSS, physical, cloud, and pass dimensions in one result.
- [ ] Distinguish a viewport resize from a dynamic-scale transition.

### Gate 5: telemetry and visible proof

- [ ] Publish `RenderSurfaceResizeResult` with target and attachment receipts.
- [ ] Expose accepted dimensions through diagnostics without exposing mutable renderer owners.
- [ ] Publish `FirstHdrResizeFrameAck` after a frame uses the accepted generation.
- [ ] Record fallback or rejection reasons.

### Gate 6: fixtures

- [ ] High tier at DPR 1, 1.25, 1.6, and 2.
- [ ] Medium tier at DPR 1 and 2.
- [ ] Low tier at DPR 1 and 2.
- [ ] Dynamic scales from tier default down to `0.62` and back.
- [ ] Repeated browser resize and orientation changes.
- [ ] Context loss and recovery.
- [ ] Color/depth attachment equality and framebuffer completeness.
- [ ] Cloud target correlation with renderer drawing buffer.
- [ ] Source, production build, artifact, and Pages parity.

## Recommended file cut

```txt
src/visual/render-surface/
  hdr-render-target-depth-size-coherence-authority-domain.js
  render-surface-descriptor-kit.js
  render-surface-generation-kit.js
  render-target-preparation-kit.js
  depth-attachment-preparation-kit.js
  render-target-validation-kit.js
  render-surface-adoption-kit.js
  render-surface-retirement-kit.js
  dynamic-resolution-transition-kit.js
  render-surface-result-kit.js
  first-hdr-resize-frame-ack-kit.js

tests/
  hdr-depth-size-coherence.mjs
```

## Compatibility constraints

Preserve current Three.js `0.165.0`, the public visual-domain shape, quality tiers, dynamic-resolution thresholds, cloud LOD scales, HDR color grade, balloon and mail APIs, Core World composition, and Pages deployment.

## Retained next steps

Cloud relative-depth reconstruction, ground-contact delivery eligibility, provider/build identity, route retirement, world adoption, Air Mail history, and flight persistence remain open.

## Do not claim

Do not claim attachment equality, framebuffer completeness, resize safety, visible equivalence, cloud correlation, artifact parity, or production readiness until the full fixture matrix passes.