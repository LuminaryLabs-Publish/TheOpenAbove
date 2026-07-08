# Route Source Audit — Product Source Acceptance Wire Map

**Timestamp:** `2026-07-08T10-10-34-04-00`

**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

## Summary

The live route is hot-air-balloon drift, but source authority is still split across old README/package/campaign free-flight language and inline runtime constants.

This wire map defines the next implementation pass without changing current visuals.

## Required source order

```txt
README.md and package.json product copy
  -> src/data/product-source.js OPEN_ABOVE_PRODUCT
  -> src/data/campaign.config.js BALLOON_DRIFT / ALTITUDE_BANDS / ROUTE_OBJECTS / WIND_LANE_HINTS
  -> src/source/balloon-source-fingerprint.js
  -> src/source/balloon-source-snapshot.js
  -> src/source/source-acceptance-results.js
  -> src/source/gamehost-source-diagnostics.js
  -> src/main.js GameHost projection
  -> tests/product-source-acceptance-smoke.mjs
```

## Canonical product source target

```js
export const OPEN_ABOVE_PRODUCT = Object.freeze({
  id: "the-open-above",
  currentRoute: "balloon-drift",
  objectType: "hot-air-balloon",
  title: "The Open Above: Balloon Drift",
  description: "A cozy hot-air-balloon wind-drift experience about burner lift, vent descent, valley wind, altitude comfort, and meadow landing.",
  compatibilityRoutes: ["legacy-free-flight"],
  sourceVersion: "balloon-drift-source-v1"
});
```

## BALLOON_DRIFT target fields

```txt
initialPosition
initialVelocity
initialWind
initialBurner
initialVent
initialAltitude
initialMessage
burnerIdle
burnerPressed
ventIdle
ventPressed
burnerSmoothRate
ventSmoothRate
windAngleBase
windAngleSlowAmplitude
windAngleFastAmplitude
windAngleSlowRate
windAngleFastRate
windSpeedBase
windSpeedSlowAmplitude
windSpeedFastAmplitude
windSpeedSlowRate
windSpeedFastRate
buoyancyBase
burnerLift
ventDescent
altitudeDamping
ceilingHeight
ceilingSoftness
gravityBias
verticalVelocityMin
verticalVelocityMax
velocityBlendRate
terrainClearance
cameraDefaultZoom
cameraMinZoom
cameraMaxZoom
cameraWheelStep
firstPersonBlendStart
firstPersonBlendEnd
```

These values should mirror the current inline `src/main.js` behavior first. No visible behavior change belongs in the source-authority pass.

## Source fingerprint target

```txt
BalloonSourceFingerprint
  productId
  currentRoute
  objectType
  productSourceVersion
  campaignRegionIds
  worldSeed
  driftConfigVersion
  altitudeBandIds
  routeObjectIds
  windLaneHintIds
  compatibilityRoutes
  generatedAtBuildMarker
```

## Source snapshot target

```txt
BalloonSourceSnapshot
  product
  campaign
  world
  drift
  altitudeBands
  routeObjects
  windLaneHints
  compatibility
  fingerprint
  runtime
    hudTitle
    objectType
    gamehostObjectType
    nexusTelemetryDomain
```

## Acceptance result target

```txt
SourceAcceptanceResult
  row
  passed
  severity
  expected
  actual
  reason
  sourcePaths
```

## Acceptance ledger target

```txt
SourceAcceptanceLedger
  status
  fingerprint
  rows[]
  failedRows[]
  warningRows[]
  sourcePaths[]
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

## GameHost projection target

```txt
window.GameHost.getState()
  -> local
  -> nexusEngine
  -> source
       product
       fingerprint
       snapshot
       acceptance
```

## Implementation cutover notes

```txt
Keep index.html -> src/main.js stable.
Keep current controls stable.
Keep current visual route stable.
Move constants into BALLOON_DRIFT by first mirroring current values exactly.
Keep FLIGHT exported and mark it compatibility-only.
Add fixture proof before deleting or renaming old flight concepts.
Do not extract renderer/world/camera domains until source parity is green.
```

## Suggested test file

```txt
tests/product-source-acceptance-smoke.mjs
```

## Stop condition

Stop when `npm run check` confirms the product source acceptance ledger is green and `window.GameHost.getState().source` is defined in browser without changing the visible balloon route.