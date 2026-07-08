# Route Source Audit — Balloon Drift Config Acceptance Ledger

**Timestamp:** `2026-07-08T07:10:12-04:00`

## Purpose

Turn the broader product-source fixture matrix into a precise acceptance ledger for the next implementation pass.

This file defines the smallest source-backed proof needed before `TheOpenAbove` extracts mission reducers, route event journals, progression, renderer/world systems, or reusable ProtoKit candidates.

## Current evidence

```txt
README.md:
  product copy still says free-flight exploration with carving, gliding, diving, boosting, thermals, gates, sky perch, and Cloud Basin.

package.json:
  description still says standalone free-flight exploration.

index.html:
  title/description already say Balloon Drift and canvas label says hot air balloon.

src/main.js:
  runtime is hot-air-balloon drift with burner, vent, wind, buoyancy, altitude, distance, basket-follow camera, HUD telemetry, Nexus telemetry, and GameHost snapshots.

src/data/campaign.config.js:
  still exports CAMPAIGN, WORLD, and legacy FLIGHT values that fit the older free-flight bird/swoop route more than the current balloon drift route.
```

## Gate name

```txt
TheOpenAbove Balloon Drift Config Acceptance Ledger
```

## Non-negotiable preservation rules

```txt
Preserve index.html -> src/main.js.
Preserve the visible balloon route.
Preserve the current hot-air-balloon object kit family.
Preserve Space / W / ArrowUp as burner lift.
Preserve S / ArrowDown / Shift as vent descent.
Preserve wheel zoom and basket-follow camera behavior.
Preserve NexusEngine telemetry kit installation.
Preserve window.GameHost.getState() baseline shape while adding diagnostics.
Do not start with renderer extraction.
Do not restore the older bird/free-flight controller unless product direction changes explicitly.
```

## Required source objects

```txt
OPEN_ABOVE_PRODUCT or PRODUCT_COPY
  id
  version
  title
  routeTitle
  description
  currentRoute
  controlsCopy
  hudTitle
  routeSummary
  compatibilityNotes

BALLOON_DRIFT
  version
  idleBurner
  activeBurner
  activeVent
  burnerSmoothRate
  ventSmoothRate
  windAngleBase
  windAngleWaveA
  windAngleWaveB
  windSpeedBase
  windSpeedWaveA
  windSpeedWaveB
  buoyancyBase
  burnerLift
  ventDrop
  altitudeDamping
  ceilingHeight
  ceilingSoftness
  gravityTerm
  verticalVelocityClamp
  terrainClearance
  startingPosition
  startingVelocity
  startingBurner
  startingVent
  cameraZoomDefault
  cameraZoomMin
  cameraZoomMax
  firstPersonBlendNear
  firstPersonBlendFar

ALTITUDE_BANDS
  low-clearance
  burner-lift
  high-drift
  meadow-landing

ROUTE_OBJECTS
  lift-gate-01
  lift-gate-02
  lift-gate-03
  meadow-landing

WIND_LANE_HINTS
  id
  label
  position
  radius
  windBias
  displayHint
```

## Acceptance rows

| Row id | Source input | Expected result | Blocks |
| --- | --- | --- | --- |
| `product_copy_matches_balloon_drift` | `README.md`, product source object | Current route copy names hot-air-balloon drift / balloon exploration, not bird/free-flight carving | Product copy correction |
| `package_description_matches_balloon_drift` | `package.json.description` | Description names hot-air-balloon drift or balloon exploration | Package correction |
| `campaign_copy_marks_balloon_drift_current_route` | `CAMPAIGN.regions[0].description` | Region copy teaches burner, vent, wind, route, and landing language | Campaign copy correction |
| `legacy_flight_marked_compatibility_only` | `FLIGHT` export | `FLIGHT` remains only as compatibility, migration, or deprecated route data with reason metadata | Config cleanup |
| `balloon_drift_config_matches_inline_runtime_defaults` | `BALLOON_DRIFT` plus current `src/main.js` constants | Config matches current burner, vent, wind, buoyancy, ceiling, clamp, starting state, and camera defaults | Config extraction |
| `balloon_drift_config_drives_runtime_defaults` | Runtime after boot | Runtime reads defaults from config without visible route changes | Runtime cutover |
| `altitude_bands_have_non_overlapping_thresholds` | `ALTITUDE_BANDS` | Sample altitudes map to exactly one named band or a clear default | Altitude authority |
| `route_objects_define_three_lift_gates_and_one_landing` | `ROUTE_OBJECTS` | Three lift gates and one meadow landing target exist with id, order, position, radius, altitude requirement, and label | Route authority |
| `source_fingerprint_reports_copy_config_runtime_markers` | source fingerprint service | Fingerprint includes product, campaign, drift config, altitude band, route object, and runtime version markers | Diagnostics |
| `gamehost_reports_balloon_source_snapshot` | `window.GameHost.getState()` | Snapshot includes product source id, drift config id, route id, object type, fingerprint, and fixture status | GameHost parity |
| `dom_free_fixture_runs_without_canvas_webgl_or_dom` | fixture harness | Fixture can verify copy/config/route descriptors without `document`, `window`, WebGL, or Three renderer boot | Test harness |

## Rejection reasons

```txt
readme_current_route_still_free_flight
package_description_still_free_flight
campaign_region_still_thermals_and_wind_gates
legacy_flight_used_as_live_route_authority
balloon_drift_config_missing_runtime_constant
runtime_default_not_config_backed
altitude_band_overlap
route_object_missing_required_field
source_fingerprint_missing_marker
gamehost_missing_source_snapshot
fixture_requires_dom_or_webgl
```

## Result envelope target

```txt
BalloonConfigAcceptanceResult
├─ rowId
├─ accepted
├─ sourceInput
├─ expected
├─ actual
├─ blockers[]
├─ rejectionReason
├─ sourceFingerprint
├─ fixtureTimestamp
└─ notes
```

## Target smoke shape

```txt
npm run check
  -> source modules import without DOM
  -> product copy row passes
  -> package description row passes
  -> campaign copy row passes
  -> legacy FLIGHT compatibility row passes
  -> BALLOON_DRIFT defaults row passes
  -> ALTITUDE_BANDS row passes
  -> ROUTE_OBJECTS row passes
  -> source fingerprint row passes
```

## Build order

```txt
1. Add canonical product source object.
2. Update README/package/campaign copy to match balloon drift.
3. Add BALLOON_DRIFT config copied from current inline runtime defaults.
4. Add ALTITUDE_BANDS, ROUTE_OBJECTS, and WIND_LANE_HINTS.
5. Add source fingerprint and source snapshot functions.
6. Add GameHost diagnostics using the source snapshot.
7. Add DOM-free fixture rows.
8. Extend npm run check.
9. Only then add route event envelopes, mission reducers, or renderer extraction.
```

## Done definition

```txt
The live route still looks and feels the same.
The source copy says balloon drift everywhere current-product authority is used.
The runtime reads balloon drift defaults from source config.
The fixture ledger can prove the source authority without a browser.
GameHost exposes the product/config/source snapshot for manual debugging.
npm run check covers the acceptance rows.
```
