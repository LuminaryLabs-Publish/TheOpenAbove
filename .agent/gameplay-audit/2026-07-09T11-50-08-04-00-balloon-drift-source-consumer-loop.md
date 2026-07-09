# Gameplay Audit — Balloon Drift Source Consumer Loop

**Timestamp:** `2026-07-09T11-50-08-04-00`

## Current gameplay loop

```txt
open app
  -> balloon starts at altitude 105
  -> player holds Space / W / ArrowUp for burner lift
  -> player holds S / ArrowDown / Shift for vent descent
  -> wheel changes camera zoom and first-person blend
  -> wind field drifts the balloon horizontally
  -> buoyancy, vent, damping, ceiling softness, and terrain ground clearance update altitude
  -> distance accumulates from horizontal velocity
  -> HUD reports heat, camera mode, altitude, wind, drift, and Nexus Engine Realtime Core
```

## Gameplay domains in use

```txt
balloon-input-map
burner-vent-intent
wind-field
buoyancy-integration
altitude-safety
ceiling-softness
wind-drift-motion
distance-tracking
basket-camera-transition
hud-telemetry
nexus-telemetry-publication
```

## Gameplay services in use

```txt
keydown/keyup/blur input capture
wheel zoom mutation
snapshot(status)
update(dt)
draw(dt)
updateHud()
engine.tick(dt)
engine.openAbove.getState()
window.GameHost.getState()
```

## Main gameplay finding

The game loop is coherent and should be preserved. The fragile layer is the source-description layer around it: README/package/campaign source still points at older free-flight gameplay while the live interaction loop is hot-air-balloon burner/vent drift.

## Next fixture rows

```txt
balloon_drift_controls_match_runtime
burner_input_maps_to_lift
vent_input_maps_to_descent
wheel_maps_to_camera_blend
wind_field_present_in_snapshot
altitude_safety_present_in_source_snapshot
hud_copy_matches_balloon_drift
legacy_flight_marked_compatibility_only
local_snapshot_shape_preserved
nexus_snapshot_shape_preserved
source_projection_added_additively
```

## Do not do next

Do not add missions, routes, wind gates, thermals, gliding, birds, collectibles, or Cloud Basin progression until the source consumer ledger is stable.
