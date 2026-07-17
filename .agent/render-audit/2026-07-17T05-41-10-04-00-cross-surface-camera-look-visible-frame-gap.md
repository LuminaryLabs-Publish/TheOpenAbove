# Render Audit: Cross-Surface Camera-Look Visible-Frame Gap

**Timestamp:** `2026-07-17T05-41-10-04-00`

## Current render path

```txt
accepted global pointer delta
  -> mutate lookYaw / lookPitch
  -> derive viewForward / viewSide from flight heading
  -> calculate third-person and basket-view pose
  -> lerp camera position and target
  -> update FOV and projection matrix
  -> Visual updates environment and post effects
  -> HDR Composer presents the frame
```

## Gap

The renderer receives the latest mutable camera-rig state, but there is no immutable camera-look pose result or frame digest proving which gesture, surface, route, heading revision, yaw, pitch, and recenter phase produced the frame.

The open map is a separate visible pointer surface. Because the camera listener is global, a map drag can change camera state while the map covers the scene. On map close, the next visible flight frame can reflect those hidden deltas without a route transition result or frame acknowledgement.

```txt
camera pose update: present
projection-matrix update: present
map overlay render surface: present
matching pointerId check: present

render-surface admission result: absent
map-suppression result: absent
CameraLookPoseRevision: absent
CameraLookFrameDigest: absent
hidden-map delta rejection: absent
FirstCameraLookFrameAck: absent
```

## Required frame contract

```txt
CameraLookPoseResult {
  hostSessionId
  routeRevision
  mapStateRevision
  cameraRigGeneration
  gestureId | null
  poseRevision
  headingRevision
  yaw
  pitch
  recenterPhase
  sourceSurfaceId
}

CameraLookProjectionResult {
  poseRevision
  cameraPosition
  cameraTarget
  fov
  projectionRevision
  frameDigest
}

FirstCameraLookFrameAck {
  frameId
  poseRevision
  projectionRevision
  frameDigest
}
```

## Render rules

- Consume only the latest accepted pose result for the active Experience generation.
- Reject pose results admitted from map, error, hidden, retired, or stale surfaces.
- Keep the last accepted flight-camera pose while map interaction is active.
- Resume from an explicitly settled map-close generation.
- Expose yaw, pitch, drag state, recenter age, gesture ID, and pose revision in `cameraSnapshot()`.
- Publish the first frame acknowledgement after the corresponding projection is rendered.

## Proof fixtures

```txt
main canvas drag -> exact yaw/pitch pose and matching frame digest
map canvas drag -> no camera pose revision
map close -> no hidden delta jump
capture loss -> terminal settlement before next frame
replacement bind -> only new rig generation can publish a frame
five-second idle -> recenter begins from simulation-clock evidence
```

No visible map-close jump was reproduced. This audit records a source-backed frame-correlation gap.