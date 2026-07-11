# Deploy Audit: Air Mail Causality Fixture Gate

**Timestamp:** `2026-07-11T05-25-29-04-00`

## Goal

Define the executable checks that must protect Air Mail route causality and horizon-terrain reliability before build and Pages deployment.

## Current pipeline

```txt
npm run check
  -> tests/smoke.mjs
       -> imports tests/airstream-mail.mjs
       -> source-shape assertions

npm run build
  -> npm run check
  -> vite build
```

## Current strengths

```txt
pure route sampling executes in Node
route overlap blending executes in Node
balloon-force adapter executes in Node
delivery volume and one-shot completion execute in Node
required Air Mail and horizon files are checked
build cannot proceed when npm run check fails
```

## Missing fixture commands

```txt
fixture:runtime-admission
fixture:import-purity
fixture:runtime-lifecycle
fixture:clock-route-parity
fixture:air-mail-route
fixture:air-mail-wrong-current
fixture:air-mail-reset
fixture:air-mail-frame-correlation
fixture:terrain-near-horizon-seams
fixture:terrain-work-budget
```

## Required Air Mail matrix

```txt
correct current + valid Brookhaven volume -> accepted once
wrong current + valid Brookhaven volume -> rejected
ambient arrival + valid Brookhaven volume -> rejected
correct current + wrong town -> rejected
stale proof after reset -> rejected
repeat delivery -> no mutation
20/30/60/120 Hz render schedules -> equal mission fingerprint
visibility stall and resume -> declared bounded result
```

## Required terrain matrix

```txt
near/horizon shared coordinates -> equal authoritative height/color
near/horizon boundary -> tolerance-compliant seam
initial origin membership -> bounded work result
one near-center transition -> bounded work result
one horizon-center transition -> bounded work result
failed build -> previous committed terrain retained
```

## Deployment order

```txt
pure source and schema validation
  -> runtime admission fixture
  -> lifecycle/import-purity fixture
  -> fixed-step route parity fixture
  -> Air Mail causality fixtures
  -> frame-correlation fixture
  -> terrain seam/work fixtures
  -> npm run check
  -> npm run headless:check
  -> npm run build
  -> browser smoke
  -> Pages smoke
```

## Browser smoke requirements

```txt
load Air Mail route without fatal panel
observe three visible currents and three towns
use burner/vent only to enter Brookhaven current
complete one valid delivery
confirm wrong-current test mode cannot complete
press R and confirm clean restart
confirm GameHost detached observation matches the presented mission frame
fly far enough to exercise near and horizon terrain transitions without visible voids
```