# Project Breakdown: TheOpenAbove Import-Purity and Frame Ownership

**Timestamp:** `2026-07-11T19-28-28-04-00`

**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

**Branch:** `main`

## Summary

`TheOpenAbove` imports `hot-air-balloon-object-kit.js` as a normal runtime dependency, but that module starts a compatibility `requestAnimationFrame` chain at module evaluation time. The active Air Mail host starts a separate frame loop. Successful startup therefore leaves an unowned compatibility loop traversing the scene every frame, while failed startup can leave the import-time wait loop alive indefinitely because `window.GameHost` is never published.

## Plan ledger

**Goal:** make module import side-effect free and establish one session-owned frame-registration authority for active runtime and optional legacy compatibility behavior.

- [x] Compare the complete ten-repository `LuminaryLabs-Publish` inventory.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Compare all nine eligible repositories with the central ledger and repo-local `.agent` timestamps.
- [x] Confirm no eligible repository is new, ledger-missing or root-`.agent`-missing.
- [x] Select only `LuminaryLabs-Publish/TheOpenAbove` as the oldest stable eligible repository.
- [x] Read the current root `.agent` state and retained lifecycle, product, route, terrain and grass audits.
- [x] Trace module evaluation, `createGame()`, `window.GameHost` publication, active RAF ownership and compatibility RAF behavior.
- [x] Identify the interaction loop, all active domains, all active kits and all offered service families.
- [x] Define an import-purity and frame-loop authority boundary.
- [x] Add timestamped architecture, render, gameplay, interaction, import-purity, performance and deployment audits.
- [x] Refresh the required root `.agent` documents and registry.
- [x] Push documentation directly to `main` without creating a branch or pull request.
- [ ] Runtime implementation and executable import/frame fixtures remain future work.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible repositories: 9
new or central-ledger-missing: 0
root .agent missing: 0

TheOpenAbove       2026-07-11T18-01-38-04-00 selected
HorrorCorridor     2026-07-11T18-11-21-04-00
PhantomCommand     2026-07-11T18-21-09-04-00
ZombieOrchard      2026-07-11T18-28-40-04-00
TheUnmappedHouse   2026-07-11T18-38-45-04-00
AetherVale         2026-07-11T18-48-21-04-00
IntoTheMeadow      2026-07-11T19-01-08-04-00
PrehistoricRush    2026-07-11T19-09-25-04-00
MyCozyIsland       2026-07-11T19-20-22-04-00
TheCavalryOfRome   excluded
```

## Interaction loop

```txt
browser imports src/main.js
  -> main imports hot-air-balloon-object-kit.js
  -> module evaluation schedules attachWhenReady RAF
  -> createGame() constructs visual, balloon, airstream, mail, simulation, camera and telemetry
  -> createGame() publishes window.GameHost near the end of construction
  -> createGame() schedules active frame RAF

active frame RAF
  -> simulation update
  -> mail update
  -> airstream visual update
  -> balloon transform and animation
  -> camera and environment update
  -> telemetry tick
  -> render
  -> HUD projection
  -> schedule next active frame

compatibility RAF after GameHost publication
  -> traverse the entire scene looking for a legacy wing/tail vehicle
  -> current Air Mail scene has no active legacy vehicle
  -> animate no object
  -> schedule next compatibility frame forever

startup failure before GameHost publication
  -> showFatal(error)
  -> import-time attachWhenReady continues polling every frame forever
```

## Source-backed finding

`src/hot-air-balloon-object-kit.js` calls `requestAnimationFrame(attachWhenReady)` at module scope. `attachWhenReady()` reschedules itself until `window.GameHost.scene` exists. Once the host exists, it invokes the legacy installer and starts another recursive `tick()` regardless of whether a compatible vehicle was found.

The current host already builds the active balloon directly and calls `animateHotAirBalloon()` from its own RAF. The imported compatibility loop therefore has no active product role but still performs `scene.traverse()` on every frame.

```txt
successful boot:
  active Air Mail RAF = 1
  compatibility traversal RAF = 1
  total independent RAF chains = 2

