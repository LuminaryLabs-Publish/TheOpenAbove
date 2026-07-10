# START HERE: TheOpenAbove

**Last aligned:** `2026-07-10T14-50-38-04-00`

**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

**Branch:** `main`

## Summary

`TheOpenAbove` is a Vite-hosted cinematic hot-air-balloon drift route. Its simulation, camera, visual, presentation, telemetry, smoke, and headless boundaries are already useful. The next blocker is a JSON-safe source/input/frame correlation chain that proves which normalized input results and source fingerprint produced each simulation, camera, telemetry, render, HUD, and GameHost row.

## Current safe ledge

```txt
TheOpenAbove Source Input Frame Correlation Ledger + GameHost Headless Fixture Gate
```

## Read this first

```txt
.agent/trackers/2026-07-10T14-50-38-04-00/project-breakdown.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
```

Then read the latest system audits:

```txt
.agent/architecture-audit/2026-07-10T14-50-38-04-00-source-input-frame-correlation-dsk-map.md
.agent/render-audit/2026-07-10T14-50-38-04-00-render-frame-consumer-correlation-gap.md
.agent/gameplay-audit/2026-07-10T14-50-38-04-00-balloon-drift-input-frame-loop.md
.agent/route-source-audit/2026-07-10T14-50-38-04-00-product-runtime-source-correlation-contract.md
.agent/interaction-audit/2026-07-10T14-50-38-04-00-keyboard-wheel-event-result-correlation-map.md
.agent/source-authority-audit/2026-07-10T14-50-38-04-00-gamehost-source-frame-correlation-contract.md
.agent/telemetry-audit/2026-07-10T14-50-38-04-00-nexus-frame-correlation-readback.md
.agent/headless-editor-audit/2026-07-10T14-50-38-04-00-source-frame-fixture-command-surface.md
.agent/deploy-audit/2026-07-10T14-50-38-04-00-source-frame-fixture-check-gate.md
.agent/turn-ledger/2026-07-10T14-50-38-04-00.md
```

## Active route

```txt
index.html
  -> src/main.js
  -> campaign/world source
  -> visual domain + balloon object
  -> keyboard simulation + wheel camera input
  -> frame sequence: simulation, object, presentation, camera, visual, telemetry, render, HUD
  -> window.GameHost.getState()
```

## Main finding

`src/main.js` knows the complete consumer order, but the runtime emits no shared frame ID, input sequence range, or source fingerprint across those consumers. Keyboard and wheel listeners mutate hidden state, `GameHost` returns only latest aggregate snapshots, and the headless editor performs static inspection rather than deterministic source/input/frame proof.

## Next implementation files

```txt
src/source/open-above-product.js
src/source/balloon-drift.config.js
src/source/legacy-flight-compatibility.js
src/proof/source-manifest.js
src/proof/source-fingerprint.js
src/proof/source-acceptance-ledger.js
src/proof/input-result-ledger.js
src/proof/frame-correlation-ledger.js
src/proof/consumer-ledger.js
src/proof/gamehost-proof-readback.js
scripts/open-above-source-frame-fixture.mjs
```

## Guardrails

```txt
Push only to main.
Do not create branches or PRs.
Do not work on TheCavalryOfRome.
Keep GameHost.local and GameHost.nexusEngine compatible.
Add proof readback additively.
Do not retune simulation, camera, renderer, terrain, clouds, water, or post-processing during the proof pass.
Do not delete legacy campaign/FLIGHT fields until compatibility rows exist.
Keep proof journals bounded, deterministic, disposable, and JSON-safe.
```