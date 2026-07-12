# Deploy Audit: Steering and Presentation Fixture Gate

Timestamp: `2026-07-11T22-58-50-04-00`

## Summary

The current smoke chain can inspect source and build the Vite route, but it does not execute sequenced steering, verify simulation/presentation/camera parity, or correlate a steering result with the first visible frame on GitHub Pages.

## Current scripts

```txt
npm run check
  -> node tests/smoke.mjs

npm run build
  -> npm run check
  -> vite build

headless status/inspect/renderer/check/build commands
```

## Required pure fixtures

```txt
steering policy step response
neutral convergence
left/right symmetry
reversal response
same-sequence determinism
stale and duplicate input handling
reset/epoch retirement
profile/pattern assembly handoff
```

## Required browser matrix

```txt
refresh cadence
  30 Hz
  60 Hz
  120 Hz

input
  left hold
  right hold
  neutral release
  rapid reversal
  blur while held

camera
  third-person
  transition
  basket-view

lifecycle
  initial run
  pause/resume
  mission restart
  disposal/recreate
```

## Required readback

```txt
input sample/sequence
simulation tick
steering result
trim/heading/root transform
presentation revision and transforms
camera revision, position and target
HUD acknowledgement
render frame ID
visible-frame receipt
```

## Pages smoke

```txt
load deployed Air Mail route
confirm pinned modules resolve
wait for first neutral frame
play a sequenced left/right/neutral trace
assert bounded simulation and presentation response
assert HUD/GameHost acknowledge the same steering result
assert first visible receipt exists
restart and prove predecessor steering state is retired
```

## Failure policy

The deployment gate should fail when:

```txt
steering differs by refresh cadence
simulation and presentation revisions diverge
camera acknowledges another steering result
neutral convergence exceeds policy bounds
restart retains trim, inertia or steering look
profile pattern is not applied to the unified shell
visible-frame receipt is absent
```

## Validation boundary

```txt
workflow changed: no
runtime changed: no
test chain changed: no
browser fixtures added: no
Pages smoke run: no
```
