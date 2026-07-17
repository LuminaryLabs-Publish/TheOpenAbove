# Next Steps: TheOpenAbove Camera Pointer-Look Gesture Admission and Retirement

**Last aligned:** `2026-07-17T05-41-10-04-00`  
**Status:** `camera-pointer-look-gesture-admission-retirement-authority-audited`

## Summary

Keep immediate drag look, yaw/pitch clamps, and five-second heading recentering. Move raw Pointer Events behind explicit render-surface admission and complete every gesture lifecycle before expanding camera behavior.

## Intent

Produce one deterministic path from admitted pointer evidence to camera pose, projection, diagnostics, and a matching frame acknowledgement.

## What needs to happen

### Gate 1: Surface and session admission

- [ ] Pass the main `#game` canvas into the camera-input authority.
- [ ] Bind `HostSessionId`, `RouteRevision`, `MapStateRevision`, and `CameraRigGeneration`.
- [ ] Admit primary pointer look only from the active flight canvas.
- [ ] Reject map, error, hidden, retired, and stale surfaces.
- [ ] Publish `CameraLookGestureAdmissionResult`.

### Gate 2: Pointer owner and capture lease

- [ ] Allocate `GestureId` and `CaptureLeaseRevision`.
- [ ] Preserve one owner pointer until terminal settlement.
- [ ] Record capture acquisition and explicit release results.
- [ ] Reject owner replacement and stale deltas.

### Gate 3: Delta and pose

- [ ] Normalize deltas against viewport and DPR policy.
- [ ] Preserve current sensitivity and yaw/pitch clamps.
- [ ] Publish `CameraLookDeltaResult` and `CameraLookPoseRevision`.
- [ ] Keep raw DOM event objects outside domain state.

### Gate 4: Complete settlement

- [ ] Handle `pointerup`, `pointercancel`, and `lostpointercapture`.
- [ ] Handle blur, hidden document, map open, route retirement, replacement, and disposal.
- [ ] Retain named listener functions so every listener is removable.
- [ ] Retire the previous Camera Rig before `bindBalloon()` installs another.
- [ ] Publish one idempotent `CameraLookGestureSettlementResult`.

### Gate 5: Recenter authority

- [ ] Bind the last accepted input/settlement revision to the simulation clock.
- [ ] Preserve the configured five-second delay and recenter rate.
- [ ] Bind the current accepted heading revision.
- [ ] Publish `CameraLookPoseResult` for drag and recenter phases.

### Gate 6: Projection and diagnostics

- [ ] Commit camera position, target, FOV, and projection from one pose result.
- [ ] Add yaw, pitch, gesture, recenter, pose, and projection state to `cameraSnapshot()`.
- [ ] Publish `CameraLookFrameDigest` and `FirstCameraLookFrameAck`.

### Gate 7: Fixtures

- [ ] Verify main-canvas drag at mouse, pen, and touch pointer types.
- [ ] Verify map/error interactions do not mutate camera state.
- [ ] Verify multi-pointer owner stability.
- [ ] Verify capture loss, blur, hidden, map-open, replacement, and disposal.
- [ ] Verify 4.9-second and 5.1-second recenter boundaries.
- [ ] Verify source, Vite artifact, and Pages parity.

## Recommended file cut

```txt
src/domains/experience/camera-input/
  camera-pointer-look-gesture-admission-retirement-authority-domain.js
  camera-look-surface-admission-kit.js
  camera-look-pointer-owner-kit.js
  camera-look-capture-lease-kit.js
  camera-look-delta-normalization-kit.js
  camera-look-settlement-kit.js
  camera-look-recenter-clock-kit.js
  camera-look-pose-result-kit.js

src/visual/camera-presentation/
  balloon-camera-rig-kit.js
  camera-look-projection-commit-kit.js

tests/
  camera-look-surface-admission.mjs
  camera-look-pointer-ownership.mjs
  camera-look-lifecycle.mjs
  camera-look-recenter-clock.mjs
  camera-look-frame-correlation.mjs
```

## Compatibility constraints

Preserve current steering-relative heading, immediate drag response, yaw/pitch limits, five-second delay, recenter curve, follow-distance zoom, basket/third-person blend, map presentation, sightseeing capture, cloud rendering, and Pages deployment.

## Retained next steps

Gaussian cloud membership stability, camera zoom projection, rendered-photo artifacts, validation severity, weather-clock ownership, page lifecycle, WebGL recovery, audio, fixed-step pacing, HDR/depth, provider identity, terrain/flora proof, and persistence remain open.

## Do not claim

Do not claim cross-surface input isolation, complete gesture retirement, listener replacement safety, exact pose/frame convergence, source/build/Pages parity, or production readiness until implementation and fixtures exist.