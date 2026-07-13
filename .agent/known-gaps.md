# Known Gaps: TheOpenAbove

**Last aligned:** `2026-07-13T00-00-02-04-00`

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
page termination can discard dirty progress silently
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

## Required fixtures

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

The `2026-07-13T00-00-02-04-00` repo-local reconciliation family and central ledger/change-log update are complete.

## Non-claim

Snapshot helpers, delivery events and `GameHost` readback are not evidence of durable save, verified restore, migration safety, conflict handling or restored visible-frame coherence.