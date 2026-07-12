# Render Audit: Partial Frame and Last-Known-Good Correlation Gap

**Timestamp:** `2026-07-12T04:00:32-04:00`

## Current ordering

```txt
simulation and mission mutation
  -> balloon and presentation mutation
  -> camera mutation
  -> visual-state mutation
  -> telemetry mutation
  -> visual.render
  -> HUD mutation
  -> schedule next RAF
```

## Gap

The render call is not the commit boundary for the whole user-visible frame. A failure before render can leave live state newer than the canvas. A failure after render but before HUD completion can leave the canvas newer than the HUD. No frame ID connects the rendered canvas, HUD projection, telemetry snapshot or public readback.

## Failure cases

```txt
visual.update throws
  canvas: previous frame
  HUD: previous frame
  simulation/mail/camera: potentially current partial frame

visual.render throws
  canvas: previous successful presentation or partial GPU work
  HUD: previous frame
  telemetry and live owners: current partial frame

updateHud throws
  canvas: current frame
  HUD: previous frame
  no successor RAF
```

## Missing render evidence

```txt
renderFrameId
frameStageId
renderAttemptId
renderResult
presentationResult
hudProjectionResult
lastKnownGoodFrameId
failureId
failedStageId
visibleFailureOverlayRevision
```

## Required render contract

```txt
prepare immutable frame input
  -> execute simulation/presentation stages
  -> submit render with frame identity
  -> obtain presentation result
  -> project HUD from the same committed observation
  -> acknowledge visible canvas and HUD
  -> advance last-known-good only after both succeed
```

On failure:

```txt
do not commit the failed frame
retain the previous committed observation
freeze or explicitly replace the canvas with a terminal surface
do not project uncommitted HUD state
publish failed stage and last-known-good frame identity
```

## Required proof

```txt
inject failure before render
  -> previous canvas/HUD/readback remain correlated
inject failure during render
  -> failed frame is never reported as committed
inject failure during HUD projection
  -> terminal surface identifies the last successfully correlated frame
context loss
  -> route through typed recoverable or terminal result
Pages smoke
  -> visible error state appears without silent freeze
```

Documentation only. No rendering behavior changed.