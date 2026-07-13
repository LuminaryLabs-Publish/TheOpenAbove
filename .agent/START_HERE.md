# START HERE: TheOpenAbove

**Last aligned:** `2026-07-13T00-00-02-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`  
**Branch:** `main`  
**Runtime revision reviewed:** `c2b96fa4d0dc44f6f3cf52762834324e712ed7d9`  
**Status:** `air-mail-session-persistence-central-reconciled`

## Summary

TheOpenAbove is an Air Mail hot-air-balloon experience with deterministic world generation, airstream routing, parcel delivery, camera-relative terrain and flora, HDR rendering, a parchment map, Nexus telemetry and browser/headless proof surfaces.

The current priority is session persistence. Every boot creates a fresh route, parcel and balloon simulation; flight and delivery progress remain memory-only; no durable save, verified restore, migration, quarantine, conflict, lifecycle-flush or restored-frame authority is installed.

## Plan ledger

**Goal:** preserve the complete source-backed breakdown and keep repo-local and central records synchronized around one truthful durable flight-session boundary.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have ledger and root `.agent` coverage.
- [x] Select only `LuminaryLabs-Publish/TheOpenAbove`.
- [x] Preserve the interaction loop, all active domains, 68 source-backed kits, 12 implied adapters and services.
- [x] Add the `2026-07-13T00-00-02-04-00` tracker and audit reconciliation family.
- [x] Refresh all required root `.agent` documents and registry.
- [x] Synchronize the central ledger and change log.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Runtime persistence and executable fixtures remain future work.

## Read this pass first

```txt
.agent/trackers/2026-07-13T00-00-02-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-13T00-00-02-04-00.md
.agent/architecture-audit/2026-07-13T00-00-02-04-00-flight-session-persistence-central-reconciliation-dsk-map.md
.agent/render-audit/2026-07-13T00-00-02-04-00-restored-session-visible-frame-central-reconciliation.md
.agent/gameplay-audit/2026-07-13T00-00-02-04-00-flight-delivery-reload-central-reconciliation.md
.agent/interaction-audit/2026-07-13T00-00-02-04-00-save-restore-lifecycle-central-reconciliation-map.md
.agent/persistence-audit/2026-07-13T00-00-02-04-00-central-ledger-reconciliation.md
.agent/deploy-audit/2026-07-13T00-00-02-04-00-persistence-central-sync-gate.md
.agent/central-sync-audit/2026-07-13T00-00-02-04-00-repo-ledger-flight-persistence-reconciliation.md
```

## Interaction loop

```txt
boot -> fresh default routes, parcel and balloon state
frame -> mutate flight, airstream and delivery state in memory
render -> project current world, map and telemetry
lifecycle end -> no durable save or verified flush
next boot -> reconstruct defaults without restore
```

## Domain and kit census

```txt
runtime/gameplay kits: 15
balloon/object/presentation kits: 15
visual/world/environment kits: 33
UI kits: 1
tooling/proof kits: 4
active source-backed total: 68
runtime-implied adapters: 12
inactive/retired legacy: 12
planned persistence authority including parent: 22
```

The complete kit-by-kit service map is in `.agent/current-audit.md`, the latest tracker and `.agent/kit-registry.json`.

## Required parent domain

```txt
open-above-flight-session-persistence-authority-domain
```

## Next safe ledge

Implement detached balloon/mail participant adapters, schema validation, canonicalization and fingerprinting first. Then add staging/readback verification, atomic active-generation promotion, detached restore preparation, migration/quarantine/conflict handling and first-restored-frame proof.

## Retained priorities

Immutable runtime admission, lifecycle/frame ownership, fixed-step input, telemetry immutability, bounded-world flight membership, terrain/vegetation adoption, flora exclusions, HDR coherence, map semantics and deployment parity remain active dependencies.