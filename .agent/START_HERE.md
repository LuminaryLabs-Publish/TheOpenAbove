# START HERE: TheOpenAbove Camera Capture Zoom Projection

**Last aligned:** `2026-07-16T20-40-58-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`  
**Branch:** `main`  
**Previous central repo-local head:** `7f8de3ab0b6c8540992a22a9605586ef993e14e3`  
**Reviewed pre-audit repository head:** `7f8de3ab0b6c8540992a22a9605586ef993e14e3`  
**Status:** `camera-capture-zoom-projection-authority-audited`

## Summary

All ten eligible Publish repositories were tracked, root-agent-covered and synchronized. TheOpenAbove was selected as the oldest documented repository.

Sightseeing optical zoom and balloon follow zoom currently consume the same wheel event through separate listeners. Image Capture writes a private zoom and camera FOV; the Balloon Camera Rig also changes follow distance and overwrites FOV on the next update. Photo scoring uses the private capture value rather than an accepted rendered projection.

## Intent

Give each wheel gesture one explicit camera-zoom owner and bind sightseeing scoring to the exact projection committed and rendered for that frame.

## What needs to happen

```txt
wheel evidence
  -> bind route/session/camera/mode/viewport revisions
  -> normalize wheel units
  -> choose one owner: flight follow or sightseeing optical
  -> commit camera pose and projection once
  -> publish CameraProjectionResult
  -> score from the committed effective zoom
  -> render the matching frame
  -> publish FirstZoomBoundFrameAck
```

## Checklist

- [x] Compare all 11 Publish repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm ten eligible ledgers and root `.agent` states.
- [x] Confirm no new, missing, undocumented or runtime-ahead repository.
- [x] Select only TheOpenAbove by the oldest synchronized timestamp.
- [x] Reconcile the interaction loop, domains, all 121 active surfaces and services.
- [x] Add the `2026-07-16T20-40-58-04-00` audit family on `main`.
- [ ] Implement single-owner zoom admission and projection-bound score evidence.
- [ ] Run browser, build, artifact and Pages fixtures.

## Read this pass first

```txt
.agent/trackers/2026-07-16T20-40-58-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-16T20-40-58-04-00.md
.agent/architecture-audit/2026-07-16T20-40-58-04-00-camera-capture-zoom-projection-dsk-map.md
.agent/render-audit/2026-07-16T20-40-58-04-00-capture-zoom-projection-visible-frame-gap.md
.agent/gameplay-audit/2026-07-16T20-40-58-04-00-camera-mode-wheel-zoom-loop.md
.agent/interaction-audit/2026-07-16T20-40-58-04-00-camera-zoom-command-result-map.md
.agent/camera-zoom-audit/2026-07-16T20-40-58-04-00-dual-owner-optical-follow-zoom-contract.md
.agent/deploy-audit/2026-07-16T20-40-58-04-00-camera-zoom-browser-fixture-gate.md
.agent/central-sync-audit/2026-07-16T20-40-58-04-00-oldest-selection-camera-zoom-reconciliation.md
```

## Required parent domain

`open-above-sightseeing-camera-zoom-projection-authority-domain`

## Census

```txt
active local source-backed surfaces: 78
runtime-implied adapters: 13
Nexus Engine provider surfaces: 30
active named surfaces: 121
inactive Air Mail migration surfaces: 6
planned camera-zoom authority surfaces: 19
```

## Retained priority

Rendered-photo artifact ownership, validation severity, weather-clock ownership, lifecycle, renderer recovery, audio, fixed-step pacing, HDR/depth coherence, cloud proof, provider identity, route retirement, terrain/flora proof and persistence remain unresolved.

## Claim boundary

Documentation only. No corrected wheel ownership, projection convergence, score/render parity, artifact parity, Pages parity or production readiness is claimed.