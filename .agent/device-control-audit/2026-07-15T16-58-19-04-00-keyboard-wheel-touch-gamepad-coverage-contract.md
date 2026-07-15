# Device-Control Audit: Keyboard, Wheel, Touch, and Gamepad Coverage Contract

**Timestamp:** `2026-07-15T16-58-19-04-00`  
**Status:** `device-control-action-coverage-authority-audited`

## Summary

The active runtime supports a partial desktop profile assembled from unrelated global listeners. It has no explicit profile descriptor or proof that a device can produce every required action. This contract defines profile admission, visible-control preparation, producer arbitration, lifecycle cancellation, and result evidence.

## Plan ledger

**Goal:** admit only complete control profiles and make every accepted action traceable from device signal to visible game effect.

- [x] Define the required action set.
- [x] Define keyboard/mouse, touch-only, gamepad, and hybrid profiles.
- [x] Define producer ownership and deduplication.
- [x] Define cancellation and overlay routing.
- [x] Define admission and frame acknowledgements.
- [ ] Implement profiles and control surfaces.
- [ ] Prove all profiles through browser fixtures.

## Required action set

```txt
burner
vent
steer
map-toggle
map-close
camera-zoom
cancel-held-actions
```

## Profile contracts

### Keyboard and wheel

```txt
burner: Space W ArrowUp
vent: S ArrowDown Shift
steer: A D ArrowLeft ArrowRight
map-toggle: M
map-close: Escape
camera-zoom: wheel
```

### Keyboard-only fallback

```txt
burner vent steer map: existing keys
camera-zoom-in: authored key
camera-zoom-out: authored key
```

A keyboard-only profile is incomplete until zoom has a non-wheel producer or zoom is explicitly classified as optional.

### Touch-only

```txt
burner: held on-screen control
vent: held on-screen control
steer: drag stick or paired held controls
map-toggle and close: on-screen controls
camera-zoom: pinch or paired on-screen controls
```

### Gamepad

```txt
burner and vent: buttons or triggers
steer: left stick
map-toggle and close: authored buttons
camera-zoom: right stick or shoulder buttons
```

### Hybrid

```txt
multiple producers may remain available
one action owner is selected per action phase
identical near-simultaneous actions are deduplicated
producer switches publish ownership results
held state is never inherited silently across producers
```

## Admission states

```txt
observing
preparing-surfaces
ready
admitted
rejected
suspended
retired
```

## Cancellation boundaries

```txt
window blur
document hidden
pagehide
map open
map close
control profile replacement
viewport or orientation replacement
runtime replacement
gamepad disconnect
pointer cancellation
touch cancellation
```

## Invariants

```txt
no profile is admitted without required action coverage
browser handlers never mutate simulation truth directly
visible controls match the admitted control generation
map ownership suppresses conflicting flight gestures
held actions settle exactly once
hybrid duplicates affect state at most once
retired producers cannot alter current state
action results identify their simulation camera or map revision
```

## Required evidence

```txt
DeviceControlAdmissionResult
ControlProfileSnapshot
FlightActionAdmissionResult
FlightActionEffectResult
HeldActionCancellationResult
ProducerOwnershipResult
FirstDeviceControlSurfaceFrameAck
FirstDeviceActionEffectFrameAck
```

## Validation boundary

This is a documentation contract. Device capability detection, on-screen controls, gamepad polling, gesture recognition, cancellation, deduplication, and frame acknowledgements remain unimplemented and untested.
