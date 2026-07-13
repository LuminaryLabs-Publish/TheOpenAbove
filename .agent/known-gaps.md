# Known Gaps: TheOpenAbove

**Last aligned:** `2026-07-13T02-18-03-04-00`

## Primary ordered gaps

```txt
1. immutable runtime and module admission
2. session, listener, frame and failure ownership
3. fixed-step clock and sequenced input
4. Air Mail delivery completion lifecycle and mission progression
5. flight/mail session persistence and restore authority
6. telemetry snapshot immutability and public readback isolation
7. procedural world identity and flight membership provenance
8. terrain streaming aggregate ownership and rollback
9. vegetation spatial coverage, adoption and disposal
10. flora exclusion artifact coherence
11. HDR surface and visible-frame coherence
12. parchment map spatial navigation and accessibility
```

## Delivery-completion gaps

```txt
no mail campaign manifest or content version
no mission, route or parcel revision
no command ID or delivery-attempt ID
no expected-predecessor admission
no immutable delivery evidence record
no exactly-once DeliveryCompletionResult
no duplicate-result cache
no stale-attempt zero-mutation result
no explicit required-current policy result
no next-parcel selection
no route-complete state or result
no campaign-complete state or result
no explicit replay or reset command
no bounded delivery journal
no durable completion-message projection
no completion-message acknowledgement or lifetime policy
no map destination-marker retirement
no Three.js town-marker retirement
no telemetry or GameHost completion receipt
no first visible completion-frame acknowledgement
no pure/browser/build/Pages completion fixtures
```

## Concrete completion risks

```txt
mail-delivered confirmation disappears on the next flight update
delivered Brookhaven remains labelled MAIL DESTINATION on the map
delivered Brookhaven marker continues pulsing in the Three.js scene
player can continue indefinitely with no new objective or explicit completed state
three visible towns can be mistaken for a configured three-stop campaign
direct parcel reset could erase completion without advancing mission truth
future next-parcel logic could partially update state and presentation
future duplicate delivery observations could double-advance progression
completion cannot be replayed or correlated to a visible frame
```

## Persistence gaps

```txt
no save, restore or durable reset command
no persistence schema version
no save ID, writer ID or persistence generation
no detached participant snapshot/load-candidate contract
no canonical field ordering or content fingerprint
no browser storage adapter
no staging generation or readback verification
no atomic active pointer or verified backup
no migration registry or corrupt-record quarantine
no multi-tab writer conflict result
no dirty gameplay revision or autosave policy
no pagehide/visibility lifecycle flush result
no atomic multi-participant restore
no truthful restore rollback classification
no persistence generation in telemetry, map or render frames
no first visible restored-frame acknowledgement
no pure/browser/build/Pages persistence fixtures
```

## Retained architecture gaps

```txt
Nexus Engine import remains pinned to @main
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

## Required completion fixtures

```txt
campaign-manifest-reference-validation
one-delivery-one-result
same-command-id-same-result
stale-mission-zero-mutation
outside-volume-rejected
wrong-current-policy-result
completion-message-survives-next-frame
map-destination-retires
town-marker-retires
next-parcel-activates-atomically
last-parcel-completes-route
last-route-completes-campaign
reset-increments-mission-revision
replay-reproduces-transition
first-completion-frame-cites-revision
save-reload-preserves-completion
source-build-pages-completion-parity
```

## Required persistence fixtures

```txt
canonical-save-determinism
save-fingerprint-stability
finite-balloon-state-validation
mail-route-reference-validation
save-after-delivery-reload-remains-delivered
save-mid-flight-reload-restores-position
failed-candidate-preserves-predecessor
stale-save-zero-mutation
supported-schema-migration
unsupported-schema-quarantine
corrupt-record-quarantine
verified-backup-recovery
multi-tab-writer-conflict
pagehide-flush-result-truth
reset-durable-convergence
partial-restore-never-renders
first-restored-frame-cites-generation
source-build-pages-persistence-parity
```

## Documentation state

The `2026-07-13T02-18-03-04-00` delivery-completion audit family is complete in the repo-local `.agent` tree. Central ledger synchronization is recorded separately.

## Non-claim

A one-shot `mail-delivered` event, a mutable parcel flag and a direct reset helper do not prove mission progression, stable completion presentation, safe continuation, replay, persistence or visible-frame coherence.