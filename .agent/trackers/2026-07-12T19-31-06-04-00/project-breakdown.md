# Project Breakdown: TheOpenAbove

**Timestamp:** `2026-07-12T19-31-06-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`  
**Branch:** `main`  
**Runtime revision reviewed:** `c2b96fa4d0dc44f6f3cf52762834324e712ed7d9`

## Summary

The runtime builds one boot-time tree field, then creates grass and flower domains from the returned `treePositions` and `clusters`. Each flora consumer constructs its own private exclusion index and never binds it to a vegetation generation. Camera-relative chunk rebuilds therefore have no proof that visible grass, flowers and trees share one current ownership set.

## Plan ledger

**Goal:** document the complete runtime and define a shared, revisioned flora-exclusion artifact before planned vegetation replacement can produce stale overlaps or mixed visible generations.

- [x] Compare the full ten-repository Publish inventory against nine central ledgers.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm no eligible repository is new or central-ledger-missing.
- [x] Select only `TheOpenAbove` by the oldest eligible timestamp.
- [x] Trace boot, frame, vegetation construction, flora chunk rebuild and render loops.
- [x] Identify all active domains.
- [x] Reconcile all 68 source-backed kits and offered services.
- [x] Trace grass and flower exclusion differences and missing revision boundaries.
- [x] Define the parent domain, candidate kits, transaction, invariants and fixture gates.
- [x] Refresh required root `.agent` files and add timestamped audits.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Implement runtime authority and executable proof.

## Selection

```txt
TheOpenAbove       2026-07-12T17-41-25-04-00 selected
IntoTheMeadow      2026-07-12T17-58-43-04-00
PhantomCommand     2026-07-12T18-11-53-04-00
PrehistoricRush    2026-07-12T18-18-59-04-00
HorrorCorridor     2026-07-12T18-38-51-04-00
ZombieOrchard      2026-07-12T18-48-07-04-00
MyCozyIsland       2026-07-12T19-00-22-04-00
TheUnmappedHouse   2026-07-12T19-11-01-04-00
AetherVale         2026-07-12T19-21-29-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/TheOpenAbove` was modified in the Publish organization.

## Interaction loop

```txt
boot
  -> create visual domain
  -> create world and terrain
  -> create boot-time vegetation clusters
  -> produce treePositions and clusters
  -> construct grass private obstacle/proximity indexes
  -> construct flower private obstacle index
  -> create HDR composer and start RAF

frame
  -> update simulation, airstream and mail
  -> update camera and terrain
  -> grass rebuilds rounded camera chunks when center changes
  -> flowers rebuild rounded camera chunks when center changes
  -> both use construction-time vegetation snapshots
  -> render HDR frame
  -> publish grass/flower counts without exclusion provenance

replacement edge
  -> planned world/quality/vegetation replacement changes tree ownership
  -> no shared exclusion artifact invalidates flora consumers
  -> stale chunks or indexes can remain visible
```

## Domains in use

```txt
browser shell, canvas, map, fatal projection and public host
runtime boot, session, input, RAF and telemetry
balloon simulation, steering, burner, vent and altitude
airstream route, field, force, visual and debug
mail parcel, town, delivery volume and progress
seeded world build, erosion, climate, biome, flora and disk membership
terrain near/horizon streaming and resource ownership
vegetation cluster generation and direct scene insertion
grass and flower density, exclusions, chunk placement, LOD, culling and wind
balloon object, materials, rigging, camera and secondary presentation
quality, dynamic resolution, sky, sun, clouds, water, HDR and lens response
parchment map, headless inspection, tests, build and Pages
missing flora-exclusion artifact authority
```

## Active kit census

```txt
runtime/gameplay: 15
balloon/object/presentation: 15
visual/world/environment: 33
UI: 1
tooling/proof: 4
active source-backed total: 68
runtime-implied adapters: 12
inactive/retired legacy: 12
```

## All active source-backed kits

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

### UI and tooling

```txt
open-above-parchment-map-overlay-kit
open-above-headless-editor-environment
open-above-static-smoke-test-kit
open-above-airstream-mail-test-kit
open-above-world-flora-test-kit
```

## Offered services

```txt
runtime/gameplay:
  flight input and integration
  airstream route/field/force/visual/debug
  mail parcel/town/volume/progress/reset
  telemetry and snapshots

balloon/object/presentation:
  profile, shell, panel, mouth, seam and basket construction
  rigging, burner, rope and deferred model loading
  materials, secondary motion, camera and clipping

world/environment:
  seeded grid, protected anchors, erosion, flow, climate and biomes
  flora, disk membership and map-color queries
  near/horizon terrain frames, geometry, skirts and disposal
  tree clusters, instances and tree-position records
  grass/flower density, atlases, local exclusions, chunk placement, LOD, culling and wind
  sky, sun, aerial perspective, clouds, water, HDR, grading and lens response

UI/tooling:
  parchment-map lifecycle and projection
  headless inspection
  source, terrain, route, overlay, airstream, mail and flora checks
  build and Pages adaptation
```

## Main findings

### Private exclusion snapshots

Grass builds a private 36-unit cell map from `treePositions` and captures cluster geometry for `treeProximityAt()`. Flowers separately build another 36-unit cell map from the same boot array.

### Unversioned policy divergence

Grass excludes within `tree.radius`; flowers exclude within `tree.radius + 1.2`. The difference is embedded in consumer code rather than one authored and fingerprinted policy.

### Coordinate-only chunk identity

Grass and flower chunk metadata records coordinates, counts and grass LOD, but no world, vegetation, exclusion, quality or candidate generation.

### No replacement transaction

Visual update order is terrain, grass, flowers. Each consumer directly removes and adds live geometry. No detached paired candidate set, atomic adoption, last-good rollback, stale-result rejection or first matching visible-frame acknowledgement exists.

## Required parent domain

```txt
open-above-flora-exclusion-artifact-authority-domain
```

## Required services

```txt
vegetation generation identity
central authored exclusion policy
immutable tree and cluster spatial artifact
artifact revision and fingerprint
consumer and chunk generations
input fingerprints and admission
consumer-specific adapters
paired detached candidate results
cross-consumer validation
atomic paired adoption and last-good rollback
stale-result rejection and exact retirement
bounded observations and journal
first visible flora-exclusion frame acknowledgement
source, browser, build and Pages fixtures
```

## Validation boundary

Documentation only. Runtime source, dependencies, scripts, gameplay, rendering and deployment were not changed. Existing tests do not prove vegetation replacement invalidation, shared exclusion revisions, no-overlap parity, paired rollback or visible-frame provenance.