# Project Breakdown: Terrain Streaming Ownership Reconciliation

**Timestamp:** `2026-07-12T13-29-56-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`  
**Branch:** `main`  
**Repository revision reviewed:** `c2b96fa4d0dc44f6f3cf52762834324e712ed7d9`

## Summary

Recent runtime work replaced overlapping near and horizon terrain with one shared camera-relative streaming frame, exact near-owned horizon clipping, chunk-boundary skirts, terrain-draped authored overlays and shared lake descriptors. The concrete overlap defects are materially remediated and new pure source fixtures are wired into `npm run check`.

The remaining gap is aggregate terrain-stream authority. Near and horizon streamers mutate their live scene groups independently, remove predecessor meshes before every replacement geometry has been built, return no typed adoption result and publish no aggregate commit receipt or visible-frame acknowledgement. A shared frame string is present, but there is no session/world/config fingerprint, candidate-set staging, rollback or proof that the first rendered frame used one fully committed near/horizon revision.

## Plan ledger

**Goal:** reconcile the terrain-overlap runtime cutover and define one atomic, revisioned ownership transaction from camera position through near/horizon requirements, chunk construction, aggregate adoption, predecessor retirement and first visible frame.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger entries and root `.agent` state.
- [x] Select only `TheOpenAbove`, the oldest central entry and the repository with newer terrain-remediation work not reflected centrally.
- [x] Review the shared terrain contract, near streamer, horizon streamer, terrain surface, authored overlays, water source, tests and package checks.
- [x] Identify the complete interaction loop and active domains.
- [x] Reconcile all 68 active source-backed kits and their offered services.
- [x] Distinguish resolved overlap defects from remaining aggregate commit, rollback and frame-provenance gaps.
- [x] Add timestamped architecture, render, gameplay, interaction, terrain-system and deployment audits.
- [x] Refresh the required root `.agent` documents and machine registry.
- [x] Push directly to `main`; create no branch or pull request.
- [ ] Implement atomic candidate-set adoption, typed results and executable browser/Pages boundary proof.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

TheOpenAbove       2026-07-12T11-15-16-04-00 selected; repo-local terrain work at 2026-07-12T12-17-22-04-00
IntoTheMeadow      2026-07-12T11-29-40-04-00
PhantomCommand     2026-07-12T11-48-43-04-00
PrehistoricRush    2026-07-12T12-08-05-04-00
HorrorCorridor     2026-07-12T12-21-38-04-00
ZombieOrchard      2026-07-12T12-39-25-04-00
MyCozyIsland       2026-07-12T12-58-08-04-00
TheUnmappedHouse   2026-07-12T13-08-15-04-00
AetherVale         2026-07-12T13-20-00-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/TheOpenAbove` is modified in the Publish organization.

## Complete interaction loop

```txt
page boot
  -> import Three and Nexus Engine
  -> create visual domain and seeded world
  -> create terrain surface
  -> create near and horizon streamers
  -> create balloon, airstream, mail, simulation, camera and map
  -> perform initial update
  -> schedule RAF

active frame
  -> update simulation, mail and airstream
  -> update camera
  -> visual update calls terrain surface update
  -> create one frozen TerrainStreamingFrame from camera position
  -> near streamer rebuilds if frame revision changed
  -> horizon streamer classifies requirements against the same near bounds
  -> horizon streamer rebuilds/reclassifies by LOD and clip signature
  -> terrain surface records active frame
  -> grass, flowers, water, sky and HDR update
  -> render visible frame

near/horizon boundary crossing
  -> camera crosses a 520-unit near-grid threshold
  -> frame revision changes
  -> obsolete near meshes are removed and disposed
  -> missing near meshes are built directly into the live group
  -> obsolete or reclassified horizon meshes are removed and disposed
  -> missing horizon meshes are built directly into the live group
  -> no aggregate success result is published before render

disposal
  -> dispose horizon geometry
  -> dispose near geometry
  -> remove groups and terrain material
