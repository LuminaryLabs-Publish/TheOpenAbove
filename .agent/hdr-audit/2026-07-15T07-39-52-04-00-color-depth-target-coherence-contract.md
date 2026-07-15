# HDR Audit: Color and Depth Target Coherence Contract

**Timestamp:** `2026-07-15T07-39-52-04-00`

## Summary

The HDR subsystem needs a single physical render-surface contract. Every composer color target, independent depth attachment, pass size, cloud correlation, retirement event, and visible frame must cite the same immutable generation.

## Plan ledger

**Goal:** define exact invariants and lifecycle rules without prescribing a renderer rewrite.

- [x] Record existing formats and sizing inputs.
- [x] Define color/depth equality and ownership invariants.
- [x] Define adoption, retirement, and proof requirements.
- [ ] Implement and execute the contract.

## Existing resource contract

```txt
color target type: HalfFloat
color target format: RGBA
color filtering: Linear
color samples: high 2 otherwise 0
depth type: UnsignedInt
depth format: Depth
depth filtering: Nearest
stencil: false
composer target count: 2
independent depth attachment count: 2
```

## Required immutable descriptor

```txt
RenderSurfaceDescriptor {
  generation
  cssWidth
  cssHeight
  deviceDpr
  pixelRatioCap
  dynamicScale
  effectivePixelRatio
  physicalWidth
  physicalHeight
  colorType
  colorFormat
  depthType
  depthFormat
  samples
  stencil
  qualityRevision
  contextRevision
}
```

## Required invariants

```txt
physicalWidth  = normalized(cssWidth  * effectivePixelRatio)
physicalHeight = normalized(cssHeight * effectivePixelRatio)

renderTarget1.width  == physicalWidth
renderTarget1.height == physicalHeight
renderTarget2.width  == physicalWidth
renderTarget2.height == physicalHeight

depthTexture1.image.width  == physicalWidth
depthTexture1.image.height == physicalHeight
depthTexture2.image.width  == physicalWidth
depthTexture2.image.height == physicalHeight

all enabled passes consume physicalWidth and physicalHeight
all resources cite the same generation
```

## Adoption contract

```txt
prepare color targets
  -> prepare depth attachments
  -> size passes
  -> validate complete candidate
  -> optionally validate framebuffer completeness
  -> atomically publish successor
  -> render first successor frame
  -> publish FirstHdrResizeFrameAck
  -> retire predecessor
```

A candidate failure must leave the accepted predecessor unchanged.

## Retirement contract

```txt
retire on viewport replacement DPR replacement quality replacement
  dynamic-scale replacement context replacement or visual disposal

exactly once:
  detach depth attachments
  dispose depth textures
  dispose render targets
  clear public references
  reject late frame work
  publish retirement receipts
```

## Correlation contract

The cloud target may remain lower resolution, but its dimensions must be derived from the renderer drawing buffer belonging to the same accepted render-surface generation. Cloud and HDR results must state both scales and generations explicitly.

## Required evidence

```txt
descriptor snapshot before and after every transition
exact target and depth image dimensions
WebGL framebuffer status for both targets
first frame acknowledgement
no stale predecessor publication
context recovery replacement receipts
source build artifact and Pages parity
```

## Validation boundary

This contract is not implemented. No framebuffer, GPU, browser, or deployment proof was executed.