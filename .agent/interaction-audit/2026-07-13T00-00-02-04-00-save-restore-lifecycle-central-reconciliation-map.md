# Interaction Audit: Save, Restore and Lifecycle Admission

**Run:** `2026-07-13T00-00-02-04-00`

## Summary

The browser host has no bounded save, restore or reset command route. Lifecycle termination is therefore silent, and public `GameHost` exposes observation but no typed persistence transaction.

## Plan ledger

**Goal:** admit persistence operations through explicit commands with identity, predecessor checks and terminal results.

- [x] Identify current browser and public-host interaction surfaces.
- [x] Confirm no save/restore/reset command exists.
- [x] Define command admission, result and lifecycle boundaries.
- [x] Define zero-mutation rejection for stale or invalid requests.
- [ ] Implement the bounded command surface.

## Current map

```txt
keyboard events -> balloon held-key state -> simulation mutation
map input -> map/camera presentation mutation
GameHost.getState -> observational snapshot
pagehide/navigation -> no persistence command
boot -> no restore command
```

## Required interaction map

```txt
explicit save or autosave trigger
  -> SessionSaveCommandEnvelope
  -> validate runtime session, command ID, writer and expected predecessor
  -> SaveSessionCommand
  -> SaveCommitResult

boot or explicit restore
  -> SessionRestoreCommandEnvelope
  -> validate runtime session and requested generation
  -> RestoreSessionCommand
  -> RestoreCommitResult
  -> first-restored-frame acknowledgement

reset
  -> SessionResetCommandEnvelope
  -> validate exact active generation
  -> commit reset generation/tombstone
  -> SessionResetResult

pagehide or visibility policy
  -> publish LifecycleFlushAttemptResult
  -> never claim durable success without verified commit completion
```

## Typed rejection classes

```txt
invalid-command
stale-runtime-session
stale-predecessor
writer-conflict
invalid-participant-state
incompatible-world-or-route
storage-unavailable
staging-write-failed
readback-mismatch
unsupported-schema
corrupt-record-quarantined
restore-install-failed
lifecycle-budget-expired
```

Every rejection must preserve the current live and durable predecessor and publish one terminal result.

## Public host boundary

`window.GameHost` should expose bounded `saveSession`, `restoreSession`, `resetSession` and immutable result/read-model methods, not raw storage or participant mutation.

## Non-claim

No input, lifecycle or public-host behavior changed.