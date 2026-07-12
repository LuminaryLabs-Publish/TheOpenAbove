# Architecture Audit: Balloon Steering and Presentation DSK Map

Timestamp: `2026-07-11T22-58-50-04-00`

## Summary

Cross-current steering now spans several independent state owners. The simulation owns trim and heading, the balloon root owns world transform, the presentation domain owns envelope/gondola inertia, the camera rig owns steering look, and the host owns HUD/readback. No composed domain commits these results as one steering frame.

## Current ownership map

```txt
balloon-simulation-kit
  keys
  steeringInput
  lateralTrim
  lateralAcceleration
  visualBank
  heading
  wind/velocity/position

hot-air-balloon-object-kit
  root object and part pivots

balloon-presentation-domain
  envelopeBank/envelopePitch
  gondolaBank/gondolaPitch/gondolaOffsetX

balloon-camera-rig-kit
  steeringLook
  camera position/target
  firstPersonBlend/mode

main host
  update order
  HUD
  telemetry tick
  render
  GameHost snapshot
```

## Missing boundary

```txt
inputSampleId
inputSequence
simulationTickId
steeringPolicyId/version
steeringResultId
rootTransformRevision
partPresentationRevision
cameraResponseRevision
HUD/readback acknowledgement
visibleFrameId
resetEpoch
```

## Required composed domain

```txt
open-above-balloon-steering-presentation-authority-domain
  -> steering-input-sample-kit
  -> steering-input-sequence-kit
  -> steering-policy-descriptor-kit
  -> steering-admission-kit
  -> steering-simulation-result-kit
  -> balloon-root-transform-result-kit
  -> balloon-part-presentation-result-kit
  -> camera-steering-result-kit
  -> steering-hud-projection-kit
  -> steering-observation-frame-kit
  -> steering-frame-commit-kit
  -> stale-steering-result-rejection-kit
  -> steering-reset-transaction-kit
  -> steering-journal-kit
  -> steering-response-fixture-kit
  -> steering-visible-frame-smoke-kit
```

## Target transaction

```txt
sequenced input sample
  -> lifecycle/tick admission
  -> steering policy evaluation
  -> simulation result
  -> root transform plan
  -> envelope/gondola presentation plan
  -> camera response plan
  -> atomic steering-frame commit
  -> HUD/telemetry/GameHost acknowledgement
  -> render
  -> visible-frame receipt
```

## Invariants

```txt
one admitted input sample advances steering once
all visible consumers reference one steering result
neutral input converges to a bounded neutral state
blur/pause/reset retire held input and prior smoothing state
stale results mutate nothing
readback includes simulation, part and camera acknowledgements
first visible frame references the committed steering result
```

## Dependency order

```txt
runtime admission
  -> import purity/frame ownership
  -> session lifecycle
  -> fixed-step clock and input sequence
  -> mission restart epoch
  -> committed observation frame
  -> balloon steering/presentation authority
```
