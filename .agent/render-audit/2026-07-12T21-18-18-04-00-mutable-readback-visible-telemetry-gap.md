# Mutable Readback and Visible Telemetry Gap

**Timestamp:** `2026-07-12T21-18-18-04-00`

## Finding

The rendered frame, the locally rebuilt `getSnapshot()` result, the Nexus `BalloonSnapshot`, the Nexus `VisualSnapshot`, and the browser-global `GameHost` readback have no shared immutable snapshot identity.

`VisualSnapshot` receives the exact `snapshot.visual` object nested inside `BalloonSnapshot`. Nexus resource reads return that reference directly. A diagnostic consumer can mutate the published visual values after the engine tick without rendering a new frame or producing a new result.

## Visible mismatch path

```txt
frame N visual update
  -> visualState.renderScale and counts are captured
  -> telemetry snapshot N is committed by reference
  -> frame N is rendered

external readback
  -> obtains GameHost.getState().nexusEngine.visual
  -> mutates renderScale, grass or flowers
  -> engine.openAbove.getVisualState() changes
  -> no visual update, engine tick or render occurred

result
  -> telemetry claims successor values
  -> visible image still belongs to the prior frame
  -> no mutation observation or first-visible-frame acknowledgement exists
```

## Missing presentation evidence

```txt
telemetry snapshot ID
render frame ID
visual source revision
resource commit revision
content fingerprint
readback revision
mutation rejection
consumer receipt
first visible telemetry frame acknowledgement
```

## Required render contract

```txt
TelemetrySnapshotCommitResult
  -> identifies visual source revision and render frame
  -> publishes immutable visual read model
  -> renderer acknowledges first frame using that revision
  -> public readers receive frozen or detached data
  -> mutation attempts cannot alter committed telemetry
```

## Proof matrix

```txt
normal frame
external mutation attempt
cross-resource visual alias attempt
old readback retained across successor commit
render failure after telemetry candidate construction
telemetry commit failure after visual update
GameHost readback versus Nexus resource parity
first visible frame correlation
```

## Non-claim

No claim is made that external callers currently mutate telemetry in production. The source establishes that the boundary permits it and lacks evidence that readback values correspond to the frame currently visible.
