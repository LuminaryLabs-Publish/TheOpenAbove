# Cloud System Audit: Low-Resolution Depth Ownership Contract

**Timestamp:** `2026-07-15T02-09-29-04-00`

## Summary

The volumetric kit now owns cloud color at reduced resolution, but no component owns representative cloud depth or reconstruction against full-resolution scene depth. The minimum reliable contract is to keep color, transmittance, cloud depth, target generation, and composite policy under one cloud-frame authority.

## Plan ledger

**Goal:** establish exact ownership for low-resolution cloud resources and their adoption into the HDR frame.

- [x] Record current resource ownership.
- [x] Define depth, target-generation, resize, fallback, and retirement rules.
- [ ] Implement and validate the contract.

## Resource ownership

```txt
cloud color target
  owner: volumetric-cloud kit
  current: RGBA HalfFloat, scaled, no depth buffer

cloud transmittance
  owner: none
  current: folded into output alpha

representative cloud depth
  owner: none
  current: absent

scene depth
  owner: main HDR RenderPass
  current: not exposed to cloud composite

upscale/reconstruction
  owner: composite material
  current: linear color sampling only

target generation and retirement
  owner: volumetric-cloud kit
  current: resize/dispose implementation without receipts
```

## Required invariants

```txt
1. One CloudTargetGeneration owns all target attachments.
2. Color, transmittance, and cloud depth use one viewport/scale revision.
3. Scene and cloud depth are converted into one linear distance space.
4. A cloud sample composites only when its depth is in front of accepted scene depth.
5. Edge reconstruction cannot borrow cloud samples across a nearer geometry boundary.
6. Resize, DPR, quality, and context changes retire predecessor targets.
7. A stale frame cannot publish after target or renderer generation changes.
8. Color-only or far-depth operation is an explicit fallback, never an implicit success.
```

## Suggested encodings

```txt
color:          RGBA16F or supported fallback
transmittance:  alpha or dedicated R16F when needed
cloud depth:    representative linear eye distance in R16F/R32F or packed fallback
scene depth:    accepted linearized depth texture from HDR renderer
```

The exact format should be capability-admitted rather than hard-coded as an architectural requirement.

## Lifecycle

```txt
prepare target generation
  -> validate dimensions and formats
  -> render cloud outputs
  -> reconstruct and composite
  -> publish CloudFrameResult
  -> present matching frame
  -> retire superseded generation after no in-flight frame references it
```

## Terrain shadow policy

Terrain cloud shadows remain outside the new color target. They must cite the same weather and quality revisions and publish whether the frame used procedural, cached, or disabled shadows.

## Validation boundary

Resource lifetime was inspected from source only. Context loss, resize churn, quality transitions, and in-flight retirement were not executed.