# Project Breakdown: TheOpenAbove Pinned Provider Capability Contract Forwarding

**Timestamp:** `2026-07-14T01-39-09-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`  
**Branch:** `main`  
**Runtime revision reviewed:** `09bb6b95549d9480dfc2caa4517575ab4009ba98`  
**Prior repo-local documentation head:** `c06f9a7df59a605ac22619dbefef831d412d619a`  
**Pinned Nexus Engine provider:** `ea973811342fe3ba2a35bb018323d987d3fec4b5`  
**Status:** `pinned-provider-capability-contract-forwarding-authority-audited`

## Summary

The latest product commit changes only the immutable Nexus Engine import in `src/main.js`. The new provider revision repairs `createCoreCapabilityKit()` so Core capability domains forward their declared `domainPath`, `parentDomainPath`, `apiPath`, visibility, `requires`, `provides`, and custom `install` hook into `defineDomainServiceKit()`.

This is directly relevant to TheOpenAbove. `createWorldFeatureDomain()` declares `domainPath: n:world:features`, `parentDomainPath: n:world`, `requires: n:world`, and an install hook that publishes `engine.worldFeatures = engine.n.worldFeatures`. The prior provider wrapper discarded those fields. The new pin restores the intended contract boundary, but the product still has no real-provider fixture that proves the exact pinned module forwards those fields, composes one owner per capability, publishes aliases correctly, registers the authored feature set, and reaches the first matching visible world frame.

## Plan ledger

**Goal:** reconcile the provider-pin repair while defining one executable admission contract from immutable provider identity through Core World capability metadata, engine composition, authored feature registration, visual bootstrap, and visible-frame acknowledgement.

- [x] Enumerate all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Compare the nine eligible repositories with central ledgers and root `.agent` state.
- [x] Select only TheOpenAbove because commit `09bb6b9...` is newer than its recorded documentation head.
- [x] Inspect the one changed product file and the exact upstream provider commit.
- [x] Inspect `createCoreCapabilityKit`, `defineDomainServiceKit`, and `createWorldFeatureDomain` at the pinned revision.
- [x] Trace the complete browser, composition, world, flight, render, and failure loops.
- [x] Preserve all 100 active kit, adapter, and pinned Core World surfaces.
- [x] Record all offered services and the repaired capability-contract fields.
- [x] Define a provider capability-contract admission authority and fixture gate.
- [x] Change documentation only.
- [ ] Execute real-provider, browser, build, and Pages fixtures.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible after Cavalry exclusion: 9
central ledger entries: 9
root .agent states: 9
new eligible repositories: 0
central-ledger-missing repositories: 0
root-agent-missing repositories: 0
runtime-ahead repositories: 1
selected: LuminaryLabs-Publish/TheOpenAbove
prior documentation head: c06f9a7df59a605ac22619dbefef831d412d619a
reviewed runtime head: 09bb6b95549d9480dfc2caa4517575ab4009ba98
reconciled commits: 1
excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

## Reconciled commit

```txt
09bb6b95549d9480dfc2caa4517575ab4009ba98
fix(world): pin capability contract forwarding

changed:
  src/main.js

provider:
  previous: 112de886131c00121c36f004c257bd50ff122589
  current:  ea973811342fe3ba2a35bb018323d987d3fec4b5
```

## Upstream provider repair

The pinned Nexus Engine commit `ea973811342fe3ba2a35bb018323d987d3fec4b5` changes `createCoreCapabilityKit()` to forward:

```txt
domainPath
parentDomainPath
apiPath
visibility / apiVisibility
requires
provides
install
```

Those values are consumed by `defineDomainServiceKit()` to validate hierarchy, construct canonical capability tokens, preserve declared dependencies, reject API overwrite, register addressable APIs, and run product-specific install aliases.

For World Features, the repaired contract is:

```txt
id: n-world-feature-domain
domain: core-world-features
domainPath: n:world:features
parentDomainPath: n:world
apiName: worldFeatures
requires: n:world
services: definition, registry, lifecycle, query, composition, compile, snapshot
install: engine.worldFeatures = engine.n.worldFeatures
```

