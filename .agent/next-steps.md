# Next Steps — TheOpenAbove

**Timestamp:** `2026-07-08T13-31-29-04-00`

## Next safe ledge

```txt
TheOpenAbove Balloon Source Fixture Cutover Map
```

## Goal

Make the hot-air-balloon drift product authoritative without changing the public visual route.

The implementation should prove that product copy, package metadata, campaign copy, drift config, HUD/GameHost diagnostics, and DOM-free fixture snapshots all agree on the current balloon-drift product.

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
- [ ] Move current inline wind, buoyancy, burner, vent, altitude, ceiling, clearance, and camera constants from `src/main.js` into config with no visible behavior change.
- [ ] Add `ALTITUDE_BANDS` for low-clearance, comfort-drift, high-drift, and meadow-landing states.
- [ ] Add `ROUTE_OBJECTS` for three lift gates and meadow landing.
- [ ] Add `WIND_LANE_HINTS` for readable route guidance.
- [ ] Add source fingerprint and source snapshot services.
- [ ] Add `SourceAcceptanceResult` and `SourceAcceptanceLedger` helpers.
- [ ] Expose product/config/runtime parity through `window.GameHost.getState().source` diagnostics.
- [ ] Add fixture rows for README product copy, package description, campaign text, drift config, altitude bands, route objects, wind lane hints, GameHost source snapshot, source fingerprint, and DOM-free route replay.
- [ ] Preserve existing `window.GameHost.getState().local` and `.nexusEngine` shapes.
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
4. Source fingerprint + source snapshot
5. SourceAcceptanceResult + SourceAcceptanceLedger
6. ALTITUDE_BANDS / ROUTE_OBJECTS / WIND_LANE_HINTS descriptors
7. GameHost source diagnostics projection
8. Product/config/runtime fixture harness
9. DOM-free route fixture harness
10. route event result envelope
11. route reducer and mission snapshot
12. smoke markers for product/config/runtime parity
```

## Files to add

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

## Fixture rows to create first

```txt
product_copy_matches_balloon_drift
package_description_matches_balloon_drift
campaign_copy_marks_balloon_drift_current_route
legacy_flight_marked_compatibility_only
balloon_drift_config_matches_inline_runtime_defaults
balloon_drift_config_drives_runtime_defaults
source_fingerprint_reports_copy_config_runtime_markers
source_snapshot_reports_visual_object_kit
gamehost_reports_balloon_source_snapshot
altitude_bands_have_non_overlapping_thresholds
route_objects_define_three_lift_gates_and_one_landing
wind_lane_hints_match_route_objects
dom_free_fixture_runs_without_canvas_webgl_or_dom
existing_local_snapshot_shape_preserved
existing_nexus_snapshot_shape_preserved
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