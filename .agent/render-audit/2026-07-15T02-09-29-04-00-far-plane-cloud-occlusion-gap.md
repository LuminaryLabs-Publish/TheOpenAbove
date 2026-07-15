# Render Audit: Far-Plane Cloud Occlusion Gap

**Timestamp:** `2026-07-15T02-09-29-04-00`

## Summary

Clouds now render at the declared LOD scale, but their composite does not reconstruct cloud depth. The fullscreen composite is fixed at far clip depth and only samples cloud color and alpha, allowing every nearer scene-depth sample to win regardless of where the cloud ray accumulated.

## Plan ledger

**Goal:** preserve the low-resolution cost reduction while making cloud-versus-geometry occlusion depend on actual relative depth.

- [x] Inspect target format, dimensions, depth-buffer policy, shaders, material flags, draw order, and composer order.
- [x] Confirm the cloud target is real and LOD-scaled.
- [x] Confirm the composite has no cloud-depth or scene-depth input.
- [x] Define depth and edge fixtures.
- [ ] Implement and execute the fixtures.

## Active render order

```txt
clouds.render(renderer, camera)
  -> bind low-resolution target
  -> clear transparent
  -> ray march private cloud scene
  -> restore main target

composer.render(dt)
  -> main RenderPass draws world and writes scene depth
  -> transparent fullscreen cloud plane samples low-resolution color/alpha
  -> depth test compares fixed far-plane fragment depth with scene depth
  -> color grading and final presentation
```

## Confirmed state

```txt
cloud target: RGBA HalfFloat
cloud target depthBuffer: false
cloud target stencilBuffer: false
cloud target min/mag filter: Linear
cloud target dimensions: drawing buffer * LOD renderScale
cloud output: color + accumulated alpha
representative cloud depth: absent
separate transmittance: absent
scene-depth sampler: absent
upscale filter: texture linear sampling only
composite clip depth: z = w, far plane
composite depthTest: true
composite depthWrite: false
composite blending: normal
composite order: -90 in main scene
```

## Source-permitted mismatch

```txt
ray accumulates a cloud before a distant mountain
  -> low-resolution target stores color and alpha only
  -> fullscreen composite fragment is assigned far depth
  -> mountain depth is less than far depth
  -> depth test rejects the cloud fragment
  -> mountain appears in front even though the cloud sample was nearer
```

The same policy affects terrain, balloon geometry, ropes, towns, vegetation, and other depth-writing surfaces. This is not a claim that a visible defect was reproduced.

## Required render contract

```txt
CloudDepthCompositeResult
  FrameId
  targetGeneration
  colorTargetDescriptor
  transmittanceTargetDescriptor
  cloudDepthTargetDescriptor
  sceneDepthRevision
  depthEncoding
  upscaleProfile
  compositeOrder
  executionProfile
  passReceipts
  targetRetirementReceipt
  visibleFrameAck
```

## Fixture matrix

```txt
cloud in front of mountain       -> cloud survives
cloud behind mountain            -> mountain occludes cloud
cloud crossing terrain edge      -> no low-resolution halo
cloud behind balloon envelope    -> balloon occludes cloud
cloud in front of distant town   -> cloud survives
resize / DPR / scale transition  -> matching target generation only
context recovery                 -> predecessor target retired
color-only fallback              -> explicit result and telemetry
```

## Validation boundary

No browser screenshot, pixel probe, WebGL capture, GPU timing, build, or deployed-origin fixture was run.