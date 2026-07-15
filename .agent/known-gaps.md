# Known Gaps: TheOpenAbove HDR Depth Size Coherence

**Last aligned:** `2026-07-15T07-39-52-04-00`  
**Status:** `hdr-dynamic-resolution-depth-attachment-size-coherence-authority-audited`

## Summary

The HDR composer owns two color render targets and two independent depth textures, but no shared physical-size descriptor or atomic resize result binds them. Host resize handling can leave the color targets at effective-pixel dimensions while the depth texture images are rewritten to CSS dimensions.

## Plan ledger

**Goal:** keep render-surface sizing, adoption, retirement, telemetry, browser proof, and retained product gaps dependency ordered.

- [x] Identify the color/depth dimension split.
- [x] Trace boot, browser resize, and dynamic-scale paths.
- [x] Preserve the current cloud and HDR findings.
- [ ] Add one render-surface generation and descriptor.
- [ ] Size all color and depth attachments from that descriptor.
- [ ] Add atomic adoption and predecessor preservation.
- [ ] Add retirement and stale-generation rejection.
- [ ] Add exact dimension and framebuffer proof.
- [ ] Correlate the first visible HDR frame.
- [ ] Prove source, build, artifact, and Pages parity.

## Implemented state

```txt
quality-tier DPR caps: present
dynamic-resolution scale: present
renderer pixel-ratio resize: present
EffectComposer pixel-ratio resize: present
two half-float composer color targets: present
two independent unsigned-int depth textures: present
cloud target sizes from renderer drawing buffer: present
manual local depth image resize: present
```

## Primary size-coherence gaps

```txt
shared CSS/physical size descriptor: absent
effective pixel-ratio revision: absent
color target generation identity: absent
depth attachment generation identity: absent
color/depth equality validation: absent
framebuffer completeness proof: absent
pass-size compatibility receipt: absent
atomic resize adoption: absent
predecessor preservation on resize failure: absent
```

## Source-permitted divergence paths

### High-DPR upscale

```txt
quality high and device DPR 2
  -> capped DPR 1.6
  -> dynamic scale 1.0
  -> color targets use 1.6x CSS dimensions
  -> local depth helper writes 1.0x CSS dimensions
```

### Medium or low downscale

```txt
quality medium and device DPR 1
  -> effective ratio 0.86
  -> color targets use 0.86x CSS dimensions
  -> local depth helper writes 1.0x CSS dimensions

quality low and device DPR 1
  -> effective ratio 0.72
  -> color targets use 0.72x CSS dimensions
  -> local depth helper writes 1.0x CSS dimensions
```

### Dynamic-scale transition

```txt
frame-time controller changes scale
  -> resolution.resize updates composer and attached target sizes
  -> no RenderSurfaceResizeResult is published
  -> later browser resize repeats the CSS depth rewrite
  -> no generation fence proves which dimensions produced the visible frame
```

These paths are derived from source and the imported Three.js `EffectComposer` r165 size rule. They were not reproduced in a browser or GPU capture.

## Lifecycle and evidence gaps

```txt
resize retirement receipt: absent
DPR transition receipt: absent
quality transition receipt: absent
context-recovery generation: absent
late predecessor rejection: absent
depth allocation byte receipt: absent
accepted target readback: absent
FirstHdrResizeFrameAck: absent
source/build/artifact/Pages parity: unproven
```

## Cloud correlation gaps retained

```txt
cloud target consumes renderer drawing-buffer size: yes
cloud target generation bound to HDR target generation: no
cloud depth output: no
scene-depth-aware cloud reconstruction: no
CloudFrameResult: no
FirstVisibleCloudFrameAck: no
```

## Dependency order

```txt
render-surface identity
  -> physical size derivation
  -> color and depth target preparation
  -> attachment validation
  -> atomic adoption
  -> predecessor retirement
  -> dynamic-resolution and cloud correlation
  -> visible-frame acknowledgement
  -> build artifact and Pages parity
```

## Retained product gaps

Ground-contact delivery eligibility, cloud relative depth, provider/build identity, route lifecycle, world adoption, terrain and vegetation proof, Air Mail history, and flight persistence remain unresolved.

## Do not claim

Do not claim an observed framebuffer failure, visible corruption, attachment correctness, resize safety, cloud/HDR coherence, artifact parity, deployed parity, or production readiness until the required fixtures pass.