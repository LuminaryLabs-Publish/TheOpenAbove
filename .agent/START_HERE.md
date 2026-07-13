# START HERE: TheOpenAbove

**Last aligned:** `2026-07-13T09-40-27-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`  
**Branch:** `main`  
**Runtime revision reviewed:** `0af1b7c8d3131c2af6f60bcc0d655bf399f52ef5`  
**Status:** `map-world-dual-surface-frame-coherence-authority-audited`

## Summary

TheOpenAbove is an Air Mail hot-air-balloon experience with deterministic world generation, airstream routing, parcel delivery, HDR world rendering, a parchment map, Nexus telemetry and browser/headless proof surfaces.

The current priority is dual-surface frame coherence. The WebGL world and Canvas2D map use separate RAF chains. Opening the map exposes it before its first matching draw, and both surfaces read mutable flight/mail state without a shared frame envelope, commit result or visible-frame acknowledgement.

## Plan ledger

**Goal:** publish one immutable flight/mail frame envelope and prove every required world/map surface commit before map-open or coherent-frame success is reported.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have ledger and root `.agent` coverage.
- [x] Select only `LuminaryLabs-Publish/TheOpenAbove` under the oldest eligible rule.
- [x] Trace world RAF, map RAF, map input, mutable getters, render submission and public readback.
- [x] Preserve all 68 source-backed kits, 12 implied adapters and their services.
- [x] Add the `2026-07-13T09-40-27-04-00` tracker and audit family.
- [x] Refresh all required root `.agent` documents.
- [x] Change no runtime source, dependency, script or workflow.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Runtime dual-surface authority and executable browser fixtures remain future work.

## Read this pass first

```txt
.agent/trackers/2026-07-13T09-40-27-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-13T09-40-27-04-00.md
.agent/architecture-audit/2026-07-13T09-40-27-04-00-map-world-dual-surface-frame-coherence-dsk-map.md
.agent/render-audit/2026-07-13T09-40-27-04-00-map-world-visible-frame-coherence-gap.md
.agent/interaction-audit/2026-07-13T09-40-27-04-00-map-open-frame-admission-map.md
.agent/map-system-audit/2026-07-13T09-40-27-04-00-dual-surface-frame-envelope-contract.md
.agent/deploy-audit/2026-07-13T09-40-27-04-00-dual-surface-frame-fixture-gate.md
```

## Interaction loop

```txt
world RAF
  -> update flight/mail/visual state only while map is closed
  -> render WebGL every callback
  -> schedule successor world RAF

M key
  -> expose map overlay immediately
  -> schedule first map RAF

map RAF
  -> read mutable simulation and parcel state
  -> draw Canvas2D map
  -> schedule successor map RAF

public readback
  -> capture fresh aggregate
  -> no committed world/map frame pair
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
planned dual-surface authority including parent: 15
```

The complete kit-by-kit service map is in `.agent/current-audit.md`, the latest tracker and `.agent/kit-registry.json`.

## Required parent domain

```txt
open-above-map-world-dual-surface-frame-coherence-authority-domain
```

## Next safe ledge

Introduce immutable flight/mail revisions and one `DualSurfaceFrameEnvelope`. Make map-open a typed transition that commits a matching map frame before visible acceptance, correlate world and map projection results, preserve the last complete frame on partial failure, and expose detached receipts through telemetry and `GameHost`.

## Retained priorities

Runtime-provider admission, delivery completion, flight-session persistence, lifecycle/frame ownership, fixed-step input, telemetry immutability, bounded-world membership, terrain/vegetation adoption, flora exclusions, HDR coherence and map accessibility remain active dependencies.