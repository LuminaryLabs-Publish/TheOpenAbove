# Known Gaps: TheOpenAbove

**Last aligned:** `2026-07-12T23-50-01-04-00`

## Primary ordered gaps

```txt
1. immutable runtime and module admission
2. session, listener, frame and failure ownership
3. fixed-step clock and sequenced input
4. flight/mail session persistence and restore authority
5. telemetry snapshot immutability and public readback isolation
6. procedural world identity and flight membership provenance
7. terrain streaming aggregate ownership and rollback
8. vegetation spatial coverage, adoption and disposal
9. flora exclusion artifact coherence
10. HDR surface and visible-frame coherence
11. parchment map spatial navigation and accessibility
```

## Persistence gaps

```txt
no save, restore or durable reset command
no persistence schema version
no save ID or persistence generation
no runtime/world/route/participant revision bundle
no detached participant snapshot contract
no canonical field ordering
no content fingerprint
no browser storage adapter
no staging generation
no readback verification
no atomic active pointer
no bounded verified backup
no migration registry
no corrupt/incompatible record quarantine
no multi-tab writer identity or conflict result
no dirty gameplay revision
no delivery-triggered or explicit save policy
no pagehide/visibility lifecycle flush result
no atomic multi-participant restore
no restore rollback classification
no restored persistence generation in telemetry/map/render
no first visible restored-frame acknowledgement
no source/build/Pages persistence fixture
```

## Concrete risks

```txt
delivered parcel becomes undelivered after refresh
mid-flight position, altitude, elapsed and distance are lost
selected airstream and current message are lost
future partial restore can render mixed participant generations
future storage failure can be mistaken for a successful save
multiple tabs can silently overwrite newer progress
corrupt or old records can enter runtime without quarantine
reset can diverge between live and durable state
page lifecycle termination can discard dirty progress silently
```

## Retained telemetry and world gaps

```txt
Nexus Engine import remains pinned to @main rather than an immutable revision
no unified runtime session owns RAF, listeners and teardown
simulation remains variable-step at the browser host boundary
telemetry resources and journals retain mutable references
no immutable WorldGridArtifact with complete consumer receipts
flight movement does not admit bounded-world membership
terrain near/horizon generations lack atomic aggregate adoption
vegetation remains boot-time and centrally bounded
flora chunks lack one shared exclusion artifact revision
HDR attachments and visible-frame receipts remain incomplete
map projection has unresolved heading, bounds and focus semantics
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
migration-supported-schema
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

## Documentation completed

```txt
full Publish comparison: completed
selected only TheOpenAbove: completed
new timestamped tracker and audit family: added
required root .agent files: refreshed
central ledger and change log: pending paired central write
```

## Non-claim

Do not treat mail-domain `snapshot()` and `reset()`, balloon telemetry snapshots, a successful delivery event, or public `GameHost` readback as proof of durable save, verified restore, migration safety, conflict handling or restored visible-frame coherence.