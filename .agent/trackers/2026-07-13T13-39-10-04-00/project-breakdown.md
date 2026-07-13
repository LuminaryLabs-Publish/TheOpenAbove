# Project Breakdown: TheOpenAbove Staged World Generation

**Run:** `2026-07-13T13-39-10-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`  
**Branch:** `main`  
**Runtime revision reviewed:** `a47cb530963e01a07fcc839ca1dcce2f70bd169f`  
**Status:** `staged-world-generation-scheduler-adoption-authority-audited`

## Summary

The procedural world generator now preserves the public sampling API while splitting work into height, erosion, flow, climate and biome phases. It renders the legacy terrain first, advances a fixed unit budget after the first presented frame, retains the active world during reset, swaps generated arrays atomically, exposes progress and diagnostics, and adds headless/source proof surfaces.

The remaining ownership gap is outside the core generator. Generation advances only from `visual.update()`, so opening the parchment map pauses work. When generation reaches ready, the core swaps its sampling revision before vegetation, terrain, grass, flowers and the map cache have returned typed adoption receipts. Consumer refresh is synchronous, unbudgeted and not rollback-safe if a listener or rebuild fails.

## Plan ledger

**Goal:** preserve first-frame rendering and deterministic phased generation while making scheduler progress and all consumer adoption revision-bound, budgeted, failure-safe and visibly provable.

- [x] Compare all ten accessible Publish repositories with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have ledger and root `.agent` coverage.
- [x] Select only `LuminaryLabs-Publish/TheOpenAbove` because runtime revision `a47cb530...` is newer than central documentation.
- [x] Trace phased generation, progress, fallback sampling, reset, disposal and atomic active-array swap.
- [x] Trace visual scheduling, map pause behavior and all world-revision consumers.
- [x] Preserve the full 68-kit and 12-adapter inventory.
- [x] Identify every offered service, including the expanded world-generation API.
- [x] Add architecture, render, gameplay, interaction, world-generation and deploy audits.
- [x] Change no runtime, dependency, script or workflow.
- [x] Push directly to `main`; create no branch or pull request.
- [ ] Implement generation scheduling and consumer-adoption authority.
- [ ] Add executable browser and failure-injection fixtures.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
central ledger entries: 9
root .agent folders: 9
new or ledger-missing eligible repositories: 0
root-agent-missing eligible repositories: 0
selected repository: LuminaryLabs-Publish/TheOpenAbove
reason: staged world-generation runtime commit is newer than the centrally reviewed documentation head
excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

## Complete interaction loop

```txt
browser boot
  -> create visual domain
  -> create staged world generator
  -> expose legacy terrain/moisture through unchanged sampling API
  -> create terrain, vegetation, grass, flowers and map from fallback samples
  -> render the initial world

world frame while map closed
  -> update balloon, mail, airstream and camera
  -> visual.update()
  -> after first presented frame, advance one fixed generation-unit budget
  -> update atmosphere, terrain, flora and HDR
  -> render WebGL

world generation
  height -> erosion -> flow initialize/sort/accumulate -> climate -> biome
  -> build pending typed-array workset
  -> publish progress, phase, timings and failure diagnostics
  -> completeAtomicSwap() replaces active sampling arrays
  -> notify generation listeners

ready notification and adoption
  -> vegetation.refresh() repopulates tree instances synchronously
  -> grass.refresh() clears chunks and invalidates center synchronously
  -> flowers.refresh() clears chunks and invalidates center synchronously
  -> terrain.update() detects revision, clears near/horizon chunks and rebuilds required geometry
  -> grass.update() and flowers.update() rebuild local chunks
  -> map cache refreshes lazily when next drawn

map open during generation
  -> main world loop skips visual.update()
  -> generation receives no work budget
  -> WebGL continues rendering at dt 0
  -> map RAF draws the currently active world revision

reset
  -> retain active revision
  -> allocate new pending workset
  -> regenerate in phases
  -> swap only after biome completion

dispose
  -> drop pending and active arrays
  -> clear feature cells and listeners
  -> reject later reset
```

## Domains in use

```txt
browser document, import map, module evaluation, canvas, error projection and GameHost
runtime boot, RAF scheduling, keyboard/wheel input, telemetry and map pause policy
balloon simulation, airstream routing and Air Mail progression
seeded world identity, protected anchors, spatial membership and feature cells
height generation, erosion, flow sorting/accumulation, climate and biome classification
fallback sampling, active revision sampling, reset, failure diagnostics and disposal
terrain near/horizon streaming, LOD, geometry ownership and generation refresh
vegetation instance population and obstacle query refresh
grass and flower distribution, chunks, LOD, culling, exclusions and wind
parchment-map world cache and generation-revision refresh
sky, sun, clouds, water, HDR, grading, lens and dynamic resolution
headless editor capabilities, static inspection, Node tests, Vite build and Pages deployment
missing staged-world scheduler and consumer-adoption authority
```

