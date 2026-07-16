# Gameplay Audit: Background Flight and Resume Loop

**Timestamp:** `2026-07-16T07-58-10-04-00`

## Summary

The game clamps the first resumed update rather than owning a gameplay suspension policy. This avoids a large single physics step but does not define whether hidden time, Air Mail progress, held inputs, camera transitions or world generation should advance, pause or be reconciled.

## Plan ledger

**Goal:** make gameplay behavior across backgrounding explicit and revision bound without changing flight equations or delivery rules.

- [x] Trace simulation and delivery updates.
- [x] Trace held-key state and blur clearing.
- [x] Trace map-open pause behavior.
- [x] Identify lifecycle policy decisions that are currently implicit.
- [ ] Implement and test accepted suspension/resume outcomes.

## Current loop

```txt
visible and map closed
  -> simulation.update(dt)
  -> mail.update(position, airstream, elapsed)
  -> airstream.update(...)
  -> balloon, camera, world and engine update

map open
  -> simulation and gameplay updates are skipped
  -> render continues with dt=0

page hidden or frozen
  -> browser scheduling determines whether callbacks run
  -> product publishes no gameplay suspension result

resume
  -> at most 1/30 second is applied
  -> hidden wall time is effectively discarded from simulation
  -> no authored policy records that decision
```

## Gameplay risks

```txt
held burner/vent/steering can depend on whether blur fired
Air Mail elapsed time can diverge from real wall time without a declared policy
entry into or exit from a delivery volume around suspension has no settlement result
world generation can stop and resume at browser-selected points
camera transitions can resume from retained interpolation state
map-open and page-hidden reasons are not independently represented
telemetry cannot explain why elapsed wall time was discarded
```

## Required policy table

| Owner | Suspend decision | Resume decision |
|---|---|---|
| flight simulation | pause accepted updates and preserve state | resume from rebased host clock |
| held input | cancel active actions and publish receipt | require fresh input evidence |
| Air Mail | preserve accepted progress and timestamps | continue from accepted simulation time |
| airstream | preserve route/field state | resume from accepted flight time |
| world generation | pause staged work budget | continue from accepted phase and revision |
| camera | freeze transition state | resume or settle by explicit policy |
| map | preserve open/closed semantic state, stop RAF | restart only after lifecycle adoption |
| rendering | stop stale submissions | present only from resumed generation |

## Required result chain

```txt
PageLifecycleSuspendResult
  -> HeldInputCancellationResult
  -> FlightSuspensionResult
  -> MailSuspensionResult
  -> WorldWorkSuspensionResult
  -> RenderSchedulerSuspensionResult

PageLifecycleResumeResult
  -> ResumeClockRebaseResult
  -> FlightResumeResult
  -> WorldWorkResumeResult
  -> FirstResumedFrameAck
```

## Validation boundary

This is a source-derived gameplay-coherence gap. No background flight, delivery or input incident was reproduced.