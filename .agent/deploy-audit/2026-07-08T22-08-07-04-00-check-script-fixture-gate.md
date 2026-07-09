# Deploy Audit — Check Script Fixture Gate

**Timestamp:** `2026-07-08T22-08-07-04-00`

## Current package scripts

```txt
npm run check -> node tests/smoke.mjs
npm run build -> npm run check && vite build
```

## Current deploy posture

The repo is a Vite/static publishing surface. This documentation pass did not alter runtime or workflow files.

## Missing source fixture command

```txt
scripts/open-above-source-fixture.mjs does not exist yet.
package.json scripts.check does not run source fixture rows yet.
No fixture proves README/package/campaign/runtime/GameHost source agreement before Vite build.
```

## Required check order after implementation

```txt
node scripts/open-above-source-fixture.mjs
node tests/smoke.mjs
vite build
```

Recommended script shape after the source fixture exists:

```json
{
  "scripts": {
    "check": "node scripts/open-above-source-fixture.mjs && node tests/smoke.mjs",
    "build": "npm run check && vite build"
  }
}
```

## Build-gate rows

```txt
source_fixture_command_exists
source_fixture_runs_without_dom
source_fixture_reports_all_acceptance_rows
npm_check_runs_source_fixture_before_smoke
npm_build_runs_check_before_vite_build
existing_smoke_test_still_runs
vite_build_still_runs_after_source_fixture
```

## Do not wire check until

```txt
OPEN_ABOVE_PRODUCT exists
BALLOON_DRIFT exists
SOURCE_MANIFEST exists
SourceAcceptanceLedger exists
source fixture exits 0 locally
existing tests/smoke.mjs still exits 0
```

## Validation status

```txt
runtime source changed: no
package script changed: no
workflow changed: no
source fixture run: no
npm run check: no
npm run build: no
Pages smoke: no
```

## Main finding

The deploy gate should become source-aware, but only after the DOM-free fixture is implemented. The next implementation should avoid breaking the current `npm run build` path while adding product/config/runtime parity proof ahead of Vite packaging.
