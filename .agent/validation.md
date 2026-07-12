# Validation: TheOpenAbove

**Last aligned:** `2026-07-12T11-01-59-04-00`

## Scope

Documentation-only audit of world construction, deterministic sampling, feature-cell cache behavior, disk membership, terrain/grass/flower/map consumer coherence and visible-frame provenance through source revision `f24e1b11063a566ff011168ffd89a0609f21328c`.

## Plan ledger

**Goal:** distinguish deterministic sampled values from proof that one immutable world artifact is built, queried, adopted and rendered coherently.

- [x] Compare the complete Publish inventory and central ledger state.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `TheOpenAbove` because material source changed after its prior audit.
- [x] Read guidance, host, world generator, terrain, grass, flowers, map and tests.
- [x] Confirm synchronous grid/erosion/flow/map build work.
- [x] Confirm feature-cell queries mutate a cache exposed by the descriptor.
- [x] Confirm terrain and flora consumers do not share one membership service.
- [x] Reconcile 67 active source-backed kits and services.
- [x] Define authority, fixture and deployment requirements.
- [x] Change no runtime source, dependency, script or workflow.
- [x] Create no branch or pull request.

## Existing source-backed proof

```txt
independent world objects return equal tested samples
world grid size and feature-cell size are asserted
route and town protected terrain remains close to legacy height
five grass and five flower types are observed
several biome profiles and map colors are observed
grass chunk generation is deterministic for tested local chunks
local high-quality grass budget equals 2500 clumps / 5000 cards
flower placement and type coverage are tested
npm run check imports world, grass and flower tests
```

## Source-backed defect proof

```txt
featureCellAt inserts when a key is absent
sampleBiome/sampleFlora/sampleMapColor can call featureCellAt
getDescriptor exposes featureCells.size
getSnapshot includes world.getDescriptor()
```

Therefore query history can alter public snapshot content without a committed world change.

## Source-backed boundary evidence

```txt
terrain height uses worldSurface.edgeMask and edgeFloor
world sampleGrid clamps coordinates to grid edge
grass/flower domains center chunks on camera position
grass/flower constructors receive terrain and world, not worldSurface membership
generated chunk identity omits world build revision
map background is created once through synchronous world color sampling
```

## Missing static fixtures

```txt
fixture:world-authority-present
fixture:cache-size-removed-from-authoritative-state
fixture:typed-membership-policy-present
fixture:consumer-world-revision-present
fixture:world-visible-frame-ack-present
```

## Missing pure fixtures

```txt
fixture:world-input-fingerprint
fixture:world-independent-build-fingerprint
fixture:world-query-order-purity
fixture:world-map-prewarm-purity
fixture:world-cache-capacity-and-retirement
fixture:world-inside-edge-outside-matrix
fixture:world-anchor-fingerprint-drift
fixture:world-consumer-parity
fixture:world-stale-query-rejection
fixture:world-stale-chunk-rejection
```

## Missing performance fixtures

```txt
world build wall-time budget
world build allocation budget
map rasterization budget
cancellation at each build stage
failed build leaves active artifact unchanged
cold build versus cached artifact startup
```

## Missing browser fixtures

```txt
capture WorldBuildResult before first visible frame
verify map construction does not change authoritative world descriptor
fly center to edge and compare terrain/grass/flower membership
open and close map and compare world fingerprint
probe map/scene biome color parity
replace world revision and reject stale chunks
capture WorldVisibleFrameAck
```

## Missing built-output and Pages checks

```txt
source and dist world fingerprints match
built imports resolve under project base path
deployed world construction meets budget
deployed edge membership matches source fixtures
map and scene cite the same world revision
screenshot is paired with machine-readable visible-frame acknowledgement
```

## Commands not run

```txt
npm install
npm run check
npm run headless:check
npm run build
browser world fixture matrix
Pages world-generation smoke
```

The connector environment supplied source and write access, not a checked-out browser runtime. Existing repository tests were inspected but not executed during this documentation pass.

## Change-state validation

```txt
runtime JavaScript changed: no
HTML changed: no
package scripts changed: no
dependencies changed: no
gameplay changed: no
input behavior changed: no
render behavior changed: no
accessibility behavior changed: no
deployment workflow changed: no
branch created: no
pull request created: no
.agent documentation changed: yes
```

## Completion boundary

Do not claim procedural world authority until executable proof shows canonical independent-build fingerprints, query/cache purity, explicit membership, cross-consumer parity, startup/cancellation behavior, stale-result rejection and visible-frame provenance.