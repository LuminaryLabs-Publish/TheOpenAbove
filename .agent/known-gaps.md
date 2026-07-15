# Known Gaps: TheOpenAbove Device-Control Action Coverage

**Last aligned:** `2026-07-15T16-58-19-04-00`  
**Status:** `device-control-action-coverage-authority-audited`

## Summary

The active route has no authority that proves each device profile covers the actions required by the Air Mail loop. Keyboard flight, wheel zoom, and keyboard map input exist, but touch, pointer, gamepad, on-screen controls, producer arbitration, complete-profile admission, and visible action-effect evidence are absent.

## Plan ledger

**Goal:** keep device capability, action coverage, visible controls, producer ownership, cancellation, simulation effects, browser proof, and retained product gaps dependency ordered.

- [x] Identify the current producer and consumer paths.
- [x] Identify incomplete keyboard-only and touch-only profiles.
- [x] Define required semantic actions.
- [x] Preserve existing host-clock, rendering, world, mail, and lifecycle findings.
- [ ] Add device and control-generation identities.
- [ ] Add complete profile admission.
- [ ] Add touch and gamepad producers and visible controls.
- [ ] Add ownership, deduplication, and lifecycle cancellation.
- [ ] Add result and visible-frame evidence.
- [ ] Prove source, build, artifact, and Pages parity.

## Implemented state

```txt
keyboard burner vent steering: present
wheel zoom: present
M and Escape map control: present
keyboard blur clears flight key set: present
map open suppresses simulation update: present
canvas touch-action none: present
```

## Primary coverage gaps

```txt
DeviceCapabilityRevision: absent
ActionMapRevision: absent
ControlGeneration: absent
ProducerGeneration: absent
ControlProfileDescriptor: absent
required-action coverage result: absent
keyboard-only zoom fallback: absent
pointer or touch flight producer: absent
gamepad producer: absent
on-screen flight controls: absent
on-screen map control: absent
on-screen zoom control: absent
```

## Arbitration and lifecycle gaps

```txt
semantic FlightActionCommand: absent
normalized FlightActionState revision: absent
action ownership result: absent
hybrid duplicate suppression: absent
pointercancel settlement: absent
touchcancel settlement: absent
gamepad disconnect settlement: absent
visibility and pagehide action cancellation: absent
map transition action cancellation: absent
runtime replacement producer retirement: absent
```

## Rendering and evidence gaps

```txt
ControlSurfaceDescriptor: absent
control layout revision: absent
safe-area policy: absent
visible required-action list: absent
FirstDeviceControlSurfaceFrameAck: absent
FlightActionEffectResult: absent
FirstDeviceActionEffectFrameAck: absent
physical-device browser fixture: absent
source/build/artifact/Pages parity: unproven
```

## Dependency order

```txt
device and action identities
  -> required-action coverage
  -> complete profile admission
  -> producer preparation
  -> visible control surfaces
  -> semantic action normalization
  -> ownership and duplicate suppression
  -> lifecycle cancellation
  -> simulation camera and map effects
  -> visible frame acknowledgement
  -> deployed artifact parity
```

## Retained product gaps

Host-clock fixed-step pacing, HDR color/depth target coherence, cloud relative depth, ground-contact delivery eligibility, provider/build identity, route lifecycle, world adoption, terrain and vegetation proof, Air Mail history, and flight persistence remain unresolved.

## Do not claim

Do not claim touch playability, gamepad support, keyboard-only completeness, hybrid safety, cancellation correctness, visible-control correctness, action-effect convergence, artifact parity, deployed parity, or production readiness until the required fixtures pass.
