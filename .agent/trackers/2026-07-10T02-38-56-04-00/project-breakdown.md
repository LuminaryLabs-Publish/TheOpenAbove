# Project Breakdown: TheOpenAbove

**Timestamp:** `2026-07-10T02-38-56-04-00`

**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

**Branch:** `main`

**Mode:** documentation-only repo breakdown

## Selection

The current public `LuminaryLabs-Publish` repository page was checked and showed 9 repositories.

`LuminaryLabs-Publish/TheCavalryOfRome` was excluded by rule.

No checked non-Cavalry repository was new, missing from central tracking, missing sampled root `.agent` state, recently added but undocumented, or otherwise undocumented.

`TheOpenAbove` was selected as the oldest eligible documented-selection fallback after central-ledger comparison.

## Source files inspected

```txt
package.json
index.html
src/main.js
src/runtime/balloon-simulation-kit.js
src/runtime/balloon-telemetry-kit.js
src/visual/visual-domain.js
src/data/campaign.config.js
src/hot-air-balloon-object-kit.js
tools/headless-editor-environment.mjs
.agent/START_HERE.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
```

## Current interaction loop

```txt
index.html
  -> importmap loads Three.js 0.165.0
  -> ./src/main.js starts the route
  -> imports NexusEngine main CDN, CAMPAIGN/WORLD, hot-air-balloon object kit, simulation kit, telemetry kit, visual-domain, camera-rig, and presentation-domain
  -> createVisualDomain({ canvas, worldConfig: WORLD }) creates renderer, scene, camera, terrain, vegetation, grass, water, sky, clouds, post-processing, quality, and render stats
  -> buildHotAirBalloon() composes envelope, mouth, streamers, seams, basket, rigging, burner, and rope sub-kits
  -> createBalloonSimulation({ terrainHeight, startPosition: [0, 105, 0] }) installs keyboard listeners and owns burner, vent, wind, buoyancy, altitude, position, velocity, and distance state
  -> simulation.applyToBalloon(balloon) writes balloon position and rotation
  -> createBalloonCameraRig(...) resolves zoom, follow, and basket-view camera context
  -> createBalloonPresentationDomain(balloon) updates presentation-only fabric/basket/rope/burner state
  -> getSnapshot() merges simulation, region, camera, and visual stats
  -> createBalloonTelemetryEngine(NexusEngine, getSnapshot) publishes balloon and visual resources
  -> requestAnimationFrame(frame)
  -> simulation.update(dt)
  -> animateHotAirBalloon(...)
  -> balloonPresentation.update(...)
  -> cameraRig.update(...)
  -> visual.update(...)
  -> engine.tick(dt)
  -> visual.render(dt, frameMs)
  -> HUD projection
  -> window.GameHost.getState() returns local and nexusEngine snapshots only
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
source-consumer-proof-next
headless-source-fixture-next
central-ledger-sync
```

## Kit services

```txt
route shell service: mounts canvas, HUD, error panel, Three importmap, and module entry.
visual domain service: creates and updates renderer, scene, camera, terrain, vegetation, grass, sky, clouds, water, composer, effects, dynamic resolution, and render stats.
object kit service: composes the balloon visual object from envelope, mouth, streamer, seam, basket, rigging, burner, and rope kits.
simulation service: reads keyboard input and integrates burner, vent, wind, buoyancy, damping, ceiling softness, ground clearance, position, velocity, altitude, and distance.
camera service: resolves follow distance, wheel zoom, camera mode, and first-person/basket blend.
presentation service: applies fabric, basket, rope, and burner presentation updates from simulation state.
telemetry service: publishes local balloon and visual snapshots into NexusEngine resources and events.
headless editor service: exposes project.inspect, renderer.validate, project.check, project.build, and runtime.getState, but only for renderer/build contract checks today.
GameHost service: exposes engine, NexusEngine, Three, scene, renderer, camera, balloon, visual, simulation, cameraRig, local snapshot, and Nexus snapshot.
central ledger service: records selected repo, audit files, findings, validation, and next ledge.
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

`TheOpenAbove` should not start next with renderer extraction, terrain extraction, camera retuning, balloon visual changes, simulation constant retuning, or route expansion.

The runtime is already split into useful kits, and `package.json` now exposes headless editor commands. The blocker is that the headless surface validates renderer/build contracts, not source/readback facts.

`README.md` and campaign data still carry legacy free-flight terms, `src/main.js` is the current Balloon Drift source of truth, and `window.GameHost.getState()` still lacks a `.source` block.

## Next safe ledge

```txt
TheOpenAbove Headless Source Readback Catch-up + Browser Fixture Gate
```

## Validation

```txt
runtime source changed: no
branch created: no
pull request created: no
npm run check: not run
npm run build: not run
headless:status: not run
headless:check: not run
browser smoke: not run
DOM-free source fixture: not run because proof files do not exist yet
pushed to main: yes, documentation only
```
