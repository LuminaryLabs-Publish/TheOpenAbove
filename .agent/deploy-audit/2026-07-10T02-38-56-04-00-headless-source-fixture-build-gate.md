# Deploy Audit: Headless Source Fixture Build Gate

**Timestamp:** `2026-07-10T02-38-56-04-00`

## Current package commands

```txt
npm run start
npm run dev
npm run check
npm run build
npm run headless:status
npm run headless:inspect
npm run headless:renderer
npm run headless:check
npm run headless:build
```

## Current command shape

```txt
check: node tests/smoke.mjs
build: npm run check && vite build
headless:status: nexus-editor status via tools/headless-editor-environment.mjs
headless:inspect: project.inspect
headless:renderer: renderer.validate
headless:check: project.check
headless:build: project.build
```

## Current gate

The deploy/build surface can validate smoke/build and renderer contracts.

It cannot yet validate source/readback proof.

## Required next gate

Add a source fixture and wire it into the check flow:

```txt
scripts/open-above-source-fixture.mjs
npm run check -> tests/smoke.mjs + source fixture
headless project.check -> npm run check
headless project.build -> npm run build
```

## Required source fixture assertions

```txt
route source manifest exists
source fingerprint stable
source snapshot serializable
legacy free-flight fields classified
current Balloon Drift fields accepted
GameHost source projection schema defined
fixture exits non-zero on missing required row
```

## Validation status for this pass

```txt
runtime source changed: no
package scripts changed: no
branch created: no
pull request created: no
npm run check: not run
npm run build: not run
headless:status: not run
headless:inspect: not run
headless:renderer: not run
headless:check: not run
headless:build: not run
browser smoke: not run
pushed to main: yes, documentation only
```
