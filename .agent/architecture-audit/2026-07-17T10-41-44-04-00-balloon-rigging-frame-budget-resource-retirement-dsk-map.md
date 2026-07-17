# Architecture Audit: Balloon Rigging Frame Budget and Resource Retirement DSK Map

**Timestamp:** `2026-07-17T10-41-44-04-00`  
**Status:** proposed authority; not implemented

## Current ownership

```txt
open-above-hot-air-balloon-object-kit
  -> builds envelope, basket, burner, rigging
  -> marks persistentGpuResources
  -> installs model into vehicle

open-above-hot-air-balloon-rigging-kit
  -> builds frame bars and four ropes
  -> animates every rope from flight-derived tension

open-above-rope-kit
  -> allocates dynamic position/normal buffers
  -> computes fresh points and frame vectors each update
  -> rewrites persistent buffers
  -> exposes no dispose service
```

## Source-backed gap

`persistentGpuResources` and `persistentGeometry` are metadata, not resource ownership. No domain binds balloon-model generation, rigging generation, rope buffers, scratch memory, update budgets, replacement, disposal, diagnostics, and visible-frame proof.

## Required parent domain

`open-above-balloon-rigging-frame-budget-resource-retirement-authority-domain`

## DSK breakdown

```txt
identity
  rigging-generation-kit
  rope-generation-kit
  rigging-tension-revision-kit

resource admission
  rigging-resource-manifest-kit
  rope-dynamic-buffer-kit
  rope-endpoint-binding-kit

frame update
  rope-point-scratch-pool-kit
  rope-frame-scratch-pool-kit
  rigging-frame-plan-kit
  rigging-update-budget-kit
  rigging-frame-update-result-kit
  stale-rigging-update-rejection-kit

retirement
  rigging-resource-retirement-kit
  rigging-disposal-idempotency-kit
  balloon-replacement-resource-transfer-kit

projection and proof
  rigging-frame-digest-kit
  first-rigging-bound-frame-ack-kit
  rope-allocation-budget-fixture-kit
  rigging-replacement-long-flight-fixture-kit
```

## Command/result flow

```txt
RiggingResourceAdmissionCommand
  -> RiggingResourceAdmissionResult
  -> immutable resource manifest

RiggingFrameUpdateCommand
  -> reusable scratch state
  -> dynamic buffer writes
  -> RiggingFrameUpdateResult

RiggingFrameBudgetSettlementCommand
  -> RiggingFrameBudgetResult

RiggingResourceRetirementCommand
  -> RiggingResourceRetirementResult

RiggingFrameCommitCommand
  -> RiggingFrameDigest
  -> FirstRiggingBoundFrameAck
```

## Required invariants

- One live rigging generation owns each geometry, material, buffer, and scratch set.
- A retired generation accepts no new update.
- Frame updates do not grow temporary allocation with elapsed play time.
- Replacement retires predecessor resources exactly once.
- Disposal is idempotent.
- Every rigging frame digest cites the accepted model, simulation, tension, rigging, and buffer revisions.

## Boundary

This file defines proposed architecture only. No runtime authority or fixture was implemented.