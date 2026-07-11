# Gameplay Audit: Altitude Route Delivery Loop

**Timestamp:** `2026-07-11T05-25-29-04-00`

## Goal

Describe the executable player loop and separate physical route following from authoritative mission progress.

## Current loop

```txt
carry Brookhaven parcel
  -> inspect visible currents at low, middle and high altitude
  -> burner climbs
  -> vent descends
  -> field selects the strongest route influence
  -> route velocity pulls balloon horizontally
  -> mail progress stores the latest influential route
  -> balloon reaches Brookhaven volume
  -> parcel becomes delivered
```

## What works

```txt
no direct left/right steering
three altitude-separated routes
route velocities point toward different towns
visible route ribbons and moving wisps
balloon force consumes the field
three town landmarks and delivery rings
one-shot parcel delivery
pure deterministic field tests
```

## Gameplay authority gap

The declared correct route is `meadow-to-brookhaven`, but completion only tests Brookhaven volume membership. The game therefore rewards destination arrival, not the intended decision sequence:

```txt
read parcel
observe currents
choose altitude
enter correct current
remain in correct current
exit near destination
descend into delivery volume
```

## Required progress model

```txt
ready
  -> in-transit
  -> correct-current-entered
  -> correct-current-retained
  -> destination-approach
  -> delivered

failure or reset
  -> restarting
  -> new mission epoch
  -> ready
```

## Required evidence

```txt
stable route-entry tick
minimum influence threshold
minimum dwell or segment progression
correct route ID
ordered traversal range
exit/approach relation to destination
valid destination-volume sample
one accepted delivery receipt
```

## Rejection cases

```txt
wrong route then destination volume
ambient drift then destination volume
correct route touched for one sample only
stale route proof from a prior mission epoch
wrong destination town
already delivered parcel
invalid or missing manifest identity
```

## Next gameplay fixture

Run one deterministic command schedule that enters and retains the Brookhaven current, then proves delivery. Replay equivalent schedules for Sunvale, Cloudmere and ambient arrival and require explicit rejection without parcel mutation.