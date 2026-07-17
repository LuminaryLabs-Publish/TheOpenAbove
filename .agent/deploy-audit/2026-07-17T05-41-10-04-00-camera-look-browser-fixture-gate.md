# Deploy Audit: Camera-Look Browser Fixture Gate

**Timestamp:** `2026-07-17T05-41-10-04-00`

## Goal

Block camera-look ownership claims until the source route, Vite artifact, and deployed Pages route prove identical surface admission, lifecycle settlement, recenter timing, and rendered-frame correlation.

## Required fixture matrix

| Fixture | Source | Artifact | Pages |
|---|---:|---:|---:|
| main canvas primary drag admitted | required | required | required |
| map canvas drag rejected | required | required | required |
| error panel drag rejected | required | required | required |
| secondary pointer cannot replace owner | required | required | required |
| pointercancel settles once | required | required | required |
| lostpointercapture settles once | required | required | required |
| blur and hidden document settle | required | required | required |
| map-open retires active camera gesture | required | required | required |
| rig replacement removes prior listeners | required | required | required |
| disposal leaves no active listeners | required | required | required |
| five-second recenter boundary | required | required | required |
| pose revision matches rendered frame digest | required | required | required |

## Evidence required per fixture

```txt
HostSessionId
RouteRevision
MapStateRevision
CameraRigGeneration
SurfaceId
GestureId
PointerId
CaptureLeaseRevision
CameraLookPoseRevision
CameraLookFrameDigest
terminal settlement reason
FirstCameraLookFrameAck
```

## Source test additions

```txt
tests/camera-look-surface-admission.mjs
tests/camera-look-pointer-ownership.mjs
tests/camera-look-capture-retirement.mjs
tests/camera-look-recenter-clock.mjs
tests/camera-look-frame-correlation.mjs
```

The source-contract tests must assert that every listener has a retained function identity and a matching removal path. Browser tests must use real Pointer Events and pointer capture rather than calling camera methods directly.

## Build and deployment gate

```txt
npm run check
npm run build
serve source route
serve dist artifact
run browser fixture matrix on both
fetch deployed Pages origin
run the same fixture matrix
compare pose/frame digests and runtime revision stamp
```

## Failure policy

- Any camera mutation from map or error surfaces is blocking.
- Any listener surviving disposal or replacement is blocking.
- Any unresolved capture-loss path is blocking.
- Any mismatch between accepted pose revision and rendered frame digest is blocking.
- A source-only pass does not establish artifact or Pages parity.

## Current validation state

No fixture in this matrix was executed during the documentation audit. Existing cloud integration coverage only guards the Gaussian fog-uniform regression and does not validate camera input behavior.