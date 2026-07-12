# Known Gaps: TheOpenAbove

**Last aligned:** `2026-07-12T19-31-06-04-00`

## Primary ordered gaps

```txt
1. immutable runtime admission
2. session, listener, frame and failure ownership
3. fixed-step clock and sequenced input
4. procedural world identity and membership provenance
5. flight/world membership admission and boundary policy
6. terrain streaming aggregate ownership and rollback
7. vegetation spatial coverage, adoption and disposal
8. flora exclusion artifact coherence
9. steering, HDR and visible-frame coherence
10. parchment map spatial navigation and accessibility
```

## Flora-exclusion coherence gaps

```txt
vegetation exports treePositions and clusters without generation identity
no immutable FloraExclusionArtifact
no vegetation/exclusion revision or fingerprint
grass and flowers build separate private spatial indexes
grass and flower clearance policies are not centrally authored
grass captures cluster proximity while flowers do not
grass/flower chunks cite coordinates and counts but no exclusion revision
no invalidation when vegetation, world or quality changes
no detached paired candidate set
no atomic grass/flower adoption
no last-good paired rollback
no stale exclusion result rejection
no exact retirement receipt for predecessor indexes and geometry
no cross-consumer parity result
no FloraExclusionVisibleFrameAck
no source/build/Pages exclusion-coherence fixture
```

## Concrete risks

```txt
new streamed trees overlap predecessor-derived grass or flowers
removed trees leave permanent predecessor clearings
quality changes alter vegetation while retained flora chunks remain stale
world replacement reuses coordinate-only chunks against a new tree field
grass and flowers show different vegetation generations in one frame
partial generation failure leaves mixed predecessor/successor consumers
future consumers invent incompatible exclusion radii
snapshot counts look healthy while visual overlap is wrong
```

## Source-backed divergence

```txt
grass obstacle radius: tree.radius
flower obstacle radius: tree.radius + 1.2
grass extra signal: cluster-edge proximity
flower extra signal: none
shared base mask: moisture, slope, origin clearing and procedural road
shared artifact identity: none
```

## Retained world and streaming gaps

```txt
no immutable WorldGridArtifact with complete consumer receipts
flight movement does not admit bounded-world membership
terrain near/horizon generations lack atomic aggregate adoption
vegetation remains boot-only and centrally bounded
grass/flower transition work lacks full time/allocation budgets
```

## Required flora fixtures

```txt
flora-exclusion-artifact-determinism
grass-flower-shared-artifact-revision
vegetation-replacement-invalidates-flora
new-tree-no-overlap
removed-tree-clearing-repopulation
configured-clearance-policy-parity
stale-exclusion-result-zero-mutation
paired-candidate-failure-last-good-retention
paired-adoption-no-mixed-generation
predecessor-retirement-exactly-once
flora-exclusion-visible-frame-ack
browser-flora-exclusion-matrix
pages-flora-exclusion-parity
```

## Non-claim

Do not treat deterministic seeds, nearby tree checks, successful chunk counts or the absence of obvious overlap near the initial camera as proof that vegetation, grass and flowers share one current exclusion generation.