# Project Breakdown: TheOpenAbove Core World Feature/Foundation Adoption

**Run:** `2026-07-13T18-40-52-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`  
**Branch:** `main`  
**Runtime revision reviewed:** `bde5e6f5ca660715d2c1b4592d508431e89587cd`  
**Status:** `core-world-feature-foundation-adoption-authority-audited`

## Summary

TheOpenAbove now pins Nexus Engine at `112de886131c00121c36f004c257bd50ff122589`, installs Core World with its Foundation, Features, and Landform child domains, registers a semantic `northern-wall` mountain, and composes a 500 metre elevation field into the generated world.

The integration is real but partial. The product bridge compiles one global foundation cell and consumes only elevation. Core World material and collision channels, feature fidelity, lifecycle, queries, cell revisions, snapshots, and parent world/provider coordination are not adopted by terrain, map, collision, or diagnostics. Consumers rebuild from the base generation revision without a feature/foundation revision or first-visible mountain acknowledgement.

## Plan ledger

**Goal:** preserve the new 500 metre mountain while making semantic feature compilation, resolved foundation channels, consumer adoption, rollback, and visible proof one revision-bound transaction.

- [x] Compare all ten current `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger entries and root `.agent` state.
- [x] Select only `LuminaryLabs-Publish/TheOpenAbove` because runtime commit `bde5e6f5ca660715d2c1b4592d508431e89587cd` is newer than its central and repo-local documentation.
- [x] Inspect the pinned Core World, Foundation, Features, Landform, and mountain services.
- [x] Inspect the product feature configuration, telemetry composition, local bridge, visual consumers, test, and package gate.
- [x] Identify the complete interaction loop, domains, kits, and offered services.
- [x] Add a new timestamped tracker, turn ledger, and focused audit family.
- [x] Refresh required root `.agent` documents and the machine registry.
- [x] Prepare central ledger and internal change-log synchronization.
- [x] Use only `main`; create no branch or pull request.
- [ ] Implement feature/foundation revision adoption and executable browser proof.

## Selection comparison

```txt
Publish repositories: 10
Eligible after Cavalry exclusion: 9
Central ledger entries: 9
Root .agent folders: 9
New or ledger-missing eligible repositories: 0
Root-agent-missing eligible repositories: 0
Runtime-ahead repositories selected this run: 1
Selected: LuminaryLabs-Publish/TheOpenAbove
Reason: feat(world): add foundation-backed 500m mountain
Excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

Current Publish inventory:

```txt
AetherVale
HorrorCorridor
IntoTheMeadow
MyCozyIsland
PhantomCommand
PrehistoricRush
TheCavalryOfRome  [excluded]
TheOpenAbove      [selected]
TheUnmappedHouse
ZombieOrchard
```

## Complete interaction loop

```txt
browser boot
  -> import Three.js 0.165.0
  -> import Nexus Engine at immutable commit 112de886...
  -> create routes and mail towns

Nexus composition
  -> create telemetry engine
  -> install Core World
  -> auto-install World Foundation
  -> auto-install World Features
  -> auto-install Landform Features
  -> landform domain registers mountain feature type
  -> register WORLD.features.landforms
     -> northern-wall mountain
     -> path, width, 500m height, material zones, fidelity

visual construction
  -> create staged generated base world
  -> create local World Feature Foundation bridge
  -> compile one global foundation cell
  -> create terrain, vegetation, grass, flowers, map and collision sampling
     against the bridge

first-frame fallback
  -> base generation status is working
  -> featureElevation returns 0
  -> initial terrain/map/collision omit the mountain
  -> first WebGL frame is presented

staged base generation
  -> height
  -> erosion
  -> flow
  -> climate
  -> biome
  -> base revision becomes ready

feature/foundation activation
  -> bridge samples resolved mountain elevation
  -> terrain height becomes base + foundation elevation
  -> biome and flora receive the composed height
  -> map color receives a local rock tint
  -> base ready subscription refreshes vegetation, grass and flowers
  -> terrain refresh follows the base generation revision
  -> WebGL and map later display the successor shape

steady state
  -> balloon simulation and gameplay collision sample terrainHeight
  -> terrain near/horizon, flora and map sample the wrapper
  -> telemetry publishes base generation state plus compiled/count flags
  -> no common feature/foundation adoption or visible-frame result exists
```

## Domains in use

```txt
browser document, module loading, canvas, RAF, input, error projection and GameHost
balloon simulation, airstream, Air Mail and telemetry
Nexus Realtime resource/event publication
Core World parent identity, cells, providers, surfaces and snapshots
World Foundation definition, contribution, composition, sampling and cell resolution
World Features registry, lifecycle, query, composition, compile and snapshots
Landform Features mountain compiler plus canyon/cliff/plateau contracts
product world-feature configuration and local global-cell foundation bridge
staged base world generation, fallback, reset and disposal
terrain near/horizon streaming and collision-height sampling
vegetation, grass and flowers
parchment map cache and coloring
sky, clouds, water, HDR, grading, lens and dynamic resolution
headless editor, static tests, Vite and Pages
missing world-feature/foundation adoption authority
```

