# Known Gaps: TheOpenAbove

**Last aligned:** `2026-07-12T17-41-25-04-00`

## Primary ordered gaps

```txt
1. immutable runtime admission
2. session, listener, frame and failure ownership
3. fixed-step clock and sequenced input
4. procedural world identity and membership provenance
5. flight/world membership admission and boundary policy
6. terrain streaming aggregate ownership and rollback
7. vegetation spatial coverage, adoption and disposal
8. grass/flower world and exclusion coherence
9. steering, HDR and visible-frame coherence
10. parchment map spatial navigation and accessibility
```

## Flight/world membership gaps

```txt
bounded-disk world exists but movement does not cite it
no FlightCommandId, FlightFrameId or flight-state revision
no WorldSurfaceRevision or boundary-policy revision on movement
position is mutated before membership admission
no start/end point membership evidence
no swept high-speed crossing detection
no edge-band transition result
no authored Accept/SoftReturn/Clamp/Reject/Terminal policy
no zero-mutation rejection receipt
no atomic flight and world-consumer commit
no consumer receipt completeness result
no stale flight-frame rejection
no boundary observation or bounded journal
no FlightBoundaryVisibleFrameAck
no source/build/Pages boundary parity fixture
```

## Concrete risks

```txt
slow wind drift crosses the world radius
high velocity tunnels across the 600-unit edge blend
outside terrain/flora sampling becomes accidental policy
map marker and gameplay disagree about world membership
mail and airstream accept positions beyond authored space
future consumers implement conflicting local clamps
world replacement accepts stale predecessor movement
```

## Retained world and streaming gaps

```txt
no immutable WorldGridArtifact with complete consumer receipts
terrain near/horizon generations lack atomic aggregate adoption
vegetation remains boot-only and centrally bounded
grass/flower exclusions are not revisioned with vegetation
transition work lacks full time/allocation budgets
```

## Required flight fixtures

```txt
flight-center-membership
flight-edge-entry-and-exit
flight-slow-outside-policy
flight-high-speed-swept-crossing
flight-rejection-zero-mutation
flight-soft-return-determinism
flight-world-revision-stale-result
flight-consumer-receipt-completeness
flight-map-world-parity
flight-visible-frame-ack
browser-flight-boundary-matrix
pages-flight-boundary-parity
```

## Non-claim

Do not treat a large world radius, edge-blended terrain, map clipping or visually continuous streaming as proof that player motion is admitted, deterministic or coherent at the world boundary.
