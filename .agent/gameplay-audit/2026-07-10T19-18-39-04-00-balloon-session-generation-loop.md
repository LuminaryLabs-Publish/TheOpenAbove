# Gameplay Audit: Balloon Session Generation Loop

**Timestamp:** `2026-07-10T19-18-39-04-00`

## Active loop

```txt
keyboard state
  -> burner/vent intent
  -> wind and buoyancy integration
  -> terrain clearance
  -> altitude/distance state
  -> balloon transform
  -> camera and presentation
  -> visual frame
```

## Lifecycle hazard

The simulation owns a mutable key set and global listeners. `dispose()` removes listeners, but queued frame callbacks can still call `simulation.update(dt)` after stop unless the root frame authority rejects stale generations before simulation begins.

A restart also needs a defined policy for input held across the boundary. The old session must clear its key set, reject old callbacks, and prevent old state from contributing to the new session.

## Required gameplay lifecycle result

```txt
sessionId
generation
operation
status
elapsedBefore
elapsedAfter
distanceBefore
distanceAfter
inputCount
stateMutated
reason
```

## Fixture scenarios

```txt
start -> one frame chain and one listener set
stop -> elapsed and distance remain frozen
stale callback -> rejected without mutation
dispose twice -> second result is idempotent no-op
restart -> new sessionId, cleared input, independent state
partial-start failure -> no simulation listener survives rollback
```

## Non-goals

Do not retune wind, buoyancy, venting, damping, ceiling, terrain clearance, speed, or camera behavior.
