# Known Gaps: TheOpenAbove Camera Capture Zoom Projection

**Last aligned:** `2026-07-16T20-40-58-04-00`  
**Status:** `camera-capture-zoom-projection-authority-audited`

## Summary

Sightseeing optical zoom and balloon follow-distance zoom have separate listeners, state and camera writes. The current recognition score cannot prove that its private zoom value matches the projection rendered to the player.

## Intent

Keep camera and scoring claims provisional until one mode-aware authority publishes the committed projection and matching frame evidence.

## What needs to happen

### Input and identity gaps

```txt
ZoomIntentId: absent
CameraModeRevision: absent
ZoomPolicyRevision: absent
wheel deltaMode normalization: absent
trackpad burst policy: absent
stale intent rejection: absent
```

### Ownership gaps

```txt
global follow-zoom listener: present
renderer-canvas optical-zoom listener: present
one event can reach both owners: yes
single active owner result: absent
mode transition settlement: absent
map/route retirement result: absent
```

### Camera and render gaps

```txt
direct FOV write from Image Capture: present
FOV overwrite from Camera Rig: present
ordered pose/projection commit: absent
CameraProjectionRevision: absent
actual FOV/effective magnification result: absent
FirstZoomBoundFrameAck: absent
```

### Score gaps

```txt
capture private zoom scalar: present
score reads private scalar: yes
score reads committed camera projection: no
projection revision stored in capture: no
score/projection mismatch rejection: no
```

### Proof gaps

```txt
single-owner browser fixture: absent
pixel/line/page wheel equivalence: absent
trackpad momentum fixture: absent
mode-toggle fixture: absent
resize/DPR projection fixture: absent
source/build/Pages parity fixture: absent
```

## Current risk boundary

The source proves independent wheel listeners and camera writes. It does not prove how severe the visual mismatch is on every browser or device, and no specific player report was reproduced.

## Retained product gaps

Rendered-photo artifacts, validation severity, weather simulation-clock ownership, page lifecycle, WebGL recovery, audio, control coverage, fixed-step pacing, HDR/depth coherence, cloud proof, provider/build identity, route retirement, terrain/flora proof and persistence remain unresolved.

## Do not claim

Do not claim correct sightseeing magnification, exclusive wheel ownership, score/projection convergence, artifact parity, Pages parity or production readiness until implementation and fixtures exist.