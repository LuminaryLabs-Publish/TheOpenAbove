# Route Source Audit — Source Ledger Fixture Contract

**Timestamp:** `2026-07-09T11-50-08-04-00`

## Problem

The browser route is Balloon Drift, but durable source surfaces still carry older free-flight language and configuration. Agents need a fixture-readable contract that says which source wins and which legacy fields are compatibility-only.

## Source consumers

```txt
README.md
package.json
index.html
src/data/campaign.config.js
src/main.js
src/hot-air-balloon-object-kit.js
tests/smoke.mjs
package.json scripts.check
.agent/START_HERE.md
.agent/kit-registry.json
LuminaryLabs-Dev/LuminaryLabs repo-ledger/LuminaryLabs-Publish/TheOpenAbove.md
```

## Contract modules to add

```txt
src/source/open-above-product.js
src/source/balloon-drift.config.js
src/source/legacy-flight-compatibility.js
src/source/altitude-bands.js
src/source/route-descriptors.js
src/source/wind-lane-hints.js
src/source/source-consumer-manifest.js
src/source/source-fingerprint.js
src/source/source-snapshot.js
src/source/source-acceptance.js
src/source/source-consumer-ledger.js
src/source/gamehost-source-readback.js
```

## Required acceptance rows

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

## Implementation order

```txt
1. Add source modules.
2. Add DOM-free fixture.
3. Add GameHost source readback additively.
4. Wire check/build validation.
5. Sync repo-local .agent and central ledger.
```

## Constraint

Do not remove legacy config fields until the compatibility module and fixture rows make their status explicit.
