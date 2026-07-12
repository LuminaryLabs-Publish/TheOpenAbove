# START HERE: TheOpenAbove

**Last aligned:** `2026-07-12T13-29-56-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`  
**Branch:** `main`  
**Revision reviewed:** `c2b96fa4d0dc44f6f3cf52762834324e712ed7d9`

## Summary

The active source now drives near and horizon terrain from one frozen camera-relative streaming frame. Horizon cells covered by near terrain are explicitly removed, retained horizon chunks reclassify by LOD and clip signature, skirts cover ownership boundaries, authored fields and roads drape over terrain, lake descriptors are shared and disposal is broader.

The remaining gap is aggregate terrain-stream authority. Near and horizon streamers still mutate live scene groups independently, dispose predecessor meshes before complete candidate success, return no typed adoption result and publish no aggregate commit, rollback or first-visible-frame receipt.

## Plan ledger

**Goal:** preserve the terrain-overlap remediation while making each boundary transition an atomic, revisioned and provable near/horizon aggregate.

- [x] Compare the complete Publish inventory with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Select only `TheOpenAbove` as the oldest central entry with newer repo-local terrain work.
- [x] Review the shared streaming contract, both streamers, terrain surface, overlays, water and tests.
- [x] Identify the interaction loop, domains, all 68 active source-backed kits and services.
- [x] Reconcile resolved overlap defects and remaining atomic-adoption gaps.
- [x] Add fresh timestamped architecture and system audits.
- [x] Refresh root `.agent` state and central tracking.
- [x] Push directly to `main`; create no branch or pull request.
- [ ] Implement candidate staging, aggregate commit/rollback and browser/Pages frame proof.

## Read this first

```txt
.agent/trackers/2026-07-12T13-29-56-04-00/project-breakdown.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/architecture-audit/2026-07-12T13-29-56-04-00-terrain-streaming-ownership-authority-dsk-map.md
.agent/render-audit/2026-07-12T13-29-56-04-00-near-horizon-aggregate-frame-commit-gap.md
.agent/gameplay-audit/2026-07-12T13-29-56-04-00-camera-boundary-stream-transition-loop.md
.agent/interaction-audit/2026-07-12T13-29-56-04-00-terrain-stream-frame-admission-map.md
.agent/terrain-system-audit/2026-07-12T13-29-56-04-00-shared-frame-atomic-adoption-contract.md
.agent/deploy-audit/2026-07-12T13-29-56-04-00-terrain-boundary-browser-fixture-gate.md
.agent/turn-ledger/2026-07-12T13-29-56-04-00.md
.agent/kit-registry.json
```

## Interaction loop

```txt
boot
  -> create seeded world and visual domain
  -> create terrain surface, near streamer and horizon streamer
  -> create gameplay and presentation owners
  -> start RAF

frame
  -> update flight, mail, airstream and camera
  -> create one frozen TerrainStreamingFrame
  -> near streamer adopts requirements
  -> horizon streamer clips against the same near bounds and adopts requirements
  -> update grass, flowers, water, atmosphere and HDR
  -> render

boundary transition
  -> frame revision changes
  -> live near meshes are removed/rebuilt
  -> live horizon meshes are removed/rebuilt/reclassified
  -> no aggregate commit result exists before draw
```

## Domains in use

```txt
browser shell, canvas, map and fatal projection
runtime boot, session, input, RAF and public host
balloon simulation, airstream and mail
seeded world generation, membership and authored anchors
terrain streaming-frame classification and ownership partitioning
near/horizon geometry, LOD, skirts, adoption and disposal
vegetation, landmarks, draped overlays and shared lakes
grass and flower streaming
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

## Resolved

```txt
shared near/horizon camera frame
exact clipping of near-owned horizon cells
retained horizon clip-signature reclassification
removed horizon expansion and vertical offset
near and horizon skirts
consistent slope sampling
narrow route protection without duplicate final blend
terrain-draped fields and road
shared lake descriptors and feathered edges
landmark and water disposal
terrain ownership, route and overlay checks wired into npm run check
```

## Remaining

```txt
no typed TerrainStreamFrameId
no world/config/quality/geometry fingerprint on the frame
no detached candidate chunk sets
no aggregate near/horizon parity result
no atomic adoption or rollback
no exactly-once retirement receipt
near chunk metadata omits frame revision
no TerrainStreamCommitResult
no TerrainVisibleFrameAck
no deployed browser boundary proof
```

## Required parent domain

```txt
open-above-terrain-streaming-ownership-authority-domain
```

## Next safe ledge

```txt
TerrainStreamFrameId + input fingerprint
  -> immutable ownership plan
  -> detached near/horizon candidate builds
  -> aggregate parity admission
  -> atomic commit or rollback
  -> predecessor retirement receipt
  -> first visible frame acknowledgement
```