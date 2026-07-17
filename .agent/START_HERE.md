# START HERE: TheOpenAbove Wind Particle Budget and Frame Authority

**Last aligned:** `2026-07-17T15-41-19-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`  
**Branch:** `main`  
**Reviewed pre-audit repository head:** `c066a1f4315ac7e0db87eb30ffb4bbe4201089d4`  
**Previous documented head:** `2d2b4b3cf022905a61d584ada92cf85e0fcf1a82`  
**Status:** `wind-particle-simulation-budget-quality-admission-authority-audited`

## Summary

`TheOpenAbove` was the sole runtime-ahead eligible Publish repository. Seven commits replaced the legacy spline route renderer with a Sky-owned 3,200-particle dust field and added static wind visual policy checks.

The new field reuses typed buffers and explicitly disposes its resources. It still runs one fixed particle/noise policy on every accepted flight frame without quality-tier admission, measured CPU or buffer-write budgets, adaptive degradation, runtime browser proof or exact wind-sample-to-frame acknowledgement.

## Intent

Preserve the compressed dust-stream aesthetic while binding one wind-visual generation to accepted wind evidence, quality policy, particle capacity, update cadence, budgets, degradation, retirement and the matching rendered frame.

## What needs to happen

```txt
WindVisualAdmissionCommand
  -> WindVisualAdmissionResult

WindParticleUpdateCommand
  -> WindParticleUpdateResult

WindVisualBudgetSettlementCommand
  -> WindVisualBudgetResult

WindVisualRetirementCommand
  -> WindVisualRetirementResult

WindVisualProjectionCommitCommand
  -> WindParticleFrameDigest
  -> FirstWindParticleBoundFrameAck
```

## Checklist

- [x] Compare all 11 Publish repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm ten eligible ledgers and root `.agent` states.
- [x] Select only TheOpenAbove as the sole runtime-ahead repository.
- [x] Reconcile seven commits and seven changed files.
- [x] Reconcile the interaction loop, domains, 125 active surfaces, kits and services.
- [x] Remove the retired Airstream visual kit from active inventory.
- [x] Add the wind visual policy test kit to active proof inventory.
- [x] Add the `2026-07-17T15-41-19-04-00` audit family on `main`.
- [ ] Implement quality admission, cadence, budget results, diagnostics and frame proof.
- [ ] Run runtime, long-flight, browser, artifact and Pages fixtures.

## Read this pass first

```txt
.agent/trackers/2026-07-17T15-41-19-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-17T15-41-19-04-00.md
.agent/architecture-audit/2026-07-17T15-41-19-04-00-wind-particle-budget-quality-admission-dsk-map.md
.agent/render-audit/2026-07-17T15-41-19-04-00-fixed-wind-particle-cost-frame-proof-gap.md
.agent/gameplay-audit/2026-07-17T15-41-19-04-00-flight-wind-particle-update-loop.md
.agent/interaction-audit/2026-07-17T15-41-19-04-00-wind-visual-command-result-map.md
.agent/wind-system-audit/2026-07-17T15-41-19-04-00-dust-field-budget-quality-contract.md
.agent/deploy-audit/2026-07-17T15-41-19-04-00-wind-particle-runtime-browser-fixture-gate.md
.agent/central-sync-audit/2026-07-17T15-41-19-04-00-runtime-ahead-wind-particle-reconciliation.md
```

## Required parent domain

`open-above-wind-particle-simulation-budget-quality-admission-authority-domain`

## Census

```txt
active local source-backed surfaces: 81
runtime-implied adapters:            14
Nexus Engine provider surfaces:      30
active documented surfaces:         125
inactive Air Mail migration:          6
planned wind authority surfaces:     20
```

## Claim boundary

Documentation only. No accepted wind-visual budget, device-tier correctness, runtime/browser proof, wind-sample-to-frame convergence, artifact parity, Pages parity or production readiness is claimed.
