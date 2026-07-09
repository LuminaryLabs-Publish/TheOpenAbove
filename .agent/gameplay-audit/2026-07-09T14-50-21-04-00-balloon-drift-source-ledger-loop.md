# Gameplay Audit — Balloon Drift Source Ledger Loop

**Timestamp:** `2026-07-09T14-50-21-04-00`

## Current gameplay loop

```txt
spawn balloon at position (0, 105, 0)
  -> initialize velocity/wind/burner/vent/altitude/distance/message
  -> press Space/W/ArrowUp for burner lift
  -> press S/ArrowDown/Shift for vent descent
  -> wheel camera zooms between third-person and basket view
  -> update(dt) calculates wind angle and speed
  -> buoyancy changes vertical velocity
  -> damping and soft ceiling clamp motion
  -> ground clearance prevents collision with terrain
  -> horizontal drift distance accumulates
  -> balloon transform follows state
  -> HUD reports heat, camera mode, altitude, wind, and drift
```

## Gameplay domains

```txt
input-capture-domain
burner-intent-domain
vent-intent-domain
wind-field-domain
buoyancy-domain
vertical-velocity-domain
horizontal-drift-domain
ground-clearance-domain
ceiling-softness-domain
balloon-transform-domain
camera-mode-domain
hud-telemetry-domain
nexus-telemetry-domain
```

## Current mechanics

```txt
burner lift: Space / W / ArrowUp
vent descent: S / ArrowDown / Shift
camera transition: wheel zoom toward basket view
wind drift: procedural wind angle and speed functions
altitude safety: terrain-relative ground minimum plus soft high ceiling
visual feedback: burner flame, rigging animation, rope fade, ride bob, ride sway, burner vibration
telemetry: local snapshot plus NexusEngine balloon snapshot
```

## Source mismatch affecting gameplay

Durable copy still describes:

```txt
carving
gliding
diving
boosting
thermals
wind gates
sky perch return
Cloud Basin unlock
```

The actual loop is:

```txt
burner
vent
wind drift
altitude safety
basket camera
Nexus telemetry
```

## Gameplay proof gap

There is no DOM-free gameplay/source fixture that proves:

```txt
current route is Balloon Drift
controls match burner/vent/wheel
legacy free-flight values are compatibility-only
runtime defaults are named in a source config
GameHost can expose source authority without changing local/Nexus telemetry
```

## Next gameplay-safe implementation

Add source/readback modules and fixture rows before changing mechanics.

Do not retune burner, vent, buoyancy, wind, altitude clamp, or camera blend until the source ledger has enough proof to say which route semantics are current.
