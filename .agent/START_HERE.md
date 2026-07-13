# START HERE: TheOpenAbove

**Last aligned:** `2026-07-12T21-18-18-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`  
**Branch:** `main`  
**Runtime revision reviewed:** `c2b96fa4d0dc44f6f3cf52762834324e712ed7d9`  
**Status:** `telemetry-snapshot-immutability-readback-authority-audited`

## Summary

TheOpenAbove is an Air Mail hot-air-balloon experience with deterministic world generation, airstream routing, parcel delivery, camera-relative terrain and flora, HDR rendering, a parchment map, Nexus telemetry and browser/headless proof surfaces.

The current audit isolates telemetry snapshot immutability. The Nexus telemetry kit stores one mutable object as `BalloonSnapshot` and stores its nested `visual` object as `VisualSnapshot`. Nexus resources and journals retain supplied object references, and engine/GameHost getters return those references. External readback can therefore mutate both resource views and alter publication evidence without a new tick or visible frame.

## Plan ledger

**Goal:** make every telemetry publication one immutable, revisioned commit across complete and visual resources, journal evidence, public readback and visible-frame acknowledgement.

- [x] Compare all ten accessible Publish repositories with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Select only `TheOpenAbove` as the oldest eligible central entry.
- [x] Trace snapshot construction, Nexus resource storage, journal recording and public readback.
- [x] Identify complete interaction loops, domains, 68 source-backed kits and offered services.
- [x] Define snapshot identity, fingerprint, immutability, alias, atomic commit and readback contracts.
- [x] Add a timestamped tracker and complete system audit family.
- [x] Refresh required root `.agent` state and machine registry.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Runtime implementation and executable mutation fixtures remain future work.

## Read this pass first

```txt
.agent/trackers/2026-07-12T21-18-18-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-12T21-18-18-04-00.md
.agent/architecture-audit/2026-07-12T21-18-18-04-00-telemetry-snapshot-immutability-dsk-map.md
.agent/render-audit/2026-07-12T21-18-18-04-00-mutable-readback-visible-telemetry-gap.md
.agent/gameplay-audit/2026-07-12T21-18-18-04-00-public-readback-resource-alias-loop.md
.agent/interaction-audit/2026-07-12T21-18-18-04-00-snapshot-build-commit-read-map.md
.agent/telemetry-audit/2026-07-12T21-18-18-04-00-resource-alias-freeze-readback-contract.md
.agent/deploy-audit/2026-07-12T21-18-18-04-00-telemetry-immutability-fixture-gate.md
```

The flora-exclusion artifact audit at `2026-07-12T19-31-06-04-00` remains the immediate predecessor.

## Selection

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

TheOpenAbove:     2026-07-12T19-31-06-04-00 selected
IntoTheMeadow:    2026-07-12T19-49-41-04-00
PhantomCommand:   2026-07-12T19-58-07-04-00
PrehistoricRush:  2026-07-12T20-10-25-04-00
HorrorCorridor:   2026-07-12T20-20-02-04-00
ZombieOrchard:    2026-07-12T20-31-27-04-00
MyCozyIsland:     2026-07-12T20-40-56-04-00
TheUnmappedHouse: 2026-07-12T20-51-16-04-00
AetherVale:       2026-07-12T21-10-16-04-00
TheCavalryOfRome: excluded
```

## Interaction loop

```txt
RAF
  -> update balloon, mail, airstream, camera and visual state
  -> build complete getSnapshot() projection
  -> telemetry system stores complete object as BalloonSnapshot
  -> telemetry system stores snapshot.visual as VisualSnapshot
  -> Nexus journal records the same references
  -> engine.openAbove getters return those references
  -> GameHost returns the complete resource reference
  -> render frame

external reader
  -> receives mutable engine-owned object
  -> can alter complete or visual resource values without a tick
  -> can make journal-held value/previous references drift
  -> no snapshot ID, mutation rejection or visible-frame receipt exists
```

## Domains in use

```txt
browser shell, canvas, map, fatal projection and public host
runtime boot, session, input, RAF and telemetry
balloon simulation, steering, airstream and mail delivery
seeded world, terrain, vegetation, grass and flowers
balloon object, camera and presentation
quality, dynamic resolution, sky, clouds, water, HDR and lens
map projection, headless proof, tests, build and Pages
Nexus resource/event/journal storage
missing telemetry identity, immutability, readback isolation and visible proof
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

The complete kit-by-kit inventory and service map are in the current tracker and `.agent/kit-registry.json`.

## Main finding

```txt
BalloonSnapshot = snapshot
VisualSnapshot = snapshot.visual
BalloonSnapshot.visual === VisualSnapshot
```

Nexus `setResource()` stores supplied values directly, `getResource()` returns them directly, and resource journal rows retain `previous` and `value` references. `engine.openAbove` and `window.GameHost` expose those engine-owned objects. No clone, freeze, revision, fingerprint, alias policy or consumer receipt protects publication truth.

## Required parent domain

```txt
open-above-telemetry-snapshot-immutability-authority-domain
```

## Next safe ledge

```txt
TelemetrySnapshotCommand
  -> detached normalized candidate
  -> source revisions and snapshot ID
  -> alias validation
  -> content fingerprint
  -> deep-freeze or explicit copy boundaries
  -> atomic complete/visual resource commit
  -> immutable public readback envelope
  -> immutable journal evidence
  -> first matching visible-frame acknowledgement
```

## Retained priorities

Runtime admission, session/frame ownership, fixed-step input, procedural-world and flight membership, terrain and vegetation atomic adoption, flora exclusion coherence, HDR surface correctness, map authority, mission accessibility and deployment parity remain active dependencies. This documentation pass changes no runtime behavior.
