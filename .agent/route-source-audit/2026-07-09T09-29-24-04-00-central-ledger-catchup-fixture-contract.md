# Route Source Audit — Central Ledger Catch-up Fixture Contract

**Timestamp:** `2026-07-09T09-29-24-04-00`

## Source contract target

```txt
TheOpenAbove Source Consumer Central Catch-up + GameHost Source Readback Fixture Gate
```

## Current source consumers

```txt
README.md
package.json
index.html
src/data/campaign.config.js
src/main.js
src/hot-air-balloon-object-kit.js
tests/smoke.mjs
.agent/START_HERE.md
.agent/kit-registry.json
LuminaryLabs-Dev/LuminaryLabs repo ledger
```

## Required source records

```txt
OpenAboveProductRecord:
  productId
  routeName
  currentMode
  controls
  cameraModes
  objectType

BalloonDriftConfigRecord:
  startingPosition
  startingVelocity
  baseBurner
  burnerTarget
  ventTarget
  windAngleFormulaId
  windSpeedFormulaId
  buoyancyFormulaId
  ceilingSoftness
  terrainClearance

LegacyFlightCompatibilityRecord:
  legacyConfigPresent
  legacyFields[]
  compatibilityOnly
  replacementOwner

SourceConsumerManifest:
  consumerId
  file
  owns
  status
  requiredAcceptanceRows[]

SourceSnapshot:
  product
  config
  legacyCompatibility
  objectKit
  runtimeConsumers
  centralLedger
```

## Required acceptance rows

```txt
product_copy_matches_balloon_drift
package_description_matches_balloon_drift
campaign_copy_marks_balloon_drift_current_route
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

## Fixture contract

```txt
node scripts/open-above-source-fixture.mjs
  -> imports only pure source modules
  -> does not import Three.js
  -> does not import src/main.js
  -> does not require DOM, canvas, requestAnimationFrame, window, document, or WebGL
  -> emits source consumer ledger rows
  -> asserts source fingerprints are stable
  -> asserts current route is Balloon Drift
  -> asserts legacy FLIGHT config is marked compatibility-only
  -> asserts central ledger target can be compared to repo-local latest tracker
```

## Source audit finding

The current route identity is knowable but not source-owned. The next implementation should add source modules first, then splice `src/main.js` into additive source readback only after the DOM-free fixture proves the source ledger.
