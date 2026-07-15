# Interaction Audit: Device Action Command-Result Map

**Timestamp:** `2026-07-15T16-58-19-04-00`  
**Status:** `device-control-action-coverage-authority-audited`

## Summary

Current browser handlers mutate local key and zoom state directly. They do not carry command identity, producer generation, action-map revision, overlay ownership, cancellation reason, duplicate status, or effect correlation. The required boundary converts all device signals into typed semantic flight actions before simulation, camera, or map consumption.

## Plan ledger

**Goal:** define one command-result path for every device producer and every flight action consumer.

- [x] Map current browser events to state mutations.
- [x] Define semantic actions and consumers.
- [x] Define rejection, cancellation, and duplicate results.
- [x] Define visible-effect correlation.
- [ ] Implement the command-result path.
- [ ] Execute action correlation fixtures.

## Current direct paths

```txt
keydown/keyup -> keys Set -> simulation.update
wheel -> cameraRig.state.zoom
M/Escape -> map open state
```

## Required semantic paths

```txt
KeyboardSignal | WheelSignal | PointerGesture | TouchGesture | GamepadSample | OnScreenControlSignal
  -> DeviceProducerEvent
  -> FlightActionCommand
  -> FlightActionAdmissionResult
  -> FlightActionState revision
  -> balloon simulation | camera rig | parchment map
  -> FlightActionEffectResult
  -> FirstDeviceActionEffectFrameAck
```

## Command fields

```txt
commandId
documentGeneration
runtimeGeneration
controlGeneration
controlProfileId
producerId
producerGeneration
actionMapRevision
actionId
phase: start | update | end | cancel
value
pointerOrGamepadIdentity
sourceTimestamp
expectedOverlayRevision
expectedSimulationRevision
```

## Result fields

```txt
accepted
reason
normalizedValue
actionStateRevision
ownerProducerId
duplicateOfCommandId
cancelledHeldActions
simulationRevision
cameraRevision
mapRevision
renderFrameId
```

## Rejection reasons

```txt
unsupported-device
incomplete-profile
stale-document
stale-runtime
stale-control-generation
stale-action-map
unknown-action
invalid-value
overlay-owned
producer-not-owner
duplicate-hybrid-action
cancelled-by-lifecycle
retired
```

## Action-consumer map

| Action | Current source | Required consumer |
|---|---|---|
| burner | Space, W, ArrowUp | balloon simulation |
| vent | S, ArrowDown, Shift | balloon simulation |
| steer | A/D, arrows | balloon simulation |
| camera zoom | wheel | camera rig |
| map toggle | M | map overlay and simulation lease |
| map close | Escape | map overlay and simulation lease |
| cancel held actions | blur only for keyboard keys | all active producers and consumers |

## Validation boundary

No runtime command IDs, action revisions, effect results, or visible-frame acknowledgements were implemented. No duplicate-input, cancellation, overlay-routing, or action-effect fixture ran.
