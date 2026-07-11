# First Post-Restart Frame Correlation Gap

**Timestamp:** `2026-07-11T11-31-06-04-00`

## Current render path

```txt
simulation.update
  -> mail.update
  -> airstream.update
  -> balloon/camera/presentation update
  -> visual.update
  -> telemetry engine tick
  -> visual.render
  -> HUD update
```

## Gap

The runtime has no mission epoch, simulation tick ID or render frame ID. Telemetry is published before `visual.render()`, and no render acknowledgement records which mission state reached the canvas.

A future reset could therefore update telemetry and HUD to the new mission while the canvas still shows the predecessor mission, or render a reset state without a correlated reset result.

## Required render receipt

```txt
missionEpoch
resetTransactionId
simulationTickId
renderFrameId
stateFingerprint
cameraFingerprint
parcelFingerprint
renderStartedAt
renderCommittedAt
status: committed | failed | skipped
```

## Required proof

```txt
no predecessor-epoch render commits after reset acceptance
first post-reset frame uses canonical start position and camera
HUD, telemetry, GameHost and canvas report the same mission epoch
render failure returns a terminal reset/frame result
repeated observation is detached and bounded
```

## Fixture gate

```txt
fixture:air-mail-reset-first-frame
fixture:air-mail-reset-render-failure
fixture:air-mail-reset-stale-frame
```
