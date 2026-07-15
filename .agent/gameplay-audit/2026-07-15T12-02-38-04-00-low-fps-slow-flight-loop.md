# Gameplay Audit: Low-FPS Slow Flight Loop

**Timestamp:** `2026-07-15T12-02-38-04-00`

## Summary

Flight progression is driven by the capped host delta. When RAF callbacks arrive slower than 30 FPS, balloon elapsed time, wind phase, airstream sampling, buoyancy, position, distance, mail progression, and engine time advance by less than wall time because excess callback duration is discarded.

## Plan ledger

**Goal:** preserve deterministic flight feel while ensuring the same admitted elapsed time reaches every gameplay consumer under normal, delayed, suspended, and resumed callback conditions.

- [x] Trace the low-FPS path from browser callback to gameplay state.
- [x] Identify all gameplay consumers of `dt` and `state.elapsed`.
- [x] Distinguish source-backed time loss from an unrun browser observation.
- [ ] Add fixed-step, overload, suspension, and replay fixtures.

## Source-backed loop

```txt
100 ms callback interval
  -> frameMs becomes 80 ms
  -> dt becomes 33.333 ms
  -> state.elapsed adds 33.333 ms
  -> wind and airstream sample 33.333 ms of progression
  -> buoyancy velocity position and distance integrate once
  -> Air Mail receives the reduced elapsed value
  -> world and engine receive the reduced dt
  -> about 66.667 ms is not retained
```

At a 200 ms interval, about 166.667 ms is not retained. The effect compounds across consecutive delayed callbacks.

## Affected gameplay services

```txt
balloon elapsed and movement
burner and vent smoothing
steering response and lateral acceleration
fallback wind phase and speed
airstream sample and force contribution
vertical velocity and altitude
distance traveled
mail delivery progress and deliveredAt timestamp
town visual animation
airstream visual update
camera following
world generation and environmental update
NexusEngine telemetry tick
```

## Required result path

```txt
monotonic wall interval
  -> bounded fixed-step batch
  -> balloon airstream mail world and engine step receipts
  -> residual time retained
  -> overload explicitly reported
  -> matching render revision acknowledged
```

## Validation boundary

No 60/30/20/10/5 FPS comparison, browser throttling test, deterministic replay, mail timing comparison, or deployed smoke was run. Slow-motion pacing is a source-permitted inference, not a reproduced browser defect.