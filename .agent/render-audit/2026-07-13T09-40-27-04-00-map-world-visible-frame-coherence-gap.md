# Render Audit: Map and World Visible-Frame Coherence Gap

## Summary

The WebGL canvas and parchment-map canvas have separate RAF chains and no shared frame identity. A map-open transition exposes the overlay before a matching Canvas2D projection is guaranteed to exist.

## Source path

```txt
main frame
  -> optional simulation/mail/visual updates
  -> visual.render(...)
  -> requestAnimationFrame(frame)

map setOpen(true)
  -> root.classList.toggle("is-open", true)
  -> aria-hidden=false
  -> resize()
  -> requestAnimationFrame(animate)

map animate
  -> draw mutable player and parcel state
  -> requestAnimationFrame(animate)
```

## Visible risks

```txt
first visible map frame can contain blank or predecessor pixels
world canvas can cite a different logical instant than the map canvas
map destination and player markers have no source revision
map and world partial failures have no common recovery result
GameHost cannot prove which world/map pair was visible
stale map RAF callbacks have no transition-generation fence
```

## Required render evidence

```txt
FrameEnvelopeId
WorldRenderFrameId
MapRenderFrameId
MapTransitionGeneration
WorldProjectionResult
MapProjectionResult
DualSurfaceCommitId
visible world fingerprint
visible map fingerprint
FirstCoherentMapFrameAck
```

## Acceptance boundary

`map open` should mean the first map frame derived from the accepted state envelope is visible, not merely that a CSS class was toggled and a future RAF was requested.

## Validation

No browser rendering, pixel readback, WebGL inspection, Canvas2D inspection or Pages smoke was executed.