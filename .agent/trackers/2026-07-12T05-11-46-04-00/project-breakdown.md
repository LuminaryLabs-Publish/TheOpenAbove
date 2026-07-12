# Project Breakdown: HDR Attachment and Resolution Authority

**Timestamp:** `2026-07-12T05:11:46-04:00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`  
**Branch:** `main`

## Summary

The current visual stack sizes the renderer and EffectComposer using an effective pixel ratio, then the browser-resize path manually rewrites tracked depth texture dimensions using unscaled CSS dimensions. Startup also replaces an initial depth attachment without an explicit ownership-transfer or retirement result.

This pass defines a documentation-only authority for render-surface identity, resize generations, physical color/depth parity, framebuffer admission, atomic commit/rollback, resource leases, exactly-once retirement and visible-frame acknowledgement.

## Plan ledger

**Goal:** make renderer, composer targets and depth attachments one compatible, revisioned and rollback-safe aggregate.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger entries and root `.agent` state.
- [x] Skip newer unsynchronized `PrehistoricRush` repo-local audit work.
- [x] Select only `LuminaryLabs-Publish/TheOpenAbove` as the oldest stable eligible repository.
- [x] Read `AGENTS.md`, visual source, quality policy, HDR composer, smoke checks and retained audits.
- [x] Trace startup allocation, browser resize, dynamic degradation/recovery and disposal.
- [x] Identify the interaction loop, all domains, all 59 active source-backed kits and their services.
- [x] Define surface, target, attachment, resize, commit, rollback and retirement contracts.
- [x] Add timestamped architecture and system audits.
- [x] Refresh required root `.agent` files and machine registry.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Implement runtime authority and execute browser/Pages fixtures.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

PrehistoricRush    2026-07-12T03-51-15-04-00 skipped: newer repo-local audit commits pending central synchronization
TheOpenAbove       2026-07-12T04-00-32-04-00 selected
IntoTheMeadow      2026-07-12T04-11-54-04-00
PhantomCommand     2026-07-12T04-18-44-04-00
HorrorCorridor     2026-07-12T04-28-03-04-00
ZombieOrchard      2026-07-12T04-38-12-04-00
TheUnmappedHouse   2026-07-12T04-44-36-04-00
AetherVale         2026-07-12T04-50-41-04-00
MyCozyIsland       2026-07-12T05-00-19-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/TheOpenAbove` was modified in the Publish organization.

## Interaction loop

```txt
visual startup
  -> detect hardware quality tier
  -> create WebGL renderer
  -> allocate half-float HDR target at CSS dimensions
  -> attach one depth texture
  -> create EffectComposer and cloned second target
  -> replace both composer depth attachments
  -> create dynamic-resolution controller

browser resize
  -> observe CSS width/height and DPR
  -> derive effective pixel ratio
  -> resize renderer and composer
  -> call HDR wrapper resize again
  -> manually set tracked depth images to CSS dimensions
  -> render without a typed compatibility result

dynamic quality transition
  -> smooth frame duration
  -> every 90 samples adjust dynamic scale
  -> invoke only dynamic-resolution resize
  -> do not invoke the HDR wrapper depth rewrite

disposal
  -> dispose two replacement depth textures
  -> dispose target and composer
  -> no explicit predecessor attachment lease or retirement receipt
```

## Main finding

```txt
high tier example
CSS size: 1920 × 1080
DPR cap: 1.6
dynamic scale: 1.0
effective pixel ratio: 1.6

