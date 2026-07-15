# Architecture Audit: Host Clock Fixed-Step Flight DSK Map

**Timestamp:** `2026-07-15T12-02-38-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

## Summary

Browser callback timing is currently owned by `src/main.js`, while simulation truth is spread across balloon, airstream, Air Mail, world, visual, and NexusEngine services. No domain owns elapsed-time admission, residual time, bounded catch-up, suspension state, overload reporting, or the simulation revision rendered by a visible frame.

## Plan ledger

**Goal:** define the smallest semantic DSK family that centralizes time admission without moving flight, mail, world, rendering, or input rules out of their existing domains.

- [x] Map the current callback and step owners.
- [x] Preserve all 101 active named surfaces and APIs.
- [x] Identify the missing parent authority and child services.
- [x] Keep map suspension explicit and dependency ordered.
- [ ] Implement only after controlled-clock fixtures establish the accepted pacing contract.

## Current ownership map

```txt
open-above-raf-clock-adapter-kit
  -> requestAnimationFrame callback and performance.now interval

src/main.js host loop
  -> frameMs clamp dt clamp map-open predicate update order render scheduling

open-above-balloon-simulation-kit
  -> elapsed wind forces movement altitude distance and input consumption

open-above-airstream-domain
  -> route and field update from accepted flight state

open-above-mail-delivery-domain
  -> delivery progress timestamps and town visuals

open-above-visual-domain
  -> world weather vegetation cloud and HDR update/render

open-above-balloon-telemetry-kit / NexusEngine
  -> engine tick telemetry and public readback

open-above-parchment-map-overlay-kit
  -> map-open state that suppresses updates
```

## Missing parent domain

```txt
open-above-host-clock-fixed-step-flight-simulation-authority-domain
```

## Proposed child kits

| Kit | Service |
|---|---|
| `open-above-host-clock-identity-kit` | document runtime RAF and clock generation identity |
| `open-above-monotonic-interval-admission-kit` | validate and admit callback timestamps |
| `open-above-simulation-lease-kit` | active versus map-suspended simulation policy |
| `open-above-fixed-step-descriptor-kit` | fixed step size maximum step count and time budget |
| `open-above-fixed-step-accumulator-kit` | accumulated elapsed and residual time |
| `open-above-input-revision-binding-kit` | bind one input snapshot to an accepted step batch |
| `open-above-balloon-step-adapter-kit` | step balloon simulation without owning flight rules |
| `open-above-airstream-step-adapter-kit` | step airstream state in declared order |
| `open-above-mail-step-adapter-kit` | step delivery state and timestamps |
| `open-above-world-step-adapter-kit` | step camera world weather and presentation descriptors |
| `open-above-engine-step-adapter-kit` | step NexusEngine truth |
| `open-above-step-order-contract-kit` | declare and validate deterministic consumer order |
| `open-above-clock-residual-kit` | retain fractional unconsumed time |
| `open-above-clock-overload-kit` | bounded catch-up and explicit discarded-time receipt |
| `open-above-clock-suspension-kit` | map hide and route suspension result |
| `open-above-clock-resume-rebase-kit` | resume without hidden catch-up debt |
| `open-above-render-interpolation-kit` | interpolation alpha and previous/current snapshots |
| `open-above-host-clock-result-kit` | typed frame admission and step-batch result |
| `open-above-first-clock-aligned-frame-ack-kit` | first visible frame matching the accepted revision |
| `open-above-host-clock-fixture-kit` | controlled browser clock build artifact and Pages proof |

## Command boundary

```txt
HostClockFrameCommand
  input:
    HostClockGeneration
    RuntimeGeneration
    RafGeneration
    previousTimestamp
    callbackTimestamp
    SimulationLeaseRevision
    InputRevision

  admit:
    monotonicInterval
    active suspended resumed or overload state

  prepare:
    accumulatedElapsed
    fixedStepCount
    residualTime
    interpolationAlpha
    stepOrder

  settle:
    execute bounded steps
    preserve residual time
    publish explicit discarded-time receipt when budget is exceeded
    rebase suspended and resumed generations

  publish:
    HostClockFrameResult
    ClockSnapshot
    per-domain step receipts
    FirstClockAlignedFrameAck
```

## Dependency rule

```txt
browser callback reports time
  -> host-clock authority admits and budgets it
  -> input revision binds to the step batch
  -> existing simulation domains execute in declared order
  -> renderer consumes accepted previous/current revisions and interpolation
  -> telemetry and proof consume immutable results
```

## Non-goals

Do not move balloon force equations, airstream sampling, delivery rules, Core World generation, camera policy, cloud rendering, HDR presentation, map drawing, or deployment ownership into the clock domain.

## Validation boundary

This is a documentation-only DSK map. No fixed-step implementation or runtime proof exists.