## Kit census

```txt
local runtime/gameplay kits:             15
local balloon/object/presentation kits:  15
local visual/world/environment kits:     34
local UI kits:                            1
local tooling/proof kits:                 5
local source-backed total:               70
runtime-implied product adapters:        12
pinned Core World service surfaces:      17
current documented active surfaces:      99
inactive/retired legacy surfaces:        12
planned feature/foundation authority:    15
```

## New and directly affected kits

```txt
open-above-balloon-telemetry-kit
  -> installs Core World and registers configured semantic features

open-above-world-feature-foundation-kit
  -> compiles one global feature cell
  -> adds foundation elevation to generated terrain
  -> recomputes biome/flora from composed height
  -> tints map color
  -> proxies base generation lifecycle

open-above-world-feature-foundation-test-kit
  -> checks fallback gating, +500m elevation, biome/flora response,
     map tint, descriptor identity, reset and disposal delegation
```

## Pinned Nexus Engine Core World surfaces

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
  world definition, partition, cell, surface, effects, provider lifecycle,
  builder composition, snapshots, diagnostics and reset

World Foundation:
  definitions, bounded contributions, ordered composition, elevation/channel
  sampling, per-cell resolution, snapshots and reset

World Features:
  type registry, semantic definitions, lifecycle, bounds queries, ordered
  composition, cell compilation, samplers, snapshots and reset

Landform Features:
  mountain normalization, compile, sample and fidelity
  canyon, cliff and plateau contracts

Product bridge:
  global-cell compilation, staged elevation activation, composed height,
  biome/flora re-evaluation, map tint, generation-state proxy and disposal

Existing product:
  balloon flight, airstreams, mail, telemetry, terrain streaming, vegetation,
  grass, flowers, map, atmosphere, HDR, headless inspection and deployment
```

## Source-backed findings

```txt
immutable Nexus Engine pin: implemented
Core World installation: implemented
Foundation, Features and Landform child installation: implemented
semantic northern-wall registration: implemented
mountain compiler and 500m sampler: implemented
base + foundation elevation composition: implemented
biome/flora height propagation: implemented
feature-aware map tint: implemented
feature test wired into npm run check: implemented

Core World parent world registration: absent
Core World cell/provider lifecycle adoption: absent
foundation material-channel adoption: absent
foundation collision-channel receipt: absent
feature fidelity consumer: absent
feature/foundation revision in generation state: absent
feature lifecycle invalidation/recompile: absent
resolved contribution/channel fingerprint: absent
atomic feature/foundation consumer adoption: absent
rollback after partial feature adoption: absent
first visible mountain frame acknowledgement: absent
real pinned-engine integration fixture: absent
```

## Main architecture gap

`createCoreWorldDomain()` is installed, but the rendered world is not registered through `engine.n.coreWorld`. The product bridge calls the child feature/foundation APIs directly, compiles one global cell, and then samples only the resolved elevation channel.

The mountain compiler also emits material and collision channels and carries near/middle/far/collision fidelity requirements. None of those descriptors are admitted by a common product transaction. The map uses a local color heuristic, terrain uses generic heightfield chunks at every range, and collision has no descriptor/revision receipt.

## Required parent domain

```txt
open-above-world-feature-foundation-adoption-authority-domain
```

## Required transaction

```txt
WorldFeatureCompileCommand
  -> bind runtime, Core World provider, base candidate and feature-registry revisions
  -> bind world, partition/cell, feature IDs, lifecycle and configuration fingerprint
  -> compile bounded feature contributions
  -> resolve elevation, material, collision and metadata channels
  -> publish immutable ResolvedWorldFoundationArtifact

WorldFoundationAdoptionCommand
  -> validate base and resolved-foundation revisions
  -> prepare near terrain, horizon, vegetation, flora, map and collision consumers
  -> apply declared feature fidelity by range
  -> collect typed per-channel and per-consumer receipts
  -> atomically commit base world and foundation revisions
  -> roll back incomplete successor resources
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

`npm run check` now includes `tests/world-feature-foundation.mjs`. That test uses stubs rather than the pinned Nexus Engine implementation. It does not instantiate Core World, compile the real mountain contribution, inspect material/collision channels, verify parent world/cell state, render terrain, execute collision, or prove a visible mountain frame.

No runtime source changed in this audit. No browser, build, Pages, collision, fidelity, feature-lifecycle, rollback, or visible-frame fixture was executed.
