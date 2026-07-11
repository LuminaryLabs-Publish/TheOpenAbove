# Lifecycle Audit: Session, Frame, Listener and Resource Contract

**Timestamp:** `2026-07-10T21-31-01-04-00`

## Current lifecycle surface

```txt
createGame() -> undefined
requestAnimationFrame(frame) -> handle discarded
simulation.dispose() -> exists, never composed
cameraRig.dispose() -> exists, never composed
visual.dispose() -> exists, partial, never composed
compatibility RAF disposer -> absent
GameHost.stop/dispose/restart -> absent
terminal snapshot -> absent
```

## Required lifecycle states

```txt
uninitialized
admitting
constructing
running
stopping
disposed
failed
```

## Ownership ledger

Each session must own bounded rows for:

```txt
frame handles
DOM/global listeners
scene objects
geometries
materials
textures
render targets
renderer/composer resources
telemetry registrations
GameHost publication
```

## Teardown order

```txt
reject new input
mark generation stopping
cancel all frame handles
remove listeners
stop telemetry publication
dispose presentation and visual subdomains
dispose balloon geometry/materials
dispose composer and renderer resources
remove GameHost live handles
publish detached terminal result
mark generation disposed
```

## Acceptance guarantees

- Exactly one active generation.
- Imports own no process lifetime.
- Every constructor registers rollback before the next construction step.
- Stop and dispose are idempotent.
- Stale callbacks check generation before mutating state.
- Terminal proof is JSON-safe and does not retain live Three.js objects.