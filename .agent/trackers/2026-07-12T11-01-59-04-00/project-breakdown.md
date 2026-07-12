# Project Breakdown: TheOpenAbove

**Timestamp:** `2026-07-12T11-01-59-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`  
**Branch:** `main`  
**Source revision reviewed:** `f24e1b11063a566ff011168ffd89a0609f21328c`

## Summary

The recent world-grid cutover adds one seeded 257 x 257 terrain/climate grid, erosion and flow fields, five grass species, five flower types, terrain-color sampling and a cached parchment-map background. The implementation is deterministic for sampled coordinates, but world construction, cache mutation, surface membership and consumer commit are not authoritative.

The most concrete defect is observer-induced state mutation. `sampleMapColor()` reaches `sampleFlora()`, which reaches `featureCellAt()`, which inserts into a mutable cache. `getDescriptor()` exposes that cache size. Creating or querying the map therefore changes later snapshots without changing the world seed, configuration, player or mission.

## Plan ledger

**Goal:** make one immutable, bounded and fingerprinted world build feed terrain, grass, flowers, vegetation, landmarks and map projection through pure queries and typed consumer receipts.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Select only `TheOpenAbove` because nineteen-plus world/grass/flower/map source commits landed after its previous central audit.
- [x] Trace world construction, terrain integration, grass and flower chunk generation, map caching, snapshots and tests.
- [x] Identify the complete interaction loop.
- [x] Identify all active domains.
- [x] Reconcile all 67 active source-backed kit surfaces and their services.
- [x] Define the missing world-generation and consumer-coherence authority.
- [x] Add timestamped architecture, render, gameplay, interaction, world, grass and deployment audits.
- [x] Refresh required root `.agent` state and the machine registry.
- [x] Push directly to `main`; create no branch or pull request.
- [ ] Implement the authority and executable browser/Pages fixtures.

## Selection

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or central-ledger-missing repositories: 0
root-.agent-missing repositories: 0

selected: TheOpenAbove
reason: substantial world-generation, terrain, grass, flower and map source landed after the 09:02 audit
excluded: TheCavalryOfRome
```

Only `LuminaryLabs-Publish/TheOpenAbove` was modified in the Publish organization.

## Interaction loop

```txt
boot
  -> create visual domain
  -> synchronously construct seeded world grid
  -> allocate height, moisture, temperature, fertility, protection and flow arrays
  -> run six erosion passes and flow accumulation sort
  -> create terrain, vegetation, grass, flowers and map consumers
  -> synchronously rasterize 96 x 96 parchment world background
  -> load balloon and create gameplay owners
  -> start RAF

frame
  -> update simulation, mail and airstream
  -> update terrain streamers
  -> move grass and flower chunk windows around camera
  -> generate missing chunk candidates from terrain and world flora queries
  -> render HDR frame
  -> expose world descriptor, grass state and flower state through snapshot

map construction/read
  -> sample thousands of world colors
  -> sample flora and feature cells
  -> populate mutable feature-cell cache
  -> change getDescriptor().cachedFeatureCells
```

## Domains in use

```txt
browser shell, semantic HTML, canvas and parchment overlay
runtime boot, startup failure, RAF and public host
balloon simulation, steering, airstream and mail delivery
seeded world build, erosion, climate, biomes, flora and map colors
world-surface membership and legacy-anchor protection
terrain near/horizon streaming and terrain color projection
vegetation, landmarks, grass and flower chunk streaming
quality, dynamic resolution, HDR composition and lens response
map background caching and navigation projection
telemetry, snapshots, headless inspection, checks, build and Pages deployment
```

## Active kit census

```txt
runtime/gameplay: 15
balloon/object/presentation: 15
visual/world/environment: 32
UI: 1
tooling/proof: 4
active source-backed total: 67
runtime-implied adapters: 12
inactive/retired legacy: 12
```

## New or materially changed kits

```txt
open-above-world-generation-kit
  seeded grid construction, erosion, flow, climate, biome, flora and map-color queries

open-above-grass-patch-density-kit
  world-flora profile adapter and density sampling

open-above-grass-texture-atlas-kit
  five-species procedural atlas

open-above-flower-chunk-placement-kit
  quality budgets, deterministic candidate placement, fade/cull constants

open-above-flower-texture-atlas-kit
  five-type procedural flower atlas

open-above-flower-field-domain
  chunk streaming, instanced geometry, shader sway, state and disposal

open-above-world-flora-test-kit
  independent world, protected-anchor, species, patch and map-color checks
```

## Main findings

### World reads mutate observable state

```txt
sampleMapColor
  -> sampleFlora
  -> sampleBiome
  -> featureCellAt
  -> featureCells.set(...)

getDescriptor
  -> cachedFeatureCells: featureCells.size
```

Identical seed/config/player state can therefore produce different snapshots depending on which locations were queried and whether the map background was constructed.

### Startup work has no authority

World construction performs large synchronous allocations, six erosion passes, a full flow sort and map raster sampling before the first gameplay frame. There is no build ID, stage result, progress, cancellation, budget, reusable artifact or terminal failure result.

### Membership differs by consumer

Terrain applies `worldSurface.edgeMask()`. World grid sampling clamps outside coordinates to the border. Grass and flowers follow camera chunks and do not receive a world-surface membership service. The same coordinate can therefore be edge-floor terrain while still receiving clamped climate, unbounded feature-cell identity and flora candidates.

### Consumer proof is absent

Terrain, grass, flowers, vegetation, landmarks and map all call the world independently. No consumer cites a shared world revision or fingerprint, and no rendered frame acknowledges which build produced its terrain/flora/map data.

## Required parent domain

```txt
open-above-procedural-world-generation-authority-domain
```

Required services:

```txt
immutable build plan and seed/config/anchor fingerprints
build ID, revision, stage results, progress, budget and cancellation
canonical grid artifact and artifact fingerprint
pure sample queries and typed sample results
bounded membership and explicit out-of-bounds policy
non-observable feature-cell cache policy
consumer IDs, admission and receipts
terrain/grass/flower/vegetation/landmark/map parity result
visible-frame acknowledgement and journal
independent-build, cache-purity, membership, startup-budget, browser and Pages fixtures
```

## Required invariants

```txt
same seed/config/anchors -> same artifact fingerprint
queries never change the authoritative world descriptor
outside-world coordinates return one declared policy
all consumers cite one world build revision
terrain and flora membership agree at every sampled coordinate
map construction cannot mutate gameplay-visible world state
first visible frame acknowledges the committed world build
stale consumer results cannot commit after rebuild/disposal
```

## Validation boundary

Documentation only. Runtime source, dependencies, scripts, gameplay, rendering and deployment were not changed by this audit. Existing tests prove deterministic sampled values and local grass/flower properties, but not cache purity, startup budget, outside-disk parity, cross-consumer fingerprints or visible-frame provenance.