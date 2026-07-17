# Architecture Audit: Camera Pointer-Look Gesture DSK Map

**Timestamp:** `2026-07-17T05-41-10-04-00`

## Current ownership

```txt
index.html
  -> #game main render canvas
  -> #mapOverlay / #mapCanvas secondary interaction surface

Meadow Lift Scene
  -> Journey
  -> Ballooning
  -> Sky
  -> Land
  -> Navigation
  -> Image Capture
  -> Experience

Experience Domain
  -> Visual Domain
  -> Balloon Camera Rig Kit
  -> Balloon Presentation Domain

Balloon Camera Rig Kit
  -> global wheel listener
  -> global pointerdown/move/up/cancel listeners
  -> anonymous global blur listener
  -> pointerId and coordinate state
  -> lookYaw / lookPitch / recenter timer
  -> camera position/target/FOV/projection commit
```

## Implemented boundaries

| Surface | Current services |
|---|---|
| `open-above-balloon-simulation-kit` | heading, steering-relative wind, pose, elapsed simulation time |
| `open-above-balloon-camera-rig-kit` | zoom, pointer drag look, yaw/pitch limits, five-second recenter, camera commit, partial listener disposal |
| `open-above-experience-domain` | rig binding, update order, camera snapshot, render and disposal |
| `open-above-parchment-map-overlay-kit` | map-open route surface, map canvas and pointer-interactive overlay |
| `open-above-journey-domain` | map pause policy, session/route lifecycle and frame progression |
| `open-above-visual-domain` | camera consumption, frame update, rendering and disposal |

## Ownership gap

The Camera Rig owns input listeners, gesture state, pose calculation, and camera projection in one implementation object, but it does not receive the main canvas, Journey route state, Navigation map state, session identity, or a lifecycle generation. The global event target therefore admits pointer evidence before any domain can determine which surface or route owns it.

```txt
SurfaceId: absent
HostSessionId: absent
RouteRevision: absent
MapStateRevision: absent
CameraRigGeneration: absent
GestureId: absent
CaptureLeaseRevision: absent
CameraLookPoseRevision: absent
CameraLookFrameDigest: absent
FirstCameraLookFrameAck: absent
```

## Proposed parent domain

`open-above-camera-pointer-look-gesture-admission-retirement-authority-domain`

## Proposed child kits

```txt
admission
  camera-look-surface-admission-kit
  camera-look-gesture-id-kit
  camera-look-pointer-owner-kit
  camera-look-capture-lease-kit
  camera-look-route-revision-kit
  camera-look-session-revision-kit
  camera-look-map-suppression-kit

delta and pose
  camera-look-delta-normalization-kit
  camera-look-heading-basis-kit
  camera-look-recenter-clock-kit
  camera-look-pose-result-kit

retirement
  camera-look-focus-retirement-kit
  camera-look-capture-loss-settlement-kit
  camera-look-disposal-retirement-kit

presentation and proof
  camera-look-frame-digest-kit
  first-camera-look-frame-ack-kit
  camera-look-input-fixture-kit
  camera-look-map-overlay-fixture-kit
  camera-look-lifecycle-fixture-kit
```

## Required command flow

```txt
CameraLookGestureAdmissionCommand
  -> CameraLookGestureAdmissionResult

CameraLookDeltaCommand
  -> CameraLookDeltaResult
  -> CameraLookPoseRevision

CameraLookGestureSettlementCommand
  -> CameraLookGestureSettlementResult

CameraLookRecenterCommand
  -> CameraLookPoseResult

CameraLookProjectionCommitCommand
  -> CameraLookFrameDigest
  -> FirstCameraLookFrameAck
```

## Integration rule

Journey and Navigation publish route/map admission evidence. Experience passes the main canvas and lifecycle generation to the authority. The Camera Rig becomes a projection consumer rather than the global owner of raw browser evidence. Replacement binding must retire the previous rig and all listeners before admitting a new generation.