# Deploy Audit — Source Fixture Check Build Gate

**Timestamp:** `2026-07-09T23-51-04-04-00`

## Current package gate

```txt
npm run check -> node tests/smoke.mjs
npm run build -> npm run check && vite build
```

## Current smoke coverage

`tests/smoke.mjs` checks required files and asserts the newer cinematic visual-domain route shape, including:

```txt
src/runtime/balloon-simulation-kit.js
src/runtime/balloon-telemetry-kit.js
src/visual/visual-domain.js
quality, sky, clouds, terrain, vegetation, grass, water, camera, presentation, and post-process modules
src/hot-air-balloon-object-kit.js
vite.config.js
```

## Missing deploy gate

```txt
No scripts/open-above-source-fixture.mjs exists yet.
No source/readback fixture is wired into npm run check.
No central-ledger parity check exists.
No GameHost source projection smoke exists.
```

## Next validation contract

```txt
node scripts/open-above-source-fixture.mjs
npm run check
npm run build
browser readback of window.GameHost.getState().source
central ledger readback matches repo-local .agent/kit-registry.json
```

## Current pass validation

```txt
runtime source changed: no
package scripts changed: no
branch created: no
pull request created: no
npm run check: not run
npm run build: not run
browser smoke: not run
DOM-free source fixture: not run because fixture files do not exist yet
pushed to main: yes, documentation only
```
