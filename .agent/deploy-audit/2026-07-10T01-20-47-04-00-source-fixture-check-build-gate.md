# Deploy Audit: Source Fixture Check Build Gate

**Timestamp:** `2026-07-10T01-20-47-04-00`

## Current validation surface

`package.json` exposes:

```txt
npm run check
npm run build
```

`npm run build` chains through `npm run check` before Vite build.

## Current gap

The available check path does not yet prove source/readback parity.

There is no DOM-free source consumer fixture for product copy, campaign config, route composition, `GameHost.getState().source`, or source acceptance ledger rows.

## Required deploy gate next

```txt
scripts/open-above-source-fixture.mjs
```

The fixture should prove:

```txt
canonical Balloon Drift source config can be loaded without a browser DOM
legacy campaign fields are categorized and not silently treated as current route truth
source fingerprints are stable
source snapshots are serializable
source acceptance rows are emitted
GameHost source readback projection has the expected shape
fixture failure exits non-zero
npm run check includes the fixture before build
```

## Safe deploy order

```txt
1. Add source modules.
2. Add DOM-free source fixture.
3. Wire fixture into npm run check.
4. Add additive GameHost source readback.
5. Run npm run check.
6. Run npm run build if check passes.
7. Only then consider visual or simulation work.
```

## Validation status for this pass

```txt
runtime source changed: no
package scripts changed: no
npm run check: not run
npm run build: not run
browser smoke: not run
source fixture: not run because it does not exist yet
branch created: no
pull request created: no
pushed to main: yes, documentation only
```
