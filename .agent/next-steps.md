# Next Steps: TheOpenAbove Camera Capture Zoom Projection

**Last aligned:** `2026-07-16T20-40-58-04-00`  
**Status:** `camera-capture-zoom-projection-authority-audited`

## Summary

Unify normal follow zoom and sightseeing optical zoom under one mode-aware camera authority. Recognition must score the projection that is actually committed and rendered.

## Intent

Produce one deterministic path from wheel evidence to camera mode ownership, projection commit, score evidence and visible-frame acknowledgement.

## What needs to happen

### Gate 1: Input admission

- [ ] Add `ZoomIntentId`, route/session revision, camera-mode revision and viewport revision.
- [ ] Normalize `WheelEvent.deltaY` with `deltaMode`.
- [ ] Coalesce high-frequency trackpad evidence under one policy.
- [ ] Reject stale, map-suspended and retired evidence.

### Gate 2: Owner arbitration

- [ ] Normal flight accepts follow-distance zoom only.
- [ ] Sightseeing mode accepts optical projection zoom only.
- [ ] Prevent one browser event from mutating both owners.
- [ ] Publish `CameraZoomArbitrationResult`.

### Gate 3: Camera commit

- [ ] Move direct camera FOV ownership into one ordered commit.
- [ ] Let the Camera Rig contribute pose and follow-distance descriptors.
- [ ] Let Image Capture contribute an optical request rather than a direct FOV write.
- [ ] Publish actual FOV, effective magnification and `CameraProjectionRevision`.

### Gate 4: Recognition evidence

- [ ] Score from `CameraProjectionResult` rather than a private capture scalar.
- [ ] Store projection revision with every capture result.
- [ ] Reject score/projection mismatches.
- [ ] Publish `PhotoZoomEvidenceResult`.

### Gate 5: Lifecycle

- [ ] Settle camera-mode exit, map open, route exit and disposal.
- [ ] Reject duplicate or late wheel evidence from retired revisions.
- [ ] Preserve explicit reset behavior when leaving sightseeing mode.

### Gate 6: Fixtures

- [ ] Verify one wheel gesture changes only the accepted policy.
- [ ] Verify rendered FOV equals capture-score evidence.
- [ ] Verify pixel, line, page and trackpad wheel behavior.
- [ ] Verify resize, DPR and dynamic-resolution transitions.
- [ ] Verify source, Vite artifact and Pages parity.
- [ ] Publish `FirstZoomBoundFrameAck`.

## Recommended file cut

```txt
src/domains/experience/
  sightseeing-camera-zoom-projection-authority-domain.js
  camera-zoom-intent-admission-kit.js
  camera-zoom-owner-arbitration-kit.js
  camera-projection-policy-kit.js
  camera-projection-commit-kit.js
  camera-projection-result-kit.js

src/domains/image-capture/
  sightseeing-optical-zoom-kit.js
  photo-zoom-evidence-kit.js

src/visual/camera-presentation/
  flight-follow-distance-zoom-kit.js

tests/
  camera-zoom-owner-parity.mjs
  sightseeing-projection-score-parity.mjs
```

## Compatibility constraints

Preserve balloon movement, wind-relative steering, camera smoothing, first-person transition feel, sightseeing targets, world/weather behavior, map pause, Vite build and Pages deployment.

## Retained next steps

Rendered-photo artifact ownership, validation severity, weather-clock ownership, page lifecycle, WebGL recovery, audio, fixed-step pacing, HDR/depth, cloud, provider and persistence gaps remain open.

## Do not claim

Do not claim single-owner wheel handling, optical zoom correctness, projection-bound scoring, source/build/Pages parity or production readiness until the fixture matrix passes.