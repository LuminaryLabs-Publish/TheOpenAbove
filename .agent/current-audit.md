# Current Audit: TheOpenAbove

**Last aligned:** `2026-07-10T10-29-57-04-00`

## Status

`TheOpenAbove` is a Vite-hosted cinematic Balloon Drift route. The useful runtime split is already present across visual, object, simulation, camera, presentation, telemetry, smoke-test, and headless editor kits.

The blocker is source fixture and GameHost readback proof, not visuals.

## Active files read

```txt
package.json
index.html
README.md
src/main.js
src/data/campaign.config.js
tools/headless-editor-environment.mjs
tests/smoke.mjs
.agent root docs
```

## Current interaction loop

```txt
index.html
  -> importmap loads Three.js 0.165.0
  -> canvas#game, #hud, and #error mount
  -> ./src/main.js imports NexusEngine main CDN
  -> src/main.js imports CAMPAIGN/WORLD config
  -> createVisualDomain creates renderer, scene, camera, terrain, vegetation, grass, water, sky, sun, clouds, composer, quality, and render stats
  -> buildHotAirBalloon creates the route object
  -> createBalloonSimulation owns keyboard listeners, wind, buoyancy, burner, vent, altitude, velocity, and pose application
  -> createBalloonCameraRig resolves zoom, follow mode, basket blend, clipping, and diagnostics
  -> createBalloonPresentationDomain updates fabric, basket, rope, and burner presentation
  -> createBalloonTelemetryEngine publishes local snapshots into NexusEngine
  -> requestAnimationFrame updates simulation, object animation, presentation, camera, visual domain, telemetry, renderer, and HUD
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
keyboard-input
burner-intent
vent-intent
wind-field
buoyancy-integration
altitude-safety
ground-clearance
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

## Kit services

- Route shell service: canvas, HUD, error shell, importmap, and module route.
- Visual domain service: renderer, scene, camera, terrain, vegetation, grass, sky, clouds, water, composer, effects, quality policy, and render stats.
- Object kit service: balloon envelope, mouth, streamers, seams, basket, rigging, burner, and ropes.
- Simulation service: keyboard intent, wind, buoyancy, altitude, ground clearance, position, velocity, and distance.
- Camera service: zoom, follow mode, basket blend, clipping, and diagnostics.
- Presentation service: fabric, basket, rope, and burner animation.
- Telemetry service: NexusEngine route telemetry from local snapshots.
- Headless editor service: project.inspect, renderer.validate, project.check, project.build, and runtime.getState.
- Smoke test service: static route and renderer contract assertions.
- GameHost service: local/Nexus readback without source proof yet.
- Next proof services: product/campaign/runtime source manifest, source fingerprint, source snapshot, source acceptance ledger, source consumer ledger, GameHost source readback, and headless source fixture.

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
open-above-hot-air-balloon-object-kit
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
```

## Main finding

Do not start next with renderer extraction, terrain extraction, camera retuning, balloon visual changes, simulation constant retuning, route expansion, or legacy campaign deletion.

The next work is source fixture and GameHost readback proof that reconciles README legacy copy, campaign legacy fields, `src/main.js` as current route composer, smoke/headless checks, and `GameHost` diagnostics.

## Next safe ledge

```txt
TheOpenAbove Source Fixture Consumer Ledger Refresh + GameHost Headless Gate
```
