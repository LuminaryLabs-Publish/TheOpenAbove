# Deploy Audit — Source Fixture Check Wire Map

**Timestamp:** `2026-07-09T09-36-24-04-00`

## Current deploy/check shape

```txt
package.json scripts:
  start: vite --host 0.0.0.0
  dev: vite --host 0.0.0.0
  check: node tests/smoke.mjs
  build: npm run check && vite build
```

## Current gap

`npm run check` does not yet prove source/readback parity. It only runs the existing smoke script.

## Required next wire

```txt
scripts/open-above-source-fixture.mjs
  -> imports pure src/source modules
  -> runs without DOM/canvas/WebGL/browser globals
  -> asserts source consumer manifest
  -> asserts source fingerprint
  -> asserts source snapshot
  -> asserts acceptance rows
  -> asserts central-ledger timestamp constants or fixture-owned expected paths

npm run check
  -> runs tests/smoke.mjs
  -> runs scripts/open-above-source-fixture.mjs

npm run build
  -> npm run check
  -> vite build
```

## Build safety rule

The source fixture must be additive. It must not require the live Three.js runtime or `window.GameHost` to exist.

## Deferred validation

```txt
npm install
npm run check
npm run build
browser smoke
GitHub Pages smoke
```

None of those were run in this documentation-only pass.