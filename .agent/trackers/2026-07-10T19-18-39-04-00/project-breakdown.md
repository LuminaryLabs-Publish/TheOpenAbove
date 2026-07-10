# Project Breakdown: TheOpenAbove

**Timestamp:** `2026-07-10T19-18-39-04-00`

## Plan ledger

### Goal

Document the smallest safe runtime boundary that prevents stale animation frames, listeners, and GameHost references from surviving a stop, failed start, or restart, without changing the visible Balloon Drift experience.

### Checklist

- [x] Compare the complete accessible LuminaryLabs-Publish inventory with the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories are tracked and have root `.agent` state.
- [x] Select only `LuminaryLabs-Publish/TheOpenAbove` as the oldest eligible fallback.
- [x] Read the root `.agent` state, `src/main.js`, simulation, camera, visual, smoke, and package scripts.
- [x] Trace the active interaction/frame loop.
- [x] Reconcile active, inactive, implied, and proposed kits.
- [x] Identify all domain and service surfaces.
- [x] Add architecture, render, gameplay, interaction, lifecycle, and deploy audits.
- [x] Refresh required root `.agent` documents.
- [x] Keep runtime source unchanged.
- [x] Push only to `main`.

## Selection result

The accessible Publish installation contains ten repositories. All nine eligible non-Cavalry repositories are already centrally tracked and have root `.agent` state. `TheOpenAbove` was the oldest eligible aligned repository at the start of this run, with central state last updated at `2026-07-10T17-51-35-04-00`.

## Interaction loop

```txt
route boot
  -> construct visual domain and install resize listener
  -> construct balloon
  -> construct simulation and install keyboard/blur listeners
  -> construct camera rig and install wheel listener
  -> construct presentation and telemetry
  -> seed initial state
  -> requestAnimationFrame recursion
       -> simulation update
       -> balloon transform and presentation
       -> camera update
       -> visual update
       -> telemetry tick
       -> render and adaptive-resolution sample
       -> HUD projection
       -> queue next frame
  -> publish live runtime references through GameHost
```

There is still no generation fence, retained frame request, terminal GameHost snapshot, or root rollback owner.

## Main finding

The lifecycle gap is narrower than simple disposal. A restart-safe runtime needs a monotonically increasing `sessionId` plus a generation token checked by every queued frame, input callback, and GameHost command. Without that fence, a callback queued before stop or failure can still mutate a later session even if local `dispose()` methods are called.

`window.GameHost` also publishes live mutable objects. Teardown therefore needs a terminal immutable snapshot and explicit stale-reference classification instead of silently leaving old handles reachable.

## Next safe ledge

```txt
TheOpenAbove Session Generation Fence + Terminal GameHost Fixture Gate
```