## Kit and adapter census

```txt
runtime/gameplay kits: 15
balloon/object/presentation kits: 15
visual/world/environment kits: 33
UI kits: 1
tooling/proof kits: 4
active source-backed total: 68
runtime-implied adapters: 12
inactive/retired legacy: 12
planned scheduler/adoption authority including parent: 16
```

### Runtime and gameplay kits

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

### Balloon object and presentation kits

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

### Visual, world and environment kits

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

### UI and tooling/proof kits

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

### Expanded world-generation services

```txt
unchanged sampleHeight/sampleMoisture/sampleTemperature/sampleFertility API
sampleBiome/sampleFlora/sampleMapColor/sampleFeatureCell
contains and immutable descriptor
startGeneration
advanceGeneration with fixed unit budget
completeGenerationSync
getGenerationState/getGenerationDiagnostics
subscribeGeneration
reset with active-world retention
terminal disposal
phase history, phase progress, aggregate progress and phase timings
failure code, phase, message and stack capture
```

### Other service groups

```txt
runtime/gameplay:
  flight input and integration
  telemetry resource/event publication
  airstream route/sample/field/force/visual/debug
  mail parcel/route/town/volume/progress/snapshot/reset/disposal

balloon/object/presentation:
  procedural envelope/basket/burner/rope/rigging construction
  deferred model loading and persistent GPU resources
  materials, secondary motion, camera, clipping and animation

world/render:
  terrain near/horizon streaming and LOD
  vegetation population and obstacle queries
  grass/flower density, chunks, culling, exclusions and wind
  quality, sky, clouds, water, HDR, grading and lens

UI/proof/deploy:
  parchment map lifecycle and world cache projection
  headless inspection and renderer/world-generation validation
  source/static, route/mail and world/flora checks
  Vite build and Pages deployment
```

## Source-backed findings

```txt
phases split into height, erosion, flow, climate, biome: yes
flow full-grid Array.sort removed: yes, replaced by incremental merge sort units
legacy/fallback sampling before ready: yes
active world retained during reset: yes
core active arrays replaced in one assignment: yes
progress/phase/timing/failure diagnostics: yes
first render before generation work: yes
generation work while map open: no
elapsed-time frame budget: no, unit-count budget only
consumer adoption command/result: absent
per-consumer adoption revision and receipt: absent
consumer rollback after failure: absent
budgeted terrain/vegetation/flora adoption: absent
first visible fully adopted world acknowledgement: absent
map cache rebuilt under adoption transaction: absent
```

## Critical failure path

```txt
final biome unit
  -> active world revision is replaced
  -> generation is marked ready
  -> listeners are notified
  -> vegetation/grass/flower refresh executes synchronously

if a listener or later rebuild throws
  -> advanceGeneration catches the exception and marks generation failed
  -> active already points at the successor world revision
  -> pending workset is already gone
  -> some consumers may be cleared or refreshed while others remain predecessor state
  -> no rollback or terminal adoption result identifies the mixed state
```

## Required parent domain

```txt
open-above-staged-world-generation-scheduler-adoption-authority-domain
```

## Required transaction

```txt
WorldGenerationFrameCommand
  -> bind runtime session, generation attempt and scheduler generation
  -> admit a bounded work budget even when gameplay or map simulation is paused
  -> execute height/erosion/flow/climate/biome units
  -> publish monotonic GenerationProgressReceipt
  -> retain predecessor active world on failure or cancellation

WorldGenerationAdoptionCommand
  -> bind completed candidate revision and predecessor revision
  -> build an immutable ConsumerAdoptionPlan
  -> stage terrain, horizon, vegetation, grass, flowers and map cache
  -> process rebuild work under explicit budgets
  -> collect typed prepare receipts from every mandatory consumer
  -> reject stale, failed or superseded plans without changing active visibility
  -> commit sampling revision and all mandatory consumer generations together
  -> preserve or restore predecessor resources on partial failure
  -> publish WorldGenerationAdoptionResult
  -> acknowledge the first visible frame citing the committed revision
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

## Proof gap

`tests/world-generation.mjs` contains executable deterministic, fallback, reset and disposal assertions, but `npm run check` does not invoke that file. `world-generation.validate` checks source markers and then runs `npm run check`, so the staged test body is present without being exercised by the advertised headless command or Pages build.

## Validation boundary

Documentation only. Runtime source, scripts, dependencies, gameplay, rendering and deployment were not changed. No browser generation cadence, map-open progress, consumer-failure rollback, adoption frame-time or first-visible-adopted-world fixture was executed.