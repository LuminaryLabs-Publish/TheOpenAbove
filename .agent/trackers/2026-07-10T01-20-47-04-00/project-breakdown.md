# TheOpenAbove Project Breakdown

**Timestamp:** `2026-07-10T01-20-47-04-00`

**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

**Branch:** `main`

**Mode:** documentation-only repo breakdown

## Selection

`TheOpenAbove` was selected after comparing the current public `LuminaryLabs-Publish` repository list against central tracking in `LuminaryLabs-Dev/LuminaryLabs`.

No checked non-Cavalry repository was new, missing from central tracking, missing sampled root `.agent` state, recently added but undocumented, or otherwise undocumented.

`LuminaryLabs-Publish/TheCavalryOfRome` remained excluded.

`TheOpenAbove` was the oldest eligible documented fallback at the start of this run.

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

## Domains in use

```txt
static-browser-shell
vite-static-publish
three-importmap-runtime
nexusengine-cdn-runtime
campaign-config
legacy-flight-config
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
bloom
god-rays
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
source-consumer-readback-next
dom-free-source-fixture-next
central-ledger-sync
```

## Kit services

```txt
route shell service: index.html loads importmap, HUD nodes, canvas, and ./src/main.js.
visual domain service: creates renderer, scene, camera, terrain, vegetation, sky, clouds, water, composer, effects, quality policy, and render stats.
object kit service: composes the hot-air balloon envelope, mouth, streamers, seams, basket, rigging, burner, and rope.
simulation service: consumes keyboard intent and integrates wind, buoyancy, altitude, ground clearance, position, velocity, and distance.
camera service: resolves wheel zoom, third-person follow, basket-view blend, clipping fade, and camera diagnostics.
presentation service: updates fabric, basket, rope, and burner presentation based on simulation and visual conditions.
telemetry service: publishes local balloon snapshots through NexusEngine and exposes route telemetry.
HUD service: projects altitude, distance, speed, burner, vent, region, wind, quality, frame, and camera telemetry into DOM text.
GameHost service: exposes local and Nexus snapshots, but not source/readback proof yet.
source-readback service next: should expose product copy parity, campaign/runtime source manifest, source fingerprint, source snapshot, source acceptance rows, and fixture rows.
central-ledger service: records repo-local docs, selected ledge, findings, validation, and pushed commits.
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
open-above-browser-consumer-fixture-kit
open-above-central-ledger-sync-kit
```

## Main finding

`TheOpenAbove` is already split into dedicated runtime kits for simulation, telemetry, visual domain, camera rig, presentation domain, and balloon object composition.

The next implementation should not start with renderer extraction, visual-domain rewrite, camera retuning, balloon visual changes, simulation constant retuning, or route expansion.

The durable blocker is source/readback proof: README copy still carries older free-flight wording, campaign config still contains legacy FLIGHT/thermal/gate/perch fields, `src/main.js` is the actual route composer, `window.GameHost.getState()` has no `.source`, and there is no DOM-free source consumer fixture.

## Next safe ledge

```txt
TheOpenAbove Source Consumer GameHost Readback Catch-up + Browser Fixture Gate
```

## Validation

```txt
runtime source changed: no
branch created: no
pull request created: no
npm run check: not run
npm run build: not run
browser smoke: not run
DOM-free source fixture: not run because proof files do not exist yet
pushed to main: yes, documentation only
```
