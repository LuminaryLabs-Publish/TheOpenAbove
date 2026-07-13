# Current Audit: TheOpenAbove Core World Feature/Foundation Adoption

**Last aligned:** `2026-07-13T18-40-52-04-00`  
**Status:** `core-world-feature-foundation-adoption-authority-audited`  
**Runtime revision reviewed:** `bde5e6f5ca660715d2c1b4592d508431e89587cd`  
**Nexus Engine provider:** `112de886131c00121c36f004c257bd50ff122589`

## Summary

The runtime now uses pinned Nexus Engine Core World Foundation, Features, and Landform domains to register and compile a semantic `northern-wall` mountain with a 500 metre elevation field. A local product bridge adds resolved elevation to the staged base world, propagates the composed height into biome and flora sampling, tints the parchment map, and lets terrain-height consumers encounter the new physical shape.

The integration stops short of complete Core World adoption. The rendered world is not registered through the parent Core World builder. One global foundation cell is compiled once, only elevation is consumed, and the compiler’s material, collision, and fidelity descriptors do not receive typed product adapters. Feature/foundation revisions are not correlated with terrain, flora, map, collision, or a visible frame, and partial adoption has no rollback.

## Plan ledger

**Goal:** preserve the implemented mountain while establishing one authority from semantic feature registration through resolved foundation channels, consumer preparation, atomic adoption, rollback, and visible proof.

- [x] Compare the current Publish inventory and central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all eligible repositories have ledger and root `.agent` coverage.
- [x] Select only `TheOpenAbove` because its runtime advanced beyond central documentation.
- [x] Inspect the runtime diff and every affected product file.
- [x] Inspect the pinned Core World parent and child-domain implementations.
- [x] Trace height, biome, flora, map, collision, rendering, reset, disposal, and tests.
- [x] Identify all domains, kits, adapters, and offered services.
- [x] Add a timestamped tracker and focused audits.
- [x] Change no runtime source or deployment configuration.
- [ ] Implement and validate feature/foundation adoption authority.

## Complete interaction loop

```txt
browser boot
  -> import Three.js 0.165.0
  -> import Nexus Engine at immutable commit 112de886...
  -> create airstream routes and Air Mail towns

Nexus composition
  -> create balloon telemetry engine
  -> install createCoreWorldDomain
  -> auto-install n:world:foundation
  -> auto-install n:world:features
  -> auto-install n:world:features:landform
  -> landform domain registers mountain type
  -> register WORLD.features.landforms
     -> northern-wall
     -> mountain
     -> 500m height
     -> path, width, sharpness, zones, cliff threshold, fidelity

visual construction
  -> create staged generated base world
  -> create local world-feature-foundation bridge
  -> compile open-above-global-foundation cell
  -> World Features compiles mountain contribution
  -> World Foundation resolves the cell
  -> create terrain, vegetation, grass, flowers, map, and gameplay sampling
     against the wrapper

first-frame fallback
  -> base generator status is working
  -> featureElevation returns 0
  -> terrain/map/collision-height users see only fallback base world
  -> first WebGL frame is presented

base generation
  -> height
  -> erosion
  -> flow
  -> climate
  -> biome
  -> base revision becomes ready

feature/foundation activation
  -> wrapper samples resolved mountain elevation
  -> world.sampleHeight becomes base + feature elevation
  -> biome and flora receive composed height
  -> map color receives local elevation-based rock tint
  -> generation-ready callback refreshes vegetation, grass, and flowers
  -> terrain observes base generation revision and rebuilds
  -> horizon and map update on their own consumer paths

steady flight
  -> balloon simulation samples terrainHeight for clearance
  -> mail and vegetation use terrain-height queries
  -> terrain near/horizon and flora sample composed world
  -> telemetry reports base generation state, compiled flag, and feature count
  -> no common feature/foundation adoption or visible-frame result exists

reset/dispose
  -> wrapper delegates reset/dispose to base world
  -> compiled global-cell flag remains local and unversioned
  -> no feature lifecycle recompile or artifact retirement result exists
```

