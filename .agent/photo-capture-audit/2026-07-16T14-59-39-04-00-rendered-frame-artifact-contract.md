# Photo Capture Audit: Rendered Frame Artifact Contract

## Goal

Make one accepted sightseeing photo a stable product object rather than a transient geometric score record.

## Required identities

```txt
PhotoCaptureRequestId
JourneySessionRevision
RouteRevision
SimulationFrameRevision
CameraRevision
WorldGenerationRevision
WeatherRevision
RendererGeneration
RenderScaleRevision
CapturePolicyRevision
PhotoArtifactId
PhotoArtifactDigest
JournalRevision
```

## Admission contract

`PhotoCaptureCommand` must be admitted only when:

- the Journey route/session is active;
- camera mode is active;
- no blocking map/modal policy applies;
- camera, renderer, world and weather generations match expectations;
- no duplicate request is inflight;
- a valid color source can be produced;
- storage and encoding budgets are available.

## Frame contract

The admitted frame must record:

```txt
frame ID and timestamp
camera world/projection matrices
FOV and zoom
viewport and pixel dimensions
renderer generation and color-space policy
render scale, exposure and quality tier
world and weather generations
player position and heading
Snap Point candidate set and policy revision
```

## Artifact contract

```txt
immutable encoded bytes
MIME type
width and height
byte length
content digest
storage location or object URL
creation result
retirement result
```

Object URLs must be revoked explicitly. IndexedDB or other durable storage must enforce version, quota, migration and deletion policy.

## Score contract

Recognition evidence must reference the same `PhotoCaptureRequestId` and frame descriptor as the artifact. Completion cannot settle from a score whose frame or artifact identity differs.

## Journal contract

The journal must distinguish:

```txt
reference artwork
capture pending
artifact encoding
artifact available
artifact load failed
artifact retired
recognized completion
unidentified retained/discarded
```

## Terminal results

```txt
accepted-recognized
accepted-unidentified
rejected-policy
rejected-stale
failed-render-source
failed-encoding
failed-storage
retired
```

Every admitted request must settle exactly once.

## Acknowledgements

- `FirstPhotoArtifactAck`: first accepted artifact exists with verified digest.
- `FirstJournalPhotoFrameAck`: the journal visibly projects the matching artifact.
- `PhotoArtifactRetirementAck`: retired bytes/URLs are no longer reachable.

## Status

Contract only. No implementation or fixture currently proves these properties.