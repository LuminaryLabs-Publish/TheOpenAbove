# Gameplay Audit: Delivery Event to Visible Frame Loop

**Timestamp:** `2026-07-11T14-50-59-04-00`

## Summary

Mail delivery mutates parcel state during the simulation-side portion of the RAF. Telemetry can publish the delivered parcel before any receipt proves that Brookhaven delivery is visible on the canvas and HUD.

## Plan ledger

**Goal:** make the delivery result and its first visible frame one correlated exactly-once gameplay outcome.

- [x] Trace parcel update.
- [x] Trace delivery event handling.
- [x] Trace state message mutation.
- [x] Trace telemetry, render and HUD ordering.
- [x] Define first-visible-frame proof.

## Current delivery loop

```txt
simulation.update
  -> mail.update(position airstream elapsed)
  -> updateDeliveryProgress may mutate parcel to delivered
  -> delivery event returned
  -> simulation message changed
  -> telemetry snapshots delivered parcel
  -> render current scene
  -> HUD writes Delivered to Brookhaven
```

## Missing authority

```txt
DeliveryResult ID
source simulation tick
mission epoch
correct-current proof identity
exactly-once commit receipt
render frame consuming delivery state
HUD acknowledgement
telemetry acknowledgement
first-visible-frame receipt
```

## Required gameplay result

```txt
CommittedDeliveryOutcome
  deliveryResultId
  parcelId
  destinationTownId
  routeId
  correctAirstreamProofId
  missionEpoch
  simulationTickId
  firstVisibleRenderFrameId
  HUDProjectionRevision
  observationFingerprint
```

A reset, restart or stale frame must not reuse predecessor delivery proof.
