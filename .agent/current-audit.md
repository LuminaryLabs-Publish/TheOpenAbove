# Current Audit: TheOpenAbove

**Last aligned:** `2026-07-10T02-38-56-04-00`

## Status

`TheOpenAbove` is a browser-hosted cinematic Balloon Drift route built from local runtime, visual, object, camera, presentation, and telemetry kits.

The route now also has package-level Nexus headless editor commands.

The route is not blocked on visual modularity. It is blocked on source/readback proof, especially connecting product/campaign/runtime source to GameHost and headless fixture rows.

## Active files read for this audit

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

## Current services

```txt
route shell service: mounts canvas, HUD, error shell, importmap, and module route.
visual domain service: creates renderer, scene, camera, terrain, vegetation, sky, clouds, water, composer, effects, quality policy, and render stats.
object kit service: composes the hot-air balloon envelope, mouth, streamers, seams, basket, rigging, burner, and rope.
simulation service: consumes keyboard intent and integrates wind, buoyancy, altitude, ground clearance, position, velocity, and distance.
camera service: resolves wheel zoom, third-person follow, basket-view blend, clipping, and camera diagnostics.
presentation service: updates fabric, basket, rope, and burner presentation based on simulation and visual conditions.
telemetry service: publishes local balloon snapshots through NexusEngine and exposes route telemetry.
headless editor service: exposes project.inspect, renderer.validate, project.check, project.build, and runtime.getState for renderer/build contract checks.
HUD service: projects altitude, distance, speed, burner, vent, region, wind, quality, frame, and camera telemetry into DOM text.
GameHost service: exposes local and Nexus snapshots, but not source/readback proof yet.
central ledger service: records repo-local docs, selected ledge, findings, validation, and pushed commits.
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

The runtime is already kit-split enough to avoid a visual rewrite.

The next work is source/readback proof that reconciles product copy, legacy campaign fields, current route composition, headless editor checks, browser consumer state, and `GameHost` diagnostics.

## Next safe ledge

```txt
TheOpenAbove Headless Source Readback Catch-up + Browser Fixture Gate
```