## Complete interaction loop

```txt
browser boot
  -> index.html loads src/main.js
  -> main.js imports Three.js 0.165.0
  -> main.js imports immutable Nexus Engine ea973811...
  -> createGame reads routes, campaign, world and authored landforms
  -> createBalloonTelemetryEngine defines telemetry resources, event and system
  -> createRealtimeGame receives explicit ordered kits
       Core World root with childDomains:false
       World Foundation
       World Features
       Landform Features
       Balloon Telemetry
  -> repaired provider preserves domain paths, dependencies, provides and install hooks
  -> engine composition validates capability graph and installs engine.n APIs
  -> World Features custom install publishes engine.worldFeatures alias
  -> product validates engine.n.worldFeatures.registerFeature
  -> authored landforms register sequentially
  -> visual domain receives worldFeatures and worldFoundation APIs
  -> staged world, terrain, vegetation, grass, flowers and map initialize
  -> balloon object, airstream, Air Mail, simulation, camera and presentation initialize
  -> initial zero-delta update and engine tick run
  -> canvas leaves aria-busy state
  -> RAF updates flight, mail, world presentation, render and telemetry

map-open path
  -> simulation, mail, airstream, world update and engine tick pause
  -> visual.render continues with zero dt
  -> map overlay remains interactive

failure path
  -> provider import, export, contract, composition, API, model or visual failure throws
  -> createGame rejects
  -> boot catches and projects fatal text
  -> no typed provider-admission, rollback, retry or retirement result exists

proof path
  -> npm run check executes fake-provider world-domain-composition smoke
  -> fake provider supplies handcrafted IDs, requires, provides and engine namespace
  -> product test does not import ea973811 or inspect actual capability metadata/install behavior
```

## Domains in use

```txt
browser document, ESM, canvas, accessibility, error projection, GameHost and RAF
immutable CDN provider resolution and provider revision identity
Nexus resource, event, system, runtime-kit and DSK composition
Core capability wrapper and DSK metadata forwarding
Core World root, world registry and child-domain policy
World Foundation definition, composition, sampling and cell resolution
World Features registry, lifecycle, query, compilation and snapshots
Landform mountain, canyon, cliff and plateau contracts
product feature descriptors and foundation bridge
balloon simulation and telemetry publication
airstream route, sampling, field, force, visual and debug
Air Mail parcel, route, town, delivery volume and progress
staged deterministic world generation, reset and disposal
near and horizon terrain streaming, LOD and height sampling
vegetation, grass, flowers, density, placement, culling and wind
quality, dynamic resolution, sky, clouds, water, HDR, grading and lens
procedural balloon object, rigging, material, animation and camera
parchment map, route/town projection, marker, resize and pause input
provider capability manifest, contract fingerprint and token ownership
feature-set registration, visual bootstrap and visible-frame provenance
source, headless, build, browser and Pages validation
```

## Kit and service census

```txt
local runtime and gameplay kits:   15
balloon object/presentation kits:  15
visual/world/environment kits:     34
UI kits:                            1
tooling and proof kits:             6
local source-backed total:         71
runtime-implied adapters:          12
pinned Core World surfaces:        17
current active total:             100
inactive or retired legacy:        12
planned provider-contract surfaces: 23
```

The provider pin changes no product kit count. It repairs the contract semantics used by the 17 pinned Core World surfaces.

## Complete kit and service inventory

### Runtime and gameplay

