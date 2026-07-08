# Route Source Audit — Acceptance Fixture Implementation Plan

**Timestamp:** `2026-07-08T11-49-04-04-00`

## Purpose

Turn the existing product/source acceptance wire map into exact implementation files, exported names, acceptance rows, and stop conditions.

This is still a documentation pass. Runtime source was not changed.

## Source problem

```txt
README.md: free-flight / carving / gliding / thermals / wind gates / sky perch
package.json: standalone free-flight exploration description
index.html: hot air balloon Balloon Drift
campaign.config.js: CAMPAIGN/WORLD/FLIGHT with thermal/gate/perch/free-flight shape
src/main.js: hot-air-balloon drift runtime with inline constants
```

The live route should be treated as canonical:

```txt
The Open Above: Balloon Drift
vehicle: hot-air-balloon
controls: burner / vent / wheel camera
route: meadow-lift balloon drift
```

## Implementation file targets

### Edit existing files

```txt
README.md
package.json
src/data/campaign.config.js
src/main.js
tests/smoke.mjs
```

### Add new files

```txt
src/source/open-above-product.js
src/source/balloon-drift.config.js
src/source/source-fingerprint.js
src/source/source-snapshot.js
src/source/source-acceptance.js
src/source/gamehost-source-readback.js
src/source/route-descriptors.js
src/source/altitude-bands.js
src/source/wind-lane-hints.js
scripts/open-above-source-fixture.mjs
```

## Export contract

```js
export const OPEN_ABOVE_PRODUCT = Object.freeze({
  id: "the-open-above",
  title: "The Open Above",
  currentRoute: "balloon-drift",
  currentRegion: "meadow-lift",
  currentVehicle: "hot-air-balloon",
  controls: ["burner", "vent", "camera-zoom"],
  legacyCompatibility: ["FLIGHT"]
});

export const BALLOON_DRIFT = Object.freeze({
  seedSuffix: "balloon-drift",
  initialPosition: [0, 105, 0],
  initialVelocity: [8, 0, -10],
  initialWind: [8, 0, -10],
  initialBurner: 0.22,
  idleBurner: 0.18,
  burnerLiftScale: 3.7,
  ventDescentScale: 3.2,
  baseBuoyancy: 0.36,
  altitudeDamping: 0.74,
  ceilingY: 270,
  ceilingSoftness: 0.024,
  gravityBias: 0.92,
  verticalVelocityRange: [-8, 8],
  groundClearance: 30,
  cameraZoomDefault: 44,
  cameraZoomRange: [0, 92]
});
```

## Acceptance result contract

```txt
SourceAcceptanceResult:
  rowId
  status: accepted | rejected | blocked
  reason
  expected
  actual
  sourcePath
  runtimePath
```

## Required fixture rows

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

## GameHost source projection

Additive only:

```js
window.GameHost.getState().source = {
  product,
  config,
  fingerprint,
  snapshot,
  acceptanceLedger,
  altitudeBand,
  routeObjects,
  windLaneHints,
  fixtureStatus
};
```

Keep existing keys:

```txt
window.GameHost.engine
window.GameHost.NexusEngine
window.GameHost.scene
window.GameHost.renderer
window.GameHost.camera
window.GameHost.balloon
window.GameHost.getState().nexusEngine
window.GameHost.getState().local
```

## Stop condition

The next source implementation ledge is complete only when:

```txt
README.md describes balloon drift.
package.json describes balloon drift.
campaign.config.js identifies balloon drift as the current route.
FLIGHT remains but is explicitly compatibility-only.
BALLOON_DRIFT mirrors current inline defaults.
src/main.js consumes BALLOON_DRIFT for the same behavior.
window.GameHost.getState().source exists.
source fixture runs without DOM, canvas, or WebGL.
npm run check passes.
npm run build passes.
```

## Do not do yet

```txt
Do not rewrite renderer.
Do not replace the balloon object kit.
Do not remove FLIGHT.
Do not add Cloud Basin gameplay.
Do not tune buoyancy, wind, altitude, camera, tree, terrain, or cloud values while doing this acceptance pass.
```
