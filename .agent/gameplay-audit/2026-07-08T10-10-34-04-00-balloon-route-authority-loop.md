# Gameplay Audit — Balloon Route Authority Loop

**Timestamp:** `2026-07-08T10-10-34-04-00`

**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

## Summary

The player-facing loop is already hot-air-balloon drift. The unresolved gameplay issue is that route authority is still implicit in inline drift state, legacy campaign copy, and HUD text instead of explicit source-owned route descriptors and result records.

## Current player loop

```txt
read balloon drift HUD
  -> hold Space / W / ArrowUp for burner lift
  -> hold S / ArrowDown / Shift for vent descent
  -> drift with procedural wind
  -> use wheel to move between third-person and near-basket view
  -> read altitude, wind, distance, heat, and camera mode
```

## Current runtime loop

```txt
keyboard state
  -> burnerPressed / ventPressed
  -> smooth burner / vent values
  -> sample wind angle and speed
  -> compute buoyancy, altitude damping, ceiling softness, vertical velocity
  -> blend velocity toward wind
  -> integrate position
  -> clamp above terrain clearance
  -> compute altitude and distance
  -> update balloon pose and animation
  -> tick Nexus telemetry
  -> draw camera / HUD frame
  -> GameHost snapshot
```

## Gameplay domains in use

```txt
balloon-input-map
burner-vent-intent
balloon-drift-physics
wind-field
altitude-safety
terrain-clearance
balloon-vehicle-state
camera-mode-intent
hud-telemetry
nexus-balloon-telemetry
route-source-authority
altitude-band-contract
route-object-descriptor
route-object-evaluator
route-order-policy
route-event-contract
route-event-result-envelope
route-event-journal
mission-snapshot-projector
region-unlock-progression
```

## Current authority gaps

```txt
No BALLOON_DRIFT config owns the drift constants yet.
No source-owned altitude bands exist.
No source-owned route object descriptors exist.
No source-owned wind lane hints exist.
No route event envelope exists.
No route rejection reason catalog exists.
No route event journal exists.
No mission snapshot projector exists.
No source acceptance ledger proves docs/config/runtime agreement.
```

## Acceptance rows for the next implementation

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

## Route object target

```txt
ROUTE_OBJECTS
  lift_gate_01
    type: lift-gate
    expectedAltitudeBand: comfort-drift
    order: 1
  lift_gate_02
    type: lift-gate
    expectedAltitudeBand: comfort-drift
    order: 2
  lift_gate_03
    type: lift-gate
    expectedAltitudeBand: high-drift
    order: 3
  meadow_landing
    type: landing
    expectedAltitudeBand: meadow-landing
    order: 4
```

## Result envelope target

```txt
BalloonRouteEventResult
  eventId
  accepted
  reason
  previousRouteState
  nextRouteState
  changedFields
  telemetry
  sourceFingerprint
```

## Rejection reasons to reserve

```txt
route_object_unknown
route_object_out_of_order
altitude_band_too_low
altitude_band_too_high
distance_outside_radius
route_already_completed
source_snapshot_missing
```

## Non-goals

```txt
Do not create a full combat/gameplay system.
Do not add new regions yet.
Do not remove FLIGHT yet.
Do not rewrite the renderer.
Do not change balloon controls or visible drift feel in the source-authority pass.
```

## Stop condition

The gameplay ledge is complete when source-owned product/config/route fixtures can replay route acceptance without DOM, canvas, or WebGL, and the browser route can still expose the same hot-air-balloon drift telemetry through GameHost.