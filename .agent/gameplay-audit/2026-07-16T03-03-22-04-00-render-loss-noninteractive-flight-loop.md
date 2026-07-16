# Gameplay Audit: Renderer-Loss Noninteractive Flight Loop

**Timestamp:** `2026-07-16T03-03-22-04-00`

## Summary

The game loop does not define what happens to flight simulation, input, Air Mail, elapsed time, or map state while visible presentation is unavailable. A lost context can therefore separate accepted gameplay state from what the player can observe or control.

## Plan ledger

**Goal:** keep gameplay and presentation policy explicit during renderer loss and prevent invisible simulation from advancing without an admitted contract.

- [x] Trace simulation, Air Mail, airstream, camera, visual update, render, and RAF ordering.
- [x] Confirm render loss has no gameplay policy result.
- [x] Identify hidden-progress and stale-input risks.
- [ ] Choose and implement one policy: suspend simulation, continue with bounded input, or preserve a last-good presentation.
- [ ] Prove delivery and elapsed-time semantics across loss and recovery.

## Current loop

```txt
if map closed
  -> simulation.update(dt)
  -> mail.update(...)
  -> airstream.update(...)
  -> balloon/camera/visual update
  -> engine.tick(dt)
visual.render(...)
requestAnimationFrame(frame)
```

## Failure path

```txt
context becomes unavailable
  -> no loss result changes gameplay policy
  -> simulation may continue before render throws or stops presenting
  -> keyboard state may remain active
  -> elapsed time distance airstream and Air Mail may advance invisibly
  -> player cannot verify position contact destination or delivery state
  -> recovery has no authoritative catch-up or rollback rule
```

## Required gameplay policy

```txt
RenderLossResult
  -> cancel or freeze held visual-dependent actions
  -> explicitly suspend or continue fixed-step simulation
  -> freeze or continue elapsed-time and Air Mail policy consistently
  -> retain one accepted state revision for recovery
  -> reject stale input and render callbacks
  -> resume only after RenderRecoveryResult and FirstRecoveredFrameAck
```

## Required fixtures

- loss while burner is held;
- loss while venting or steering;
- loss inside an airstream;
- loss near terrain contact;
- loss inside a delivery volume;
- loss while the map is open;
- repeated loss during recovery;
- fallback and retry without duplicate delivery.

## Boundary

No gameplay behavior changed and no runtime incident was reproduced.