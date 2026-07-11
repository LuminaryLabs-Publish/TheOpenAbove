# Project Breakdown: TheOpenAbove

**Timestamp:** `2026-07-11T14-50-59-04-00`

**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

**Branch:** `main`

## Summary

This pass selected `TheOpenAbove` after comparing all ten accessible Publish repositories against the nine central ledger entries and root `.agent` coverage. No new, ledger-missing or root-undocumented eligible repository existed; `TheOpenAbove` was the oldest current central entry.

The audit maps the full Air Mail interaction loop, all active domains, all implemented kits and offered services, then isolates the missing committed-observation boundary. The current loop publishes Nexus telemetry before rendering and HUD projection, while renderer statistics and dynamic-resolution state are finalized afterward.

## Plan ledger

**Goal:** make one immutable observation receipt the only public proof that simulation, delivery, render, HUD, telemetry and external readback agree.

- [x] List all accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Compare eligible repositories with `LuminaryLabs-Dev/LuminaryLabs`.
- [x] Confirm all nine eligible repositories have root `.agent` state.
- [x] Select only `TheOpenAbove`.
- [x] Read current root audit state and latest product-acceptance audit.
- [x] Read runtime composition, telemetry, visual and mail-delivery sources.
- [x] Identify the interaction loop.
- [x] Identify all domains in use.
- [x] Identify all implemented kits.
- [x] Identify all services offered by those kits.
- [x] Trace mutable state through telemetry, rendering, HUD and GameHost.
- [x] Define the committed-observation DSK and fixture gate.
- [x] Refresh all required root `.agent` files.
- [x] Add timestamped architecture, render, gameplay, interaction, observation and deploy audits.
- [x] Push directly to `main`.
- [x] Create no branch or pull request.

## Selection comparison

```txt
TheOpenAbove       selected / 2026-07-11T13-10-35-04-00
HorrorCorridor     tracked  / 2026-07-11T13-20-45-04-00
PhantomCommand     tracked  / 2026-07-11T13-28-37-04-00
ZombieOrchard      tracked  / 2026-07-11T13-41-23-04-00
TheUnmappedHouse   tracked  / 2026-07-11T13-49-30-04-00
AetherVale         tracked  / 2026-07-11T14-00-01-04-00
IntoTheMeadow      tracked  / 2026-07-11T14-08-51-04-00
PrehistoricRush    tracked  / 2026-07-11T14-31-27-04-00
MyCozyIsland       tracked  / 2026-07-11T14-41-28-04-00
TheCavalryOfRome   excluded
```

Accessible Publish inventory:

```txt
AetherVale
HorrorCorridor
IntoTheMeadow
MyCozyIsland
PhantomCommand
PrehistoricRush
TheCavalryOfRome
TheOpenAbove
TheUnmappedHouse
ZombieOrchard
```

## Interaction loop

```txt
static route and ESM resolution
  -> construct visual domain
  -> construct balloon mesh and presentation
  -> construct airstream and mail domains
  -> construct simulation and camera
  -> construct Nexus telemetry runtime
  -> install input and expose GameHost

each browser frame
  -> derive clamped variable dt
  -> update simulation
  -> update mail and possibly emit delivery event
  -> update airstream
  -> apply/animate balloon
  -> update presentation and camera
  -> update visual plan
  -> publish telemetry
  -> render and sample dynamic resolution
  -> update renderer statistics
  -> update HUD
  -> request next frame
```

## Domains in use

```txt
browser shell and Vite deployment
Three.js and mutable NexusEngine CDN admission
campaign/world and legacy product source
active Air Mail route and mission source
keyboard blur wheel and RAF time
balloon physics terrain clearance and snapshot state
airstream route sampler field force visual debug and disposal
mail parcel route town delivery volume progress reset and disposal
camera follow zoom clipping and balloon presentation
procedural balloon geometry rigging burner rope and materials
quality and dynamic resolution
sky sun aerial perspective weather and volumetric clouds
near and horizon terrain vegetation grass water and landmarks
HDR composer color grading lens response and renderer statistics
Nexus telemetry resources events and clock
HUD error panel GameHost and headless readback
runtime lifecycle source smoke pure tests build and Pages deployment
product acceptance mission restart and committed observation authority
```

## Implemented kit inventory

### Runtime and gameplay: 15

```txt
open-above-balloon-simulation-kit
open-above-balloon-telemetry-kit
open-above-airstream-domain
open-above-airstream-route-kit
open-above-airstream-sampler-kit
open-above-airstream-field-kit
open-above-airstream-balloon-force-kit
open-above-airstream-visual-kit
open-above-airstream-debug-kit
open-above-mail-delivery-domain
open-above-mail-parcel-kit
open-above-mail-route-kit
open-above-delivery-volume-kit
open-above-delivery-progress-kit
open-above-mail-town-kit
```

