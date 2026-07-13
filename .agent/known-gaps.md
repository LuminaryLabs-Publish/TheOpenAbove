# Known Gaps: TheOpenAbove

**Last aligned:** `2026-07-13T18-40-52-04-00`

## Primary ordered gaps

```txt
1. staged world-generation scheduler and atomic consumer adoption authority
2. Core World feature/foundation channel, revision, and visible adoption authority
3. map/world dual-surface frame coherence and visible map-open acceptance
4. runtime module/provider admission and immutable source identity
5. session, listener, frame, and failure ownership
6. fixed-step clock and sequenced input
7. Air Mail delivery completion lifecycle and mission progression
8. flight/mail session persistence and restore authority
9. telemetry snapshot immutability and public readback isolation
10. procedural world identity and flight membership provenance
11. terrain streaming aggregate ownership and rollback
12. vegetation spatial coverage, adoption, and disposal
13. flora exclusion artifact coherence
14. HDR surface and visible-frame coherence
15. parchment-map spatial navigation and accessibility
```

## Core World feature/foundation gaps

```txt
rendered world is not registered with the Core World parent builder
one global foundation cell replaces bounded partition/cell ownership
feature compilation is one-shot and guarded only by a local boolean
feature registry and lifecycle revisions are not published
foundation cell revision is not carried into product generation state
contribution IDs and channel fingerprints are not exposed
elevation is the only resolved foundation channel consumed
material zones are not connected to terrain or map materials
collision channel is not explicitly adopted or revisioned
near/middle/far fidelity requirements do not select render artifacts
cliff threshold metadata has no product consumer
base and foundation artifacts do not commit together
terrain, horizon, flora, map, and collision return no common adoption result
partial preparation has no rollback
first visible mountain frame acknowledgement is absent
```

## Concrete failure risks

```txt
feature lifecycle changes can leave the compiled global cell stale
future feature registration can be ignored because compiled remains true
base sampling can switch before every visible consumer adopts the mountain
map, terrain, horizon, flora, and collision can expose different revisions
manual map tint can diverge from material-zone semantics
collision agreement is implicit and cannot be proven from descriptors
one global cell cannot express bounded feature/cell lifecycle at scale
consumer failure can leave mixed predecessor and successor artifacts
public diagnostics cannot identify the foundation revision fully visible
```

## Staged world-generation gaps retained

```txt
generation advancement remains coupled to visual.update
generation receives no work while the map is open
work budget is unit-count only and has no elapsed-time receipt
completed base arrays install before all consumer adoption is proven
consumer rebuilds are synchronous and unbudgeted
map cache adoption is lazy
no common rollback or first visible adopted-world acknowledgement
```

## Proof gaps

```txt
current feature/foundation test uses stubs rather than pinned Nexus Engine
no real Core World child-domain installation fixture
no actual mountain contribution/channel inspection
no parent world/partition/cell/provider integration fixture
no feature lifecycle recompile or stale-artifact fixture
no material-zone rendering fixture
no explicit collision-channel parity fixture
no near/middle/far fidelity fixture
no Air Mail route/town nonintersection proof
no consumer-failure rollback fixture
no visible terrain/horizon/flora/map/collision revision parity fixture
no first visible mountain frame acknowledgement
no built-dist or Pages feature/foundation fixture
existing tests/world-generation.mjs remains outside npm run check
```

## Required feature/foundation fixtures

```txt
real-engine-core-world-installation
semantic-mountain-normalization
mountain-contribution-channel-manifest
foundation-cell-revision-and-fingerprint
fallback-before-base-ready
base-plus-500m-foundation-height
feature-lifecycle-recompile
stale-artifact-rejected
material-zone-selection
collision-height-parity
near-middle-far-fidelity
route-town-nonintersection
atomic-base-foundation-adoption
consumer-failure-preserves-predecessor
partial-successor-disposal
first-visible-mountain-frame
source-dist-pages-parity
```

## Retained dual-surface gaps

```txt
world and map use independent RAF chains
map visibility precedes first matching map draw proof
map projection reads live simulation and parcel getters
no immutable DualSurfaceFrameEnvelope
no typed world/map projection and common commit result
no partial-frame recovery or first coherent map frame acknowledgement
```

## Retained provider, persistence, and architecture gaps

```txt
Nexus Engine is now immutable-pinned for this runtime, but provider manifest,
integrity result, fallback, and browser/headless admission parity remain absent
no durable save/restore/reset authority or page-lifecycle flush
no unified runtime session owns RAF, listeners, and teardown
simulation remains variable-step at the host boundary
telemetry resources retain mutable references
flight does not admit bounded-world membership
terrain and vegetation generations lack aggregate rollback
HDR and map visible-frame receipts remain incomplete
```

## Documentation state

The `2026-07-13T18-40-52-04-00` Core World feature/foundation adoption audit family is current. The previous staged-generation scheduler/adoption audit remains active and upstream.

## Non-claim

A semantic mountain, resolved elevation, deterministic sampler, and normal-path terrain rebuild do not prove full Core World parent ownership, channel completeness, lifecycle correctness, atomic adoption, collision parity, fidelity realization, rollback, or one visibly coherent mountain revision.
