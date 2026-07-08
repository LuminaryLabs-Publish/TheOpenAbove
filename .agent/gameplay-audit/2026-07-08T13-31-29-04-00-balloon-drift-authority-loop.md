# Gameplay Audit — Balloon Drift Authority Loop

**Timestamp:** `2026-07-08T13-31-29-04-00`

## Current gameplay loop

```txt
player opens route
  -> balloon starts over valley
  -> wind drifts balloon horizontally
  -> Space / W / ArrowUp increases burner lift
  -> S / ArrowDown / Shift opens vent descent
  -> altitude is clamped above terrain clearance
  -> wheel changes camera distance and basket-view blend
  -> player watches altitude, wind, drift distance, heat, and camera mode in HUD
```

## Current authority location

The actual gameplay authority is inline in `src/main.js`:

```txt
state.position
state.velocity
state.wind
state.verticalVelocity
state.altitude
state.burner
state.vent
state.elapsed
state.distance
state.message
```

The loop is readable, but it is not fixture-readable as a product route yet.

## Interaction inputs

```txt
Space       -> burner pressed
KeyW        -> burner pressed
ArrowUp     -> burner pressed
KeyS        -> vent pressed
ArrowDown   -> vent pressed
ShiftLeft   -> vent pressed
ShiftRight  -> vent pressed
wheel       -> camera zoom / first-person blend target
blur        -> clear inputs
```

## Source-authority problem

The playable action is balloon drift, but the durable milestone still says:

```txt
catch three thermals
fly through five wind gates
return to the sky perch
unlock Cloud Basin
```

That older objective language does not match the current hot-air-balloon route.

## Target gameplay authority loop

```txt
BalloonInputIntent
  -> BurnerVentIntent
  -> BalloonDriftConfig
  -> WindFieldSample
  -> BuoyancyResult
  -> AltitudeSafetyResult
  -> BalloonFrameResult
  -> BalloonSourceSnapshot
  -> RouteObjectEvaluation
  -> MissionSnapshot
  -> GameHost diagnostics
  -> DOM-free fixture row
```

## Route descriptors to add

The next source pass should add descriptors before adding mission progression logic:

```txt
route object: valley-lift-gate-01
route object: valley-lift-gate-02
route object: valley-lift-gate-03
route object: meadow-landing-zone
altitude band: low-clearance
altitude band: comfort-drift
altitude band: high-drift
altitude band: meadow-landing
wind lane hint: beginner-drift-lane
wind lane hint: lake-crosswind-lane
wind lane hint: landing-approach-lane
```

## Acceptance rows for gameplay source proof

```txt
balloon_input_map_preserves_current_keys
balloon_drift_config_preserves_current_initial_state
burner_vent_defaults_match_current_runtime
wind_defaults_match_current_runtime
altitude_safety_defaults_match_current_runtime
camera_zoom_defaults_match_current_runtime
route_objects_exist_before_route_reducer
altitude_bands_exist_before_mission_reducer
wind_lane_hints_exist_before_mission_reducer
legacy_flight_object_marked_compatibility_only
```

## Do not do yet

- Do not create a full mission reducer until route descriptors are fixture-proven.
- Do not add region unlock behavior until mission snapshot proof exists.
- Do not tune burner/vent/wind constants during this pass.
- Do not remove `FLIGHT` until route dependency proof exists.
- Do not replace the hot-air-balloon object kit.