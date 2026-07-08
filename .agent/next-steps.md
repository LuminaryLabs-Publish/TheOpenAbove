# Next Steps — TheOpenAbove

**Timestamp:** `2026-07-08T03:21:22-04:00`

## Next safe ledge

```txt
TheOpenAbove Product Copy Authority + Balloon Drift Config Fixture Gate
```

## Goal

Make the hot-air-balloon drift product authoritative without changing the public visual route.

## Checklist

- [ ] Keep `index.html -> src/main.js` stable.
- [ ] Keep burner / vent controls stable.
- [ ] Keep basket-follow camera and wheel zoom behavior stable.
- [ ] Keep current hot-air-balloon object visuals stable.
- [ ] Keep NexusEngine telemetry kit install stable.
- [ ] Update README and package description to match balloon drift.
- [ ] Add canonical `BALLOON_DRIFT` config beside legacy `FLIGHT`.
- [ ] Move live inline balloon constants from `src/main.js` into config without visible behavior change.
- [ ] Keep `FLIGHT` as compatibility-only until a smoke proves it is unused by the live route.
- [ ] Add `ALTITUDE_BANDS` for low-clearance, buoyancy-gate, high-drift, and meadow-landing states.
- [ ] Add `ROUTE_OBJECTS` for three buoyancy gates and meadow landing.
- [ ] Add `WIND_LANE_HINTS` for readable route guidance.
- [ ] Add source fingerprint and source snapshot services.
- [ ] Expose product/config/runtime parity through `window.GameHost` diagnostics.
- [ ] Add `RouteEventResult` envelopes.
- [ ] Add route event acceptance/rejection reason catalog.
- [ ] Add route event journal.
- [ ] Add route state reducer.
- [ ] Add mission snapshot projector.
- [ ] Add DOM-free route fixture harness.
- [ ] Add smoke markers for docs/config/runtime parity.
- [ ] Run `npm run check`.
- [ ] Run `npm run build`.

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
