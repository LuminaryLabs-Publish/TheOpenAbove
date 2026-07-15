# Next Steps: TheOpenAbove Device-Control Action Coverage

**Last aligned:** `2026-07-15T16-58-19-04-00`  
**Status:** `device-control-action-coverage-authority-audited`

## Summary

The next work should replace direct device-specific state mutation with one semantic control authority. Device capability and required action coverage must be resolved before a profile is admitted, visible controls must be prepared when required, and all producers must settle into one revisioned `FlightActionState`.

## Plan ledger

**Goal:** add complete keyboard/mouse, keyboard-only, touch-only, gamepad, and hybrid profiles without changing flight equations, route logic, camera limits, map suspension, rendering, or deployment.

### Completed understanding

- [x] Locate all active keyboard, wheel, and map listeners.
- [x] Confirm missing pointer, touch, gamepad, and on-screen producers.
- [x] Define required actions and control profiles.
- [x] Define producer ownership, cancellation, duplicate suppression, and visible-frame evidence.
- [x] Preserve the 101-surface architecture and service inventory.

### Gate 1: identities and descriptors

- [ ] Add `DeviceCapabilityRevision`, `ActionMapRevision`, `ControlGeneration`, and `ProducerGeneration`.
- [ ] Define `ControlProfileDescriptor` and required action coverage.
- [ ] Classify zoom as required or provide a keyboard-only fallback.
- [ ] Reject stale, incomplete, conflicting, and retired profiles.

### Gate 2: semantic action state

- [ ] Define burner, vent, steer, map, zoom, and cancellation actions.
- [ ] Replace direct key-set and zoom mutation with producer commands.
- [ ] Normalize digital and analog values into one `FlightActionState`.
- [ ] Preserve current keyboard mappings and flight response.

### Gate 3: touch and visible controls

- [ ] Add responsive burner, vent, steering, map, and zoom controls.
- [ ] Respect safe areas, orientation, viewport changes, and minimum hit targets.
- [ ] Route map gestures separately from flight gestures.
- [ ] Publish `FirstDeviceControlSurfaceFrameAck`.

### Gate 4: gamepad and hybrid ownership

- [ ] Add gamepad discovery, polling, mapping, disconnect, and cancellation.
- [ ] Arbitrate action ownership per producer and action phase.
- [ ] Suppress duplicate near-simultaneous hybrid actions.
- [ ] Publish producer-switch and duplicate results.

### Gate 5: lifecycle settlement

- [ ] Cancel held actions on blur, hide, pagehide, map transitions, pointer/touch cancellation, gamepad disconnect, runtime replacement, and retirement.
- [ ] Prove no stuck burner, vent, steering, or zoom state.
- [ ] Preserve explicit map simulation suspension.

### Gate 6: results and fixtures

- [ ] Publish `DeviceControlAdmissionResult` and `FlightActionEffectResult`.
- [ ] Publish `FirstDeviceActionEffectFrameAck`.
- [ ] Test keyboard/wheel, keyboard-only, touch, gamepad, and hybrid profiles.
- [ ] Prove the same seeded delivery scenario is completable with each admitted profile.
- [ ] Prove source, build, artifact, and Pages parity.

## Recommended file cut

```txt
src/runtime/device-control/
  device-control-action-coverage-authority-domain.js
  device-capability-observation-kit.js
  control-profile-descriptor-kit.js
  required-action-coverage-kit.js
  keyboard-action-producer-kit.js
  wheel-action-producer-kit.js
  pointer-touch-gesture-producer-kit.js
  gamepad-action-producer-kit.js
  flight-action-command-kit.js
  flight-action-normalization-kit.js
  input-ownership-arbitration-kit.js
  hybrid-action-deduplication-kit.js
  gesture-cancellation-kit.js
  device-control-result-kit.js

src/ui/device-controls/
  on-screen-flight-controls-kit.js
  on-screen-map-control-kit.js
  on-screen-camera-zoom-kit.js

 tests/device-control-action-coverage.mjs
```

## Compatibility constraints

Preserve Three.js `0.165.0`, balloon force and smoothing equations, current keyboard bindings, camera zoom bounds, map behavior, public `GameHost`, Core World composition, dynamic resolution, clouds, HDR, and Pages deployment.

## Retained next steps

Host-clock fixed steps, HDR depth-size coherence, cloud relative depth, ground-contact delivery eligibility, provider/build identity, route retirement, world adoption, terrain/vegetation proof, Air Mail history, and flight persistence remain open.

## Do not claim

Do not claim touch playability, gamepad support, keyboard-only completeness, hybrid safety, visible control correctness, action-effect convergence, artifact parity, deployed parity, or production readiness until the full fixture matrix passes.
