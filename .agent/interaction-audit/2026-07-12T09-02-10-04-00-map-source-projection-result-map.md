# Interaction Audit: Map Source to Projection Result

**Timestamp:** `2026-07-12T09-02-10-04-00`

## Plan ledger

**Goal:** replace draw-time reads and implicit geometry with one admitted source bundle and typed projection result.

- [x] Map current source owners and consumers.
- [x] Identify missing command/result boundaries.
- [x] Define source, projection and frame receipts.
- [ ] Implement the interaction contract.

## Current source flow

```txt
WORLD.surface -----------------------> overlay center/radius captured at construction
airstream.routes --------------------> overlay routes captured at construction
mail.towns --------------------------> overlay towns captured at construction
simulation.state --------------------> read live during every draw
mail.parcel -------------------------> read live during every draw
canvas bounds/devicePixelRatio ------> read during resize

all sources
  -> direct canvas mutation
  -> no projection command
  -> no typed result
  -> no frame receipt
```

## Missing interaction identities

```txt
mapNavigationRequestId
worldBoundsRevision
routeSetRevision
townSetRevision
playerObservationRevision
parcelRevision
viewportRevision
projectionRevision
projectionResultId
visibleMapFrameId
```

## Required request

```txt
MapNavigationProjectionCommand
  commandId
  mapGeneration
  expectedSourceFingerprint
  expectedViewportRevision
  fitPolicyId
  offMapPolicyId
  requestedAtFrameId
```

## Required result

```txt
MapNavigationProjectionResult
  resultId
  commandId
  mapGeneration
  projectionRevision
  sourceFingerprint
  viewportRevision
  transform
  routeStyles
  playerMarkerPose
  status: applied | unchanged | rejected
  rejectionReason
```

## Required frame receipt

```txt
MapVisibleFrameAck
  mapGeneration
  projectionRevision
  sourceFingerprint
  viewportRevision
  canvasBackingSize
  cssViewport
  devicePixelRatio
  presentedAt
```

## Required admission rules

```txt
reject stale map generation
reject stale viewport revision
reject source fingerprint mismatch
reject invalid or non-finite bounds
reject duplicate command IDs or return the prior result
return unchanged when geometry and style fingerprints are identical
commit projection result before publishing visible-frame acknowledgement
```

## Observability

GameHost should expose detached data only:

```txt
mapNavigation
  generation
  projectionRevision
  sourceFingerprint
  worldBounds
  contentBounds
  fitPolicyId
  playerMarkerPose
  activeRouteId
  destinationRouteId
  lastResult
  lastVisibleFrameAck
```

Documentation only. No interaction behavior was changed.