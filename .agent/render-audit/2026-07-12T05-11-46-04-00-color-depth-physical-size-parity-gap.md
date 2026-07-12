# Render Audit: Color and Depth Physical-Size Parity Gap

**Timestamp:** `2026-07-12T05:11:46-04:00`

## Summary

The current browser resize path can describe the EffectComposer color targets at effective-DPR dimensions while manually setting the two tracked depth texture images to CSS dimensions.

## Source path

```txt
effectivePixelRatio = min(devicePixelRatio, pixelRatioCap) * dynamicScale
composer.setPixelRatio(effectivePixelRatio)
composer.setSize(cssWidth, cssHeight)
hdrComposer.resize(cssWidth, cssHeight)
depth.image.width = cssWidth
depth.image.height = cssHeight
```

## Concrete example

```txt
quality tier: high
CSS surface: 1920 × 1080
DPR cap: 1.6
dynamic scale: 1.0
effective pixel ratio: 1.6

composer physical color target: 3072 × 1728
manual tracked depth image: 1920 × 1080
```

## Missing observations

```txt
actual renderer drawing-buffer dimensions
actual composer target dimensions
actual depth attachment dimensions
attachment IDs
framebuffer status
surface revision
resize generation
fallback reason
first frame using the replacement surface
```

## Required render proof

```txt
all color and depth attachments share committed physical dimensions
DPR and dynamic scale changes use the same resize transaction
incomplete attachment sets never replace the predecessor
the visible frame cites the committed target and attachment IDs
```
