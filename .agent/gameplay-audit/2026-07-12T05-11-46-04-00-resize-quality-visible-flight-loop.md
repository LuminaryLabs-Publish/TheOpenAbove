# Gameplay Audit: Resize, Quality and Visible Flight Loop

**Timestamp:** `2026-07-12T05:11:46-04:00`

## Player-facing loop

```txt
fly through the world
  -> renderer measures frame time
  -> dynamic scale can change every 90 samples
  -> browser can resize or change effective DPR
  -> composer targets and depth attachments are resized
  -> next flight frame is presented
```

## Gameplay risk

A render-surface transition occurs during live flight. The simulation, delivery state, camera and HUD continue to advance while the visual stack has no typed surface-preparation or rollback result.

```txt
resize or quality transition fails
  -> no explicit degraded-quality result
  -> no preserved predecessor-surface receipt
  -> no correlation between flight frame and surface revision
  -> visible output may freeze, fail or diverge from telemetry without a gameplay-level result
```

## Required gameplay contract

```txt
simulation remains independent of surface preparation
surface replacement commits between complete frames
failed replacement keeps the previous surface
HUD and telemetry report the committed quality/surface revision
first frame after replacement acknowledges that same revision
```
