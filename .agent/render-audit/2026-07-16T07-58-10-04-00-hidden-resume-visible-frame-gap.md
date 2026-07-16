# Render Audit: Hidden-to-Resumed Visible-Frame Gap

**Timestamp:** `2026-07-16T07-58-10-04-00`

## Summary

The renderer resumes whenever the browser next invokes the flight RAF. No accepted lifecycle, clock or scheduler generation proves that the first visible frame after backgrounding belongs to a coherent resumed state.

## Plan ledger

**Goal:** bind the first post-suspension visible frame to accepted lifecycle, clock, simulation, world and render revisions.

- [x] Trace flight and map frame scheduling.
- [x] Confirm interval clipping exists.
- [x] Confirm no resume-generation or frame acknowledgement exists.
- [x] Define visible-frame acceptance requirements.
- [ ] Implement and exercise browser fixtures.

## Current render path

```txt
flight RAF callback
  -> clamp frameMs and dt
  -> update accepted state when map is closed
  -> visual.render()
  -> request next RAF

map-open path
  -> flight RAF renders with dt=0
  -> map RAF redraws Canvas2D overlay
```

## Hidden/resume gap

```txt
document becomes hidden or frozen
  -> browser may stop flight and map callbacks
  -> no render-suspension result is published
  -> no scheduler generation is retired

document becomes visible again
  -> callback resumes with clipped interval
  -> visual state may update and render immediately
  -> map may restart only if its retained RAF callback survives
  -> no frame proves all resumed revisions agree
```

## Missing visible-frame identity

```txt
DocumentGeneration
LifecycleRevision
ResumeRevision
ClockRevision
SimulationRevision
WorldGenerationRevision
CameraRevision
MapRevision
RendererGeneration
VisibleFrameRevision
FirstResumedFrameAck
```

## Required frame contract

A resumed frame is admissible only when:

```txt
lifecycle outcome is resumed
held input cancellation is settled
host clock was rebased
simulation and Air Mail policy is accepted
world-generation scheduler is in the accepted state
camera and map revisions belong to the resumed generation
renderer and viewport identity are valid
no pre-suspension callback contributes state
```

## Required acknowledgement

```txt
FirstResumedFrameAck
  documentGeneration
  lifecycleRevision
  resumeRevision
  clockRevision
  simulationRevision
  worldGenerationRevision
  mapRevision
  rendererGeneration
  visibleFrameRevision
  presentedAt
```

## Failure projection

If BFCache restoration or resource revalidation fails, the product must project an actionable fallback outside the resumed WebGL frame rather than silently continuing stale callbacks.

## Validation boundary

No browser was backgrounded, frozen or restored. No first-resumed-frame behavior is claimed.