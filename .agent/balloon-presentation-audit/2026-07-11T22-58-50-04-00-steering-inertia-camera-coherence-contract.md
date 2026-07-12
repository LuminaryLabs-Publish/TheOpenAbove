# Balloon Presentation Audit: Steering, Inertia and Camera Coherence Contract

Timestamp: `2026-07-11T22-58-50-04-00`

## Summary

The balloon now has separate envelope and gondola pivots plus steering-reactive camera look. These additions improve motion hierarchy, but their state is locally smoothed and uncorrelated with a committed simulation result, reset epoch or visible-frame receipt.

## Current presentation layers

```txt
balloon root
  heading from adjusted wind
  small root bank from visualBank

envelope pivot
  bank from visualBank and lateralAcceleration
  pitch from vertical velocity and slow sway
  small heat-linked scale change

gondola pivot
  stronger bank from visualBank and lateralTrim
  pitch from vertical velocity and slow sway
  lateral offset from trim
  heat-linked vertical offset

camera
  steeringLook from steeringInput
  third-person target/position lateral offset
  basket-view look lateral offset
```

## Coherence gaps

```txt
no shared steeringResultId
no presentation revision
no camera response revision
no explicit neutral pose receipt
no reset/epoch ownership
no stale-state rejection
no snapshot of envelope/gondola response
no visible-frame acknowledgement
```

## Profile and assembly finding

The new `open-above-balloon-envelope-profile-kit` centralizes radius, point, normal, mouth and top-height sampling and must be treated as an active kit. The integrated color-pattern kit currently creates pattern metadata, but the object assembly calls `buildEnvelopePanels(profile.panels)` without passing that pattern metadata into the shell color resolver. This is a configuration handoff gap, not a reason to reintroduce separate surface panels.

## Required coherence state

```txt
BalloonSteeringPresentationResult {
  steeringResultId
  simulationTickId
  missionEpoch
  rootTransform
  envelopeTransform
  gondolaTransform
  cameraPosition
  cameraTarget
  cameraMode
  neutralConvergence
  revision
}
```

## Required invariants

```txt
envelope responds more slowly and less strongly than gondola
gondola response remains bounded and comfortable
camera look follows steering without doubling root bank
burner/vertical response remains orthogonal to lateral steering
neutral input converges all presentation layers
reset immediately fences predecessor presentation revisions
profile/pattern configuration is handed to the unified shell once
```

## Required tests

```txt
step response and release curve
left-right reversal
vertical movement while steering
burner change while steering
third-person/basket-view transition while steering
reset during maximum trim
profile/pattern assembly fingerprint
visible-frame transform readback
```
