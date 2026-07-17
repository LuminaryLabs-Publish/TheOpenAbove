# Known Gaps: TheOpenAbove Camera Pointer-Look Gesture Admission and Retirement

**Last aligned:** `2026-07-17T05-41-10-04-00`  
**Status:** `camera-pointer-look-gesture-admission-retirement-authority-audited`

## Summary

Immediate pointer drag look and delayed heading recentering are implemented. Surface admission, lifecycle settlement, diagnostics, and exact frame proof are not.

## Intent

Keep camera-look correctness claims provisional until one authority binds pointer evidence to the active flight surface and publishes a terminal gesture result, accepted pose revision, projection digest, and matching frame acknowledgement.

## What needs to happen

### Admission gaps

```txt
primary button check: present
matching pointerId check: present
main #game canvas requirement: absent
map-overlay suppression: absent
error-surface suppression: absent
HostSessionId binding: absent
RouteRevision binding: absent
MapStateRevision binding: absent
CameraRigGeneration: absent
GestureId: absent
```

### Capture and owner gaps

```txt
event-target pointer capture request: present
CaptureLeaseRevision: absent
capture acquisition result: absent
explicit capture release: absent
lostpointercapture handler: absent
owner conflict result: absent
stale delta rejection: absent
```

### Lifecycle gaps

```txt
pointerup settlement: present
pointercancel settlement: present
blur state clear: present
named blur listener identity: absent
blur listener removal on dispose: absent
visibilitychange settlement: absent
map-open settlement: absent
route-retirement settlement: absent
rig-replacement settlement: absent
idempotent terminal result: absent
```

### Pose and recenter gaps

```txt
lookYaw/lookPitch state: present
yaw/pitch clamps: present
five-second recenter delay: present
heading-relative basis: present
simulation-clock admission result: absent
heading revision binding: absent
CameraLookPoseRevision: absent
CameraLookPoseResult: absent
```

### Render and diagnostics gaps

```txt
camera position/target commit: present
FOV/projection update: present
cameraSnapshot zoom/mode/blend: present
cameraSnapshot look/gesture/recenter state: absent
CameraLookFrameDigest: absent
FirstCameraLookFrameAck: absent
map-hidden delta rejection proof: absent
```

### Proof gaps

```txt
main-canvas real Pointer Event fixture: absent
map-canvas rejection fixture: absent
multi-pointer owner fixture: absent
lostpointercapture fixture: absent
blur/hidden fixture: absent
replacement/disposal listener fixture: absent
five-second recenter boundary fixture: absent
pose-to-render-frame correlation fixture: absent
source/build/Pages parity: absent
```

## Current risk boundary

Source inspection proves that all primary pointerdown events are admitted globally and that the map overlay becomes pointer-interactive. It also proves that the anonymous blur listener is not removed by `dispose()` and that no capture-loss or frame acknowledgement exists. It does not prove the severity or frequency of a player-visible failure.

## Retained product gaps

Gaussian cloud membership stability, camera zoom ownership, rendered-photo artifacts, validation severity, weather simulation-clock ownership, page lifecycle, WebGL recovery, audio, control coverage, fixed-step pacing, HDR/depth coherence, provider/build identity, route retirement, terrain/flora proof, and persistence remain unresolved.

## Do not claim

Do not claim render-surface input isolation, complete gesture settlement, leak-free camera-rig replacement, exact camera-pose frame convergence, artifact parity, Pages parity, or production readiness until implementation and fixtures exist.