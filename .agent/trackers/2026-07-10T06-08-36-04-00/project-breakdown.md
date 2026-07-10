# TheOpenAbove Project Breakdown

**Timestamp:** `2026-07-10T06-08-36-04-00`

**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

**Branch:** `main`

## Selection

The public `LuminaryLabs-Publish` repository page showed 9 repositories.

`LuminaryLabs-Publish/TheCavalryOfRome` was excluded by standing rule.

No checked non-Cavalry repo was new, central-ledger absent, missing sampled root `.agent`, recently added but undocumented, or otherwise undocumented.

`TheOpenAbove` was selected as the oldest eligible documented fallback after `MyCozyIsland` advanced to `2026-07-10T05-49-25-04-00`.

## Public Publish repositories observed

```txt
LuminaryLabs-Publish/TheOpenAbove         selected / prior central latest 2026-07-10T04-40-52-04-00
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-10T04-50-40-04-00
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest 2026-07-10T04-58-56-04-00
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest 2026-07-10T05-11-51-04-00
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central latest 2026-07-10T05-21-20-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest 2026-07-10T05-28-12-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-10T05-40-17-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest 2026-07-10T05-49-25-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
```

## Product read

`TheOpenAbove` is a Vite-hosted cinematic hot-air-balloon route.

The live product route is `index.html -> src/main.js`, not the older README free-flight route.

`package.json` exposes `npm run check`, `npm run build`, and Nexus headless editor commands.

## Interaction loop

```txt
index.html
  -> importmap loads Three.js 0.165.0
  -> canvas#game, #hud, and #error mount
  -> ./src/main.js imports NexusEngine main CDN
  -> src/main.js imports CAMPAIGN/WORLD config
  -> src/main.js imports hot-air-balloon object kit, balloon simulation, telemetry, visual-domain, camera-rig, and presentation-domain
  -> createVisualDomain({ canvas, worldConfig: WORLD }) creates scene, camera, WebGLRenderer, quality tier, streamed terrain, vegetation, grass, water, sky, sun, clouds, aerial perspective, HDR composer, lens response, and dynamic resolution
  -> buildHotAirBalloon() creates the route object and adds it to the visual scene
  -> createBalloonSimulation({ terrainHeight, startPosition: [0, 105, 0] }) owns key listeners, wind, buoyancy, burner, vent, altitude, velocity, distance, and balloon pose application
  -> createBalloonCameraRig(...) resolves scroll zoom, follow mode, basket-view blend, and camera diagnostics
  -> createBalloonPresentationDomain(balloon) updates envelope, basket, rope, and burner presentation
  -> createBalloonTelemetryEngine(NexusEngine, getSnapshot) publishes route telemetry into NexusEngine
  -> requestAnimationFrame frame loop updates simulation, object animation, presentation, camera, visual domain, Nexus telemetry, renderer, and HUD
  -> window.GameHost.getState() returns { nexusEngine, local } only
  -> tools/headless-editor-environment.mjs validates renderer/build contracts through static source inspection and npm scripts
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
cloud-weather-map
volumetric-clouds
streamed-terrain-surface
terrain-chunk-streaming
vegetation-clusters
grass-detail
water-surfaces
distant-landmarks
hdr-composer
neutral-exposure
neutral-color-grade
lens-response
camera-rig
basket-view-camera
clipping-fade
balloon-presentation
hud-telemetry
gamehost-readback
smoke-test-contract
headless-renderer-contract
source-manifest-next
source-fingerprint-next
source-snapshot-next
source-acceptance-ledger-next
source-consumer-ledger-next
gamehost-source-readback-next
headless-source-fixture-next
central-ledger-sync
```

## Services the kits offer

```txt
route shell service: mounts canvas/HUD/error panel, importmap, and module route.
visual domain service: owns renderer, scene, camera, quality, dynamic resolution, sky, light, aerial perspective, clouds, streamed terrain, vegetation, grass, water, composer, lens, stats, resize, update, render, and dispose.
simulation service: owns keyboard listeners, burner/vent intent, wind drift, buoyancy, damping, altitude safety, ground clearance, state update, balloon pose application, snapshot, and dispose.
object kit service: composes the balloon envelope, mouth, streamers, seams, basket, rigging, burner, and ropes.
camera service: owns zoom, follow, basket-view blend, clipping fade, and camera readback fields.
presentation service: owns fabric, basket, rope, and burner visual response to simulation.
telemetry service: publishes current snapshot through NexusEngine.
headless editor service: exposes project.inspect, renderer.validate, project.check, project.build, and runtime.getState for current renderer/build contract checks.
smoke test service: statically asserts route files, neutral lighting, streamed terrain, shader safety, water fog, and headless editor hooks.
GameHost service: exposes legacy local/Nexus readback, but not source proof yet.
central ledger service: records selected repo, audit paths, findings, validation, and next ledge.
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
open-above-cloud-weather-map-kit
open-above-volumetric-cloud-kit
open-above-terrain-surface-kit
open-above-terrain-chunk-streaming-kit
open-above-vegetation-cluster-kit
open-above-grass-detail-kit
open-above-water-surface-kit
open-above-distant-landmark-kit
open-above-hdr-composer-kit
open-above-neutral-color-grade-kit
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
open-above-static-smoke-test-kit
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

Do not start next with renderer extraction, terrain extraction, camera retuning, balloon visual changes, simulation constant retuning, route expansion, or legacy campaign deletion.

The repo already has useful runtime, visual, object, camera, presentation, telemetry, headless editor, and static smoke-test boundaries.

The blocker is source/readback proof: README and campaign config still preserve older free-flight concepts; `src/main.js` is the current Balloon Drift source of truth; `GameHost` exposes no `.source` block; and headless checks validate renderer/build contracts rather than product/campaign/runtime source rows.

## Next safe ledge

```txt
TheOpenAbove Source Fixture Ledger Refresh + GameHost Headless Gate
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
central ledger updated: pending this run
```
