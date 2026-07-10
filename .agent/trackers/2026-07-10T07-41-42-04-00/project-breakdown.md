# TheOpenAbove Source Readback Ledger Breakdown

Timestamp: 2026-07-10T07-41-42-04-00
Repo: LuminaryLabs-Publish/TheOpenAbove
Scope: documentation and repo-local audit refresh only.

## Selection reason

No checked non-Cavalry Publish repo was new, missing from central tracking, missing sampled root `.agent`, recently added but undocumented, or otherwise undocumented. `TheOpenAbove` was the oldest eligible documented fallback after central ledger comparison.

`TheCavalryOfRome` was excluded by standing rule.

## Current interaction loop

```txt
index.html
  -> importmap loads Three.js 0.165.0
  -> canvas#game, #hud, and #error mount
  -> ./src/main.js imports NexusEngine main CDN
  -> src/main.js imports CAMPAIGN/WORLD config
  -> createVisualDomain({ canvas, worldConfig: WORLD })
  -> buildHotAirBalloon() creates envelope, basket, ropes, burner, and rigging
  -> createBalloonSimulation({ terrainHeight, startPosition: [0, 105, 0] }) owns keyboard intent, wind, buoyancy, burner, vent, altitude, velocity, and pose application
  -> createBalloonCameraRig(...) resolves scroll zoom, follow mode, basket-view blend, and camera diagnostics
  -> createBalloonPresentationDomain(balloon) updates envelope, basket, rope, and burner presentation
  -> createBalloonTelemetryEngine(NexusEngine, getSnapshot) publishes telemetry
  -> requestAnimationFrame updates simulation, object animation, presentation, camera, visual domain, telemetry, renderer, and HUD
  -> window.GameHost.getState() returns { nexusEngine, local } only
  -> tools/headless-editor-environment.mjs validates renderer/build contracts through static source inspection and npm scripts
```

## Domains in use

- static-browser-shell
- vite-static-publish
- three-importmap-runtime
- nexusengine-cdn-runtime
- nexus-headless-editor-environment
- campaign-config
- legacy-flight-config
- world-config
- balloon-drift-simulation
- browser-keyboard-input
- burner-intent
- vent-intent
- wind-field
- buoyancy-integration
- altitude-safety
- ground-clearance
- balloon-pose-application
- hot-air-balloon-object
- balloon-envelope-panel
- balloon-mouth
- balloon-streamer-fit
- balloon-fabric-seam
- hot-air-balloon-basket
- hot-air-balloon-rigging
- hot-air-balloon-burner
- rope-object
- visual-domain
- quality-tier
- dynamic-resolution
- physical-sky
- sun-light
- aerial-perspective
- cloud-weather-map
- volumetric-clouds
- streamed-terrain-surface
- terrain-chunk-streaming
- vegetation-clusters
- grass-detail
- water-surfaces
- distant-landmarks
- hdr-composer
- neutral-exposure
- neutral-color-grade
- lens-response
- camera-rig
- basket-view-camera
- clipping-fade
- balloon-presentation
- hud-telemetry
- gamehost-readback
- smoke-test-contract
- headless-renderer-contract
- source-manifest-next
- source-fingerprint-next
- source-snapshot-next
- source-acceptance-ledger-next
- source-consumer-ledger-next
- gamehost-source-readback-next
- headless-source-fixture-next
- central-ledger-sync

## Kit services

- Route shell service mounts canvas, HUD, error shell, importmap, and module route.
- Visual domain service creates renderer, scene, camera, terrain, vegetation, grass, sky, clouds, water, composer, effects, quality policy, and render stats.
- Object kit service composes the balloon envelope, mouth, streamers, seams, basket, rigging, burner, and ropes.
- Simulation service consumes keyboard intent and integrates wind, buoyancy, altitude, ground clearance, position, velocity, and distance.
- Camera service resolves zoom, third-person follow, basket-view blend, clipping, and camera diagnostics.
- Presentation service updates fabric, basket, rope, and burner presentation from simulation state.
- Telemetry service publishes local balloon snapshots through NexusEngine.
- Headless editor service exposes project.inspect, renderer.validate, project.check, project.build, and runtime.getState.
- Smoke test service statically asserts route, renderer, neutral lighting, streamed terrain, water fog, and headless editor contracts.
- HUD service projects altitude, distance, speed, burner, vent, region, wind, quality, frame, and camera telemetry.
- GameHost service exposes local and Nexus snapshots, but not source/readback proof yet.

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

The live route is still the Balloon Drift route in `src/main.js`. The README and `campaign.config.js` still preserve older free-flight terms, and `GameHost.getState()` still has no `.source` block.

The next work is source/readback proof, not renderer extraction or visual tuning.

## Next safe ledge

```txt
TheOpenAbove Source Readback Ledger Catch-up + Headless Fixture Gate
```

## Validation status

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
```
