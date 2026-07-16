# Architecture Audit: Sightseeing Photo Frame Artifact DSK Map

## Summary

The new semantic domains establish clear game-concept ownership, but the Image Capture domain currently ends at a metadata record. Rendering, artifact creation, persistence and journal projection are not composed as one transaction.

## Current DSK/domain flow

```txt
Journey
  -> owns RAF and map pause

Ballooning
  -> updates flight state

Sky
  -> updates sampled flow and local wind particles

Experience
  -> updates camera and visual state

Image Capture
  -> consumes pending shutter
  -> reads camera direction, zoom and player position
  -> computes recognition and score
  -> writes capture metadata/completion

Nexus Engine tick
  -> advances provider state

Experience render
  -> presents the visual frame

Navigation
  -> projects Snap Point completion and generic reference art
```

## Ownership gap

The current Image Capture domain has no child services for:

```txt
capture-frame admission
renderer color-source selection
image encoding
digest and artifact identity
artifact storage/object URL lifecycle
score/frame convergence
journal image projection
artifact retirement
first-photo visible proof
```

## Required parent domain

`open-above-sightseeing-photo-frame-artifact-authority-domain`

## Proposed child DSKs

| DSK | Service |
|---|---|
| `photo-capture-command-kit` | normalize shutter intent and bind request/session/route revisions |
| `photo-frame-admission-kit` | select exact post-update renderer frame and reject stale work |
| `photo-camera-receipt-kit` | freeze camera transform, projection, zoom and viewport identity |
| `photo-world-weather-binding-kit` | bind world, weather, render-scale and renderer generations |
| `photo-color-source-kit` | resolve canvas or dedicated render-target source |
| `photo-artifact-encoder-kit` | encode PNG/WebP bytes and metadata |
| `photo-artifact-digest-kit` | compute immutable content identity |
| `photo-artifact-store-kit` | own memory/IndexedDB/object URL persistence |
| `photo-artifact-retirement-kit` | revoke URLs and retire superseded artifacts |
| `photo-recognition-evidence-kit` | publish facing, distance, framing and zoom evidence |
| `photo-score-settlement-kit` | settle score from the accepted frame descriptor |
| `photo-snap-point-completion-kit` | require accepted artifact before completion |
| `photo-journal-projection-kit` | project actual captured image and load/failure states |
| `photo-capture-result-kit` | publish accepted/rejected/failed terminal result |
| `photo-artifact-result-kit` | publish digest, MIME, dimensions, bytes and storage identity |
| `photo-frame-convergence-kit` | verify score, artifact and journal use one generation |
| `photo-capture-diagnostics-kit` | expose current request, frame, artifact and failure evidence |
| `first-photo-artifact-ack-kit` | acknowledge first accepted image artifact |
| `first-journal-photo-frame-ack-kit` | acknowledge first visible journal projection |

## Contract

```txt
PhotoCaptureCommand
  -> PhotoFrameAdmissionResult
  -> PhotoCameraReceipt
  -> PhotoArtifactResult
  -> PhotoRecognitionResult
  -> PhotoCaptureResult
  -> JournalProjectionResult
  -> FirstPhotoArtifactAck
  -> FirstJournalPhotoFrameAck
```

## Constraints

- Journey remains the frame/lifecycle owner.
- Experience remains the renderer owner.
- Image Capture remains the sightseeing semantic owner.
- Navigation consumes accepted journal projection only.
- Scoring cannot create or mutate renderer state.
- Rendering cannot create gameplay completion directly.
- No captured artifact may outlive its explicit storage lifecycle.

## Status

Proposed architecture only. No runtime implementation exists.