### Balloon object and presentation: 14

```txt
open-above-hot-air-balloon-object-kit
open-above-balloon-envelope-panel-kit
open-above-balloon-mouth-kit
open-above-balloon-streamer-fit-kit
open-above-balloon-fabric-seam-kit
open-above-hot-air-balloon-basket-kit
open-above-hot-air-balloon-rigging-kit
open-above-hot-air-balloon-burner-kit
open-above-rope-kit
open-above-balloon-presentation-domain
open-above-envelope-fabric-material-kit
open-above-basket-material-kit
open-above-balloon-camera-rig-kit
open-above-clipping-fade-kit
```

### Visual environment: 26

```txt
open-above-visual-domain
open-above-quality-tier-kit
open-above-dynamic-resolution-kit
open-above-physical-sky-kit
open-above-sun-light-kit
open-above-aerial-perspective-kit
open-above-cloud-weather-map-kit
open-above-volumetric-cloud-kit
open-above-cloud-lod-kit
open-above-cloud-lighting-kit
open-above-terrain-surface-kit
open-above-terrain-chunk-streaming-kit
open-above-terrain-horizon-streaming-kit
open-above-vegetation-cluster-kit
open-above-grass-world-seed-kit
open-above-grass-biome-density-kit
open-above-grass-exclusion-mask-kit
open-above-grass-chunk-placement-kit
open-above-grass-lod-kit
open-above-grass-compute-culling-kit
open-above-grass-field-domain
open-above-water-surface-kit
open-above-distant-landmark-kit
open-above-hdr-composer-kit
open-above-color-grade-kit
open-above-lens-response-kit
```

### Tooling and proof: 3

```txt
open-above-headless-editor-environment
open-above-static-smoke-test-kit
open-above-airstream-mail-test-kit
```

### Runtime-implied adapters: 12

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
open-above-campaign-source-kit
open-above-raf-clock-adapter-kit
open-above-pages-deploy-kit
```

### Inactive legacy kits: 11

```txt
open-above-hot-air-balloon-envelope-kit
open-above-grass-detail-kit
open-above-bloom-kit
open-above-god-ray-kit
open-above-auto-exposure-kit
open-above-bird-camera-kit
open-above-bird-posture-kit
open-above-bird-dive-domain-kit
open-above-bird-flight-frame-kit
open-above-bird-flight-input-kit
open-above-bird-flight-physics-kit
```

## Services offered

```txt
input polling and burner/vent/wheel control
balloon simulation integration terrain clearance state snapshots and mesh projection
airstream route validation nearest-segment sampling field blending force adaptation visuals and diagnostics
parcel construction reset route source town visuals delivery-volume admission and one-shot delivery events
procedural balloon geometry envelope basket rigging burner rope materials and animation
camera follow basket blend zoom clipping and disposal
quality detection dynamic-resolution control and resize
sky sun atmosphere weather cloud terrain vegetation grass water landmark and HDR composition
render submission renderer statistics and postprocess state
Nexus resources events telemetry state and clock projection
HUD error GameHost and headless observation
source checks pure tests Vite build and Pages deployment
```

## Main finding

`engine.tick(dt)` runs before `visual.render(dt, frameMs)` and `updateHud()`. Telemetry reads `visualState` before the renderer updates draw-call and triangle counters and before dynamic-resolution sampling. The same published snapshot can therefore mix current simulation/delivery fields with prior rendered observations.

`GameHost` publishes mutable subsystem objects and no stable observation receipt. There is no common identity spanning the browser RAF, Nexus clock frame, delivery event, renderer frame, HUD text or external readback.

## Required parent DSK

```txt
open-above-committed-observation-frame-authority-domain
```

Required kits:

```txt
open-above-runtime-session-observation-id-kit
open-above-simulation-tick-receipt-kit
open-above-delivery-result-kit
open-above-render-frame-id-kit
open-above-render-frame-plan-kit
open-above-render-submission-result-kit
open-above-effective-quality-result-kit
open-above-hud-projection-ack-kit
open-above-telemetry-publication-barrier-kit
open-above-frame-consumer-ack-kit
open-above-committed-observation-kit
open-above-observation-fingerprint-kit
open-above-detached-gamehost-read-model-kit
open-above-observation-journal-kit
open-above-observation-frame-fixture-kit
```

## Validation boundary

Documentation only. Runtime code, dependencies, package scripts, routes, rendering behavior and deployment configuration were not changed. No Node, browser, GPU or Pages command was run.
