# Central Sync Audit: Oldest-Selection Device-Control Reconciliation

**Timestamp:** `2026-07-15T16-58-19-04-00`  
**Status:** `device-control-action-coverage-authority-central-reconciled`

## Summary

The complete accessible Publish inventory contains 11 repositories. `TheCavalryOfRome` was excluded. The remaining ten repositories all had central ledger entries, root `.agent` state, and `main` heads identical to their documented repo-local heads. TheOpenAbove had the oldest central timestamp and was the only repository selected.

## Plan ledger

**Goal:** preserve one-project-at-a-time selection and bind the new repo-local device-control audit to the central ledger and change log.

- [x] Enumerate the current Publish inventory.
- [x] Compare all eligible repository names with central ledger paths.
- [x] Compare all eligible documented heads with `main`.
- [x] Confirm no higher-priority new, missing, undocumented, or runtime-ahead case.
- [x] Select only TheOpenAbove.
- [x] Add the timestamped repo-local audit family.
- [x] Prepare the central TheOpenAbove ledger update with the final repo-local documentation head.
- [x] Prepare the central internal change-log entry.

## Comparison result

```txt
inventory: 11
eligible: 10
central ledgers: 10
root .agent states: 10
synchronized heads: 10
new: 0
ledger missing: 0
root agent missing: 0
runtime ahead: 0
selected: LuminaryLabs-Publish/TheOpenAbove
excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

## Timestamp order

```txt
TheOpenAbove       2026-07-15T12-02-38-04-00
ZombieOrchard      2026-07-15T12-39-01-04-00
TheUnmappedHouse   2026-07-15T12-59-24-04-00
PhantomCommand     2026-07-15T13-41-25-04-00
AetherVale         2026-07-15T14-01-52-04-00
TheLongHaul        2026-07-15T14-40-11-04-00
MyCozyIsland       2026-07-15T15-01-22-04-00
IntoTheMeadow      2026-07-15T15-41-21-04-00
PrehistoricRush    2026-07-15T16-00-32-04-00
HorrorCorridor     2026-07-15T16-39-06-04-00
```

## Central records

```txt
repo-ledger/LuminaryLabs-Publish/TheOpenAbove.md
internal-change-log/2026-07-15T16-58-19-04-00-the-open-above-device-control-action-coverage.md
```

## Validation boundary

This record confirms selection, source synchronization, and documentation reconciliation only. It does not claim runtime device support, successful browser fixtures, artifact parity, Pages parity, or production readiness.
