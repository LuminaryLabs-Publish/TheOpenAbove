# Route Source Audit — Product Runtime Source Parity Contract

**Timestamp:** `2026-07-09T15-09-09-04-00`

## Current route source split

```txt
README.md
  stale: free-flight exploration, carving, gliding, diving, boosting, thermals, gates, sky perch

package.json
  stale: standalone free-flight exploration description

index.html
  current: The Open Above: Balloon Drift and hot-air-balloon canvas label

src/data/campaign.config.js
  mixed: current route ids plus old thermal/gate/perch/start speed/FLIGHT fields

src/main.js
  current: burner/vent/wind/altitude/hot-air-balloon runtime

src/hot-air-balloon-object-kit.js
  current: procedural hot-air-balloon object-kit metadata and sub-kit composition
```

## Required source contract

```txt
OpenAboveProductRecord
  routeId
  routeTitle
  productMode
  primaryObject
  primaryLoop
  controlCopy
  compatibilityNotice

BalloonDriftConfigRecord
  initialPosition
  initialVelocity
  defaultBurner
  defaultVent
  burnerControls
  ventControls
  windFormulaMarkers
  buoyancyFormulaMarkers
  altitudeFloorPolicy
  ceilingPolicy
  cameraZoomRange
  basketBlendPolicy

LegacyFlightCompatibilityRecord
  thermalTarget
  gateTarget
  perch
  startSpeed
  FLIGHT fields
  compatibilityOnly: true

SourceConsumerManifest
  README.md
  package.json
  index.html
  src/data/campaign.config.js
  src/main.js
  src/hot-air-balloon-object-kit.js
  tests/smoke.mjs
  .agent docs
  central LuminaryLabs ledger
```

## Acceptance rows

```txt
product_copy_matches_balloon_drift
package_description_matches_balloon_drift
readme_controls_match_burner_vent_wheel
campaign_config_marks_balloon_drift_current_route
legacy_flight_marked_compatibility_only
balloon_drift_config_matches_inline_runtime_defaults
source_consumer_manifest_lists_all_runtime_consumers
source_consumer_manifest_lists_agent_docs_consumer
source_consumer_manifest_lists_central_ledger_consumer
source_fingerprint_reports_copy_config_runtime_object_markers
source_snapshot_reports_visual_object_kit
source_snapshot_reports_basket_camera_defaults
source_consumer_ledger_combines_manifest_fingerprint_snapshot_acceptance
gamehost_reports_balloon_source_snapshot
browser_consumer_reads_source_projection
existing_local_snapshot_shape_preserved
existing_nexus_snapshot_shape_preserved
dom_free_fixture_runs_without_canvas_webgl_or_dom
npm_check_runs_source_fixture
npm_build_runs_source_fixture_before_vite_build
central_ledger_matches_repo_local_latest_tracker
```

## Blocked changes until contract exists

```txt
Do not remove FLIGHT fields.
Do not rewrite README/package copy without compatibility rows.
Do not add route objectives.
Do not move constants out of src/main.js without a parity fixture.
Do not alter GameHost local/Nexus shapes.
```
