# Next Steps — TheOpenAbove

**Timestamp:** `2026-07-09T11-50-08-04-00`

## Next safe ledge

```txt
TheOpenAbove Source Consumer Ledger + GameHost Source Readback Fixture Gate
```

## Goal

Create pure source/readback modules that make the current hot-air-balloon Balloon Drift route the durable source of truth without changing the live renderer, balloon physics, camera, HUD, object-kit composition, or existing GameHost state fields.

This ledge must also keep central ledger parity so the same tracker, turn ledger, source fixture, and kit registry are visible from both `TheOpenAbove` and `LuminaryLabs-Dev/LuminaryLabs`.

## Implementation checklist

- [ ] Add `src/source/open-above-product.js` with current product copy for Balloon Drift.
- [ ] Add `src/source/balloon-drift.config.js` with the inline runtime defaults currently inside `src/main.js`.
- [ ] Add `src/source/legacy-flight-compatibility.js` that explicitly marks old `FLIGHT` values as compatibility-only until removed.
- [ ] Add `src/source/altitude-bands.js` for ground clearance, low drift, cruising, high drift, and soft ceiling ranges.
- [ ] Add `src/source/route-descriptors.js` for lift guide, wind lane, scenic drift, basket view, and safe landing descriptors.
- [ ] Add `src/source/wind-lane-hints.js` for fixture-readable wind guidance.
- [ ] Add `src/source/source-consumer-manifest.js` listing README, package, campaign config, runtime, object kit, smoke, GameHost, repo-local `.agent`, and central ledger consumers.
- [ ] Add `src/source/source-fingerprint.js` to produce stable copy/config/runtime/object-kit fingerprints.
- [ ] Add `src/source/source-snapshot.js` to report current route, object type, controls, camera mode, source status, and object-kit metadata.
- [ ] Add `src/source/source-acceptance.js` with acceptance rows for copy/config/runtime mismatch or compatibility status.
- [ ] Add `src/source/source-consumer-ledger.js` to combine manifest, fingerprint, snapshot, acceptance rows, and consumer ownership.
- [ ] Add `src/source/gamehost-source-readback.js` to project additive `source` diagnostics.
- [ ] Add `scripts/open-above-source-fixture.mjs` that runs without DOM, canvas, WebGL, or browser globals.
- [ ] Extend `tests/smoke.mjs` to call the source fixture or assert the fixture module exists.
- [ ] Preserve `window.GameHost.getState().local` and `.nexusEngine` exactly while adding `.source`.
- [ ] Update `LuminaryLabs-Dev/LuminaryLabs` central ledger after source fixture implementation so repo-local and central state do not drift again.
- [ ] Preserve the current `src/main.js` route and visual behavior.

## Do not do yet

```txt
Do not extract terrain, renderer, camera, or HUD into shared kits.
Do not retune burner, vent, buoyancy, wind, camera, or rope fade constants.
Do not change the balloon model or object-kit profile.
Do not add Cloud Basin or new route progression.
Do not remove legacy FLIGHT fields until compatibility handling is explicit.
Do not create a branch.
```

## Stop condition for the next implementation pass

```txt
node scripts/open-above-source-fixture.mjs passes
npm run check proves the source fixture and existing smoke assertions
npm run build completes after source fixture integration
browser state exposes additive window.GameHost.getState().source
existing window.GameHost.getState().local and .nexusEngine shapes remain unchanged
central ledger points at the same latest tracker as repo-local .agent/kit-registry.json
```
