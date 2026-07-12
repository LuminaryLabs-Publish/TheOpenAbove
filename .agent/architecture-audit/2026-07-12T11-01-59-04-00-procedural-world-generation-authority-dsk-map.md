# Architecture Audit: Procedural World Generation Authority DSK Map

**Timestamp:** `2026-07-12T11-01-59-04-00`

## Summary

The world generator is now a shared source for terrain, climate, biomes, grass, flowers and the parchment map, but it is still a mutable utility object rather than a committed domain. Construction, queries, cache effects, world membership and consumer adoption have no shared identity or transaction.

## Existing composition

```txt
createVisualDomain
  -> createWorldGenerationKit
     -> seed normalization
     -> 257 x 257 raw/grid arrays
     -> protection masks from routes/towns/lakes/road
     -> six erosion passes
     -> flow accumulation and channel carving
     -> biome/flora/map-color query closures
     -> mutable featureCells cache
  -> terrain surface
  -> vegetation
  -> grass field
  -> flower field
  -> landmarks
  -> parchment map background
```

## Existing DSKs and services

```txt
open-above-world-generation-kit
  build grid, erosion, flow, climate and fertility
  protect legacy route/town terrain
  sample height, moisture, temperature and fertility
  sample biome, flora, map color and feature cell
  expose descriptor

open-above-terrain-surface-kit
  apply disk edge mask
  stream near and horizon meshes
  color terrain from world samples

open-above-grass-field-domain
  camera-centered chunk lifecycle
  deterministic clump placement
  five-species atlas, LOD, culling and state

open-above-flower-field-domain
  camera-centered chunk lifecycle
  deterministic flower placement
  five-type atlas, fade, culling and state

open-above-parchment-map-overlay-kit
  synchronously rasterize cached world background
  draw routes, towns and player
```

## Architectural gaps

```txt
world build has no ID or revision
seed/config/anchor inputs have no canonical fingerprint
build stages have no typed results
startup work has no budget, progress or cancellation
world artifact is not serializable or reusable
query methods can mutate feature-cell cache
cache state leaks into descriptor/snapshot
outside-world samples clamp silently
surface membership is not a shared service
consumers do not provide adoption receipts
no consumer parity result exists
no world-to-visible-frame acknowledgement exists
```

## Required parent domain

```txt
open-above-procedural-world-generation-authority-domain
```

## Candidate kit composition

```txt
open-above-world-build-id-kit
open-above-world-generation-revision-kit
open-above-world-seed-policy-kit
open-above-world-config-fingerprint-kit
open-above-world-anchor-fingerprint-kit
open-above-world-build-plan-kit
open-above-world-build-stage-kit
open-above-world-build-result-kit
open-above-world-build-budget-kit
open-above-world-build-cancellation-kit
open-above-world-grid-artifact-kit
open-above-world-grid-fingerprint-kit
open-above-world-sample-query-kit
open-above-world-sample-result-kit
open-above-world-membership-policy-kit
open-above-world-out-of-bounds-result-kit
open-above-world-feature-cell-cache-policy-kit
open-above-world-pure-read-adapter-kit
open-above-world-consumer-id-kit
open-above-world-consumer-receipt-kit
open-above-world-consumer-parity-result-kit
open-above-world-visible-frame-ack-kit
open-above-world-generation-journal-kit
open-above-world-independent-build-fixture-kit
open-above-world-cache-purity-fixture-kit
open-above-world-membership-parity-fixture-kit
open-above-world-startup-budget-fixture-kit
open-above-world-browser-pages-fixture-kit
```

## Required transaction

```txt
admit seed + surface config + protected anchors
  -> canonicalize and fingerprint inputs
  -> allocate WorldBuildId and revision
  -> execute named build stages under budget/cancellation
  -> validate grid arrays and boundary policy
  -> commit immutable WorldGridArtifact and fingerprint
  -> expose pure typed sample queries
  -> admit terrain/vegetation/grass/flower/landmark/map consumers
  -> collect consumer receipts against the same revision
  -> publish consumer parity result
  -> render first coherent frame
  -> publish WorldVisibleFrameAck
```

## Invariants

```txt
query order cannot change world descriptor or fingerprint
same inputs create byte-equivalent canonical artifacts
all coordinates have one explicit membership result
all consumers use the same membership policy
consumer state identifies one world build revision
stale build/query/consumer results cannot commit
failed or cancelled builds never replace the active world
visible frame cites the exact committed world artifact
```

The existing spatial-navigation and world-surface audits remain valid. This audit owns the new build, query-purity, cache, membership and cross-consumer commit boundary.