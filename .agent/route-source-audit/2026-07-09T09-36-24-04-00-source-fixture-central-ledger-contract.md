# Route Source Audit — Source Fixture Central Ledger Contract

**Timestamp:** `2026-07-09T09-36-24-04-00`

## Current source consumers

```txt
README.md
package.json
index.html
src/data/campaign.config.js
src/main.js
src/hot-air-balloon-object-kit.js
tests/smoke.mjs
window.GameHost.getState()
.agent/START_HERE.md
.agent/kit-registry.json
LuminaryLabs-Dev/LuminaryLabs repo ledger
```

## Required contract

The next implementation should create a source ledger that can be read without DOM, canvas, WebGL, or a browser frame.

```txt
OpenAboveProductRecord
  owns current title, route label, product copy, visible controls, and object type

BalloonDriftConfigRecord
  owns burner defaults, vent defaults, wind speed bands, altitude safety, camera blend, and basket-view marker

LegacyFlightCompatibilityRecord
  owns old free-flight FLIGHT fields as compatibility-only until removed

SourceConsumerManifest
  owns all source consumers and their expected roles

SourceFingerprint
  owns deterministic source markers for copy/config/runtime/object-kit surfaces

SourceSnapshot
  owns current route/object/control/camera/object-kit summary

SourceAcceptanceResult[]
  owns pass/fail/warn rows for source parity

SourceConsumerLedger
  owns manifest + fingerprint + snapshot + acceptance rows

GameHostSourceReadback
  owns additive window.GameHost.getState().source projection
```

## Fixture acceptance rows

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
central_ledger_matches_repo_local_latest_tracker
```

## Central ledger rule

Every source-readback pass must update both:

```txt
TheOpenAbove:.agent/kit-registry.json
LuminaryLabs-Dev/LuminaryLabs:repo-ledger/LuminaryLabs-Publish/TheOpenAbove.md
```

The two files must point at the same latest tracker timestamp.