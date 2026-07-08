# TheOpenAbove Source Fixture Implementation Queue

**Timestamp:** `2026-07-08T15-09-42-04-00`

## Purpose

This audit converts the prior source-fixture cutover map into an implementation queue.

The public route is already balloon drift. The next code pass should make the source files agree with that route and prove parity without DOM, canvas, WebGL, or browser timing.

## Source mismatch to close

```txt
README.md                    free-flight bird/glider language
package.json                 free-flight package description
src/data/campaign.config.js  legacy FLIGHT / thermal / gate / perch route source
index.html                   Balloon Drift page title and metadata
src/main.js                  live balloon drift route
```

## Files to add first

```txt
src/source/open-above-product.js
src/source/balloon-drift.config.js
src/source/source-fingerprint.js
src/source/source-snapshot.js
src/source/source-acceptance.js
src/source/gamehost-source-readback.js
src/source/altitude-bands.js
src/source/route-descriptors.js
src/source/wind-lane-hints.js
scripts/open-above-source-fixture.mjs
```

## Files to edit first

```txt
README.md
package.json
src/data/campaign.config.js
src/main.js
tests/smoke.mjs
```

## Required exports

```txt
OPEN_ABOVE_PRODUCT
BALLOON_DRIFT
ALTITUDE_BANDS
ROUTE_OBJECTS
WIND_LANE_HINTS
createBalloonSourceFingerprint()
createBalloonSourceSnapshot()
createSourceAcceptanceResult()
createSourceAcceptanceLedger()
projectGameHostSourceReadback()
```

## Fixture acceptance rows

```txt
01_product_copy_matches_balloon_drift
02_package_description_matches_balloon_drift
03_campaign_copy_marks_balloon_drift_current_route
04_legacy_flight_marked_compatibility_only
05_balloon_drift_config_matches_inline_runtime_defaults
06_balloon_drift_config_drives_runtime_defaults
07_source_fingerprint_reports_copy_config_runtime_markers
08_source_snapshot_reports_visual_object_kit
09_gamehost_reports_balloon_source_snapshot
10_altitude_bands_have_non_overlapping_thresholds
11_route_objects_define_three_lift_gates_and_one_landing
12_wind_lane_hints_match_route_objects
13_dom_free_fixture_runs_without_canvas_webgl_or_dom
14_existing_local_snapshot_shape_preserved
15_existing_nexus_snapshot_shape_preserved
16_runtime_visual_defaults_unchanged
```

## Config constants to mirror before moving

Mirror these from `src/main.js` without retuning them:

```txt
initial position: [0, 105, 0]
initial velocity: [8, 0, -10]
initial wind: [8, 0, -10]
initial burner: 0.22
burner idle: 0.18
burner active: 1
vent active: 1
burner smooth rate: 3.2
vent smooth rate: 3.6
wind angle base: -0.86
wind angle slow sine: 0.045 / 0.32
wind angle fast sine: 0.11 / 0.08
wind speed base: 9.4
wind speed sine A: 0.063 / 2.1
wind speed sine B: 0.017 / 1.4
buoyancy base: 0.36
burner lift: 3.7
vent descent: 3.2
altitude damping: 0.74
ceiling start: 270
ceiling softness: 0.024
gravity/down bias: 0.92
vertical velocity clamp: [-8, 8]
terrain clearance: 30
camera default zoom: 44
camera zoom clamp: [0, 92]
```

## GameHost source readback contract

```txt
window.GameHost.getState().source.product.id === "the-open-above"
window.GameHost.getState().source.product.currentRoute === "balloon-drift"
window.GameHost.getState().source.balloonDrift.objectType === "hot-air-balloon"
window.GameHost.getState().source.sourceSnapshot.visualObjectKit === "open-above-hot-air-balloon-object-kit"
window.GameHost.getState().source.acceptanceLedger.status in ["planned", "passing", "failing"]
```

## Stop condition

Stop the implementation queue when `npm run check`, `npm run build`, `scripts/open-above-source-fixture.mjs`, and browser `window.GameHost.getState().source` all agree that the current source authority is balloon drift and the existing local/nexus GameHost shapes remain backward compatible.