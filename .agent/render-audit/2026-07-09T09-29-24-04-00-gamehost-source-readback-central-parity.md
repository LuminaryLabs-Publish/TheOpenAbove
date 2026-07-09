# Render Audit — GameHost Source Readback Central Parity

**Timestamp:** `2026-07-09T09-29-24-04-00`

## Current render surface

```txt
Three.js WebGLRenderer
  -> terrain mesh with vertex colors
  -> lake discs
  -> procedural tree groups
  -> cloud groups
  -> wind ribbons
  -> procedural hot-air-balloon object
  -> perspective camera
  -> HUD DOM telemetry
```

## Active render loop

```txt
frame(now)
  -> update(dt)
  -> engine.tick(dt)
  -> draw(dt)
  -> updateHud()
  -> requestAnimationFrame(frame)
```

## Render authority read

`src/main.js` still owns the render host, world object creation, camera blend, first-person visibility, HUD projection, and GameHost readback.

The render host does not need extraction before source proof. The key missing render-facing contract is additive readback that lets fixtures and browser consumers confirm which product/source configuration the render route is actually showing.

## Current GameHost shape

```txt
window.GameHost = {
  engine,
  NexusEngine,
  scene,
  renderer,
  camera,
  balloon,
  getState: () => ({
    nexusEngine: engine.openAbove?.getState?.(),
    local: snapshot()
  })
}
```

## Missing readback shape

```txt
window.GameHost.getState() should add:
  source:
    routeId
    productId
    productMode
    objectType
    objectKitId
    sourceFingerprint
    sourceConsumers[]
    sourceAcceptanceRows[]
    sourceConsumerLedger
    centralLedgerStatus
```

## Render source consumers

```txt
index.html route title / copy
src/main.js route runtime
src/hot-air-balloon-object-kit.js object metadata
HUD text in updateHud()
GameHost local snapshot
NexusEngine telemetry snapshot
future source fixture readback
central ledger parity row
```

## Non-goals for next implementation

```txt
Do not retune camera values.
Do not change terrain colors, tree counts, cloud counts, or wind ribbons.
Do not change balloon profile, rigging, rope fade, basket view, ride bob, sway, or burner vibration.
Do not extract renderer host into shared kit before source readback exists.
```

## Render finding

The live visual route is already identifiable as Balloon Drift through HUD text, input behavior, camera blend, and object type. The missing part is not render fidelity; it is fixture-readable source attribution through `GameHost.getState().source`.
