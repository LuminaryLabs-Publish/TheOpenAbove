# Current Audit: TheOpenAbove

**Last aligned:** `2026-07-11T09-21-50-04-00`

## Status

```txt
status: product-source-supersession-authority-audited
runtime source changed by this pass: no
branch: main
root .agent state: refreshed
central ledger sync: complete
central change log: complete
```

## Plan ledger

**Goal:** identify the active product mode, reconcile legacy Meadow Lift source with Air Mail, and define one source authority that owns runtime construction, controls, objectives, HUD, snapshots, tests and public documentation.

- [x] Compare the full Publish inventory with the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `TheOpenAbove` as the oldest eligible documented repository.
- [x] Read repository rules, public docs, package metadata, campaign source, runtime composition, simulation, mail source and tests.
- [x] Trace the active interaction loop.
- [x] Identify active, missing, implied and inactive domains.
- [x] Catalog all active source-backed kits and kit-family services.
- [x] Identify mixed Meadow Lift and Air Mail identity.
- [x] Identify runtime/public control drift.
- [x] Define product manifest, supersession, control contract, projection and fixture kits.
- [x] Refresh required root `.agent` files and add timestamped audits.
- [ ] Runtime implementation and executable product-source fixtures remain future work.

## Interaction loop

```txt
static ESM boot
  -> load legacy CAMPAIGN/WORLD descriptors
  -> create visual domain and terrain streamers
  -> create balloon object and simulation
  -> independently create three airstream routes
  -> independently create Air Mail route, parcel and towns
  -> keyboard callbacks mutate private held-key state
  -> variable-dt RAF advances balloon and airstream state
  -> delivery volume may commit parcel delivery
  -> camera and visual domains update
  -> telemetry snapshots before render
  -> HDR render and hard-coded HUD projection
  -> mutable GameHost exposes live objects and mixed identity snapshot
```

## Primary finding

The repository has no authoritative selected-mode source.

```txt
public product source
  README.md and AGENTS.md
  -> Meadow Lift, thermals, gates, return perch, Cloud Basin
  -> pitch, bank, boost and R restart controls

legacy runtime source
  src/data/campaign.config.js
  -> region meadow-lift
  -> thermalTarget, gateTarget, returnRadius, timeLimitSeconds
  -> bird/free-flight parameters

active gameplay source
  src/gameplay/mail-delivery-domain/mail-route-kit.js
  -> meadow-mail-run
  -> parcel-001
  -> Brookhaven
  -> meadow-to-brookhaven
```

`src/main.js` combines these sources without a supersession or selection result. It labels snapshots with `region: meadow-lift` while the simulation reports `status: mail-flight`, and it hard-codes Brookhaven HUD strings instead of projecting from the mail route.

## Control drift

```txt
documented:
  W/Up pitch up
  S/Down pitch down
  A/Left bank left
  D/Right bank right
  Space boost
  R restart

runtime:
  Space/W/Up burner
  S/Down/Shift vent
  wheel camera zoom
  A/D/Left/Right ignored
  R ignored
```

## Domains in use

```txt
browser shell and Vite publishing
mutable ESM/CDN source admission
legacy Meadow Lift campaign and world data
active Air Mail route, parcel and town data
keyboard, blur and wheel input
variable RAF clock
balloon buoyancy, airstream flow and terrain clearance
airstream route validation, sampling, blending and visuals
mail parcel state, delivery volume and town visuals
camera follow, basket mode, clipping and zoom
quality tier and dynamic resolution
physical sky, lighting, weather and clouds
near and horizon terrain streaming
vegetation, deterministic grass, water and landmarks
HDR composition, grading and lens response
telemetry, HUD and mutable GameHost projection
partial lifecycle and disposal
source smoke, pure tests, headless routing and Pages deployment
```

Missing authority domains:

```txt
product manifest
selected mode and supersession graph
runtime source selection and admission result
control contract and binding observation
objective source adapter
product identity fingerprint
HUD and documentation projection
committed product-frame identity
```

## Services offered

- Balloon simulation: browser input polling, flow sampling, buoyancy, velocity/position integration, terrain clearance, balloon projection, snapshot and listener disposal.
- Airstream route kit: immutable route validation and descriptors.
- Airstream sampler: nearest segment, influence, capture state, tangent and routed velocity.
- Airstream field: route evaluation, overlap blending and ambient fallback.
- Balloon force adapter: writes flow and selected route into simulation state.
- Airstream domain: route visuals, diagnostics, snapshots and disposal.
- Mail parcel/route: parcel construction/reset, town descriptors, destination and declared correct current.
- Delivery volume/progress: ground-relative admission sample, selected-route mutation and one-shot delivery event.
- Mail domain: parcel/town composition, update, snapshot, parcel-only reset and visual disposal.
- Camera/presentation: follow framing, zoom, basket mode, clipping, materials and rig animation.
- Visual domain: environment, terrain, grass, water, atmosphere, postprocess, render statistics and disposal.
- Telemetry/HUD/GameHost: aggregate runtime projection and mutable debug access.
- Validation/deployment: source smoke, pure route/mail assertions, headless routes, Vite build and Pages workflow.

## Active source-backed kits

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

## Runtime-implied adapters

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

## Proposed product-source authority kits

```txt
open-above-product-source-authority-domain
open-above-product-manifest-kit
open-above-mode-supersession-kit
open-above-runtime-source-selection-kit
open-above-control-contract-kit
open-above-objective-source-adapter-kit
open-above-product-identity-fingerprint-kit
open-above-source-admission-result-kit
open-above-hud-content-projection-kit
open-above-documentation-projection-kit
open-above-headless-source-observation-kit
open-above-source-parity-fixture-kit
```

## Ordered safe ledges

```txt
1. immutable runtime admission
2. import purity and frame ownership
3. runtime session lifecycle and ordered disposal
4. fixed-step clock and sequenced input
4a. product source supersession and parity
5. Air Mail route and delivery authority
5a. Air Mail restart transaction and mission epoch
6. terrain near/horizon continuity and work budget
```

Documentation only. No runtime source, dependency, package script, route behavior, renderer behavior or deployment configuration changed.
