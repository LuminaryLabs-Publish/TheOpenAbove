# Architecture Audit: Flight Session Persistence Central Reconciliation

**Run:** `2026-07-13T00-00-02-04-00`

## Summary

The runtime has authoritative owners for balloon flight, airstream state and parcel delivery, but no authority coordinates those owners into one durable session generation. Snapshot helpers are projections, not persistence transactions.

## Plan ledger

**Goal:** define the DSK boundary that converts memory-only Air Mail progress into one versioned, verified and atomically restorable session.

- [x] Preserve existing flight, mail, world, telemetry and presentation ownership.
- [x] Keep browser storage outside gameplay kits.
- [x] Define detached participant capture and restore preparation.
- [x] Define durable staging, readback verification, active-generation promotion and backup retention.
- [x] Define migration, quarantine, conflict and lifecycle results.
- [x] Define first-visible-restored-frame proof.
- [ ] Implement the authority and fixtures.

## Current ownership

```txt
balloon simulation
  owns position, velocity, altitude, burner, vent, heading, elapsed and distance

airstream domain
  owns route sampling, capture state and applied flow

mail delivery domain
  owns parcel, destination, selected route, delivery status and completion time

world and route configuration
  owns compatibility-critical generation and authored route data

telemetry/map/render
  consume current live projections

browser host
  currently owns boot and RAF, but no durable save/restore transaction
```

## Required parent domain

```txt
open-above-flight-session-persistence-authority-domain
```

The parent coordinates persistence only. It must not absorb flight integration, mail rules, world generation or renderer ownership.

## DSK composition

```txt
identity and schema
  open-above-session-save-command-kit
  open-above-session-restore-command-kit
  open-above-session-reset-command-kit
  open-above-persistence-schema-kit
  open-above-persistence-generation-kit

candidate construction
  open-above-persistence-participant-snapshot-kit
  open-above-persistence-canonicalization-kit
  open-above-persistence-content-fingerprint-kit
  open-above-persistence-dirty-revision-kit

browser durability
  open-above-browser-storage-adapter-kit
  open-above-persistence-staging-write-kit
  open-above-persistence-readback-verification-kit
  open-above-persistence-atomic-pointer-commit-kit
  open-above-persistence-backup-retention-kit

recovery and concurrency
  open-above-persistence-migration-kit
  open-above-persistence-quarantine-kit
  open-above-persistence-writer-conflict-kit
  open-above-page-lifecycle-flush-kit

results and proof
  open-above-persistence-result-kit
  open-above-restored-visible-frame-ack-kit
  open-above-persistence-fixture-gate-kit
```

## Save transaction

```txt
SaveSessionCommand
  -> validate command, runtime session, writer and expected predecessor
  -> request detached balloon, mail, airstream and compatibility snapshots
  -> validate finite values and cross-references
  -> canonicalize and fingerprint one complete candidate
  -> write a staging generation
  -> read back and verify exact schema, bytes and fingerprint
  -> compare active predecessor again
  -> atomically promote the active pointer
  -> retain one verified backup
  -> publish one terminal SaveCommitResult
```

## Restore transaction

```txt
RestoreSessionCommand
  -> resolve active generation, then bounded backup only when required
  -> parse, verify and migrate supported schemas
  -> quarantine corrupt, incompatible or unsupported records
  -> build every participant candidate outside live ownership
  -> validate world/route compatibility and participant invariants
  -> suspend live mutation
  -> atomically install one persistence generation
  -> publish one RestoreCommitResult
  -> require telemetry, map and renderer adoption receipts
  -> publish first matching RestoredVisibleFrameAck
```

## Core invariants

```txt
accepted save implies verified durable readback
one active generation references one complete participant bundle
partial restore never reaches live simulation or presentation
failed or stale save preserves the verified predecessor
reset invalidates both live and durable predecessor generations
corrupt records never enter gameplay owners
multi-tab conflicts are typed, observable and zero-mutation
visible restored frames cite the installed persistence generation
```

## Dependencies retained

Immutable runtime admission, fixed-step input, telemetry immutability, bounded-world flight membership, terrain/vegetation adoption, map semantics and visible-frame authority remain prerequisites. Persistence must compose with those domains rather than duplicate them.