# Current Audit: TheOpenAbove

**Last aligned:** `2026-07-12T19-31-06-04-00`  
**Status:** `flora-exclusion-artifact-coherence-authority-audited`  
**Runtime revision reviewed:** `c2b96fa4d0dc44f6f3cf52762834324e712ed7d9`

## Summary

The current flora stack has no canonical vegetation-exclusion artifact. Grass and flowers independently copy boot-time tree records into private spatial indexes, use different exclusion behavior, and rebuild camera-relative chunks without checking which vegetation generation those indexes represent.

## Plan ledger

**Goal:** define one immutable vegetation-exclusion artifact and require grass and flower chunk candidates to cite and admit its current revision before visible adoption.

- [x] Compare the current Publish inventory with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `TheOpenAbove` by the oldest eligible central timestamp.
- [x] Inspect visual construction order, vegetation output, grass and flower obstacle queries, chunk rebuilds and disposal.
- [x] Identify complete interaction loops, domains, 68 source-backed kits and offered services.
- [x] Define artifact identity, fingerprint, consumer admission, paired adoption, stale rejection and visible proof.
- [x] Add a complete timestamped audit family and refresh required root files.
- [ ] Runtime implementation and executable fixtures remain future work.

## Selection result

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
recorded root-.agent-missing eligible repositories: 0

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

## Complete interaction loop

```txt
boot
  -> create world and terrain
  -> create vegetation clusters
  -> return trunks, crowns, clusters and treePositions
  -> grass copies treePositions into a private 36-unit cell map
  -> grass retains clusters for treeProximityAt()
  -> flowers separately copy treePositions into another private 36-unit cell map
  -> start RAF

flora frame
  -> terrain updates around camera
  -> grass computes rounded camera chunk center
  -> grass removes obsolete meshes and builds missing meshes directly live
  -> flower computes rounded camera chunk center
  -> flower removes obsolete meshes and builds missing meshes directly live
  -> both use construction-time exclusion queries
  -> HDR renders and state reports chunk/instance counts

vegetation ownership change
  -> no exclusion artifact is published
  -> no grass/flower invalidation or rebind occurs
  -> no candidate cites vegetation generation
  -> no paired parity result or visible acknowledgement exists
```

## Source-backed findings

### Vegetation exports mutable source records, not an artifact

`createVegetationClusters()` creates `clusters` and `treePositions`, inserts trunk/crown instances directly into the scene and returns those arrays. It publishes no vegetation generation, revision, fingerprint, exclusion policy or disposal service.

### Grass snapshots two vegetation views

`createVegetationQueries()` copies `treePositions` into a private cell map and captures `clusters`. `obstacleAt()` excludes within `tree.radius`; `treeProximityAt()` derives a density signal from cluster edges. These queries are created once when the grass domain is constructed.

### Flowers snapshot a different vegetation view

`createObstacleQuery()` independently copies `treePositions` into another private cell map and excludes within `tree.radius + 1.2`. It has no cluster-proximity signal and no shared policy identity with grass.

### Chunk rebuilds do not admit an exclusion revision

Both domains rebuild only when their rounded camera chunk center changes. They remove old geometry and build missing chunks directly into live ownership. Chunk metadata records coordinates, LOD and counts, but not world, vegetation or exclusion revisions.

### Visual state cannot prove coherence

`visual-domain.update()` updates terrain, then grass, then flowers and records only `getState()` counts. No observation states which vegetation/exclusion artifact produced the flora visible in that frame.

## Reachable failure classes

```txt
vegetation streaming or rebuild changes tree ownership
  -> grass/flower indexes still describe predecessor trees
  -> new trees can receive overlapping grass or flowers
  -> removed trees can leave permanent predecessor clearings

world or quality replacement changes tree count/placement
  -> chunk identity remains coordinate-only
  -> retained chunks can cite no compatible exclusion generation

generation failure occurs between grass and flower updates
  -> one consumer can adopt a successor while the other retains a predecessor
  -> frame has no parity or rollback result

consumer-specific radii diverge silently
  -> no authored shared policy explains grass versus flower clearance
  -> later consumers can invent a third local rule
```

## Domains in use

