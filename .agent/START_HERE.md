# START HERE: TheOpenAbove

**Last aligned:** `2026-07-10T11-51-35-04-00`

**Repo:** `LuminaryLabs-Publish/TheOpenAbove`

**Branch:** `main`

## Current safe ledge

```txt
TheOpenAbove Source Authority Readback Ledger Refresh + GameHost Headless Fixture Gate
```

## Read this first

Start with the latest tracker:

```txt
.agent/trackers/2026-07-10T11-51-35-04-00/project-breakdown.md
```

Then read:

```txt
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-10T11-51-35-04-00-source-authority-readback-ledger-dsk-map.md
.agent/render-audit/2026-07-10T11-51-35-04-00-renderer-source-readback-contract-gap.md
.agent/gameplay-audit/2026-07-10T11-51-35-04-00-balloon-drift-source-result-loop.md
.agent/route-source-audit/2026-07-10T11-51-35-04-00-product-campaign-runtime-authority-contract.md
.agent/interaction-audit/2026-07-10T11-51-35-04-00-keyboard-wheel-result-ledger-map.md
.agent/source-authority-audit/2026-07-10T11-51-35-04-00-gamehost-source-readback-contract.md
.agent/headless-editor-audit/2026-07-10T11-51-35-04-00-source-proof-command-surface.md
.agent/deploy-audit/2026-07-10T11-51-35-04-00-source-authority-headless-fixture-gate.md
.agent/turn-ledger/2026-07-10T11-51-35-04-00.md
```

## Current product read

`TheOpenAbove` is a Vite-hosted cinematic hot-air-balloon Balloon Drift route.

The live route is:

```txt
index.html
  -> src/main.js
  -> visual-domain + balloon object + simulation + camera rig + presentation + telemetry
  -> HUD projection
  -> window.GameHost.getState()
```

The visual/runtime boundaries are useful. The next blocker is not visuals, camera feel, or more route content. It is source authority, input result rows, and GameHost/headless readback proof.

## Main finding

Do not start next with renderer extraction, terrain extraction, camera retuning, balloon visual changes, simulation constant retuning, route expansion, or legacy campaign deletion.

The durable blocker is source proof:

```txt
src/main.js is the current Balloon Drift route composer.
src/data/campaign.config.js still contains legacy free-flight fields.
keyboard and wheel inputs mutate without result rows.
window.GameHost.getState() has no .source block.
Headless editor commands validate renderer/build contracts, not source rows.
No source manifest, fingerprint, snapshot, acceptance ledger, consumer ledger, input result ledger, or DOM-free source fixture exists yet.
```

## Next implementation files

```txt
src/source/open-above-product.js
src/source/balloon-drift.config.js
src/source/legacy-flight-compatibility.js
src/source/source-authority-ledger.js
src/source/source-consumer-manifest.js
src/source/source-fingerprint.js
src/source/source-snapshot.js
src/source/source-acceptance.js
src/source/source-consumer-ledger.js
src/source/input-result-ledger.js
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
