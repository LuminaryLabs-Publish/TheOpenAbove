# START HERE: TheOpenAbove Balloon Simulation Tick Allocation and Terrain Sample Authority

**Last aligned:** `2026-07-18T01-41-38-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`  
**Branch:** `main`  
**Reviewed pre-audit repository head:** `3446d1c65796bdd57bc1aa1ad7dfc59674292b7e`  
**Status:** `balloon-simulation-tick-allocation-terrain-sample-budget-authority-audited`

## Summary

TheOpenAbove was selected as the oldest synchronized eligible Publish repository after all ten eligible repositories were confirmed centrally tracked, root-agent-covered, and aligned with `main`.

The focused audit found that one accepted balloon simulation tick creates at least nine source-local objects or arrays before allocations inside live Airstream sampling or rendering. The same post-integration terrain height is also requested twice. These are source-backed workload counts, not measured heap, garbage-collection, or performance results.

## Intent

Preserve current flight truth while binding one simulation generation to reusable scratch state, lazy fallback evaluation, one accepted terrain sample, allocation/query budgets, deterministic parity, diagnostics, and the matching rendered frame.

## What needs to happen

```txt
BalloonSimulationGenerationAdmissionCommand
  -> BalloonSimulationGenerationResult

BalloonSimulationTickCommand
  -> BalloonSimulationTickResult

BalloonTerrainSampleCommand
  -> BalloonTerrainSampleResult

BalloonSimulationBudgetSettlementCommand
  -> BalloonSimulationBudgetResult

BalloonSimulationProjectionCommitCommand
  -> BalloonSimulationTickDigest
  -> FirstAllocationBoundFlightFrameAck
```

## Checklist

- [x] Compare all 11 Publish repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm ten eligible central ledgers and root `.agent` states.
- [x] Confirm zero new, missing, undocumented, or runtime-ahead eligible repositories.
- [x] Select only TheOpenAbove by the oldest documented-selection rule.
- [x] Reconcile the interaction loop, domains, and all 125 active documented surfaces with offered services.
- [x] Record the simulation allocation and terrain-query source census.
- [x] Add the `2026-07-18T01-41-38-04-00` audit family on `main`.
- [ ] Implement generation-owned scratch state and one accepted terrain sample.
- [ ] Run deterministic parity, allocation, terrain-query, browser, artifact, and Pages fixtures.

## Read this pass first

```txt
.agent/trackers/2026-07-18T01-41-38-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-18T01-41-38-04-00.md
.agent/architecture-audit/2026-07-18T01-41-38-04-00-balloon-simulation-tick-allocation-terrain-sample-dsk-map.md
.agent/render-audit/2026-07-18T01-41-38-04-00-simulation-tick-budget-visible-frame-gap.md
.agent/gameplay-audit/2026-07-18T01-41-38-04-00-balloon-flight-tick-allocation-loop.md
.agent/interaction-audit/2026-07-18T01-41-38-04-00-simulation-tick-command-result-map.md
.agent/simulation-system-audit/2026-07-18T01-41-38-04-00-flow-scratch-terrain-sample-contract.md
.agent/deploy-audit/2026-07-18T01-41-38-04-00-simulation-allocation-browser-fixture-gate.md
.agent/central-sync-audit/2026-07-18T01-41-38-04-00-oldest-selection-simulation-budget-reconciliation.md
```

## Required parent domain

`open-above-balloon-simulation-tick-allocation-terrain-sample-budget-authority-domain`

## Census

```txt
active local source-backed surfaces: 81
runtime-implied adapters:            14
Nexus Engine provider surfaces:      30
active documented surfaces:         125
inactive Air Mail migration:          6
planned simulation authority:        20
```

## Claim boundary

Documentation only. No measured allocation rate, garbage-collection effect, terrain-query performance, simulation improvement, deterministic parity, matching-frame proof, artifact parity, Pages parity, or production readiness is claimed.