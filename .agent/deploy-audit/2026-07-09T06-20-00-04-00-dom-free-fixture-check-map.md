# Deploy Audit — DOM-Free Fixture Check Map

**Timestamp:** `2026-07-09T06-20-00-04-00`

## Current deploy surface

```txt
package.json scripts:
  start: vite --host 0.0.0.0
  dev: vite --host 0.0.0.0
  check: node tests/smoke.mjs
  build: npm run check && vite build
```

## Current validation gap

`npm run check` runs the existing smoke script, but there is no DOM-free source fixture that proves source consumer rows.

## Required fixture wire

```txt
scripts/open-above-source-fixture.mjs
  imports source modules only
  does not import src/main.js
  does not touch document/window/canvas/WebGL
  builds SourceConsumerLedger
  validates known mismatch rows
  validates next repair order
  exits non-zero on missing consumer or shape drift
```

## Required package/script behavior

```txt
npm run check
  -> node tests/smoke.mjs
  -> source fixture assertion is invoked directly or by smoke

npm run build
  -> npm run check
  -> vite build
```

## Deployment non-goals

```txt
Do not add a new branch.
Do not create a PR.
Do not change GitHub Pages workflow behavior in this docs pass.
Do not claim a live Pages smoke until it is actually run.
```

## Next validation commands

```txt
node scripts/open-above-source-fixture.mjs
npm run check
npm run build
```
