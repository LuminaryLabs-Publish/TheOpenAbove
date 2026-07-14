# Gameplay Audit: Ground Contact to Mail Delivery Loop

**Timestamp:** `2026-07-14T17-39-01-04-00`

## Plan ledger

**Goal:** ensure contact settlement precedes and governs every delivery decision.

- [x] Trace input through flight integration, terrain contact and delivery.
- [x] Calculate the Brookhaven grounded-delivery case.
- [x] Define explicit same-step precedence.
- [ ] Implement and test the gameplay authority.

## Current loop

```txt
input
  -> burner, vent and steering state
  -> airstream and buoyancy integration
  -> position advance
  -> terrain clamp to local ground + 30
  -> altitude publication
  -> destination volume check
  -> parcel delivery mutation
  -> presentation and frame
```

## Grounded-delivery case

```txt
Brookhaven safe altitude: 92
Brookhaven tolerance: 72
accepted relative-altitude interval: 20..164
balloon terrain clamp: 30
delta at town center: abs(30 - 92) = 62
62 <= 72 -> current delivery volume reports inside
```

The delivery code checks only the volume. It does not require an airborne state, safe vertical speed, accepted airstream, contact clearance, or settled landing result.

## Required precedence

```txt
terrain/contact sample
  -> contact classification and velocity settlement
  -> impact or landing result
  -> delivery eligibility
  -> accepted delivery or typed rejection
  -> telemetry and presentation
```

An unresolved or grounded contact must not be interpreted as successful Air Mail merely because the position is inside the geometric volume.

## Required gameplay results

```txt
AirborneDeliveryAccepted
GroundedDeliveryRejected
UnsafeAltitudeRejected
HardLandingRejected
ContactUnresolved
TerrainRevisionStale
DuplicateDelivery
DeliveryConflict
```

## Validation boundary

No gameplay implementation was changed and no runtime scenario was executed. The acceptance path is mathematically possible from the current source and Brookhaven configuration.