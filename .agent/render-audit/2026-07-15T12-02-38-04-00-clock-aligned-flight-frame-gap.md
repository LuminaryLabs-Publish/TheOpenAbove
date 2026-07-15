# Render Audit: Clock-Aligned Flight Frame Gap

**Timestamp:** `2026-07-15T12-02-38-04-00`

## Summary

Each visible frame is rendered after at most one simulation update capped at `1/30` second, but no simulation revision, clock result, previous snapshot, interpolation alpha, or first-frame acknowledgement is attached to that render. Under delayed callbacks, the visible world can remain internally coherent while advancing substantially slower than wall time.

## Plan ledger

**Goal:** make every rendered flight frame identify the accepted clock generation, simulation revision, step batch, interpolation state, and timing policy that produced it.

- [x] Trace callback interval, simulation update order, visual update, cloud render, HDR render, and public readback.
- [x] Confirm rendering receives the capped delta and raw frame time separately.
- [x] Confirm no accumulator or render interpolation descriptor exists.
- [ ] Add clock-bound render snapshots and first matching frame evidence.

## Current path

```txt
callback timestamp
  -> frameMs capped at 80 ms
  -> dt capped at 33.333 ms
  -> one simulation update
  -> one visual update
  -> visual.render(dt frameMs)
  -> cloud target and HDR composer present
```

`frameMs` can still report a delayed callback to dynamic-resolution sampling while flight and world truth advance by only the capped `dt`. No result binds the performance sample, accepted simulation time, and visible frame.

## Missing evidence

```txt
HostClockFrameResult
SimulationRevision
previous and current render snapshots
interpolation alpha
rendered clock generation
rendered step count
residual-time telemetry
overload or discarded-time receipt
FirstClockAlignedFrameAck
source/build/artifact/Pages frame parity
```

## Required rendering contract

```txt
accepted HostClockFrameResult
  -> immutable previous/current simulation revisions
  -> interpolation alpha derived from residual time
  -> world camera balloon cloud and HDR projection
  -> RenderFrameResult carrying ClockGeneration and SimulationRevision
  -> FirstClockAlignedFrameAck after presentation
```

## Validation boundary

No low-FPS visual test, capture, interpolation test, build smoke, artifact readback, or Pages comparison was run. No visible stutter, speed defect, or frame mismatch is claimed as observed.