composer color target plan: 3072 × 1728
manual tracked depth image assignment: 1920 × 1080
```

The code has no surface revision, target/attachment identity, physical-size compatibility admission, framebuffer-completeness result, stale resize rejection, atomic rollback, ownership-transfer record, exactly-once retirement receipt or visible-frame acknowledgement.

## Domains in use

```txt
browser shell, DOM, Vite and Pages
runtime admission, session, failure and RAF ownership
keyboard, blur, wheel and variable frame time
balloon simulation, airstream, steering, clearance and snapshots
mail route, town, volume, delivery progress and reset
balloon profile, model assembly, async loading and resources
envelope, basket, burner, rigging, rope and presentation
camera follow, zoom, clipping and steering response
quality-tier admission and hardware classification
render-surface CSS size, DPR and effective pixel ratio
dynamic-resolution sampling and scale transitions
Three.js renderer drawing-buffer allocation
EffectComposer target allocation and resize
HDR color target, half-float format and multisample policy
depth-texture attachment identity, dimensions and lifecycle
framebuffer attachment compatibility and completeness
render-surface revision, commit, rollback and visible-frame acknowledgement
terrain, grass, atmosphere, water, lighting and lens response
telemetry, HUD, GameHost and headless inspection
checks, tests, build and deployment
```

## Active source-backed kits and services

### Runtime and gameplay: 15

```txt
open-above-balloon-simulation-kit
  flight state, browser input, wind integration, terrain clearance, transforms, snapshots and disposal
open-above-balloon-telemetry-kit
  NexusEngine composition, telemetry ticking and state projection
open-above-airstream-domain
  route, sampler, field, force, visual and debug composition
open-above-airstream-route-kit
  authored current-route descriptors
open-above-airstream-sampler-kit
  spatial route-influence sampling
open-above-airstream-field-kit
  local wind-vector field evaluation
open-above-airstream-balloon-force-kit
  airstream-to-balloon force derivation
open-above-airstream-visual-kit
  current scene visualization and animation
open-above-airstream-debug-kit
  debug descriptors and state projection
open-above-mail-delivery-domain
  parcel, route, town, volume, progress, reset and disposal composition
open-above-mail-parcel-kit
  parcel construction and reset
open-above-mail-route-kit
  route, destination and correct-current descriptors
open-above-delivery-volume-kit
  destination-volume spatial sampling
open-above-delivery-progress-kit
  current tracking, delivery commit, message and event production
open-above-mail-town-kit
  town scene construction, animation and disposal
```

### Balloon object and presentation: 15

```txt
open-above-hot-air-balloon-object-kit
  profile resolution, asynchronous construction, model metadata, animation and resources
open-above-balloon-envelope-profile-kit
  radius, point, normal, mouth and top-height sampling
open-above-balloon-envelope-panel-kit
  envelope geometry and integrated color-pattern construction
open-above-balloon-mouth-kit
  mouth geometry and attachment
open-above-balloon-streamer-fit-kit
  streamer fitting to the envelope profile
open-above-balloon-fabric-seam-kit
  fabric seam construction
open-above-hot-air-balloon-basket-kit
  basket and gondola construction
open-above-hot-air-balloon-rigging-kit
  suspension and rigging construction
open-above-hot-air-balloon-burner-kit
  burner object and flame response
open-above-rope-kit
  segmented rope construction and animation
open-above-balloon-presentation-domain
  envelope and gondola inertia presentation
open-above-envelope-fabric-material-kit
  envelope fabric material construction
open-above-basket-material-kit
  basket material construction
open-above-balloon-camera-rig-kit
  follow camera, zoom, clipping, steering look and basket blend
open-above-clipping-fade-kit
  near-camera clipping fade policy
```

### Visual environment: 26

```txt
open-above-visual-domain
  scene, camera, renderer, environment composition, update, render, resize and disposal
open-above-quality-tier-kit
  hardware classification, DPR cap, initial render scale and visual budgets
open-above-dynamic-resolution-kit
  frame-time smoothing, scale transitions and renderer/composer resize
open-above-physical-sky-kit
  physical sky construction and update
open-above-sun-light-kit
  sun light construction and update
open-above-aerial-perspective-kit
  atmospheric distance response
open-above-cloud-weather-map-kit
  cloud weather-field descriptors
open-above-volumetric-cloud-kit
  cloud volume construction and animation
open-above-cloud-lod-kit
  cloud LOD selection
open-above-cloud-lighting-kit
  cloud lighting response
open-above-terrain-surface-kit
  terrain surface generation and height service
