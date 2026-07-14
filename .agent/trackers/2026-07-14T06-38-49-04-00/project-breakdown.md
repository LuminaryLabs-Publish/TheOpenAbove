# Project Breakdown: TheOpenAbove Runtime Retirement Ownership

**Timestamp:** `2026-07-14T06-38-49-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`  
**Branch:** `main`  
**Reviewed repository head:** `71a69d1bf4821bb985d4a1eb22658d1d1478ea5c`  
**Runtime source revision retained:** `09bb6b95549d9480dfc2caa4517575ab4009ba98`  
**Nexus Engine provider:** `ea973811342fe3ba2a35bb018323d987d3fec4b5`  
**Status:** `route-runtime-resource-retirement-authority-audited`

## Summary

The current browser route creates a complete Air Mail runtime, starts an unbounded `requestAnimationFrame` recursion, publishes live subsystem references through `window.GameHost`, and never establishes one route/session owner that can stop callbacks, dispose all domains, retire GPU resources, clear public references, or acknowledge terminal cleanup.

Several component-level disposal services already exist. Balloon simulation removes keyboard listeners, airstream and mail domains dispose visuals, the map overlay cancels its own frame and observers, and the visual domain retires much of the world. `src/main.js` never calls any of them. Route replacement, page teardown, failed startup after partial construction, hot reload, and repeated in-document boot can therefore retain callbacks, listeners, scene resources, WebGL state, and stale public objects.

## Plan ledger

**Goal:** preserve the current playable interaction while defining one route-generation authority that owns startup, frame admission, failure rollback, stop, disposal, GPU retirement, public-reference removal, and re-entry proof.

- [x] Enumerate all 11 current `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm all ten eligible repositories have central ledger entries.
- [x] Compare every eligible current head with its recorded repo-local documentation head.
- [x] Confirm no eligible repository is new, ledger-missing, root-agent-missing, or runtime-ahead.
- [x] Select only `LuminaryLabs-Publish/TheOpenAbove` by the oldest eligible central documentation timestamp.
- [x] Inspect browser boot, RAF ownership, simulation input lifecycle, map lifecycle, airstream lifecycle, mail lifecycle, visual lifecycle, public GameHost publication, and fatal-error handling.
- [x] Identify the complete interaction loop.
- [x] Preserve all 100 documented active kit, adapter, and Core World surfaces.
- [x] Identify all offered services and the existing component-level disposal services.
- [x] Define a route-runtime resource-retirement authority and typed result map.
- [x] Add a timestamped tracker, turn ledger, architecture, render, gameplay, interaction, lifecycle, deploy, and central-sync audit family.
- [x] Refresh required root `.agent` documents and the machine registry.
- [x] Change documentation only.
- [ ] Implement and execute route stop, failure rollback, re-entry, WebGL retirement, and first-successor-frame fixtures.

## Selection comparison

```txt
accessible Publish repositories: 11
eligible non-Cavalry repositories: 10
central ledger entries: 10
root .agent states recorded: 10
new eligible repositories: 0
central-ledger-missing repositories: 0
root-agent-missing repositories: 0
runtime-ahead repositories: 0
selected: LuminaryLabs-Publish/TheOpenAbove
selection rule: oldest eligible central documentation timestamp
selected previous timestamp: 2026-07-14T01-39-09-04-00
excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

Current heads matched recorded documentation heads for all ten eligible repositories:

```txt
TheLongHaul      c8649eb8c5f24a1dd39f6fd22136c4c1ff1e3b12
IntoTheMeadow    47a1811e6771c0cee1e33e96b78c43f04d062f77
HorrorCorridor   b364fa838d330add0bdf9dc31d72c74f9330be6b
AetherVale       19ed9ff918c63b0b3031174d38bc45d55b967cc3
ZombieOrchard    b6d5da397dfd668b9dfddb431e5a78f0af8eb6f4
TheUnmappedHouse 1fc536cea199c2f1ab8fc8a08ee56327abcf5175
MyCozyIsland     8fbc1617418f4a0701c76928e4b5da3956812e13
TheOpenAbove     71a69d1bf4821bb985d4a1eb22658d1d1478ea5c
PhantomCommand   3083f4c4f40104d8c10e193a1d50efa3b3f33298
PrehistoricRush  2a9ec99a67d31e40e54070aad52dc31014c9bdbd
```

## Complete interaction loop

