# Deploy Audit: Device-Control Browser Fixture Gate

**Timestamp:** `2026-07-15T16-58-19-04-00`  
**Status:** `device-control-action-coverage-authority-audited`

## Summary

The current Node and headless checks validate source, world, renderer, and build contracts but do not instantiate real keyboard, wheel, pointer, touch, gamepad, accessibility, orientation, or hybrid-input behavior. Deployment readiness requires device-control fixtures against source, production build, uploaded artifact, and Pages.

## Plan ledger

**Goal:** prevent a control profile from being called supported until its required actions, lifecycle settlement, visible surfaces, and first effects pass on the delivered artifact.

- [x] Inspect package checks and Pages workflow.
- [x] Identify missing browser device fixtures.
- [x] Define source/build/artifact/Pages parity gates.
- [ ] Add controlled browser fixtures.
- [ ] Run the matrix on the production artifact and deployed origin.

## Required fixture matrix

```txt
keyboard plus wheel desktop
keyboard-only desktop
mouse with no keyboard
single-touch phone portrait
single-touch phone landscape
multi-touch pinch and steering conflict
tablet touch
connected gamepad
gamepad disconnect during held action
keyboard plus touch hybrid
keyboard plus gamepad hybrid
pointercancel and touchcancel
window blur and visibility hide
map open close and focus routing
orientation and viewport replacement
runtime retirement and reload
```

## Required assertions

```txt
complete required-action coverage before admission
visible controls for profiles that need them
minimum authored hit targets and safe-area containment
exactly-once held-action settlement
no stuck burner vent steering or zoom state
no duplicate hybrid action effect
map gestures do not leak into flight actions
first visible control frame matches control generation
first action-effect frame matches accepted action result
same seeded delivery scenario remains completable
```

## Pipeline gates

```txt
source route fixture
  -> production Vite build fixture
  -> uploaded Pages artifact fixture
  -> deployed Pages-origin fixture
  -> compare action map control generation and result identities
```

## Existing automation boundary

The workflow runs checkout, provider revision capture, Node setup, install, headless status/inspect/renderer/world/check/build, artifact upload, and Pages deployment. It does not run a browser device matrix or preserve device-control evidence artifacts.

## Validation boundary

No browser fixture, build, artifact download, or Pages smoke was run during this audit. Deployment parity and production readiness remain unproven.
