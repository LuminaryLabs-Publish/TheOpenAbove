# Interaction Audit: Snapshot Publication and Readback Reconciliation

**Timestamp:** `2026-07-12T21-31-40-04-00`

## Summary

The interaction boundary currently treats telemetry publication as direct object assignment and public readback as direct object return. There is no command identity, expected predecessor, consumer receipt or typed rejection between snapshot construction, Nexus storage and external access.

## Plan ledger

**Goal:** convert snapshot publication and readback into explicit command/result interactions with zero mutation on rejection.

- [x] Map snapshot provider to Nexus resource publication.
- [x] Map engine and `GameHost` readback paths.
- [x] Identify missing command, revision and consumer boundaries.
- [x] Define accepted and rejected interaction results.
- [ ] Implement command handlers and executable stale/mutation fixtures.

## Current interaction map

```txt
getSnapshot()
  -> mutable object
  -> world.setResource(BalloonSnapshot, object)
  -> world.setResource(VisualSnapshot, object.visual)
  -> engine.openAbove getters
  -> GameHost getter
  -> arbitrary external object access
```

## Required publication interaction

```txt
TelemetrySnapshotCommand {
  runtimeSessionId,
  frameId,
  expectedPredecessorSnapshotId,
  sourceRevisions,
  candidate
}

TelemetrySnapshotCommitResult {
  status,
  snapshotId,
  schemaVersion,
  contentFingerprint,
  completeResourceRevision,
  visualResourceRevision
}
```

## Required readback interaction

```txt
TelemetryReadbackRequest {
  consumerId,
  expectedSnapshotId?,
  projection
}

TelemetryReadbackResult {
  status,
  immutableEnvelope,
  snapshotId,
  contentFingerprint
}
```

## Rejection classes

```txt
invalid source revision
stale predecessor
writable cross-resource alias
normalization failure
fingerprint mismatch
consumer expectation mismatch
mutation attempt
```

Every rejection must produce zero resource, journal, gameplay, render or navigation mutation.

## Validation boundary

Documentation only. No runtime command surface or public API changed.