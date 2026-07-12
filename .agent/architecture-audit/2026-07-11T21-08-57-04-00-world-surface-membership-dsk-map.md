# Architecture Audit: World Surface Membership DSK Map

**Timestamp:** `2026-07-11T21-08-57-04-00`

## Summary

The repository now has a bounded-disk terrain source, but not a bounded-world authority. Terrain sampling and terrain chunk admission consume the disk surface; grass, simulation, route content and diagnostics use partial or no membership evidence.

## Current composition

```txt
WORLD.surface
  -> createDiskWorldSurface
  -> boundedTerrainHeight
       -> balloon terrain clearance
       -> grass candidate height
       -> near terrain geometry
       -> horizon terrain geometry

worldSurface.intersectsBounds
  -> near terrain required set
  -> horizon terrain required set

missing worldSurface consumers
  -> grass required set
  -> grass culling
  -> balloon horizontal movement
  -> airstream route admission
  -> mail route/town admission
  -> GameHost current membership
```

## Existing authority split

```txt
height policy:
  edgeFloor -> terrainHeight using edgeMask

render membership policy:
  near/horizon chunks admitted by intersectsBounds

grass membership policy:
  camera-centered square and LOD only

simulation boundary policy:
  none

readback policy:
  static surface descriptor only
```

## Required parent domain

```txt
open-above-world-surface-membership-authority-domain
```

## Candidate kits

```txt
world-surface-descriptor-kit
world-surface-schema-kit
world-surface-revision-kit
world-membership-query-kit
world-edge-distance-kit
world-edge-band-kit
world-boundary-policy-kit
surface-consumer-id-kit
surface-consumer-capability-kit
surface-point-admission-kit
surface-bounds-admission-kit
terrain-chunk-membership-kit
grass-chunk-membership-kit
route-content-membership-kit
simulation-boundary-admission-kit
boundary-response-plan-kit
boundary-response-result-kit
surface-consumer-parity-result-kit
stale-surface-result-rejection-kit
world-surface-observation-kit
world-surface-journal-kit
visible-surface-frame-ack-kit
boundary-parity-fixture-kit
browser-boundary-traversal-smoke-kit
```

## Required descriptors

```txt
WorldSurfaceDescriptor
  surfaceId
  schemaVersion
  revision
  kind
  center
  radius
  edgeBlendWidth
  edgeFloor
  fingerprint

WorldMembershipResult
  surfaceId
  surfaceRevision
  queryId
  subjectId
  subjectKind
  classification
  signedDistanceToBoundary
  edgeMask
  policyId
  admitted
  reason

SurfaceConsumerParityResult
  surfaceRevision
  frameId
  simulationMembership
  terrainMembershipRevision
  grassMembershipRevision
  routeMembershipRevision
  requiredConsumerIds
  acknowledgedConsumerIds
  parity
  mismatchReasons
```

## Required invariants

```txt
one committed surface revision drives every consumer
terrain and grass cannot disagree on chunk membership
outside chunks cannot render grass without an admitted support surface
simulation cannot leave the supported world without an explicit boundary result
edge-floor sampling is not equivalent to render membership
stale membership results cannot commit after a surface revision change
GameHost readback identifies current membership and consumer parity
visible-frame acknowledgement references the surface revision rendered
```

## Safe implementation order

```txt
1. Version and fingerprint WORLD.surface.
2. Expose pure point and bounds membership queries.
3. Give each consumer an explicit capability and policy ID.
4. Route near and horizon admission through the shared query result.
5. Route grass required-set construction through the same bounds query.
6. Correct grass chunk world centers/bounds before manual culling.
7. Add balloon boundary admission and a deterministic response policy.
8. Validate authored routes, towns and airstreams against the surface.
9. Publish typed per-consumer results and mismatch diagnostics.
10. Correlate the committed membership set with one visible frame.
11. Add pure, browser and Pages boundary traversal fixtures.
```

## Scope

Documentation only. This audit does not select whether the final gameplay policy should clamp, wrap, redirect, fail, or stream a larger world; it requires that whichever policy is chosen be explicit, versioned and shared.