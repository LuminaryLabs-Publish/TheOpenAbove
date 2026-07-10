# Gameplay Audit: Balloon Drift Source Result Loop

Timestamp: `2026-07-10T13-21-23-04-00`

## Current gameplay loop

```txt
createBalloonSimulation
  -> keyboard Set owns burner and vent intents
  -> update(dt) integrates wind, buoyancy, venting, altitude, ground clearance, velocity, and distance
  -> applyToBalloon mutates balloon pose
  -> snapshot emits aggregate drifting state
  -> telemetry engine publishes local snapshot into NexusEngine
  -> HUD renders current aggregate state
```

## Current gameplay identity

The active route is not the older bird/free-flight route. It is hot-air-balloon drift with burner, vent, wind, altitude, camera, presentation, and telemetry.

## Gap

The simulation produces aggregate snapshots, but there is no source result ledger for:

```txt
burner_input_result
vent_input_result
wind_update_result
buoyancy_update_result
altitude_clamp_result
ground_clearance_result
simulation_snapshot_source_id
telemetry_publish_result
hud_projection_result
```

## Next proof

Add source result rows for the Balloon Drift route and expose them through the source fixture, GameHost source readback, and headless editor check.
