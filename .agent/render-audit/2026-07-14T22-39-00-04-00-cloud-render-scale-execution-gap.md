# Render Audit: Cloud Render-Scale Execution Gap

**Timestamp:** `2026-07-14T22-39-00-04-00`

## Plan ledger

**Goal:** prove exactly where the declared cloud scale stops and define the missing visible-frame evidence.

- [x] Inspect cloud LOD output.
- [x] Inspect volumetric mesh and shader loops.
- [x] Inspect scene/composer ownership.
- [x] Inspect dynamic resolution.
- [x] Inspect terrain cloud shadows.
- [ ] Capture GPU timings and matching browser frames.

## Current render path

```txt
CloudLodProfile.renderScale = 0.50 / 0.42 / 0.32
  -> not read by createVolumetricClouds
  -> cloud sphere is added to shared scene
  -> shared RenderPass renders cloud at composer resolution
  -> color grade composites full frame
```

## Cost shape

```txt
sphere radius: 4050
frustumCulled: false
view-loop shader ceiling: 48
tier view samples: 36 / 26 / 14
light-loop shader ceiling: 8
tier light samples: 6 / 4 / 2
terrain cloud shadow: 2 fbm2 fields per terrain fragment
```

An occupied cloud sample can invoke a nested light march. The audit does not convert this source shape into a measured GPU cost.

## Missing frame evidence

```txt
cloud target generation
cloud target dimensions
cloud profile revision
view/light samples actually executed
history generation and reset reason
scene-depth revision
upscale profile and edge rejection
HDR composite order
fallback classification
GPU timer receipt
first visible cloud frame acknowledgement
```

## Required visible-frame chain

```txt
CloudFrameResult
  -> CloudTargetReceipt
  -> CloudRaymarchReceipt
  -> CloudUpscaleReceipt
  -> CloudCompositeReceipt
  -> renderer generation + frame id + image hash
  -> FirstVisibleCloudFrameAck
```
