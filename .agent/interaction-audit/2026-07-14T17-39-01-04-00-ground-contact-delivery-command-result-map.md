# Interaction Audit: Ground Contact and Delivery Command Results

**Timestamp:** `2026-07-14T17-39-01-04-00`

## Plan ledger

**Goal:** replace implicit position mutation and boolean delivery with typed, correlated commands and results.

- [x] Map current implicit command flow.
- [x] Define required identities and terminal result classes.
- [x] Define stale, duplicate and conflict handling.
- [ ] Implement the command/result surfaces.

## Current implicit map

```txt
browser key events
  -> mutable key Set
  -> simulation.update(dt)
  -> mutable position and velocity
  -> implicit terrain clamp
  -> mail.update(position, airstream, elapsed)
  -> mutable parcel.delivered
  -> optional mail-delivered event
```

The current flow has no command ID, step ID, contact result ID, expected revision or delivery-result fingerprint.

## Required command map

```txt
FlightStepCommand
  RunId
  StepId
  expectedFlightRevision
  dt
  inputRevision

GroundContactSettlementCommand
  RunId
  StepId
  terrainRevision
  terrainSampleId
  preContactPosition
  preContactVelocity

MailDeliveryEligibilityCommand
  RunId
  StepId
  parcelRevision
  routeRevision
  destinationRevision
  contactRevision
  deliveryVolumeRevision
```

## Required result map

```txt
GroundContactResult
  Airborne
  SoftLanding
  HardLanding
  Grounded
  StaleTerrain
  Duplicate
  Conflict
  Failed

MailDeliveryEligibilityResult
  Accepted
  RejectedGrounded
  RejectedUnsafeAltitude
  RejectedHardLanding
  ContactUnresolved
  Stale
  Duplicate
  Conflict
  Failed
```

## Admission rules

```txt
one accepted contact result per RunId + StepId
one accepted parcel completion per parcel revision
contact settlement must precede delivery admission
late predecessor results cannot mutate current parcel state
accepted delivery must cite the exact ContactRevision
presentation and telemetry must cite the accepted result ID
```

## Validation boundary

No commands or result schemas currently exist in source. This document specifies the missing interaction contract only.