# START HERE: TheOpenAbove Route Runtime Resource Retirement

**Last aligned:** `2026-07-14T06-38-49-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`  
**Branch:** `main`  
**Reviewed pre-audit head:** `71a69d1bf4821bb985d4a1eb22658d1d1478ea5c`  
**Runtime revision retained:** `09bb6b95549d9480dfc2caa4517575ab4009ba98`  
**Nexus Engine provider:** `ea973811342fe3ba2a35bb018323d987d3fec4b5`  
**Status:** `route-runtime-resource-retirement-authority-audited`

## Summary

The current Air Mail route creates the engine, world, renderer, balloon, gameplay domains, map, listeners, observers, public `GameHost`, and a perpetual gameplay RAF. Component disposers exist, but `src/main.js` has no route/session owner that calls them, cancels the gameplay loop, rolls back partial startup, retires GPU ownership, removes stale public references, or proves a clean successor route.

## Plan ledger

**Goal:** make route startup, frame ownership, failure rollback, stop, disposal and re-entry one generation-bound transaction.

- [x] Compare all 11 Publish repositories with ten eligible central ledgers.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm no eligible repo is new, missing, undocumented or runtime-ahead.
- [x] Select only TheOpenAbove by oldest eligible central timestamp.
- [x] Identify the complete interaction loop.
- [x] Preserve all 100 active kit, adapter and Core World surfaces and services.
- [x] Add the `2026-07-14T06-38-49-04-00` audit family.
- [x] Use `main`; create no branch or pull request.
- [ ] Implement and execute route retirement, failure rollback, WebGL cleanup and re-entry fixtures.

## Read this pass first

```txt
.agent/trackers/2026-07-14T06-38-49-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-14T06-38-49-04-00.md
.agent/architecture-audit/2026-07-14T06-38-49-04-00-route-runtime-retirement-dsk-map.md
.agent/render-audit/2026-07-14T06-38-49-04-00-webgl-resource-retirement-gap.md
.agent/gameplay-audit/2026-07-14T06-38-49-04-00-continuous-session-route-exit-loop.md
.agent/interaction-audit/2026-07-14T06-38-49-04-00-route-stop-dispose-result-map.md
.agent/lifecycle-audit/2026-07-14T06-38-49-04-00-runtime-resource-retirement-contract.md
.agent/deploy-audit/2026-07-14T06-38-49-04-00-route-reentry-retirement-fixture-gate.md
.agent/central-sync-audit/2026-07-14T06-38-49-04-00-route-retirement-central-reconciliation.md
```

## Main finding

```txt
existing component services
  -> simulation.dispose removes input listeners
  -> airstream.dispose removes visual/debug children
  -> mail.dispose removes town visuals
  -> map.dispose cancels map RAF, observer and key listener
  -> visual.dispose retires world and major render children

missing route authority
  -> gameplay RAF request ID is discarded
  -> no aggregate stop/dispose command
  -> no partial-startup rollback
  -> no renderer/context retirement receipt
  -> no stale callback rejection
  -> no GameHost retirement
  -> no first-successor-route-frame acknowledgement
```

## Required parent domain

```txt
open-above-route-runtime-resource-retirement-authority-domain
```

## Next safe ledge

Add a route runtime owner that registers every acquired callback, listener, observer, subscription, public reference, scene object and GPU resource. Stop frame admission first, dispose participants in dependency order, publish per-owner receipts, clear `window.GameHost`, and prove same-document re-entry with no predecessor callback or resource ownership.

## Retained audits

Pinned-provider contracts, explicit Core World composition, feature/foundation adoption, world generation, grass publication, map/world coherence, Air Mail completion and flight persistence remain valid and open.

## Do not claim

Do not claim complete route cleanup, failure rollback, renderer/context retirement, safe re-entry, stale-callback isolation, source/build/Pages lifecycle parity or production readiness until the fixture matrix passes.