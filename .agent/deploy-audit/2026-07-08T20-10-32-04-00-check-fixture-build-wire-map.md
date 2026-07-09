# Deploy Audit — Check Fixture Build Wire Map

**Timestamp:** `2026-07-08T20-10-32-04-00`

## Current package commands

```txt
npm start -> vite --host 0.0.0.0
npm dev   -> vite --host 0.0.0.0
npm check -> node tests/smoke.mjs
npm build -> npm run check && vite build
```

## Current deploy risk

`npm run check` currently validates smoke markers only. It does not prove that product copy, package metadata, campaign config, inline runtime constants, GameHost diagnostics, and source fixtures agree on the current Balloon Drift route.

## Fixture wire order

```txt
1. Add pure source modules.
2. Add scripts/open-above-source-fixture.mjs.
3. Run the source fixture independently.
4. Only after it passes, add it to npm run check.
5. Keep npm build as npm run check && vite build.
```

## Required source fixture behavior

```txt
Runs under Node without DOM.
Does not require canvas.
Does not import Three.js CDN.
Does not import NexusEngine CDN.
Reads product/config/source modules.
Reads README/package/campaign files if needed.
Reports every SourceAcceptanceResult row.
Exits non-zero on failed required rows.
Prints a compact acceptance ledger.
```

## Required check rows

```txt
source_fixture_script_exists
source_fixture_runs_without_dom
source_fixture_reports_balloon_product
source_fixture_reports_drift_config
source_fixture_reports_source_manifest
source_fixture_reports_acceptance_rows
npm_check_runs_existing_smoke
npm_check_runs_source_fixture_after_source_fixture_passes
npm_build_keeps_check_before_vite_build
```

## Do not wire yet

Do not change `package.json` until `scripts/open-above-source-fixture.mjs` exists and passes by itself.

## Validation state

```txt
runtime source changed: no
package command changed: no
fixture added: no
npm run check: not run
npm run build: not run
branch created: no
pushed to main: yes
```
