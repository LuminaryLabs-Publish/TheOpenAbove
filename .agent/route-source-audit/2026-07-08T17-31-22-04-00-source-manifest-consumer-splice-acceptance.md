# Route Source Audit — Source Manifest Consumer Splice Acceptance

**Timestamp:** `2026-07-08T17-31-22-04-00`

## Goal

Define the exact acceptance target for cutting source authority into `TheOpenAbove` without changing the player-visible balloon route.

## Required source modules

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

## Product source object

`OPEN_ABOVE_PRODUCT` should establish:

```txt
id: the-open-above
currentRoute: balloon-drift
routeTitle: The Open Above: Balloon Drift
objectType: hot-air-balloon
primaryLoop: burner/vent altitude control with wind drift
compatibilityRoute: legacy-free-flight-config-only
rendererConsumer: src/main.js
telemetryKit: open-above-balloon-telemetry-kit
visualObjectKit: open-above-hot-air-balloon-object-kit
```

## Drift config source object

`BALLOON_DRIFT` should mirror the current inline constants before any tuning:

```txt
initialPosition: [0, 105, 0]
initialVelocity: [8, 0, -10]
initialWind: [8, 0, -10]
initialBurner: 0.22
restBurner: 0.18
burnerPressedTarget: 1
ventPressedTarget: 1
burnerSmoothRate: 3.2
ventSmoothRate: 3.6
windAngleBase: -0.86
windSpeedBase: 9.4
burnerLiftMultiplier: 3.7
ventDescentMultiplier: 3.2
altitudeDamping: 0.74
softCeilingY: 270
softCeilingCoefficient: 0.024
verticalVelocityMin: -8
verticalVelocityMax: 8
terrainClearance: 30
cameraZoomDefault: 44
cameraZoomStep: 4
cameraZoomMin: 0
cameraZoomMax: 92
firstPersonBlendSmoothRate: 5.6
cameraSmoothRate: 3.1
```

## Source manifest

`SOURCE_MANIFEST` should bind:

```txt
product
campaign
world
legacyFlightCompatibility
driftConfig
altitudeBands
routeObjects
windLaneHints
runtimeConsumerFiles
fixtureRows
smokeMarkers
```

## Splice points in `src/main.js`

```txt
import OPEN_ABOVE_PRODUCT
import BALLOON_DRIFT
import SOURCE_MANIFEST
import createBalloonSourceSnapshot
import createGameHostSourceReadback

replace initial state literals only after config parity fixture passes
preserve snapshot(status = "drifting") shape
add source readback to GameHost.getState()
keep local and nexusEngine unchanged
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
route_objects_define_three_lift_gates_and_one_landing
wind_lane_hints_match_route_objects
dom_free_fixture_runs_without_canvas_webgl_or_dom
existing_local_snapshot_shape_preserved
existing_nexus_snapshot_shape_preserved
npm_check_runs_source_fixture
npm_build_runs_source_fixture_before_vite_build
```

## Fixture output shape

```json
{
  "repo": "LuminaryLabs-Publish/TheOpenAbove",
  "route": "balloon-drift",
  "status": "pass | fail",
  "sourceManifestVersion": "0.1.0",
  "rows": [],
  "localShapePreserved": true,
  "nexusShapePreserved": true,
  "runtimeConsumer": "src/main.js",
  "sourceFiles": []
}
```

## Stop line

Do not add mission progression, Cloud Basin unlock logic, renderer extraction, or ProtoKit promotion until these acceptance rows exist and run from `npm run check`.
