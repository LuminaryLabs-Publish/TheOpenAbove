# Render Audit: Telemetry, Render, HUD and GameHost Ordering Gap

**Timestamp:** `2026-07-11T14-50-59-04-00`

## Summary

The visible frame is submitted after Nexus telemetry has already captured the mutable visual state. Renderer statistics are written after submission and HUD HTML is projected afterward, leaving no proof that telemetry, HUD and canvas correspond.

## Plan ledger

**Goal:** label each render submission and require all visible/readback consumers to acknowledge the same frame before external publication.

- [x] Trace `visual.update`.
- [x] Trace telemetry snapshot publication.
- [x] Trace `visual.render`.
- [x] Trace dynamic-resolution sampling.
- [x] Trace renderer statistics.
- [x] Trace HUD and GameHost projection.

## Current order

```txt
visual.update
  -> updates weather sun sky clouds aerial terrain grass water lens composer state

engine.tick
  -> getSnapshot
  -> store BalloonSnapshot and VisualSnapshot
  -> emit BalloonTicked

visual.render
  -> composer.render
  -> resolution.sample
  -> assign renderer.info.render.calls
  -> assign renderer.info.render.triangles

updateHud
  -> write independent DOM string
```

## Defects

```txt
telemetry drawCalls may describe the previous submission
telemetry triangles may describe the previous submission
renderScale may be sampled or changed after telemetry
HUD delivery and control copy has no frame revision
canvas submission has no RenderFrameId
no renderer submission result exists
no first-visible-delivery frame proof exists
GameHost can read mutable state between consumer steps
```

## Required render result

```txt
RenderSubmissionResult
  runtimeSessionId
  missionEpoch
  renderFrameId
  sourceSimulationTickId
  deliveryResultId
  renderPlanFingerprint
  submitted
  drawCalls
  triangles
  requestedRenderScale
  effectiveRenderScale
  rendererGeneration
  completedAt
```

## Required acknowledgements

```txt
world-render
postprocess
dynamic-resolution
HUD
telemetry
external-read-model
```

Only the required set for the admitted product/quality mode should gate commit.
