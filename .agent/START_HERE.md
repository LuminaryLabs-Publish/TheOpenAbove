# START HERE: TheOpenAbove

**Last aligned:** `2026-07-10T04-40-52-04-00`

**Repo:** `LuminaryLabs-Publish/TheOpenAbove`

**Branch:** `main`

## Current safe ledge

```txt
TheOpenAbove Headless Source GameHost Readback Refresh + Browser Fixture Gate
```

## Read this first

Start with the latest tracker:

```txt
.agent/trackers/2026-07-10T04-40-52-04-00/project-breakdown.md
```

Then read:

```txt
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-10T04-40-52-04-00-headless-source-gamehost-readback-dsk-map.md
.agent/render-audit/2026-07-10T04-40-52-04-00-visual-domain-source-proof-gap.md
.agent/gameplay-audit/2026-07-10T04-40-52-04-00-balloon-drift-source-loop.md
.agent/route-source-audit/2026-07-10T04-40-52-04-00-product-campaign-runtime-source-contract.md
.agent/deploy-audit/2026-07-10T04-40-52-04-00-headless-source-fixture-check-gate.md
.agent/turn-ledger/2026-07-10T04-40-52-04-00.md
```

## Current product read

`TheOpenAbove` is a live cinematic Balloon Drift route.

The route has useful runtime, visual, object, camera, presentation, telemetry, and headless editor kit boundaries.

The next blocker is not visual quality. It is source/readback proof.

## Current interaction loop

```txt
index.html
  -> importmap loads Three.js 0.165.0
  -> script loads ./src/main.js
  -> src/main.js imports NexusEngine main CDN, CAMPAIGN/WORLD, hot-air-balloon object kit, balloon simulation, balloon telemetry, visual-domain, camera-rig, and presentation-domain
  -> createVisualDomain({ canvas, worldConfig: WORLD })
  -> buildHotAirBalloon()
  -> visual.scene.add(balloon)
  -> createBalloonSimulation({ terrainHeight, startPosition: [0, 105, 0] })
  -> simulation.applyToBalloon(balloon)
  -> createBalloonCameraRig(visual.camera, balloon, { initialZoom: 48, maxZoom: 112 })
  -> createBalloonPresentationDomain(balloon)
  -> getSnapshot() wraps simulation snapshot with region, camera, and visual stats
  -> createBalloonTelemetryEngine(NexusEngine, getSnapshot)
  -> frame updates simulation, balloon pose, object animation, presentation, camera rig, visual domain, Nexus telemetry, renderer, and HUD
  -> window.GameHost.getState() returns local and nexusEngine snapshots
```

## Main finding

Do not start next with renderer extraction, visual-domain rewrite, camera retuning, balloon visual changes, simulation constant retuning, route expansion, or legacy campaign deletion.

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
