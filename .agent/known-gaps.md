# Known Gaps: TheOpenAbove

**Last aligned:** `2026-07-13T13-39-10-04-00`

## Primary ordered gaps

```txt
1. staged world-generation scheduler and consumer adoption authority
2. map/world dual-surface frame coherence and visible map-open acceptance
3. runtime module/provider admission and immutable source identity
4. session, listener, frame and failure ownership
5. fixed-step clock and sequenced input
6. Air Mail delivery completion lifecycle and mission progression
7. flight/mail session persistence and restore authority
8. telemetry snapshot immutability and public readback isolation
9. procedural world identity and flight membership provenance
10. terrain streaming aggregate ownership and rollback
11. vegetation spatial coverage, adoption and disposal
12. flora exclusion artifact coherence
13. HDR surface and visible-frame coherence
14. parchment-map spatial navigation and accessibility
```

## Staged world-generation gaps

```txt
generation advancement is coupled to visual.update
generation receives no work while the map is open
work budget is unit-count only and has no elapsed-time receipt
completed candidate arrays are installed before consumer adoption is proven
ready listeners directly refresh vegetation, grass and flowers
terrain refresh and chunk rebuild are synchronous
local grass and flower rebuilds are synchronous
map cache adoption is lazy and separate
no consumer registry or dependency order
no per-consumer prepare result
no adoption plan or commit ID
no rollback after listener or rebuild failure
no first visible adopted-world acknowledgement
no active-versus-visible revision readback
no consumer adoption frame-time budget
```

## Concrete failure risks

```txt
map-open can stall generation indefinitely
completion can produce one large rebuild frame
listener failure can mark generation failed after successor sampling is active
some consumers can be cleared while others remain predecessor state
map cache can remain on predecessor revision until a later draw
public diagnostics cannot prove which world revision was fully visible
```

## Proof gaps

```txt
tests/world-generation.mjs is not invoked by npm run check
headless:world checks source markers then runs the unrelated check chain
no browser map-open progress fixture
no consumer-failure injection fixture
no completion-frame budget fixture
no visible sampling/terrain/vegetation/flora/map parity fixture
no built-dist or Pages staged-generation fixture
```

## Required staged-generation fixtures

```txt
identical-seed-output
staged-equals-synchronous
first-frame-fallback
phase-order-monotonic-progress
map-open-progress-continues
reset-retains-predecessor
stale-attempt-rejected
consumer-prepare-dependency-order
consumer-failure-preserves-predecessor
partial-successor-disposal
atomic-adoption-commit
first-visible-adopted-world-revision
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

## Retained provider, persistence and architecture gaps

```txt
NexusEngine browser source remains mutable @main
no immutable provider manifest, integrity result or browser/headless parity
no durable save/restore/reset authority or page-lifecycle flush
no unified runtime session owns RAF, listeners and teardown
simulation remains variable-step at the host boundary
telemetry resources retain mutable references
flight does not admit bounded-world membership
terrain and vegetation generations lack aggregate rollback
HDR and map visible-frame receipts remain incomplete
```

## Documentation state

The `2026-07-13T13-39-10-04-00` staged world-generation scheduler/adoption audit family is current. Central synchronization is recorded separately.

## Non-claim

A deterministic core candidate, monotonic progress and a normal-path same-callback rebuild do not prove continuous scheduling, bounded adoption cost, failure rollback or one visibly coherent successor world.