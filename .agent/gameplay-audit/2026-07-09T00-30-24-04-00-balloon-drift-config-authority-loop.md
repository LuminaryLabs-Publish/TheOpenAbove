# Gameplay Audit — Balloon Drift Config Authority Loop

**Timestamp:** `2026-07-09T00-30-24-04-00`

## Scope

This audit captures the current hot-air-balloon interaction loop and the config authority target for the next pass.

## Current gameplay loop

```txt
open app
  -> route creates balloon at [0, 105, 0]
  -> player holds burner input to increase lift
  -> player holds vent input to descend
  -> wind angle and wind speed update procedurally
  -> buoyancy, damping, ceiling softness, and gravity-like offset update vertical velocity
  -> velocity blends toward wind + vertical velocity
  -> position integrates from velocity
  -> terrain clearance clamps the balloon above ground
  -> distance accumulates from horizontal speed
  -> camera blends from third-person to basket view by wheel zoom
  -> HUD reports altitude, wind, distance, heat, camera mode, and Nexus marker
```

## Current input map

```txt
burner:
  Space
  KeyW
  ArrowUp

vent:
  KeyS
  ArrowDown
  ShiftLeft
  ShiftRight

camera zoom / basket blend:
  wheel delta sign
```

## Runtime constants currently inline

```txt
initial position: [0, 105, 0]
initial velocity: [8, 0, -10]
initial wind: [8, 0, -10]
initial burner: 0.22
rest burner: 0.18
burner target: 1
vent target: 1
burner smooth rate: 3.2
vent smooth rate: 3.6
wind angle base: -0.86
wind speed base: 9.4
burner lift multiplier: 3.7
vent descent multiplier: 3.2
buoyancy base: 0.36
vertical velocity clamp: -8..8
terrain clearance: 30
ceiling soft threshold: 270
ceiling softness coefficient: 0.024
altitude damping: 0.74
camera zoom default: 44
camera zoom wheel step: 4
camera zoom clamp: 0..92
first-person blend smooth rate: 5.6
camera position smooth rate: 3.1
```

## Target config authority loop

```txt
BALLOON_DRIFT source config
  -> initial state factory
  -> input action descriptors
  -> burner / vent response constants
  -> wind model descriptors
  -> altitude safety constants
  -> terrain clearance constants
  -> camera blend constants
  -> HUD projection labels
  -> runtime uses config without visible behavior drift
  -> source fixture compares config defaults to current behavior markers
```

## Required route descriptors

```txt
lift-guidance:
  explain burner lift and safe altitude

drift-guidance:
  explain wind drift and distance accumulation

basket-view-guidance:
  explain wheel zoom / near-basket blend

meadow-landing:
  future route destination / landing descriptor, not implemented as progression yet
```

## Required altitude bands

```txt
low-clearance:
  near terrain clearance, warn against descent

comfort-drift:
  normal balloon viewing / drift band

high-drift:
  high altitude with ceiling softness approaching

meadow-landing:
  future landing-ready descriptor
```

## Required wind lane hints

```txt
meadow-crosswind
lake-bend
upper-valley-return
landing-approach
```

## Gameplay stop line

Do not add mission win/loss, new regions, collectables, thermals, gates, or landing progression until the source config and route descriptors are fixture-readable.
