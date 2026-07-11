# Render Audit: Hidden Compatibility RAF and Render Lifetime

**Timestamp:** `2026-07-10T21-31-01-04-00`

## Finding

The active route has one visible render loop in `src/main.js`, but importing `src/hot-air-balloon-object-kit.js` also starts an unowned compatibility loop. That loop does not render, yet it runs every animation frame, traverses the scene for a legacy vehicle and schedules itself again.

```txt
main RAF
  -> simulation
  -> presentation
  -> camera
  -> environment
  -> telemetry
  -> composer render
  -> HUD

compatibility RAF
  -> traverse scene for legacy wing/tail vehicle
  -> animate optional installed balloon
  -> schedule next frame
```

For the current direct-balloon route, the legacy vehicle lookup produces no installed target. The loop therefore becomes permanent no-op frame work.

## Lifetime gaps

- Neither RAF request ID is retained by a root owner.
- There is no frame label or ownership ledger.
- No session generation prevents stale callbacks.
- `visual.dispose()` is never called by the route.
- Renderer disposal and balloon geometry/material disposal are not composed.
- GameHost has no terminal frame/resource counts.

## Required proof

```txt
module import schedules 0 RAF callbacks
accepted route start owns exactly 1 primary RAF
unsupported compatibility installer owns 0 RAF callbacks
stop cancels all owned frame handles
post-stop frame count remains stable
renderer/resource disposal is reported once
restart creates one new generation and one primary RAF
```