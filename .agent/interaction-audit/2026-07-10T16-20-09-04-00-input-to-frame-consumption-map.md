# Interaction Audit — Input to Frame Consumption Map

Timestamp: `2026-07-10T16-20-09-04-00`

## Current interaction sources

```txt
keydown
keyup
window blur
wheel
```

## Current behavior

Keyboard handlers mutate a private `Set`. The wheel handler mutates camera zoom directly. Neither path emits a normalized result, sequence number, source timestamp, accepted/no-change reason, or frame-consumption record.

## Current consumption

```txt
keyboard Set
  -> simulation.update(dt)
       reads burner and vent key groups

camera zoom
  -> cameraRig.update(dt, flightState)
       derives first-person blend and mode
```

## Missing correlation

```txt
which key transition changed intent
which repeated key event was ignored or retained
which blur cleared which active keys
which wheel event was clamped or changed zoom
which frame consumed each result
which simulation/camera row resulted
which committed render frame displayed it
```

## Required result row

```js
{
  inputId,
  sequence,
  type,
  code,
  status,
  before,
  after,
  reason,
  consumedByFrameId
}
```

## Required statuses

```txt
accepted
released
repeated
cleared
unsupported
clamped
no-change
consumed
```

## Integration rule

Input normalization should feed the same frame-phase authority ledger used by simulation, camera, render, telemetry, HUD, and GameHost. Do not create an isolated input journal that cannot join the committed frame.

## Next safe ledge

`TheOpenAbove Render Phase Authority Ledger + Adaptive Resolution Fixture Gate`