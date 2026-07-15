# Gameplay Audit: Flight to HDR Frame Size-Coherence Loop

**Timestamp:** `2026-07-15T07-39-52-04-00`

## Summary

Gameplay truth is independent from the resize gap, but every visible balloon, terrain, airstream, mail, vegetation, map, and weather result ultimately passes through the HDR color/depth target pair. A render-surface mismatch can therefore affect evidence for otherwise accepted gameplay state without changing simulation truth.

## Plan ledger

**Goal:** preserve simulation ownership while making the presentation frame that proves accepted gameplay state cite one coherent render-surface generation.

- [x] Trace gameplay state into the visual domain.
- [x] Separate simulation truth from HDR attachment ownership.
- [x] Identify the missing frame correlation.
- [ ] Add gameplay-to-render revision binding and browser proof.

## Interaction loop

```txt
keyboard and map input
  -> balloon simulation updates position velocity burner and contact
  -> airstream domain samples force and updates visuals
  -> Air Mail evaluates parcel route town and completion state
  -> Core World advances generation and terrain sampling
  -> balloon presentation camera weather terrain grass flowers water and lens update
  -> snapshot and telemetry expose accepted state
  -> cloud pass renders from current drawing buffer
  -> HDR composer projects the world through color and depth attachments
  -> color grade presents the visible frame
```

## Ownership boundary

```txt
simulation truth owner:
  balloon simulation airstream Air Mail Core World and telemetry

presentation state owners:
  balloon presentation camera visual world atmosphere and map

render-surface owner today:
  split across dynamic resolution visual domain EffectComposer and HDR helper

missing correlation:
  accepted gameplay revision
    -> accepted RenderSurfaceGeneration
    -> first visible HDR frame
```

## Source-permitted evidence gap

```txt
accepted balloon and world state exists
  -> visual update produces scene transforms and uniforms
  -> HDR color and depth attachments may follow different size rules
  -> no RenderSurfaceResizeResult is published
  -> no frame acknowledgement cites gameplay and attachment generations
  -> visible evidence cannot prove which coherent render surface projected the state
```

This does not invalidate gameplay truth. It limits the reliability of visual proof around resize, DPR, quality, and dynamic-scale transitions.

## Required receipts

```txt
GameplayPresentationRevision
RenderSurfaceGeneration
CloudTargetGeneration
HdrFrameId
RenderSurfaceResizeResult
FirstHdrResizeFrameAck
GameplayVisualConvergenceAck
```

## Required fixture cases

```txt
steady flight while dynamic scale changes
map open and close during browser resize
balloon near terrain during orientation change
mail eligibility frame during DPR transition
world generation completion during resize
cloud target and HDR target generation correlation
```

## Validation boundary

No gameplay defect or visible failure was reproduced. Runtime behavior was not changed.