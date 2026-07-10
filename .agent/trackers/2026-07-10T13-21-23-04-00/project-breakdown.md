# Project Breakdown: TheOpenAbove Source Result Readback Ledger

Timestamp: `2026-07-10T13-21-23-04-00`

## Selected repo

```txt
LuminaryLabs-Publish/TheOpenAbove
```

## Selection reason

The current public `LuminaryLabs-Publish` repository page was compared against central ledger recency and sampled root `.agent` state.

No checked non-Cavalry repository was new, central-ledger absent, missing root `.agent`, recently added, or otherwise undocumented.

`TheOpenAbove` was selected as the oldest eligible documented fallback after `MyCozyIsland` advanced to `2026-07-10T13-08-51-04-00`. `TheCavalryOfRome` remained excluded by rule.

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
  -> createBalloonCameraRig resolves wheel zoom, follow mode, basket blend, clipping, and diagnostics
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
wheel-zoom-input
clipping-fade
balloon-presentation
hud-telemetry
nexus-telemetry
legacy-gamehost-readback
smoke-test-contract
headless-renderer-contract
source-result-authority-next
source-fingerprint-next
source-snapshot-next
source-acceptance-ledger-next
source-consumer-ledger-next
input-result-ledger-next
gamehost-source-readback-next
headless-source-fixture-next
browser-source-fixture-next
central-ledger-sync
```

## Kit services

- Route shell service: canvas, HUD, error shell, importmap, and module route.
- Runtime composer service: `src/main.js` wires visual, object, simulation, camera, presentation, telemetry, HUD, and GameHost.
- Campaign/world config service: product/region/world constants, with legacy free-flight fields still present.
- Visual domain service: renderer, scene, camera, terrain, vegetation, grass, sky, clouds, water, composer, effects, quality policy, and render stats.
- Object kit service: balloon envelope, mouth, streamers, seams, basket, rigging, burner, and ropes.
- Simulation service: keyboard intent, wind, buoyancy, altitude, ground clearance, position, velocity, and distance.
- Camera service: wheel zoom, follow mode, basket blend, clipping, and diagnostics.
- Presentation service: fabric, basket, rope, and burner animation.
- Telemetry service: NexusEngine route telemetry from local snapshots.
- Headless editor service: project.inspect, renderer.validate, project.check, project.build, and runtime.getState.
- Smoke test service: static route and renderer contract assertions.
- GameHost service: local/Nexus readback without source proof yet.
- Next proof services: product/campaign/runtime source authority, source fingerprint, source snapshot, source acceptance ledger, source consumer ledger, input result ledger, GameHost source readback, and headless source fixture.

## Main finding

`TheOpenAbove` should not start next with renderer extraction, terrain extraction, camera retuning, balloon visual changes, simulation constant retuning, route expansion, or legacy campaign deletion.

The blocker is source result readback: `src/main.js` is the current Balloon Drift route composer, legacy free-flight fields remain in campaign config, keyboard/wheel inputs lack result rows, `GameHost` has no `.source` block, and headless checks prove renderer/build contracts rather than product/campaign/runtime source rows.

## Next safe ledge

```txt
TheOpenAbove Source Result Readback Ledger Refresh + GameHost Headless Fixture Gate
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
```
