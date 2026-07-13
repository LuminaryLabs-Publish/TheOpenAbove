# Current Audit: TheOpenAbove

**Last aligned:** `2026-07-13T13-39-10-04-00`  
**Status:** `staged-world-generation-scheduler-adoption-authority-audited`  
**Runtime revision reviewed:** `a47cb530963e01a07fcc839ca1dcce2f70bd169f`

## Summary

The runtime now performs deterministic phased world generation after the first visible frame while retaining legacy terrain and the public sampling API. The core candidate swap is atomic at the array reference, but generation scheduling and render-consumer adoption are not owned by one transaction. Map-open starves generation, consumer refresh is synchronous and unbudgeted, and a listener/rebuild failure can leave the successor sampling revision active without complete consumer adoption or rollback.

## Plan ledger

**Goal:** establish one scheduler and adoption authority from frame-budget admission through candidate generation, consumer preparation, active commit and first visible adopted-world proof.

- [x] Compare the current Publish inventory and central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `TheOpenAbove` because staged-generation runtime is newer than central documentation.
- [x] Trace phase execution, fallback, progress, reset, disposal and failure.
- [x] Trace terrain, vegetation, grass, flowers and map revision adoption.
- [x] Identify all domains, kits and offered services.
- [x] Add a timestamped tracker and system audits.
- [x] Change no runtime source or deployment configuration.
- [ ] Implement and validate scheduler/adoption authority.

## Complete interaction loop

```txt
browser boot
  -> create world generator with staged=true and autoStart
  -> create terrain, vegetation, grass, flowers and map against fallback sampling
  -> render initial WebGL frame

map closed RAF
  -> update balloon, mail, airstream and camera
  -> visual.update
     -> if first frame presented and generation working, advance configured units
     -> update terrain, flora, atmosphere and HDR
  -> render WebGL

world generation
  -> height per grid cell
  -> erosion scan/apply across six passes
  -> flow initialization
  -> incremental merge sort by height
  -> flow accumulation
  -> climate and channel carving
  -> biome classification
  -> active array swap and ready notification

consumer adoption
  -> vegetation refresh synchronously repopulates instances
  -> grass/flowers synchronously clear current chunks
  -> terrain observes revision and clears/rebuilds near/horizon chunks
  -> grass/flowers rebuild local chunks on update
  -> map cache rebuilds lazily on next draw

map open RAF
  -> main loop skips visual.update
  -> generation receives no units
  -> WebGL continues rendering at dt 0
  -> map draws current active revision

reset
  -> retain active world
  -> create new pending workset
  -> generate replacement

dispose
  -> drop pending and active state
  -> clear listeners and caches
  -> reject later reset
```

## Domains in use

```txt
browser document/import map/module loader/canvas/error panel/GameHost
runtime boot/session/keyboard/wheel/RAF/telemetry/map pause
Nexus resource/event/journal surfaces
balloon simulation and presentation
airstream routes, sampling, field, force, visuals and debug
Air Mail parcel, route, towns, volumes, progress, reset and completion
seeded world identity, spatial membership, anchors and feature cells
height, erosion, flow, climate and biome generation
fallback and active world sampling, diagnostics, reset and disposal
terrain near/horizon streaming, LOD, ownership and refresh
vegetation population and obstacle queries
grass/flower distribution, chunks, LOD, culling, exclusions and wind
parchment map cache, routes, towns, player marker and revision refresh
quality, dynamic resolution, sky, clouds, water, HDR, grading and lens
headless editor, tests, Vite and Pages
missing staged-world-generation scheduler/adoption authority
```

## Kit census

```txt
runtime/gameplay: 15
balloon/object/presentation: 15
visual/world/environment: 33
UI: 1
tooling/proof: 4
active source-backed total: 68
runtime-implied adapters: 12
inactive/retired legacy: 12
planned scheduler/adoption authority including parent: 16
```

## Implemented kits

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
open-above-balloon-envelope-profile-kit
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

### Visual, world and environment

```txt
open-above-visual-domain
open-above-world-generation-kit
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
open-above-terrain-streaming-contract-kit
open-above-terrain-chunk-streaming-kit
open-above-terrain-horizon-streaming-kit
open-above-vegetation-cluster-kit
open-above-grass-world-seed-kit
open-above-grass-biome-density-kit
open-above-grass-exclusion-mask-kit
open-above-grass-patch-density-kit
open-above-grass-texture-atlas-kit
open-above-grass-chunk-placement-kit
open-above-grass-lod-kit
open-above-grass-compute-culling-kit
open-above-grass-field-domain
open-above-flower-chunk-placement-kit
open-above-flower-texture-atlas-kit
open-above-flower-field-domain
open-above-water-surface-kit
open-above-distant-landmark-kit
open-above-hdr-composer-kit
open-above-color-grade-kit
open-above-lens-response-kit
```