```txt
open-above-balloon-simulation-kit -> flight state, input integration, terrain clearance, transform application and snapshots
open-above-balloon-telemetry-kit -> Nexus resources/events, simulation telemetry, visual telemetry, explicit world composition and readback
open-above-airstream-domain -> route, sampler, field, force, visual and debug composition
open-above-airstream-route-kit -> authored route descriptors and defaults
open-above-airstream-sampler-kit -> nearest-route sampling and local wind evaluation
open-above-airstream-field-kit -> route influence blending and wind-field state
open-above-airstream-balloon-force-kit -> sampled-wind drift and lift
open-above-airstream-visual-kit -> visible airstream ribbons and animation
open-above-airstream-debug-kit -> airstream inspection and diagnostics
open-above-mail-delivery-domain -> parcel, route, town, volume and progress composition
open-above-mail-parcel-kit -> parcel state, messages and delivery status
open-above-mail-route-kit -> delivery route and town sequence descriptors
open-above-delivery-volume-kit -> spatial delivery admission volumes
open-above-delivery-progress-kit -> completion, progress and event reporting
open-above-mail-town-kit -> town descriptors and presentation anchors
```

### Balloon object and presentation

```txt
open-above-hot-air-balloon-object-kit -> complete procedural balloon loading and lifecycle
open-above-balloon-envelope-profile-kit -> envelope silhouette and proportions
open-above-balloon-envelope-panel-kit -> continuous panel and gore geometry
open-above-balloon-mouth-kit -> envelope mouth geometry and attachment
open-above-balloon-streamer-fit-kit -> streamer fitting and motion anchors
open-above-balloon-fabric-seam-kit -> fabric seam geometry and detailing
open-above-hot-air-balloon-basket-kit -> basket geometry and attachment points
open-above-hot-air-balloon-rigging-kit -> ropes, suspension and burner rig
open-above-hot-air-balloon-burner-kit -> burner geometry and flame state
open-above-rope-kit -> segmented soft-rope construction and updates
open-above-balloon-presentation-domain -> balloon visual pose and state projection
open-above-envelope-fabric-material-kit -> envelope surface material
open-above-basket-material-kit -> basket surface material
open-above-balloon-camera-rig-kit -> follow, orbit, first-person camera and zoom
open-above-clipping-fade-kit -> camera-near clipping fade
```

### Visual, world and environment

```txt
open-above-visual-domain -> renderer, camera, world, terrain, flora, atmosphere and post-stack composition
open-above-world-generation-kit -> deterministic staged generation, progress, descriptor, reset and disposal
open-above-world-feature-foundation-kit -> Core World feature-to-foundation bridge
open-above-quality-tier-kit -> quality profile selection and budgets
open-above-dynamic-resolution-kit -> frame-cost-driven render scale
open-above-physical-sky-kit -> procedural physical sky
open-above-sun-light-kit -> sun direction, lighting and shadow state
open-above-aerial-perspective-kit -> distance haze and atmospheric depth
open-above-cloud-weather-map-kit -> procedural cloud weather field
open-above-volumetric-cloud-kit -> cloud volume rendering
open-above-cloud-lod-kit -> cloud quality and distance policy
open-above-cloud-lighting-kit -> cloud illumination and scattering
open-above-terrain-surface-kit -> terrain descriptor and height surface
open-above-terrain-streaming-contract-kit -> chunk lifecycle and streaming contract
open-above-terrain-chunk-streaming-kit -> near-terrain activation and release
open-above-terrain-horizon-streaming-kit -> distant horizon generation
open-above-vegetation-cluster-kit -> deterministic vegetation clusters
open-above-grass-world-seed-kit -> deterministic seed normalization, hashing and random stream
open-above-grass-biome-density-kit -> biome-scale grass density
open-above-grass-exclusion-mask-kit -> route, town and protected-area exclusion
open-above-grass-patch-density-kit -> local patch density modulation
open-above-grass-texture-atlas-kit -> procedural grass texture variants
open-above-grass-chunk-placement-kit -> deterministic chunk candidates and placement
open-above-grass-lod-kit -> grass distance and budget policy
open-above-grass-compute-culling-kit -> visibility and budget culling
open-above-grass-field-domain -> grass generation, streaming, wind and rendering
open-above-flower-chunk-placement-kit -> deterministic flower placement
open-above-flower-texture-atlas-kit -> procedural flower texture variants
open-above-flower-field-domain -> flower generation, streaming and rendering
open-above-water-surface-kit -> water material and surface projection
open-above-distant-landmark-kit -> distant landmark descriptors and meshes
open-above-hdr-composer-kit -> HDR composition and luminance pipeline
open-above-color-grade-kit -> exposure and color grading
open-above-lens-response-kit -> bloom, glare and lens response
```

