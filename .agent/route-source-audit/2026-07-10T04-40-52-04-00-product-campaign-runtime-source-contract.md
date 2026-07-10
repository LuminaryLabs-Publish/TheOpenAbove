# Route Source Audit: Product Campaign Runtime Source Contract

**Timestamp:** `2026-07-10T04-40-52-04-00`

## Current source split

```txt
package.json: current hot-air-balloon wind-drift description and headless commands
index.html: Balloon Drift title, canvas, HUD, importmap, and module route
src/data/campaign.config.js: CAMPAIGN/WORLD plus legacy FLIGHT fields
src/main.js: actual route composer and GameHost surface
tools/headless-editor-environment.mjs: headless renderer/build contract checker
```

## Contract gap

The repo needs a canonical source layer that explains which source facts are current route authority, which legacy fields remain compatibility inputs, and which facts are deferred.

## Required source contract files

```txt
src/source/open-above-product.js
src/source/balloon-drift.config.js
src/source/legacy-flight-compatibility.js
src/source/source-consumer-manifest.js
src/source/source-fingerprint.js
src/source/source-snapshot.js
src/source/source-acceptance.js
src/source/source-consumer-ledger.js
src/source/gamehost-source-readback.js
scripts/open-above-source-fixture.mjs
```

## Acceptance vocabulary

```txt
accepted-current
legacy-compatible
deferred-next-route
ignored-by-current-route
missing-required
```

## GameHost future shape

```txt
window.GameHost.getState()
  -> local
  -> nexusEngine
  -> source
       -> manifest
       -> fingerprint
       -> snapshot
       -> acceptanceRows
       -> fixtureVersion
       -> headlessStatus
```

## Guardrail

Do not delete legacy campaign fields until compatibility rows and source fixture rows are passing.
