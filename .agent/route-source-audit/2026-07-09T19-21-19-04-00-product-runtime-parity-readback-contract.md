# Route Source Audit: Product Runtime Parity Readback Contract

**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

**Timestamp:** `2026-07-09T19-21-19-04-00`

## Current product authorities

```txt
index.html: The Open Above: Balloon Drift
src/main.js: live burner/vent/wind/altitude/camera/HUD runtime
src/hot-air-balloon-object-kit.js: current hot-air-balloon visual object and sub-kit metadata
tests/smoke.mjs: asserts hot-air-balloon route and basket/object-kit surface
README.md: older free-flight carving/gliding/diving/boosting copy
package.json: older standalone free-flight exploration description
src/data/campaign.config.js: older thermal/gate/perch/FLIGHT config shape
```

## Required source readback rows

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
```

## Proposed source module set

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
scripts/open-above-source-fixture.mjs
```

## Contract

The next source implementation must be additive. It should prove the current route is Balloon Drift while preserving existing `GameHost.getState().local` and `.nexusEngine` shapes.