# Interaction Audit: Surface Membership Command and Result Map

**Timestamp:** `2026-07-11T21-08-57-04-00`

## Summary

World membership is currently an ambient helper call rather than an explicit command/result surface. Terrain streamers call `intersectsBounds()` directly, the terrain sampler calls `edgeMask()` directly, and other consumers do not query the surface at all.

## Current ingress

```txt
terrain sample
  -> worldSurface.edgeMask({ x, z })
  -> scalar blend only

near terrain rebuild
  -> worldSurface.intersectsBounds(chunkBounds)
  -> Boolean admission

horizon rebuild
  -> worldSurface.intersectsBounds(chunkBounds)
  -> Boolean admission

grass rebuild
  -> no surface query

balloon update
  -> no horizontal surface query
```

## Problems

```txt
no query identity
no surface revision in result
no subject identity
no classification beyond Boolean or scalar
no policy identity
no stale-result rejection
no typed rejection reason
no per-consumer acknowledgement
no cross-consumer parity result
```

## Required command envelopes

```txt
SurfacePointQuery
  queryId
  runtimeSessionId
  surfaceId
  expectedSurfaceRevision
  subjectId
  consumerId
  position
  policyId

SurfaceBoundsQuery
  queryId
  runtimeSessionId
  surfaceId
  expectedSurfaceRevision
  subjectId
  consumerId
  bounds
  policyId
```

## Required results

```txt
WorldMembershipResult
  queryId
  surfaceId
  surfaceRevision
  subjectId
  consumerId
  classification
  signedDistanceToBoundary
  edgeMask
  admitted
  reason
  resultFingerprint

SurfaceConsumerCommitResult
  consumerId
  surfaceRevision
  candidateRevision
  committedSubjectIds
  rejectedSubjectIds
  staleSubjectIds
  failureReasons
```

## Required parity map

```txt
balloon candidate position
  -> simulation point query
camera-centered chunk plan
  -> terrain bounds queries
  -> grass bounds queries
route/town manifest
  -> content bounds/point queries
all required results
  -> parity admission
  -> state/render commit
  -> visible-frame acknowledgement
```

## Required invariants

```txt
Boolean-only membership cannot cross a commit boundary without revision identity
all required consumers use the same surface revision
stale membership results mutate nothing
unsupported grass chunks never enter the committed visible set
simulation outside policy is explicit and typed
readback reports current membership and mismatch reasons
```

## Scope

Documentation only. No API or runtime behavior changed.