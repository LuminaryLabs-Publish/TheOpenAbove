# Gameplay Audit: Flight Telemetry and Announcement Loop

**Timestamp:** `2026-07-12T07-00-48-04-00`

## Current loop

```txt
simulation tick
  -> change position, altitude, burner, vent, steering and current state
mail tick
  -> change route/delivery message and optional delivery event
camera tick
  -> change mode and steering look
visual render
  -> draw current world
HUD projection
  -> combine every field into one string
  -> replace an aria-live region
```

## Gameplay consequence

The game has meaningful semantic events:

```txt
entered or left a current
captured a route
changed camera mode
received control guidance
delivered the parcel
encountered a fatal runtime failure
```

Those events are not represented separately from continuously changing numbers. Assistive users can therefore receive excessive telemetry while the important gameplay transition has no durable identity, priority or acknowledgement.

## Required event model

```txt
mission event
  -> stable event ID
  -> source mission revision
  -> announcement kind and priority
  -> concise text
  -> typed admission result
  -> frame acknowledgement
```

Decorative or rapidly changing values remain visual-only unless a separate threshold/event policy explicitly promotes them.

## Suggested semantic event set

```txt
airstream-entered
airstream-captured
airstream-left
camera-mode-changed
control-hint-activated
parcel-delivered
runtime-fatal
```

## Required invariants

```txt
altitude and capture percentages are not announced every frame
route capture and delivery are announced once per event ID
camera-mode changes are deduplicated and policy controlled
control hints obey cooldown and verbosity preference
fatal failure supersedes lower-priority queued status
reset/restart retires predecessor mission announcements
```

## Fixture scenarios

```txt
steady 60-second flight
rapid edge crossing around one airstream threshold
camera zoom oscillation around mode threshold
one successful delivery
duplicate delivery-event submission
fatal failure while a polite event is pending
replacement runtime after failure
```