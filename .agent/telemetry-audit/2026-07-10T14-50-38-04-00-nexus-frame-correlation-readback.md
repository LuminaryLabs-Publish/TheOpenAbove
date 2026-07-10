# Telemetry Audit: Nexus Frame Correlation Readback

**Timestamp:** `2026-07-10T14-50-38-04-00`

## Current telemetry flow

```txt
getSnapshot()
  -> simulation snapshot
  -> campaign region
  -> camera zoom/blend/mode
  -> visual quality/exposure/luminance/sun/render statistics

createBalloonTelemetryEngine(NexusEngine, getSnapshot)
  -> engine.tick(dt) each frame
  -> GameHost exposes engine.openAbove.getState()
```

The telemetry layer receives a rich current snapshot, but the current route does not expose a publication row proving when the snapshot was captured, which frame it represents, or whether NexusEngine accepted, changed, skipped, or rejected the publication.

## Required telemetry row

```js
{
  telemetryRowId,
  frameId,
  sourceFingerprint,
  snapshotId,
  dt,
  status,
  reason,
  engineRevisionBefore,
  engineRevisionAfter
}
```

## Required statuses

```txt
published
unchanged
skipped
rejected
failed
```

## Required reasons

```txt
frame-update
initial-zero-tick
snapshot-unchanged
engine-unavailable
invalid-snapshot
consumer-error
```

## Fixture requirements

A DOM-free fixture should use a deterministic mock telemetry consumer and prove:

```txt
one publication row per requested frame
initial zero tick is classified explicitly
unchanged snapshots are not confused with missing calls
source fingerprint and frame ID survive publication
consumer failures produce rows rather than disappearing
GameHost readback preserves bounded telemetry history
```

## Main finding

Nexus telemetry is already integrated. The missing capability is attributable publication readback tied to the same frame IDs used by simulation, camera, rendering, and HUD.

## Next safe ledge

```txt
Add telemetry consumption rows to the shared frame-correlation ledger and exercise them through the headless source/frame fixture.
```