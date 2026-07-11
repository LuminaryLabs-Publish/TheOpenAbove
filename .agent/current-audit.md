# Current Audit: TheOpenAbove

**Last aligned:** `2026-07-11T07-18-44-04-00`

## Status

```txt
status: air-mail-restart-transaction-authority-audited
runtime source changed by this pass: no
branch: main
root .agent state: refreshed
central ledger sync: complete
central change log: complete
```

## Plan ledger

**Goal:** document the complete Air Mail runtime and define one clean mission restart that cannot retain stale input, movement, route, delivery, camera or frame state.

- [x] Compare the full Publish inventory with the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `TheOpenAbove` as the oldest eligible documented repository.
- [x] Trace the active interaction loop.
- [x] Identify all active domains and runtime-implied adapters.
- [x] Catalog all active, inactive and proposed kits.
- [x] Catalog the services offered by each kit family.
- [x] Trace `mail.reset()` and its consumers.
- [x] Identify the immediate-redelivery regression.
- [x] Define mission epoch, reset command, transaction result and first-frame proof.
- [x] Refresh required root `.agent` files and add timestamped audits.
- [ ] Runtime implementation and executable fixtures remain future work.

## Interaction loop

```txt
static ESM boot
  -> create visual domain and terrain streamers
  -> create balloon object and simulation
  -> create three airstream routes and visual corridors
  -> create one parcel, three towns and delivery volumes
  -> keyboard callbacks mutate a private key Set
  -> RAF computes capped variable dt
  -> simulation samples flow and advances balloon state
  -> mail progress samples destination volume
  -> delivery may commit
  -> airstream, balloon, camera and visual state update
  -> telemetry snapshots
  -> renderer submits
  -> HUD projects
  -> next RAF repeats
```

## Active product loop

```txt
carry parcel-001 for Brookhaven
  -> use burner and vent to select altitude
  -> enter one of three visible currents
  -> ride routed flow toward a town
  -> enter Brookhaven delivery volume
  -> parcel becomes delivered
```

## Restart loop currently exposed

```txt
GameHost.mail.reset()
  -> reset parcel status fields
  -> clear lastEvent
  -> return mail snapshot
```

No browser `R` path invokes it. No root mission reset exists.

## Primary finding

A parcel reset is not a mission reset. The following state survives `mail.reset()`:

```txt
balloon position and velocity
vertical velocity, wind and altitude
burner and vent state
simulation elapsed and distance
private held-key Set
simulation airstream sample
airstream-domain active route and last sample
camera zoom/mode/smoothing state
terrain and presentation center
telemetry history and frame phase
HUD/frame identity
GameHost live object graph
```

Because the balloon can remain inside Brookhaven and `mail.update()` executes on the next RAF, a reset parcel can be delivered again immediately.

## Domains in use

```txt
browser shell and Vite publishing
static ESM/CDN source admission
legacy campaign configuration
Air Mail route, parcel and town configuration
keyboard, blur and wheel input
variable RAF timing
balloon buoyancy, wind and terrain clearance
airstream route validation, nearest-segment sampling and overlap blending
airstream-to-balloon force adaptation
airstream state, visuals and diagnostics
mail parcel state, route data and delivery-volume sampling
one-shot delivery mutation and town visuals
camera follow, zoom, clipping and presentation
quality tier and dynamic resolution
physical sky, sun, atmosphere, weather and clouds
near and far-horizon terrain streaming
vegetation, deterministic grass, water and landmarks
HDR composition, grading and lens response
telemetry, HUD and GameHost projection
partial disposal and lifecycle
source smoke, pure tests, headless routing and Pages deployment
```

## Services offered

- Balloon simulation: input polling, flow sampling, buoyancy, position/velocity integration, terrain clearance, mesh projection, snapshots and listener disposal.
- Airstream route kit: immutable route validation and normalized route descriptors.
- Airstream sampler: nearest 3D segment, center distance, influence, capture state, tangent and routed velocity.
- Airstream field: route evaluation, overlap blending and ambient fallback.
- Balloon force adapter: writes flow velocity and selected route into simulation state.
- Airstream domain: state, route visuals, diagnostics, snapshots and disposal.
- Mail parcel kit: parcel construction and parcel-field reset.
- Mail route kit: town descriptors, parcel descriptor and declared correct current.
- Delivery volume: ground-relative center, horizontal distance, altitude delta and inside/outside sample.
- Delivery progress: selected-route mutation, parcel messages and one-shot delivery event.
- Mail domain: parcel/town composition, update, snapshot, parcel-only reset and visual disposal.
- Camera/presentation: follow framing, zoom, mode, clipping and material/rig animation.
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

### Balloon and presentation

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

## Inactive or legacy source-backed surfaces

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

## Proposed restart kits

```txt
open-above-mission-epoch-kit
open-above-reset-command-kit
open-above-reset-admission-kit
open-above-input-retirement-kit
open-above-balloon-reset-kit
open-above-airstream-reset-kit
open-above-mail-reset-transaction-kit
open-above-camera-reset-kit
open-above-reset-result-kit
open-above-first-post-reset-frame-kit
open-above-air-mail-restart-fixture-kit
```

## Ordered safe ledges

```txt
1. immutable runtime admission
2. import purity and frame ownership
3. runtime session lifecycle and ordered disposal
4. fixed-step clock and sequenced input
5. Air Mail route/delivery authority
5a. Air Mail restart transaction and mission epoch
6. terrain near/horizon continuity and work budget
```

Documentation only. No runtime source, dependency, script, route behavior, renderer behavior or deployment configuration changed.
