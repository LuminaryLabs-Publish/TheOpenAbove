# Current Audit: TheOpenAbove

**Last aligned:** `2026-07-12T13-29-56-04-00`

## Status

```txt
status: terrain-streaming-ownership-reconciliation-audited
repository revision reviewed: c2b96fa4d0dc44f6f3cf52762834324e712ed7d9
runtime source changed by this documentation pass: no
branch: main
root .agent state: refreshed
central ledger sync: complete
central internal change log: complete
```

## Summary

The recent terrain-remediation sequence introduces `open-above-terrain-streaming-contract-kit`, one frozen camera-relative frame, stable near/horizon centers, exact near-bound clipping, horizon clip signatures, skirts, terrain-draped overlays and shared lake descriptors. Pure terrain ownership, route protection and overlay checks are wired into the normal check/build path.

The remaining problem is transaction ownership. Near and horizon streamers directly remove, dispose and construct meshes in their live scene groups. They do not stage complete candidate sets, return typed build/adoption results, validate an aggregate parity result, roll back to a last-good aggregate or acknowledge the first frame that rendered one committed near/horizon revision.

## Plan ledger

**Goal:** reconcile the runtime cutover while defining one atomic terrain-stream transaction from camera sample through ownership planning, candidate construction, aggregate commit, predecessor retirement and visible-frame proof.

- [x] Compare all accessible Publish repositories and central ledgers.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm nine eligible repositories have central and root `.agent` coverage.
- [x] Select only `TheOpenAbove` as the oldest central entry with newer terrain work.
- [x] Review the terrain contract, near/horizon streamers, terrain surface, overlays, water, tests and package scripts.
- [x] Identify the interaction loop and all domains.
- [x] Reconcile 68 active source-backed kits and offered services.
- [x] Record resolved terrain-overlap defects.
- [x] Define remaining aggregate authority and fixture gates.
- [x] Add timestamped tracker and system audits.
- [x] Refresh root and central documentation on `main`.
- [x] Create no branch or pull request.
- [ ] Implement candidate staging, aggregate admission, rollback and visible-frame receipts.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0
selected: TheOpenAbove
reason: oldest central entry plus newer repo-local terrain-remediation work
excluded: TheCavalryOfRome
```

## Interaction loop

```txt
boot
  -> build seeded world
  -> create visual domain
  -> create terrain surface and two stream consumers
  -> create balloon, airstream, mail, simulation, map and camera
  -> start RAF

frame
  -> update flight and camera
  -> terrain surface creates one frozen streaming frame
  -> near streamer rebuilds on revision change
  -> horizon requirements partition around the same near bounds
  -> horizon streamer rebuilds or reclassifies by LOD/clip signature
  -> terrain surface records active frame
  -> remaining visual systems update
  -> HDR render

boundary transition
  -> obsolete meshes are removed and disposed
  -> replacements are built directly into live groups
  -> no aggregate success/rollback result is published
```

## Resolved source-backed findings

```txt
one shared camera-relative frame drives both terrain consumers
near chunk size remains 520 and horizon scale remains 2
horizon cells are partitioned at exact near boundaries
near-owned horizon interiors are omitted
retained horizon chunks reclassify by clip signature and LOD
horizon geometry expansion and vertical offset are removed
near and horizon skirts cover ownership edges
slope color sampling is aligned at 24 world units
route protection is narrower and duplicate final blending is removed
fields and road are terrain-draped
lake descriptors are shared and edges feathered
landmark and water resources have disposal paths
new source tests are wired into npm run check and npm run build
```

## Remaining source-backed findings

### Stream identity is under-specified

The current frame revision is a deterministic string based on grid centers, radius and near keys. It omits runtime session, world build and fingerprint, quality revision, algorithm/schema version, material/program generation and a typed frame identity.

### Candidate construction is live

Near and horizon rebuilds remove obsolete live meshes before all replacement geometry is known to succeed. A thrown world sample, color sample, allocation or geometry error can leave a partial aggregate with no rollback.

### Adoption is sequential and unreported

The terrain surface calls near then horizon updates. Neither returns a typed result. `activeFrame` is assigned only after both calls, but no aggregate receipt proves that both live groups accepted the same frame before render.

### Mesh provenance is asymmetric

Near mesh metadata contains coordinates, LOD and bounds. Horizon metadata also contains segments, clip signature and frame revision. Neither consumer records a typed chunk generation, world artifact identity or aggregate terrain commit.

### Validation stops before the visible frame

Pure tests prove classification, clipping and reclassification. They do not prove atomic scene adoption, last-good rollback, exactly-once retirement, frame-time budgets or browser/Pages visual continuity at ownership boundaries.

## Domains in use

```txt
browser shell, game canvas, parchment map and fatal projection
runtime admission, startup, input, RAF and public host
balloon simulation, steering, airstream and mail
seeded world build, erosion, flow, climate, biome, flora and map color
world membership and authored route/town/lake protection
terrain streaming-frame classification and ownership partitioning
near terrain geometry, LOD, skirts, replacement and disposal
horizon requirements, clipping, LOD, skirts, replacement and disposal
vegetation, landmarks, draped fields/road and shared lakes
grass and flower chunks, atlases, LOD and culling
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

The new active kit is:

```txt
open-above-terrain-streaming-contract-kit
  frozen camera-relative frame creation
  stable near/horizon grid anchoring
  near requirement and bound production
  horizon partitioning around near ownership
  visible-cell classification
  clip signatures and horizon LOD requirements
```

The complete inventory and service map are in `.agent/kit-registry.json` and the latest tracker.

## Required parent domain

```txt
open-above-terrain-streaming-ownership-authority-domain
```

## Required services

```txt
stream session, frame and chunk-generation identities
world/config/quality/geometry/material fingerprints
immutable ownership plan and parity admission
detached near/horizon candidate construction
typed per-chunk build results
aggregate candidate validation
atomic adoption and last-good rollback
exactly-once predecessor retirement receipts
near/horizon consumer receipts
bounded observations and journal
TerrainStreamCommitResult
TerrainVisibleFrameAck
boundary, failure-injection, browser and Pages fixtures
```

## Required invariants

```txt
one interior world coordinate has at most one terrain owner
near and horizon adopt the same frame or neither commits
candidate failure leaves predecessor terrain unchanged
all committed meshes cite the same world and terrain frame
retirement occurs exactly once after successful adoption
render acknowledgement follows aggregate commit
```

## Retained audits

The procedural-world authority remains active for build identity and consumer provenance. Map, lifecycle, frame-failure, HDR, public-host, world-surface and grass audits remain active dependencies.

Documentation only. No runtime source, dependency, gameplay, rendering or deployment behavior was changed by this pass.