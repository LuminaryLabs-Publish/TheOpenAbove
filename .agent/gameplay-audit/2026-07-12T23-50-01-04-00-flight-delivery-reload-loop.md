# Gameplay Audit: Flight Delivery Reload Loop

**Timestamp:** `2026-07-12T23-50-01-04-00`

## Source-backed loop

```txt
boot
  -> default balloon position [0, 105, 0]
  -> default velocity, elapsed=0 and distance=0
  -> new default parcel in-transit

play
  -> flight state mutates every frame
  -> selected current changes in memory
  -> entering destination volume marks parcel delivered once

reload
  -> no save command or lifecycle flush
  -> all state is discarded
  -> next boot recreates default flight and parcel
```

## Gameplay impact

The only authored objective is mail delivery, yet completion is not durable. A player who delivers the parcel and reloads receives a fresh undelivered parcel. A player who is partway through a long flight loses position, altitude, current selection, elapsed time and distance. The runtime also cannot distinguish a deliberate new run from accidental state loss.

## Missing gameplay results

```txt
SessionDirtyResult
SaveCommitResult
RestoreCommitResult
ResetCommitResult
PersistenceConflictResult
PersistenceQuarantineResult
FirstRestoredFrameAck
```

## Required rules

- Delivery completion marks the matching persistence revision dirty.
- An accepted save records both flight and mail state from one predecessor.
- Restore either installs every required participant or installs none.
- Reset replaces the durable active generation, not only live memory.
- Duplicate save/restore commands are idempotent by command ID.
- Stale world or route records are migrated, rejected or quarantined explicitly.

## Non-claim

This audit does not claim autosave is always required. It documents that no save mechanism, explicit save command or durable completion record currently exists.