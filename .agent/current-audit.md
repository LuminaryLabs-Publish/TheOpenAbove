# Current Audit: TheOpenAbove

**Last aligned:** `2026-07-12T15-31-24-04-00`

## Status

```txt
status: vegetation-spatial-coverage-authority-audited
repository runtime revision reviewed: c2b96fa4d0dc44f6f3cf52762834324e712ed7d9
runtime source changed by this documentation pass: no
branch: main
root .agent state: refreshed
central ledger sync: complete
central internal change log: complete
```

## Summary

The active product combines a deterministic 10,000-unit-radius world with camera-relative near/horizon terrain, grass and flower chunk windows. Tree vegetation is different: `createVegetationClusters()` runs once during visual-domain construction, generates 18 centrally bounded random clusters, writes all transforms into one trunk and one crown `InstancedMesh`, adds them directly to the scene and returns no update or disposal service.

The balloon simulation continuously integrates horizontal position and clamps only vertical terrain clearance. The camera can therefore move through the broader streamed world while the tree field remains fixed. No vegetation frame, chunk requirement, coverage result, world fingerprint, transition budget, adoption receipt, retirement result or first-visible-frame acknowledgement exists.

## Plan ledger

**Goal:** make tree vegetation a deterministic, world-bound and camera-relative consumer whose coverage can be planned, admitted, adopted, retired, observed and proven.

- [x] Compare all accessible Publish repositories and central ledgers.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm nine eligible repositories have central and root `.agent` coverage.
- [x] Select only `TheOpenAbove` by the oldest eligible central timestamp.
- [x] Review world configuration, flight integration, visual composition, vegetation construction, streamed consumers, snapshots and scripts.
- [x] Identify the interaction loop and all active domains.
- [x] Reconcile 68 active source-backed kits and offered services.
- [x] Define the vegetation spatial-coverage authority and fixture gates.
- [x] Add timestamped tracker and system audits.
- [x] Refresh root and central documentation on `main`.
- [x] Create no branch or pull request.
- [ ] Implement chunked vegetation, transactional adoption, disposal and visible proof.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0
selected: TheOpenAbove
reason: oldest eligible central ledger timestamp
excluded: TheCavalryOfRome
```

## Interaction loop

```txt
boot
  -> construct world artifact and visual domain
  -> create near/horizon terrain streamers
  -> create boot-only vegetation clusters
  -> create camera-relative grass and flower domains
  -> create balloon, mail, airstream, camera and map
  -> start RAF

frame
  -> integrate flight position without horizontal world admission
  -> update mail and airstream
  -> move camera
  -> update terrain around camera
  -> update grass and flowers around camera
  -> do not update vegetation
  -> render current scene

traversal beyond central tree coverage
  -> terrain and low flora continue to follow camera
  -> boot tree instances remain at initial world coordinates
  -> no coverage outcome or warning is published
```

## Source-backed findings

### World and tree extents differ

```txt
WORLD.surface.radius = 10000
WORLD.terrainSize = 2400
local vegetation extent = terrainSize * 1.18 = 2832
wider vegetation extent = min(radius * 0.42, localExtent * 1.9) = 4200
cluster spread = 80..340
cluster count = 18
```

These values bound cluster centers to a central subset of the admitted world. Exact farthest-tree distance depends on deterministic random centers and spreads, but the construction is not a world-wide or camera-relative coverage policy.

### Vegetation is boot-only

The visual domain creates vegetation once. Its frame update calls weather, sun, sky, clouds, aerial perspective, terrain, grass, flowers, water, lens and HDR composition, but not vegetation.

### Vegetation has no lifecycle surface

The kit returns trunks, crowns, count, cluster descriptors and tree positions. It has no `update`, `getState`, `snapshot`, `requirements`, `dispose` or typed result service. The visual-domain disposer also does not retire vegetation resources.

### Flight is not horizontally world-bound

The simulation adds velocity to position every update and enforces only a minimum height above terrain. No x/z world-radius admission prevents the camera from leaving the initial tree field.

### Observability stops before vegetation

The runtime snapshot reports near/horizon terrain, world generation, grass, flowers and render statistics. It does not report vegetation coverage, active bounds, instance counts by cell, world/vegetation fingerprints or a visible-frame receipt.

### Validation has no spatial vegetation gate

The normal check script covers smoke, terrain streaming, route protection and terrain overlays. It contains no long-traversal vegetation, deterministic chunk, failure rollback, disposal or browser/Pages coverage fixture.

## Domains in use

```txt
browser shell, canvas, parchment map and fatal projection
runtime boot, session, keyboard/wheel input, RAF and public host
balloon simulation, steering, airstream and mail delivery
seeded world build, erosion, flow, climate, biome, flora and map color
world membership and authored route/town/lake anchors
terrain streaming frame, near/horizon ownership, geometry and disposal
boot-time tree cluster placement and global instanced rendering
grass and flower chunks, atlases, LOD, culling and wind
balloon object construction, materials, rigging, burner and presentation
quality, dynamic resolution, sky, clouds, water, HDR and lens response
map projection, telemetry, headless inspection, tests, build and Pages
```

## Kit inventory and services

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

The complete kit-by-kit list and service map are in the timestamped tracker and `.agent/kit-registry.json`.

## Current vegetation service

```txt
open-above-vegetation-cluster-kit
  deterministic seed derivation from world/grass seed
  quality-tier tree count selection
  18 boot-time cluster descriptors
  terrain-height and moisture sampling
  trunk/crown matrix and crown-color production
  global InstancedMesh construction
  tree-position exclusion record production
  direct scene insertion
```

## Required parent domain

```txt
open-above-vegetation-spatial-coverage-authority-domain
```

## Required services

```txt
vegetation stream session, frame and chunk identities
world artifact and configuration binding
canonical vegetation input fingerprint
camera-relative coverage plan
stable per-chunk seed derivation
inside/edge/outside world admission
terrain, route, town, lake and spacing exclusion parity
detached candidate sets and typed build results
instance, allocation and transition budgets
atomic chunk adoption and last-good preservation
exactly-once retirement and disposal receipts
revisioned tree exclusion artifact for grass and flowers
active coverage observations and bounded journal
VegetationVisibleFrameAck
pure, failure, browser and Pages fixtures
```

## Required invariants

```txt
same world/config/chunk -> same candidates independent of query order
all current vegetation chunks cite one world artifact
no outside-world candidate becomes current
camera-required cells are covered or have an explicit degraded/treeless result
candidate failure leaves predecessor coverage unchanged
retirement occurs exactly once after successor adoption
grass/flower exclusions cite the current vegetation generation
visible acknowledgement follows committed adoption
```

## Retained audits

Runtime admission, runtime-session lifecycle, procedural-world identity, terrain aggregate adoption, terrain performance, grass spatial identity, HDR surface, map authority, mission accessibility and public-host isolation remain active dependencies.

Documentation only. No runtime source, dependency, gameplay, rendering or deployment behavior was changed.