# Deploy Audit: Source Fixture Headless Check Gate

Timestamp: 2026-07-10T10-29-57-04-00
Repo: LuminaryLabs-Publish/TheOpenAbove

## Current package commands

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

## Current validation coverage

`npm run check` currently runs `node tests/smoke.mjs`.

The current smoke/headless path validates renderer/build contracts such as required files, importmap route, visual-domain usage, neutral lighting, streamed terrain, water fog, and headless editor capabilities.

## Missing gate

No command currently proves source authority, source consumer ledgers, or additive GameHost `.source` shape.

## Next gate

Add:

```txt
scripts/open-above-source-fixture.mjs
```

Then wire it into:

```txt
npm run check
npm run headless:check
```

## Fixture constraints

- DOM-free.
- No browser rendering required.
- No visual retune.
- Exits non-zero on missing required rows.
- Emits source manifest, fingerprint, snapshot, acceptance rows, consumer rows, and GameHost source shape.

## This pass validation

```txt
runtime source changed: no
branch created: no
pull request created: no
npm run check: not run
npm run build: not run
npm run headless:check: not run
browser smoke: not run
DOM-free source fixture: not run because proof files do not exist yet
pushed to main: yes
central ledger updated: pending central sync
```
