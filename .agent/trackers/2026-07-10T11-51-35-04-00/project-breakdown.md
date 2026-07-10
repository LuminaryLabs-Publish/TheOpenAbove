# Project breakdown: TheOpenAbove

Timestamp: `2026-07-10T11-51-35-04-00`

## Selected repo

```txt
LuminaryLabs-Publish/TheOpenAbove
```

## Selection reason

The current public `LuminaryLabs-Publish` repository list was compared against central ledger recency and sampled root `.agent` state.

No checked non-Cavalry repo was new, absent from the ledger, missing sampled root `.agent`, recently added, or otherwise undocumented.

`TheOpenAbove` was selected as the oldest eligible documented fallback after `MyCozyIsland` advanced to `2026-07-10T11-38-03-04-00`. `TheCavalryOfRome` remained excluded by rule.

## Current product read

`TheOpenAbove` is a Vite-hosted cinematic hot-air-balloon Balloon Drift route.

The live route is:

```txt
index.html
  -> Three.js 0.165.0 importmap
  -> canvas#game + #hud + #error
  -> ./src/main.js
  -> NexusEngine main CDN
  -> CAMPAIGN/WORLD config
  -> createVisualDomain
  -> buildHotAirBalloon
  -> createBalloonSimulation
  -> createBalloonCameraRig
  -> createBalloonPresentationDomain
  -> createBalloonTelemetryEngine
  -> requestAnimationFrame frame loop
  -> visual.render + HUD projection
  -> window.GameHost.getState() returns { nexusEngine, local }
  -> tools/headless-editor-environment.mjs validates static renderer/build contracts
```

## Interaction loop

```txt
page load
  -> import Three and NexusEngine
  -> mount canvas, HUD, and error panel
  -> create renderer/scene/camera/terrain/vegetation/grass/water/sky/sun/clouds/composer/quality state
  -> create balloon object and add it to the scene
  -> create simulation with keyboard listeners for burner/vent input
  -> create camera rig with wheel zoom listener and basket/third-person blend
  -> create presentation and telemetry domains
  -> frame loop computes dt
  -> simulation.update reads keys, wind, buoyancy, burner, vent, altitude, and velocity
  -> simulation.applyToBalloon mutates balloon pose
  -> animateHotAirBalloon and presentation update fabric/basket/rope/burner visuals
  -> cameraRig.update applies zoom/mode/clipping/camera pose
  -> visual.update updates weather, sun, sky, clouds, terrain, grass, water, lens, composer, and quality stats
  -> telemetry engine ticks NexusEngine
  -> visual.render renders the composed frame
  -> HUD writes aggregate local state
  -> GameHost exposes live objects plus local/Nexus aggregate state
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
source-authority-next
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

## Services the kits offer

- Route shell service: HTML canvas, HUD, error panel, importmap, and module entry.
- Runtime composer service: `src/main.js` wires visual, object, simulation, camera, presentation, telemetry, HUD, and GameHost.
- Campaign/world config service: product/region/world constants, with legacy free-flight fields still present.
- Simulation service: key state, wind, buoyancy, burner, vent, altitude, ground clearance, position, velocity, distance, and snapshot.
- Object kit service: hot-air balloon geometry, envelope, basket, rigging, burner, ropes, and pose anchors.
- Camera service: wheel zoom, basket/third-person blend, follow pose, clipping fade, and camera diagnostics.
- Presentation service: fabric, basket, rope, and burner animation.
- Visual domain service: renderer, scene, camera, terrain, vegetation, grass, water, sky, sun, clouds, composer, quality policy, and render stats.
- Telemetry service: local route snapshots into NexusEngine.
- GameHost service: legacy local/Nexus aggregate readback without source block.
- Smoke service: static route and renderer safety assertions.
- Headless editor service: project inspect, renderer validate, project check, project build, and runtime state inspection.
- Next proof services: source authority, fingerprint, snapshot, acceptance ledger, consumer ledger, input result ledger, GameHost `.source`, and DOM-free/headless source fixture.

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

## Runtime implied kits

```txt
open-above-route-shell-kit
open-above-importmap-kit
open-above-runtime-composer-kit
open-above-hud-projection-kit
open-above-error-panel-kit
open-above-keyboard-input-kit
open-above-wheel-zoom-input-kit
open-above-gamehost-legacy-readback-kit
open-above-nexusengine-cdn-adapter-kit
```

## Next-cut kits

```txt
open-above-product-copy-authority-kit
open-above-readme-route-copy-parity-kit
open-above-campaign-current-route-authority-kit
open-above-legacy-flight-compatibility-kit
open-above-balloon-drift-config-kit
open-above-source-authority-ledger-kit
open-above-source-consumer-manifest-kit
open-above-source-fingerprint-kit
open-above-source-snapshot-kit
open-above-source-acceptance-ledger-kit
open-above-source-consumer-ledger-kit
open-above-input-result-ledger-kit
open-above-gamehost-source-readback-kit
open-above-headless-source-fixture-kit
open-above-browser-source-fixture-kit
```

## Main finding

`TheOpenAbove` should not start next with renderer extraction, terrain extraction, camera retuning, balloon visual changes, simulation constant retuning, route expansion, or legacy campaign deletion.

The blocker is source authority and readback proof. `src/main.js` is the current Balloon Drift route composer, `src/data/campaign.config.js` still preserves older free-flight/thermal/gate/perch fields, `GameHost` exposes no `.source` block, keyboard and wheel inputs have no result ledger, and headless checks prove renderer/build contracts rather than product/campaign/runtime source rows.

## Next safe ledge

```txt
TheOpenAbove Source Authority Readback Ledger Refresh + GameHost Headless Fixture Gate
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
