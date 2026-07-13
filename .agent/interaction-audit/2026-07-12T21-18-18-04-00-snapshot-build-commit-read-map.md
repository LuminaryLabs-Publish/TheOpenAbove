# Snapshot Build, Commit and Read Map

**Timestamp:** `2026-07-12T21-18-18-04-00`

## Current interaction map

```txt
RAF frame
  -> visual and gameplay domains mutate live state
  -> getSnapshot() gathers provider snapshots
  -> telemetry system accepts object without validation
  -> world.setResource stores complete object reference
  -> world.setResource stores nested visual reference
  -> world.emit publishes selected primitive fields
  -> engine.openAbove getters return stored references
  -> GameHost returns the complete stored reference
```

## Missing interaction results

```txt
SnapshotBuildResult
SnapshotNormalizationResult
SnapshotAliasValidationResult
TelemetrySnapshotCommitResult
PublicReadbackResult
ConsumerReceipt
MutationRejectionResult
FirstTelemetryVisibleFrameAck
```

## Proposed command map

```txt
PublishTelemetrySnapshotCommand
  actor: runtime session
  expected predecessor: snapshot ID
  sources: simulation, airstream, mail, map, world, visual

BuildTelemetrySnapshotResult
  detached candidate
  source revisions
  normalization observations

CommitTelemetrySnapshotCommand
  candidate fingerprint
  expected predecessor

TelemetrySnapshotCommitResult
  committed or rejected
  complete/visual resource revisions
  public readback revision

ReadTelemetrySnapshotCommand
  consumer ID
  requested snapshot ID or latest

TelemetryReadbackResult
  immutable envelope
  snapshot ID
  age and visible-frame status
```

## Failure handling

```txt
provider snapshot throws
  -> candidate rejected
  -> predecessor remains current

normalization detects unsupported value
  -> typed rejection
  -> zero resource mutation

writable cross-resource alias detected
  -> copy or immutable-share under policy
  -> otherwise reject

resource commit fails
  -> complete and visual resources remain predecessor pair

external mutation attempted
  -> frozen data rejects or detached clone absorbs mutation
  -> engine-owned resources remain unchanged
```

## Consumer rules

```txt
GameHost is a read-model adapter, not an owner
editor/debug readers receive immutable envelopes
render telemetry cites the visible frame when acknowledged
stale snapshots remain readable only with explicit identity
resource journal stores fingerprints and detached metadata
```
