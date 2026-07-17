# Camera Input Audit: Pointer Owner, Surface, and Retirement Contract

**Timestamp:** `2026-07-17T05-41-10-04-00`

## Contract goal

Exactly one active Camera Rig generation may own one primary pointer-look gesture on the admitted flight render surface. Every gesture must settle exactly once before map control, route retirement, replacement, or disposal.

## Admission contract

```txt
require active HostSessionId
require active Journey RouteRevision
require active Experience/CameraRigGeneration
require sourceSurfaceId == main-game-canvas
require Navigation map state == closed
require document visible and focused
require primary button and no active owner
allocate GestureId
acquire CaptureLeaseRevision
publish CameraLookGestureAdmissionResult
```

## Delta contract

```txt
require matching GestureId
require matching PointerId
require matching CaptureLeaseRevision
require matching viewport and DPR revision
normalize client delta
apply sensitivity and yaw/pitch limits
publish CameraLookDeltaResult
publish CameraLookPoseRevision
```

## Settlement contract

Terminal events:

```txt
pointerup
pointercancel
lostpointercapture
window blur
document hidden
map open
route retirement
camera rig replacement
Experience disposal
WebGL recovery generation replacement
```

Rules:

- Settle only the matching active gesture.
- Release only the matching capture lease.
- Ignore duplicate terminal evidence after settlement.
- Remove every listener using retained function identity.
- Retire the prior Camera Rig before `bindBalloon()` installs a replacement.
- Clear pending deltas before a new gesture is admitted.
- Preserve the last accepted pose unless a valid recenter command advances it.

## Recenter contract

```txt
start time: last accepted delta or terminal settlement
clock: accepted simulation/presentation clock, not arbitrary wall-time
basis: current accepted flight heading revision
delay: 5 seconds
curve: configured recenter rate
terminal state: yaw = 0, pitch = 0 relative to heading
```

## Current deviations

```txt
global source admission: present
surface check: absent
map suppression: absent
lostpointercapture handler: absent
anonymous blur listener: present
blur listener disposal: absent
replacement retirement: absent
capture release result: absent
gesture generation: absent
pose/frame result: absent
```

## Recommended integration cut

```txt
src/domains/experience/camera-input/
  camera-pointer-look-gesture-admission-retirement-authority-domain.js
  camera-look-surface-admission-kit.js
  camera-look-pointer-owner-kit.js
  camera-look-capture-lease-kit.js
  camera-look-settlement-kit.js
  camera-look-recenter-clock-kit.js
  camera-look-pose-result-kit.js

src/visual/camera-presentation/
  balloon-camera-rig-kit.js          # consume accepted commands/results
  camera-look-projection-commit-kit.js
```

## Required tests

- Main canvas admits exactly one pointer owner.
- Map and error surfaces reject camera look.
- Multi-pointer evidence cannot replace the active owner.
- Capture loss settles once.
- Anonymous listeners do not survive disposal.
- Rebinding retires the previous generation before installing listeners.
- Recenter begins at the accepted five-second boundary.
- The rendered frame digest matches the accepted pose revision.