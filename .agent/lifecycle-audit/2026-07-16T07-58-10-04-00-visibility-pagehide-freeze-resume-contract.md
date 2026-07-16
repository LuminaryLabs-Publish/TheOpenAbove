# Lifecycle Audit: Visibility, Pagehide, Freeze and Resume Contract

**Timestamp:** `2026-07-16T07-58-10-04-00`

## Summary

The route needs one policy for temporary invisibility, page lifecycle suspension, BFCache restoration and final retirement. Those states must not be inferred solely from missing RAF callbacks.

## Plan ledger

**Goal:** define lifecycle states, ownership, transition rules and acknowledgements for the active route.

- [x] Separate temporary suspension from final disposal.
- [x] Define lifecycle generations and states.
- [x] Map affected schedulers, listeners and domain owners.
- [x] Define BFCache restoration rules.
- [ ] Implement and execute the contract.

## Required lifecycle states

```txt
uninitialized
admitting
running
suspending
suspended
resuming
running-resumed
retiring
retired
failed
```

## Required identities

```txt
DocumentGeneration
RouteGeneration
SessionRevision
LifecycleRevision
SuspensionRevision
ResumeRevision
FlightSchedulerGeneration
MapSchedulerGeneration
ClockRevision
VisibleFrameRevision
```

## Transition contract

```txt
running + hidden
  -> suspending
  -> cancel held input
  -> settle domain policies
  -> cancel schedulers
  -> suspended

running + pagehide persisted=false
  -> retiring
  -> cancel schedulers and listeners
  -> dispose owned resources
  -> retired

running + pagehide persisted=true
  -> suspending for BFCache
  -> preserve restorable state
  -> suspended

suspended + pageshow persisted=true
  -> resuming
  -> revalidate provider renderer viewport world and listeners
  -> rebase clock
  -> restart schedulers
  -> present first resumed frame
  -> running-resumed

suspended + visible/resume
  -> resuming
  -> rebase clock and restart accepted work
  -> running-resumed
```

## Ownership ledger

```txt
flight RAF handle -> render scheduler suspension kit
map RAF handle -> map overlay suspension kit
keyboard/wheel listeners -> input owner with cancellation result
simulation state -> balloon simulation
Air Mail state -> mail delivery domain
airstream state -> airstream domain
world-generation state -> world-generation kit
camera state -> camera rig
renderer and GPU resources -> visual domain
lifecycle snapshot -> lifecycle authority and GameHost readback
```

## Suspension invariants

```txt
no new gameplay update after accepted suspension
no held action survives without a fresh input command
no new RAF is scheduled by a retired scheduler generation
accepted simulation and world state remains immutable unless policy permits work
map open/closed meaning is preserved independently from its RAF
suspension is idempotent
```

## Resume invariants

```txt
resume references the accepted suspension revision
host clock is rebased before simulation update
renderer and viewport identity are valid
world-generation work resumes from accepted phase and revision
map and flight schedulers each have one active callback at most
stale callbacks are ignored
FirstResumedFrameAck is published exactly once
```

## BFCache requirements

```txt
pageshow.persisted is restoration, not fresh boot
existing listeners are not duplicated
GameHost points to the accepted live generation
provider and renderer identity are revalidated
resources incompatible with restoration produce fallback or replacement
no pre-pagehide callback can mutate resumed state
```

## Failure handling

```txt
restoration timeout -> PageLifecycleFailureResult
renderer/provider mismatch -> fallback or recovery authority handoff
world restore mismatch -> reject resume and preserve fallback
listener duplication -> reject generation adoption
missing first resumed frame -> fail bounded resume attempt
```

## Validation boundary

No lifecycle state machine or BFCache behavior is implemented. No browser compatibility claim is made.