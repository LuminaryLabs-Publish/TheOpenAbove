# START HERE: TheOpenAbove

**Last aligned:** `2026-07-10T06-08-36-04-00`

**Repo:** `LuminaryLabs-Publish/TheOpenAbove`

**Branch:** `main`

## Current safe ledge

```txt
TheOpenAbove Source Fixture Ledger Refresh + GameHost Headless Gate
```

## Read this first

Start with the latest tracker:

```txt
.agent/trackers/2026-07-10T06-08-36-04-00/project-breakdown.md
```

Then read:

```txt
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-10T06-08-36-04-00-source-fixture-ledger-dsk-map.md
.agent/render-audit/2026-07-10T06-08-36-04-00-renderer-contract-source-readback-gap.md
.agent/gameplay-audit/2026-07-10T06-08-36-04-00-balloon-drift-source-fixture-loop.md
.agent/route-source-audit/2026-07-10T06-08-36-04-00-product-campaign-source-ledger-contract.md
.agent/deploy-audit/2026-07-10T06-08-36-04-00-source-fixture-check-gate.md
.agent/turn-ledger/2026-07-10T06-08-36-04-00.md
```

## Current product read

`TheOpenAbove` is a Vite-hosted cinematic hot-air-balloon Balloon Drift route.

The live route is:

```txt
index.html -> src/main.js -> visual-domain + balloon object + simulation + camera rig + presentation + telemetry -> GameHost
```

The route has useful runtime, visual, object, camera, presentation, telemetry, smoke-test, and headless editor kit boundaries.

The next blocker is not visual quality. It is source/readback proof.

## Main finding

Do not start next with renderer extraction, terrain extraction, camera retuning, balloon visual changes, simulation constant retuning, route expansion, or legacy campaign deletion.

The durable blocker is source proof:

```txt
README and campaign data still contain legacy free-flight concepts.
src/main.js is the current Balloon Drift route composer.
window.GameHost.getState() has no .source block.
Headless editor commands validate renderer/build contracts, not source rows.
No source manifest, source fingerprint, source snapshot, source acceptance rows, or headless source fixture exist yet.
```

## Next implementation files

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

## Guardrails

```txt
Push only to main.
Do not create a branch.
Do not open a PR.
Do not work on Cavalry of Rome.
Keep GameHost legacy fields compatible.
Add source readback additively.
Do not delete legacy campaign fields until compatibility rows exist.
Use the headless editor harness as a source proof caller after the source fixture exists.
```
