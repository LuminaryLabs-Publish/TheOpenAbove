# Route Source Audit — Source Module Consumer Splice Map

**Timestamp:** `2026-07-08T15-11-18-04-00`

## Intent

Turn the previous balloon-source fixture plan into an exact consumer splice map.

The next implementation should add source modules first, then wire them into `src/main.js` additively, with no visual behavior change.

## Source files to add

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

## Source files to edit after fixtures exist

```txt
README.md
package.json
src/data/campaign.config.js
src/main.js
package.json scripts.check only if the fixture is added
```

## Import splice target

Add new source imports near the current route imports in `src/main.js`:

```js
import { CAMPAIGN, WORLD } from "./data/campaign.config.js";
import { OPEN_ABOVE_PRODUCT } from "./source/open-above-product.js";
import { BALLOON_DRIFT, ALTITUDE_BANDS, ROUTE_OBJECTS, WIND_LANE_HINTS } from "./source/balloon-drift.config.js";
import { createOpenAboveSourceFingerprint } from "./source/source-fingerprint.js";
import { createOpenAboveSourceSnapshot } from "./source/source-snapshot.js";
import { createSourceAcceptanceLedger } from "./source/source-acceptance.js";
import { createGameHostSourceReadback } from "./source/gamehost-source-readback.js";
```

## Runtime splice order

```txt
1. Keep current inline constants in place.
2. Add BALLOON_DRIFT values that exactly mirror the current inline values.
3. Add a fixture that compares BALLOON_DRIFT against current inline constants.
4. Create source fingerprint from OPEN_ABOVE_PRODUCT, package marker, campaign marker, BALLOON_DRIFT, object kit id, and runtime route id.
5. Create source snapshot from product, config, altitude bands, route objects, wind hints, and object-kit metadata.
6. Create acceptance ledger rows.
7. Add source readback to GameHost without removing existing local/nexusEngine readbacks.
8. Only after fixture rows pass, replace duplicated inline constants with BALLOON_DRIFT reads in a minimal follow-up.
```

## Runtime constants to mirror first

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
wind angle sin rates: 0.045, 0.11
wind angle amplitudes: 0.32, 0.08
wind speed base: 9.4
wind speed sin rates: 0.063, 0.017
wind speed amplitudes: 2.1, 1.4
buoyancy base: 0.36
burner lift multiplier: 3.7
vent descent multiplier: 3.2
vertical damping multiplier: 0.74
ceiling soft limit: 270
ceiling soft multiplier: 0.024
gravity/loss term: 0.92
vertical velocity clamp: -8..8
terrain clearance: 30
camera zoom default: 44
camera zoom wheel step: 4
camera zoom clamp: 0..92
first-person blend smooth rate: 5.6
camera position smooth rate: 3.1
```

## Source snapshot fields

```txt
product.id
product.title
product.currentRoute
product.objectType
product.engineImport
product.renderRuntime
product.status
balloonDrift.routeId
balloonDrift.controls
balloonDrift.physicsConstants
balloonDrift.cameraConstants
altitudeBands[]
routeObjects[]
windLaneHints[]
hotAirBalloonObjectKit.id
hotAirBalloonObjectKit.subdomains[]
sourceFingerprint
acceptanceRows[]
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

```js
{
  id: "balloon_drift_config_matches_inline_runtime_defaults",
  status: "pass" | "fail" | "not-run",
  source: "src/source/balloon-drift.config.js",
  consumer: "src/main.js",
  expected: {},
  actual: {},
  reason: "short stable reason string"
}
```

## Main risk

Do not let this become a visual rewrite.

The correct source-first splice is intentionally boring: add source records, prove agreement, expose diagnostics, and only then allow runtime constants to consume the new config.
