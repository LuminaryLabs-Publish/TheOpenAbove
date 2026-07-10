# Gameplay Audit — Balloon Drift Frame Phase Loop

Timestamp: `2026-07-10T16-20-09-04-00`

## Player loop

```txt
hold Space/W/ArrowUp
  -> burner target rises
  -> buoyancy rises
  -> balloon gains or holds altitude

hold S/ArrowDown/Shift
  -> vent target rises
  -> vertical force falls
  -> balloon descends gently

scroll wheel
  -> zoom changes within bounds
  -> camera blends between third-person and basket view

continuous wind
  -> horizontal drift
  -> terrain-relative altitude and distance update
  -> camera/environment/telemetry/render/HUD update each frame
```

## Gameplay authority

The simulation state is coherent inside `balloon-simulation-kit.js`, but the complete player-visible result is distributed across later frame phases. A player action does not currently produce one correlation chain from input state through simulation, camera, visual update, render decision, telemetry, and HUD.

## Important timing detail

The simulation state for frame N is used by visual update and telemetry before render N. Render N can then change scale and statistics. The visible frame and its published telemetry are therefore not guaranteed to describe the same complete phase.

## Required gameplay proof

```txt
input result IDs consumed by frame
burner/vent state before and after smoothing
simulation snapshot ID
camera snapshot ID
render result ID
adaptive-quality decision ID
HUD projection ID
telemetry publication ID
committed frame ID shared by all rows
```

## Preserve

```txt
current controls
current wind and buoyancy constants
terrain clearance
camera behavior
visual fidelity
HUD copy
route pacing
```

## Next safe ledge

`TheOpenAbove Render Phase Authority Ledger + Adaptive Resolution Fixture Gate`