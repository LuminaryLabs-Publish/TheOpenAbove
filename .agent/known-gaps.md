# Known Gaps — TheOpenAbove

**Timestamp:** `2026-07-08T15-09-42-04-00`

## Product / source authority gaps

```txt
README.md still describes free-flight carving, gliding, diving, boosting, thermals, wind gates, pitch/bank controls, and sky-perch return.
package.json still describes free-flight exploration.
src/data/campaign.config.js still carries legacy CAMPAIGN/WORLD/FLIGHT shape for bird/free-flight style goals.
src/main.js imports CAMPAIGN and WORLD but owns the live balloon drift constants inline.
There is no canonical OPEN_ABOVE_PRODUCT source object yet.
There is no canonical BALLOON_DRIFT config yet.
There is no source fingerprint/snapshot proving docs/config/runtime agreement.
There is no implemented acceptance fixture proving README, package, campaign, runtime, HUD, GameHost, and fixture state all describe the same product.
```

## Gameplay authority gaps

```txt
Burner, vent, wind, altitude, and distance integration live inline in src/main.js.
No RouteObject descriptors exist for the current balloon drift route.
No AltitudeBand descriptors exist for low-clearance, comfort-drift, high-drift, ceiling-softness, or meadow-landing states.
No WindLaneHint descriptors exist.
No SourceAcceptanceResult envelope exists in source.
No route event rejection reason catalog exists.
No route event journal exists.
No mission state reducer exists for the current balloon route.
No progression snapshot exists for unlocking Cloud Basin from balloon route completion.
```

## Render / host gaps

```txt
Renderer creation, world generation, physics integration, camera, HUD, and GameHost exposure are all colocated in src/main.js.
Clouds, trees, lakes, terrain, and wind ribbons are generated as renderer-side loops instead of descriptor-backed domains.
HUD text is renderer/DOM-owned rather than projected from a source or mission snapshot.
GameHost exposes useful local/nexus state but does not yet expose source fingerprint, source snapshot, route diagnostics, mission snapshot, product-copy parity, or fixture status.
Camera blend is not fixture-readable outside the browser.
```

## Kit gaps

```txt
The hot-air-balloon object family is split into useful files, but the runtime host, input, physics, wind field, altitude safety, route, mission, and progression domains are still inline or only ledger-planned.
There is no DOM-free fixture harness for balloon route replay.
There is no smoke proving product-copy/config/runtime parity.
The source fixture implementation queue now exists, but no implementation exists for its rows.
```

## Selection / ledger gaps

```txt
No checked non-Cavalry Publish repo was fully new, missing from the central ledger, or missing sampled root .agent/START_HERE.md state.
The fallback selection rule is picking root-agent follow-up targets by remaining source-authority value and oldest eligible observed central update.
TheOpenAbove remains a strong follow-up target because its source authority drift is user-visible: README/package/campaign copy says free-flight, while the runtime is a balloon drift game.
```

## Acceptance implementation gaps

```txt
product_copy_matches_balloon_drift is not implemented.
package_description_matches_balloon_drift is not implemented.
campaign_copy_marks_balloon_drift_current_route is not implemented.
legacy_flight_marked_compatibility_only is not implemented.
balloon_drift_config_matches_inline_runtime_defaults is not implemented.
balloon_drift_config_drives_runtime_defaults is not implemented.
source_fingerprint_reports_copy_config_runtime_markers is not implemented.
source_snapshot_reports_visual_object_kit is not implemented.
gamehost_reports_balloon_source_snapshot is not implemented.
altitude_bands_have_non_overlapping_thresholds is not implemented.
route_objects_define_three_lift_gates_and_one_landing is not implemented.
wind_lane_hints_match_route_objects is not implemented.
dom_free_fixture_runs_without_canvas_webgl_or_dom is not implemented.
existing_local_snapshot_shape_preserved is not implemented.
existing_nexus_snapshot_shape_preserved is not implemented.
runtime_visual_defaults_unchanged is not implemented.
```

## Concrete missing files for next implementation

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

## Validation gaps

```txt
No runtime validation was run during this documentation-only pass.
No local npm install was performed.
No npm run check was performed.
No npm run build was performed.
No browser route check was performed.
No live GitHub Pages verification was performed.
```

## Current unresolved seam

The implementation queue is now precise. The next pass should materialize source modules and fixture rows, then expose source diagnostics through `window.GameHost.getState().source` without changing visible route behavior.