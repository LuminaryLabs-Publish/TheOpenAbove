# Deploy audit: source authority headless fixture gate

Timestamp: `2026-07-10T11-51-35-04-00`

## Current package gates

```txt
npm run check
  -> node tests/smoke.mjs

npm run build
  -> npm run check && vite build

npm run headless:check
  -> node .nexus-engine/bin/nexus-editor.mjs --environment ./tools/headless-editor-environment.mjs call project.check --json
```

## Current coverage

```txt
required file presence
route shell/importmap
visual-domain contract
neutral lighting contract
streamed terrain contract
water fog contract
headless renderer/build command shape
```

## Missing gate

No package or headless gate proves:

```txt
source manifest
source fingerprint
source snapshot
source acceptance ledger
source consumer ledger
input result ledger
GameHost .source shape
legacy campaign compatibility classification
```

## Required next gate

```txt
scripts/open-above-source-fixture.mjs
npm run check
npm run headless:check
npm run build
```

The source fixture should run before browser rendering or visual changes are claimed.
