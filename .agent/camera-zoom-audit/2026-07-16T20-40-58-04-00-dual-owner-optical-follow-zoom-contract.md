# Camera Zoom Audit: Dual-Owner Optical and Follow-Zoom Contract

**Timestamp:** `2026-07-16T20-40-58-04-00`

## Current ownership

| State | Intended wheel meaning | Current mutations |
|---|---|---|
| Normal flight | change follow distance / approach basket view | Camera Rig changes follow distance |
| Sightseeing mode | change optical magnification for framing | Image Capture changes private zoom and FOV; Camera Rig also changes follow distance |
| Map open | no active flight/capture zoom unless explicitly allowed | listeners remain independently active |

## Required contract

### Mode authority

`CameraModeRevision` is the authority for which zoom policy may accept a wheel intent.

```txt
flight mode       -> follow-distance owner
sightseeing mode  -> optical-projection owner
map/retired state -> reject or explicitly defer
```

### Optical zoom

- Own target FOV or focal-length equivalent.
- Clamp through one versioned policy.
- Preserve camera position unless the policy explicitly composes a dolly.
- Publish effective magnification after projection commit.

### Follow zoom

- Own distance from the balloon and basket-view transition.
- Remain independent from optical FOV.
- Publish accepted distance and mode transition result.

### Projection commit

- Experience performs one final camera commit per frame.
- Camera Rig contributes pose and follow-distance descriptors.
- Image Capture contributes an optical request, not a direct shared-camera write.
- The commit result contains the actual FOV and projection revision.

### Scoring

- Recognition consumes effective magnification from `CameraProjectionResult`.
- A capture record stores the projection revision used for scoring.
- A mismatch rejects scoring rather than silently using a private scalar.

## Proposed surfaces: 19

```txt
1  open-above-sightseeing-camera-zoom-projection-authority-domain
2  camera-zoom-intent-admission-kit
3  wheel-delta-normalization-kit
4  camera-mode-revision-kit
5  camera-zoom-owner-arbitration-kit
6  flight-follow-distance-zoom-kit
7  sightseeing-optical-zoom-kit
8  camera-projection-policy-kit
9  camera-projection-commit-kit
10 camera-position-look-descriptor-kit
11 capture-zoom-readback-kit
12 photo-zoom-evidence-kit
13 stale-zoom-intent-rejection-kit
14 map-route-zoom-settlement-kit
15 camera-zoom-intent-result-kit
16 camera-zoom-arbitration-result-kit
17 camera-projection-result-kit
18 first-zoom-bound-frame-ack-kit
19 camera-zoom-parity-fixture-kit
```

## Non-goals

Do not replace balloon simulation, steering, world generation, weather, camera smoothing or the sightseeing recognition target. This authority only clarifies input, camera and score ownership.