# Render Audit: Context Loss and First-Recovered-Frame Gap

**Timestamp:** `2026-07-16T03-03-22-04-00`

## Summary

The visible frame is produced by one WebGL renderer generation with HDR, depth, cloud, terrain, flora, water, and balloon GPU resources. The product does not own the transition from a lost context to a verified recovered frame.

## Plan ledger

**Goal:** prove that visible presentation either resumes from one coherent rebuilt resource generation or settles to an actionable fallback.

- [x] Inspect renderer, composer, cloud target, resize, render, first-frame state, and disposal.
- [x] Confirm no context-loss/restoration listeners or recovery generation.
- [x] Identify the visible-frame convergence gap.
- [ ] Force context loss before the first frame, during flight, during map display, and during dynamic-resolution resize.
- [ ] Verify one recovered frame or fallback per loss generation.

## Current frame path

```txt
clouds.render(renderer, camera)
  -> private half-float cloud target
composer.render(dt)
  -> HDR targets and independent depth textures
resolution.sample(...)
  -> possible drawing-buffer resize
state.firstFramePresented = true
  -> RAF continues
```

## Gap

```txt
WebGL context becomes lost
  -> existing renderer and GPU objects become unusable or undefined for presentation
  -> no RenderLossResult is published
  -> frame callback keeps submitting work
  -> firstFramePresented remains historical and unversioned
  -> no last-good frame, fallback, or recovering state is projected
  -> restoration does not trigger ordered resource reconstruction
  -> no accepted recovered frame is acknowledged
```

## Required visible states

```txt
ready(rendererGeneration, frameRevision)
recovering(lossGeneration, progress, deadline)
recovered(rendererGeneration, frameRevision)
fallback(reason, retryAvailable)
retired(runtimeGeneration)
```

## Required proof

- `webglcontextlost` is admitted once and prevents stale draw submission.
- The historical `firstFramePresented` flag cannot satisfy recovery readiness.
- Composer color/depth targets and cloud targets belong to the new generation.
- Scene materials, textures, geometries, streamed chunks, and instancing buffers verify against the new context.
- Dynamic-resolution state and drawing-buffer size are reapplied.
- Exactly one `FirstRecoveredFrameAck` matches the visible recovered frame.
- Failed recovery exposes a semantic fallback instead of a silent frozen canvas.

## Boundary

No browser was launched and no renderer-loss incident was reproduced. The finding is source-backed.