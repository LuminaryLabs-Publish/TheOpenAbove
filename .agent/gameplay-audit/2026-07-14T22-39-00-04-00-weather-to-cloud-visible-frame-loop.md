# Gameplay Audit: Weather to Cloud Visible-Frame Loop

**Timestamp:** `2026-07-14T22-39-00-04-00`

## Plan ledger

**Goal:** keep weather and gameplay semantics stable while making cloud presentation costs and fallbacks explicit.

- [x] Trace weather state into clouds and terrain.
- [x] Trace quality state into sample budgets.
- [x] Trace the frame into HDR presentation.
- [ ] Bind gameplay-visible weather to an admitted cloud frame.

## Loop

```txt
seeded weather
  -> coverage, density and wind offset
  -> cloud shader uniforms
  -> procedural density and internal light
  -> terrain cloud-shadow uniforms
  -> shared world render
  -> visible sky and ground response
```

## Gameplay-facing gap

Weather truth can advance while the renderer has no typed statement of whether clouds were rendered full, reduced, substituted, skipped or rejected. Telemetry reports only whole-scene render scale and aggregate draw statistics.

## Required result

`CloudFrameResult` must cite the weather revision and execution profile so Air Mail flight, map presentation, diagnostics and visible weather can refer to the same admitted frame without changing gameplay logic.
