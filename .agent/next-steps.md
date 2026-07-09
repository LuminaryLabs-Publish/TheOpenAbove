# Next Steps — TheOpenAbove

**Timestamp:** `2026-07-08T22-19-38-04-00`

## Next safe ledge

```txt
TheOpenAbove Source Readback Catch-up + Fixture Acceptance Gate
```

## Goal

Make the hot-air-balloon drift product authoritative without changing the public visual route.

The implementation should prove that product copy, package metadata, campaign copy, drift config, source manifest, HUD/GameHost diagnostics, browser consumer readback, and DOM-free fixture snapshots all agree on the current Balloon Drift product.

## Checklist

- [ ] Keep `index.html -> src/main.js` stable.
- [ ] Keep burner / vent controls stable.
- [ ] Keep basket-follow camera and wheel zoom behavior stable.
- [ ] Keep current hot-air-balloon object visuals stable.
- [ ] Keep NexusEngine telemetry kit install stable.
- [ ] Update README away from free-flight, bird, carving, boost, thermals, wind gates, and sky-perch language.
- [ ] Update package description to match the live hot-air-balloon drift product.
- [ ] Update campaign region copy so Meadow Lift describes balloon drift, burner/vent, wind guidance, and landing.
- [ ] Add canonical `OPEN_ABOVE_PRODUCT` source object.
- [ ] Add canonical `BALLOON_DRIFT` config beside legacy `FLIGHT`.
- [ ] Preserve or mark `FLIGHT` as compatibility-only until a smoke proves the live route no longer reads it.
- [ ] Mirror current inline wind, buoyancy, burner, vent, altitude, ceiling, clearance, and camera constants into config with no visible behavior change.
- [ ] Add `ALTITUDE_BANDS` for low-clearance, comfort-drift, high-drift, and meadow-landing states.
- [ ] Add `ROUTE_OBJECTS` for lift guidance, drift guidance, and meadow landing.
- [ ] Add `WIND_LANE_HINTS` for readable route guidance.
- [ ] Add `SOURCE_MANIFEST` binding product/config/route/fixture/runtime consumers.
- [ ] Add source fingerprint and source snapshot services.
- [ ] Add `SourceAcceptanceResult` and `SourceAcceptanceLedger` helpers.
- [ ] Add `createGameHostSourceReadback()`.
- [ ] Import source modules into `src/main.js` additively.
- [ ] Expose product/config/runtime parity through `window.GameHost.getState().source` diagnostics.
- [ ] Preserve existing `window.GameHost.getState().local` and `.nexusEngine` shapes.
- [ ] Add browser consumer readback rows for the additive `.source` field.
- [ ] Add fixture rows for README product copy, package description, campaign text, drift config, source manifest, altitude bands, route objects, wind lane hints, GameHost source snapshot, source fingerprint, and DOM-free route replay.
- [ ] Add source fixture command `node scripts/open-above-source-fixture.mjs`.
- [ ] Wire source fixture into `npm run check` only after it runs without DOM/WebGL.
- [ ] Add route event acceptance/rejection reason catalog only after route objects exist.
- [ ] Add route event journal after result envelope exists.
- [ ] Add route state reducer after journal proof exists.
- [ ] Add mission snapshot projector after route state reducer proof exists.
- [ ] Add smoke markers for docs/config/runtime parity.
- [ ] Run `npm run check`.
- [ ] Run `npm run build`.

## Suggested build order

```txt
1. README/package/campaign copy correction
2. OPEN_ABOVE_PRODUCT source object
3. BALLOON_DRIFT config mirrored from current inline constants
4. ALTITUDE_BANDS / ROUTE_OBJECTS / WIND_LANE_HINTS descriptors
5. SOURCE_MANIFEST
6. Source fingerprint + source snapshot
7. SourceAcceptanceResult + SourceAcceptanceLedger
8. Source fixture harness
9. Product/config/runtime fixture harness
10. DOM-free route fixture harness
11. GameHost source diagnostics projection
12. src/main.js source-module consumer splice
13. Browser consumer readback fixture rows
14. npm run check fixture integration
15. route event result envelope
16. route reducer and mission snapshot
17. smoke markers for product/config/runtime parity
```

## Files to add

```txt
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
```

## Runtime constants to mirror first

```txt
initial position: [0, 105, 0]
initial velocity: [8, 0, -10]
initial wind: [8, 0, -10]
initial burner: 0.22
rest burner: 0.18
burner target: 1
vent target: 1
burner smooth rate: 3.2
vent smooth rate: 3.6
wind angle base: -0.86
wind speed base: 9.4
burner lift multiplier: 3.7
vent descent multiplier: 3.2
vertical velocity clamp: -8..8
terrain clearance: 30
ceiling soft threshold: 270
ceiling softness coefficient: 0.024
altitude damping: 0.74
camera zoom default: 44
camera zoom wheel step: 4
camera zoom clamp: 0..92
first-person blend smooth rate: 5.6
camera position smooth rate: 3.1
```

## Fixture rows to create first

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

## Do not do yet

- [ ] Do not rewrite the whole renderer.
- [ ] Do not replace the balloon visual kit.
- [ ] Do not add new regions before route authority exists.
- [ ] Do not extract every inline renderer system before source authority is stable.
- [ ] Do not push reusable kits to ProtoKits until local fixture proof exists.
- [ ] Do not remove `FLIGHT` until live-route dependency is proven absent.
- [ ] Do not tune wind, buoyancy, altitude, camera, terrain, tree, lake, cloud, or balloon visual constants during the source-acceptance pass.

## After this ledge

```txt
balloon product/source authority
  -> balloon config acceptance fixtures
  -> route event result authority
  -> mission/progression snapshot authority
  -> host diagnostics proof
  -> renderer/world/camera extraction
  -> reusable ProtoKit promotion candidates
```
