# Render Audit: Generation and Terminal Readback Gap

**Timestamp:** `2026-07-10T19-18-39-04-00`

## Current frame path

```txt
visual.update()
  -> copies current render scale and grass state
engine.tick()
  -> publishes telemetry before rendering
visual.render()
  -> submits composer frame
  -> samples adaptive resolution
  -> writes draw calls and triangles
HUD
  -> reads shared state after render
requestAnimationFrame(frame)
```

## Gap

The renderer has no session generation, retained frame request ID, committed frame ID, or terminal result. A callback queued by an old session can call `visual.render()` after a restart unless generation is checked before every frame phase.

`visual.dispose()` removes the resize listener and disposes grass, terrain, and composer, but the route does not call it. Renderer, balloon, vegetation, landmarks, weather, sky, sun, clouds, aerial, water, and lens ownership are not centrally classified.

## Required render proof row

```txt
sessionId
generation
frameId
status
renderRequested
renderCommitted
renderScaleBefore
renderScaleAfter
drawCalls
triangles
resourceOwnerCount
resourceTerminalCount
rejectionReason
```

## Required terminal behavior

```txt
stop invalidates generation before the next render phase
stale frame callback returns rejected/stale-session
no renderer statistics mutate after stop
dispose produces one terminal resource summary
GameHost retains only immutable terminal render proof
restart allocates a new sessionId and generation
```

## Guardrail

Do not retune visual quality or replace the renderer while adding generation and terminal proof.
