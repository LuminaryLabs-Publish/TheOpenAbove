# Gameplay Audit — Balloon Drift Config Replay Loop

**Timestamp:** `2026-07-08T17-31-22-04-00`

## Summary

The live gameplay loop is already balloon drift: burner lift, vent descent, wind-carried horizontal movement, soft ceiling, terrain clearance, distance accumulation, and camera mode blend. The missing piece is replayable source authority for those values.

## Current player loop

```txt
read HUD
  -> hold Space / W / ArrowUp for burner lift
  -> hold S / ArrowDown / Shift for vent descent
  -> watch wind drift move the balloon
  -> use mouse wheel for camera distance / basket blend
  -> maintain altitude above terrain
  -> accumulate drift distance
  -> read altitude, wind, drift, heat, and camera mode from HUD
```

## Runtime constants currently inline

```txt
initial position: [0, 105, 0]
initial velocity: [8, 0, -10]
initial wind: [8, 0, -10]
initial burner: 0.22
rest burner target: 0.18
burner pressed target: 1
vent pressed target: 1
burner smoothing rate: 3.2
vent smoothing rate: 3.6
wind angle base: -0.86
wind angle slow sine amplitude: 0.32
wind angle fast sine amplitude: 0.08
wind speed base: 9.4
wind speed mid sine amplitude: 2.1
wind speed slow sine amplitude: 1.4
buoyancy base: 0.36
burner lift multiplier: 3.7
vent descent multiplier: 3.2
gravity offset: 0.92
altitude damping coefficient: 0.74
soft ceiling threshold: 270
soft ceiling coefficient: 0.024
vertical velocity clamp: -8..8
terrain clearance: 30
camera zoom default: 44
camera zoom step: 4
camera zoom clamp: 0..92
first-person blend smoothing rate: 5.6
camera position smoothing rate: 3.1
```

## Target replay source

```txt
BALLOON_DRIFT
  -> initialState
  -> inputMap
  -> burnerVentSmoothing
  -> windModel
  -> buoyancyModel
  -> altitudeSafety
  -> distanceAccumulator
  -> cameraBlend
  -> visibleCompatibilityMarkers
```

## Required result envelopes

```txt
DriftConfigResult:
  status: accepted | rejected
  reason
  configVersion
  matchedRuntimeConstants[]
  missingRuntimeConstants[]
  warnings[]

BalloonRouteReplayResult:
  status: accepted | rejected
  routeId
  elapsed
  altitudeBand
  windLaneHint
  routeObjectStates[]
  localShapePreserved
  nexusShapePreserved

SourceAcceptanceResult:
  rowId
  status
  reason
  expected
  observed
  sourceFiles[]
```

## First fixture rows

```txt
balloon_drift_config_matches_inline_runtime_defaults
balloon_drift_config_drives_runtime_defaults
altitude_bands_have_non_overlapping_thresholds
route_objects_define_three_lift_gates_and_one_landing
wind_lane_hints_match_route_objects
dom_free_fixture_runs_without_canvas_webgl_or_dom
existing_local_snapshot_shape_preserved
existing_nexus_snapshot_shape_preserved
```

## Do not change during this ledge

```txt
wind feel
burner feel
vent feel
balloon speed
camera distance
first-person basket blend
balloon geometry
terrain layout
cloud density
HUD text except source-proof marker after fixture integration
```

## Next reducer after source proof

After source manifest and replay fixtures exist, add route event authority:

```txt
InputFrame
  -> BurnerVentIntent
  -> DriftStepResult
  -> AltitudeBandChangedEvent
  -> RouteObjectEnteredEvent
  -> RouteObjectCompletedEvent
  -> BalloonRouteJournal
  -> MissionSnapshot
```

That reducer should wait until product/config/runtime parity is fixture-proven.
