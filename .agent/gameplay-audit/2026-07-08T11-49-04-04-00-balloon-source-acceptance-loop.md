# Gameplay Audit — Balloon Source Acceptance Loop

**Timestamp:** `2026-07-08T11-49-04-04-00`

## Summary

The player-facing loop is already balloon drift. The gameplay authority gap is that route goals are not source-owned: the current runtime provides drift, burner, vent, wind, altitude, distance, and camera telemetry, but it does not yet convert those facts into accepted/rejected route-source or mission records.

## Current loop

```txt
load route
  -> create balloon state
  -> hold burner keys to climb
  -> hold vent keys to descend
  -> procedural wind moves balloon horizontally
  -> altitude safety clamps near terrain
  -> distance increments from horizontal velocity
  -> HUD reports heat/camera/altitude/wind/distance
  -> GameHost reports local/nexus telemetry
```

## Current source facts from runtime

```txt
objectType: hot-air-balloon
region: CAMPAIGN.regions[0].id or meadow-lift
controls: Space / W / ArrowUp burner, S / ArrowDown / Shift vent
initial position: [0, 105, 0]
initial velocity: [8, 0, -10]
initial wind: [8, 0, -10]
initial burner: 0.22
burner idle target: 0.18
wind angle: -0.86 + sine offsets
wind speed: 9.4 + sine offsets
buoyancy: 0.36 + burner * 3.7 - vent * 3.2
ceiling soft limit: 270
vertical velocity clamp: -8..8
ground clearance: terrainHeight + 30
camera zoom default: 44
```

## Source acceptance gameplay model

```txt
ProductSource
  -> DriftConfig
  -> RuntimeSnapshot
  -> SourceAcceptanceResult
  -> AltitudeBandResult
  -> RouteObjectProjection
  -> WindLaneHintProjection
  -> MissionSnapshot
  -> GameHost source readback
```

## Required contracts

### ProductSource

```txt
id: the-open-above
currentRoute: balloon-drift
currentVehicle: hot-air-balloon
currentRegion: meadow-lift
legacyRouteCompatibility: flight-compatible-config-present
```

### DriftConfig

```txt
initialPosition
initialVelocity
initialWind
initialBurner
idleBurner
burnerLiftScale
ventDescentScale
altitudeDamping
ceilingY
ceilingSoftness
verticalVelocityMin
verticalVelocityMax
groundClearance
cameraZoomDefault
firstPersonZoomRange
```

### SourceAcceptanceResult

```txt
rowId
status: accepted | rejected | blocked
reason
expected
actual
sourcePath
runtimePath
```

### MissionSnapshot

```txt
routeId
regionId
vehicle
elapsed
distance
altitude
altitudeBandId
activeRouteObjectId
activeWindLaneHintId
completionState
unlockPreview
```

## First fixture rows

```txt
product_copy_matches_balloon_drift
package_description_matches_balloon_drift
campaign_copy_marks_balloon_drift_current_route
legacy_flight_marked_compatibility_only
balloon_drift_config_matches_inline_runtime_defaults
balloon_drift_config_drives_runtime_defaults
source_fingerprint_reports_copy_config_runtime_markers
gamehost_reports_balloon_source_snapshot
altitude_bands_have_non_overlapping_thresholds
route_objects_define_three_lift_gates_and_one_landing
wind_lane_hints_match_route_objects
dom_free_fixture_runs_without_canvas_webgl_or_dom
```

## Acceptance order

```txt
1. Add source/config exports.
2. Mirror current inline runtime constants exactly.
3. Add source snapshot and fingerprint helpers.
4. Add acceptance row helpers.
5. Add DOM-free fixture harness.
6. Project the same result into GameHost.
7. Only then add route event results and mission reducer.
```

## Gameplay risk

Changing the drift numbers while extracting config would make the route feel different and mask the real source-authority fix.

Preserve current visual/player behavior until fixtures prove config parity.