open-above-terrain-chunk-streaming-kit
  near-terrain chunk membership and streaming
open-above-terrain-horizon-streaming-kit
  horizon chunk membership and LOD
open-above-vegetation-cluster-kit
  vegetation cluster generation
open-above-grass-world-seed-kit
  deterministic grass seed policy
open-above-grass-biome-density-kit
  biome density classification
open-above-grass-exclusion-mask-kit
  grass exclusion rules
open-above-grass-chunk-placement-kit
  deterministic world-space blade placement
open-above-grass-lod-kit
  grass LOD classification
open-above-grass-compute-culling-kit
  culling helper and backend observation
open-above-grass-field-domain
  grass chunk generation, membership, materials, update and disposal
open-above-water-surface-kit
  animated water construction and update
open-above-distant-landmark-kit
  distant landmark construction
open-above-hdr-composer-kit
  half-float targets, composer, depth attachments, color-grade pass, resize, render and disposal
open-above-color-grade-kit
  color-grade transform
open-above-lens-response-kit
  lens and exposure response
```

### Tooling and proof: 3

```txt
open-above-headless-editor-environment
  headless inspection, renderer validation, project check and build routing
open-above-static-smoke-test-kit
  source-level file and pattern assertions
open-above-airstream-mail-test-kit
  pure airstream and mail fixtures
```

### Runtime-implied adapters: 12

```txt
open-above-route-shell-kit
  HTML canvas, HUD and error-panel host
open-above-importmap-kit
  browser module dependency routing
open-above-runtime-composer-kit
  visual, simulation, mission, presentation and telemetry assembly
open-above-keyboard-input-kit
  burner, vent and steering browser input
open-above-wheel-zoom-input-kit
  camera zoom input
open-above-hud-projection-kit
  flight and mission status projection
open-above-error-panel-kit
  fatal error projection
open-above-gamehost-legacy-readback-kit
  public raw owner and state exposure
open-above-nexusengine-cdn-adapter-kit
  NexusEngine CDN integration
open-above-campaign-source-kit
  campaign and world descriptors
open-above-raf-clock-adapter-kit
  variable browser-frame timing
open-above-pages-deploy-kit
  Vite static build and Pages publication
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

## Required parent domain

```txt
open-above-hdr-attachment-resolution-authority-domain
```

### Planned coordinating kits

```txt
open-above-render-surface-id-kit
open-above-render-surface-revision-kit
open-above-resize-source-kit
open-above-resize-generation-kit
open-above-quality-state-revision-kit
open-above-effective-pixel-ratio-plan-kit
open-above-composer-target-plan-kit
open-above-depth-attachment-id-kit
open-above-depth-attachment-plan-kit
open-above-attachment-dimension-admission-kit
open-above-framebuffer-completeness-result-kit
open-above-render-surface-commit-kit
open-above-render-surface-rollback-kit
open-above-stale-resize-rejection-kit
open-above-dynamic-scale-transition-result-kit
open-above-attachment-replacement-kit
open-above-attachment-resource-lease-kit
open-above-attachment-retirement-result-kit
open-above-render-surface-observation-kit
open-above-visible-render-surface-frame-ack-kit
open-above-hdr-attachment-resolution-fixture-kit
open-above-browser-dpr-resize-smoke-kit
open-above-pages-render-surface-smoke-kit
```

## Required proof

```txt
initial attachment ownership
color/depth physical-dimension parity
browser and dynamic resize source parity
stale resize rejection
framebuffer-completeness admission
candidate failure rollback
attachment lease transfer
exactly-once retirement
bounded resource counts
first-visible-frame surface acknowledgement
local/deployed parity
```

## Validation boundary

```txt
runtime source changed: no
package scripts changed: no
dependencies changed: no
render behavior changed: no
deployment changed: no
branch created: no
pull request created: no

npm run check: not run
npm run headless:check: not run
npm run build: not run
browser WebGL fixture: unavailable
Pages resize/quality smoke: unavailable
```
