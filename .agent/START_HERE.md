# TheOpenAbove Agent Start

**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

**Last aligned:** `2026-07-09T23-51-04-04-00`

## Purpose

This `.agent/` folder is the repo-local operating memory for scheduled and manual breakdown work on `TheOpenAbove`.

Read this folder before changing implementation code.

## Current selection result

The current public `LuminaryLabs-Publish` organization repo list was compared against the tracked/documented repo ledger in `LuminaryLabs-Dev/LuminaryLabs` and sampled root `.agent/START_HERE.md` state.

No checked non-Cavalry Publish repo was fully new, central-ledger absent, undocumented, recently added but undocumented, or missing sampled root `.agent` state.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`TheOpenAbove` was selected as the oldest eligible central-ledger fallback. This pass refreshes repo-local and central tracking to `2026-07-09T23-51-04-04-00`.

## Current product read

`TheOpenAbove` is a Vite / Three.js cinematic hot-air-balloon Balloon Drift route using NexusEngine telemetry.

The live route now composes dedicated runtime kits:

```txt
src/main.js
  -> createVisualDomain
  -> buildHotAirBalloon
  -> createBalloonSimulation
  -> createBalloonCameraRig
  -> createBalloonPresentationDomain
  -> createBalloonTelemetryEngine
```

The next gap is not visual extraction. It is source/readback proof for product copy, campaign compatibility, simulation/visual/camera/presentation source snapshots, `GameHost.getState().source`, and DOM-free source fixture rows.

## Current interaction loop

```txt
open index.html
  -> canvas, HUD, and error panel mount
  -> src/main.js imports Three.js, NexusEngine, campaign config, balloon object kit, simulation kit, telemetry kit, visual domain, camera rig, and presentation domain
  -> visual domain creates scene, camera, renderer, quality, terrain, vegetation, grass, water, clouds, sky, sun, HDR composer, and dynamic resolution
  -> balloon object kit composes envelope, mouth, streamers, seams, basket, rigging, burner, and rope
  -> simulation installs keyboard consumers for burner and vent intent
  -> camera rig installs wheel zoom and derives third-person/basket-view blend
  -> frame updates simulation, balloon pose, object animation, presentation, camera, visual domain, Nexus telemetry, render, and HUD
  -> window.GameHost.getState() exposes local and nexusEngine snapshots
```

## First files to read

```txt
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/architecture-audit/2026-07-09T23-51-04-04-00-visual-domain-source-readback-dsk-map.md
.agent/render-audit/2026-07-09T23-51-04-04-00-visual-domain-render-readback-gap.md
.agent/gameplay-audit/2026-07-09T23-51-04-04-00-balloon-simulation-telemetry-loop.md
.agent/route-source-audit/2026-07-09T23-51-04-04-00-product-copy-campaign-source-parity.md
.agent/deploy-audit/2026-07-09T23-51-04-04-00-source-fixture-check-build-gate.md
.agent/trackers/2026-07-09T23-51-04-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-09T23-51-04-04-00.md
.agent/kit-registry.json
```

## Source files to inspect next

```txt
README.md
package.json
index.html
src/main.js
src/runtime/balloon-simulation-kit.js
src/runtime/balloon-telemetry-kit.js
src/visual/visual-domain.js
src/visual/camera-presentation/balloon-camera-rig-kit.js
src/visual/balloon-presentation/balloon-presentation-domain.js
src/data/campaign.config.js
src/hot-air-balloon-object-kit.js
tests/smoke.mjs
```

## Source files to add next

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

## Next safe ledge

```txt
TheOpenAbove Visual Domain Source Readback + Browser Fixture Gate
```

## Operating rules

```txt
Only push to main.
Do not create branches.
Do not work on TheCavalryOfRome.
Keep scheduled repo breakdowns moving; do not pause the loop.
```
