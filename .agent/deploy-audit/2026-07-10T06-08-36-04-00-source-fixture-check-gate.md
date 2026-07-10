# Deploy Audit: Source Fixture Check Gate

**Timestamp:** `2026-07-10T06-08-36-04-00`

## Current deploy/build surface

`package.json` exposes:

```txt
npm run check
npm run build
npm start
npm run dev
npm run headless:status
npm run headless:inspect
npm run headless:renderer
npm run headless:check
npm run headless:build
```

Current command wiring:

```txt
npm run check -> node tests/smoke.mjs
npm run build -> npm run check && vite build
headless:check -> Nexus editor project.check -> npm run check
headless:build -> Nexus editor project.build -> npm run build
```

## Current validation coverage

The current smoke/headless path validates:

```txt
required files exist
route imports src/main.js
visual-domain renderer path exists
neutral lighting and color grade contracts exist
streamed terrain and soft terrain cloud shadow contracts exist
water explicit fog contract exists
headless editor capabilities exist
```

## Missing source gate

The deploy path does not yet validate:

```txt
source manifest rows
source fingerprint stability
source snapshot serializability
legacy campaign compatibility classification
source acceptance rows
GameHost .source shape
headless source rows
browser consumer source projection
```

## Required next files

```txt
src/source/open-above-product.js
src/source/balloon-drift.config.js
src/source/legacy-flight-compatibility.js
src/source/source-consumer-manifest.js
src/source/source-fingerprint.js
src/source/source-snapshot.js
src/source/source-acceptance.js
src/source/source-consumer-ledger.js
src/source/gamehost-source-readback.js
scripts/open-above-source-fixture.mjs
```

## Required future gate order

```txt
1. node scripts/open-above-source-fixture.mjs
2. node tests/smoke.mjs
3. npm run headless:check
4. npm run build
```

## This pass validation

```txt
runtime source changed: no
package scripts changed: no
branch created: no
pull request created: no
npm run check: not run
npm run build: not run
npm run headless:check: not run
browser smoke: not run
source fixture: not run because proof files do not exist yet
```
