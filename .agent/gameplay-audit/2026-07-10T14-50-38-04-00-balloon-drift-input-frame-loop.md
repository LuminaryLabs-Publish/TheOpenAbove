# Gameplay Audit: Balloon Drift Input-to-Frame Loop

**Timestamp:** `2026-07-10T14-50-38-04-00`

## Player loop

```txt
observe wind drift
  -> hold Space, W, or ArrowUp for burner lift
  -> hold S, ArrowDown, or Shift to vent
  -> scroll to move between third-person and basket-view framing
  -> simulation resolves wind, buoyancy, damping, ceiling, terrain clearance, altitude, velocity, and distance
  -> camera follows wind and balloon pose
  -> world, balloon presentation, telemetry, render, and HUD update
  -> continue drifting
```

The current route is intentionally a simple exploration/drift experience. There is no evidence that combat, quest expansion, route branching, or additional objectives are the next architectural need.

## Current state authority

`balloon-simulation-kit.js` owns the mutable flight state and returns it directly from `update(dt)`. `src/main.js` immediately forwards that same state to object animation, presentation, camera, visual update, telemetry, render, and HUD paths.

This keeps behavior straightforward but creates an observational gap:

```txt
input event
  -> hidden key/wheel mutation
  -> one or more frames later
  -> latest aggregate snapshot
```

The system cannot prove which event caused a burner, vent, zoom, camera-mode, altitude, or render-state transition.

## Required gameplay proof

```txt
accepted burner press
accepted burner release
accepted vent press
accepted vent release
blur-cleared input
accepted wheel zoom
clamped wheel zoom
no-change wheel zoom
simulation frame consumed input sequence range
terrain-clearance correction occurred or did not occur
camera-mode transition occurred or did not occur
telemetry and HUD consumed the same simulation frame
```

## Recommended bounded journals

```txt
inputResults: last 64 rows
simulationFrames: last 32 rows
cameraFrames: last 32 rows
consumerRows: last 128 rows
```

The fixture should allow smaller capacities for deterministic tests.

## Do not change during this proof pass

```txt
wind equations
buoyancy and damping constants
ceiling behavior
terrain clearance
starting position
camera zoom ranges
camera blend thresholds
balloon animation
visual quality behavior
```

## Main gameplay finding

The interaction loop is coherent. The missing capability is deterministic explanation of the loop, not additional gameplay.

## Next safe ledge

```txt
TheOpenAbove Source Input Frame Correlation Ledger + GameHost Headless Fixture Gate
```