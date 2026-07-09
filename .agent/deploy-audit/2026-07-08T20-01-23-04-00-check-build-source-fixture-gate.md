# Deploy Audit — Check/Build Source Fixture Gate

**Timestamp:** `2026-07-08T20-01-23-04-00`

## Current scripts

```txt
npm run start -> vite --host 0.0.0.0
npm run dev   -> vite --host 0.0.0.0
npm run check -> node tests/smoke.mjs
npm run build -> npm run check && vite build
```

## Current smoke coverage

`tests/smoke.mjs` currently checks static files, route markers, balloon object kit markers, basket/burner/rope/rigging/panel markers, and Vite base path.

It does not yet check source authority.

## Missing fixture command

```bash
node scripts/open-above-source-fixture.mjs
```

## Target check chain

```txt
npm run check
  -> node tests/smoke.mjs
  -> node scripts/open-above-source-fixture.mjs
```

## Target build chain

```txt
npm run build
  -> npm run check
  -> vite build
```

## Deploy gate rows

```txt
source_fixture_exists
source_fixture_runs_without_dom
source_fixture_runs_without_webgl
source_fixture_reads_readme_package_campaign_source
source_fixture_proves_balloon_drift_product_copy
source_fixture_proves_runtime_constant_parity
source_fixture_proves_gamehost_source_readback_contract
npm_check_runs_source_fixture
npm_build_runs_check_before_vite_build
```

## Do not change yet

```txt
do not change Vite base path
do not add a new deploy branch
do not create a GitHub Pages workflow in this pass
do not alter existing smoke assertions until source fixture exists
do not weaken current smoke coverage
```

## Validation status for this run

```txt
local checkout: no
npm install: no
npm run check: no
npm run build: no
GitHub Actions run: no
GitHub Pages live route check: no
runtime source changed: no
```