### UI and tooling/proof

```txt
open-above-parchment-map-overlay-kit
open-above-headless-editor-environment
open-above-static-smoke-test-kit
open-above-airstream-mail-test-kit
open-above-world-flora-test-kit
```

### Runtime-implied adapters

```txt
open-above-route-shell-kit
open-above-importmap-kit
open-above-runtime-composer-kit
open-above-keyboard-input-kit
open-above-wheel-zoom-input-kit
open-above-parchment-map-shell-kit
open-above-error-panel-kit
open-above-gamehost-legacy-readback-kit
open-above-nexusengine-cdn-adapter-kit
open-above-campaign-source-kit
open-above-raf-clock-adapter-kit
open-above-pages-deploy-kit
```

## Offered services

```txt
open-above-world-generation-kit:
  deterministic seed/grid/feature-cell identity
  protected route/town/lake anchors
  height, erosion, flow, climate and biome phases
  fixed unit-budget advancement
  synchronous completion option
  fallback and active sampling through unchanged APIs
  progress, phase, phase timing, history and failure diagnostics
  generation subscriptions
  reset with active-world retention
  disposal

runtime/gameplay:
  flight integration and telemetry
  airstream route/sample/field/force/visual/debug
  mail parcel/route/town/volume/progress/snapshot/reset/disposal

balloon/presentation:
  procedural construction, materials, rigging and secondary motion
  camera, clipping, animation and persistent GPU resources

world/render:
  terrain near/horizon streaming and LOD
  vegetation population and queries
  grass/flower chunks, density, culling, exclusions and wind
  sky, clouds, water, HDR, grading, lens and dynamic resolution

UI/tooling:
  parchment map projection and revision-aware cache
  headless project/renderer/world-generation inspection
  source/static, route/mail and world/flora checks
  Vite build and Pages deployment
```

## Source-backed findings

```txt
phased generator: implemented
incremental flow ordering: implemented
first-frame fallback: implemented
active retained during reset: implemented
active array reference swap: implemented
phase/progress/timing/failure diagnostics: implemented
sampling API compatibility: preserved
generation while map open: absent
consumer preparation artifacts: absent
per-consumer revision receipts: absent
budgeted adoption: absent
consumer rollback: absent
first visible adopted-world ack: absent
world-generation test wired into npm check: no
```

## Critical failure path

```txt
completeAtomicSwap
  -> active successor arrays assigned
  -> pending removed
  -> generation marked ready
  -> listener refresh begins

listener or rebuild throws
  -> advanceGeneration catches and marks failed
  -> successor active arrays remain installed
  -> some consumers may already be cleared or rebuilt
  -> no rollback or mixed-generation result exists
```

## Required parent domain

```txt
open-above-staged-world-generation-scheduler-adoption-authority-domain
```

## Required transaction

```txt
WorldGenerationFrameCommand
  -> bind attempt and scheduler generations
  -> admit bounded work independently of gameplay/map pause
  -> publish monotonic work and progress receipts
  -> retain predecessor on failure/cancel

WorldGenerationAdoptionCommand
  -> bind candidate and predecessor revisions
  -> prepare mandatory consumer resources under budgets
  -> collect typed terrain/vegetation/flora/map receipts
  -> commit sampling and visible consumer generations together
  -> roll back partial preparation on failure
  -> acknowledge first matching visible frame
```

## Planned coordinating kits

```txt
open-above-staged-world-generation-scheduler-adoption-authority-domain
open-above-world-generation-attempt-kit
open-above-world-generation-frame-command-kit
open-above-generation-work-budget-kit
open-above-generation-progress-receipt-kit
open-above-world-candidate-artifact-kit
open-above-world-consumer-registry-kit
open-above-world-consumer-adoption-plan-kit
open-above-terrain-generation-prepare-kit
open-above-vegetation-generation-prepare-kit
open-above-flora-generation-prepare-kit
open-above-map-cache-generation-prepare-kit
open-above-world-adoption-result-kit
open-above-world-adoption-rollback-kit
open-above-first-adopted-world-frame-ack-kit
open-above-world-generation-fixture-gate-kit
```

## Validation boundary

Documentation only. No command, browser fixture, consumer failure injection, built output or Pages smoke was executed.