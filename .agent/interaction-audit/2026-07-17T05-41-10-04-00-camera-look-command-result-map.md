# Interaction Audit: Camera-Look Command and Result Map

**Timestamp:** `2026-07-17T05-41-10-04-00`

## Current event map

```txt
window pointerdown(primary)
  -> pointerId = event.pointerId
  -> last client coordinates
  -> dragging = true
  -> event.target.setPointerCapture(pointerId)

window pointermove(matching pointerId)
  -> delta from previous client coordinates
  -> mutate lookYaw / lookPitch
  -> reset idle timer

window pointerup / pointercancel(matching pointerId)
  -> dragging = false
  -> pointerId = null
  -> reset idle timer

window blur
  -> dragging = false
  -> pointerId = null
```

## Missing classification

```txt
source surface classification: absent
route/map admission: absent
session and rig generation: absent
existing owner conflict result: absent
capture acquisition result: absent
capture release result: absent
lostpointercapture event: absent
visibilitychange settlement: absent
disposal/replacement settlement result: absent
normalized delta result: absent
pose revision/result: absent
matching-frame acknowledgement: absent
```

## Proposed command map

### `CameraLookGestureAdmissionCommand`

Inputs:

```txt
hostSessionId
routeRevision
mapStateRevision
cameraRigGeneration
surfaceId
pointerId
pointerType
button
viewportRevision
```

Results:

```txt
accepted
reason
GestureId
CaptureLeaseRevision
ownerPointerId
sourceSurfaceId
```

### `CameraLookDeltaCommand`

Inputs:

```txt
GestureId
CaptureLeaseRevision
pointerId
clientDelta
viewportRevision
DPR revision
```

Results:

```txt
accepted
normalizedDelta
lookYaw
lookPitch
CameraLookPoseRevision
```

### `CameraLookGestureSettlementCommand`

Reasons:

```txt
pointerup
pointercancel
lostpointercapture
blur
hidden
map-open
route-retired
rig-replaced
disposed
```

Results:

```txt
accepted terminal reason
released capture lease
retired gesture ID
settlement revision
```

### `CameraLookRecenterCommand`

Inputs:

```txt
last accepted input/settlement revision
simulation clock
heading revision
recenter delay and rate
```

Results:

```txt
recenter phase
lookYaw
lookPitch
CameraLookPoseResult
```

### `CameraLookProjectionCommitCommand`

Results:

```txt
camera position and target
FOV/projection revision
CameraLookFrameDigest
FirstCameraLookFrameAck
```

## Rejection reasons

```txt
wrong-surface
map-active
error-surface
hidden-document
stale-session
stale-route
stale-rig-generation
secondary-pointer
non-primary-button
owner-conflict
capture-lost
retired-gesture
disposed
```

## Public diagnostics

`cameraSnapshot()` should expose only bounded, non-sensitive state:

```txt
mode
zoom
firstPersonBlend
lookYaw
lookPitch
dragging
gestureId
sourceSurfaceId
recenterPhase
poseRevision
projectionRevision
lastSettlementReason
```

Raw DOM nodes and event objects should not enter domain snapshots.