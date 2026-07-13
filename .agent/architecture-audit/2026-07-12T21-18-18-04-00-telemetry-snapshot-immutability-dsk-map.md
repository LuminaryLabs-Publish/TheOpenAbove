# Telemetry Snapshot Immutability DSK Map

**Timestamp:** `2026-07-12T21-18-18-04-00`

## Architectural finding

The browser host builds a telemetry object, the telemetry kit installs that object and its nested `visual` object as separate Nexus resources, and public getters return both objects by reference. Resource publication, journal evidence and browser-global readback therefore do not form an immutable read-model boundary.

## Current ownership map

```txt
main.js getSnapshot
  owns construction only

balloon-telemetry-kit
  selects complete and visual projections
  does not assign snapshot identity
  does not clone, normalize or freeze

Nexus world resource store
  stores supplied references
  returns supplied references
  records supplied references in journal rows

engine.openAbove and GameHost
  expose engine-owned references publicly
  provide no mutation rejection or consumer receipt
```

## Required parent domain

```txt
open-above-telemetry-snapshot-immutability-authority-domain
```

This domain owns publication semantics, not gameplay simulation or rendering implementation.

## Required bounded contexts

```txt
snapshot provenance
  runtime session, frame, tick and source revisions

snapshot construction
  detached canonical builder and nested normalization

resource projection
  complete and visual resource schemas and shared snapshot identity

immutability
  deep freeze, structural sharing policy, copy boundaries and alias detection

commit
  atomic multi-resource adoption, predecessor retention and typed result

readback
  public envelope, clone-on-read policy and consumer receipts

journal
  immutable metadata, fingerprints and bounded evidence

presentation proof
  first visible frame acknowledgement citing snapshot identity
```

## Candidate kits

```txt
open-above-telemetry-snapshot-session-kit
open-above-telemetry-frame-id-kit
open-above-telemetry-source-revision-kit
open-above-telemetry-snapshot-id-kit
open-above-telemetry-snapshot-builder-kit
open-above-telemetry-normalization-kit
open-above-telemetry-content-fingerprint-kit
open-above-telemetry-deep-freeze-kit
open-above-telemetry-resource-projection-kit
open-above-visual-snapshot-projection-kit
open-above-telemetry-alias-detector-kit
open-above-telemetry-atomic-commit-kit
open-above-telemetry-readback-envelope-kit
open-above-telemetry-clone-on-read-kit
open-above-telemetry-consumer-receipt-kit
open-above-telemetry-mutation-rejection-kit
open-above-telemetry-observation-kit
open-above-telemetry-immutable-journal-kit
open-above-first-visible-telemetry-frame-ack-kit
```

## Command and result contract

```txt
TelemetrySnapshotCommand {
  runtimeSessionId
  frameId
  expectedPredecessorSnapshotId
  sourceRevisions
  simulationProjection
  mailProjection
  airstreamProjection
  worldProjection
  visualProjection
  mapProjection
}

TelemetrySnapshotCommitResult {
  status
  snapshotId
  predecessorSnapshotId
  frameId
  contentFingerprint
  resourceRevisions
  publicReadbackRevision
  journalSequence
  rejectionReason
}
```

## Required flow

```txt
validate command and predecessor
  -> build detached canonical candidate
  -> normalize nested arrays and objects
  -> derive complete and visual projections
  -> detect prohibited writable aliasing
  -> fingerprint candidate
  -> freeze or establish explicit copy boundaries
  -> atomically install all resource projections
  -> publish terminal commit result
  -> expose immutable public envelope
  -> append immutable journal row
  -> acknowledge first matching visible frame
```

## Invariants

```txt
one snapshot ID identifies every projection from one publication
no public getter returns writable engine-owned state
no journal row can change after append
resource projections cannot partially commit
a rejected candidate performs zero live mutation
predecessor remains readable until successor commit succeeds
visible acknowledgement cites a committed snapshot and frame
```

## Composition guidance

The parent authority should coordinate existing simulation, mail, airstream, world, visual and map snapshot providers without absorbing their domain logic. Each provider supplies a detached projection and source revision. The telemetry domain validates and commits those projections as one read model.
