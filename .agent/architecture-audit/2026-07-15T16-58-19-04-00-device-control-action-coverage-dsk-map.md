# Architecture Audit: Device-Control Action Coverage DSK Map

**Timestamp:** `2026-07-15T16-58-19-04-00`  
**Status:** `device-control-action-coverage-authority-audited`

## Summary

The product currently couples browser event producers directly to simulation and camera state: global keyboard listeners own flight actions, a global wheel listener owns zoom, and the map overlay owns `M` and `Escape`. There is no parent domain that observes device capability, declares required actions, admits a complete control profile, normalizes multiple producers, or publishes control-surface and action-effect evidence.

## Plan ledger

**Goal:** define a renderer-neutral and device-neutral DSK boundary that preserves the current flight equations and routes all admitted devices through one semantic action state.

- [x] Identify current input producers and consumers.
- [x] Separate browser capture from semantic action ownership.
- [x] Define required action coverage.
- [x] Define producer generations and hybrid arbitration.
- [x] Define overlay, cancellation, result, and visible-frame boundaries.
- [ ] Implement the parent domain and child kits.
- [ ] Prove complete profiles on supported devices.

## Current ownership map

```txt
window keydown/keyup
  -> open-above-balloon-simulation-kit keys Set
  -> burner vent steering state
  -> balloon simulation

window wheel
  -> open-above-balloon-camera-rig-kit state.zoom
  -> camera mode and view

window keydown M/Escape
  -> open-above-parchment-map-overlay-kit open state
  -> simulation suppression in src/main.js

pointer touch gamepad on-screen controls
  -> no active producer
```

## Required parent domain

```txt
open-above-device-control-action-coverage-authority-domain
```

## Child-domain map

```txt
device observation
  open-above-device-capability-observation-kit
  open-above-control-profile-descriptor-kit
  open-above-required-action-coverage-kit

browser producers
  open-above-keyboard-action-producer-kit
  open-above-wheel-action-producer-kit
  open-above-pointer-touch-gesture-producer-kit
  open-above-gamepad-action-producer-kit

visible control surfaces
  open-above-on-screen-flight-controls-kit
  open-above-on-screen-map-control-kit
  open-above-on-screen-camera-zoom-kit

semantic action boundary
  open-above-flight-action-command-kit
  open-above-flight-action-normalization-kit
  open-above-control-producer-generation-kit
  open-above-input-ownership-arbitration-kit
  open-above-hybrid-action-deduplication-kit
  open-above-gesture-cancellation-kit
  open-above-overlay-control-routing-kit

results and proof
  open-above-device-control-result-kit
  open-above-first-device-control-surface-frame-ack-kit
  open-above-first-device-action-effect-frame-ack-kit
  open-above-device-control-browser-fixture-kit
```

## Required actions

```txt
burner: analog 0..1 or held digital
vent: analog 0..1 or held digital
steer: analog -1..1 or paired digital
map-toggle: edge action
map-close: edge action
camera-zoom: signed analog or paired digital edge
cancel-held-actions: lifecycle action
```

## Admission transaction

```txt
DeviceControlAdmissionCommand
  -> bind DocumentGeneration RuntimeGeneration ViewportRevision
  -> bind DeviceCapabilityRevision ActionMapRevision ControlGeneration
  -> observe keyboard pointer touch gamepad and wheel capability
  -> resolve compatible ControlProfileDescriptor candidates
  -> require complete burner vent steering map and zoom coverage
  -> prepare any required on-screen surfaces
  -> reject incomplete conflicting stale or retired profiles
  -> adopt one profile generation
  -> publish DeviceControlAdmissionResult
```

## Runtime action transaction

```txt
FlightActionCommand
  -> bind admitted control profile and producer generation
  -> normalize device-specific input
  -> arbitrate gesture and overlay ownership
  -> suppress hybrid duplicates
  -> update one FlightActionState
  -> let simulation camera and map consume semantic state
  -> publish FlightActionResult
  -> acknowledge the first matching visible control and action-effect frames
```

## Compatibility constraints

Preserve Three.js `0.165.0`, the existing balloon force equations, keyboard mappings, camera zoom range, map suspension behavior, public `GameHost` shape, Core World composition, rendering architecture, and Pages deployment. Browser event handlers must become producers, not gameplay authorities.
