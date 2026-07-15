# Current Audit: TheOpenAbove Device-Control Action Coverage

**Last aligned:** `2026-07-15T16-58-19-04-00`  
**Status:** `device-control-action-coverage-authority-audited`  
**Reviewed pre-audit repository head:** `86d3847e89a148671dca8487a9afbbb0a1e04951`  
**Reviewed runtime source revision:** `1417c80309218c7c61def3b2f09a977eaab8b953`

## Summary

The active application has a partial desktop control profile assembled from direct global listeners. Keyboard events feed burner, vent, and steering state; wheel events mutate camera zoom; `M` and `Escape` mutate map state. The full-screen gameplay canvas has `touch-action: none`, but there are no current pointer, touch, gamepad, or on-screen action producers.

## Plan ledger

**Goal:** isolate the smallest authority that makes device capability, required action coverage, visible controls, producer arbitration, lifecycle cancellation, simulation consumption, and first visible action effects consume one control generation.

- [x] Compare the current Publish inventory, central ledger, root `.agent` coverage, and heads.
- [x] Select only TheOpenAbove by the oldest synchronized rule.
- [x] Inspect HTML, host composition, balloon input, camera input, map input, package checks, deployment, current audits, and registry.
- [x] Trace keyboard/mouse, keyboard-only, touch-only, gamepad, and hybrid paths.
- [x] Preserve all 101 active named surfaces and their service ownership.
- [x] Add the timestamped tracker and device-control audit family.
- [ ] Implement and prove complete profiles, visible controls, cancellation, deduplication, and first action-effect frames.

## Complete interaction loop

```txt
workflow and boot
  -> checkout product and NexusEngine
  -> build and publish static route
  -> create simulation world renderer map camera and telemetry
  -> install global keyboard wheel and map listeners

keyboard/mouse
  -> keyboard states drive burner vent and steering
  -> wheel drives camera zoom
  -> M and Escape drive map state
  -> RAF consumes state and renders

touch-only
  -> touch reaches touch-action-none canvas
  -> no active touch or pointer producer
  -> no semantic flight action
  -> no map or zoom control
  -> passive simulation continues

hybrid
  -> no shared producer generation
  -> no ownership or duplicate result
  -> no complete-profile admission result
```

## Domains in use

```txt
workflow provider build artifact and Pages deployment
browser lifecycle viewport device capability input and GameHost
device profiles required actions producer generations and visible controls
keyboard flight input wheel zoom and map keyboard input
balloon simulation telemetry presentation and camera
airstream Air Mail map and simulation suspension
Nexus Engine telemetry Core World foundation features and landforms
world generation terrain vegetation grass flowers water and landmarks
quality dynamic resolution sky clouds HDR and color grading
validation browser fixtures and central tracking
```

## Kit and service census

```txt
local source-backed kits:           71
runtime-implied adapters:           13
Core World provider surfaces:       17
active documented total:           101
inactive or retired legacy:         13
planned device-control surfaces:    22
new runtime kit IDs:                 0
```

The complete kit-by-kit inventory is in `.agent/trackers/2026-07-15T16-58-19-04-00/project-breakdown.md` and `.agent/kit-registry.json`.

## Source-backed findings

```txt
required flight actions: burner vent steer map toggle map close camera zoom
keyboard flight coverage: present
wheel zoom coverage: present
keyboard map coverage: present
keyboard-only zoom coverage: absent
pointer or touch coverage: absent
gamepad coverage: absent
on-screen controls: absent
control profile descriptor: absent
required action coverage result: absent
hybrid duplicate suppression: absent
held-action cancellation across all producers: absent
FirstDeviceControlSurfaceFrameAck: absent
FirstDeviceActionEffectFrameAck: absent
```

The touch-only path is not admitted as a complete control profile. Passive drift may continue and could intersect world volumes by chance, but the authored route-reading and flight-control loop is not intentionally operable.

## Required parent domain

```txt
open-above-device-control-action-coverage-authority-domain
```

## Required transaction

```txt
DeviceControlAdmissionCommand
  -> bind document runtime viewport device capability action map and control generation
  -> resolve a compatible profile
  -> require burner vent steer map and zoom coverage
  -> prepare required visible controls
  -> adopt one producer generation
  -> normalize producers into FlightActionState
  -> arbitrate overlay and gesture ownership
  -> cancel held actions at lifecycle boundaries
  -> publish DeviceControlAdmissionResult
  -> publish FirstDeviceControlSurfaceFrameAck
  -> publish FirstDeviceActionEffectFrameAck
```

## Validation boundary

Documentation only. Runtime JavaScript, HTML, CSS, shaders, gameplay, packages, tests, workflows, and deployment were not changed. No physical-device, browser, build, artifact, or Pages fixture was run.
