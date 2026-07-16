# START HERE: TheOpenAbove Sightseeing Photo Frame Artifact

**Last aligned:** `2026-07-16T14-59-39-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`  
**Branch:** `main`  
**Previous central repo-local head:** `aac119fd0b793ea4a86edee7167f87d4d740275b`  
**Reviewed pre-audit repository head:** `d0677937043224bb295bd3b270c336aed0e2a2b1`  
**Status:** `sightseeing-photo-frame-artifact-authority-audited`

## Summary

TheOpenAbove was the only eligible Publish repository still ahead of its centrally documented `.agent` head. The 26-commit delta replaces the active Air Mail loop with semantic Meadow Lift domains, sightseeing image capture, Snap Point map regions, immediate wind-relative steering and a player-centered wind particle field.

The new image-capture domain records recognition, score, zoom and player position, but it never captures rendered pixels. Capture settlement occurs during update before the frame is rendered, and the map journal draws a generic reference illustration instead of the accepted photograph.

## Intent

Keep the new sightseeing loop while making every accepted photo correspond to one exact rendered frame, camera state, world/weather generation and immutable image artifact.

## What needs to happen

```txt
shutter request
  -> bind route/session/frame/camera/world/weather/renderer revisions
  -> render or identify one accepted capture frame
  -> create immutable photo bytes and digest
  -> score the same accepted frame
  -> publish PhotoCaptureResult
  -> persist or retire the artifact explicitly
  -> project the actual photo into the journal/map
  -> publish FirstPhotoArtifactAck
  -> publish FirstJournalPhotoFrameAck
```

## Checklist

- [x] Compare all 11 Publish repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm ten eligible central ledgers and root `.agent` states.
- [x] Select only TheOpenAbove as the remaining runtime-ahead repository.
- [x] Inspect the 26-commit, 19-file semantic-domain and sightseeing delta.
- [x] Document the interaction loop, domains, active kits and offered services.
- [x] Reclassify six Air Mail surfaces as inactive migration history.
- [x] Reconcile 78 active local surfaces and 121 total active named surfaces.
- [x] Add the `2026-07-16T14-59-39-04-00` audit family on `main`.
- [ ] Implement exact-frame photo artifact capture and lifecycle ownership.
- [ ] Run source, browser, build, artifact and Pages fixtures.

## Read this pass first

```txt
.agent/trackers/2026-07-16T14-59-39-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-16T14-59-39-04-00.md
.agent/architecture-audit/2026-07-16T14-59-39-04-00-sightseeing-photo-frame-artifact-dsk-map.md
.agent/render-audit/2026-07-16T14-59-39-04-00-semantic-photo-without-rendered-frame-gap.md
.agent/gameplay-audit/2026-07-16T14-59-39-04-00-shutter-score-journal-loop.md
.agent/interaction-audit/2026-07-16T14-59-39-04-00-photo-capture-command-result-map.md
.agent/photo-capture-audit/2026-07-16T14-59-39-04-00-rendered-frame-artifact-contract.md
.agent/deploy-audit/2026-07-16T14-59-39-04-00-photo-artifact-source-build-pages-fixture-gate.md
.agent/central-sync-audit/2026-07-16T14-59-39-04-00-runtime-ahead-sightseeing-reconciliation.md
```

## Required parent domain

`open-above-sightseeing-photo-frame-artifact-authority-domain`

## Census

```txt
active local source-backed surfaces: 78
runtime-implied adapters: 13
Nexus Engine provider surfaces: 30
active named surfaces: 121
inactive Air Mail migration surfaces: 6
planned photo authority surfaces: 20
```

## Retained priority

Validation severity, weather-clock ownership, lifecycle, renderer recovery, audio, controls, fixed-step pacing, HDR/depth coherence, cloud proof, provider identity, route retirement, terrain/flora proof and persistence remain unresolved.

## Claim boundary

Documentation only. No rendered-photo capture, artifact persistence, score/frame convergence, journal projection, artifact parity, Pages parity or production readiness is claimed.