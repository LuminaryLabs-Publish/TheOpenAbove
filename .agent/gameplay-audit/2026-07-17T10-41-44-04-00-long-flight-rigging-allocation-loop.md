# Gameplay Audit: Long-Flight Rigging Allocation Loop

**Timestamp:** `2026-07-17T10-41-44-04-00`

## Interaction loop

```txt
player flies
  -> burner, vent, steering, wind, and terrain update the balloon
  -> vertical velocity and lateral trim derive rigging tension
  -> all four ropes rebuild their CPU point/frame data
  -> dynamic rope buffers update
  -> the player sees sway and sag in the next frame
```

## Finding

The visual loop is continuous and deterministic enough for appearance, but its CPU-allocation and resource-lifetime behavior is not part of gameplay state or diagnostics. A long flight, restart, model replacement, or route retirement therefore has no typed result proving that rigging work stayed bounded and predecessor resources stopped participating.

## Required gameplay contract

```txt
accepted flight frame
  -> RiggingFrameUpdateCommand
  -> RiggingFrameUpdateResult
  -> RiggingFrameBudgetResult
  -> RiggingFrameDigest
  -> FirstRiggingBoundFrameAck

replacement / restart / disposal
  -> RiggingResourceRetirementCommand
  -> RiggingResourceRetirementResult
```

## Player-facing invariants

- Rope appearance remains continuous during ordinary flight.
- Budget handling does not change flight truth.
- Replacement does not show predecessor ropes for another frame.
- Retired rigging cannot resume animation.
- Diagnostics can distinguish healthy, degraded, retired, and stale-rejected states.

No player-visible hitch or leak was reproduced.