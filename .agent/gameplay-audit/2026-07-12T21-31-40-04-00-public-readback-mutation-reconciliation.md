# Gameplay Audit: Public Readback Mutation Reconciliation

**Timestamp:** `2026-07-12T21-31-40-04-00`

## Summary

`GameHost.getState()` returns the Nexus `BalloonSnapshot` object alongside a fresh local snapshot. The Nexus object is engine-owned and mutable, so diagnostics or automation can change mail, map, terrain, visual or simulation-derived fields without any gameplay command or tick.

## Plan ledger

**Goal:** preserve gameplay truth by making public readback detached, immutable and revisioned.

- [x] Trace the `GameHost.getState()` return path.
- [x] Confirm the Nexus branch is the stored resource reference.
- [x] Confirm no consumer identity or mutation boundary exists.
- [x] Record the zero-mutation requirement for rejected writes.
- [ ] Implement immutable readback envelopes and mutation fixtures.

## Reachable loop

```txt
engine tick publishes BalloonSnapshot
  -> GameHost.getState().nexusEngine returns the stored object
  -> external consumer changes nested mail, map, terrain or visual data
  -> engine resource now exposes changed values
  -> no gameplay command, event, revision or visible frame explains the change
```

The fresh `local` branch does not repair the Nexus branch or prove which projection is authoritative.

## Required readback contract

```txt
TelemetryReadbackRequest
  -> identify consumer and expected snapshot revision
  -> return immutable envelope or detached compatibility projection
  -> include snapshotId, frameId, schemaVersion and fingerprint
  -> reject stale or malformed expectations without mutation
```

## Required invariant

```txt
public callers cannot mutate engine-owned gameplay or telemetry state
```

## Validation boundary

Documentation only. No gameplay logic, public API behavior or browser host implementation changed.