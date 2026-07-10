# Source authority audit: GameHost source readback contract

Timestamp: `2026-07-10T11-51-35-04-00`

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
    nexusEngine,
    local
  })
}
```

## Missing source shape

```txt
window.GameHost.getState()
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

## Contract

Add `.source` additively.

Do not remove existing `local`, `nexusEngine`, or live-object debug fields.

## Fixture target

A DOM-free fixture should be able to import source modules and assert the same row vocabulary that browser `GameHost` returns after route boot.
