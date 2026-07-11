# Performance Audit: Grass Culling Work and Backend Observation Contract

**Timestamp:** `2026-07-11T18-01-38-04-00`

## Summary

The active grass culling helper does not currently reduce visibility by per-chunk distance. Every chunk reads the same camera-to-origin distance, so all chunks pass or fail together. The helper also increments a field named `dispatchedWorkgroups` for CPU Boolean comparisons and may label the backend `webgpu-compute` without GPU execution.

## Current workload

```txt
active grass chunks
  -> one cullChunk call per chunk per visual update
  -> one CPU distance <= maxDistance comparison
  -> one dispatchedWorkgroups increment
  -> one mesh.visible assignment
```

The active set is already bounded by the `2.6`-chunk LOD cutoff, but the current manual culling pass provides no meaningful per-chunk reduction inside that set.

## Current reporting mismatch

```txt
backend label:
  based on navigator.gpu capability presence

actual work:
  CPU scalar comparison

workgroup count:
  increments once per CPU helper call
```

This prevents reliable performance attribution.

## Required metrics

```txt
cameraCenterRevision
requiredChunkCount
classifiedChunkCount
visibleChunkCount
culledChunkCount
acceptedInstanceCount
visibleInstanceCount
CPU decision count
GPU dispatch count
GPU workgroup count
culling duration
rebuild count
geometry allocation count
geometry disposal count
stale result count
visibleSetCommit duration
```

## Required backend states

```txt
cpu-chunk-culling
  CPU comparisons only
  GPU dispatch count = 0

cpu-instance-culling
  CPU instance decisions
  GPU dispatch count = 0

webgpu-instance-culling
  adapter, device, buffers, pipeline and dispatch proven
  actual dispatch/workgroup counts recorded

unavailable
  typed reason
  fallback selected explicitly
```

## Required budget policy

```txt
maximum chunk classifications per frame
maximum chunk rebuilds per frame
maximum candidate generations per frame
maximum geometry allocations per frame
maximum visibility commits per frame
maximum GPU dispatches per frame
maximum observation rows retained
```

## Required performance fixtures

```txt
fixture:grass-cpu-decision-count
fixture:grass-no-false-gpu-dispatch
fixture:grass-webgpu-pipeline-admission
fixture:grass-webgpu-dispatch-count
fixture:grass-origin-crossing-visible-count
fixture:grass-camera-center-rebuild-budget
fixture:grass-quality-transition-budget
fixture:grass-state-metric-parity
```

## Acceptance boundary

Do not claim WebGPU grass culling from `navigator.gpu` presence or WGSL source alone. A valid claim requires a selected backend result, successful pipeline execution and observed dispatch/workgroup evidence correlated to the visible set and render frame.

## Scope

Documentation only. No performance measurement or runtime execution occurred during this pass.
