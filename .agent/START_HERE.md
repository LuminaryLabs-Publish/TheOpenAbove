# START HERE: TheOpenAbove

**Last aligned:** `2026-07-12T21-31-40-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`  
**Branch:** `main`  
**Runtime revision reviewed:** `c2b96fa4d0dc44f6f3cf52762834324e712ed7d9`  
**Status:** `telemetry-snapshot-immutability-central-reconciled`

## Summary

TheOpenAbove is an Air Mail hot-air-balloon experience with deterministic world generation, airstream routing, parcel delivery, camera-relative terrain and flora, HDR rendering, a parchment map, Nexus telemetry and browser/headless proof surfaces.

This pass selected only TheOpenAbove because its repo-local telemetry snapshot immutability audit was newer than the central ledger. The source still stores one complete mutable telemetry object as `BalloonSnapshot` and its nested `visual` object as `VisualSnapshot`. Nexus resources and journals retain supplied references, and engine/GameHost getters expose those references without identity, freezing, clone-on-read or visible-frame acknowledgement.

## Plan ledger

**Goal:** keep one synchronized, source-backed breakdown and define the authority required for immutable telemetry resources, journal evidence, public readback and visible presentation.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Detect newer repo-local audit state in TheOpenAbove.
- [x] Select and modify only `LuminaryLabs-Publish/TheOpenAbove`.
- [x] Re-read snapshot construction, Nexus resource storage, journal recording and public readback.
- [x] Preserve the full interaction loop, domains, 68 active kits and offered services.
- [x] Add a new reconciliation tracker and system audit family.
- [x] Refresh required root `.agent` state.
- [ ] Runtime implementation and executable mutation fixtures remain future work.

## Read this pass first

```txt
.agent/trackers/2026-07-12T21-31-40-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-12T21-31-40-04-00.md
.agent/architecture-audit/2026-07-12T21-31-40-04-00-telemetry-immutability-central-reconciliation-dsk-map.md
.agent/render-audit/2026-07-12T21-31-40-04-00-mutable-telemetry-visible-proof-reconciliation.md
.agent/gameplay-audit/2026-07-12T21-31-40-04-00-public-readback-mutation-reconciliation.md
.agent/interaction-audit/2026-07-12T21-31-40-04-00-snapshot-publication-readback-reconciliation.md
.agent/telemetry-audit/2026-07-12T21-31-40-04-00-immutable-resource-readback-reconciliation.md
.agent/deploy-audit/2026-07-12T21-31-40-04-00-telemetry-fixture-central-gate.md
```

The source audit at `2026-07-12T21-18-18-04-00` remains the immediate technical predecessor. This pass reconciles and revalidates it.

## Selection

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0
repo-local state newer than central: TheOpenAbove
selected: LuminaryLabs-Publish/TheOpenAbove
excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

## Interaction loop

```txt
RAF while map is closed
  -> update balloon, mail, airstream, camera and visual state
  -> build complete getSnapshot() projection
  -> telemetry system stores complete object as BalloonSnapshot
  -> telemetry system stores snapshot.visual as VisualSnapshot
  -> Nexus journal records supplied references
  -> engine.openAbove getters expose resource references
  -> GameHost exposes the complete resource reference
  -> render frame

external reader
  -> receives mutable engine-owned object
  -> can alter complete or visual resource values without a tick
  -> can make journal-held previous/value evidence drift
  -> no snapshot ID, mutation rejection or visible-frame receipt exists
```

## Domains in use

```txt
browser shell, canvas, map, fatal projection and public host
runtime boot, session, input, RAF and telemetry
Nexus resources, events and journals
balloon simulation, steering, burner, vent, altitude and distance
airstream routes, sampling, force, visuals and debug
mail parcel, towns, delivery volumes and progress
seeded world, terrain, vegetation, grass and flowers
balloon object, camera, rigging, materials and presentation
quality, dynamic resolution, sky, clouds, water, HDR and lens
map projection, headless proof, tests, build and Pages
missing telemetry identity, immutability, alias control, readback isolation and visible proof
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
planned telemetry authority including parent: 25
```

The complete kit-by-kit inventory and service map are in the current tracker and `.agent/kit-registry.json`.

## Main finding

```txt
BalloonSnapshot = snapshot
VisualSnapshot = snapshot.visual
BalloonSnapshot.visual === VisualSnapshot
```

Nexus `setResource()` stores supplied values directly, `getResource()` returns them directly, and journal rows retain `previous` and `value` references. `engine.openAbove` and `window.GameHost` expose those engine-owned objects. No clone, freeze, revision, fingerprint, alias policy, atomic multi-resource result or consumer receipt protects publication truth.

## Required parent domain

```txt
open-above-telemetry-snapshot-immutability-authority-domain
```

## Next safe ledge

```txt
TelemetrySnapshotCommand
  -> validate session, frame and expected predecessor
  -> collect detached provider projections and source revisions
  -> normalize a canonical candidate
  -> derive complete and visual projections
  -> reject writable aliasing
  -> calculate content fingerprint
  -> freeze or establish explicit copy boundaries
  -> atomically commit both resources
  -> append immutable journal evidence
  -> expose immutable revisioned readback
  -> collect consumer receipts
  -> acknowledge the first matching visible frame
```

## Retained priorities

Runtime admission, session/frame ownership, fixed-step input, procedural-world and flight membership, terrain and vegetation atomic adoption, flora exclusion coherence, HDR surface correctness, map authority, accessibility and deployment parity remain active dependencies. This documentation pass changes no runtime behavior.