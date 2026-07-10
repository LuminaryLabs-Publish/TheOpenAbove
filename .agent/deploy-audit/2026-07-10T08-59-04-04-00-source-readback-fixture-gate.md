# Deploy Audit: Source Readback Fixture Gate

**Timestamp:** `2026-07-10T08-59-04-04-00`

## Current deploy/check state

```txt
npm run check
  -> node tests/smoke.mjs

npm run build
  -> npm run check && vite build

npm run headless:check
  -> Nexus editor project.check
  -> runNpm("check")
```

## Current coverage

The existing checks cover renderer and build safety contracts.

They do not cover source authority, source consumer rows, or additive `GameHost.source` readback.

## Required fixture gate

Add:

```txt
scripts/open-above-source-fixture.mjs
```

Wire it into:

```txt
npm run check
tools/headless-editor-environment.mjs project.check
tools/headless-editor-environment.mjs runtime.getState
```

## Gate must fail on

```txt
missing source manifest
unstable source fingerprint
non-serializable source snapshot
missing legacy compatibility classification
missing runtime consumer rows
missing GameHost source shape
headless project.check missing source rows
```

## Validation state

Docs-only pass. No runtime source or package scripts changed in this pass.
