# Render Audit: WebGL Resource Retirement Gap

**Timestamp:** `2026-07-14T06-38-49-04-00`

## Plan ledger

**Goal:** make the final render submission and GPU-resource retirement attributable to one route generation.

- [x] Inspect renderer, composer, scene, world, terrain, flora and map ownership.
- [x] Inspect available visual disposal methods.
- [x] Identify missing renderer/context and terminal-frame evidence.
- [ ] Add browser resource-count and re-entry fixtures.

## Current render path

```txt
visual.render()
  -> composer.render()
  -> dynamic-resolution sample
  -> renderer.info readback
  -> firstFramePresented = true
  -> main queues another RAF
```

`createVisualDomain().dispose()` retires the generation subscription, world, landmarks, water, flowers, grass, vegetation, terrain and composer. It is never called by the route. No result records the last submitted frame, remaining scene resources, render targets, renderer disposal, context policy or completion of successor startup.

## Missing proof

```txt
RouteGeneration
RenderGeneration
LastSubmittedFrameId
LastPresentedFrameId
RenderStopResult
SceneResourceRetirementReceipt
RenderTargetRetirementReceipt
RendererRetirementReceipt
ContextRetirementReceipt
FirstSuccessorRouteFrameAck
```

## Required rule

A retired route must not submit another composer or renderer frame. A successor route must not claim readiness until predecessor render callbacks are quarantined and its own first visible frame is acknowledged.

## Fixture matrix

```txt
normal stop after visible frame
stop before first frame
failure after renderer creation
failure after terrain/flora creation
map open during stop
re-entry in same document
stale predecessor RAF after successor start
renderer/context loss during retirement
source, build and Pages parity
```