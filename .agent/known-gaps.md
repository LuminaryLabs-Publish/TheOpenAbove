# Known Gaps: TheOpenAbove

**Last aligned:** `2026-07-13T09-40-27-04-00`

## Primary ordered gaps

```txt
1. map/world dual-surface frame coherence and visible map-open acceptance
2. runtime module/provider admission and immutable source identity
3. session, listener, frame and failure ownership
4. fixed-step clock and sequenced input
5. Air Mail delivery completion lifecycle and mission progression
6. flight/mail session persistence and restore authority
7. telemetry snapshot immutability and public readback isolation
8. procedural world identity and flight membership provenance
9. terrain streaming aggregate ownership and rollback
10. vegetation spatial coverage, adoption and disposal
11. flora exclusion artifact coherence
12. HDR surface and visible-frame coherence
13. parchment-map spatial navigation and accessibility
```

## Dual-surface frame-coherence gaps

```txt
world and map use independent recursive RAF chains
map visibility becomes true before its first matching map draw is proven
map draw reads mutable simulation state through a live getter
map draw reads mutable parcel state through a live getter
no FlightStateRevision
no MailStateRevision
no immutable DualSurfaceFrameEnvelope
no MapTransitionGeneration
no WorldProjectionResult
no MapProjectionResult
no DualSurfaceCommitId or terminal commit result
no partial-frame recovery result
no stale map-callback rejection receipt
no first coherent visible map frame acknowledgement
no map marker fingerprint
no world/map pair in telemetry or GameHost readback
no browser, dist or Pages dual-surface fixtures
```

## Concrete visible risks

```txt
map overlay can expose blank or predecessor canvas pixels for its first visible frame
player marker can cite a different logical instant than the world frame
mail destination marker has no source revision
rapid map open/close can leave unproven callback ordering
world render success can coexist with map projection failure without a common result
public diagnostics cannot prove which surface pair was visible
```

## Required dual-surface fixtures

```txt
immutable-frame-envelope-fingerprint
same-envelope-world-map-projection
open-map-first-frame-not-blank
open-map-player-marker-current
open-map-destination-marker-current
rapid-open-close-stale-callback-rejected
map-resize-revision-admitted
map-projection-failure-preserves-predecessor
world-projection-failure-preserves-predecessor
GameHost-readback-cites-dual-surface-commit
source-dist-pages-dual-surface-parity
```

## Runtime provider-admission gaps

```txt
NexusEngine browser source uses mutable @main
no immutable browser engine identity or provider manifest
no provider fingerprint, integrity result or API-contract probe
no timeout, retry, approved fallback or partial-set rollback
no provider-independent bootstrap rejection surface
no browser/headless exact-revision parity result
no first provider-backed or provider-failure frame acknowledgement
```

## Delivery-completion gaps

```txt
no mail campaign manifest or mission revision
no delivery command/result identity
no exactly-once continuation result
no next-parcel selection
no route-complete or campaign-complete transition
no durable completion-message projection
no destination-marker retirement result
```

## Persistence gaps

```txt
no save, restore or durable reset command
no persistence schema version or generation
no browser storage adapter
no staged write, readback or atomic active-pointer commit
no migration, corrupt-record quarantine or multi-tab writer result
no page-lifecycle flush result
no first visible restored-frame acknowledgement
```

## Retained architecture gaps

```txt
no unified runtime session owns RAF, listeners and teardown
simulation remains variable-step at the host boundary
telemetry resources and journals retain mutable references
no immutable WorldGridArtifact with complete consumer receipts
flight does not admit bounded-world membership
terrain generations lack atomic aggregate adoption
vegetation remains boot-time and centrally bounded
flora chunks lack one shared exclusion artifact revision
HDR attachments and visible-frame receipts remain incomplete
map heading, bounds and focus semantics remain unresolved
```

## Documentation state

The `2026-07-13T09-40-27-04-00` map/world dual-surface frame-coherence audit family is complete in the repo-local `.agent` tree. Central ledger synchronization is recorded separately.

## Non-claim

Two visually functioning canvases, stable pause behavior and repeated RAF callbacks do not prove that the world and map present the same committed state, recover atomically from partial failure or expose a truthful first visible map frame.