```

## Domains in use

```txt
browser shell, semantic HTML, game canvas, parchment map and fatal projection
runtime admission, startup, input, RAF and public host
balloon simulation, steering, airstream and mail delivery
seeded world generation, erosion, flow, climate, biome, flora and map color
world-surface membership and authored route/town/lake protection
terrain streaming frame classification and ownership partitioning
near terrain chunk construction, LOD, skirts, adoption and disposal
horizon requirement classification, clipping, LOD, skirts, adoption and disposal
vegetation, landmarks, draped fields, draped roads and shared lakes
grass and flower placement, atlases, chunks, LOD and culling
quality, dynamic resolution, sky, clouds, water, HDR and lens response
map caching and spatial projection
telemetry, headless inspection, tests, build and Pages deployment
```

## Implemented kits and offered services

### Runtime and gameplay: 15

```txt
open-above-balloon-simulation-kit
  keyboard state, wind/buoyancy/steering integration, terrain clearance, transforms, snapshots, disposal
open-above-balloon-telemetry-kit
  Nexus Engine composition, ticking and state projection
open-above-airstream-domain
  route, field, sampler, force, visual, debug and snapshot composition
open-above-airstream-route-kit
  authored current-route descriptors
open-above-airstream-sampler-kit
  spatial/time route influence sampling
open-above-airstream-field-kit
  ambient and route velocity-field evaluation
open-above-airstream-balloon-force-kit
  sampled-current application to balloon state
open-above-airstream-visual-kit
  route/current scene projection and animation
open-above-airstream-debug-kit
  airstream observations
open-above-mail-delivery-domain
  parcel, route, towns, volume, progress, reset, snapshot and disposal composition
open-above-mail-parcel-kit
  parcel construction and reset
open-above-mail-route-kit
  route, destination, town and correct-current descriptors
open-above-delivery-volume-kit
  destination-volume spatial sampling
open-above-delivery-progress-kit
  current tracking, delivery commit, messages and events
open-above-mail-town-kit
  destination-town visual construction, update and disposal
```

### Balloon, object and presentation: 15

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

Services cover profile sampling, unified envelope construction, seams, mouth fitting, basket, burner, rigging, rope, asynchronous model loading, persistent animation, materials, presentation inertia, camera follow/zoom and clipping fade.

### Visual, world and environment: 33

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

Materially relevant services:

```txt
terrain-streaming-contract-kit
  stable near-grid rounding, frozen frame descriptors, near bounds, horizon partitioning, overlap classification, clip signatures and LOD requirements
terrain-surface-kit
  disk membership, bounded height, shared near/horizon frame creation, terrain color, cloud shadow and aggregate disposal
terrain-chunk-streaming-kit
  near requirements, distance LOD, geometry, boundary skirts, live-group replacement, frame revision and disposal
terrain-horizon-streaming-kit
  far requirements, exact near-owned cell removal, clip-signature reclassification, sparse geometry, boundary skirts, live-group replacement and disposal
world-generation-kit
  seeded grid, anchor protection, erosion, flow, climate, biome, flora, containment and map-color queries
distant-landmark-kit
  terrain-draped fields and road plus landmark disposal
water-surface-kit
  shared authored lake descriptors, feathered water edges and disposal
