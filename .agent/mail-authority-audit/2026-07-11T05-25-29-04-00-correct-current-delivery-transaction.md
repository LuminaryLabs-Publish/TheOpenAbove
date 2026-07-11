# Mail Authority Audit: Correct-Current Delivery Transaction

**Timestamp:** `2026-07-11T05-25-29-04-00`

## Goal

Define the missing transaction that turns route traversal and destination-volume membership into an authoritative delivery result.

## Current source

```txt
routeId: meadow-mail-run
parcelId: parcel-001
destinationTownId: brookhaven
correctAirstreamId: meadow-to-brookhaven
towns: brookhaven, sunvale, cloudmere
```

## Current mutation path

```txt
airstream influence >= 0.35
  -> selectedAirstreamId = current route

destination town lookup
  -> sample ground-relative delivery volume

inside destination volume and not delivered
  -> status = delivered
  -> delivered = true
  -> deliveredAt = elapsed
  -> emit mail-delivered object
```

## Critical gap

`correctAirstreamId` is never passed into `updateDeliveryProgress()` and never compared with the current or selected route. Delivery succeeds from physical arrival alone.

## Required preflight

```txt
manifest valid
mission phase allows delivery
parcel and destination identities match active epoch
correct route exists
route proof belongs to current epoch
proof contains accepted entry and retained traversal
proof reaches declared progress threshold
volume sample is inside destination bounds
parcel is not already delivered
```

## Required results

Accepted:

```txt
status: accepted
reason: delivery-complete
deliveryTransactionId
missionEpoch
parcelId
destinationTownId
correctAirstreamId
routeProofStartTick
routeProofEndTick
volumeSample
committedTick
stateFingerprint
```

Rejected examples:

```txt
wrong-current
ambient-arrival
insufficient-route-dwell
insufficient-route-progress
stale-route-proof
wrong-destination
already-delivered
invalid-manifest
```

No-op examples:

```txt
outside-delivery-volume
mission-not-active
```

## Reset transaction

`ResetMailRun` must:

```txt
retire current mission epoch
clear selected route and traversal rows
clear delivery result and receipt
clear held input through session authority
restore parcel in-transit state
return balloon to declared spawn or declared reset state
publish one reset receipt
```

## Fixture gate

```txt
Brookhaven current plus valid volume completes once
Sunvale current plus Brookhaven volume rejects as wrong-current
Cloudmere current plus Brookhaven volume rejects as wrong-current
ambient arrival rejects as ambient-arrival
stale proof rejects after reset
repeat delivery returns already-delivered or no-op without mutation
```