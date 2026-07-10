# Project Breakdown — TheOpenAbove

**Timestamp:** `2026-07-09T23-51-04-04-00`

## Selection

`LuminaryLabs-Publish/TheOpenAbove` was selected after comparing the current public `LuminaryLabs-Publish` repository list against the central `LuminaryLabs-Dev/LuminaryLabs` repo ledger and sampled root `.agent` state.

No checked non-Cavalry repo was new, absent from the central ledger, missing sampled root `.agent`, recently added but undocumented, or otherwise undocumented.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by rule.

`TheOpenAbove` was the oldest eligible documented fallback at selection time, with the central ledger still at `2026-07-09T19-21-19-04-00`.

## Publish repos observed

```txt
LuminaryLabs-Publish/MyCozyIsland         tracked / root .agent present / central latest 2026-07-09T23-41-15-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-09T23-28-35-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest 2026-07-09T23-20-43-04-00
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central latest 2026-07-09T23-02-05-04-00
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest 2026-07-09T22-50-53-04-00
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-09T19-29-23-04-00
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest 2026-07-09T22-40-25-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/TheOpenAbove         selected / oldest eligible central ledger / central latest 2026-07-09T19-21-19-04-00
```

## Current product read

`TheOpenAbove` is now a Vite / Three.js cinematic hot-air-balloon Balloon Drift route.

The live route is no longer a single inline terrain and camera runtime. `src/main.js` now composes multiple source-backed runtime kits:

```txt
index.html
  -> src/main.js
  -> Three.js 0.165.0 CDN
  -> NexusEngine main CDN
  -> CAMPAIGN / WORLD config
  -> createVisualDomain({ canvas, worldConfig })
  -> buildHotAirBalloon()
  -> createBalloonSimulation({ terrainHeight, startPosition })
  -> createBalloonCameraRig(...)
  -> createBalloonPresentationDomain(balloon)
  -> createBalloonTelemetryEngine(NexusEngine, getSnapshot)
  -> requestAnimationFrame(frame)
```

## Interaction loop

```txt
open index.html
  -> canvas, HUD, and error panel mount
  -> src/main.js imports Three.js, NexusEngine, campaign config, balloon object kit, simulation kit, telemetry kit, visual domain, camera rig, and presentation domain
  -> createVisualDomain creates scene, camera, renderer, quality tier, terrain, vegetation, grass, distant landmarks, weather map, sun, physical sky, volumetric clouds, aerial perspective, cloud shadows, water, lens response, HDR composer, and dynamic resolution
  -> buildHotAirBalloon composes envelope, mouth, streamers, seams, basket, rigging, burner, and rope sub-kits
  -> createBalloonSimulation installs keydown, keyup, and blur consumers for burner and vent intent
  -> createBalloonCameraRig installs wheel camera zoom and derives third-person/basket-view blend
  -> createBalloonPresentationDomain installs envelope, basket, rope, and burner materials/illumination
  -> frame clamps dt, updates simulation, applies balloon pose, animates balloon sub-kits, updates presentation, camera rig, visual domain, Nexus telemetry, renderer, and HUD
  -> getSnapshot returns balloon, camera, and visual telemetry
  -> window.GameHost exposes engine, NexusEngine, THREE, scene, renderer, camera, balloon, visual, simulation, cameraRig, and getState()
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
repo-local-agent-ledger
central-ledger-sync
source-readback-next
browser-consumer-fixture-next
```

## Services that kits offer

```txt
open-above-balloon-simulation-kit:
  keyboard lifecycle, burner/vent easing, wind layer calculation, buoyancy, damping, ceiling softness, ground clearance, velocity/position integration, balloon pose application, snapshot, dispose

open-above-balloon-telemetry-kit:
  Nexus resource definitions, BalloonTicked event, simulate phase system, engine.openAbove.getState(), engine.openAbove.getVisualState()

open-above-visual-domain:
  quality detection, renderer/camera/scene creation, terrain/vegetation/grass/water/landmark creation, sky/sun/cloud/fog/shadow updates, HDR composer, dynamic resolution, render stats, dispose

open-above-balloon-camera-rig-kit:
  wheel zoom, third-person camera, basket-view blend, ride bob/sway, burner vibration, clipping fade, camera state snapshot

open-above-balloon-presentation-domain:
  envelope fabric material, basket material, rope material, burner illumination, presentation update

open-above-hot-air-balloon-object-kit:
  procedural balloon assembly, object subdomain metadata, compatibility attachment, burner/rigging animation, browser global object-kit exposure
```

## Kits identified

Current explicit kits:

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

Next-cut proof kits:

```txt
open-above-product-copy-authority-kit
open-above-readme-route-copy-parity-kit
open-above-campaign-current-route-authority-kit
open-above-legacy-flight-compatibility-kit
open-above-balloon-source-fingerprint-kit
open-above-simulation-source-snapshot-kit
open-above-visual-domain-source-snapshot-kit
open-above-camera-source-snapshot-kit
open-above-presentation-source-snapshot-kit
open-above-source-acceptance-ledger-kit
open-above-source-consumer-ledger-kit
open-above-gamehost-source-readback-kit
open-above-browser-consumer-fixture-kit
open-above-central-ledger-sync-kit
```

## Main finding

The next implementation should not extract visuals or retune the route. The live runtime has already been split into simulation, telemetry, visual-domain, camera-rig, and presentation-domain kits.

The blocker is now source/readback proof:

```txt
README.md still describes older carving/gliding/free-flight controls.
src/data/campaign.config.js still carries thermal/gate/perch/start-speed/FLIGHT legacy fields.
package.json is now aligned to the hot-air-balloon route and exposes check/build scripts.
window.GameHost.getState() exposes local and nexusEngine snapshots but not source proof.
tests/smoke.mjs checks the cinematic visual-domain route but not source parity rows.
```

## Next safe ledge

```txt
TheOpenAbove Visual Domain Source Readback + Browser Fixture Gate
```

## Validation

Documentation-only. Runtime source did not change. No branch or PR was created. Local `npm run check`, `npm run build`, browser smoke, and source fixtures were not run.
