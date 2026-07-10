# Project Breakdown: TheOpenAbove

**Timestamp:** `2026-07-10T08-59-04-04-00`

**Selected repo:** `LuminaryLabs-Publish/TheOpenAbove`

**Branch:** `main`

## Selection

The current public `LuminaryLabs-Publish` repository list was compared against the central ledger and sampled root `.agent` state.

No checked non-Cavalry repo was new, central-ledger absent, missing root `.agent`, recently added, or otherwise undocumented.

`TheOpenAbove` was selected as the oldest eligible documented fallback after `MyCozyIsland` advanced to `2026-07-10T08-48-58-04-00`.

`TheCavalryOfRome` remained excluded by rule.

## Public Publish repositories observed

```txt
LuminaryLabs-Publish/TheOpenAbove         selected / prior central latest 2026-07-10T07-41-42-04-00
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-10T07-50-29-04-00
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest 2026-07-10T07-59-27-04-00
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest 2026-07-10T08-11-35-04-00
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central latest 2026-07-10T08-20-42-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest 2026-07-10T08-28-26-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-10T08-39-05-04-00
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest 2026-07-10T08-48-58-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
```

## Current interaction loop

```txt
index.html
  -> importmap loads Three.js 0.165.0
  -> canvas#game, #hud, and #error mount
  -> ./src/main.js imports NexusEngine main CDN
  -> src/main.js imports CAMPAIGN/WORLD config
  -> createVisualDomain({ canvas, worldConfig: WORLD })
  -> buildHotAirBalloon()
  -> createBalloonSimulation({ terrainHeight, startPosition: [0, 105, 0] })
  -> createBalloonCameraRig(...)
  -> createBalloonPresentationDomain(balloon)
  -> createBalloonTelemetryEngine(NexusEngine, getSnapshot)
  -> requestAnimationFrame updates simulation, object animation, presentation, camera, visual domain, Nexus telemetry, renderer, and HUD
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

## Services that the kits offer

- Route shell service: canvas, HUD, error panel, importmap, module route.
- Visual domain service: renderer, scene, camera, terrain, vegetation, grass, sky, clouds, water, composer, effects, quality policy, render stats.
- Object kit service: balloon envelope, mouth, streamers, seams, basket, rigging, burner, ropes.
- Simulation service: keyboard intent, wind, buoyancy, altitude, ground clearance, position, velocity, distance.
- Camera service: zoom, follow mode, basket blend, clipping, diagnostics.
- Presentation service: fabric, basket, rope, burner animation.
- Telemetry service: NexusEngine route telemetry from local snapshots.
- Headless editor service: project.inspect, renderer.validate, project.check, project.build, runtime.getState.
- Smoke test service: static route and renderer contract assertions.
- GameHost service: local/Nexus readback without source proof yet.

## Kits

Current kits:

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
open-above-hot-air-balloon-object-kit
open-above-headless-editor-environment
open-above-static-smoke-test-kit
```

Next-cut kits:

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
```

## Main finding

`TheOpenAbove` should not start next with renderer extraction, terrain extraction, camera retuning, balloon visual changes, simulation constant retuning, route expansion, or legacy campaign deletion.

The blocker is source/GameHost readback proof. The route is current in `src/main.js`, while README/campaign data still preserve older free-flight concepts, `GameHost` exposes no `.source` block, and headless checks prove renderer/build contracts rather than product/campaign/runtime source rows.

## Next safe ledge

```txt
TheOpenAbove Source GameHost Readback Ledger Refresh + Headless Fixture Gate
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
pushed to main: yes
central ledger updated: yes
```
