# Deploy Audit — Fixture Check Integration

**Timestamp:** `2026-07-08T17-31-22-04-00`

## Current deploy/build state

```txt
package.json scripts:
  start: vite --host 0.0.0.0
  dev: vite --host 0.0.0.0
  check: node tests/smoke.mjs
  build: npm run check && vite build
```

`npm run build` already gates Vite build behind `npm run check`, but `npm run check` only runs `tests/smoke.mjs`.

## Current smoke coverage

```txt
required files exist
index.html contains The Open Above: Balloon Drift
index.html imports src/main.js
src/main.js contains balloon telemetry, basket camera, first-person visibility, rope fade, and Nexus marker
bird-specific runtime markers are absent
hot-air-balloon object kit files contain expected markers
vite base is /TheOpenAbove/
```

## Missing deploy gate

```txt
source fixture command does not exist
source manifest fixture is not wired into npm run check
build does not yet prove README/package/campaign/runtime/source parity
build does not yet prove GameHost source readback shape
build does not yet prove local/nexusEngine shapes remain preserved after source readback splice
```

## Next deploy-safe command shape

```json
{
  "scripts": {
    "check": "node tests/smoke.mjs && node scripts/open-above-source-fixture.mjs",
    "build": "npm run check && vite build"
  }
}
```

## Required script behavior

`scripts/open-above-source-fixture.mjs` should:

```txt
run in Node
avoid DOM/WebGL/canvas
read README.md
read package.json
read src/data/campaign.config.js or import source modules only if Node-safe
read src/source/* source modules
assert balloon-drift product parity
assert legacy FLIGHT is compatibility-only
assert BALLOON_DRIFT mirrors current runtime defaults
assert SOURCE_MANIFEST lists runtime consumers
assert local/nexus shape contract is documented and preserved
emit compact pass/fail JSON
exit non-zero on failure
```

## Acceptance order

```txt
1. Add source modules.
2. Add fixture script.
3. Run fixture directly.
4. Wire fixture into npm run check.
5. Run npm run check.
6. Run npm run build.
7. Only then wire GameHost source diagnostics into src/main.js.
8. Re-run npm run check and npm run build.
```

## Stop line

Do not change Pages base, Vite config, dependency model, or public route during this ledge. Keep the deploy surface stable while expanding validation coverage.
