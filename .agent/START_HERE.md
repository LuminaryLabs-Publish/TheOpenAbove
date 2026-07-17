# START HERE: TheOpenAbove Balloon Rigging Frame Budget and Resource Retirement

**Last aligned:** `2026-07-17T10-41-44-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`  
**Branch:** `main`  
**Reviewed pre-audit repository head:** `9d9214b8c8cdbadf5c2ce40e6a794b1f88189877`  
**Status:** `balloon-rigging-frame-budget-resource-retirement-authority-audited`

## Summary

All ten eligible Publish repositories were tracked, documented, root-agent-covered, and synchronized. TheOpenAbove was selected by the oldest documented-selection rule.

The current rigging keeps dynamic GPU buffers stable, but its CPU update path creates fresh endpoint, point, tangent, frame, binormal, and ring vectors every flight frame. Rigging and rope resources also lack an explicit owner/dispose result, and balloon replacement removes prior scene children without retiring their geometries and materials.

## Intent

Preserve the current soft-rope appearance while binding one rigging generation to reusable scratch state, dynamic buffers, update budgets, replacement, retirement, diagnostics, and the matching rendered frame.

## What needs to happen

```txt
balloon model and rigging construction
  -> RiggingResourceAdmissionResult
  -> immutable resource manifest

accepted flight frame
  -> RiggingFrameUpdateResult
  -> RiggingFrameBudgetResult

replacement / restart / disposal
  -> RiggingResourceRetirementResult

render commit
  -> RiggingFrameDigest
  -> FirstRiggingBoundFrameAck
```

## Checklist

- [x] Compare all 11 Publish repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm ten eligible ledgers and root `.agent` states.
- [x] Select only TheOpenAbove by oldest documented-selection time.
- [x] Reconcile the interaction loop, domains, 125 active surfaces, kits, and services.
- [x] Add the `2026-07-17T10-41-44-04-00` audit family on `main`.
- [ ] Implement scratch reuse, resource manifests, stale-update rejection, exact retirement, and diagnostics.
- [ ] Run long-flight, replacement, browser, artifact, and Pages fixtures.

## Read this pass first

```txt
.agent/trackers/2026-07-17T10-41-44-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-17T10-41-44-04-00.md
.agent/architecture-audit/2026-07-17T10-41-44-04-00-balloon-rigging-frame-budget-resource-retirement-dsk-map.md
.agent/render-audit/2026-07-17T10-41-44-04-00-rigging-buffer-allocation-visible-frame-gap.md
.agent/gameplay-audit/2026-07-17T10-41-44-04-00-long-flight-rigging-allocation-loop.md
.agent/interaction-audit/2026-07-17T10-41-44-04-00-rigging-update-retirement-command-result-map.md
.agent/rigging-system-audit/2026-07-17T10-41-44-04-00-rope-scratch-buffer-resource-contract.md
.agent/deploy-audit/2026-07-17T10-41-44-04-00-rigging-long-flight-resource-fixture-gate.md
.agent/central-sync-audit/2026-07-17T10-41-44-04-00-oldest-selection-rigging-resource-reconciliation.md
```

## Required parent domain

`open-above-balloon-rigging-frame-budget-resource-retirement-authority-domain`

## Census

```txt
active local source-backed surfaces: 81
runtime-implied adapters:            14
Nexus Engine provider surfaces:      30
active documented surfaces:         125
inactive Air Mail migration:          6
planned rigging surfaces:            20
```

## Claim boundary

Documentation only. No allocation plateau, leak-free replacement, exact resource retirement, rigging/frame convergence, artifact parity, Pages parity, or production readiness is claimed.