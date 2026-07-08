# Gameplay Audit — Balloon Source-Driven Route Loop

**Timestamp:** `2026-07-08T15-11-18-04-00`

## Intent

Define how the current balloon route should become source-driven before adding route reducers, mission completion, or Cloud Basin progression.

## Current playable loop

```txt
read HUD
  -> hold burner key for lift
  -> hold vent key for descent
  -> drift with procedural wind
  -> scroll between third-person and basket/near-first-person view
  -> monitor altitude, wind, distance, heat, camera mode, and Nexus marker
```

## Current source/runtime split

```txt
source files:
  README.md                  stale free-flight product description
  package.json               stale free-flight package description
  src/data/campaign.config.js legacy free-flight campaign/FLIGHT objects
  index.html                 current hot-air-balloon page metadata
  src/main.js                current live balloon runtime
  hot-air-balloon kits       current live balloon object family
```

The runtime is playable, but the route is not yet source-authoritative.

## Route authority target

```txt
OPEN_ABOVE_PRODUCT
  -> describes the current product as Balloon Drift

BALLOON_DRIFT
  -> owns burner, vent, wind, buoyancy, ceiling, clearance, camera, and HUD route constants

ALTITUDE_BANDS
  -> describes low-clearance, comfort-drift, high-drift, and meadow-landing states

ROUTE_OBJECTS
  -> describes route-readable lift gates and landing target without adding mission progression yet

WIND_LANE_HINTS
  -> describes wind-readable guidance metadata without changing visual wind ribbons yet

SourceAcceptanceLedger
  -> proves docs/config/runtime agree
```

## Event loop after source handoff

```txt
keyboard / wheel input
  -> existing runtime update path
  -> BALLOON_DRIFT constants used or parity-checked against old inline values
  -> source snapshot describes active route
  -> source acceptance ledger reports pass/fail rows
  -> GameHost exposes source readback
  -> later route reducer consumes route object and altitude-band descriptors
```

## Acceptance rows before gameplay reducers

```txt
product_copy_matches_balloon_drift
package_description_matches_balloon_drift
campaign_copy_marks_balloon_drift_current_route
legacy_flight_marked_compatibility_only
balloon_drift_config_matches_inline_runtime_defaults
balloon_drift_config_drives_runtime_defaults
source_fingerprint_reports_copy_config_runtime_markers
source_snapshot_reports_visual_object_kit
gamehost_reports_balloon_source_snapshot
altitude_bands_have_non_overlapping_thresholds
route_objects_define_three_lift_gates_and_one_landing
wind_lane_hints_match_route_objects
dom_free_fixture_runs_without_canvas_webgl_or_dom
existing_local_snapshot_shape_preserved
existing_nexus_snapshot_shape_preserved
```

## Do not do yet

```txt
Do not add route score.
Do not add route completion.
Do not unlock Cloud Basin.
Do not change burner/vent feel.
Do not retune wind.
Do not add fail states.
Do not remove FLIGHT.
Do not replace current GameHost.local / GameHost.nexusEngine shape.
```

## Next gameplay cut

```txt
source-driven route loop
  -> route event result envelope
  -> route event journal
  -> route reducer
  -> mission snapshot projector
  -> progression/unlock rules
```

The source-driven route loop is the next cut. It gives later gameplay reducers stable product/config descriptors to consume.
