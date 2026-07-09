# Deploy Audit — Source Fixture Check/Build Gate

**Timestamp:** `2026-07-09T11-50-08-04-00`

## Current deploy surface

`TheOpenAbove` is a Vite/static browser route with npm scripts for check/build.

## Current validation gap

```txt
npm run check exists but does not yet prove source/readback fixture rows.
npm run build exists but does not yet depend on source fixture proof.
No DOM-free source fixture file exists yet.
No browser GameHost source readback assertion exists yet.
```

## Next deploy gate

```txt
scripts/open-above-source-fixture.mjs
  -> imports source modules only
  -> avoids DOM/canvas/WebGL/browser globals
  -> asserts source consumer ledger rows
  -> asserts legacy FLIGHT compatibility status
  -> asserts current Balloon Drift copy/config status
  -> asserts GameHost source projection shape contract
```

## Required package wiring

```txt
npm run check
  -> existing smoke checks
  -> source fixture

npm run build
  -> source fixture first
  -> vite build second
```

## Do not do next

```txt
Do not change Pages workflow until source fixture exists.
Do not change live route behavior for deploy proof.
Do not create a branch.
Do not make PR-only validation gates.
```

## Pass validation status

Documentation-only. No runtime source changed and no build/check command ran in this pass.
