# Project Breakdown: TheOpenAbove Product Acceptance Contract

**Timestamp:** `2026-07-11T13-10-35-04-00`

## Plan ledger

**Goal:** reconcile the shipped Air Mail balloon product with repository guidance, controls, objectives, smoke checks and deployment acceptance evidence.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm nine eligible ledger entries and nine root `.agent` folders.
- [x] Select only `TheOpenAbove` as the oldest eligible central-ledger entry.
- [x] Read repository guidance, runtime, input, HUD, package scripts and smoke tests.
- [x] Identify the interaction loop.
- [x] Identify every active domain.
- [x] Inventory all source-backed, implied and inactive legacy kits.
- [x] Map the services offered by each kit group.
- [x] Define the missing acceptance authority and fixture gate.
- [x] Change documentation only.

## Selection comparison

```txt
TheOpenAbove       selected / 2026-07-11T11-31-06-04-00
HorrorCorridor     tracked  / 2026-07-11T11-39-11-04-00
PhantomCommand     tracked  / 2026-07-11T11-51-06-04-00
ZombieOrchard      tracked  / 2026-07-11T12-01-38-04-00
TheUnmappedHouse   tracked  / 2026-07-11T12-08-47-04-00
AetherVale         tracked  / 2026-07-11T12-18-42-04-00
IntoTheMeadow      tracked  / 2026-07-11T12-29-49-04-00
PrehistoricRush    tracked  / 2026-07-11T12-39-53-04-00
MyCozyIsland       tracked  / 2026-07-11T12-58-06-04-00
TheCavalryOfRome   excluded
```

## Interaction loop

```txt
index.html
  -> src/main.js
  -> mutable Three.js and NexusEngine CDN imports
  -> create visual world and procedural balloon
  -> create airstream and mail domains
  -> create simulation, camera, presentation and telemetry
  -> private keyboard Set receives burner/vent input
  -> wheel changes camera zoom
  -> variable-dt RAF updates simulation and delivery
  -> update visuals and telemetry
  -> render Air Mail HUD and expose GameHost

contributor acceptance
  -> read README and AGENTS
  -> attempt Meadow Lift bird controls and objectives
  -> press R for documented restart
  -> run npm run check
  -> source/file regex assertions can pass without browser parity
```

## Domains in use

```txt
browser shell and Vite publishing
mutable CDN/ESM admission
legacy Meadow Lift campaign and documentation source
active Air Mail mission source
product mode selection and supersession
control contract and runtime binding observation
objective contract and gameplay-rule observation
README, AGENTS and HUD projection
keyboard, blur and wheel input
variable-step simulation and RAF
balloon physics and terrain clearance
airstream route, sampling, blending, force, visuals and debug
parcel, town, route, volume and delivery progress
mission lifecycle and restart authority
camera and balloon presentation
procedural balloon construction and materials
quality, atmosphere, terrain, vegetation, grass, water and landmarks
HDR composition and color/lens response
telemetry, HUD and GameHost readback
source smoke, browser acceptance and deployment evidence
headless operations, Vite build and Pages deployment
runtime disposal and resource ownership
```

## Source-backed kits

### Runtime and gameplay

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

### Balloon object and presentation

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

### Visual environment

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

### Tooling and proof

```txt
open-above-headless-editor-environment
open-above-static-smoke-test-kit
open-above-airstream-mail-test-kit
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
open-above-campaign-source-kit
open-above-raf-clock-adapter-kit
open-above-pages-deploy-kit
```

## Inactive legacy kits

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
simulation: burner/vent input, buoyancy, wind, integration, terrain clearance, snapshots, disposal
airstream: route validation, nearest sampling, blend, force, visuals, debug, snapshot, disposal
mail: parcel state/reset, route/town source, volume sampling, delivery event, town visuals
balloon: envelope, basket, rigging, burner, ropes, materials and procedural animation
camera: follow, basket blend, zoom, clipping and disposal
world: quality, sky, sun, clouds, terrain streaming, grass, water, landmarks and HDR output
host: telemetry, HUD, errors, GameHost readback and runtime composition
proof/deploy: source smoke, pure airstream/mail tests, headless calls, Vite build and Pages publish
```

## Main finding

The runtime, README, AGENTS and automated smoke do not share one acceptance contract. Public controls and objectives belong to the superseded bird-flight slice, `R` restart is advertised without a consumer, and `npm run check` can pass without proving browser or deployed-product behavior.

## Required DSK

```txt
open-above-product-acceptance-authority-domain
  -> acceptance-contract-schema
  -> product-mode-admission
  -> control-contract
  -> objective-contract
  -> manual-smoke-contract
  -> documentation/AGENTS/HUD projections
  -> runtime-binding observation
  -> parity result and fingerprints
  -> bounded evidence/journal
  -> pure, browser and Pages fixture gates
```

## Validation boundary

```txt
runtime changed: no
package scripts changed: no
dependencies changed: no
deployment changed: no
branch created: no
pull request created: no
commands run: no
```