```txt
browser module boot
  -> mark game canvas aria-busy
  -> create routes and mail route
  -> compose Nexus Engine Core World domains and telemetry
  -> register authored landforms
  -> create Three.js visual world and staged world generation
  -> await balloon object creation
  -> create airstream visuals and diagnostics
  -> create mail town visuals and parcel state
  -> create balloon simulation and install global keyboard listeners
  -> create parchment map and install key listener, ResizeObserver and map RAF
  -> create camera and balloon presentation
  -> publish live engine, renderer, scene and domain references on window.GameHost
  -> execute initial updates
  -> clear aria-busy
  -> queue perpetual gameplay RAF

per gameplay frame
  -> clamp frame delta
  -> when map closed, update simulation, delivery, airstream, balloon, camera, world and telemetry
  -> render visual frame
  -> queue next gameplay frame

route exit, pagehide, replacement or re-entry
  -> no route generation is retired
  -> no gameplay RAF is cancelled
  -> no aggregate disposal command runs
  -> no GameHost reference is cleared
  -> no renderer/context retirement is acknowledged

partial startup failure
  -> boot catches and writes fatal text
  -> already-created domains are not rolled back
  -> canvas can remain busy
  -> no failure cleanup result is published
```

## Domains in use

```txt
browser document, ESM, canvas, accessibility and fatal-error projection
route generation, page lifecycle, RAF admission and public GameHost publication
Nexus Engine resources, events, systems, runtime composition and Core World domains
World Foundation, World Features, Landform Features and authored feature registration
balloon simulation, keyboard input, telemetry and live state publication
airstream routes, field sampling, balloon force, visuals and diagnostics
Air Mail parcel, town, route, delivery volume and delivery progress
staged world generation and world-feature foundation adoption
terrain, horizon, vegetation, grass, flowers, water and landmarks
sky, sun, atmosphere, clouds, HDR, grading, lens and dynamic resolution
balloon geometry, materials, basket, rigging, burner, rope and animation
camera rig, balloon presentation and clipping fade
parchment map rendering, map input, resize observation and map RAF
component disposal, aggregate retirement, failure rollback and stale-callback rejection
source, headless, build, browser, re-entry and Pages validation
```

## Kit and service census

```txt
local source-backed kits:          71
runtime-implied adapters:          12
pinned Core World surfaces:        17
current documented active total:  100
inactive or retired legacy:        12
planned retirement surfaces:       22
```

### Runtime and gameplay kits

```txt
open-above-balloon-simulation-kit
  state integration, keyboard admission, terrain clearance, snapshots, input-listener disposal

open-above-balloon-telemetry-kit
  Core composition, telemetry resources/events, openAbove readback, feature registration

open-above-airstream-domain
  route sampling, state projection, visual/debug updates, visual/debug disposal

open-above-airstream-route-kit
open-above-airstream-sampler-kit
open-above-airstream-field-kit
open-above-airstream-balloon-force-kit
open-above-airstream-visual-kit
open-above-airstream-debug-kit
  authored route descriptors, field sampling, force application, visuals and diagnostics

open-above-mail-delivery-domain
open-above-mail-parcel-kit
open-above-mail-route-kit
open-above-delivery-volume-kit
open-above-delivery-progress-kit
open-above-mail-town-kit
  parcel lifecycle, route/town descriptors, delivery sampling, progress, town presentation and visual disposal
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
  procedural model construction, materials, rigging, burner/rope motion, camera and clipping presentation
```

### Visual world and environment kits

```txt
open-above-visual-domain
  renderer, scene, camera, world composition, resize, update, render and partial aggregate disposal

open-above-world-generation-kit
open-above-world-feature-foundation-kit
  deterministic staged generation, foundation bridge, generation subscription and world disposal

open-above-quality-tier-kit
open-above-dynamic-resolution-kit
  quality selection, viewport resize and frame-time resolution adaptation

open-above-physical-sky-kit
open-above-sun-light-kit
open-above-aerial-perspective-kit
open-above-cloud-weather-map-kit
open-above-volumetric-cloud-kit
open-above-cloud-lod-kit
open-above-cloud-lighting-kit
  sky, lighting, fog, weather and cloud presentation

open-above-terrain-surface-kit
open-above-terrain-streaming-contract-kit
open-above-terrain-chunk-streaming-kit
open-above-terrain-horizon-streaming-kit
open-above-vegetation-cluster-kit
  terrain sampling/streaming, horizon and vegetation ownership

open-above-grass-world-seed-kit
open-above-grass-biome-density-kit
open-above-grass-exclusion-mask-kit
open-above-grass-patch-density-kit
open-above-grass-texture-atlas-kit
open-above-grass-chunk-placement-kit
open-above-grass-lod-kit
open-above-grass-compute-culling-kit
open-above-grass-field-domain
  seeded grass distribution, atlas, placement, LOD, culling, updates and disposal

open-above-flower-chunk-placement-kit
open-above-flower-texture-atlas-kit
open-above-flower-field-domain
  flower placement, atlas, updates and disposal

open-above-water-surface-kit
open-above-distant-landmark-kit
open-above-hdr-composer-kit
open-above-color-grade-kit
open-above-lens-response-kit
  water, landmarks, HDR composition, grading, lens effects and partial disposal
```

