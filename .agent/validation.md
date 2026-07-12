# Validation: TheOpenAbove

**Last aligned:** `2026-07-12T11-15-16-04-00`

## Scope

Documentation-only audit of world construction, deterministic sampling, disk membership, terrain/grass/flower/map consumer coherence and visible-frame provenance. Initial source revision `f24e1b11063a566ff011168ffd89a0609f21328c`; concurrent runtime fix reconciled at `74f9b8a212f0b9eedeefdc8f7a5a1eb06fa24cec`.

## Plan ledger

**Goal:** distinguish deterministic sampled values and local runtime fixes from proof that one immutable world artifact is built, adopted and rendered coherently.

- [x] Compare the complete Publish inventory and central ledger state.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `TheOpenAbove` because material source changed after its prior audit.
- [x] Read guidance, host, world generator, terrain, grass, flowers, map and tests.
- [x] Confirm synchronous grid/erosion/flow/map build work.
- [x] Detect pre-fix cache-size descriptor drift and unbounded flora.
- [x] Reconcile the runtime fix that removed descriptor drift and bounded flora.
- [x] Confirm consumers still lack build identity, adoption receipts and frame provenance.
- [x] Reconcile 67 active source-backed kits and services.
- [x] Define authority, fixture and deployment requirements.
- [x] Change no runtime source, dependency, script or workflow in this documentation pass.
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

## Runtime corrections observed during the audit

```txt
world descriptor no longer includes cachedFeatureCells
world exposes contains(x,z)
sampleFlora returns biomeName=outside-world and zero flora density outside radius
```

These corrections resolve the specific descriptor-purity and flora-membership defects found in the initially reviewed source. They do not establish build authority or cross-consumer provenance.

## Remaining source-backed gaps

```txt
no canonical world input or artifact fingerprint
no WorldBuildId or generation revision
no named build-stage result, budget, progress or cancellation
sample results do not cite world revision or artifact fingerprint
sampleFeatureCell remains cache-populating and directly public
outside-world policy is not uniform across all sample types
terrain/vegetation/grass/flower/landmark/map lack adoption receipts
chunks and cached map background omit world revision
no stale consumer rejection exists
no world-visible-frame acknowledgement exists
```

## Missing static fixtures

```txt
fixture:world-authority-present
fixture:world-build-identity-present
fixture:typed-membership-policy-present
fixture:consumer-world-revision-present
fixture:world-visible-frame-ack-present
```

## Missing pure fixtures

```txt
fixture:world-input-fingerprint
fixture:world-independent-build-fingerprint
fixture:world-sample-result-provenance
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
fly center to edge and compare terrain/grass/flower membership
open and close map and verify world revision/fingerprint stability
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
runtime JavaScript changed by documentation pass: no
concurrent runtime fix observed: yes
HTML changed by documentation pass: no
package scripts changed by documentation pass: no
dependencies changed by documentation pass: no
gameplay changed by documentation pass: no
render behavior changed by documentation pass: no
deployment workflow changed by documentation pass: no
branch created: no
pull request created: no
.agent documentation changed: yes
```

## Completion boundary

Do not claim procedural world authority until executable proof shows canonical independent-build fingerprints, build lifecycle results, uniform membership, cross-consumer revision parity, stale-result rejection and visible-frame provenance.