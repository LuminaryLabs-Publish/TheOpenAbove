# Observation Authority Audit: Committed Snapshot and Consumer Acknowledgement Contract

**Timestamp:** `2026-07-11T14-50-59-04-00`

## Summary

A committed observation is not a copy of mutable state at an arbitrary line in the RAF. It is the result of a barrier proving that every required consumer processed the same source tick, delivery result and render frame.

## Plan ledger

**Goal:** define admission, acknowledgement, commit, rejection and retention semantics for public frame observations.

- [x] Define observation envelope.
- [x] Define required consumer set.
- [x] Define acknowledgement key.
- [x] Define commit barrier.
- [x] Define stale and duplicate behavior.
- [x] Define bounded retention.

## Observation envelope

```txt
CommittedObservation
  schemaVersion
  observationRevision
  runtimeSessionId
  missionEpoch
  simulationTickId
  renderFrameId
  deliveryResultId
  productFingerprint
  routeFingerprint
  stateFingerprint
  frameFingerprint
  simulationSnapshot
  deliverySnapshot
  visualSnapshot
  rendererDiagnostics
  hudProjection
  consumerAcknowledgements
```

## Acknowledgement key

```txt
runtimeSessionId
missionEpoch
renderFrameId
consumerId
consumerGeneration
projectionRevision
```

## Admission outcomes

```txt
accepted
duplicate
rejected-stale-session
rejected-stale-epoch
rejected-unknown-frame
rejected-consumer-generation
rejected-projection-revision
rejected-fingerprint-mismatch
```

## Commit outcomes

```txt
committed
waiting-required-consumer
rejected-partial
rejected-stale
rejected-cross-epoch
rolled-back
```

## Retention

```txt
latest committed observation
small bounded observation journal
small bounded rejection journal
no live Three.js objects
no functions
no DOM nodes
no renderer resources
```
