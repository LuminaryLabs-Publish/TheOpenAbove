# World Surface Audit: Consumer Membership Parity Contract

**Timestamp:** `2026-07-11T21-08-57-04-00`

## Summary

The bounded-disk ProtoKit is integrated as a terrain helper, not yet as a product-wide domain. This audit defines the contract required for every spatial consumer to agree on what exists, what can be entered, and what was actually rendered at the world edge.

## Source-backed state

```txt
surface kind: bounded-disk
center: (0, 0)
radius: 10000
edge blend width: 600
edge floor: -120
ProtoKit pin: dd8d68f5635a64f34043edd3ac757067a02eb43c
```

### Consumers with direct membership

```txt
near terrain streamer: intersectsBounds
horizon terrain streamer: intersectsBounds
bounded height sampler: edgeMask
```

### Consumers without direct membership

```txt
grass chunk required set
grass manual culling
balloon horizontal movement
airstream route/visual admission
mail town and destination admission
vegetation manifest validation
water and distant landmark policy
HUD and GameHost current membership
```

## Required consumer matrix

| Consumer | Subject | Query | Required result |
|---|---|---|---|
| simulation | candidate balloon position | point | movement admission and boundary response |
| near terrain | chunk bounds | bounds | create/retain/release decision |
| horizon terrain | chunk bounds | bounds | create/retain/release decision |
| grass | chunk bounds | bounds | placement and visibility admission |
| airstream | route volume | bounds/shape | authored content validity |
| mail | town/delivery volume | point/bounds | authored content validity |
| vegetation | instance point | point | placement validity |
| diagnostics | committed state/frame | aggregate | parity and mismatch result |

## Classification model

```txt
inside
edge-blend-inside
intersecting-boundary
edge-blend-outside
outside
invalid-query
stale-surface-revision
unsupported-consumer-policy
```

## Edge-policy rules

```txt
height edge blending does not automatically admit render geometry
render geometry absence does not automatically terminate simulation
simulation continuation outside the surface requires an explicit policy
content authoring must be validated independently of runtime drift
all consumers must expose which policy and surface revision they used
```

## Required observations

```txt
surfaceId
surfaceRevision
surfaceFingerprint
cameraMembership
balloonMembership
terrainRequired/committed/visible counts
grassRequired/committed/visible counts
unsupportedGrassChunkIds
routeContentViolations
mailContentViolations
consumerAcknowledgementSet
consumerMismatchReasons
renderFrameId
visibleFrameId
```

## Required fixtures

```txt
fixture:surface-point-classification
fixture:surface-bounds-classification
fixture:terrain-grass-required-set-parity
fixture:outside-surface-grass-rejection
fixture:balloon-boundary-policy
fixture:authored-content-surface-validation
fixture:surface-revision-stale-result
fixture:surface-visible-frame-parity
fixture:pages-boundary-traversal
```

## Scope

This contract extends, rather than replaces, the retained grass chunk spatial-identity audit. Chunk bounds must first be correct; those bounds must then be admitted against the same world-surface revision used by terrain and simulation.