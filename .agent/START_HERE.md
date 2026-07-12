# START HERE: TheOpenAbove

**Last aligned:** `2026-07-12T15-40-04-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`  
**Branch:** `main`  
**Runtime revision reviewed:** `c2b96fa4d0dc44f6f3cf52762834324e712ed7d9`

## Summary

TheOpenAbove is an Air Mail hot-air-balloon experience with deterministic world generation, camera-relative terrain/grass/flower streaming, authored routes and towns, procedural balloon construction, HDR rendering, a parchment map, Nexus telemetry and browser/headless proof surfaces.

The current audit isolates vegetation spatial coverage. Trees are generated once at boot as one trunk and one crown `InstancedMesh` over 18 centrally bounded clusters. Terrain, grass and flowers follow the camera, while vegetation has no update, chunk/frame identity, camera-relative requirement, adoption result, lifecycle/disposal owner, coverage observation or visible-frame acknowledgement.

## Plan ledger

**Goal:** retain deterministic tree placement while making vegetation a world-bound, camera-relative, budgeted and transactionally adopted world consumer.

- [x] Compare all ten accessible Publish repositories with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Select only `TheOpenAbove` because its repo-local `15:31:24` vegetation audit was newer than central tracking.
- [x] Identify the complete interaction loop and all domains.
- [x] Preserve all 68 active source-backed kits and offered services.
- [x] Add a new timestamped reconciliation tracker, turn ledger and audit family.
- [x] Refresh root `.agent` state and machine registry.
- [x] Synchronize central tracking on `main`.
- [x] Create no branch or pull request.
- [ ] Implement camera-relative vegetation chunks, atomic adoption, disposal and executable proof.

## Read this first

```txt
.agent/trackers/2026-07-12T15-40-04-04-00/project-breakdown.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/architecture-audit/2026-07-12T15-40-04-04-00-vegetation-spatial-coverage-central-reconciliation-dsk-map.md
.agent/render-audit/2026-07-12T15-40-04-04-00-vegetation-visible-frame-central-reconciliation-gap.md
.agent/gameplay-audit/2026-07-12T15-40-04-04-00-boot-tree-field-traversal-reconciliation.md
.agent/interaction-audit/2026-07-12T15-40-04-04-00-camera-vegetation-admission-reconciliation.md
.agent/vegetation-system-audit/2026-07-12T15-40-04-04-00-coverage-registry-reconciliation-contract.md
.agent/deploy-audit/2026-07-12T15-40-04-04-00-vegetation-fixture-central-reconciliation-gate.md
.agent/turn-ledger/2026-07-12T15-40-04-04-00.md
.agent/kit-registry.json
```

The original source audit remains available at `2026-07-12T15-31-24-04-00` and is preserved as the detailed predecessor.

## Interaction loop

```txt
boot
  -> build seeded world
  -> create camera-relative terrain
  -> create boot-only tree clusters
  -> create camera-relative grass and flowers using boot tree exclusions
  -> create balloon, mail, airstream, camera, map and renderer
  -> start RAF

frame
  -> integrate flight and update mail/airstream
  -> move camera
  -> update terrain, grass and flowers around camera
  -> leave tree instances unchanged
  -> render HDR frame

long traversal
  -> camera can leave initial tree coverage
  -> streamed ground and low flora continue
  -> no typed vegetation coverage result explains tree state
```

## Domains in use

```txt
browser shell, canvas, parchment map and fatal projection
runtime boot, session, input, RAF and public host
balloon simulation, steering, airstream and mail
seeded world generation, membership and authored anchors
terrain streaming classification and near/horizon ownership
boot-time vegetation placement and tree instancing
grass/flower chunks, LOD, culling, wind and exclusion
balloon model, materials, rigging and presentation
quality, dynamic resolution, sky, clouds, water, HDR and lens response
map projection, telemetry, headless proof, tests, build and Pages
```

## Kits and services

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

The complete kit-by-kit service map is in the latest tracker and `.agent/kit-registry.json`.

## Main finding

```txt
world radius: 10000
terrainSize: 2400
vegetation clusters: 18
local cluster-center extent: 2832
wider cluster-center extent: 4200
cluster spread: 80..340
vegetation creation: once
vegetation frame update: none
vegetation disposal service: none
vegetation snapshot/readback: none
horizontal flight world-bound admission: none
```

This is a source-level ownership mismatch, not a measured pixel defect. No browser traversal was run.

## Required parent domain

```txt
open-above-vegetation-spatial-coverage-authority-domain
```

## Next safe ledge

```txt
VegetationFrameId + world/config fingerprint
  -> deterministic camera-relative coverage plan
  -> stable chunk IDs and seeds
  -> detached candidate generation
  -> world/exclusion/budget admission
  -> atomic adoption or last-good preservation
  -> exactly-once retirement
  -> revisioned grass/flower exclusion artifact
  -> first visible vegetation-frame acknowledgement
```

## Retained priorities

Runtime admission, session/frame ownership, procedural-world identity, terrain atomic adoption, grass/flower coherence, map authority, mission accessibility and deployment parity remain active dependencies. This documentation pass changes no runtime behavior.