```

### UI and proof: 5

```txt
open-above-parchment-map-overlay-kit
open-above-headless-editor-environment
open-above-static-smoke-test-kit
open-above-airstream-mail-test-kit
open-above-world-flora-test-kit
```

Services cover map lifecycle/projection, headless inspection, source validation, terrain ownership tests, route-protection tests, overlay-source tests, world/flora determinism and build adaptation.

## Resolved terrain-overlap findings

```txt
one shared camera-relative frame now drives near and horizon streamers
near chunk size remains 520 units; horizon chunk size remains 1,040 units
horizon requirements are partitioned at exact near-boundary coordinates
near-owned horizon cells are omitted from visible geometry
retained horizon chunks are reclassified by LOD and clip signature
horizon expansion and unexplained vertical offset were removed
near and horizon boundary skirts were added
terrain slope color sampling uses the same 24-unit step
route protection was narrowed and the duplicate final blend removed
fields and road are terrain-draped
lake descriptors are shared and water edges feathered
landmark and water geometry disposal was added
terrain ownership, route protection and overlay checks are wired into npm run check
```

## Remaining source-backed findings

### Revision identity is incomplete

`TerrainStreamingFrame.revision` is a deterministic string derived from camera-grid centers, radius and near keys. It does not identify runtime session, world build, world fingerprint, quality profile, terrain algorithm, chunk geometry schema or material generation.

### Live replacement is not atomic

Both streamers remove and dispose obsolete live meshes before all replacement geometry is successfully built. A thrown height/color sample, allocation failure or geometry-construction error can leave a partially replaced live terrain set with no rollback to the predecessor set.

### Near and horizon adoption is independent

`terrain-surface-kit` calls near and horizon updates sequentially and records `activeFrame` afterward. Neither update returns a typed result, and there is no aggregate receipt proving both consumers accepted the same frame before the renderer draws.

### Chunk provenance is asymmetric

Horizon mesh metadata records a frame revision, LOD, segments and clip signature. Near mesh metadata records coordinates, LOD and bounds but not the frame revision or a chunk generation ID. No mesh records world build or aggregate terrain commit identity.

### Visible-frame proof is absent

The runtime exposes counts and a streaming-frame object but no `TerrainStreamCommitResult`, parity result, rejected/retired chunk counts, rollback result or first-visible-frame acknowledgement. The new tests prove pure ownership classification, not browser frame coherence at grid boundaries.

## Required parent domain

```txt
open-above-terrain-streaming-ownership-authority-domain
```

## Required transaction

```txt
camera sample + runtime session + world artifact + quality/config fingerprints
  -> allocate TerrainStreamFrameId
  -> derive immutable near and horizon ownership plan
  -> validate disjoint coverage and world membership
  -> build complete candidate near/horizon chunk sets off the live groups
  -> return typed per-chunk build results
  -> validate candidate aggregate parity
  -> atomically adopt both candidate sets
  -> retire predecessor chunks exactly once
  -> publish TerrainStreamCommitResult
  -> render first matching frame
  -> publish TerrainVisibleFrameAck
```

## Candidate coordinating kits

```txt
open-above-terrain-streaming-ownership-authority-domain
open-above-terrain-stream-session-id-kit
open-above-terrain-stream-frame-id-kit
open-above-terrain-stream-input-fingerprint-kit
open-above-terrain-chunk-ownership-plan-kit
open-above-terrain-near-requirements-kit
open-above-terrain-horizon-requirements-kit
open-above-terrain-partition-admission-kit
open-above-terrain-chunk-generation-id-kit
open-above-terrain-chunk-build-result-kit
open-above-terrain-stream-candidate-set-kit
open-above-terrain-stream-parity-result-kit
open-above-terrain-stream-aggregate-commit-kit
open-above-terrain-stream-rollback-kit
open-above-terrain-chunk-retirement-kit
open-above-terrain-consumer-receipt-kit
open-above-terrain-visible-frame-ack-kit
open-above-terrain-stream-observation-kit
open-above-terrain-stream-journal-kit
open-above-terrain-boundary-transition-fixture-kit
open-above-terrain-build-failure-rollback-fixture-kit
open-above-terrain-browser-pages-fixture-kit
```

## Validation boundary

The repository reports passing local terrain ownership, shared anchoring, clipping, horizon reclassification, route-protection, draped-overlay and source syntax checks in the preceding turn ledger. Those commands were not rerun through the connector during this documentation pass. No claim is made that aggregate adoption, rollback, first-visible-frame coherence or deployed boundary-crossing presentation has been proven.