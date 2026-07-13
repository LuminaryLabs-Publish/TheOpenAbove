# Gameplay Audit: Flight and Delivery Reload Reconciliation

**Run:** `2026-07-13T00-00-02-04-00`

## Summary

Air Mail progress is currently session-local. Flying, entering an airstream and delivering the parcel mutate live objects, but refresh or navigation reconstructs defaults and discards that progress.

## Plan ledger

**Goal:** define the gameplay state that must survive reload without moving persistence ownership into balloon or mail rule kits.

- [x] Trace boot defaults and active-frame mutations.
- [x] Identify balloon, airstream, mail and compatibility participants.
- [x] Identify reload and future partial-restore failure classes.
- [x] Define gameplay invariants for save and restore.
- [ ] Implement and test the durable gameplay loop.

## Current loop

```txt
boot
  -> fresh balloon position [0, 105, 0]
  -> elapsed=0 and distance=0
  -> fresh in-transit parcel

play
  -> update flight vectors and controls
  -> update airstream selection and capture state
  -> update parcel delivery progress
  -> optionally mark parcel delivered

refresh/navigation
  -> discard live objects
  -> next boot recreates defaults
```

## Gameplay participants

```txt
balloon:
  position, velocity, wind, vertical velocity, altitude
  burner, vent, steering, trim, bank, heading
  elapsed, distance, message

airstream:
  active route, destination, influence, capture state and velocity

mail:
  parcel ID, destination, correct/selected airstream
  status, delivered, deliveredAt and message

compatibility:
  world generation/config revision
  mail route revision
  authored town and airstream references
```

## Failure classes

```txt
progress loss after refresh
delivered parcel becomes undelivered
mid-flight position and distance reset
selected airstream and current message reset
future sequential restore exposes mixed generations
stale tab overwrites newer progress
corrupt route references enter gameplay
reset diverges between live and durable state
```

## Required gameplay invariants

```txt
restored balloon state contains finite vectors and bounded scalars
restored parcel references an existing destination and route
parcel delivered state agrees with deliveredAt and message
world and authored route compatibility are validated before install
all gameplay participants install atomically
failed restore preserves the complete predecessor
```

## Non-claim

No gameplay behavior changed. Save/reload gameplay fixtures remain unavailable.