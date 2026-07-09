# Gameplay Audit — Balloon Drift Source Loop

**Timestamp:** `2026-07-08T20-10-32-04-00`

## Current playable loop

```txt
player opens the page
  -> sees Balloon Drift HUD
  -> holds Space / W / ArrowUp for burner lift
  -> holds S / ArrowDown / Shift for vent descent
  -> wind updates over time
  -> balloon drifts horizontally and vertically
  -> altitude is clamped above terrain clearance
  -> wheel moves between pulled-back camera and near-basket view
  -> HUD reports heat, camera mode, altitude, wind, and drift distance
```

## Runtime constants currently owned inline

```txt
initial position: [0, 105, 0]
initial velocity: [8, 0, -10]
initial wind: [8, 0, -10]
initial burner: 0.22
rest burner: 0.18
burner target: 1
vent target: 1
burner smooth rate: 3.2
vent smooth rate: 3.6
wind angle base: -0.86
wind speed base: 9.4
burner lift multiplier: 3.7
vent descent multiplier: 3.2
vertical velocity clamp: -8..8
terrain clearance: 30
ceiling threshold: 270
ceiling softness coefficient: 0.024
altitude damping: 0.74
camera zoom default: 44
camera zoom step: 4
camera zoom clamp: 0..92
first-person blend smooth rate: 5.6
camera position smooth rate: 3.1
```

## Gameplay source gap

The live gameplay is internally coherent, but not source-contract coherent:

```txt
CAMPAIGN still describes thermals, gates, perch return, and old region objectives.
FLIGHT still exposes legacy bird/glider speed, pitch, roll, boost, thermal, and terrain clearance values.
The live balloon route does not read a canonical BALLOON_DRIFT config.
No route object descriptor exists for the current lift/landing route.
No altitude band descriptor exists for low-clearance, comfort, high-drift, or landing states.
No wind lane hint descriptor exists.
No source acceptance row proves the runtime constants match the documented product.
```

## Target gameplay authority loop

```txt
OPEN_ABOVE_PRODUCT
  -> BALLOON_DRIFT config
  -> ALTITUDE_BANDS
  -> ROUTE_OBJECTS
  -> WIND_LANE_HINTS
  -> SOURCE_MANIFEST
  -> SourceAcceptanceResult rows
  -> SourceAcceptanceLedger
  -> GameHost source diagnostics
  -> DOM-free source fixture
  -> later route event result / mission snapshot
```

## First fixture rows

```txt
balloon_drift_config_matches_inline_runtime_defaults
balloon_drift_config_drives_runtime_defaults
altitude_bands_have_non_overlapping_thresholds
route_objects_define_lift_guides_and_landing
wind_lane_hints_match_route_objects
dom_free_fixture_runs_without_canvas_webgl_or_dom
```

## Deferred gameplay work

```txt
route event acceptance/rejection reason catalog
route event journal
route state reducer
mission snapshot projector
Cloud Basin unlock proof
progression/save-state surface
```

## Decision

Add source authority before gameplay expansion. The existing balloon drift loop should be treated as the source-of-truth behavior to mirror, not as a target to retune.
