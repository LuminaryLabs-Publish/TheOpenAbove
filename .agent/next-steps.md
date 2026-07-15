# Next Steps: TheOpenAbove Host Clock Fixed-Step Flight Simulation

**Last aligned:** `2026-07-15T12-02-38-04-00`  
**Status:** `host-clock-fixed-step-flight-simulation-authority-audited`

## Summary

The next work should replace one clipped update per RAF callback with a versioned host-clock service that admits monotonic elapsed time, executes bounded deterministic steps, retains residual time, treats the map as an explicit suspension lease, and renders accepted simulation revisions with interpolation.

## Plan ledger

**Goal:** repair only host timing ownership while preserving the current balloon feel, airstreams, Air Mail, Core World, rendering, quality system, map, public readback, and deployment surfaces.

### Completed understanding

- [x] Locate the RAF callback and both time clamps.
- [x] Trace every `dt` and `state.elapsed` consumer.
- [x] Confirm one update batch per callback and no accumulator.
- [x] Trace map-open suspension and timestamp rebasing.
- [x] Preserve the 101-surface domain and service inventory.

### Gate 1: clock identity and policy

- [ ] Add `HostClockGeneration`, `ClockPolicyRevision`, `RafGeneration`, and `SimulationRevision`.
- [ ] Define one fixed-step size through controlled flight fixtures.
- [ ] Define maximum steps per callback and maximum catch-up duration.
- [ ] Reject non-finite, negative, non-monotonic, stale, duplicate, or retired callback work.

### Gate 2: accumulator and step batch

- [ ] Accumulate active elapsed wall time exactly once.
- [ ] Execute zero or more fixed steps within the accepted budget.
- [ ] Retain residual time below one fixed step.
- [ ] Publish explicit discarded-time and overload receipts.
- [ ] Bind one input revision to each accepted step batch.

### Gate 3: deterministic consumer order

- [ ] Step balloon simulation first.
- [ ] Step Air Mail from the accepted balloon revision.
- [ ] Step airstream visual state from the same revision.
- [ ] Apply balloon animation and presentation.
- [ ] Step camera, world/visual state, and NexusEngine in one declared order.
- [ ] Publish per-domain step receipts and final `SimulationRevision`.

### Gate 4: suspension and resume

- [ ] Convert map-open behavior into an explicit simulation lease.
- [ ] Advance no active simulation time while suspended.
- [ ] Continue rendering the accepted suspended revision.
- [ ] Rebase the host clock on resume without hidden catch-up debt.
- [ ] Clear stale input edges at suspension and resume boundaries.
- [ ] Extend the same policy to visibility and runtime replacement.

### Gate 5: rendering and telemetry

- [ ] Preserve previous and current accepted simulation snapshots.
- [ ] Derive interpolation alpha from residual time.
- [ ] Bind cloud, HDR, map, and public readback to the rendered revision.
- [ ] Publish `HostClockFrameResult`, `ClockSnapshot`, and overload telemetry.
- [ ] Publish `FirstClockAlignedFrameAck` after presentation.

### Gate 6: fixtures

- [ ] Compare 60, 30, 20, 10, and 5 FPS controlled callback schedules.
- [ ] Test 250 ms and 1000 ms stalls.
- [ ] Test map suspension and resume.
- [ ] Test visibility hide and restore.
- [ ] Test non-monotonic, duplicate, and retired callbacks.
- [ ] Compare flight position, distance, mail timing, and engine step counts.
- [ ] Prove source, production build, artifact, and Pages parity.

## Recommended file cut

```txt
src/runtime/clock/
  host-clock-fixed-step-flight-simulation-authority-domain.js
  host-clock-identity-kit.js
  monotonic-interval-admission-kit.js
  simulation-lease-kit.js
  fixed-step-descriptor-kit.js
  fixed-step-accumulator-kit.js
  step-order-contract-kit.js
  clock-overload-kit.js
  clock-suspension-kit.js
  clock-resume-rebase-kit.js
  render-interpolation-kit.js
  host-clock-result-kit.js
  first-clock-aligned-frame-ack-kit.js

tests/
  host-clock-fixed-step-flight.mjs
```

## Compatibility constraints

Preserve Three.js `0.165.0`, the public `GameHost` shape, the current map behavior, balloon controls and force equations, airstream and mail APIs, Core World composition, dynamic-resolution policy, HDR/cloud rendering, and Pages deployment.

## Retained next steps

HDR depth-size coherence, cloud relative-depth reconstruction, ground-contact delivery eligibility, provider/build identity, route retirement, world adoption, terrain/vegetation proof, Air Mail history, and flight persistence remain open.

## Do not claim

Do not claim real-time pacing, deterministic equivalence, overload recovery, suspension correctness, interpolation quality, visible-frame convergence, artifact parity, deployed parity, or production readiness until the full fixture matrix passes.