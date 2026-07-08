# Next Steps — TheOpenAbove

**Timestamp:** `2026-07-08T07:10:12-04:00`

## Next safe ledge

```txt
TheOpenAbove Balloon Drift Config Acceptance Ledger
```

## Goal

Make the hot-air-balloon drift product authoritative without changing the public visual route.

The implementation should not start by extracting renderer systems. It should first prove that product copy, package metadata, campaign copy, drift config, HUD/GameHost diagnostics, and DOM-free fixture snapshots all agree on the current balloon-drift product.

## Checklist

- [ ] Keep `index.html -> src/main.js` stable.
- [ ] Keep burner / vent controls stable.
- [ ] Keep basket-follow camera and wheel zoom behavior stable.
- [ ] Keep current hot-air-balloon object visuals stable.
- [ ] Keep NexusEngine telemetry kit install stable.
- [ ] Update README away from free-flight, bird, carving, boost, thermals, wind gates, and sky-perch language.
- [ ] Update package description to match the live hot-air-balloon drift product.
- [ ] Update campaign region copy so Meadow Lift describes balloon drift, burner/vent, wind guidance, and landing.
- [ ] Add canonical `PRODUCT_COPY` or `OPEN_ABOVE_PRODUCT` source beside campaign config.
- [ ] Add canonical `BALLOON_DRIFT` config beside legacy `FLIGHT`.
- [ ] Preserve `FLIGHT` as compatibility-only until a smoke proves the live route no longer reads it.
- [ ] Move current inline wind, buoyancy, burner, vent, altitude, ceiling, and camera constants from `src/main.js` into config with no visible behavior change.
- [ ] Add `ALTITUDE_BANDS` for low-clearance, burner-lift, high-drift, and meadow-landing states.
- [ ] Add `ROUTE_OBJECTS` for three lift gates and meadow landing.
- [ ] Add `WIND_LANE_HINTS` for readable route guidance.
- [ ] Add source fingerprint and source snapshot services.
- [ ] Expose product/config/runtime parity through `window.GameHost` diagnostics.
- [ ] Add fixture rows for README product copy, package description, campaign text, drift config, altitude bands, route objects, GameHost source snapshot, source fingerprint, and DOM-free route replay.
- [ ] Add `BalloonConfigAcceptanceResult` envelope for row pass/fail records.
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
2. PRODUCT_COPY / OPEN_ABOVE_PRODUCT source object
3. BALLOON_DRIFT config mirrored from current inline constants
4. ALTITUDE_BANDS / ROUTE_OBJECTS / WIND_LANE_HINTS descriptors
5. source fingerprint + source snapshot
6. GameHost diagnostics projection
7. DOM-free balloon config acceptance fixture harness
8. BalloonConfigAcceptanceResult row envelope
9. route event result envelope
10. route reducer and mission snapshot
11. smoke markers for product/config/runtime parity
```

## Fixture rows to create first

```txt
product_copy_matches_balloon_drift
package_description_matches_balloon_drift
campaign_copy_marks_balloon_drift_current_route
legacy_flight_marked_compatibility_only
balloon_drift_config_matches_inline_runtime_defaults
balloon_drift_config_drives_runtime_defaults
altitude_bands_have_non_overlapping_thresholds
route_objects_define_three_lift_gates_and_one_landing
source_fingerprint_reports_copy_config_runtime_markers
gamehost_reports_balloon_source_snapshot
dom_free_fixture_runs_without_canvas_webgl_or_dom
```

## Do not do yet

- [ ] Do not rewrite the whole renderer.
- [ ] Do not replace the balloon visual kit.
- [ ] Do not add new regions before route authority exists.
- [ ] Do not extract every inline renderer system before source authority is stable.
- [ ] Do not push reusable kits to ProtoKits until local fixture proof exists.

## After this ledge

```txt
balloon product/source authority
  -> balloon config acceptance ledger
  -> route event result authority
  -> mission/progression snapshot authority
  -> host diagnostics proof
  -> renderer/world/camera extraction
  -> reusable ProtoKit promotion candidates
```
