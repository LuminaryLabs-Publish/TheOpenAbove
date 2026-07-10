# Project Breakdown: TheOpenAbove Headless Source GameHost Readback

**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

**Timestamp:** `2026-07-10T04-40-52-04-00`

## Plan ledger

```txt
[x] Checked the current public LuminaryLabs-Publish repo list.
[x] Excluded LuminaryLabs-Publish/TheCavalryOfRome.
[x] Compared eligible repos against central LuminaryLabs-Dev/LuminaryLabs tracking.
[x] Selected one repo only: TheOpenAbove.
[x] Read current repo .agent state.
[x] Read central TheOpenAbove repo ledger.
[x] Read package.json, index.html, src/main.js, campaign config, simulation, visual-domain, camera rig, and headless environment.
[x] Identified interaction loop.
[x] Identified domains in use.
[x] Identified kit services.
[x] Identified implemented and next-cut kits.
[x] Updated required root .agent docs.
[x] Added architecture, render, gameplay, route-source, and deploy audits.
[x] Added timestamped tracker and turn ledger.
[x] Updated central repo ledger.
[x] Added central internal change-log entry.
[ ] Runtime source changed.
[ ] Local/browser/headless validation run.
```

## Selection result

`TheOpenAbove` was selected because no checked non-Cavalry Publish repo was new, missing from the central ledger, missing sampled root `.agent` state, recently added but undocumented, or otherwise undocumented.

After `MyCozyIsland` advanced to `2026-07-10T04-29-10-04-00`, `TheOpenAbove` was the oldest eligible documented fallback.

`TheCavalryOfRome` remains excluded.

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
  -> window.GameHost.getState() returns local and nexusEngine snapshots only
  -> tools/headless-editor-environment.mjs validates renderer/build contracts by source inspection and npm scripts
```

## Domains in use

```txt
static-browser-shell
vite-static-publish
three-importmap-runtime
nexusengine-cdn-runtime
nexus-headless-editor-environment
campaign-config
legacy-flight-config
world-config
balloon-drift-simulation
browser-keyboard-input
burner-intent
vent-intent
wind-field
buoyancy-integration
altitude-safety
ground-clearance
balloon-pose-application
hot-air-balloon-object
balloon-envelope-panel
balloon-mouth
balloon-streamer-fit
balloon-fabric-seam
hot-air-balloon-basket
hot-air-balloon-rigging
hot-air-balloon-burner
rope-object
visual-domain
quality-tier
dynamic-resolution
physical-sky
sun-light
aerial-perspective
cloud-shadow-overlay
cloud-weather-map
volumetric-clouds
terrain-surface
vegetation-clusters
grass-detail
water-surfaces
distant-landmarks
hdr-composer
auto-exposure
god-rays
bloom
color-grade
lens-response
camera-rig
clipping-fade
basket-view-camera
balloon-presentation
envelope-fabric-material
basket-material
rope-material
burner-illumination
hud-telemetry
gamehost-readback
source-manifest-next
source-fingerprint-next
source-snapshot-next
source-acceptance-ledger-next
source-consumer-ledger-next
headless-source-fixture-next
central-ledger-sync
```

## Kit services

```txt
open-above-balloon-simulation-kit: keyboard intent, wind, buoyancy, vent, altitude, ground clearance, distance, pose application, and snapshot
open-above-balloon-telemetry-kit: NexusEngine-backed openAbove telemetry surface over the local snapshot
open-above-visual-domain: renderer, scene, camera, terrain, vegetation, grass, sky, clouds, water, postprocess, quality, resolution, stats, render/update lifecycle
open-above-hot-air-balloon-object-kit: envelope, basket, rigging, ropes, burner, material, seam, streamer, mouth, and animation composition
open-above-balloon-camera-rig-kit: scroll zoom, third-person follow, basket-view blend, clipping fade, camera target/position state
open-above-balloon-presentation-domain: balloon fabric, basket, rope, and burner presentation updates
open-above-headless-editor-environment: project.inspect, renderer.validate, project.check, project.build, runtime.getState for source-inspected renderer/build safety
planned source proof services: product/campaign/runtime manifest, legacy field classification, source fingerprint, source snapshot, acceptance rows, GameHost source readback, source fixture, headless source check
```

## Implemented kits

```txt
open-above-balloon-simulation-kit
open-above-balloon-telemetry-kit
open-above-visual-domain
open-above-quality-tier-kit
open-above-dynamic-resolution-kit
open-above-physical-sky-kit
open-above-sun-light-kit
open-above-aerial-perspective-kit
open-above-cloud-shadow-kit
open-above-cloud-weather-map-kit
open-above-volumetric-cloud-kit
open-above-terrain-surface-kit
open-above-vegetation-cluster-kit
open-above-grass-detail-kit
open-above-water-surface-kit
open-above-distant-landmark-kit
open-above-hdr-composer-kit
open-above-auto-exposure-kit
open-above-god-ray-kit
open-above-bloom-kit
open-above-color-grade-kit
open-above-lens-response-kit
open-above-balloon-camera-rig-kit
open-above-clipping-fade-kit
open-above-balloon-presentation-domain
open-above-envelope-fabric-material-kit
open-above-basket-material-kit
open-above-rope-material-kit
open-above-burner-illumination-kit
open-above-hot-air-balloon-object-kit
open-above-balloon-envelope-panel-kit
open-above-balloon-mouth-kit
open-above-balloon-streamer-fit-kit
open-above-balloon-fabric-seam-kit
open-above-hot-air-balloon-basket-kit
open-above-hot-air-balloon-rigging-kit
open-above-hot-air-balloon-burner-kit
open-above-rope-kit
open-above-headless-editor-environment
```

## Next-cut kits

```txt
open-above-product-copy-authority-kit
open-above-readme-route-copy-parity-kit
open-above-campaign-current-route-authority-kit
open-above-legacy-flight-compatibility-kit
open-above-balloon-drift-config-kit
open-above-source-consumer-manifest-kit
open-above-source-fingerprint-kit
open-above-source-snapshot-kit
open-above-source-acceptance-ledger-kit
open-above-source-consumer-ledger-kit
open-above-gamehost-source-readback-kit
open-above-headless-source-fixture-kit
open-above-browser-consumer-fixture-kit
open-above-central-ledger-sync-kit
```

## Main finding

`TheOpenAbove` should not start next with renderer extraction, terrain extraction, camera retuning, balloon visual changes, simulation constant retuning, route expansion, or legacy campaign deletion.

The durable blocker is source/readback proof. `src/main.js` is the current Balloon Drift route composer, while `README.md` and `src/data/campaign.config.js` still preserve older free-flight terms. `window.GameHost.getState()` exposes `local` and `nexusEngine`, but not a `.source` block, and the headless editor checks renderer/build contracts rather than source rows.

## Next safe ledge

```txt
TheOpenAbove Headless Source GameHost Readback Refresh + Browser Fixture Gate
```

## Validation

```txt
runtime source changed: no
branch created: no
pull request created: no
npm run check: not run
npm run build: not run
npm run headless:check: not run
browser smoke: not run
DOM-free source fixture: not run because proof files do not exist yet
pushed to main: yes, documentation only
```
