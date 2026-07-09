# Gameplay Audit — Balloon Route Source Authority Loop

**Timestamp:** `2026-07-08T22-08-07-04-00`

## Current player loop

```txt
open route
  -> read Balloon Drift HUD
  -> hold Space / W / ArrowUp for burner lift
  -> hold S / ArrowDown / Shift for vent descent
  -> drift through procedural wind
  -> use wheel to zoom into basket / first-person view
  -> watch altitude, wind, heat, drift distance, and camera mode update
```

## Current runtime authority

`src/main.js` owns the live route rules inline:

```txt
initial position [0, 105, 0]
initial velocity [8, 0, -10]
initial wind [8, 0, -10]
initial burner 0.22
rest burner 0.18
burner target 1
vent target 1
burner smooth rate 3.2
vent smooth rate 3.6
wind angle base -0.86
wind speed base 9.4
burner lift multiplier 3.7
vent descent multiplier 3.2
vertical velocity clamp -8..8
terrain clearance 30
ceiling soft threshold 270
ceiling softness coefficient 0.024
altitude damping 0.74
camera zoom default 44
camera zoom wheel step 4
camera zoom clamp 0..92
first-person blend smooth rate 5.6
camera position smooth rate 3.1
```

## Source authority gap

Durable source still describes the older free-flight route:

```txt
README describes carving, gliding, diving, boosting, thermals, wind gates, and sky-perch return.
package.json describes standalone free-flight exploration.
src/data/campaign.config.js still defines FLIGHT, thermals, gates, perch, pitch, roll, yaw, boost, and terrain clearance.
src/main.js plays Balloon Drift and never exposes a canonical product source object.
```

## Target route-source loop

```txt
UI / runtime boot
  -> OPEN_ABOVE_PRODUCT
  -> BALLOON_DRIFT
  -> ALTITUDE_BANDS
  -> ROUTE_OBJECTS
  -> WIND_LANE_HINTS
  -> SOURCE_MANIFEST
  -> SourceFingerprint
  -> SourceSnapshot
  -> SourceAcceptanceLedger
  -> GameHost source readback
  -> browser consumer fixture rows
  -> existing Balloon Drift runtime remains visually stable
```

## Gameplay descriptors to add before reducer work

```txt
ALTITUDE_BANDS
  low-clearance
  comfort-drift
  high-drift
  meadow-landing

ROUTE_OBJECTS
  burner-lift-guide-01
  burner-lift-guide-02
  wind-drift-guide
  meadow-landing-zone

WIND_LANE_HINTS
  valley-lane-main
  canopy-lift-arc
  landing-approach-lane
```

## Acceptance rows

```txt
balloon_drift_config_matches_inline_runtime_defaults
balloon_drift_config_drives_runtime_defaults
altitude_bands_have_non_overlapping_thresholds
route_objects_define_lift_guides_and_landing
wind_lane_hints_match_route_objects
dom_free_fixture_runs_without_canvas_webgl_or_dom
existing_local_snapshot_shape_preserved
existing_nexus_snapshot_shape_preserved
```

## Main finding

Do not build route reducers, mission journals, new regions, or gameplay objectives yet. First make the current Balloon Drift product source authoritative and fixture-readable.
