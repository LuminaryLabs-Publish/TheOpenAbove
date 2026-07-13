# Deploy Audit: Session Persistence Fixture Gate

**Timestamp:** `2026-07-12T23-50-01-04-00`

## Current proof boundary

`npm run check` executes static, terrain-streaming, route-protection and terrain-overlay tests. It does not instantiate browser storage or prove save/restore behavior.

## Required pure fixtures

```txt
canonical-save-determinism
save-fingerprint-stability
finite-balloon-state-validation
mail-route-reference-validation
failed-candidate-preserves-predecessor
stale-save-zero-mutation
migration-supported-schema
unsupported-schema-quarantine
corrupt-record-quarantine
reset-durable-convergence
```

## Required browser fixtures

```txt
save-mid-flight-reload-restores-position
save-after-delivery-reload-remains-delivered
pagehide-flush-result-is-truthful
visibility-resume-does-not-duplicate-restore
multi-tab-writer-conflict
active-record-corruption-uses-verified-backup
partial-restore-never-renders
first-restored-frame-cites-generation
GameHost-save-restore-command-results
```

## Build and Pages gate

The same record schema, storage key policy, migration set and fingerprints must be exercised against source, built output and GitHub Pages. A source-only fixture cannot prove deployed storage-path behavior.

## Pass conditions

- Every accepted save is readback-verified.
- Every restore identifies the installed generation.
- Corrupt or incompatible data is quarantined with a typed reason.
- Multi-tab conflicts do not silently overwrite a newer generation.
- The first visible restored frame matches the restore receipt.
- Reset cannot resurrect the predecessor record after reload.

## Current state

No persistence fixture exists and no command was run in this documentation pass.