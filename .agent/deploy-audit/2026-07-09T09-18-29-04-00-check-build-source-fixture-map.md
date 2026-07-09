# Deploy Audit — Check/Build Source Fixture Map

**Timestamp:** `2026-07-09T09-18-29-04-00`

## Summary

Deploy wiring already exists through the Vite project scripts. The missing deploy proof is that `npm run check` and `npm run build` should execute a DOM-free source fixture before future source or renderer changes are trusted.

## Current commands

```txt
npm run start -> vite --host 0.0.0.0
npm run dev   -> vite --host 0.0.0.0
npm run check -> node tests/smoke.mjs
npm run build -> npm run check && vite build
```

## Missing fixture command

```txt
node scripts/open-above-source-fixture.mjs
```

## Required next deploy flow

```txt
node scripts/open-above-source-fixture.mjs
  -> verifies product/package/campaign/runtime/object-kit source rows
  -> verifies source consumer ledger shape
  -> verifies GameHost source projection module shape without browser globals
  -> exits non-zero on mismatch

npm run check
  -> runs existing tests/smoke.mjs
  -> runs source fixture or imports fixture result

npm run build
  -> runs npm run check
  -> builds Vite app
```

## Deploy rule

Do not rely on a browser-only visual check for source authority. The next implementation must make source parity testable in Node before changing production route text, config, GameHost projection, renderer, or route behavior.