### UI

```txt
open-above-parchment-map-overlay-kit -> map shell, world cache, route/town drawing, player marker, resize and open/close state
```

### Tooling and proof

```txt
open-above-headless-editor-environment -> project, renderer and world validation capabilities
open-above-static-smoke-test-kit -> required-file, import and structural smoke coverage
open-above-airstream-mail-test-kit -> airstream and Air Mail behavior proof
open-above-world-flora-test-kit -> deterministic world, grass and flower proof
open-above-world-feature-foundation-test-kit -> Core World feature/foundation bridge proof
open-above-world-domain-composition-test-kit -> explicit factory order and API guard with a fake provider
```

### Runtime-implied adapters

```txt
open-above-route-shell-kit -> page and canvas shell
open-above-importmap-kit -> Three.js module resolution
open-above-runtime-composer-kit -> createGame boot composition
open-above-keyboard-input-kit -> burner, movement and map keyboard input
open-above-wheel-zoom-input-kit -> camera zoom input
open-above-parchment-map-shell-kit -> modal map DOM and accessibility shell
open-above-error-panel-kit -> fatal startup error projection
open-above-gamehost-legacy-readback-kit -> public browser diagnostics
open-above-nexusengine-cdn-adapter-kit -> immutable Nexus Engine CDN import
open-above-campaign-source-kit -> campaign, region and world descriptors
open-above-raf-clock-adapter-kit -> browser frame scheduling and delta clamp
open-above-pages-deploy-kit -> static GitHub Pages publication
```

### Pinned Core World surfaces and repaired services

```txt
n-world-domain -> Core World root, world registry and child-domain policy
world-builder-runtime-kit -> world builder lifecycle and composition
n-world-foundation-domain -> canonical n:world:foundation service namespace
foundation-definition-kit -> foundation definitions
foundation-composition-kit -> contribution composition
foundation-sampling-kit -> foundation sampling
foundation-cell-resolution-kit -> cell-level resolution
n-world-feature-domain -> canonical n:world:features namespace, registry and legacy alias install
feature-registry-kit -> feature type and feature registration
feature-lifecycle-kit -> activation, update and release lifecycle
feature-query-kit -> feature lookup and filtering
feature-composition-kit -> compiled contributions and samplers
n-world-landform-feature-domain -> landform feature namespace and dependency on World Features
mountain-feature-kit -> mountain descriptor and sampler contract
canyon-feature-kit -> canyon descriptor and sampler contract
cliff-feature-kit -> cliff descriptor and sampler contract
plateau-feature-kit -> plateau descriptor and sampler contract
```

Repaired provider-level services for these domains:

```txt
canonical domainPath forwarding
parent-domain hierarchy forwarding
apiPath forwarding
public/private visibility forwarding
requires dependency forwarding
provides capability forwarding
custom install-hook forwarding
DSK validation and canonical token generation
engine.n API overwrite rejection
legacy alias/addressability installation
```

## Source-backed findings

### The provider pin targets the correct upstream defect

The latest product commit pins the exact Nexus Engine revision whose only change forwards Core capability contract fields. This is the smallest product-side change that makes the explicit Core World composition consume the repaired provider.

### The previous provider could erase declared domain semantics

`createWorldFeatureDomain()` passed domain hierarchy, dependency, and install information into `createCoreCapabilityKit()`. Before `ea973811...`, the wrapper did not pass those fields to `defineDomainServiceKit()`. The resulting kit could therefore diverge from its declared canonical path, dependency graph, capability tokens, visibility, and alias-install behavior.

### The fake-provider smoke cannot prove the repair

