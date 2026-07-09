# Route Source Audit — Browser Consumer Fixture Matrix

**Timestamp:** `2026-07-09T00-30-24-04-00`

## Scope

This audit defines the route-source fixture matrix needed before wider gameplay or render extraction.

## Current mismatch

```txt
runtime route:
  hot-air-balloon drift
  burner / vent / wind / altitude
  basket camera
  HUD says The Open Above: Balloon Drift

source route:
  README says free-flight, carving, gliding, diving, boosting
  package says standalone free-flight exploration
  campaign region says canopy carving, thermals, wind gates, sky perch
  FLIGHT config remains free-flight shaped
```

## Required source modules

```txt
src/source/open-above-product.js
  owns product id, title, current route id, route label, product copy, and compatibility note

src/source/balloon-drift.config.js
  owns live drift constants mirrored from src/main.js

src/source/altitude-bands.js
  owns altitude state descriptors and non-overlap rules

src/source/route-descriptors.js
  owns lift guidance, drift guidance, basket camera guidance, and future landing descriptor

src/source/wind-lane-hints.js
  owns named wind-lane hints for route readability

src/source/source-manifest.js
  owns list of source/runtime consumers and fixture expectations

src/source/source-fingerprint.js
  owns stable fingerprint fields from product/config/route/runtime markers

src/source/source-snapshot.js
  projects source modules into fixture-readable snapshot

src/source/source-acceptance.js
  owns SourceAcceptanceResult and SourceAcceptanceLedger helpers

src/source/gamehost-source-readback.js
  projects additive GameHost source diagnostics while preserving existing local/nexusEngine outputs
```

## DOM-free fixture matrix

```txt
product_copy_matches_balloon_drift:
  README/package/campaign fixtures agree on Balloon Drift route copy.

package_description_matches_balloon_drift:
  package description no longer advertises free-flight exploration.

campaign_copy_marks_balloon_drift_current_route:
  Meadow Lift copy describes burner/vent/wind/landing rather than thermals/gates/perch.

legacy_flight_marked_compatibility_only:
  FLIGHT remains only as compatibility/deprecated source until removal is proven safe.

balloon_drift_config_matches_inline_runtime_defaults:
  BALLOON_DRIFT mirrors current constants exactly.

balloon_drift_config_drives_runtime_defaults:
  src/main.js consumes config without visible behavior drift.

source_manifest_lists_all_runtime_consumers:
  manifest includes README, package, campaign, main runtime, GameHost, tests, and fixture script.

source_fingerprint_reports_copy_config_runtime_markers:
  fingerprint includes copy/config/runtime source markers.

source_snapshot_reports_visual_object_kit:
  snapshot reports open-above-hot-air-balloon-object-kit and sub-kits.

source_snapshot_reports_basket_camera_defaults:
  snapshot reports zoom/blend/focus/first-person constants.

gamehost_reports_balloon_source_snapshot:
  GameHost exposes source snapshot additively.

altitude_bands_have_non_overlapping_thresholds:
  altitude bands are ordered and non-overlapping.

route_objects_define_lift_guides_and_landing:
  route descriptors cover lift guidance, drift guidance, basket view, and landing.

wind_lane_hints_match_route_objects:
  wind hints reference known route descriptors.

dom_free_fixture_runs_without_canvas_webgl_or_dom:
  source fixture runs through node without DOM/WebGL/Three/Nexus runtime boot.

browser_consumer_reads_source_projection:
  browser-level readback can assert GameHost source shape after route boot.

existing_local_snapshot_shape_preserved:
  additive source readback does not remove or rename local fields.

existing_nexus_snapshot_shape_preserved:
  additive source readback does not remove or rename nexusEngine fields.

npm_check_runs_source_fixture:
  check script executes source fixture.

npm_build_runs_source_fixture_before_vite_build:
  build still runs check before vite build.
```

## Browser consumer shape target

```txt
window.GameHost.getState() -> {
  local: { ...existing fields },
  nexusEngine: { ...existing telemetry },
  source: {
    product,
    route,
    driftConfig,
    altitudeBands,
    routeObjects,
    windLaneHints,
    manifest,
    fingerprint,
    snapshot,
    acceptanceLedger,
    browserConsumerReadback,
    fixtureStatus,
    preservedHostShapes
  }
}
```

## Stop line

Do not add mission progression, route events, UI expansion, renderer extraction, shared-kit promotion, or physics tuning until this matrix is source-backed and wired to `npm run check`.
