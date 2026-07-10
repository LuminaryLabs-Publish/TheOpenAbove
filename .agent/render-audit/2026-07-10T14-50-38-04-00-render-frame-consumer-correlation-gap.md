# Render Audit: Render-Frame Consumer Correlation Gap

**Timestamp:** `2026-07-10T14-50-38-04-00`

## Current render path

```txt
createVisualDomain
  -> renderer / scene / camera
  -> quality and dynamic resolution
  -> sky / sun / atmosphere / clouds
  -> streamed terrain / vegetation / grass / water / landmarks
  -> HDR composer / neutral grade / lens response

per frame
  -> visual.update({ dt, elapsed, flightState, cameraContext })
  -> telemetry tick
  -> visual.render(dt, frameMs)
  -> HUD update
```

The visual domain exposes useful aggregate fields such as quality, exposure, luminance, sun-facing state, render scale, draw calls, and triangles. That is sufficient for current HUD/readback, but not for render-consumption proof.

## Proven strengths

```txt
rendering is separated from balloon simulation
camera context is passed explicitly into visual.update
quality and render statistics are surfaced
headless inspection checks framebuffer and shader safety contracts
streamed terrain, water fog, neutral exposure, and disabled cinematic passes have static checks
```

## Missing render proof

```txt
no renderFrameId shared with simulation/camera/telemetry/HUD
no source fingerprint attached to the render submission
no row proving which camera context was consumed
no row proving which flight snapshot was consumed
no row recording requested versus resolved quality/render scale
no row recording draw-call/triangle counters for the correlated frame
no row distinguishing rendered, skipped, degraded, recovered, or failed
no bounded render-consumer journal exposed through GameHost
no DOM-free fixture for render-consumption row shape
```

## Required render consumption row

```js
{
  renderRowId,
  frameId,
  sourceFingerprint,
  simulationSnapshotId,
  cameraSnapshotId,
  requestedQuality,
  resolvedQuality,
  requestedRenderScale,
  resolvedRenderScale,
  drawCalls,
  triangles,
  frameMs,
  status,
  reason
}
```

## Guardrails

The proof pass must not replace the renderer, change post-processing, retune clouds, retune terrain, alter camera framing, or modify quality thresholds. It should observe the existing render path additively.

## Main finding

The renderer is not the blocker. The blocker is the inability to attribute a rendered frame to the exact source, input, simulation, and camera rows that produced it.

## Next safe ledge

```txt
Add bounded render-consumption rows to the shared frame-correlation proof domain, then expose them additively through GameHost and the headless fixture.
```