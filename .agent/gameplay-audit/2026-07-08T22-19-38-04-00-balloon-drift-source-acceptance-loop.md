# Gameplay Audit — Balloon Drift Source Acceptance Loop

**Timestamp:** `2026-07-08T22-19-38-04-00`

## Current loop

```txt
player opens route
  -> reads Balloon Drift HUD
  -> holds burner input to climb
  -> holds vent input to descend
  -> procedural wind carries balloon
  -> wheel blends third-person and basket view
  -> frame updates altitude / wind / distance / camera / telemetry
```

## Current authority boundary

`src/main.js` owns the playable authority directly:

```txt
keyboard input state
burner smoothing
vent smoothing
wind angle / wind speed sampling
buoyancy calculation
vertical velocity clamp
terrain clearance clamp
altitude calculation
distance accumulation
camera mode blend
HUD projection
GameHost local snapshot
```

## Missing gameplay source records

```txt
BalloonDriftConfig
AltitudeBand
RouteObject
WindLaneHint
RouteAcceptanceResult
RouteAcceptanceLedger
RouteFixtureRow
MissionSnapshot
ProgressionSnapshot
```

## Required source acceptance chain

```txt
BALLOON_DRIFT config mirrors current inline constants
  -> ALTITUDE_BANDS classify current altitude
  -> ROUTE_OBJECTS define lift guidance, drift guidance, and meadow landing
  -> WIND_LANE_HINTS describe readable wind lanes
  -> SourceAcceptanceResult proves docs/config/runtime parity
  -> SourceAcceptanceLedger collects rows
  -> GameHost source readback exposes latest source state
  -> DOM-free fixture rows verify parity without renderer boot
```

## Do later

```txt
route event result envelope
route event journal
mission reducer
Cloud Basin unlock progression
terrain/world descriptor extraction
renderer/camera/HUD kit extraction
```

## Acceptance rows

```txt
balloon_drift_config_matches_inline_runtime_defaults
balloon_drift_config_drives_runtime_defaults
altitude_bands_have_non_overlapping_thresholds
route_objects_define_lift_guides_and_landing
wind_lane_hints_match_route_objects
dom_free_fixture_runs_without_canvas_webgl_or_dom
```
