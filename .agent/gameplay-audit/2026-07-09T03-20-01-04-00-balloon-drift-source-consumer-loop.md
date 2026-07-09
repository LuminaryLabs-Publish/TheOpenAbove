# Gameplay Audit — Balloon Drift Source Consumer Loop

**Timestamp:** `2026-07-09T03-20-01-04-00`

## Current gameplay loop

```txt
start in airborne balloon
  -> hold Space / W / ArrowUp for burner lift
  -> hold S / ArrowDown / Shift for vent descent
  -> wind changes slowly over time
  -> balloon velocity lerps toward wind plus vertical velocity
  -> altitude clamps above terrain + 30m
  -> distance accumulates by horizontal velocity
  -> scroll wheel blends between third-person and basket view
  -> HUD shows heat, camera mode, altitude, wind, and drift
```

## Current gameplay domains

```txt
balloon-input-map
burner-intent
vent-intent
wind-field
buoyancy-integration
vertical-velocity-damping
soft-ceiling
terrain-ground-clearance
horizontal-drift-distance
camera-mode-selection
basket-view-motion
hud-telemetry
nexusengine-balloon-telemetry
gamehost-state
```

## Gameplay authority gap

The current runtime is source-owned only inside `src/main.js`. There is no fixture-readable source snapshot describing:

```txt
route id
visible product mode
control map
burner/vent defaults
wind model constants
altitude bands
ground-clearance rule
camera mode rule
object kit id
legacy flight compatibility status
```

## Required next consumer loop

```txt
BalloonDriftConfig
  -> SourceSnapshot
  -> SourceAcceptanceLedger
  -> SourceReadbackLedger
  -> GameHostSourceReadback
  -> browser consumer fixture
  -> unchanged live gameplay loop
```

## Non-goals

```txt
Do not add win/loss objectives.
Do not add Cloud Basin progression.
Do not retune drift speed.
Do not add new controls.
Do not replace inline gameplay logic yet.
```

## Gameplay finding

The gameplay is playable enough for this stage. The next useful work is proving that the current gameplay source can be read, accepted, and projected consistently before route progression or mission mechanics are added.
