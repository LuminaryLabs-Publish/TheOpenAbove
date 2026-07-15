# Current Audit: TheOpenAbove HDR Depth Size Coherence

**Last aligned:** `2026-07-15T07-39-52-04-00`  
**Status:** `hdr-dynamic-resolution-depth-attachment-size-coherence-authority-audited`  
**Reviewed documentation head:** `1417c80309218c7c61def3b2f09a977eaab8b953`

## Summary

The active renderer combines a quality-tier pixel-ratio cap with a dynamic scale, passes that effective ratio to the Three.js `EffectComposer`, and sizes the composer color targets in physical pixels. The visual-domain resize path then calls the local HDR resize helper, which manually rewrites both independently owned depth textures to CSS viewport dimensions. The resulting color/depth dimension contract is coherent only when the effective pixel ratio equals `1`.

## Plan ledger

**Goal:** isolate the smallest authority boundary that makes every HDR color and depth attachment share one physical render-surface generation.

- [x] Compare the full Publish inventory, central ledger, root `.agent` coverage, and current heads.
- [x] Select only TheOpenAbove using the oldest synchronized eligible rule.
- [x] Inspect `quality-tier-kit.js`, `visual-domain.js`, `hdr-composer-kit.js`, `volumetric-cloud-kit.js`, `main.js`, package scripts, and Three.js `EffectComposer` r165 sizing.
- [x] Trace boot, resize, dynamic-scale, cloud, composer, presentation, and disposal order.
- [x] Preserve all 101 active named surfaces and their service ownership.
- [x] Add the timestamped tracker and HDR-specific audit family.
- [ ] Implement and prove atomic color/depth target sizing, retirement, and visible-frame acknowledgement.

## Complete interaction loop

```txt
workflow and browser admission
  -> checkout product and NexusEngine provider
  -> test bundle upload and deploy
  -> compose balloon airstream Air Mail Core World visual and UI domains
  -> create renderer scene camera HDR composer and independent depth textures

initial and browser resize
  -> read CSS viewport width and height
  -> update camera projection
  -> derive capped DPR and dynamic scale
  -> set renderer pixel ratio and drawing-buffer size
  -> set EffectComposer pixel ratio and size
  -> EffectComposer sizes both color targets to CSS size * effective pixel ratio
  -> call local HDR resize helper
  -> EffectComposer keeps the same effective physical color size
  -> local helper rewrites both depth textures to CSS width and height

frame update and render
  -> advance balloon airstream Air Mail world and presentation state
  -> render low-resolution cloud target from current drawing buffer
  -> render HDR scene through composer color and depth attachments
  -> color grade and present
  -> sample frame time and possibly change dynamic scale

teardown
  -> dispose cloud resources
  -> dispose independent depth textures target and composer
```

## Domains in use

```txt
GitHub workflow provider checkout Vite build artifact and Pages deployment
browser route import map RAF input errors resize and GameHost
Nexus Engine telemetry Core World foundations features and landforms
balloon flight telemetry presentation camera clipping and model lifecycle
airstream routes fields forces visuals and diagnostics
Air Mail parcels routes towns volumes progress and completion
staged world generation terrain vegetation grass flowers water and landmarks
quality detection DPR policy dynamic resolution and render-surface sizing
weather sky sun aerial perspective volumetric clouds and cloud LOD
HDR render targets depth attachments composer passes color grading and lens response
parchment map validation tests and central tracking
```

## Kit and service census

```txt
local source-backed kits:           71
runtime-implied adapters:           13
Core World provider surfaces:       17
active documented total:           101
inactive or retired legacy:         13
planned HDR coherence surfaces:     18
new runtime kit IDs:                 0
```

The complete kit-by-kit service inventory is in the timestamped tracker and `.agent/kit-registry.json`.

## Source-backed findings

```txt
quality pixel-ratio caps: high 1.60 medium 1.35 low 1.05
initial dynamic scales: high 1.00 medium 0.86 low 0.72
dynamic scale floor: 0.62
effective pixel ratio: min(device DPR, cap) * dynamic scale
composer target size rule: CSS width/height * effective pixel ratio
independent depth texture count: 2
local depth resize rule: CSS width/height
boot calls resolution resize then local HDR resize: yes
browser resize uses the same order: yes
color/depth physical-size descriptor: absent
attachment generation identity: absent
atomic resize adoption result: absent
resize rollback or predecessor preservation: absent
first matching HDR frame acknowledgement: absent
```

## Source-permitted examples

```txt
high tier device DPR 2.0
  -> effective pixel ratio 1.6
  -> color target uses 1.6x CSS dimensions
  -> depth texture is rewritten to 1.0x CSS dimensions

medium tier device DPR 1.0
  -> effective pixel ratio 0.86
  -> color target uses 0.86x CSS dimensions
  -> depth texture is rewritten to 1.0x CSS dimensions

low tier device DPR 1.0
  -> effective pixel ratio 0.72
  -> color target uses 0.72x CSS dimensions
  -> depth texture is rewritten to 1.0x CSS dimensions
```

These are source-derived dimension paths. No browser framebuffer or visual failure was reproduced.

## Required parent domain

```txt
open-above-hdr-render-target-depth-size-coherence-authority-domain
```

## Required transaction

```txt
RenderSurfaceResizeCommand
  -> bind ViewportRevision RendererGeneration ComposerGeneration QualityRevision and DynamicScaleRevision
  -> derive one immutable effective pixel ratio and physical size
  -> prepare both composer color targets
  -> prepare both independent depth attachments at identical dimensions
  -> validate type format samples depth ownership and pass compatibility
  -> atomically adopt RenderTargetGeneration
  -> preserve the accepted predecessor on failure
  -> publish RenderSurfaceResizeResult and per-attachment receipts
  -> retire replaced targets and attachments exactly once
  -> publish FirstHdrResizeFrameAck
```

## Validation boundary

Documentation only. Runtime code, shaders, gameplay, packages, tests, workflows, and deployment were not changed. No browser, GPU, build, artifact, or Pages fixture was run.