# Route Source Audit — Central Ledger Catch-up Source Contract

**Timestamp:** `2026-07-08T20-10-32-04-00`

## Why this audit exists

The repo-local `.agent` state had advanced beyond the central ledger, and the source-authority implementation still has not landed. This audit keeps the next pass narrowly focused on a source contract that can be implemented without changing the current visual route.

## Current mismatch

```txt
visible runtime:
  hot-air-balloon Balloon Drift
  burner / vent controls
  wind drift
  basket camera blend
  Balloon Drift HUD

source documents:
  README still says free-flight, gliding, diving, boosting, thermals, wind gates, sky perch
  package description still says standalone free-flight exploration
  CAMPAIGN/WORLD/FLIGHT still expose older free-flight terminology and constants
```

## Required source files

```txt
src/source/open-above-product.js
src/source/balloon-drift.config.js
src/source/altitude-bands.js
src/source/route-descriptors.js
src/source/wind-lane-hints.js
src/source/source-manifest.js
src/source/source-fingerprint.js
src/source/source-snapshot.js
src/source/source-acceptance.js
src/source/gamehost-source-readback.js
scripts/open-above-source-fixture.mjs
```

## Product source contract

`OPEN_ABOVE_PRODUCT` should include:

```txt
id: the-open-above
currentRoute: balloon-drift
objectType: hot-air-balloon
routeTitle: Balloon Drift
controls: burner / vent / wheel zoom
legacyRoutes: free-flight compatibility only
runtimeEntry: src/main.js
visualObjectKit: open-above-hot-air-balloon-object-kit
```

## Drift config contract

`BALLOON_DRIFT` should mirror current runtime behavior exactly before any retuning:

```txt
initial position / velocity / wind / burner
burner and vent target values
smooth rates
wind angle and speed formula constants
buoyancy, damping, vent, ceiling, gravity, and clamp values
terrain clearance
camera zoom and first-person blend constants
```

## Acceptance rows

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

## Implementation guardrails

```txt
Do not branch.
Do not change the route entrypoint.
Do not retune balloon motion.
Do not remove FLIGHT until live-route dependency is proven absent.
Do not alter renderer/world/camera constants during source contract implementation.
Do not wire a failing fixture into npm run check.
```

## Done definition

```txt
README/package/campaign describe Balloon Drift.
Legacy FLIGHT is compatibility-only or proven unused.
Source modules exist.
DOM-free source fixture passes.
GameHost exposes source diagnostics additively.
Existing GameHost local/nexusEngine shapes are preserved.
npm run check includes the source fixture after it passes.
Central ledger points at the latest repo-local tracker and audits.
```
