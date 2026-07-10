# Render Audit — Telemetry and Render-Scale Phase Skew

Timestamp: `2026-07-10T16-20-09-04-00`

## Observed order

```txt
visual.update()
  -> reads resolution.state.scale
  -> writes visual.state.renderScale

engine.tick()
  -> getSnapshot()
  -> publishes visual state before render

visual.render()
  -> composer.render(dt)
  -> resolution.sample(frameMs, width, height)
  -> may mutate resolution.state.scale
  -> may resize renderer/composer
  -> writes renderer.info calls and triangles

updateHud()
  -> reads the shared visual state object
```

## Phase mismatch

`resolution.sample()` runs after telemetry. When it changes scale, `visual.state.renderScale` is not refreshed until the next `visual.update()`. Renderer statistics are refreshed after submission. This creates a mixed state:

```txt
field                 Nexus telemetry       HUD/GameHost.local after render
renderScale           pre-sample            pre-sample
drawCalls             previous/pre-render   current render
triangles             previous/pre-render   current render
quality tier          current                current
frame identity        absent                 absent
```

## Adaptive-resolution decision state currently hidden

```txt
tier
scale before
scale after
smoothedMs
sampleFrames before
sampleFrames after
threshold crossed
bound hit
resize requested
resize completed
```

## Required render result

```js
{
  frameId,
  status,
  frameMs,
  scaleBefore,
  scaleAfter,
  smoothedMs,
  sampleFrames,
  decision,
  resized,
  drawCalls,
  triangles
}
```

## Required fix direction

Do not merely move one line without preserving observability. Make render return a result, commit it into one immutable frame snapshot, then publish telemetry and HUD/GameHost projections from that committed frame. A pre-render telemetry path can remain only if its phase is explicit and independently named.

## Validation target

Drive synthetic frame costs through at least two 90-sample windows and prove deterministic hold, downscale, and recovery rows without needing WebGL or DOM.

## Next safe ledge

`TheOpenAbove Render Phase Authority Ledger + Adaptive Resolution Fixture Gate`