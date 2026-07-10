# Telemetry Audit — Pre-Render Snapshot Publication Gap

Timestamp: `2026-07-10T16-20-09-04-00`

## Current telemetry service

`open-above-balloon-telemetry-kit` defines:

```txt
resource: openAbove.balloonSnapshot
resource: openAbove.visualSnapshot
event: openAbove.balloonTicked
```

Its simulate-phase system calls `getSnapshot()`, stores the balloon and visual snapshots, and emits altitude, wind speed, burner, and exposure.

## Timing gap

`src/main.js` calls `engine.tick(dt)` before `visual.render(dt, frameMs)`. The published visual snapshot therefore cannot include the current render submission, current renderer statistics, or any dynamic-resolution decision made by `resolution.sample()` in that frame.

## Readback gap

```txt
engine.openAbove.getState()
  -> latest pre-render balloon snapshot

engine.openAbove.getVisualState()
  -> latest pre-render visual snapshot

GameHost.local
  -> generated on demand from current mutable state
```

These surfaces have no shared committed frame ID and can disagree by phase.

## Required publication row

```js
{
  publicationId,
  frameId,
  phase,
  status,
  sourceSnapshotId,
  renderResultId,
  qualityDecisionId,
  resourceWrites,
  emittedEvents
}
```

## Required policy decision

Choose one explicit contract:

1. Publish only after the committed render frame exists; or
2. Keep pre-render telemetry but name it as pre-render and add a separate committed-frame resource.

The current implicit mixture should not remain.

## Preserve

Keep the existing `engine.openAbove.getState()` and `getVisualState()` methods available. Add proof and committed-frame services without breaking current consumers.

## Next safe ledge

`TheOpenAbove Render Phase Authority Ledger + Adaptive Resolution Fixture Gate`