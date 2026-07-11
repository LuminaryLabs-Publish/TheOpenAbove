# Interaction Audit: Control Contract Parity Map

**Timestamp:** `2026-07-11T09-21-50-04-00`

## Goal

Make one canonical control contract feed runtime input, HUD help, public documentation, GameHost inspection and executable fixtures.

## Current documentation contract

```txt
W / ArrowUp      pitch up
S / ArrowDown    pitch down
A / ArrowLeft    bank left
D / ArrowRight   bank right
Space            boost
R                restart mission
```

## Current runtime contract

```txt
Space / W / ArrowUp      burner
S / ArrowDown / Shift    vent
wheel                    camera zoom
A / D / Left / Right     ignored
R                        ignored
```

Browser callbacks mutate a private held-key `Set`; no typed command or binding observation is published.

## Missing command model

```txt
BurnerCommand
VentCommand
ResetMissionCommand
CameraZoomCommand
ControlBindingObservation
ControlAdmissionResult
```

## Proposed control contract

```txt
controlContractId: balloon-burner-vent-v1
commands:
  burner:
    bindings: [Space, KeyW, ArrowUp]
    mode: held
  vent:
    bindings: [KeyS, ArrowDown, ShiftLeft, ShiftRight]
    mode: held
  resetMission:
    bindings: [KeyR]
    mode: press
  cameraZoom:
    bindings: [WheelY]
    mode: delta
```

## Required flow

```txt
accepted product manifest
  -> select control contract
  -> install input adapter
  -> publish binding observation
  -> generate HUD/public control projection
  -> fixture dispatches every documented binding
  -> runtime returns accepted/rejected/no-op results
```

## Parity fixtures

```txt
every documented binding reaches exactly one runtime command
every runtime binding appears in the public projection
unsupported legacy bindings are absent or explicitly marked archived
KeyR reaches the same reset command as GameHost/headless reset
blur retires all held commands at a deterministic tick boundary
```
