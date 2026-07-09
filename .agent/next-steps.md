# Next Steps — TheOpenAbove

**Timestamp:** `2026-07-09T00-40-20-04-00`

## Next safe ledge

```txt
TheOpenAbove Source Readback Ledger Splice + Browser Consumer Fixture Gate
```

## Goal

Create pure source/readback modules that make the current hot-air-balloon route the durable source of truth without changing the live renderer, balloon physics, camera, HUD, or object-kit composition.

## Implementation checklist

- [ ] Add `src/source/open-above-product.js` with current product copy for Balloon Drift.
- [ ] Add `src/source/balloon-drift.config.js` with the inline runtime defaults that are currently inside `src/main.js`.
- [ ] Add `src/source/altitude-bands.js` for ground clearance, low drift, cruising, high drift, and soft ceiling ranges.
- [ ] Add `src/source/route-descriptors.js` for lift guide, wind lane, scenic drift, and safe landing descriptors.
- [ ] Add `src/source/wind-lane-hints.js` for fixture-readable wind guidance.
- [ ] Add `src/source/source-manifest.js` listing README, package, campaign config, runtime, object kit, smoke, and GameHost consumers.
- [ ] Add `src/source/source-fingerprint.js` to produce stable copy/config/runtime fingerprints.
- [ ] Add `src/source/source-snapshot.js` to report current route, object type, controls, camera mode, source status, and object-kit metadata.
- [ ] Add `src/source/source-acceptance.js` with acceptance rows for copy/config/runtime parity.
- [ ] Add `src/source/source-readback-ledger.js` to combine manifest, fingerprint, snapshot, and acceptance rows.
- [ ] Add `src/source/gamehost-source-readback.js` to project additive `source` diagnostics.
- [ ] Add `scripts/open-above-source-fixture.mjs` that runs without DOM, canvas, WebGL, or browser globals.
- [ ] Extend `tests/smoke.mjs` to call the source fixture or assert the fixture module exists.
- [ ] Preserve `window.GameHost.getState().local` and `.nexusEngine` exactly while adding `.source`.
- [ ] Preserve the current `src/main.js` route and visual behavior.

## Do not do yet

```txt
Do not extract terrain, renderer, camera, or HUD into shared kits.
Do not retune burner, vent, buoyancy, wind, camera, or rope fade constants.
Do not change the balloon model or object-kit profile.
Do not add Cloud Basin or new route progression.
Do not remove legacy FLIGHT fields until compatibility handling is explicit.
```

## Stop condition

Stop when `npm run check` proves the source fixture and existing smoke assertions, and browser state exposes additive `GameHost.getState().source` without changing existing local/Nexus snapshot shape.
