# Interaction Audit: Camera Zoom Command and Result Map

**Timestamp:** `2026-07-16T20-40-58-04-00`

## Current evidence map

```txt
WheelEvent
  -> renderer canvas listener
       -> preventDefault
       -> capture zoom scalar
       -> direct camera FOV write

  -> event propagation
       -> window listener
       -> camera-rig follow-distance value

frame update
  -> camera-rig position/look/FOV write
  -> image-capture score from private zoom
  -> render
```

## Missing identities

```txt
ZoomIntentId: absent
CameraModeRevision: absent
ZoomPolicyRevision: absent
CameraProjectionRevision: absent
FrameId bound to zoom: absent
terminal zoom result: absent
```

## Required command/result map

```txt
CameraZoomIntentCommand
  inputs:
    event delta and unit
    route/session revision
    camera mode revision
    viewport revision
  result:
    accepted owner
    normalized magnitude
    intent identity

CameraZoomArbitrationCommand
  inputs:
    accepted intent
    sightseeing state
    follow-camera policy
  result:
    optical-only, follow-only, combined-policy or rejected

CameraProjectionCommitCommand
  inputs:
    camera-rig pose descriptor
    optical projection descriptor
  result:
    actual FOV
    projection matrix revision
    follow distance
    effective magnification

PhotoZoomEvidenceCommand
  inputs:
    accepted capture request
    CameraProjectionResult
  result:
    score evidence bound to the same projection

FirstZoomBoundFrameAck
  inputs:
    render frame and projection revision
  result:
    visible convergence or explicit rejection
```

## Settlement rules

- One wheel event produces at most one accepted zoom mutation.
- Mode change settles or rejects outstanding intents.
- Map open, route retirement and disposal reject stale intents.
- Capture scoring cannot read an uncommitted private zoom value.
- Duplicate browser events do not duplicate state transitions.

## Boundary

This audit defines interfaces only. No browser listeners or camera code were changed.