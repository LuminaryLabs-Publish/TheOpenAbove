# Known Gaps: TheOpenAbove

**Last aligned:** `2026-07-12T11-15-16-04-00`

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

## Resolved during this audit window

```txt
feature-cell cache size removed from authoritative descriptor
map/query history no longer changes public descriptor output
world disk containment query added
outside-world flora now returns zero grass/flower density
```

## Remaining procedural world-generation gaps

```txt
no WorldBuildId
no generation revision
no canonical seed/config/route/town/algorithm fingerprint
no named build stages or typed stage results
no startup budget, progress or cancellation
no immutable reusable WorldGridArtifact
no artifact fingerprint
no revisioned typed sample query/result
sampleFeatureCell remains a direct cache-populating public method
no bounded cache capacity, eviction or disposal result
outside-world policy differs by sample type
height/moisture/temperature/fertility still clamp to grid edge
no world replacement transaction or rollback
no stale query/consumer rejection
no world-generation journal
```

## Startup gaps

```txt
257 x 257 world arrays are built synchronously
six erosion passes run synchronously
flow accumulation sorts all grid indices synchronously
96 x 96 map colors are sampled synchronously during overlay construction
no first-frame budget or loading progress exists
no worker/cancellation/retry/artifact-cache boundary exists
```

## Consumer provenance gaps

```txt
terrain, vegetation, landmarks, grass, flowers and map have no consumer IDs
generated chunks omit WorldBuildId and revision
map background omits world revision and fingerprint
no adoption receipts exist
no terrain/grass/flower/map parity result exists
no stale consumer rejection exists after a future world replacement
no world-visible-frame acknowledgement exists
```

## Grass and flower gaps

```txt
world density and legacy biome density composition is unnamed
grass and flower chunk IDs omit world revision
outside-world rejection counts are absent
chunk state exposes counts but not artifact fingerprint
quality transitions have no relation to world revision
cold-build versus map-prewarmed chunk parity is untested
```

## Retained map gaps

```txt
player marker bearing remains reversed
world-fit versus mission-fit remains implicit
active/correct route style is absent
off-map navigation behavior is undefined
map pause/input/focus uses no typed transition authority
```

## Required fixtures

```txt
fixture:world-input-fingerprint
fixture:world-independent-build-fingerprint
fixture:world-sample-result-provenance
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

Do not treat deterministic coordinate samples, a populated map, full grass budgets, bounded flora, a passing Vite build or the absence of console errors as proof that one immutable world artifact was transactionally built, adopted and rendered.