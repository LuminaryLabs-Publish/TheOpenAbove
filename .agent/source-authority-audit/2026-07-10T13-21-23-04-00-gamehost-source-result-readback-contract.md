# Source Authority Audit: GameHost Source Result Readback Contract

Timestamp: `2026-07-10T13-21-23-04-00`

## Current GameHost shape

```txt
window.GameHost = {
  engine,
  NexusEngine,
  THREE,
  scene,
  renderer,
  camera,
  balloon,
  visual,
  simulation,
  cameraRig,
  getState: () => ({
    nexusEngine: engine.openAbove?.getState?.(),
    local: getSnapshot()
  })
}
```

## Problem

The GameHost is useful for live inspection, but it has no source block and no source result rows.

## Required additive shape

```txt
window.GameHost.getState()
  -> local
  -> nexusEngine
  -> source
       -> manifest
       -> fingerprint
       -> snapshot
       -> acceptanceRows
       -> consumerRows
       -> inputRows
       -> fixtureVersion
       -> headlessStatus
```

## Contract rules

- Keep existing `local` and `nexusEngine` fields compatible.
- Add `.source` additively.
- Source rows must be JSON-safe.
- Source rows must identify accepted, legacy-compatible, ignored, missing, deferred, clamped, and rejected outcomes.
- Headless editor should be able to call the same source proof path.

## Next safe ledge

```txt
TheOpenAbove Source Result Readback Ledger Refresh + GameHost Headless Fixture Gate
```
