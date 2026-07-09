# Gameplay Audit — Runtime Constant Parity Loop

**Timestamp:** `2026-07-08T20-01-23-04-00`

## Current gameplay loop

```txt
keyboard input
  -> burner target / vent target
  -> wind field sampled from elapsed time
  -> buoyancy / damping / ceiling softness
  -> vertical velocity clamp
  -> velocity lerp toward wind and vertical velocity
  -> position integration
  -> terrain clearance clamp
  -> altitude and drift distance projection
  -> balloon visual animation
  -> camera and HUD projection
```

## Current controls

```txt
Space / W / ArrowUp      burner lift
S / ArrowDown / Shift    vent descent
Mouse wheel              camera zoom / basket-view blend
```

## Runtime constants that need source parity

```txt
initialPosition: [0, 105, 0]
initialVelocity: [8, 0, -10]
initialWind: [8, 0, -10]
initialBurner: 0.22
restBurnerTarget: 0.18
burnerPressedTarget: 1
ventPressedTarget: 1
burnerSmoothRate: 3.2
ventSmoothRate: 3.6
windAngleBase: -0.86
windAngleLongWave: 0.045
windAngleShortWave: 0.11
windSpeedBase: 9.4
windSpeedPrimaryWave: 0.063
windSpeedSecondaryWave: 0.017
burnerLiftMultiplier: 3.7
ventDescentMultiplier: 3.2
altitudeDamping: 0.74
ceilingSoftThreshold: 270
ceilingSoftnessCoefficient: 0.024
gravityBias: 0.92
verticalVelocityMin: -8
verticalVelocityMax: 8
terrainClearance: 30
cameraZoomDefault: 44
cameraZoomWheelStep: 4
cameraZoomMin: 0
cameraZoomMax: 92
firstPersonBlendSmoothRate: 5.6
cameraPositionSmoothRate: 3.1
```

## Current gameplay source mismatch

```txt
README milestone still describes thermals, wind gates, and sky-perch return.
CAMPAIGN objective still lists thermalTarget, gateTarget, returnRadius, and timeLimitSeconds.
FLIGHT config still exposes minSpeed, cruiseSpeed, pitch, roll, boost, thermal lift, and terrain clearance.
src/main.js ignores the free-flight FLIGHT loop and instead runs balloon drift physics inline.
```

## Next gameplay proof rows

```txt
balloon_drift_config_matches_inline_runtime_defaults
balloon_drift_config_drives_runtime_defaults
legacy_flight_marked_compatibility_only
campaign_copy_marks_balloon_drift_current_route
route_objects_define_lift_guides_and_landing
altitude_bands_have_non_overlapping_thresholds
wind_lane_hints_match_route_objects
mission_snapshot_projects_balloon_drift_status
```

## Do not do next

```txt
do not tune the drift feel
do not change input mapping
do not add Cloud Basin gameplay
do not remove FLIGHT until route dependency is proven absent
do not replace the hot-air-balloon object family
do not extract physics until config parity and fixture rows pass
```
