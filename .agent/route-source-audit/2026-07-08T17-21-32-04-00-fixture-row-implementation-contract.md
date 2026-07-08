# Route Source Audit — Fixture Row Implementation Contract

**Timestamp:** `2026-07-08T17-21-32-04-00`

## Goal

Define the exact fixture-row contract needed to prove that `TheOpenAbove` has one current source authority: the hot-air-balloon drift route.

## Source conflict to close

```txt
README.md: older free-flight / carving / gliding / thermals / wind-gates / sky-perch product copy
package.json: older free-flight description
src/data/campaign.config.js: CAMPAIGN/WORLD/FLIGHT still model old thermal/gate route
index.html: live hot-air-balloon Balloon Drift route
src/main.js: live hot-air-balloon burner/vent/wind/altitude/camera loop
```

## Fixture rows

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

## Acceptance result shape

```txt
SourceAcceptanceResult {
  id: string,
  status: "accepted" | "rejected",
  reason: string,
  expected?: unknown,
  actual?: unknown,
  sourceFiles: string[],
  checkedAt: string
}
```

## Ledger shape

```txt
SourceAcceptanceLedger {
  productId: "the-open-above",
  routeId: "balloon-drift",
  rows: SourceAcceptanceResult[],
  acceptedCount: number,
  rejectedCount: number,
  sourceFingerprint: string
}
```

## Source snapshot shape

```txt
BalloonSourceSnapshot {
  product,
  campaign,
  world,
  balloonDrift,
  altitudeBands,
  routeObjects,
  windLaneHints,
  visualObjectKit,
  runtimeDefaults,
  compatibility
}
```

## Source fingerprint inputs

```txt
OPEN_ABOVE_PRODUCT.productId
OPEN_ABOVE_PRODUCT.currentRouteId
BALLOON_DRIFT.version
BALLOON_DRIFT.initialState
BALLOON_DRIFT.wind
BALLOON_DRIFT.buoyancy
BALLOON_DRIFT.camera
ALTITUDE_BANDS ids and thresholds
ROUTE_OBJECTS ids and target types
WIND_LANE_HINTS ids
HOT_AIR_BALLOON_OBJECT_KIT_ID
```

## Main consumer splice

```txt
src/main.js
  -> import OPEN_ABOVE_PRODUCT
  -> import BALLOON_DRIFT
  -> import createBalloonSourceSnapshot
  -> import createSourceAcceptanceLedger
  -> import createGameHostSourceReadback
  -> keep current visible constants behavior stable
  -> expose getState().source additively
```

## Main finding

The fixture contract should be implemented before any mission/progression expansion. The route cannot safely grow until source rows prove that the current route is balloon drift everywhere that durable source, runtime config, host diagnostics, and fixture logic describe it.
