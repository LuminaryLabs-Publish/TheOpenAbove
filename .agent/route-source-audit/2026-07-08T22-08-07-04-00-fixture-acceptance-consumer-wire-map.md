# Route Source Audit — Fixture Acceptance Consumer Wire Map

**Timestamp:** `2026-07-08T22-08-07-04-00`

## Implementation target

```txt
TheOpenAbove Source Fixture Acceptance + Browser Consumer Readback Gate
```

## Source order

```txt
README.md product copy
package.json description
src/data/campaign.config.js route copy and compatibility labels
src/source/open-above-product.js
src/source/balloon-drift.config.js
src/source/altitude-bands.js
src/source/route-descriptors.js
src/source/wind-lane-hints.js
src/source/source-manifest.js
src/source/source-fingerprint.js
src/source/source-snapshot.js
src/source/source-acceptance.js
src/source/gamehost-source-readback.js
scripts/open-above-source-fixture.mjs
src/main.js additive source imports and GameHost source projection
package.json check script
```

## Consumer splice rule

The browser consumer splice should be additive:

```txt
before:
window.GameHost.getState() -> { nexusEngine, local }

after:
window.GameHost.getState() -> { nexusEngine, local, source }
```

Existing `nexusEngine` and `local` fields must remain stable.

## Source manifest rows

```txt
product_source: src/source/open-above-product.js
runtime_config: src/source/balloon-drift.config.js
altitude_bands: src/source/altitude-bands.js
route_objects: src/source/route-descriptors.js
wind_lane_hints: src/source/wind-lane-hints.js
source_fingerprint: src/source/source-fingerprint.js
source_snapshot: src/source/source-snapshot.js
acceptance_ledger: src/source/source-acceptance.js
browser_readback: src/source/gamehost-source-readback.js
runtime_consumer: src/main.js
fixture_consumer: scripts/open-above-source-fixture.mjs
build_consumer: package.json scripts.check
```

## Required acceptance rows

```txt
product_copy_matches_balloon_drift
package_description_matches_balloon_drift
campaign_copy_marks_balloon_drift_current_route
legacy_flight_marked_compatibility_only
balloon_drift_config_matches_inline_runtime_defaults
balloon_drift_config_drives_runtime_defaults
source_manifest_lists_all_runtime_consumers
source_fingerprint_reports_copy_config_runtime_markers
source_snapshot_reports_visual_object_kit
gamehost_reports_balloon_source_snapshot
altitude_bands_have_non_overlapping_thresholds
route_objects_define_lift_guides_and_landing
wind_lane_hints_match_route_objects
dom_free_fixture_runs_without_canvas_webgl_or_dom
browser_consumer_reads_source_projection
existing_local_snapshot_shape_preserved
existing_nexus_snapshot_shape_preserved
npm_check_runs_source_fixture
npm_build_runs_source_fixture_before_vite_build
```

## Acceptance result shape

```txt
{
  id,
  status: pass | fail | blocked,
  reason,
  evidence,
  sourceFiles,
  consumerFiles,
  checkedAt
}
```

## Fixture policy

The source fixture must run without:

```txt
DOM
canvas
WebGL
Three.js renderer
NexusEngine runtime boot
localStorage
requestAnimationFrame
browser globals
```

## Main finding

The next source implementation is not only a file split. It must prove that documentation, package metadata, route config, runtime constants, host diagnostics, browser consumers, and build scripts all agree on the same Balloon Drift route.
