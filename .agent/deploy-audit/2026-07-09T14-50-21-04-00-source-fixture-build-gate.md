# Deploy Audit — Source Fixture Build Gate

**Timestamp:** `2026-07-09T14-50-21-04-00`

## Current scripts

```txt
npm run check -> node tests/smoke.mjs
npm run build -> npm run check && vite build
```

## Current smoke coverage

```txt
required route files exist
index.html names Balloon Drift
src/main.js contains telemetry, basket camera, first-person view, rope fade, ride motion, burner vibration, and NexusEngine marker
old bird markers are absent
balloon sub-kits exist and contain expected current markers
vite base is /TheOpenAbove/
```

## Missing deploy gate

```txt
source fixture script missing
source modules missing
GameHost source readback missing
central-ledger parity fixture missing
source/readback rows not wired into npm run check
```

## Required fixture gate

```txt
scripts/open-above-source-fixture.mjs
  -> imports source-only modules
  -> reads no DOM, canvas, WebGL, or browser globals
  -> verifies product/copy/runtime/object-kit source rows
  -> verifies legacy free-flight compatibility rows
  -> verifies source consumer ledger rows
  -> verifies expected GameHost source projection shape
  -> prints stable pass/fail summary
```

## Build rule

`npm run build` should continue to run `npm run check` first.

After implementation, `npm run check` should prove both the existing route smoke and the new source fixture.

## Deploy conclusion

Do not change GitHub Pages or Vite deployment first. The missing deploy confidence is a pre-build source fixture, not a workflow rewrite.
