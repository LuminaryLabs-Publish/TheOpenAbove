# START HERE: TheOpenAbove Map-Open Dual-Surface Render Work Budget

**Last aligned:** `2026-07-18T12-38-04-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`  
**Branch:** `main`  
**Reviewed pre-audit repository head:** `28bed180bac93a326dfa1a31ab54699387698086`  
**Status:** `map-open-dual-surface-render-work-budget-authority-audited`

## Summary

TheOpenAbove was selected as the oldest synchronized eligible Publish repository after all ten eligible repositories were confirmed centrally tracked, root-agent-covered, and aligned with `main`.

The focused audit found that opening the parchment map leaves Journey's primary RAF and full Experience render path active while starting a second map-owned RAF. The map redraws mostly retained state every frame, including 90 decorative circles and a newly created reference-card gradient, without one shared surface policy or dirty-state budget.

## Intent

Preserve the current map interaction and translucent world presentation while binding one map-open generation to background-scene policy, map dirty-state admission, RAF ownership, combined work budgets, diagnostics, retirement, and the matching visible frame.

## What needs to happen

```txt
MapOpenGenerationAdmissionCommand
  -> MapOpenGenerationResult

MapSurfacePlanCommand
  -> MapSurfacePlanResult

MapRedrawAdmissionCommand
  -> MapRedrawAdmissionResult

MapRenderWorkSettlementCommand
  -> MapRenderWorkBudgetResult

MapProjectionCommitCommand
  -> MapSurfaceDigest
  -> FirstMapBoundFrameAck
```

## Checklist

- [x] Compare all 11 Publish repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm ten eligible central ledgers and root `.agent` states.
- [x] Confirm zero new, missing, undocumented, or runtime-ahead eligible repositories.
- [x] Select only TheOpenAbove by the oldest documented-selection rule.
- [x] Reconcile the interaction loop, domains, and all 125 active documented surfaces with offered services.
- [x] Record the map-open dual-RAF and Canvas2D redraw source census.
- [x] Add the `2026-07-18T12-38-04-04-00` audit family on `main`.
- [ ] Implement explicit background-scene and map-redraw admission policies.
- [ ] Run dual-RAF, dirty-redraw, resize, transition, browser, artifact, and Pages fixtures.

## Read this pass first

```txt
.agent/trackers/2026-07-18T12-38-04-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-18T12-38-04-04-00.md
.agent/architecture-audit/2026-07-18T12-38-04-04-00-map-open-dual-surface-render-work-dsk-map.md
.agent/render-audit/2026-07-18T12-38-04-04-00-map-open-dual-raf-visible-frame-gap.md
.agent/gameplay-audit/2026-07-18T12-38-04-04-00-map-open-flight-suspension-render-loop.md
.agent/interaction-audit/2026-07-18T12-38-04-04-00-map-open-surface-command-result-map.md
.agent/map-system-audit/2026-07-18T12-38-04-04-00-parchment-dirty-redraw-budget-contract.md
.agent/deploy-audit/2026-07-18T12-38-04-04-00-map-dual-raf-browser-fixture-gate.md
.agent/central-sync-audit/2026-07-18T12-38-04-04-00-oldest-selection-map-render-reconciliation.md
```

## Required parent domain

`open-above-map-open-dual-surface-render-work-budget-authority-domain`

## Census

```txt
active local source-backed surfaces: 81
runtime-implied adapters:            14
Nexus Engine provider surfaces:      30
active documented surfaces:         125
inactive Air Mail migration:          6
planned map render authority:        20
```

## Claim boundary

Documentation only. No measured RAF cadence, Canvas2D cost, GPU cost, frame-time regression, performance improvement, matching-frame proof, artifact parity, Pages parity, or production readiness is claimed.