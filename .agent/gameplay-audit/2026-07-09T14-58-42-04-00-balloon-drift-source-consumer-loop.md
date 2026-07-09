# Gameplay Audit — Balloon Drift Source Consumer Loop

**Timestamp:** `2026-07-09T14-58-42-04-00`

## Current gameplay loop

```txt
load route
  -> spawn balloon over meadow
  -> hold Space/W/ArrowUp for burner lift
  -> hold S/ArrowDown/Shift for vent descent
  -> wind field drifts balloon horizontally
  -> ground clearance clamps unsafe descent
  -> soft ceiling dampens high altitude
  -> scroll wheel shifts between third-person and basket view
  -> HUD reports heat, camera mode, altitude, wind, and drift distance
```

## Gameplay domains

```txt
balloon-state
burner-intent
vent-intent
wind-drift
buoyancy
altitude-floor
soft-ceiling
camera-mode
basket-view
telemetry-HUD
NexusEngine telemetry event
```

## Main gameplay finding

The visible gameplay is Balloon Drift, not the older bird/free-flight mission described in README/package/campaign config. That mismatch creates avoidable agent confusion. The next safe pass should preserve gameplay behavior while making the source consumer loop explicit.

## Next gameplay proof rows

```txt
burner control copy matches runtime input
vent control copy matches runtime input
wheel/basket-view copy matches runtime input
legacy FLIGHT values marked compatibility-only
current object type reports hot-air-balloon
GameHost source readback reports Balloon Drift
DOM-free fixture proves source records without changing gameplay
```
