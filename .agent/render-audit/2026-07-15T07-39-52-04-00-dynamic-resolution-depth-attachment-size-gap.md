# Render Audit: Dynamic-Resolution Depth Attachment Size Gap

**Timestamp:** `2026-07-15T07-39-52-04-00`

## Summary

The active HDR composer color targets and independent depth textures are resized through different physical-dimension rules. EffectComposer uses the accepted effective pixel ratio; the local depth helper writes unscaled CSS dimensions.

## Plan ledger

**Goal:** state the exact render invariant, source-permitted divergence paths, and proof required before changing runtime behavior.

- [x] Trace target construction and replacement depth textures.
- [x] Trace initial, browser, and dynamic-resolution resize order.
- [x] Verify EffectComposer r165 multiplies size by its pixel ratio.
- [x] Record examples where effective pixel ratio differs from `1`.
- [ ] Execute framebuffer and visible-frame fixtures.

## Exact source path

```txt
createHdrComposer(renderer, scene, camera, quality)
  -> create RGBA HalfFloat target at initial viewport size
  -> attach initial DepthTexture
  -> construct EffectComposer from target
  -> replace renderTarget1 and renderTarget2 depth textures
     with two independent unsigned-int DepthTextures
  -> set composer pixel ratio to 1

createDynamicResolutionController.resize(width, height)
  -> dpr = min(devicePixelRatio, tier.pixelRatioCap)
  -> effectivePixelRatio = dpr * dynamicScale
  -> renderer.setPixelRatio(effectivePixelRatio)
  -> renderer.setSize(width, height)
  -> composer.setPixelRatio(effectivePixelRatio)
  -> composer.setSize(width, height)

visualDomain.resize()
  -> resolution.resize(width, height)
  -> hdrComposer.resize(width, height)

hdrComposer.resize(width, height)
  -> composer.setSize(width, height)
  -> depthTexture1.image.width = width
  -> depthTexture1.image.height = height
  -> depthTexture2.image.width = width
  -> depthTexture2.image.height = height
```

## Required invariant

```txt
composer.renderTarget1.width  == depthTexture1.image.width
composer.renderTarget1.height == depthTexture1.image.height
composer.renderTarget2.width  == depthTexture2.image.width
composer.renderTarget2.height == depthTexture2.image.height
all dimensions belong to the same RenderSurfaceGeneration
```

## Source-permitted divergence

```txt
physical color width  = cssWidth  * effectivePixelRatio
physical color height = cssHeight * effectivePixelRatio
local depth width     = cssWidth
local depth height    = cssHeight

coherent only when effectivePixelRatio == 1
```

The quality policy makes non-unit ratios normal:

```txt
high:   cap 1.60 scale 1.00
medium: cap 1.35 scale 0.86
low:    cap 1.05 scale 0.72
floor:  scale 0.62
```

## Visible-frame evidence missing

```txt
accepted target descriptor: absent
attachment equality receipt: absent
framebuffer completeness receipt: absent
resize generation: absent
first frame using successor generation: absent
browser pixel or depth probe: absent
GPU capture: absent
```

## Required result

```txt
RenderSurfaceResizeResult {
  renderSurfaceGeneration
  cssSize
  deviceDpr
  cappedDpr
  dynamicScale
  effectivePixelRatio
  physicalSize
  colorTargets[]
  depthAttachments[]
  passSizes[]
  cloudTargetSize
  validation
  fallback
  retirement
}
```

## Validation boundary

The source proves the independent dimension rules. It does not prove an actual incomplete framebuffer, WebGL error, depth defect, visible corruption, driver behavior, or performance impact.