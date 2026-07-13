# Render Audit: Restored Session Visible-Frame Gap

**Timestamp:** `2026-07-12T23-50-01-04-00`

## Current path

The renderer consumes live simulation, camera and visual state every RAF. There is no persistence generation in the render input, no restore phase, and no acknowledgement that a frame was produced from a verified restored state.

## Gap

A future restore that mutates participants sequentially could display a mixed frame:

```txt
restored mail + default balloon
restored balloon + predecessor camera
restored gameplay + stale terrain/world revision
```

The current runtime has no `RestoreCommitResult`, render admission barrier or first-restored-frame receipt to prevent or detect this.

## Required frame contract

```txt
FrameObservation
  runtimeSessionId
  frameId
  persistenceGeneration
  restoreCommitId
  worldRevision
  routeRevision
  balloonRevision
  mailRevision
  cameraRevision
  renderRevision
  presented
  failure
```

## Invariants

- A restored frame is admitted only after all authoritative participants install the same persistence generation.
- The renderer never projects a partially restored candidate.
- The first restored frame cites the accepted restore commit and participant revisions.
- A render failure cannot produce a false visible acknowledgement.
- Telemetry, map and public readback must cite the same persistence generation as the visible frame.

## Fixture gap

No browser, built-output or Pages fixture currently saves a flight, reloads, restores it, and proves matching balloon/mail state in the first visible frame.