# Architecture Audit: Headless Source Readback DSK Map

**Timestamp:** `2026-07-10T02-38-56-04-00`

## Current DSK shape

`TheOpenAbove` is no longer a single monolithic route. The active route composes clear kits:

```txt
Browser shell
  -> src/main.js route composer
  -> visual-domain
  -> hot-air-balloon-object-kit
  -> balloon-simulation-kit
  -> balloon-camera-rig-kit
  -> balloon-presentation-domain
  -> balloon-telemetry-kit
  -> GameHost readback
  -> headless editor environment
```

## Domain map

```txt
route domain:
  index.html
  importmap
  src/main.js

source config domain:
  src/data/campaign.config.js
  CAMPAIGN
  WORLD
  legacy FLIGHT

simulation domain:
  src/runtime/balloon-simulation-kit.js
  keyboard listeners
  burner/vent intent
  wind field
  buoyancy integration
  altitude and ground safety
  position/velocity/distance snapshot

telemetry domain:
  src/runtime/balloon-telemetry-kit.js
  NexusEngine resources
  balloon tick event
  visual snapshot resource

visual domain:
  src/visual/visual-domain.js
  renderer
  scene
  camera
  terrain
  vegetation
  grass
  water
  sky
  clouds
  post-processing
  quality and dynamic resolution

object domain:
  src/hot-air-balloon-object-kit.js
  envelope
  mouth
  streamers
  seams
  basket
  rigging
  burner
  rope

camera/presentation domain:
  camera rig
  clipping fade
  basket view
  balloon presentation
  material response

headless editor domain:
  tools/headless-editor-environment.mjs
  project.inspect
  renderer.validate
  project.check
  project.build
  runtime.getState

readback domain:
  window.GameHost.getState()
  local snapshot
  nexusEngine snapshot
  missing source block
```

## Services offered by kits

```txt
route shell service: canvas, HUD, error panel, importmap, module entry.
source config service: campaign/world/legacy flight data, but not classified yet.
simulation service: deterministic-ish browser simulation state, keyboard intent, and snapshot output.
telemetry service: NexusEngine resource/event projection for balloon and visual snapshots.
visual service: scene construction, render updates, dynamic resolution, and render stats.
object service: procedural hot-air-balloon visual composition and animation.
camera service: follow, zoom, basket-view blend, and camera context.
presentation service: visual-only balloon material and rig updates.
headless service: renderer/build contract checks through Nexus editor environment.
GameHost service: browser runtime readback for local and Nexus snapshots.
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

## Gap

The headless editor environment is useful but not yet source-aware.

It checks required renderer files, independent depth targets, water fog configuration, `npm run check`, and `npm run build`.

It does not yet prove:

```txt
canonical product source
current Balloon Drift route source
legacy free-flight field classification
source fingerprint
source snapshot
source acceptance rows
GameHost source projection
source fixture rows
```

## Next DSK cut

```txt
open-above-source-consumer-manifest-kit
open-above-source-fingerprint-kit
open-above-source-snapshot-kit
open-above-source-acceptance-ledger-kit
open-above-gamehost-source-readback-kit
open-above-headless-source-fixture-kit
```
