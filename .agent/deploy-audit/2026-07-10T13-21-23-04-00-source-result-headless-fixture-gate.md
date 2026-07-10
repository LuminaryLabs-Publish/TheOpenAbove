# Deploy Audit: Source Result Headless Fixture Gate

Timestamp: `2026-07-10T13-21-23-04-00`

## Current gates

```txt
npm run check
npm run build
npm run headless:check
```

## Current check coverage

`npm run check` runs `node tests/smoke.mjs`.

The smoke and headless paths validate renderer/build contracts, not source result rows.

## Missing gate

```txt
scripts/open-above-source-fixture.mjs
```

## Required gate behavior

- Load canonical product and Balloon Drift source rows without DOM.
- Classify legacy campaign/FLIGHT fields.
- Emit source manifest, fingerprint, snapshot, acceptance rows, and consumer rows.
- Emit keyboard and wheel input result rows.
- Assert expected GameHost `.source` shape.
- Exit non-zero when required rows are missing.
- Feed the same proof into headless `project.check`.

## Validation this pass

```txt
runtime source changed: no
package scripts changed: no
branch created: no
pull request created: no
npm run check: not run
npm run build: not run
npm run headless:check: not run
browser smoke: not run
DOM-free source fixture: not run because proof files do not exist yet
pushed to main: yes
```