```txt
browser shell, canvas, map, fatal projection and public host
runtime boot, session, keyboard/wheel input, RAF and telemetry
balloon motion, steering, burner, vent, altitude and distance
airstream routes, sampling, force, visuals and debug
mail parcel, town, delivery volume and progress
seeded world generation, bounded-disk membership, erosion, climate, biome and flora
terrain near/horizon streaming, ownership, geometry and disposal
vegetation cluster generation and direct scene ownership
grass/flower density, exclusion, placement, chunks, LOD, culling and wind
balloon construction, rigging, material, camera and secondary presentation
quality, dynamic resolution, sky, sun, clouds, water, HDR and lens response
parchment-map projection, headless proof, tests, build and Pages
missing flora-exclusion artifact identity, admission, replacement and proof
```

## Implemented kit census

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

## Offered services

```txt
runtime/gameplay:
  flight input and integration
  airstream route, field, force, visual and debug
  mail parcel, town, volume, progress and reset
  telemetry and snapshots

balloon/object/presentation:
  envelope profile and panel construction
  mouth, seams, basket, rigging, burner and rope
  deferred model loading
  secondary motion, materials, camera and clipping

world/environment:
  seeded grid, protected anchors, erosion and flow
  climate, biome, flora, disk membership and map colors
  shared camera-relative terrain frame and near/horizon geometry
  tree cluster generation and tree-position records
  grass/flower density, atlases, chunk placement, LOD, culling, wind and local exclusions
  sky, sun, aerial perspective, clouds, water, HDR, color grade and lens response

UI/tooling:
  parchment-map lifecycle and projection
  headless inspection
  source validation, game/world/flora fixtures
  build and Pages adaptation
```

The complete names for every active, implied and retired kit are preserved in the latest tracker and `.agent/kit-registry.json`.

## Required parent domain

```txt
open-above-flora-exclusion-artifact-authority-domain
```

## Candidate coordinating kits

```txt
open-above-flora-exclusion-artifact-authority-domain
open-above-vegetation-generation-id-kit
open-above-flora-exclusion-revision-kit
open-above-flora-exclusion-policy-kit
open-above-tree-exclusion-record-kit
open-above-tree-exclusion-spatial-index-kit
open-above-cluster-proximity-field-kit
open-above-flora-exclusion-artifact-kit
open-above-flora-exclusion-fingerprint-kit
open-above-flora-consumer-id-kit
open-above-flora-chunk-generation-kit
open-above-flora-chunk-input-fingerprint-kit
open-above-flora-exclusion-admission-kit
open-above-grass-exclusion-adapter-kit
open-above-flower-exclusion-adapter-kit
open-above-flora-paired-candidate-result-kit
open-above-flora-paired-adoption-kit
open-above-flora-last-good-rollback-kit
open-above-stale-flora-exclusion-rejection-kit
open-above-flora-exclusion-observation-kit
open-above-flora-exclusion-journal-kit
open-above-flora-exclusion-visible-frame-ack-kit
open-above-tree-flora-overlap-fixture-kit
open-above-removed-tree-clearing-fixture-kit
open-above-exclusion-revision-stale-fixture-kit
open-above-flora-consumer-parity-fixture-kit
open-above-flora-exclusion-pages-smoke-kit
```

## Required transaction

```txt
VegetationCommitResult
  -> validate session, world, quality and vegetation generation
  -> normalize authored tree and cluster exclusion policy
  -> build immutable spatial records and proximity fields
  -> fingerprint FloraExclusionArtifact
  -> publish artifact revision
  -> generate detached grass and flower candidates against that revision
  -> validate each candidate result and cross-consumer parity
  -> atomically adopt both successor chunk sets or retain last-good sets
  -> reject stale predecessor artifact results
  -> retire predecessor geometry and indexes exactly once
  -> publish bounded observations and journal entry
  -> acknowledge the first visible frame citing vegetation and exclusion revisions
```

## Required invariants

```txt
every flora chunk cites one world, vegetation and exclusion revision
grass and flowers consume one canonical artifact
consumer-specific clearance is configuration-backed and fingerprinted
stale exclusion results perform zero live mutation
paired adoption cannot leave mixed predecessor/successor flora
failed generation retains a complete last-good pair
predecessor indexes and geometry retire exactly once
visible acknowledgement follows successful adoption
```

## Validation boundary

Documentation only. Runtime source, HTML, package scripts, dependencies, gameplay, rendering and deployment were not changed. No source, browser, built-output or Pages flora-exclusion fixture was run.