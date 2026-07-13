# Map System Audit: Dual-Surface Frame Envelope Contract

## Summary

The map should project from a committed frame envelope rather than sampling live simulation and mail objects independently. This contract preserves the current pause behavior while adding revision, transition and presentation evidence.

## Frame envelope

```txt
DualSurfaceFrameEnvelope
  frameEnvelopeId
  runtimeSessionId
  simulationGeneration
  flightStateRevision
  mailStateRevision
  mapTransitionGeneration
  mapVisibilityState
  playerPosition
  playerHeading
  parcelId
  destinationTownId
  routeRevision
  worldSurfaceRevision
  capturedAtSimulationTime
  fingerprint
```

## Projection results

```txt
WorldProjectionResult
  frameEnvelopeId
  worldRenderFrameId
  status
  renderScale
  drawCalls
  triangles
  errorCode

MapProjectionResult
  frameEnvelopeId
  mapRenderFrameId
  mapTransitionGeneration
  status
  viewportRevision
  markerFingerprint
  errorCode
```

## Commit result

```txt
DualSurfaceCommitResult
  dualSurfaceCommitId
  frameEnvelopeId
  requiredSurfaces
  acceptedSurfaces
  status: Complete | Partial | Failed | Stale | Superseded | Cancelled
  predecessorCommitId
  recoveryResultId
```

## Rules

```txt
capture once per admitted logical frame
never call live state getters during projection
opening requires a map projection before visible acceptance
closing retires the prior map scheduler generation
world-only frames remain valid while the map is closed
world+map frames require matching envelope identity while open
partial failures preserve the last complete visible frame
all public readback is detached and fingerprinted
```

## Fixtures

```txt
open-map-first-frame-not-blank
open-map-player-marker-matches-envelope
open-map-destination-marker-matches-envelope
world-map-envelope-ids-match
rapid-open-close-rejects-stale-map-callback
map-resize-requires-new-viewport-revision
map-projection-failure-preserves-last-complete-frame
GameHost-readback-cites-dual-surface-commit
```

## Non-goal

This audit does not change the current art direction, map geometry, world projection, route design, pause policy or controls.