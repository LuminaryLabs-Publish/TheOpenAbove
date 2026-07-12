# Known Gaps: TheOpenAbove

**Last aligned:** `2026-07-12T11-01-59-04-00`

## Primary ordered gaps

```txt
1. immutable runtime admission
2. session, listener, frame and failure ownership
3. fixed-step clock and sequenced input
4. balloon model/profile and mission authority
5. terrain and world-surface authority
6. procedural world generation authority
7. grass/flower world-consumer coherence
8. steering, HDR and visible-frame coherence
9. parchment map pause/input and spatial navigation
10. semantic mission status and fatal accessibility
```

## Procedural world-generation gaps

```txt
no WorldBuildId
no generation revision
no canonical seed/config/anchor fingerprint
no named build stages or stage results
no startup budget, progress or cancellation
no immutable reusable WorldGridArtifact
no artifact fingerprint
no pure typed sample query/result
feature-cell cache mutates during reads
cache size leaks into public descriptor/snapshot
no bounded cache capacity or eviction policy
no explicit cache lifetime/disposal result
no canonical inside/edge/outside policy
outside-grid values clamp silently
no typed out-of-bounds result
no world replacement transaction or rollback
no stale query/consumer rejection
no world-generation journal
```

## Concrete observer-induced mutation

```txt
sampleMapColor
  -> sampleFlora
  -> sampleBiome
  -> featureCellAt
  -> featureCells.set

getDescriptor
  -> cachedFeatureCells: featureCells.size
```

Map construction, camera travel or diagnostic queries can change later snapshots even when world inputs and gameplay state are unchanged.

## Startup gaps

```txt
257 x 257 world arrays are built synchronously
six erosion passes run synchronously
flow accumulation sorts all grid indices synchronously
96 x 96 map colors are sampled synchronously during overlay construction
no first-frame budget or loading progress exists
no worker/cancellation/retry/artifact-cache boundary exists
```

## Consumer membership gaps

```txt
terrain uses disk edgeMask and edgeFloor
world sampleGrid clamps to border cells
grass/flowers follow camera chunks without worldSurface membership
feature cells exist for unbounded integer coordinates
vegetation/landmarks/map have no consumer receipts
chunk and map identities omit world build revision
no terrain/grass/flower/map parity result
no world-visible-frame acknowledgement
```

## Grass and flower gaps

```txt
world density and legacy biome density composition is unnamed
grass and flower chunk IDs omit world revision
outside-world rejection count is absent
chunk state exposes counts but not artifact fingerprint
stale chunks cannot be identified after replacement
map-prewarm versus cold-cache parity is untested
```

## Retained map gaps

```txt
player marker bearing remains reversed
world-fit versus mission-fit remains implicit
active/correct route style is absent
off-map behavior is undefined
map pause/input/focus uses no typed transition authority
```

## Required fixtures

```txt
fixture:world-input-fingerprint
fixture:world-independent-build-fingerprint
fixture:world-query-order-purity
fixture:world-map-prewarm-purity
fixture:world-membership-matrix
fixture:world-anchor-fingerprint
fixture:world-consumer-parity
fixture:world-stale-consumer-rejection
fixture:world-startup-budget
fixture:world-build-cancellation
fixture:world-visible-frame-ack
fixture:browser-world-edge-pixel-probe
fixture:pages-world-generation-parity
```

Do not treat deterministic coordinate samples, a populated map, full grass budgets, a passing Vite build or the absence of console errors as proof that the world is pure, bounded, transactionally committed or render-coherent.