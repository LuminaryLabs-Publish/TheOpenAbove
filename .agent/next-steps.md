# Next Steps — TheOpenAbove

**Timestamp:** `2026-07-09T23-51-04-04-00`

## Next safe ledge

```txt
TheOpenAbove Visual Domain Source Readback + Browser Fixture Gate
```

## Goal

Add pure source/readback modules that preserve the current cinematic Balloon Drift route while making product copy, campaign compatibility, simulation defaults, visual-domain composition, camera state, presentation-domain state, GameHost diagnostics, and central tracking fixture-readable.

## Implementation checklist

- [ ] Add `src/source/open-above-product.js` with current Balloon Drift product copy.
- [ ] Add `src/source/balloon-drift.config.js` with current simulation defaults and route controls.
- [ ] Add `src/source/legacy-flight-compatibility.js` to mark `FLIGHT`, thermal, gate, perch, and older Meadow Lift fields as compatibility-only until migrated.
- [ ] Add `src/source/source-consumer-manifest.js` listing README, package, campaign config, simulation kit, telemetry kit, visual-domain, camera rig, presentation domain, object kit, smoke tests, GameHost, repo-local `.agent`, and central ledger consumers.
- [ ] Add `src/source/source-fingerprint.js` for copy/config/runtime/object/visual source fingerprints.
- [ ] Add `src/source/source-snapshot.js` for route, controls, object type, simulation defaults, visual-domain subkits, camera defaults, presentation-domain kits, and compatibility status.
- [ ] Add `src/source/source-acceptance.js` with acceptance rows for README legacy copy, package alignment, campaign compatibility, simulation defaults, visual-domain composition, GameHost source status, and central ledger parity.
- [ ] Add `src/source/source-consumer-ledger.js` combining manifest, fingerprint, snapshot, acceptance rows, and consumer ownership.
- [ ] Add `src/source/gamehost-source-readback.js` to project additive `source` diagnostics.
- [ ] Add `scripts/open-above-source-fixture.mjs` that runs without DOM, canvas, WebGL, or browser globals.
- [ ] Extend `tests/smoke.mjs` or `npm run check` to include the source fixture.
- [ ] Preserve `window.GameHost.getState().local` and `.nexusEngine` exactly while adding `.source`.
- [ ] Keep central ledger, repo-local kit registry, and latest tracker aligned.

## Do not do yet

```txt
Do not extract or rewrite the visual-domain stack.
Do not retune burner, vent, buoyancy, wind, ceiling, ground clearance, camera, exposure, or post-process constants.
Do not change the balloon model, basket, rigging, ropes, fabric materials, or burner illumination.
Do not add Cloud Basin or new route progression.
Do not remove legacy FLIGHT fields until compatibility handling is explicit.
Do not create a branch.
```

## Stop condition for the next implementation pass

```txt
node scripts/open-above-source-fixture.mjs passes
npm run check proves source fixture and existing smoke assertions
npm run build completes after source fixture integration
window.GameHost.getState().source exists and is additive
window.GameHost.getState().local and .nexusEngine shapes remain unchanged
central ledger points at the same latest tracker as repo-local .agent/kit-registry.json
```
