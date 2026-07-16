# Gameplay Audit: Map-Open Weather Freeze Loop

**Timestamp:** `2026-07-16T10-58-20-04-00`  
**Status:** `weather-simulation-clock-projection-ownership-authority-audited`

## Summary

Opening the parchment map suspends simulation, visual updates, Core Weather advancement and engine ticks, while the WebGL scene still renders. This may be an acceptable pause policy, but no gameplay result declares it and no resume transaction rebases weather or rejects stale projections.

## Plan ledger

**Goal:** make weather behavior during map-open, pause and resume explicit and deterministic.

- [x] Trace the map-open branch in the host frame.
- [x] Confirm weather advances only inside `visual.update`.
- [x] Confirm `visual.render` continues while map-open.
- [x] Identify missing pause/resume weather results.
- [ ] Choose and implement one map weather policy.
- [ ] Prove deterministic resume behavior.

## Current loop

```txt
map closed
  -> simulation.update(dt)
  -> Air Mail and airstream update
  -> camera and balloon update
  -> visual.update(dt)
  -> weather advances
  -> engine.tick(dt)
  -> render

map open
  -> simulation branch skipped
  -> visual.update skipped
  -> weather advance skipped
  -> engine.tick skipped
  -> render continues
```

## Missing policy

The product does not publish whether weather should:

```txt
A. pause exactly with gameplay
B. continue on a separate world clock
C. accumulate bounded elapsed time and catch up on resume
D. resample from an external scenario time
```

Current behavior implicitly chooses A because the visual adapter is not called. That choice is not represented as an accepted result and may change accidentally if rendering or map scheduling changes.

## Required gameplay result

```txt
MapWeatherPolicyResult {
  mapRevision
  simulationRevision
  policy: paused | continuous | bounded-catchup
  weatherRevision
  layeredWeatherRevision
  pausedAt?
  resumedAt?
  acceptedDelta?
  rejectedReason?
}
```

## Required resume sequence

```txt
map closes
  -> settle map state
  -> admit weather resume policy
  -> advance zero or bounded delta exactly once
  -> publish WeatherAdvanceResult
  -> update flight-facing projections
  -> present one matching frame
  -> publish FirstWeatherBoundFrameAck
```

No gameplay behavior was changed by this audit.