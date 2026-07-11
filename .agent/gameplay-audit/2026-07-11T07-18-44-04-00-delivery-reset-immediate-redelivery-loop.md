# Gameplay Audit: Delivery Reset Immediate-Redelivery Loop

**Timestamp:** `2026-07-11T07-18-44-04-00`

## Goal

Trace the current delivery-to-reset path and define the gameplay state that must be retired before a new Air Mail run can begin.

## Current loop

```txt
fly into Brookhaven delivery volume
  -> updateDeliveryProgress marks parcel delivered
  -> parcel.deliveredAt stores simulation elapsed
  -> main copies parcel message into simulation message once
  -> subsequent RAFs continue simulation and rendering
```

A caller can then invoke:

```txt
GameHost.mail.reset()
```

That call performs:

```txt
parcel.status = in-transit
parcel.delivered = false
parcel.deliveredAt = null
parcel.selectedAirstreamId = null
parcel.message = initial delivery copy
mail.state.lastEvent = null
```

It does not perform:

```txt
move balloon to mission start
clear velocity, vertical velocity or wind
clear elapsed or distance
clear burner/vent input
clear simulation airstream sample
clear airstream-domain active route and last sample
reset camera state
create a new mission epoch
retire prior delivery proof
prevent delivery admission during restart
```

## Immediate-redelivery defect

```txt
parcel delivered at Brookhaven
  -> GameHost.mail.reset()
  -> balloon remains inside Brookhaven volume
  -> next RAF runs mail.update(...)
  -> destination-volume membership is still true
  -> parcel is delivered again
```

This follows directly from the current rule that destination-volume membership alone commits delivery.

## Additional split-state outcomes

```txt
parcel says in-transit while balloon remains at destination
mail selectedAirstreamId clears while simulation airstream route remains
mail deliveredAt clears while simulation elapsed continues
HUD can show a fresh parcel beside old world/camera state
telemetry has no restart marker
GameHost cannot distinguish original run from partial parcel reset
```

## Required mission phases

```txt
ready
in-transit
approach
 delivered
restarting
failed
```

`restarting` must reject delivery admission until all reset participants have committed.

## Required gameplay restart state

```txt
new missionEpoch
start position and declared initial velocity
elapsed = 0
distance = 0
burner and vent at declared defaults
no held input
ambient or declared initial airstream sample
parcel in transit
no selected route
empty route-proof ledger
no delivery receipt
camera at declared start framing
firstPostResetTickId = 1
```

## Gameplay fixtures

```txt
deliver -> reset -> first tick remains undelivered
deliver -> reset while still physically at town -> staged position prevents redelivery
reset during transit -> clean initial state
reset while holding burner -> held input retired
reset while holding vent -> held input retired
reset twice -> deterministic accepted/no-op policy
old delivery proof after reset -> rejected
old queued command after reset -> rejected
same reset command schedule -> same state fingerprint
```
