# Headless Editor Audit: Source Result Command Surface

Timestamp: `2026-07-10T13-21-23-04-00`

## Current headless surface

```txt
npm run headless:status
npm run headless:inspect
npm run headless:renderer
npm run headless:check
npm run headless:build
```

`tools/headless-editor-environment.mjs` exposes:

```txt
project.inspect
renderer.validate
project.check
project.build
runtime.getState
```

## Current proof

The headless environment validates renderer/build contracts and runs `npm run check`.

## Gap

It does not validate source authority, source acceptance rows, source consumer rows, input result rows, or GameHost source projection.

## Required source command surface

```txt
source.inspect
source.validate
source.fixture
runtime.getState -> source rows included
project.check -> includes source fixture output
```

## Next proof

Add `scripts/open-above-source-fixture.mjs`, wire it into `npm run check`, and expose source fixture output through `project.check` before claiming source/readback parity.
