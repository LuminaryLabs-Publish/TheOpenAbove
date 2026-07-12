# Flight Boundary Audit: Membership, Policy and Consumer Contract

**Generated:** `2026-07-12T17-41-25-04-00`

## Summary

This contract binds balloon motion to the bounded-disk world. It separates geometric membership from authored movement policy and requires every world consumer to accept the same committed result.

## Plan ledger

**Goal:** specify deterministic center, edge and outside behavior without coupling world geometry to balloon forces or renderer fallbacks.

- [x] Define identities and revisions.
- [x] Define point and swept membership evidence.
- [x] Define policy outcomes.
- [x] Define atomic commit and consumer receipts.
- [x] Define observations, journal and visible-frame proof.
- [ ] Implement pure and browser fixtures.

## Command

```txt
FlightFrameCommand {
  commandId
  sessionId
  frameId
  predecessorFlightRevision
  worldSurfaceRevision
  boundaryPolicyRevision
  dt
  inputSample
}
```

## Membership evidence

```txt
startClass: inside | edge | outside
proposedClass: inside | edge | outside
signedDistanceToBoundary
crossingFraction
crossingPoint
crossingNormal
sweptCrossingDetected
```

## Policy

```txt
Accept       commit proposal
SoftReturn   add bounded inward acceleration and commit
Clamp        project to admitted boundary and remove outward velocity
Reject       preserve predecessor state
Terminal     commit an authored terminal transition
```

## Result

```txt
FlightBoundaryResult {
  status
  commandId
  frameId
  predecessorFlightRevision
  successorFlightRevision
  worldSurfaceRevision
  boundaryPolicyRevision
  membershipEvidence
  appliedPolicy
  committedPosition
  committedVelocity
  consumerReceiptRequirements
}
```

## Consumer contract

```txt
mail, airstream, camera, terrain, vegetation, grass, flowers, map and HDR
  must consume committed state only
  must cite frameId + worldSurfaceRevision + successorFlightRevision
  must reject stale generations
```

## Fixtures

```txt
center remains inside
edge-band entry is classified
slow outside proposal follows policy
high-speed swept crossing cannot tunnel
rejected proposal performs zero mutation
soft return is bounded and deterministic
map/world/terrain consumers cite one result
world replacement rejects stale flight result
source/build/Pages boundary behavior matches
first matching visible frame is acknowledged
```
