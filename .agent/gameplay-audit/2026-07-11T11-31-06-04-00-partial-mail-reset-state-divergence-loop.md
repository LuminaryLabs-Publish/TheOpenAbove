# Partial Mail Reset State-Divergence Loop

**Timestamp:** `2026-07-11T11-31-06-04-00`

## Current path

```txt
mail.reset()
  -> reset parcel status, delivered flag, deliveredAt, selectedAirstreamId and message
  -> clear lastEvent
  -> leave balloon position and elapsed unchanged
  -> leave current airstream sample unchanged
  -> leave camera and visual state unchanged

next RAF
  -> mail.update(current position, current airstream, current elapsed)
  -> destination volume is sampled
  -> parcel can deliver immediately again
```

## Gameplay consequences

```txt
restart does not return the player to mission start
elapsed and distance continue across reset
burner/vent state can remain active
route proof from the predecessor mission is not epoch-bound
camera can remain in basket view or altered zoom
HUD can show a reset parcel over a non-reset world state
reset inside Brookhaven can redeliver on the next frame
```

## Required gameplay invariant

```txt
accepted reset
  -> new mission epoch
  -> canonical start position and velocity
  -> zero elapsed and distance
  -> neutral held input
  -> empty route/delivery proof
  -> in-transit parcel
  -> reset camera/presentation policy
  -> delivery admission disabled until post-reset staging completes
```

## Fixture cases

```txt
reset at mission start
reset while burner held
reset while vent held
reset inside a correct current
reset inside Brookhaven
reset immediately after delivery
repeat same reset command
stale reset command from predecessor epoch
subsystem reset failure
```
