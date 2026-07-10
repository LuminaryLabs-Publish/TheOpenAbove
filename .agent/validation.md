# Validation: TheOpenAbove

**Last aligned:** `2026-07-10T10-29-57-04-00`

## This pass

Documentation-only repo breakdown.

## Validation performed

```txt
runtime source changed: no
package scripts changed: no
branch created: no
pull request created: no
npm install: not run
npm run check: not run
npm run build: not run
npm run headless:status: not run
npm run headless:inspect: not run
npm run headless:renderer: not run
npm run headless:check: not run
npm run headless:build: not run
browser smoke: not run
DOM-free source fixture: not run because proof files do not exist yet
repo-local docs pushed to main: yes
central docs pushed to main: pending central sync
```

## Available package commands

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

The current smoke/headless path validates renderer and build contracts such as required files, importmap route, visual-domain usage, neutral lighting, streamed terrain, water fog, and headless editor capabilities.

## Validation gap

`npm run check` exists, and headless editor commands exist, but neither currently proves source consumer readback.

The next implementation should add:

```txt
scripts/open-above-source-fixture.mjs
```

Then wire it into `npm run check` and the headless editor `project.check` path before claiming source/readback parity.

## Required future fixture assertions

```txt
canonical route source loads without DOM
legacy README/campaign/FLIGHT fields are classified explicitly
source fingerprint is stable
source snapshot is serializable
source acceptance rows exist
source consumer rows identify current runtime consumers
GameHost source projection shape is stable
headless project.check reports source fixture rows
fixture exits non-zero on required-row failures
```

## Next safe ledge

```txt
TheOpenAbove Source Fixture Consumer Ledger Refresh + GameHost Headless Gate
```
