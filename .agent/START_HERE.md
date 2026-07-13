# START HERE: TheOpenAbove

**Last aligned:** `2026-07-13T13-39-10-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`  
**Branch:** `main`  
**Runtime revision reviewed:** `a47cb530963e01a07fcc839ca1dcce2f70bd169f`  
**Status:** `staged-world-generation-scheduler-adoption-authority-audited`

## Summary

TheOpenAbove is an Air Mail hot-air-balloon experience with deterministic world generation, airstream routing, parcel delivery, streamed terrain and flora, HDR rendering, a parchment map, Nexus telemetry and headless proof surfaces.

The latest runtime now stages world generation through height, erosion, flow, climate and biome phases after the first rendered frame while preserving the existing sampling API and fallback world. The current priority is the missing scheduler/adoption boundary: map-open pauses generation, and ready-world adoption by terrain, vegetation, grass, flowers and the map is synchronous, unbudgeted and lacks rollback or visible-frame proof.

## Plan ledger

**Goal:** keep deterministic staged generation and first-frame rendering while making progress and all consumer adoption continuous, revision-bound, failure-safe and visibly provable.

- [x] Compare the full Publish inventory against central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `LuminaryLabs-Publish/TheOpenAbove` because its runtime advanced beyond central documentation.
- [x] Trace generation phases, scheduling, fallback, reset, disposal and consumer refresh.
- [x] Preserve all 68 source-backed kits, 12 implied adapters and their services.
- [x] Add the `2026-07-13T13-39-10-04-00` tracker and audit family.
- [x] Refresh all required root `.agent` documents.
- [x] Change no runtime source, dependency, script or workflow.
- [x] Use `main`; create no branch or pull request.
- [ ] Implement the staged-world scheduler and consumer-adoption authority.
- [ ] Execute pure, browser, built-output and Pages fixtures.

## Read this pass first

```txt
.agent/trackers/2026-07-13T13-39-10-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-13T13-39-10-04-00.md
.agent/architecture-audit/2026-07-13T13-39-10-04-00-staged-world-generation-adoption-dsk-map.md
.agent/render-audit/2026-07-13T13-39-10-04-00-generated-world-visible-adoption-gap.md
.agent/gameplay-audit/2026-07-13T13-39-10-04-00-generation-map-pause-loop.md
.agent/interaction-audit/2026-07-13T13-39-10-04-00-generation-command-adoption-map.md
.agent/world-generation-audit/2026-07-13T13-39-10-04-00-scheduler-adoption-contract.md
.agent/deploy-audit/2026-07-13T13-39-10-04-00-staged-generation-fixture-gate.md
.agent/central-sync-audit/2026-07-13T13-39-10-04-00-staged-generation-runtime-reconciliation.md
```

## Current interaction loop

```txt
boot
  -> create staged world generator and fallback-backed consumers
  -> render first WebGL frame

map closed frame
  -> update gameplay
  -> advance fixed generation-unit budget
  -> update render consumers
  -> render

map open frame
  -> skip visual.update and generation work
  -> continue WebGL render at dt 0
  -> draw map from active revision

ready
  -> core swaps active arrays
  -> direct synchronous consumer refresh
  -> terrain and flora rebuild before normal render
  -> map cache refreshes lazily
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
planned scheduler/adoption authority including parent: 16
```

The complete kit and service map is in `.agent/current-audit.md`, `.agent/kit-registry.json` and the latest tracker.

## Required parent domain

```txt
open-above-staged-world-generation-scheduler-adoption-authority-domain
```

## Next safe ledge

Separate generation work admission from gameplay/map pause. Keep the candidate detached, prepare every mandatory world consumer under explicit budgets, commit the sampling and visible consumer revision together, preserve the predecessor on failure and acknowledge the first matching visible frame.

## Retained priorities

Map/world dual-surface frame coherence, runtime-provider admission, delivery completion, flight-session persistence, lifecycle ownership, fixed-step input, telemetry immutability, bounded-world membership, terrain/vegetation ownership, flora exclusions, HDR coherence and map accessibility remain active dependencies.