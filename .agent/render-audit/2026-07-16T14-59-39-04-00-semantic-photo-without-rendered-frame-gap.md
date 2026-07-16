# Render Audit: Semantic Photo Without a Rendered Frame

## Summary

The player can frame a view and receive a named, scored capture result, but no renderer pixels are sampled and no frame identity is recorded.

## Current ordering

```txt
Experience.update
  -> camera rig and visual state settle
ImageCapture.update
  -> camera direction read
  -> distance/facing/zoom score computed
  -> metadata record accepted
engine.tick
Experience.render
  -> actual visible frame presented later
```

## Confirmed render gap

```txt
renderer passed to Image Capture: yes
renderer used for wheel listener: yes
renderer canvas read: no
render target read: no
canvas toBlob/toDataURL: no
frame number or render revision: no
camera matrix receipt: no
exposure/render-scale receipt: no
encoded image artifact: no
journal texture/image projection: no
```

## Consequence

The score describes intended camera geometry rather than immutable evidence of the presented image. Dynamic resolution, exposure, weather, cloud state, world-generation swaps or later camera changes are not bound to the semantic capture record.

## Required render contract

```txt
accepted shutter
  -> freeze camera and presentation descriptor
  -> present or render one capture frame
  -> extract exact color source
  -> encode artifact and digest
  -> bind semantic score to the same descriptor
  -> expose actual image to journal projection
```

## Required proof

- Capture image dimensions match the admitted viewport/capture policy.
- Digest changes when pixels change and remains stable for identical bytes.
- Score, artifact and journal carry the same capture/frame ID.
- Resize or dynamic-resolution transitions cannot mix generations.
- Renderer loss, disposal or route retirement produce typed failure results.

## Boundary

No render implementation was changed or executed. No visible defect is claimed.