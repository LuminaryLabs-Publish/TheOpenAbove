# Next Steps: TheOpenAbove Sightseeing Photo Frame Artifact

**Last aligned:** `2026-07-16T14-59-39-04-00`  
**Status:** `sightseeing-photo-frame-artifact-authority-audited`

## Summary

Keep the new semantic sightseeing loop, but make shutter settlement occur against one exact rendered frame and produce a lifecycle-owned image artifact rather than metadata alone.

## Intent

Create one frame-bound authority from shutter input through immutable photo bytes, scoring, journal projection and deployment proof.

## What needs to happen

### Gate 1: Capture identity

- [ ] Add stable capture request, session, route and frame IDs.
- [ ] Bind camera transform, projection, zoom and viewport revision.
- [ ] Bind world, weather, renderer and artifact-policy revisions.
- [ ] Reject duplicate, stale, map-suspended and retired requests.

### Gate 2: Frame admission

- [ ] Move capture settlement to a defined post-update/pre-present or post-present stage.
- [ ] Identify the exact color source: renderer canvas or dedicated capture target.
- [ ] Freeze exposure, render scale and camera state for the capture transaction.
- [ ] Publish `PhotoFrameAdmissionResult`.

### Gate 3: Artifact creation

- [ ] Encode immutable PNG or WebP bytes.
- [ ] Compute content digest, dimensions, MIME type and byte length.
- [ ] Own object URL, IndexedDB or file-backed lifecycle explicitly.
- [ ] Publish `PhotoArtifactResult` and retirement results.

### Gate 4: Recognition and scoring

- [ ] Score from the same accepted camera/frame descriptor.
- [ ] Record Snap Point, distance, facing, framing, zoom and policy revision.
- [ ] Make completion depend on the accepted artifact result.
- [ ] Reject score/artifact generation mismatches.

### Gate 5: Journal projection

- [ ] Project the actual accepted image into the map journal.
- [ ] Keep reference art distinct from captured-photo art.
- [ ] Publish `FirstPhotoArtifactAck`.
- [ ] Publish `FirstJournalPhotoFrameAck`.

### Gate 6: Fixtures

- [ ] Capture a recognized landmark and verify pixels, digest and score.
- [ ] Capture an unidentified view and verify artifact retention policy.
- [ ] Verify resize/render-scale changes cannot mix generations.
- [ ] Verify map-open, route retirement and disposal reject stale requests.
- [ ] Verify source, Vite artifact and Pages behavior match.

## Recommended file cut

```txt
src/domains/image-capture/
  sightseeing-photo-frame-artifact-authority-domain.js
  photo-capture-command-kit.js
  photo-frame-admission-kit.js
  photo-artifact-encoder-kit.js
  photo-artifact-store-kit.js
  photo-recognition-score-kit.js
  photo-journal-projection-kit.js
  photo-capture-result-kit.js
  photo-artifact-retirement-kit.js

tests/
  sightseeing-photo-artifact.mjs
  sightseeing-photo-journal-parity.mjs
```

## Compatibility constraints

Preserve semantic domain boundaries, immediate wind-relative steering, local wind particles, current camera controls, world generation, layered weather, map pause behavior, Vite build and Pages deployment.

## Retained next steps

Validation severity and release gating remain unresolved. Weather-clock ownership, lifecycle, WebGL recovery, audio, fixed-step pacing, HDR/depth, cloud, world and deployment gaps remain open.

## Do not claim

Do not claim actual photo capture, score/frame convergence, durable journal images, artifact parity, Pages parity or production readiness until the fixture matrix passes.