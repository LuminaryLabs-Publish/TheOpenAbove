# Gameplay Audit — Balloon Drift Consumer Loop

**Timestamp:** `2026-07-09T00-40-20-04-00`

## Current gameplay loop

```txt
spawn balloon at meadow-lift route
  -> player holds Space/W/ArrowUp for burner lift
  -> player holds S/ArrowDown/Shift for vent descent
  -> wheel adjusts camera zoom and basket-view blend
  -> wind, buoyancy, altitude, velocity, distance, and position integrate every frame
  -> balloon object animates burner and rigging
  -> camera follows basket or blends into first-person basket view
  -> HUD reports burner/coast mode, camera mode, altitude, wind, drift, and Nexus marker
  -> GameHost exposes snapshot for diagnostics
```

## Gameplay domains

```txt
input-intent:
  burner pressed
  vent pressed
  scroll zoom

balloon state:
  position
  velocity
  wind
  verticalVelocity
  altitude
  burner
  vent
  elapsed
  distance
  message

physics rules:
  wind angle / wind speed oscillation
  buoyancy from burner and vent
  altitude damping
  ceiling softness above 270
  ground clearance from terrainHeight + 30
  horizontal distance accumulation

presentation rules:
  third-person basket focus
  first-person basket position/look
  ride bob
  ride sway
  burner vibration
  rope fade
  HUD telemetry
```

## Missing gameplay authority source

```txt
Burner/vent control copy is not in durable source modules.
Wind/buoyancy/altitude constants are not in durable source modules.
Camera mode thresholds are not in durable source modules.
Route object expectations are not in durable source modules.
Altitude band labels do not exist yet.
No fixture row proves inline runtime defaults match source defaults.
```

## Needed fixture rows

```txt
burner_controls_are_declared
vent_controls_are_declared
camera_zoom_controls_are_declared
balloon_initial_state_matches_runtime
wind_defaults_match_runtime
buoyancy_defaults_match_runtime
altitude_ceiling_matches_runtime
basket_camera_defaults_match_runtime
legacy_free_flight_config_marked_compatibility_only
```

## Main gameplay conclusion

The current gameplay loop is usable. The next work should make the live balloon loop fixture-readable before adding new objectives, Cloud Basin progression, landing goals, economy, or wider game state.
