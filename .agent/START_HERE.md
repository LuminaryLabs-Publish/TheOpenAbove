# START HERE: TheOpenAbove

**Last aligned:** `2026-07-12T23-50-01-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`  
**Branch:** `main`  
**Runtime revision reviewed:** `c2b96fa4d0dc44f6f3cf52762834324e712ed7d9`  
**Status:** `air-mail-session-persistence-authority-audited`

## Summary

TheOpenAbove is an Air Mail hot-air-balloon experience with deterministic world generation, airstream routing, parcel delivery, camera-relative terrain and flora, HDR rendering, a parchment map, Nexus telemetry and browser/headless proof surfaces.

This pass selected only TheOpenAbove using the oldest eligible central-ledger rule. The runtime constructs a fresh default parcel and balloon state on every boot, mutates flight and delivery progress only in memory, and has no save, durable commit, restore, migration, conflict, page-lifecycle flush or restored-frame acknowledgement.

## Plan ledger

**Goal:** preserve the complete source-backed repository breakdown and define one truthful durable transaction for flight and mail progress.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Select only `LuminaryLabs-Publish/TheOpenAbove` as the oldest eligible central entry.
- [x] Read browser composition, balloon simulation, mail parcel/progress and package proof surfaces.
- [x] Preserve all active domains, 68 source-backed kits, 12 runtime-implied adapters and offered services.
- [x] Add a timestamped tracker, turn ledger and persistence audit family.
- [x] Refresh required root `.agent` state.
- [ ] Runtime implementation and executable persistence fixtures remain future work.

## Read this pass first

```txt
.agent/trackers/2026-07-12T23-50-01-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-12T23-50-01-04-00.md
.agent/architecture-audit/2026-07-12T23-50-01-04-00-flight-session-persistence-authority-dsk-map.md
.agent/render-audit/2026-07-12T23-50-01-04-00-restored-session-visible-frame-gap.md
.agent/gameplay-audit/2026-07-12T23-50-01-04-00-flight-delivery-reload-loop.md
.agent/interaction-audit/2026-07-12T23-50-01-04-00-save-restore-lifecycle-admission-map.md
.agent/persistence-audit/2026-07-12T23-50-01-04-00-session-schema-commit-restore-contract.md
.agent/deploy-audit/2026-07-12T23-50-01-04-00-session-persistence-fixture-gate.md
```

## Selection

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0
selected: LuminaryLabs-Publish/TheOpenAbove
selection basis: oldest eligible central update
excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

## Interaction loop

```txt
boot -> fresh default route, parcel and balloon state
frame -> mutate flight and delivery state in memory
completion -> parcel becomes delivered in memory
refresh/navigation -> no durable capture or commit
next boot -> default parcel and balloon state are recreated
```

## Domains in use

```txt
browser shell, input, RAF, map, fatal projection and GameHost
Nexus composition, clocks, resources, events, journals and telemetry
balloon flight, airstream and air-mail delivery
seeded world, terrain, vegetation, grass and flowers
balloon object, camera, materials and presentation
quality, dynamic resolution, sky, clouds, water, HDR and lens
headless proof, tests, build and Pages
missing persistence capture, commit, restore, migration, conflict and visible proof
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
planned persistence authority including parent: 22
```

The complete kit-by-kit inventory and service map are in the current tracker and `.agent/kit-registry.json`.

## Main finding

`createGame()` always creates the default mail route, a fresh parcel and a balloon simulation starting at `[0, 105, 0]`. Delivery changes only mutable in-memory state. No persistence domain is imported or installed, and no browser lifecycle path saves or restores a verified generation.

## Required parent domain

```txt
open-above-flight-session-persistence-authority-domain
```

## Next safe ledge

```txt
SaveSessionCommand
  -> collect detached flight/mail/world/route participant snapshots
  -> canonicalize and fingerprint
  -> stage and readback-verify a new generation
  -> compare writer and predecessor
  -> atomically promote the active generation
  -> publish SaveCommitResult

RestoreSessionCommand
  -> verify active or backup generation
  -> migrate or quarantine
  -> prepare and validate every participant
  -> atomically install one restored session generation
  -> publish RestoreCommitResult
  -> acknowledge the first visible restored frame
```

## Retained priorities

Immutable runtime admission, lifecycle/frame ownership, fixed-step input, telemetry immutability, world/flight membership, terrain and vegetation adoption, flora exclusions, HDR coherence, map semantics and deployment parity remain active dependencies. This documentation pass changes no runtime behavior.