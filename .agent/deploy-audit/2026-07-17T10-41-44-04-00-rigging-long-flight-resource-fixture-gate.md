# Deploy Audit: Rigging Long-Flight and Resource Fixture Gate

**Timestamp:** `2026-07-17T10-41-44-04-00`

## Required source fixtures

- Assert stable position/normal typed-array identity across repeated rope updates.
- Count temporary object/array allocations after warm-up.
- Assert one resource manifest per rigging generation.
- Assert stale updates are rejected after retirement.
- Assert geometry/material disposal occurs exactly once.

## Required browser fixtures

```txt
boot
  -> capture baseline heap/render info
  -> fly for a bounded long-flight interval
  -> verify rigging update budget and allocation plateau
  -> replace/restart balloon model
  -> verify predecessor resources retire
  -> verify successor frame cites new rigging generation
```

## Required publication matrix

```txt
source module graph
Vite production artifact
GitHub Pages origin
```

Each row must publish matching `RiggingFrameUpdateResult`, `RiggingResourceRetirementResult`, and `FirstRiggingBoundFrameAck` evidence.

## Current boundary

No source test, profiler fixture, build, artifact inspection, or Pages smoke was run. Deployment configuration was not changed.