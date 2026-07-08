# Next Steps — TheOpenAbove

**Timestamp:** `2026-07-08T05:48:28-04:00`

## Next safe ledge

```txt
TheOpenAbove Product Source Fixture Matrix + Balloon Drift Config Gate
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
- [ ] Add canonical `PRODUCT_COPY` or `OPEN_ABOVE_PRODUCT` source beside campaign config.
- [ ] Add canonical `BALLOON_DRIFT` config beside legacy `FLIGHT`.
- [ ] Preserve `FLIGHT` as compatibility-only until a smoke proves the live route no longer reads it.
- [ ] Move current inline wind, buoyancy, burner, vent, altitude, ceiling, and camera constants from `src/main.js` into config with no visible behavior change.
- [ ] Add `ALTITUDE_BANDS` for low-clearance, lift-gate, high-drift, and meadow-landing states.
- [ ] Add `ROUTE_OBJECTS` for three buoyancy gates and meadow landing.
- [ ] Add `WIND_LANE_HINTS` for readable route guidance.
- [ ] Add source fingerprint and source snapshot services.
- [ ] Expose product/config/runtime parity through `window.GameHost` diagnostics.
- [ ] Add fixture rows for README product copy, package description, campaign text, drift config, altitude bands, route objects, GameHost source snapshot, and DOM-free route replay.
- [ ] Add `RouteEventResult` envelopes only after the source fixture rows pass.
- [ ] Add route event acceptance/rejection reason catalog after route objects exist.
- [ ] Add route event journal after result envelope exists.
- [ ] Add route state reducer after journal proof exists.
- [ ] Add mission snapshot projector after route state reducer proof exists.
- [ ] Add smoke markers for docs/config/runtime parity.
- [ ] Run `npm run check`.
- [ ] Run `npm run build`.

## Suggested build order

```txt
1. README/package copy correction
2. PRODUCT_COPY / OPEN_ABOVE_PRODUCT source object
3. BALLOON_DRIFT config mirrored from current inline constants
4. ALTITUDE_BANDS / ROUTE_OBJECTS / WIND_LANE_HINTS descriptors
5. source fingerprint + source snapshot
6. GameHost diagnostics projection
7. DOM-free product-source fixture harness
8. route event result envelope
9. route reducer and mission snapshot
10. smoke markers for product/config/runtime parity
```

## Fixture rows to create first

```txt
readme_product_copy_is_balloon_drift
package_description_is_balloon_drift
campaign_region_copy_is_balloon_drift
legacy_flight_is_compatibility_only
balloon_drift_config_matches_runtime_defaults
altitude_bands_cover_ground_lift_high_and_landing
route_objects_include_three_lift_gates_and_landing
gamehost_reports_product_source_snapshot
gamehost_reports_source_fingerprint
dom_free_route_fixture_replays_source_snapshot
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
  -> route event result authority
  -> mission/progression snapshot authority
  -> host diagnostics proof
  -> renderer/world/camera extraction
  -> reusable ProtoKit promotion candidates
```