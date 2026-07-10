# Architecture Audit — Visual Domain Source Readback DSK Map

**Timestamp:** `2026-07-09T23-51-04-04-00`

## Current route

```txt
index.html
  -> src/main.js
  -> createVisualDomain
  -> buildHotAirBalloon
  -> createBalloonSimulation
  -> createBalloonCameraRig
  -> createBalloonPresentationDomain
  -> createBalloonTelemetryEngine
  -> requestAnimationFrame(frame)
```

## DSK read

The runtime is now meaningfully DSK-shaped.

```txt
simulation DSK:
  src/runtime/balloon-simulation-kit.js
  owns burner/vent input, wind, buoyancy, altitude safety, ground clearance, pose application, snapshot, dispose

telemetry DSK:
  src/runtime/balloon-telemetry-kit.js
  owns Nexus resources/events, simulate system, engine.openAbove readback

visual-domain DSK:
  src/visual/visual-domain.js
  owns renderer/camera/scene, quality tier, terrain, vegetation, grass, water, sky, sun, volumetric clouds, aerial perspective, cloud shadows, HDR composer, dynamic resolution, render stats

camera DSK:
  src/visual/camera-presentation/balloon-camera-rig-kit.js
  owns wheel zoom, third-person/basket-view blend, rider eye, clipping fade, camera state

presentation DSK:
  src/visual/balloon-presentation/balloon-presentation-domain.js
  owns envelope, basket, rope, and burner material/illumination installation and update

object DSK:
  src/hot-air-balloon-object-kit.js
  owns procedural balloon assembly and subdomain metadata
```

## Domains

```txt
static-browser-shell
vite-static-publish
three-cdn-runtime
nexusengine-main-cdn
campaign-config
world-config
legacy-flight-compatibility
balloon-simulation
browser-keyboard-input
burner-intent
vent-intent
wind-field
vertical-motion
altitude-safety
ground-clearance
balloon-pose-application
hot-air-balloon-object
balloon-subkit-metadata
visual-domain
quality-tier
dynamic-resolution
terrain-surface
vegetation-cluster
grass-detail
water-surface
distant-landmark
cloud-weather-map
volumetric-cloud
physical-sky
sun-light
aerial-perspective
cloud-shadow
hdr-composer
auto-exposure
god-ray
bloom
color-grade
lens-response
camera-rig
clipping-fade
balloon-presentation
hud-telemetry
gamehost-readback
smoke-validation
source-readback-next
central-ledger-sync
```

## Boundary finding

Do not start by extracting the visual-domain, camera, presentation, simulation, or telemetry paths. They are already separate enough for the next proof layer.

The next boundary should add source/readback contracts across product copy, campaign compatibility, runtime kit snapshots, `GameHost.getState().source`, and DOM-free source fixture rows.

## Next source targets

```txt
src/source/open-above-product.js
src/source/balloon-drift.config.js
src/source/legacy-flight-compatibility.js
src/source/source-consumer-manifest.js
src/source/source-fingerprint.js
src/source/source-snapshot.js
src/source/source-acceptance.js
src/source/source-consumer-ledger.js
src/source/gamehost-source-readback.js
scripts/open-above-source-fixture.mjs
```
