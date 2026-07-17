# START HERE: TheOpenAbove Camera Pointer-Look Gesture Admission and Retirement

**Last aligned:** `2026-07-17T05-41-10-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`  
**Branch:** `main`  
**Previous repo-local documentation head:** `d5c194c6b5da7b1ba15f6ba811cdbb1031cc22a9`  
**Reviewed pre-audit repository head:** `5611624ff8b59ff40e3a2e12d0d837e91b56f68d`  
**Status:** `camera-pointer-look-gesture-admission-retirement-authority-audited`

## Summary

TheOpenAbove was the sole runtime-ahead eligible Publish repository. Three commits removed unsupported Gaussian fog uniforms, added regression coverage, and introduced immediate pointer drag look with yaw/pitch limits plus five-second delayed recentering toward flight heading.

The remaining focused gap is input ownership. The Camera Rig admits primary pointer evidence globally rather than only from the main flight canvas. Map interaction can therefore mutate camera look state. Capture loss, replacement binding, disposal, diagnostics, and exact rendered-frame acknowledgement are incomplete.

## Intent

Preserve the new drag feel and delayed recenter while binding each camera-look delta to one admitted render surface, pointer owner, rig generation, route state, capture lease, pose revision, and matching frame.

## What needs to happen

```txt
main flight canvas pointer evidence
  -> CameraLookGestureAdmissionResult
  -> GestureId / CaptureLeaseRevision

matching pointer delta
  -> CameraLookDeltaResult
  -> CameraLookPoseRevision

pointerup/cancel/capture loss/map/blur/retirement/disposal
  -> CameraLookGestureSettlementResult

five-second idle on accepted clock
  -> CameraLookPoseResult

camera projection and render
  -> CameraLookFrameDigest
  -> FirstCameraLookFrameAck
```

## Checklist

- [x] Compare all 11 Publish repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm ten eligible ledgers and root `.agent` states.
- [x] Select only TheOpenAbove through runtime-ahead priority.
- [x] Review the three-commit, three-file delta.
- [x] Reconcile the complete interaction loop, domains, 125 active surfaces, kits, and services.
- [x] Add the `2026-07-17T05-41-10-04-00` audit family on `main`.
- [ ] Implement surface-scoped admission and complete gesture retirement.
- [ ] Run browser, build, artifact, and Pages fixtures.

## Read this pass first

```txt
.agent/trackers/2026-07-17T05-41-10-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-17T05-41-10-04-00.md
.agent/architecture-audit/2026-07-17T05-41-10-04-00-camera-pointer-look-gesture-dsk-map.md
.agent/render-audit/2026-07-17T05-41-10-04-00-cross-surface-camera-look-visible-frame-gap.md
.agent/gameplay-audit/2026-07-17T05-41-10-04-00-map-pointer-camera-look-loop.md
.agent/interaction-audit/2026-07-17T05-41-10-04-00-camera-look-command-result-map.md
.agent/camera-input-audit/2026-07-17T05-41-10-04-00-pointer-owner-surface-retirement-contract.md
.agent/deploy-audit/2026-07-17T05-41-10-04-00-camera-look-browser-fixture-gate.md
.agent/central-sync-audit/2026-07-17T05-41-10-04-00-runtime-ahead-camera-look-reconciliation.md
```

## Required parent domain

`open-above-camera-pointer-look-gesture-admission-retirement-authority-domain`

## Census

```txt
active local source-backed surfaces: 81
runtime-implied adapters:            14
Nexus Engine provider surfaces:      30
active documented surfaces:         125
inactive Air Mail migration:          6
planned pointer-look surfaces:       20
```

## Retained priority

Gaussian cloud membership stability, camera zoom projection, rendered-photo artifacts, validation severity, weather-clock ownership, page lifecycle, WebGL recovery, audio, fixed-step pacing, HDR/depth coherence, provider identity, route retirement, terrain/flora proof, and persistence remain unresolved.

## Claim boundary

Documentation only. No cross-surface input isolation, complete capture retirement, listener replacement safety, exact camera-look frame convergence, artifact parity, Pages parity, or production readiness is claimed.