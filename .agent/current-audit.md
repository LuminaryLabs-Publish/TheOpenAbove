# Current Audit: TheOpenAbove Camera Pointer-Look Gesture Admission and Retirement

**Last aligned:** `2026-07-17T05-41-10-04-00`  
**Status:** `camera-pointer-look-gesture-admission-retirement-authority-audited`  
**Previous repo-local documentation head:** `d5c194c6b5da7b1ba15f6ba811cdbb1031cc22a9`  
**Reviewed pre-audit repository head:** `5611624ff8b59ff40e3a2e12d0d837e91b56f68d`

## Summary

The active Meadow Lift scene retains Journey, Ballooning, Sky, Land, Navigation, Image Capture, and Experience. The new Balloon Camera Rig behavior adds immediate drag yaw/pitch and a five-second delayed recenter toward the current wind-relative flight heading.

The focused gap is gesture admission and retirement. Camera input listeners are global, so map and other route surfaces can enter camera state. Capture loss, anonymous blur-listener disposal, replacement binding, accepted pose diagnostics, and matching-frame proof are incomplete.

## Intent

Make one admitted flight-canvas gesture authoritative for camera look while preserving immediate turning and delayed heading recenter.

## What needs to happen

```txt
CameraLookGestureAdmissionCommand
  -> bind session, route, map, rig, surface, pointer, and capture revisions
  -> CameraLookGestureAdmissionResult

CameraLookDeltaCommand
  -> require matching gesture, pointer, surface, and lease
  -> CameraLookDeltaResult / CameraLookPoseRevision

CameraLookGestureSettlementCommand
  -> settle up, cancel, lost capture, blur, hidden, map-open,
     route retirement, replacement, and disposal exactly once
  -> CameraLookGestureSettlementResult

CameraLookRecenterCommand
  -> bind simulation clock and heading revision
  -> CameraLookPoseResult

CameraLookProjectionCommitCommand
  -> CameraLookFrameDigest
  -> FirstCameraLookFrameAck
```

## Interaction loop

```txt
boot
  -> Experience creates Visual on #game
  -> bindBalloon creates Camera Rig
  -> Camera Rig installs global wheel/pointer/blur listeners

flight input
  -> primary pointerdown anywhere becomes the owner
  -> matching pointermove mutates lookYaw/lookPitch
  -> up/cancel clears the owner
  -> after five idle seconds yaw/pitch return toward heading
  -> camera position, target, FOV, and projection update
  -> Visual renders the frame

map/lifecycle boundary
  -> map overlay becomes pointer-interactive
  -> global camera input remains active
  -> lostpointercapture is not handled
  -> anonymous blur listener is not removed by dispose
  -> repeated bindBalloon does not retire the prior rig first
```

## Domains in use

```txt
Journey: session, map policy, RAF, failure containment, snapshots, disposal
Ballooning: flight simulation, steering-relative heading, terrain contact, pose
Sky: airstreams, Weather readback, wind particles, deterministic cloud field
Land: Core World configuration, features, foundation, terrain readback
Navigation: map lifecycle, routes, Snap Points, reference cards
Image Capture: sightseeing mode, shutter, recognition, score
Experience: renderer, Camera Rig, visual update/render, snapshots, disposal
Camera presentation: zoom, drag look, recenter, clipping fade, projection
Core World: Foundation, Features, Landforms, Atmosphere descriptors
Weather: base and semantic layered weather advancement/snapshots
Cloud presentation: Gaussian close layers and volumetric distant layers
Build/deploy: tiered validation, Vite artifact, GitHub Pages
```

## Current finding

```txt
matching pointerId enforcement: present
primary-button check: present
immediate yaw/pitch response: present
yaw/pitch clamps: present
five-second delayed recenter: present
heading-relative basis: present
pointercancel settlement: present

main-canvas-only admission: absent
map-overlay suppression: absent
HostSessionId/RouteRevision binding: absent
CameraRigGeneration/GestureId: absent
lostpointercapture settlement: absent
capture release result: absent
anonymous blur listener disposal: absent
prior-rig replacement retirement: absent
look pose in cameraSnapshot: absent
CameraLookFrameDigest: absent
FirstCameraLookFrameAck: absent
```

No specific map-drag camera incident or lifecycle leak was reproduced.

## Inventory

The complete 125-surface kit/provider/adapter inventory and all offered services are recorded in:

```txt
.agent/trackers/2026-07-17T05-41-10-04-00/project-breakdown.md
```

## Required parent domain

`open-above-camera-pointer-look-gesture-admission-retirement-authority-domain`

## Boundary

Documentation only. Runtime, rendering, gameplay, tests, build, and deployment were not changed.