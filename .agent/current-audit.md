# Current Audit: TheOpenAbove

**Last aligned:** `2026-07-12T15-40-04-04-00`

## Status

```txt
status: vegetation-spatial-coverage-central-reconciled
repository runtime revision reviewed: c2b96fa4d0dc44f6f3cf52762834324e712ed7d9
runtime source changed by this documentation pass: no
branch: main
root .agent state: refreshed
central ledger sync: complete
central internal change log: complete
```

## Summary

The active product combines a deterministic 10,000-unit-radius world with camera-relative near/horizon terrain, grass and flower chunk windows. Tree vegetation is different: `createVegetationClusters()` runs once during visual-domain construction, creates 18 centrally bounded clusters, writes all accepted transforms into one trunk and one crown `InstancedMesh`, adds them directly to the live scene and returns no update or disposal service.

The balloon continuously integrates horizontal movement, and the camera drives terrain, grass and flower updates. Vegetation receives no frame command. No vegetation session/frame/chunk identity, coverage plan, input fingerprint, budget result, atomic adoption, rollback, retirement receipt, coverage observation or first-visible-frame acknowledgement exists.

## Plan ledger

**Goal:** reconcile the complete source-backed breakdown and define one vegetation spatial-coverage authority from camera evidence through visible-frame proof.

- [x] Compare all ten accessible Publish repositories and central ledgers.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm nine eligible repositories have central and root `.agent` coverage.
- [x] Select only `TheOpenAbove` because repo-local vegetation work was newer than central tracking.
- [x] Review world configuration, flight integration, visual composition, vegetation construction, streamed consumers, snapshots and scripts.
- [x] Identify the complete interaction loop and all active domains.
- [x] Preserve 68 active source-backed kits and offered services.
- [x] Add a timestamped reconciliation tracker, turn ledger and system audits.
- [x] Refresh root files and machine registry.
- [x] Synchronize central ledger and change log directly on `main`.
- [x] Create no branch or pull request.
- [ ] Implement and execute the vegetation authority and fixture matrix.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0
unsynchronized repo-local audit state: TheOpenAbove
selected: TheOpenAbove
excluded: TheCavalryOfRome
```

## Interaction loop

```txt
boot
  -> create world and visual domain
  -> create camera-relative terrain
  -> create one boot-only tree field
  -> pass boot tree positions into grass and flowers
  -> create balloon, routes, mail, camera, map and HDR
  -> schedule RAF

frame
  -> integrate balloon position
  -> update mail and airstream
  -> move camera
  -> update terrain, grass and flowers around camera
  -> do not update vegetation
  -> render

long traversal
  -> camera can leave central tree coverage
  -> streamed ground and low flora continue
  -> no coverage result distinguishes treeless, deferred, failed or missing state
```

## Source-backed findings

### World and vegetation extents differ

```txt
WORLD.surface.radius = 10000
WORLD.terrainSize = 2400
local cluster-center extent = 2400 * 1.18 = 2832
wider cluster-center extent = min(10000 * 0.42, 2832 * 1.9) = 4200
cluster spread = 80..340
cluster count = 18
```

These values define a central boot artifact, not camera-relative world coverage.

### Vegetation is absent from the frame lifecycle

`createVisualDomain().update()` advances weather, sun, sky, clouds, aerial perspective, terrain, grass, flowers, water, lens and HDR composition. It does not advance vegetation.

### Vegetation has no lifecycle surface

The kit returns trunks, crowns, count, cluster descriptors and tree positions. It has no `update`, `getState`, `snapshot`, `requirements`, `dispose` or typed result service. The visual-domain disposer does not retire the vegetation geometry/material/instance resources.

### Exclusions are boot-bound

Grass and flowers receive the boot vegetation object and use its tree-position records. No revisioned vegetation exclusion artifact ties those consumers to the currently rendered tree generation.

### Observability stops before vegetation

Runtime readback includes terrain, world generation, grass, flowers and aggregate render statistics, but no vegetation coverage, active bounds, chunk/instance counts, world fingerprint or visible-frame receipt.

## Domains in use

```txt
browser shell, canvas, parchment map and fatal projection
runtime boot, session, keyboard/wheel input, RAF and public host
balloon simulation, steering, airstream and mail delivery
seeded world generation, erosion, flow, climate, biome, flora and map color
world membership and authored route/town/lake protection
terrain streaming frame, near/horizon ownership, geometry and disposal
boot-time tree clusters and global instanced rendering
grass and flower chunks, atlases, LOD, culling, wind and exclusions
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

The complete kit-by-kit service map is in `.agent/trackers/2026-07-12T15-40-04-04-00/project-breakdown.md` and `.agent/kit-registry.json`.

## Required parent domain

```txt
open-above-vegetation-spatial-coverage-authority-domain
```

## Required services

```txt
vegetation session, frame, chunk and render-generation identities
world artifact and configuration binding
canonical input fingerprint
camera-relative coverage plan
stable chunk IDs and query-order-independent seeds
inside/edge/outside world admission
terrain/biome/route/town/lake/spacing exclusion parity
detached candidates and typed build/admission results
work, instance, memory and transition budgets
atomic aggregate adoption and last-good rollback
exactly-once retirement and disposal receipts
revisioned exclusion artifact for grass and flowers
coverage observations and bounded journal
VegetationVisibleFrameAck
pure, failure, browser and Pages fixtures
```

## Required invariants

```txt
same world/config/chunk produces the same candidate fingerprint
all current chunks cite one world artifact and vegetation frame
required cells are covered or carry explicit treeless/deferred/failed results
candidate failure preserves last-good coverage
only the committed vegetation generation publishes exclusions
retirement occurs exactly once after successor adoption
stale results cannot re-enter after session/world/quality replacement
visible acknowledgement follows committed adoption
```

## Retained audits

Runtime admission, runtime lifecycle, procedural-world identity, terrain aggregate adoption, terrain performance, grass spatial identity, HDR surface, map authority, mission accessibility and public-host isolation remain active dependencies.

Documentation only. No runtime source, dependency, gameplay, rendering or deployment behavior was changed.