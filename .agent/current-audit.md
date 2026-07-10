# Current Audit: TheOpenAbove

**Last aligned:** `2026-07-10T06-08-36-04-00`

## Status

`TheOpenAbove` is a Vite-hosted cinematic Balloon Drift route powered by local runtime, visual, object, camera, presentation, and telemetry kits.

It has package-level smoke/build scripts and Nexus headless editor commands.

The route is not blocked on visual modularity. It is blocked on source/readback proof, especially connecting product/campaign/runtime source to `GameHost` and headless fixture rows.

## Active files read for this audit

```txt
package.json
index.html
README.md
src/main.js
src/data/campaign.config.js
src/runtime/balloon-simulation-kit.js
src/visual/visual-domain.js
tools/headless-editor-environment.mjs
tests/smoke.mjs
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

## Current services

```txt
route shell service: mounts canvas, HUD, error shell, importmap, and module route.
visual domain service: creates renderer, scene, camera, terrain, vegetation, grass, sky, clouds, water, composer, effects, quality policy, and render stats.
object kit service: composes the hot-air balloon envelope, mouth, streamers, seams, basket, rigging, burner, and ropes.
simulation service: consumes keyboard intent and integrates wind, buoyancy, altitude, ground clearance, position, velocity, and distance.
camera service: resolves zoom, third-person follow, basket-view blend, clipping, and camera diagnostics.
presentation service: updates fabric, basket, rope, and burner presentation based on simulation and visual conditions.
telemetry service: publishes local balloon snapshots through NexusEngine and exposes route telemetry.
headless editor service: exposes project.inspect, renderer.validate, project.check, project.build, and runtime.getState for renderer/build contract checks.
smoke test service: statically asserts route, renderer, neutral lighting, streamed terrain, water fog, and headless editor contracts.
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

The runtime is already kit-split enough to avoid a visual rewrite.

The next work is source/readback proof that reconciles product copy, legacy campaign fields, current route composition, headless editor checks, browser consumer state, and `GameHost` diagnostics.

## Next safe ledge

```txt
TheOpenAbove Source Fixture Ledger Refresh + GameHost Headless Gate
```
