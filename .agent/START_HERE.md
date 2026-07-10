# START HERE: TheOpenAbove

**Last aligned:** `2026-07-10T01-20-47-04-00`

**Repo:** `LuminaryLabs-Publish/TheOpenAbove`

**Branch:** `main`

## Current safe ledge

```txt
TheOpenAbove Source Consumer GameHost Readback Catch-up + Browser Fixture Gate
```

## Read this first

Start with the latest tracker:

```txt
.agent/trackers/2026-07-10T01-20-47-04-00/project-breakdown.md
```

Then read:

```txt
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-10T01-20-47-04-00-source-consumer-gamehost-readback-dsk-map.md
.agent/render-audit/2026-07-10T01-20-47-04-00-visual-domain-render-source-readback.md
.agent/gameplay-audit/2026-07-10T01-20-47-04-00-balloon-drift-simulation-source-loop.md
.agent/route-source-audit/2026-07-10T01-20-47-04-00-product-campaign-runtime-parity.md
.agent/deploy-audit/2026-07-10T01-20-47-04-00-source-fixture-check-build-gate.md
.agent/turn-ledger/2026-07-10T01-20-47-04-00.md
```

## Current product read

`TheOpenAbove` is a live cinematic Balloon Drift route.

The browser route starts at `index.html`, loads Three.js through an importmap, then runs `src/main.js`.

`src/main.js` composes the actual route from dedicated runtime kits:

```txt
createVisualDomain
buildHotAirBalloon
createBalloonSimulation
createBalloonCameraRig
createBalloonPresentationDomain
createBalloonTelemetryEngine
```

## Current interaction loop

```txt
index.html
  -> importmap loads Three.js 0.165.0
  -> script loads ./src/main.js
  -> src/main.js imports NexusEngine main CDN, CAMPAIGN/WORLD, balloon object kit, simulation kit, telemetry kit, visual-domain, camera-rig, and presentation-domain
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

Do not start next with renderer extraction, visual-domain rewrite, camera retuning, balloon visual changes, simulation constant retuning, or route expansion.

The durable blocker is source/readback proof:

```txt
README still carries older free-flight wording.
campaign config still contains legacy FLIGHT/thermal/gate/perch fields.
src/main.js is the actual route composer.
window.GameHost.getState() has no .source block.
No source manifest, source fingerprint, source snapshot, source acceptance rows, or DOM-free source fixture exist yet.
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
```
