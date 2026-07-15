# Simulation Clock Audit: RAF Interval Accumulator Contract

**Timestamp:** `2026-07-15T12-02-38-04-00`

## Summary

The current host clamps callback time and executes one step. A reliable clock needs a monotonic accumulator, bounded fixed-step budget, retained residual time, explicit suspension and resume rebasing, overload receipts, and an interpolation descriptor.

## Plan ledger

**Goal:** define exact clock invariants before runtime implementation so that delayed callbacks cannot silently alter game pace or produce unbounded catch-up work.

- [x] Record the current clamp and one-step behavior.
- [x] Define active, suspended, resumed, and overload policies.
- [x] Define accumulator, residual, and interpolation invariants.
- [ ] Choose and validate final fixed-step and catch-up budgets through fixtures.

## Current contract

```txt
callback interval accepted: 0 to 80 ms
simulation dt accepted: 0 to 33.333 ms
steps per callback: exactly one when map is closed
unconsumed time: discarded
map-open time: intentionally not simulated
resume rebase: implicit because last timestamp advances while map is open
```

## Required invariants

```txt
callback timestamps are monotonic within one HostClockGeneration
active elapsed enters one accumulator exactly once
fixed steps are constant within one ClockPolicyRevision
step count is bounded per callback
residual time remains in [0 fixedStep)
discarded time is never silent
suspended elapsed does not create catch-up debt
resume establishes a new active lease revision
one input revision is defined for each accepted step batch
all time-dependent domains consume the same step count and order
interpolation never mutates simulation truth
```

## Recommended policy shape

```txt
fixedStep: fixture-selected, initially evaluate 1/60 and 1/30
maxStepsPerFrame: fixture-selected bounded integer
maxCatchUpSeconds: explicit bounded duration
overloadPolicy: retain bounded residual or discard with receipt
suspensionPolicy: accumulate zero active time while map is open
resumePolicy: rebase timestamp and clear stale input edges
renderPolicy: interpolate accepted previous and current snapshots
```

## Required telemetry

```txt
callbackInterval
admittedActiveInterval
fixedStep
stepCount
accumulatorBefore
accumulatorAfter
residualTime
discardedTime
overloadCount
suspensionDuration
simulationRevision
renderRevision
```

## Validation boundary

The final step size, budget, and overload policy are not selected by this audit. They require controlled-clock comparisons against flight feel, mail timing, world streaming, CPU cost, and render smoothness.