# Render Audit: Steering Simulation to Presentation Frame Gap

Timestamp: `2026-07-11T22-58-50-04-00`

## Summary

The rendered balloon reacts to steering through root rotation, part-level inertia and camera look, but the render path cannot prove that these consumers used one committed steering result. Simulation state is observable; presentation and camera acknowledgements are not.

## Current frame path

```txt
simulation.update(dt)
  -> steeringInput/lateralTrim/lateralAcceleration/visualBank/heading
simulation.applyToBalloon(balloon)
  -> balloon root position and rotation
animateHotAirBalloon(...)
  -> burner and rigging animation
balloonPresentation.update(state)
  -> envelope and gondola smoothing
cameraRig.update(dt, state)
  -> steeringLook and camera transforms
visual.update(...)
engine.tick(dt)
visual.render(...)
HUD update
```

## Observable state today

```txt
simulation snapshot:
  steeringInput
  lateralTrim
  visualBank
  heading

camera snapshot through host:
  mode
  zoom
  firstPersonBlend

missing from committed readback:
  lateralAcceleration
  root transform revision
  envelopeBank/envelopePitch
  gondolaBank/gondolaPitch/gondolaOffsetX
  steeringLook
  camera target/position acknowledgement
  steering result ID
  visible frame ID
```

## Failure modes

```txt
part presentation may lag a different number of frames than the camera
HUD can describe current trim before the corresponding frame is visible
reset can neutralize simulation while presentation/camera retain inertia
render failure has no steering-frame rollback or rejection result
headless readback cannot prove which steering response reached the screen
```

## Required render receipt

```txt
SteeringVisibleFrameReceipt {
  runtimeSessionId
  missionEpoch
  simulationTickId
  steeringResultId
  rootTransformRevision
  presentationRevision
  cameraRevision
  renderFrameId
  backend
  accepted
  rejectionReason
}
```

## Required proof

```txt
left/right/neutral input sequences
  -> deterministic simulation result
  -> bounded root transform
  -> bounded envelope/gondola response
  -> bounded camera response
  -> one correlated visible frame

reset/blur
  -> all visible response owners converge to neutral
  -> old result cannot reappear

render failure
  -> no false visible-frame acknowledgement
```

## Validation boundary

Documentation only. No renderer, material, camera, simulation, package or workflow code changed. Browser and Pages frame-correlation fixtures do not yet exist.