## Domains in use

```txt
browser document, module loading, canvas, RAF, input, error projection, GameHost
balloon simulation, airstream routes/force/visuals, Air Mail, telemetry
Nexus Realtime resource and event publication
Core World identity, definitions, partitions, cells, surfaces, providers, effects, snapshots
World Foundation definitions, contributions, composition, sampling, cell resolution, snapshots
World Features type registry, semantic definitions, lifecycle, queries, composition, compile, samplers, snapshots
Landform Features mountain implementation and canyon/cliff/plateau contracts
product world-feature configuration and global-cell foundation bridge
staged base world generation, fallback sampling, progress, reset, disposal
terrain near/horizon streaming, LOD, refresh, and height queries
vegetation population and obstacle queries
grass/flower density, chunks, LOD, culling, exclusions, wind
parchment map cache, projection, routes, towns, marker, coloring
quality, dynamic resolution, sky, clouds, water, HDR, grading, lens
headless editor, static tests, Vite build, Pages deployment
missing world-feature/foundation adoption authority
```

## Kit census

```txt
local runtime/gameplay:             15
local balloon/object/presentation:  15
local visual/world/environment:     34
local UI:                            1
local tooling/proof:                 5
local source-backed total:          70
runtime-implied adapters:           12
pinned Core World surfaces:         17
current documented active total:    99
inactive/retired legacy:            12
planned feature/foundation parent:  15
```

## Local source-backed kits

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

### Visual, world, and environment

```txt
open-above-visual-domain
open-above-world-generation-kit
open-above-world-feature-foundation-kit
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
open-above-world-feature-foundation-test-kit
```

## Runtime-implied adapters

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

## Pinned Core World surfaces

```txt
n-world-domain
world-builder-runtime-kit
n-world-foundation-domain
foundation-definition-kit
foundation-composition-kit
foundation-sampling-kit
foundation-cell-resolution-kit
n-world-feature-domain
feature-registry-kit
feature-lifecycle-kit
feature-query-kit
feature-composition-kit
n-world-landform-feature-domain
mountain-feature-kit
canyon-feature-kit
cliff-feature-kit
plateau-feature-kit
```

## Offered services

```txt
Core World:
  world definitions
  partitions and stable cells
  surfaces and focus
  provider prepare/update/release lifecycle
  portable effect descriptors
  rollback-safe preparation
  snapshots, restoration, diagnostics, reset

World Foundation:
  foundation definitions
  bounded per-cell contributions
  ordered contribution composition
  elevation and arbitrary channel sampling
  resolved cell revisions
  cell provider creation
  snapshots and reset

World Features:
  feature-type registry
  semantic feature definitions
  lifecycle updates
  bounds-based queries
  ordered contribution composition
  feature and cell compilation
  type samplers
  snapshots and reset

Landform Features:
  mountain normalize, compile, sample, fidelity
  canyon, cliff, and plateau contracts

Product world-feature bridge:
  one global-cell compile
  staged feature-elevation gate
  base + foundation height
  biome/flora re-evaluation
  local map-color tint
  descriptor and base generation lifecycle proxy

Existing product services:
  balloon integration and presentation
  airstream route/sample/field/force/visual/debug
  mail parcel/route/town/volume/progress/snapshot/reset/disposal
  terrain streaming, vegetation, grass, flowers
  map, atmosphere, water, HDR, grading, lens, dynamic resolution
  headless inspection, checks, build, deployment
```

## Semantic mountain definition

```txt
id: northern-wall
type: mountain
seed: open-above-northern-wall
priority: 10
path: (-5200,4900) -> (0,5500) -> (5000,4700)
width: 2000
height: 500
sharpness: 2.8
variation: 0
cliffThreshold: 0.68
material zones: mountain-rock >= 180, mountain-summit >= 390
fidelity: near feature-mesh, middle foundation-field, far silhouette, collision foundation
```

## Compiler output and product adoption

