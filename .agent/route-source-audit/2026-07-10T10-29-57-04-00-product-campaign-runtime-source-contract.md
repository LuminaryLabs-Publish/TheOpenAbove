# Route Source Audit: Product Campaign Runtime Source Contract

Timestamp: 2026-07-10T10-29-57-04-00
Repo: LuminaryLabs-Publish/TheOpenAbove

## Source-of-truth split

```txt
README.md
  -> still contains older free-flight wording and controls
package.json
  -> current static hot-air-balloon route identity
src/data/campaign.config.js
  -> current world/campaign rows plus legacy FLIGHT/thermal/gate/perch fields
src/main.js
  -> actual Balloon Drift runtime composer
window.GameHost.getState()
  -> local + nexusEngine only, no .source block
```

## Required contract

The next source pass should classify every source row as one of:

```txt
current
legacy_compatible
ignored
missing
deferred
```

## Required source modules

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

## Required fixture proof

```txt
canonical Balloon Drift source loads without DOM
legacy README/campaign/FLIGHT fields are classified explicitly
source fingerprints are stable
source snapshots are serializable
source acceptance rows are emitted
source consumer rows identify src/main.js, simulation, visual-domain, telemetry, HUD, smoke, headless, and GameHost consumers
GameHost source projection has expected additive shape
headless project.check includes source rows
```

## Guardrail

Do not delete legacy campaign fields until compatibility rows exist and the source fixture proves the transition.
