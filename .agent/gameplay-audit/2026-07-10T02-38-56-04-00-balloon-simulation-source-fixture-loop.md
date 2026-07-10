# Gameplay Audit: Balloon Simulation Source Fixture Loop

**Timestamp:** `2026-07-10T02-38-56-04-00`

## Current gameplay loop

```txt
createBalloonSimulation({ terrainHeight, startPosition })
  -> install keydown / keyup / blur listeners
  -> update(dt)
  -> derive burnerPressed from Space / W / ArrowUp
  -> derive ventPressed from S / ArrowDown / Shift
  -> lerp burner and vent
  -> compute altitude layer
  -> compute wind angle and wind speed
  -> integrate buoyancy, damping, ceiling softness, gravity, and vertical velocity
  -> lerp velocity toward wind and vertical velocity
  -> move balloon position
  -> clamp against terrainHeight + 30
  -> compute altitude and distance
  -> applyToBalloon(balloon)
  -> snapshot(extra)
```

## Current services

```txt
keyboard intent service: browser event listeners feed burner and vent state.
wind service: procedural wind vector changes by elapsed time and altitude layer.
vertical motion service: integrates burner, vent, damping, ceiling, gravity, and ground safety.
pose service: applies position and rotation to balloon object.
snapshot service: serializes status, object type, elapsed, altitude, burner, vent, wind speed, distance, position, velocity, wind, and message.
```

## Gap

The simulation has a clean snapshot, but it does not have source authority rows.

Missing proof:

```txt
input_intent_rows
burner_command_rows
vent_command_rows
simulation_config_source_rows
legacy_flight_compatibility_rows
terrain_height_consumer_rows
ground_clamp_result_rows
snapshot_source_fingerprint
headless_simulation_fixture
```

## Current risk

`src/data/campaign.config.js` still includes `FLIGHT`, thermal, gate, perch, and start-speed style fields from an older flight route.

`src/main.js` actually drives a Balloon Drift hot-air-balloon simulation.

Without source acceptance rows, future work may accidentally retune the wrong source or delete useful compatibility fields without proof.

## Next cut

Add a source fixture that can run without DOM and prove:

```txt
current route = balloon-drift
legacy free-flight fields = classified, not silently ignored
simulation start config = source-owned
accepted fields = listed
legacy-compatible fields = listed
ignored/deferred fields = listed
GameHost source block = additive and stable
```
