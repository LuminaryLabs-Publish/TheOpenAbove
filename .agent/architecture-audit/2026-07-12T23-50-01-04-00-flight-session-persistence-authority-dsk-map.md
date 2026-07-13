# Architecture Audit: Flight Session Persistence Authority DSK Map

**Timestamp:** `2026-07-12T23-50-01-04-00`

## Summary

The current composition has flight, mail, world, render and telemetry domains but no owner for durable session state. Boot constructs mutable defaults directly, so persistence must be introduced as an explicit cross-domain transaction rather than hidden inside the mail or browser host kits.

## Parent domain

```txt
open-above-flight-session-persistence-authority-domain
```

## Domain boundary

Owns:

```txt
save/restore/reset command admission
session and persistence generation identity
participant snapshot contracts
canonical schema and fingerprint
browser storage staging and verified promotion
backup, migration, quarantine and conflict results
page-lifecycle flush policy
restore installation and first-visible-frame acknowledgement
```

Does not own:

```txt
balloon integration
airstream physics
mail delivery rules
world generation
camera behavior
render implementation
telemetry formatting
```

## DSK composition

```txt
flight-session-persistence-authority-domain
  session-save-command-kit
  session-restore-command-kit
  session-reset-command-kit
  persistence-schema-kit
  persistence-participant-snapshot-kit
  persistence-canonicalization-kit
  persistence-content-fingerprint-kit
  persistence-generation-kit
  browser-storage-adapter-kit
  persistence-staging-write-kit
  persistence-readback-verification-kit
  persistence-atomic-pointer-commit-kit
  persistence-backup-retention-kit
  persistence-migration-kit
  persistence-quarantine-kit
  persistence-writer-conflict-kit
  persistence-dirty-revision-kit
  page-lifecycle-flush-kit
  persistence-result-kit
  restored-visible-frame-ack-kit
  persistence-fixture-gate-kit
```

## Participant contracts

```txt
balloon simulation:
  position, velocity, wind, verticalVelocity, altitude, burner, vent,
  heading, elapsed, distance, lateral trim and airstream observation

mail delivery:
  routeId, parcelId, destination, selected current, status,
  delivered, deliveredAt and message

airstream:
  route catalog revision and current sample identity

world:
  world-generation and surface revisions

camera/presentation:
  optional view state, never authoritative gameplay state

telemetry/render:
  consume committed persistence generation and publish receipts
```

## Required transaction

```txt
accepted SaveSessionCommand
  -> freeze expected session/world/route/participant revisions
  -> collect detached participant snapshots
  -> canonicalize and fingerprint
  -> stage bytes under a new generation
  -> read back and verify
  -> compare writer and predecessor
  -> atomically promote active pointer
  -> publish SaveCommitResult

accepted RestoreSessionCommand
  -> verify active or backup generation
  -> migrate or quarantine
  -> prepare all participant candidates
  -> validate cross-participant compatibility
  -> atomically install one session generation
  -> publish RestoreCommitResult
  -> acknowledge first visible restored frame
```

## Architectural rule

A mail kit may expose snapshot/load adapters, but it must not own browser storage. The browser adapter may write bytes, but it must not decide gameplay validity. The persistence authority coordinates both through typed results and exact revisions.