```txt
elevation world-feature-field: consumed
material mountain-material-zones: not consumed
collision foundation-heightfield: not explicitly consumed
fidelity metadata: not consumed
cliffThreshold metadata: not consumed
```

The product map color is a local elevation tint rather than a material-channel adapter. Gameplay collision currently agrees only because it samples the composed terrain-height function.

## Source-backed findings

```txt
immutable Nexus Engine provider pin: implemented
Core World parent installation: implemented
Foundation child installation: implemented
Features child installation: implemented
Landform child installation: implemented
mountain feature type registration: implemented
semantic northern-wall registration: implemented
500m mountain contribution and sampler: implemented
base + foundation elevation composition: implemented
biome/flora composed-height propagation: implemented
feature-aware map tint: implemented
feature test in npm run check: implemented

rendered world registered with Core World parent: absent
partition/cell/provider lifecycle used by product world: absent
material-channel render adapter: absent
explicit collision-channel adapter and receipt: absent
near/middle/far fidelity adapters: absent
feature registry/lifecycle revision: absent
foundation cell revision in product state: absent
contribution/channel fingerprint: absent
lifecycle-triggered recompile: absent
atomic feature/foundation consumer adoption: absent
rollback after partial adoption: absent
first visible mountain frame acknowledgement: absent
real pinned-engine product integration fixture: absent
```

## Stale and failure path

```txt
boot compile
  -> local compiled=true
  -> global foundation cell resolved

feature registration or lifecycle changes later
  -> compiled remains true
  -> no recompile
  -> consumers retain predecessor artifact without stale result

base generation ready
  -> elevation begins applying through sampling
  -> consumers refresh separately

consumer preparation or rebuild fails
  -> no common adoption result
  -> no foundation/base rollback
  -> sampling, terrain, flora, map, and collision may expose mixed revisions
```

## Required parent domain

```txt
open-above-world-feature-foundation-adoption-authority-domain
```

This product authority should participate in the retained staged-world-generation scheduler/adoption authority.

## Required transaction

```txt
WorldFeatureCompileCommand
  -> bind runtime, Core World provider, world, base candidate, cell,
     feature registry, lifecycle, and expected foundation revisions
  -> compile bounded semantic features
  -> resolve elevation, material, collision, and metadata channels
  -> publish immutable ResolvedWorldFoundationArtifact

WorldFoundationAdoptionCommand
  -> bind base and foundation artifacts
  -> prepare terrain-near, terrain-horizon, vegetation, grass, flowers,
     map, and collision consumers
  -> apply fidelity by observation range
  -> collect typed channel and consumer receipts
  -> atomically commit base and foundation revisions
  -> preserve predecessor and dispose partial successor on failure
  -> publish WorldFeatureFoundationAdoptionResult
  -> acknowledge the first matching visible mountain frame
```

## Planned coordinating kits

```txt
open-above-world-feature-foundation-adoption-authority-domain
open-above-world-feature-compile-command-kit
open-above-world-feature-registry-revision-kit
open-above-foundation-cell-artifact-kit
open-above-foundation-channel-manifest-kit
open-above-foundation-elevation-adapter-kit
open-above-foundation-material-adapter-kit
open-above-foundation-collision-adapter-kit
open-above-landform-fidelity-plan-kit
open-above-world-feature-consumer-registry-kit
open-above-world-feature-adoption-plan-kit
open-above-world-feature-adoption-result-kit
open-above-world-feature-adoption-rollback-kit
open-above-first-visible-landform-frame-ack-kit
open-above-world-feature-foundation-fixture-gate-kit
```

## Validation boundary

The standard package check now includes `tests/world-feature-foundation.mjs`, but that test uses hand-written feature/foundation stubs. It proves wrapper math and delegation only. It does not instantiate the pinned engine, inspect actual contribution channels or revisions, register the rendered world with Core World, execute browser terrain/collision behavior, inject adoption failure, or inspect a visible frame.

Documentation only. No runtime, dependency, script, workflow, browser, build, Pages, lifecycle, collision, fidelity, rollback, or visible-frame behavior was changed or executed in this audit.
