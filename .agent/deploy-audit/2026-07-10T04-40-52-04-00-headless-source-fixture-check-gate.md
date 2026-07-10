# Deploy Audit: Headless Source Fixture Check Gate

**Timestamp:** `2026-07-10T04-40-52-04-00`

## Current commands

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

## Current deploy proof

`npm run check` exists and `npm run build` runs check before Vite build.

Headless editor commands exist, but `tools/headless-editor-environment.mjs` currently checks renderer/build contracts. It does not prove source manifest, source fingerprint, source snapshot, source acceptance rows, or GameHost `.source` readback.

## Required next fixture

```txt
scripts/open-above-source-fixture.mjs
```

Then wire it into:

```txt
npm run check
npm run headless:check
```

## Future gate criteria

```txt
canonical route source loads without DOM
legacy campaign fields are classified explicitly
source fingerprint is stable
source snapshot is serializable
source acceptance rows exist
GameHost source projection has expected shape
headless project.check reports source fixture rows
fixture exits non-zero on required-row failures
```

## Validation this pass

Documentation only. No runtime source changed and no local, browser, build, or headless command was run.
