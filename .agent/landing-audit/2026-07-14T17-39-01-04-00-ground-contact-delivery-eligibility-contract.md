# Landing Audit: Ground Contact and Delivery Eligibility Contract

**Timestamp:** `2026-07-14T17-39-01-04-00`

## Plan ledger

**Goal:** define the invariants that prevent terrain contact from being mistaken for valid airborne delivery.

- [x] Define contact states.
- [x] Define delivery-clearance invariants.
- [x] Define same-step settlement order.
- [x] Define rollback and stale-result handling.
- [ ] Implement and execute the contract.

## Contact states

```txt
Airborne
  clearance above terrain exceeds the contact threshold

SoftLanding
  terrain contact occurs within accepted vertical and horizontal limits

HardLanding
  terrain contact exceeds the impact policy

Grounded
  position is settled on the terrain clearance plane after contact
```

## Invariants

```txt
1. Position, verticalVelocity and velocity.y settle under one ContactRevision.
2. A delivery command must cite an accepted ContactRevision for the same step.
3. Grounded and HardLanding states are not eligible for airborne parcel completion.
4. Unresolved or stale terrain samples cannot authorize delivery.
5. Delivery geometry alone is insufficient; contact and clearance policy are mandatory.
6. One parcel can accept one completion result.
7. Telemetry, message text and the first visible result frame cite the same result ID.
```

## Same-step order

```txt
integrate flight candidate
  -> sample terrain once
  -> classify and settle contact
  -> publish ContactRevision
  -> sample destination volume
  -> apply mail clearance policy
  -> publish delivery or rejection result
  -> update presentation
```

## Failure and rollback

```txt
terrain sample failure -> reject candidate step
contact conflict -> preserve accepted predecessor
mail admission failure -> preserve parcel in transit
presentation failure -> retain gameplay result and report missing frame ack
stale result -> retire without mutation
```

## Current violation

The current source clamps the balloon to terrain clearance and immediately evaluates the delivery volume. Brookhaven's altitude band includes the clamp altitude, so the geometric result can be `inside` while the balloon is grounded.

## Validation boundary

Contract only. No physics, gameplay, rendering or persistence implementation changed.