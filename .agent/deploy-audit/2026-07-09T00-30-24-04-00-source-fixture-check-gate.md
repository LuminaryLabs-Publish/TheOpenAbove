# Deploy Audit — Source Fixture Check Gate

**Timestamp:** `2026-07-09T00-30-24-04-00`

## Current deploy/check shape

```txt
package.json scripts:
  start: vite --host 0.0.0.0
  dev: vite --host 0.0.0.0
  check: node tests/smoke.mjs
  build: npm run check && vite build
```

`tests/smoke.mjs` currently checks route/object/basket/rope/rigging/panel markers and Vite base, but no source module fixture exists yet.

## Missing check gate

```txt
scripts/open-above-source-fixture.mjs missing
source modules missing
npm run check does not call source fixture
build gate does not prove source fixture before vite build except indirectly after check is updated
```

## Next command target

```bash
node scripts/open-above-source-fixture.mjs
npm run check
npm run build
```

## Required `npm run check` order after implementation

```txt
node scripts/open-above-source-fixture.mjs
node tests/smoke.mjs
```

## Gate requirements

```txt
source fixture must not require DOM
source fixture must not require canvas
source fixture must not require WebGL
source fixture must not import Three.js CDN
source fixture must not import NexusEngine CDN
source fixture must read source modules and static text files only
source fixture must fail on source/runtime mismatch
smoke must continue proving current route/object markers
build must keep running check before vite build
```

## Validation in this docs pass

```txt
runtime source changed: no
branch created: no
pull request created: no
local npm install: no
local npm run check: no
local npm run build: no
browser smoke: no
GitHub Pages smoke: no
pushed to main: yes
```

## Stop line

Do not claim deploy confidence until the source fixture exists and `npm run check` plus `npm run build` have been run after source implementation.
