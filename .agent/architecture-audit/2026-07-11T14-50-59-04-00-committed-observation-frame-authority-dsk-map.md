# Architecture Audit: Committed Observation Frame Authority DSK Map

**Timestamp:** `2026-07-11T14-50-59-04-00`

## Summary

The current runtime has mutable state owners and rendering consumers, but no domain owns the transition from current state to externally committed observation. Nexus telemetry publishes before render and HUD completion, so the public read model is not a frame commit.

## Plan ledger

**Goal:** define the DSK boundary that admits one simulation tick and delivery result, gathers render/HUD/telemetry acknowledgements and publishes one immutable observation.

- [x] Map current owners and consumers.
- [x] Identify publication ordering.
- [x] Separate simulation tick from render frame.
- [x] Define result and acknowledgement contracts.
- [x] Define stale/cross-epoch rejection.
- [x] Define bounded journal and fixture gate.

## Current ownership

```txt
simulation kit -> balloon mutable state and elapsed time
mail domain -> parcel mutable state and delivery event
airstream domain -> current sample and visuals
camera rig -> camera mutable state
visual domain -> planning state renderer state and dynamic resolution
telemetry kit -> Nexus resources and event
HUD -> independent DOM projection
GameHost -> raw mutable object exposure
```

## Missing parent domain

```txt
open-above-committed-observation-frame-authority-domain
```

## Child kits

```txt
identity:
  runtime-session-observation-id-kit
  simulation-tick-receipt-kit
  delivery-result-kit
  render-frame-id-kit

planning and execution:
  render-frame-plan-kit
  render-submission-result-kit
  effective-quality-result-kit

consumer proof:
  hud-projection-ack-kit
  telemetry-publication-barrier-kit
  frame-consumer-ack-kit

public observation:
  committed-observation-kit
  observation-fingerprint-kit
  detached-gamehost-read-model-kit
  observation-journal-kit

proof:
  observation-frame-fixture-kit
```

## Required command/result flow

```txt
fixed simulation tick commits
  -> DeliveryResult admitted for same mission epoch
  -> immutable RenderFramePlan frozen
  -> renderer submits frame
  -> effective quality and renderer statistics labeled with RenderFrameId
  -> HUD acknowledges projection revision
  -> telemetry barrier admits the completed acknowledgement set
  -> CommittedObservation published exactly once
  -> detached GameHost/headless read models expose only that observation
```

## Invariants

```txt
all identities include runtimeSessionId and missionEpoch
RenderFrameId is distinct from SimulationTickId
delivery event is exactly-once per mission epoch
required consumer set is explicit and versioned
missing required consumer prevents commit
duplicate acknowledgement is idempotent
stale or cross-epoch acknowledgement is rejected
public observations are immutable detached and JSON-safe
journal storage is bounded
```

## Dependency order

```txt
runtime admission
  -> session lifecycle
  -> fixed-step clock
  -> route/delivery authority
  -> mission restart/epoch
  -> committed observation frame authority
  -> terrain/render workload authority
```