failed boot before GameHost:
  active Air Mail RAF = 0
  compatibility wait RAF = 1 indefinitely
```

Neither compatibility chain retains a handle, exposes a disposer, checks a runtime generation or participates in startup rollback.

## Domains in use

```txt
browser shell, DOM and Vite/Pages publishing
mutable Three.js and NexusEngine CDN admission
module evaluation and compatibility installation
runtime session, frame ownership and startup/failure lifecycle
legacy Meadow Lift and active Air Mail product sources
keyboard, blur, wheel and variable RAF time
balloon simulation, terrain clearance and snapshots
airstream route, sampler, field, force, visual and debug
mail parcel, route, town, delivery volume, progress, reset and disposal
mission delivery, restart and epoch authority
procedural balloon construction, materials, rigging, burner and animation
camera follow, basket mode, clipping and zoom
quality, dynamic resolution, sky, weather, clouds and lighting
terrain source, near/horizon streaming, LOD transition and edge policy
vegetation, deterministic grass, culling, water and landmarks
HDR composition, lens response and renderer statistics
Nexus telemetry, HUD, GameHost and headless readback
source checks, pure tests, build and deployment
```

## Active source-backed kits

### Runtime and gameplay, 15

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

### Balloon object and presentation, 14

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

### Visual environment, 26

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

### Tooling and proof, 3

```txt
open-above-headless-editor-environment
open-above-static-smoke-test-kit
open-above-airstream-mail-test-kit
```

## Runtime-implied adapters, 12

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

## Service families

```txt
runtime boot, fatal projection and global host publication
burner, vent, blur and wheel input
balloon buoyancy, wind integration, clearance, transforms, snapshots and disposal
airstream validation, sampling, blending, force adaptation, visuals, diagnostics and disposal
parcel construction, reset, route, town, delivery-volume, progress and one-shot events
procedural balloon geometry, envelope, basket, rigging, burner, rope, materials and animation
camera follow, basket blend, zoom, clipping and disposal
quality selection, dynamic resolution, sky, clouds, lighting and atmosphere
terrain height/color, near chunks, horizon annulus, geometry LOD and disposal
vegetation clustering, deterministic grass placement, LOD, wind, culling and disposal
water, landmarks, HDR rendering, lens response and renderer statistics
Nexus resources/events, telemetry, HUD, GameHost and headless readback
source checks, pure tests, Vite build and Pages deployment
legacy compatibility target discovery, visual replacement and animation
```

## Required authority domain

```txt
open-above-import-purity-frame-authority-domain
  -> module-side-effect-policy-kit
  -> compatibility-install-command-kit
  -> compatibility-target-discovery-kit
  -> compatibility-install-result-kit
  -> frame-loop-registration-kit
  -> frame-loop-identity-kit
  -> runtime-generation-fence-kit
  -> compatibility-loop-disposal-kit
  -> scene-traversal-budget-kit
  -> startup-failure-loop-retirement-kit
  -> compatibility-observation-kit
  -> import-purity-fixture-kit
  -> browser-frame-owner-smoke-kit
```

## Required invariants

```txt
importing a kit schedules no RAF, timer, listener or scene mutation
all optional compatibility behavior requires an explicit install command
an install result reports installed, no-compatible-target, rejected or failed
no-compatible-target creates no recurring work
all frame loops are registered to one runtime session and generation
disposal cancels every registered frame before resource retirement
startup failure leaves zero live frame callbacks
public observations report active frame-loop count and owner identity
```

## Validation boundary

Documentation only. Runtime JavaScript, dependencies, package scripts, rendering and deployment were not changed. `npm run check`, `npm run build`, browser smoke and Pages smoke were not executed. No import-purity, single-frame-owner, failed-startup retirement or compatibility-disposal fixture currently exists.