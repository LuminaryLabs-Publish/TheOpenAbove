# Current Audit — TheOpenAbove

**Timestamp:** `2026-07-09T23-51-04-04-00`

## Summary

`TheOpenAbove` is a live cinematic Balloon Drift route. The runtime is now split into dedicated simulation, telemetry, visual-domain, camera-rig, balloon-presentation, and object-composition kits.

The unresolved work is source/readback proof. The next implementation should not start with visual extraction or route retuning. It should add source authority, source snapshots, acceptance rows, `GameHost.getState().source`, and a DOM-free source fixture.

## Current route

```txt
index.html
  -> src/main.js
  -> Three.js CDN
  -> NexusEngine main CDN
  -> src/data/campaign.config.js
  -> src/runtime/balloon-simulation-kit.js
  -> src/runtime/balloon-telemetry-kit.js
  -> src/visual/visual-domain.js
  -> src/visual/camera-presentation/balloon-camera-rig-kit.js
  -> src/visual/balloon-presentation/balloon-presentation-domain.js
  -> src/hot-air-balloon-object-kit.js
  -> window.GameHost.getState()
```

## Interaction loop

```txt
open app
  -> canvas, HUD, and error panel mount
  -> createGame()
  -> createVisualDomain({ canvas, worldConfig: WORLD })
  -> buildHotAirBalloon()
  -> createBalloonSimulation({ terrainHeight, startPosition })
  -> createBalloonCameraRig(visual.camera, balloon)
  -> createBalloonPresentationDomain(balloon)
  -> createBalloonTelemetryEngine(NexusEngine, getSnapshot)
  -> frame(dt)
  -> simulation.update(dt)
  -> simulation.applyToBalloon(balloon)
  -> animateHotAirBalloon(balloon, now, state.burner)
  -> balloonPresentation.update(state.elapsed, state.burner)
  -> cameraRig.update(dt, state)
  -> visual.update({ dt, elapsed, flightState, cameraContext })
  -> engine.tick(dt)
  -> visual.render(dt, frameMs)
  -> updateHud()
```

## Domains in use

```txt
static-browser-shell
vite-static-publish
three-cdn-runtime
nexusengine-realtime-telemetry
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
smoke-validation
source-readback-next
central-ledger-sync
```

## Kit services in use

```txt
open-above-balloon-simulation-kit:
  keyboard lifecycle, burner/vent easing, wind layer calculation, buoyancy, damping, ceiling softness, ground clearance, velocity/position integration, balloon pose application, snapshot, dispose

open-above-balloon-telemetry-kit:
  Nexus resources, BalloonTicked event, simulate system, engine.openAbove.getState(), engine.openAbove.getVisualState()

open-above-visual-domain:
  renderer/camera/scene creation, quality tier, terrain/vegetation/grass/water/landmarks, sky/sun/cloud/fog/shadow updates, HDR composer, dynamic resolution, render stats

open-above-balloon-camera-rig-kit:
  wheel zoom, third-person camera, basket-view blend, ride bob/sway, burner vibration, clipping fade, camera state

open-above-balloon-presentation-domain:
  envelope fabric material, basket material, rope material, burner illumination, presentation update

open-above-hot-air-balloon-object-kit:
  procedural balloon assembly, object subdomain metadata, compatibility attachment, burner/rigging animation, browser global exposure
```

## Kits identified

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

## Main finding

`package.json` has caught up to the hot-air-balloon route and now exposes `check`/`build`. `README.md` and `src/data/campaign.config.js` still preserve older free-flight/mission language and compatibility fields. `GameHost` still exposes local and Nexus snapshots only; it does not expose source proof.

## Next safe ledge

```txt
TheOpenAbove Visual Domain Source Readback + Browser Fixture Gate
```
