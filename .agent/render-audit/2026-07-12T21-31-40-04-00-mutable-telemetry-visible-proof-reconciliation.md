# Render Audit: Mutable Telemetry and Visible Proof Reconciliation

**Timestamp:** `2026-07-12T21-31-40-04-00`

## Summary

Telemetry is committed before `visual.render()`, but the committed objects have no snapshot ID or render receipt. Because public readers can mutate those objects after the tick, telemetry can stop describing the visible frame without any new simulation or presentation event.

## Plan ledger

**Goal:** require the visible frame to acknowledge the exact immutable telemetry snapshot that informed it.

- [x] Confirm telemetry tick precedes render in the browser frame.
- [x] Confirm no shared frame/snapshot identity is carried into rendering.
- [x] Confirm public readback remains writable after render.
- [x] Preserve the missing first-frame acknowledgement requirement.
- [ ] Add executable mutation-before-render and mutation-after-render fixtures.

## Current order

```txt
simulation and visual update
  -> engine.tick(dt)
      -> publish BalloonSnapshot and VisualSnapshot
  -> visual.render(dt, frameMs)
  -> schedule successor RAF
```

## Gap

```txt
no telemetry snapshot ID
no source revision bundle
no render generation binding
no content fingerprint in frame diagnostics
no first visible telemetry frame acknowledgement
no rejection when readback mutates after publication
```

## Required visible proof

```txt
TelemetrySnapshotCommitResult
  -> snapshotId
  -> frameId
  -> sourceRevisions
  -> contentFingerprint
  -> completeResourceRevision
  -> visualResourceRevision

RenderFrameResult
  -> consumedSnapshotId
  -> consumedFingerprint
  -> renderGeneration
  -> surfaceGeneration
  -> success or failure

FirstVisibleTelemetryFrameAck
  -> matching snapshotId and fingerprint
  -> accepted presentation result
```

A failed render must not publish a visible acknowledgement. A later mutation attempt must fail or affect only a detached consumer copy.

## Validation boundary

Documentation only. No renderer source, shader, render target, frame loop or browser behavior changed.