# START HERE: TheOpenAbove

**Last aligned:** `2026-07-12T19-31-06-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`  
**Branch:** `main`  
**Runtime revision reviewed:** `c2b96fa4d0dc44f6f3cf52762834324e712ed7d9`  
**Status:** `flora-exclusion-artifact-coherence-authority-audited`

## Summary

TheOpenAbove is an Air Mail hot-air-balloon experience with deterministic world generation, parcel delivery, camera-relative terrain, streamed grass and flowers, boot-time tree vegetation, HDR rendering, a parchment map, telemetry and browser/headless proof surfaces.

The current audit isolates flora exclusion coherence. Grass and flower systems each snapshot `vegetation.treePositions` into separate private spatial maps at construction. Grass also snapshots vegetation cluster geometry for density shaping. Neither consumer receives a vegetation revision, exclusion-artifact fingerprint, replacement notification or stale-result fence.

## Plan ledger

**Goal:** make vegetation exclusion one immutable, revisioned artifact that grass and flowers must admit before chunk generation, so vegetation replacement cannot leave stale overlaps or mismatched visible flora.

- [x] Compare all ten accessible Publish repositories with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger coverage and recorded root `.agent` state.
- [x] Select only `TheOpenAbove` by the oldest eligible central timestamp.
- [x] Identify the complete interaction loop and all active domains.
- [x] Preserve all 68 active source-backed kits and offered services.
- [x] Trace vegetation construction, grass/flower exclusion snapshots, chunk rebuilds and visual update order.
- [x] Add a timestamped tracker, turn ledger and architecture/system audit family.
- [x] Refresh required root `.agent` state and machine registry.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Implement the authority and executable source/build/Pages fixtures.

## Read this first

```txt
.agent/trackers/2026-07-12T19-31-06-04-00/project-breakdown.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/architecture-audit/2026-07-12T19-31-06-04-00-flora-exclusion-artifact-dsk-map.md
.agent/render-audit/2026-07-12T19-31-06-04-00-stale-tree-exclusion-visible-flora-gap.md
.agent/gameplay-audit/2026-07-12T19-31-06-04-00-vegetation-replacement-flora-overlap-loop.md
.agent/interaction-audit/2026-07-12T19-31-06-04-00-exclusion-artifact-consumer-admission-map.md
.agent/grass-system-audit/2026-07-12T19-31-06-04-00-shared-vegetation-exclusion-revision-contract.md
.agent/deploy-audit/2026-07-12T19-31-06-04-00-flora-exclusion-coherence-fixture-gate.md
.agent/turn-ledger/2026-07-12T19-31-06-04-00.md
.agent/kit-registry.json
```

The flight/world membership audit at `2026-07-12T17-41-25-04-00` remains the immediate predecessor.

## Selection

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

## Interaction loop

```txt
boot
  -> build seeded world and terrain
  -> create one boot-time vegetation cluster field
  -> derive treePositions and cluster records
  -> create grass private obstacle/proximity indexes from those records
  -> create flower private obstacle index from those records
  -> start camera-relative grass and flower chunk streaming

camera crosses flora chunk boundary
  -> grass independently removes and builds live chunks
  -> flower independently removes and builds live chunks
  -> both query their construction-time exclusion snapshots
  -> no vegetation or exclusion revision is checked
  -> render HDR frame and publish counts only

future vegetation replacement or rebuild
  -> tree ownership can change
  -> grass and flower exclusion snapshots remain predecessor-derived
  -> stale candidates can overlap current trees or preserve obsolete clearings
  -> no cross-consumer parity result or visible-frame acknowledgement exists
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
boot-time vegetation clusters and tree-position records
grass/flower placement, private exclusions, chunks, LOD, culling and wind
balloon construction, rigging, material, camera and secondary presentation
quality, dynamic resolution, sky, sun, clouds, water, HDR and lens response
parchment-map projection, headless proof, tests, build and Pages
missing shared vegetation-exclusion artifact, admission, replacement and proof
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

The complete kit-by-kit inventory and service map are in the latest tracker and `.agent/kit-registry.json`.

## Main finding

`createGrassFieldDomain()` copies `vegetation.treePositions` and `vegetation.clusters` into private query structures once. `createFlowerFieldDomain()` separately copies `vegetation.treePositions` into another private grid and applies a different clearance radius. Their `update()` methods only move camera-relative chunk windows; no service refreshes those exclusion indexes or binds chunks to a vegetation/exclusion revision.

This is already an ownership gap and becomes a visible overlap defect as soon as the retained vegetation-streaming plan replaces the boot field. The repository currently cannot prove that a grass or flower chunk was generated against the vegetation generation shown in the same frame.

## Required parent domain

```txt
open-above-flora-exclusion-artifact-authority-domain
```

## Next safe ledge

```txt
VegetationCommitResult
  -> immutable FloraExclusionArtifact
  -> artifact fingerprint and revision
  -> grass/flower candidate admission
  -> atomic paired chunk adoption or last-good retention
  -> stale artifact rejection
  -> first matching visible-frame acknowledgement
```

## Retained priorities

Runtime admission, session/frame ownership, procedural-world identity, flight/world membership, terrain and vegetation atomic adoption, HDR coherence, map authority, mission accessibility and deployment parity remain active dependencies. This documentation pass changes no runtime behavior.