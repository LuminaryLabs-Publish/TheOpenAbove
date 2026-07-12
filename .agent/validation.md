# Validation: TheOpenAbove

**Last aligned:** `2026-07-11T22-58-50-04-00`

## Scope

Documentation-only audit of the current balloon source through `fd634acc03cce9c568e1a61a64690a5aa6022eff`, focusing on cross-current steering, envelope/gondola inertia, steering-reactive camera behavior, HUD/readback and the retained balloon-model authority.

## Plan ledger

**Goal:** distinguish source-backed steering and presentation behavior from executable proof of deterministic input, consumer coherence, reset neutralization and visible-frame correlation.

- [x] Compare the complete Publish inventory and central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `TheOpenAbove` because newer source commits postdated prior audits.
- [x] Review root guidance and current root `.agent` state.
- [x] Read main host, simulation, airstream force, presentation and camera paths.
- [x] Read balloon object, profile, shell, pattern, seam, mouth, basket and rigging paths.
- [x] Confirm simulation, part presentation and camera use separate state owners.
- [x] Confirm readback lacks committed presentation/camera/frame correlation.
- [x] Reconcile the active source-backed kit count to 59.
- [x] Define pure, browser and Pages fixture requirements.
- [x] Change no runtime source, dependency, script or workflow.
- [x] Create no branch or pull request.

## Source-backed behavior

```txt
A/D and arrows drive limited lateral trim
trim modifies sampled wind rather than replacing wind authority
simulation publishes steering input, trim, bank and heading
balloon root responds to heading and bank
envelope and gondola pivots have independent inertia
camera look and target respond to steering
HUD displays trim direction and percentage
blur clears held keys
```

## Source-backed gaps

```txt
no input sequence or fixed-tick admission
no typed steering result
no shared simulation/root/presentation/camera revision
no presentation transform readback
no camera steering acknowledgement
no reset transaction across all response owners
no first visible steering-frame receipt
pattern metadata is not handed into the unified shell builder
```

## Existing proof surface

`npm run check` executes `node tests/smoke.mjs`; `npm run build` runs that check before Vite build. Existing checks do not execute:

```txt
sequenced steering input
30/60/120 Hz parity
left/right symmetry or reversal
neutral convergence
blur/pause/restart retirement
stale/duplicate rejection
simulation/presentation/camera acknowledgement parity
first visible steering-frame correlation
Pages steering trace
```

## Required pure fixtures

```txt
fixture:steering-policy
fixture:steering-left-right-symmetry
fixture:steering-reversal
fixture:steering-neutral-convergence
fixture:steering-stale-duplicate-input
fixture:balloon-pattern-shell-handoff
```

## Required browser and Pages fixtures

```txt
fixture:steering-cadence-parity-30-60-120
fixture:steering-blur-retirement
fixture:steering-pause-resume
fixture:steering-mission-reset
fixture:steering-consumer-ack-parity
fixture:steering-first-visible-frame
fixture:pages-steering-presentation-parity
```

## Commands not run

```txt
npm install
npm run check
npm run headless:check
npm run build
browser smoke
Pages smoke
```

The connector environment provided repository source and write access, not a checked-out browser runtime. No command execution is claimed.

## Change-state validation

```txt
runtime JavaScript changed: no
package scripts changed: no
dependencies changed: no
gameplay changed: no
render behavior changed: no
deployment workflow changed: no
branch created: no
pull request created: no
.agent documentation changed: yes
```

## Completion boundary

Do not claim deterministic steering or visible presentation coherence until fixed-step input, reset retirement, consumer acknowledgement and first-visible-frame fixtures pass at multiple refresh cadences.
