# Gameplay Audit — Balloon Drift Runtime Loop

**Timestamp:** `2026-07-09T17-58-53-04-00`

## Player loop

```txt
drift over meadow
  -> hold Space/W/ArrowUp for burner lift
  -> hold S/ArrowDown/Shift for vent descent
  -> scroll to move between third-person and basket view
  -> wind changes direction and speed over time
  -> altitude is clamped above terrain
  -> HUD reports camera mode, altitude, wind, and drift distance
```

## Current gameplay authority

`src/main.js` owns the active game rules. `src/data/campaign.config.js` still carries older free-flight thermals, gates, perch, start speed, and `FLIGHT` constants.

## Main gameplay gap

The game has a clear cozy drift loop, but the durable product/campaign layer still says "free-flight exploration" rather than "hot-air-balloon wind drift."

## Safe next gameplay work

Do not add new objectives yet. First create source records that state the current route, controls, camera modes, and compatibility-only legacy fields.
