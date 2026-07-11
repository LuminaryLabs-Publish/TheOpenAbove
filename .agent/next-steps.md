# Next Steps: TheOpenAbove

**Last aligned:** `2026-07-11T00-49-45-04-00`

## Plan ledger

### Goal

Make browser boot reproducible, make reusable modules import-pure, give one session ownership of every frame/listener/resource, separate fixed simulation ticks from render cadence, then activate Meadow Lift as deterministic mission authority.

### Checklist

#### Gate 1: immutable runtime admission

- [ ] Add a versioned runtime source manifest.
- [ ] Replace NexusEngine `@main` with an immutable coordinate.
- [ ] Validate required NexusEngine and Three.js capabilities.
- [ ] Return typed boot results and source fingerprints.
- [ ] Add `fixture:runtime-admission`.

#### Gate 2: import purity and frame ownership

- [ ] Remove module-scope compatibility RAF scheduling.
- [ ] Move legacy installation into an explicit installer kit.
- [ ] Register every RAF with one session owner.
- [ ] Add session/generation fences.
- [ ] Add import-purity proof.

#### Gate 3: lifecycle and teardown

- [ ] Make `createGame()` return a root session owner.
- [ ] Compose all listener, geometry, material, renderer and composer disposers.
- [ ] Add idempotent `stop()`, `dispose()` and `restart()`.
- [ ] Publish detached terminal lifecycle proof.
- [ ] Add `fixture:runtime-lifecycle`.

#### Gate 4: fixed-step clock, visibility and input admission

- [ ] Add a session-owned monotonic clock adapter.
- [ ] Separate render-frame IDs from simulation-tick IDs.
- [ ] Use a fixed simulation step, recommended `1/60`, with a bounded accumulator.
- [ ] Declare `maxSubsteps`, overrun behavior and dropped-time reporting.
- [ ] Declare hidden-tab suspend/resume policy.
- [ ] Reset render baseline on visibility resume.
- [ ] Convert key transitions into sequenced input samples targeted to ticks.
- [ ] Commit burner and vent state only at tick boundaries.
- [ ] Keep camera smoothing, quality and rendering on render cadence.
- [ ] Add swept objective-contact support before thin objective volumes.
- [ ] Add `fixture:clock-parity` for 20/30/60/120 Hz, stalls and visibility.

#### Gate 5: Meadow Lift objective authority

- [ ] Version and validate the mission manifest.
- [ ] Generate three thermals, five gates and one perch zone deterministically.
- [ ] Add ready/active/returning/completed/failed/restarting phases.
- [ ] Evaluate mission time from committed simulation ticks.
- [ ] Make contacts idempotent by stable ID.
- [ ] Commit unlock only after valid completion.
- [ ] Publish renderer-neutral objective descriptors and bounded mission journals.
- [ ] Add `fixture:meadow-lift-route`.

## Recommended clock DSKs

```txt
open-above-runtime-clock-authority-kit
open-above-monotonic-time-adapter-kit
open-above-fixed-step-accumulator-kit
open-above-simulation-tick-kit
open-above-render-frame-kit
open-above-input-sample-buffer-kit
open-above-visibility-suspension-policy-kit
open-above-clock-overrun-result-kit
open-above-swept-objective-contact-kit
open-above-clock-observation-kit
open-above-clock-parity-fixture-kit
```

## Required clock proof

```txt
same input sequence gives same state at 20/30/60/120 Hz
render frame counts may differ while simulation ticks and fingerprints match
stalls are bounded by maxSubsteps and report discarded backlog
visibility changes produce typed suspend/resume results
input sequences are consumed once at target ticks
mission elapsed derives from committed ticks
telemetry distinguishes session, render frame and simulation tick
```

## Validation order

```txt
fixture:runtime-admission
fixture:runtime-lifecycle
fixture:clock-parity
fixture:meadow-lift-route
npm run check
npm run headless:check
npm run build
browser smoke
Pages smoke
```
