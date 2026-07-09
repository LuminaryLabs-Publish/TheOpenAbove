# Route Source Audit — Product Runtime Parity Contract

**Timestamp:** `2026-07-09T17-58-53-04-00`

## Parity problem

```txt
README.md: older carving/gliding/diving/boosting/free-flight route
package.json: older free-flight description
src/data/campaign.config.js: thermals/gates/perch/FLIGHT compatibility data
index.html: current Balloon Drift route
src/main.js: current burner/vent/wind/altitude/basket-camera runtime
tests/smoke.mjs: current hot-air-balloon object and basket smoke checks
```

## Contract needed

```txt
source snapshot says current route is Balloon Drift
source snapshot says object type is hot-air-balloon
source snapshot lists burner, vent, and scroll zoom controls
source snapshot marks legacy FLIGHT and campaign objectives as compatibility-only
source fingerprint covers README/package/campaign/runtime/object-kit/test markers
source consumer ledger names every consumer and drift state
GameHost exposes additive source readback
DOM-free fixture validates all rows
```

## Acceptance rows

```txt
product_copy_matches_balloon_drift
package_description_matches_balloon_drift
readme_controls_match_burner_vent_wheel
campaign_config_marks_balloon_drift_current_route
legacy_flight_marked_compatibility_only
balloon_drift_config_matches_inline_runtime_defaults
source_consumer_manifest_lists_runtime_and_docs_consumers
source_consumer_ledger_combines_manifest_fingerprint_snapshot_acceptance
gamehost_reports_balloon_source_snapshot
dom_free_fixture_runs_without_canvas_webgl_or_dom
central_ledger_matches_repo_local_latest_tracker
```
