# Route Source Audit — Source Acceptance Row Map

**Timestamp:** `2026-07-08T20-01-23-04-00`

## Goal

Define the exact acceptance rows needed before `TheOpenAbove` starts moving runtime constants out of `src/main.js`.

## Source acceptance rows

```txt
product_copy_matches_balloon_drift
package_description_matches_balloon_drift
campaign_copy_marks_balloon_drift_current_route
legacy_flight_marked_compatibility_only
balloon_drift_config_matches_inline_runtime_defaults
balloon_drift_config_drives_runtime_defaults
source_manifest_lists_all_runtime_consumers
source_fingerprint_reports_copy_config_runtime_markers
source_snapshot_reports_visual_object_kit
gamehost_reports_balloon_source_snapshot
altitude_bands_have_non_overlapping_thresholds
route_objects_define_lift_guides_and_landing
wind_lane_hints_match_route_objects
dom_free_fixture_runs_without_canvas_webgl_or_dom
existing_local_snapshot_shape_preserved
existing_nexus_snapshot_shape_preserved
npm_check_runs_source_fixture
npm_build_runs_source_fixture_before_vite_build
```

## Acceptance result shape

```txt
SourceAcceptanceResult {
  id: string
  status: "accepted" | "rejected" | "warning"
  source: string
  observed: unknown
  expected: unknown
  reason: string
  changedFiles?: string[]
}
```

## Acceptance ledger shape

```txt
SourceAcceptanceLedger {
  generatedAt: string
  repository: "LuminaryLabs-Publish/TheOpenAbove"
  route: "balloon-drift"
  results: SourceAcceptanceResult[]
  acceptedCount: number
  rejectedCount: number
  warningCount: number
  status: "accepted" | "rejected" | "warning"
}
```

## Route descriptors to create

```txt
ROUTE_OBJECTS = [
  { id: "meadow-lift-start", kind: "spawn", product: "balloon-drift" },
  { id: "low-wind-lift", kind: "wind-lane-hint" },
  { id: "comfort-drift-band", kind: "altitude-band" },
  { id: "high-drift-band", kind: "altitude-band" },
  { id: "meadow-landing", kind: "landing-target" }
]
```

## Wind lane hints to create

```txt
WIND_LANE_HINTS = [
  { id: "valley-wind", direction: "forward-drift", source: "BALLOON_DRIFT.wind" },
  { id: "burner-lift", direction: "vertical-lift", source: "BALLOON_DRIFT.burner" },
  { id: "vent-descent", direction: "vertical-descent", source: "BALLOON_DRIFT.vent" }
]
```

## Source fixture command

```bash
node scripts/open-above-source-fixture.mjs
```

## Stop condition

The next pass can stop as soon as the source fixture can prove product/config/runtime parity without DOM/WebGL and `npm run check` invokes it.
