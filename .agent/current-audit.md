# Current Audit: TheOpenAbove

**Last aligned:** `2026-07-10T14-50-38-04-00`

## Status

`TheOpenAbove` is a Vite-hosted cinematic Balloon Drift route powered by Three.js and NexusEngine main through CDN imports. The runtime already has practical simulation, object, camera, presentation, visual, telemetry, smoke-test, and headless-editor boundaries.

The current blocker is not fidelity or route scope. It is causal readback: no stable source fingerprint, normalized input result journal, shared frame ID, or consumer row correlates the work performed by simulation, camera, visual, telemetry, rendering, HUD, and GameHost.

## Active files reviewed

```txt
README.md
package.json
index.html
src/main.js
src/data/campaign.config.js
src/runtime/balloon-simulation-kit.js
src/visual/camera-presentation/balloon-camera-rig-kit.js
tools/headless-editor-environment.mjs
.agent root docs
central Publish repo ledgers
```

## Interaction loop

```txt
index.html
  -> Three.js 0.165.0
  -> NexusEngine main CDN
  -> src/main.js
       -> createVisualDomain
       -> buildHotAirBalloon
       -> createBalloonSimulation
       -> createBalloonCameraRig
       -> createBalloonPresentationDomain
       -> createBalloonTelemetryEngine
  -> keyboard events mutate simulation key Set
  -> wheel events mutate camera zoom
  -> animation frame
       -> simulation.update(dt)
       -> apply balloon transform
       -> animate object
       -> update balloon presentation
       -> update camera
       -> update visual domain
       -> tick Nexus telemetry
       -> render
       -> project HUD
  -> GameHost.getState returns latest Nexus and local snapshots
  -> headless editor performs static inspection and npm command routing
```

## Domains in use

```txt
static-browser-shell
vite-static-publish
three-importmap-runtime
nexusengine-cdn-runtime
nexus-headless-editor-environment
campaign-config
world-config
legacy-flight-config
keyboard-input
wheel-zoom-input
burner-intent
vent-intent
wind-field
buoyancy-integration
vertical-damping
ceiling-soft-limit
terrain-clearance
altitude-and-distance-state
hot-air-balloon-object
balloon-presentation
camera-follow
basket-view-blend
clipping-fade
visual-domain
quality-tier
dynamic-resolution
physical-sky
sun-light
aerial-perspective
cloud-weather-map
volumetric-clouds
streamed-terrain
vegetation-clusters
grass-detail
water-surfaces
distant-landmarks
hdr-composer
neutral-color-grade
lens-response
nexus-telemetry
hud-projection
legacy-gamehost-readback
static-smoke-contract
headless-renderer-contract
planned-source-authority
planned-input-result-journal
planned-frame-correlation-journal
planned-consumer-attribution
planned-gamehost-proof-readback
planned-dom-free-fixture
central-ledger-sync
```

## Services offered

- Route shell: canvas, HUD, error panel, import map, and live module mount.
- Configuration: campaign, region, world, sky, terrain, and legacy free-flight constants.
- Keyboard input: burner/vent key tracking and blur reset.
- Wheel input: bounded zoom mutation.
- Simulation: wind, buoyancy, venting, damping, ceiling control, terrain clearance, altitude, velocity, position, distance, and snapshots.
- Balloon object: geometry, basket, ropes, burner, envelope, transforms, and animation.
- Camera: wind-relative follow, basket-view blend, FOV, clipping fade, and camera diagnostics.
- Presentation: fabric, basket, rope, and burner animation.
- Visual domain: renderer, scene, environment, quality policy, render scale, render stats, and draw submission.
- Environment: sky, sun, atmosphere, clouds, terrain streaming, vegetation, grass, water, and landmarks.
- Post-processing: HDR composition, neutral color grade, and lens response.
- Telemetry: local snapshot publication into NexusEngine.
- HUD: projection of drift, camera, altitude, wind, exposure, quality, and engine copy.
- GameHost: live object access plus latest local/Nexus state.
- Smoke/headless: static source/renderer assertions and npm check/build command routing.
- Planned proof: source manifest/fingerprint, compatibility classification, input results, frame correlation, consumer rows, bounded readback, and deterministic fixture.

## Implemented source-backed kits

```txt
open-above-balloon-simulation-kit
open-above-balloon-telemetry-kit
open-above-hot-air-balloon-object-kit
open-above-balloon-camera-rig-kit
open-above-clipping-fade-kit
open-above-balloon-presentation-domain
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
open-above-headless-editor-environment
open-above-static-smoke-test-kit
```

## Runtime-implied kits

```txt
open-above-route-shell-kit
open-above-importmap-kit
open-above-runtime-composer-kit
open-above-keyboard-input-kit
open-above-wheel-zoom-input-kit
open-above-hud-projection-kit
open-above-error-panel-kit
open-above-gamehost-legacy-readback-kit
open-above-nexusengine-cdn-adapter-kit
```

## Next-cut kits

```txt
open-above-product-source-authority-kit
open-above-balloon-drift-config-kit
open-above-legacy-flight-compatibility-kit
open-above-source-manifest-kit
open-above-source-fingerprint-kit
open-above-source-snapshot-kit
open-above-source-acceptance-ledger-kit
open-above-source-consumer-ledger-kit
open-above-input-result-ledger-kit
open-above-frame-correlation-ledger-kit
open-above-simulation-consumer-row-kit
open-above-camera-consumer-row-kit
open-above-visual-consumer-row-kit
open-above-telemetry-consumer-row-kit
open-above-render-consumer-row-kit
open-above-hud-consumer-row-kit
open-above-gamehost-source-frame-readback-kit
open-above-headless-source-frame-fixture-kit
open-above-browser-source-frame-fixture-kit
```

## Main finding

`src/main.js` contains the only complete account of runtime ordering. Keyboard and wheel events have no normalized outcomes. The local snapshot is current-state only. Telemetry, rendering, and HUD have no consumer rows. `GameHost` has no bounded source/input/frame proof block. The headless editor validates static text and npm scripts rather than deterministic runtime rows.

## Next safe ledge

```txt
TheOpenAbove Source Input Frame Correlation Ledger + GameHost Headless Fixture Gate
```