`tests/world-domain-composition.mjs` constructs plain objects with hand-authored IDs, requires, provides, and a handcrafted `engine.n.worldFeatures`. It does not import the pinned provider or inspect `metadata.domainPath`, `metadata.parentDomainPath`, `metadata.apiPath`, visibility, generated provides, requires, custom install execution, API addressability, or overwrite rejection.

### Provider revision is not admitted as a runtime result

The immutable SHA exists only inside the static import URL. No manifest, runtime fingerprint, `ProviderAdmissionResult`, or public readback binds the active provider revision to the composed domain graph and rendered world.

### Feature registration remains sequential and non-transactional

The product calls `registerFeature()` once per authored feature after engine creation. There is no complete-set validation, expected registry revision, duplicate policy, rollback, aggregate result, or feature-set fingerprint.

### Visible world frames carry no provider or contract provenance

The RAF renders after startup, but the frame has no provider revision, contract fingerprint, composition revision, feature registry revision, foundation revision, or first-frame acknowledgement.

## Required parent domain

```txt
open-above-pinned-provider-capability-contract-admission-authority-domain
```

## Required transaction

```txt
PinnedProviderCapabilityAdmissionCommand
  -> bind provider URL, immutable revision, host generation and expected predecessor
  -> import the provider and validate required exports
  -> instantiate Core World, Foundation, Features and Landforms without adopting them
  -> inspect each real kit's id, metadata, domainPath, parentDomainPath and apiPath
  -> inspect visibility, requires, provides, services and custom install hook
  -> validate canonical tokens, parent hierarchy and unique ownership
  -> compose a candidate engine with childDomains:false
  -> prove engine.n APIs and legacy aliases point to the same accepted capability
  -> register and fingerprint the complete authored landform set
  -> publish ProviderCapabilityContractResult and FeatureSetRegistrationResult
  -> bind visual bootstrap to provider, composition, registry and foundation revisions
  -> acknowledge FirstProviderContractWorldFrameAck
  -> otherwise reject, retire partial resources and preserve the predecessor
```

## Planned authority surfaces

```txt
open-above-pinned-provider-capability-contract-admission-authority-domain
open-above-provider-revision-manifest-kit
open-above-provider-export-probe-kit
open-above-core-capability-contract-manifest-kit
open-above-domain-path-forwarding-proof-kit
open-above-parent-domain-path-forwarding-proof-kit
open-above-api-path-forwarding-proof-kit
open-above-api-visibility-forwarding-proof-kit
open-above-requires-forwarding-proof-kit
open-above-provides-forwarding-proof-kit
open-above-install-hook-forwarding-proof-kit
open-above-canonical-token-ownership-proof-kit
open-above-domain-api-addressability-proof-kit
open-above-core-world-candidate-kit
open-above-world-foundation-candidate-kit
open-above-world-features-candidate-kit
open-above-landform-features-candidate-kit
open-above-telemetry-candidate-kit
open-above-provider-contract-fingerprint-kit
open-above-provider-capability-contract-result-kit
open-above-feature-set-registration-result-kit
open-above-visual-bootstrap-contract-admission-kit
open-above-first-provider-contract-world-frame-ack-kit
```

## Validation boundary

```txt
documentation-only audit: yes
runtime source changed by audit: no
test source changed by audit: no
package/dependency/workflow/deployment changed by audit: no
branch created: no
pull request created: no

full latest product commit inspected: yes
exact upstream provider commit inspected: yes
core capability wrapper inspected: yes
DSK definition and validation inspected: yes
World Features domain inspected: yes
main boot inspected: yes
fake-provider test inspected: yes
package wiring inspected: yes
combined status checks reported: none
local clone/test attempt: failed because the execution environment could not resolve github.com
npm run check: not run
npm run build: not run
headless world check: not run
real-provider fixture: unavailable
browser fixture: not run
Pages fixture: not run
```

No real-provider contract parity, unique ownership, alias correctness, transactional feature registration, visible-frame convergence, source/build/Pages parity, or production-readiness claim is made.