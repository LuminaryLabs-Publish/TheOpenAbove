# Deploy Audit — Source Fixture Build Gate

**Timestamp:** `2026-07-09T17-58-53-04-00`

## Current commands

```txt
npm run check
npm run build
```

`npm run check` runs `tests/smoke.mjs`. `npm run build` runs the smoke check before Vite build.

## Current validation gap

The smoke test checks the current hot-air-balloon route and object-kit files, but it does not yet validate a source/readback ledger because the source fixture does not exist.

## Next deploy gate

```txt
scripts/open-above-source-fixture.mjs
  -> run without DOM
  -> run without canvas
  -> run without WebGL
  -> verify route/copy/config/runtime/object-kit parity rows
  -> verify GameHost source projection shape contract
  -> verify central ledger path names match repo-local kit registry
```

## Deployment note

No deploy workflow, package script, or runtime source changed in this pass.
