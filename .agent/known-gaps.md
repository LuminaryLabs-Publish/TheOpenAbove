# Known Gaps: TheOpenAbove

**Last aligned:** `2026-07-12T13-29-56-04-00`

## Primary ordered gaps

```txt
1. immutable runtime admission
2. session, listener, frame and failure ownership
3. fixed-step clock and sequenced input
4. procedural world build identity and consumer provenance
5. terrain streaming aggregate ownership and rollback
6. terrain transition performance budgets
7. grass/flower world-consumer coherence
8. steering, HDR and visible-frame coherence
9. parchment map pause/input and spatial navigation
10. semantic mission status and fatal accessibility
```

## Resolved terrain overlap defects

```txt
one shared camera-relative frame drives near and horizon streamers
horizon cells are partitioned at exact near boundaries
near-owned horizon cells are omitted
retained horizon chunks reclassify by clip signature and LOD
horizon expansion and vertical offset are removed
near and horizon boundary skirts exist
slope sampling is aligned
route protection is narrower and duplicate final blending is removed
fields and road are terrain-draped
lake descriptors are shared and water edges feathered
landmark and water disposal exists
terrain ownership, route and overlay tests are in npm run check
```

## Terrain streaming authority gaps

```txt
no typed TerrainStreamFrameId
no terrain stream session identity
frame revision omits world, quality, algorithm, geometry and material fingerprints
no typed ownership-plan result
near and horizon candidate meshes are built directly into live groups
obsolete live meshes are disposed before complete candidate success
no aggregate near/horizon parity result
no atomic aggregate adoption
no last-good rollback result
no exactly-once retirement receipt
near mesh metadata omits frame revision
no typed chunk generation IDs
no TerrainStreamCommitResult
no TerrainVisibleFrameAck
```

## Terrain transition performance gaps

```txt
geometry construction is synchronous in the visual update path
no planning/build wall-time budget
no allocation or vertex/index budget result
no degraded transition policy
no cancellation boundary
no created/reused/retired/rejected/failure observation set
no transition journal
```

## Procedural world gaps retained

```txt
no WorldBuildId or generation revision
no canonical seed/config/route/town/algorithm fingerprint
no named build stages or typed stage results
no startup budget, progress or cancellation
no immutable reusable WorldGridArtifact
sample results omit world revision and artifact fingerprint
outside-world policy differs by sample type
no world replacement transaction or rollback
no stale query/consumer rejection
```

## Consumer provenance gaps

```txt
terrain, vegetation, landmarks, grass, flowers and map lack stable consumer receipts
terrain stream frames do not cite world build identity
chunks and map background omit world fingerprint
no cross-consumer parity result
no stale consumer rejection after world replacement
```

## Grass and flower gaps

```txt
world density and legacy biome density composition is unnamed
grass and flower chunk IDs omit world revision
outside-world rejection counts are absent
quality transitions have no relation to world revision
cold-build versus map-prewarmed chunk parity is untested
```

## Retained map gaps

```txt
player marker bearing remains reversed
world-fit versus mission-fit remains implicit
active/correct route style is absent
off-map navigation behavior is undefined
map pause/input/focus has no typed transition authority
```

## Required fixtures

```txt
fixture:terrain-frame-input-fingerprint
fixture:terrain-near-horizon-disjoint-ownership
fixture:terrain-candidate-complete-before-adoption
fixture:terrain-build-failure-preserves-last-good
fixture:terrain-aggregate-parity
fixture:terrain-retirement-exactly-once
fixture:terrain-boundary-transition-budget
fixture:terrain-visible-frame-ack
fixture:world-input-fingerprint
fixture:world-consumer-parity
fixture:browser-terrain-boundary-pixel-probe
fixture:pages-terrain-world-parity
```

Do not treat pure ownership classification, passing source tests or the absence of obvious doubled terrain in one view as proof of atomic terrain adoption, rollback safety or visible-frame provenance.