### UI, host, proof and deployment surfaces

```txt
open-above-parchment-map-overlay-kit
  map drawing, open/close state, key admission, ResizeObserver, private map RAF and disposal

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
  browser hosting, provider admission, input, diagnostics, clock and deployment

open-above-headless-editor-environment
open-above-static-smoke-test-kit
open-above-airstream-mail-test-kit
open-above-world-flora-test-kit
open-above-world-feature-foundation-test-kit
open-above-world-domain-composition-test-kit
  headless inspection, source checks and deterministic subsystem fixtures

n-world-domain and 16 Core World child surfaces
  world definition/building, foundation definition/composition/sampling/cells,
  feature registry/lifecycle/query/composition and landform descriptors
```

## Source-backed findings

### Component disposal exists but has no caller

`createBalloonSimulation()` exposes `dispose()` for global keyboard listeners. The airstream domain disposes its visual/debug children. The mail domain disposes town visuals. The parchment map cancels its private frame, disconnects its observer, and removes its key listener. The visual domain removes resize handling, unsubscribes generation, disposes world/terrain/flora/water/landmarks and the composer.

`src/main.js` retains every object but never defines or invokes one aggregate stop/dispose operation.

### The gameplay RAF has no identity or cancellation handle

`frame()` always queues another callback and the returned request ID is discarded. A predecessor callback cannot be classified as stale after a route replacement or re-entry.

### Failure rollback is absent

The `try/catch` encloses the full asynchronous bootstrap. If balloon creation or any later domain fails, earlier engine, renderer, world, listener and observer resources remain live. The fatal result does not identify which resources were created or retired.

### Public references outlive authority

`window.GameHost` publishes mutable engine, scene, renderer, camera and domain references. There is no host generation, retirement state, immutable terminal snapshot, or deletion on route teardown.

### Visual disposal is not a complete GPU retirement receipt

The visual domain owns a `THREE.WebGLRenderer`, scene graph and post-processing stack. Its dispose method does not publish resource counts, renderer/context retirement, successor readiness, or a terminal result. The route never invokes even the existing partial disposal path.

### Re-entry can duplicate ownership

A second in-document boot can install another keyboard listener set, map key listener, resize observer, global resize listener, gameplay RAF and live GameHost object while predecessor callbacks remain scheduled.

## Required authority

```txt
open-above-route-runtime-resource-retirement-authority-domain
```

```txt
RouteRuntimeStartCommand
  -> allocate RouteGeneration and SessionGeneration
  -> prepare engine, visual, model, gameplay, map and presentation candidates
  -> register every owned callback, listener, observer, scene resource and public reference
  -> atomically publish ActiveRouteRuntimeResult
  -> admit gameplay frames only for the active generations

RouteRuntimeStopCommand
  -> mark the generation stopping and reject new frames/input
  -> cancel gameplay RAF and map RAF
  -> clear pending callbacks and input state
  -> dispose map, simulation, mail, airstream, presentation and visual owners in dependency order
  -> dispose scene/model materials, geometries, targets, composer and renderer as owned
  -> retire engine/domain subscriptions
  -> clear or replace window.GameHost
  -> publish per-owner receipts and RouteRuntimeRetirementResult
  -> acknowledge no predecessor callback or render can commit

RouteRuntimeFailureCommand
  -> cite the failed startup stage
  -> retire every prepared predecessor candidate
  -> preserve one immutable failure report
  -> leave canvas/error accessibility in a terminal state
```

## Required result classes

```txt
Started
Stopped
Disposed
FailedAndRolledBack
Duplicate
Stale
Superseded
TimedOut
PartialRetirementFailed
AlreadyRetired
```

## Validation boundary

Documentation only. Current heads, central ledger timestamps, main boot, simulation, airstream, mail, map and visual disposal surfaces were inspected. Runtime source, tests, dependencies, package scripts, workflows and deployment were not changed. No browser re-entry, failure-injection, WebGL resource-count, context-retirement, Pages lifecycle or successor-frame fixture was executed.