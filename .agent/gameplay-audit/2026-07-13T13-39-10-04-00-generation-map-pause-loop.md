# Gameplay Audit: Generation and Map Pause Loop

## Summary

Generation is advanced from `visual.update()`, not from an independent runtime scheduler. The main loop skips `visual.update()` while the parchment map is open, so a player can indefinitely pause world generation by leaving the map open.

## Plan ledger

**Goal:** keep gameplay pause semantics unchanged while ensuring background world preparation receives its configured frame budget until ready, failed, cancelled or disposed.

- [x] Trace the closed-map frame path.
- [x] Trace the open-map frame path.
- [x] Confirm generation advancement is inside `visual.update()`.
- [x] Confirm WebGL rendering continues while generation work stops.
- [ ] Move budget admission behind an explicit generation scheduler boundary.

## Current loop

```txt
map closed
  -> simulation.update
  -> mail.update
  -> visual.update
     -> world.advanceGeneration()
  -> visual.render

map open
  -> skip simulation/mail/visual.update
  -> visual.render(0)
  -> map RAF draws
  -> no world.advanceGeneration()
```

## Consequences

```txt
progress rate depends on UI state
elapsed generation time includes periods where no work is admitted
headless fixed-call convergence does not represent browser map-open behavior
progress telemetry cannot distinguish scheduled pause from starvation
a reset started before map-open can remain working indefinitely
```

## Required scheduling result

```txt
GenerationFrameResult
  attemptId
  schedulerGeneration
  uiState
  admittedUnits
  completedUnits
  phaseBefore
  phaseAfter
  progressBefore
  progressAfter
  elapsedWorkMs
  status
```

The scheduler may intentionally reduce the budget for map or visibility states, but that policy must be explicit and observable rather than an accidental consequence of skipping `visual.update()`.

## Compatibility boundary

Do not resume balloon simulation, mail progression, atmosphere time or camera movement while the map is open. Only generation work admission is separated from gameplay pause.