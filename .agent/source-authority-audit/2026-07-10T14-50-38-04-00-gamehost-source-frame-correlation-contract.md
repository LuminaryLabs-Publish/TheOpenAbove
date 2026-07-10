# Source Authority Audit: GameHost Source and Frame Correlation Contract

**Timestamp:** `2026-07-10T14-50-38-04-00`

## Current GameHost shape

```txt
window.GameHost
  engine
  NexusEngine
  THREE
  scene
  renderer
  camera
  balloon
  visual
  simulation
  cameraRig
  getState()
    -> nexusEngine
    -> local
```

This is useful for manual inspection but mixes live objects with a small latest-state projection. It cannot provide deterministic history or explain how the latest state was produced.

## Additive target shape

```js
window.GameHost.getState() = {
  nexusEngine,
  local,
  source: {
    manifest,
    fingerprint,
    snapshot,
    acceptanceRows,
    consumerRows
  },
  runtimeProof: {
    latestFrame,
    inputRows,
    simulationRows,
    cameraRows,
    telemetryRows,
    renderRows,
    hudRows,
    fixtureVersion
  }
}
```

Existing `local` and `nexusEngine` fields must remain unchanged.

## Latest frame contract

```js
{
  frameId,
  elapsed,
  dt,
  sourceFingerprint,
  inputSequenceStart,
  inputSequenceEnd,
  simulationSnapshotId,
  cameraSnapshotId,
  visualSnapshotId,
  telemetryRowId,
  renderRowId,
  hudRowId,
  status
}
```

## Journal policy

```txt
all rows JSON-safe
monotonic IDs
bounded capacities
oldest-first readback
no raw THREE objects
no DOM nodes
no browser Event objects
no functions
no circular references
fixture-selectable clock and IDs
clear/reset method available to tests
```

## Consumer attribution

The GameHost readback should allow a caller to verify that a single frame was consumed by:

```txt
balloon simulation
balloon transform
balloon presentation
camera rig
visual update
Nexus telemetry
render submission
HUD projection
```

A consumer may report `skipped` with a reason. Silence should not be treated as proof.

## Main finding

GameHost should remain an additive readback boundary, not become the runtime authority. The parent proof domain should own source/input/frame rows, and GameHost should serialize a bounded snapshot of that domain.

## Next safe ledge

```txt
TheOpenAbove Source Input Frame Correlation Ledger + GameHost Headless Fixture Gate
```