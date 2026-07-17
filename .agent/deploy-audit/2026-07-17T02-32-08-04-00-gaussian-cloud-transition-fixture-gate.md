# Deploy Audit: Gaussian Cloud Transition Fixture Gate

**Timestamp:** `2026-07-17T02-32-08-04-00`

## Current proof

`tests/cloud-lod-integration.mjs` proves deterministic field metadata and splat samples, five tier thresholds, close-kind filtering, instanced geometry, custom blending, nearest-first truncation and far-to-near ordering. It is a source-contract test; it does not execute WebGL frames or compare temporal membership.

## Required source fixtures

- Field digest changes only when field inputs change.
- Repeated equal camera/weather inputs produce equal membership digests.
- Per-bank quotas and total capacity settle exactly.
- Tier enter/leave hysteresis prevents boundary oscillation.
- Stale rebatch generations are rejected.
- Teleport and field-revision reset behavior is explicit.

## Required browser fixtures

- Fly through ground fog, low cloud and mid cloud on low, medium and high quality.
- Hold camera still for multiple 0.2-second rebatches; no membership churn.
- Oscillate around each tier threshold; no one-frame popping.
- Force capacity overflow; nearest banks remain while transitions stay bounded.
- Open/close the map and suspend/resume the page during a transition.
- Lose and restore WebGL context with a pending cloud transition.
- Verify `FirstGaussianCloudFrameAck` matches the committed membership digest.

## Build and deployment gate

```txt
source validation
  -> Vite production build
  -> inspect revision-stamped artifact
  -> serve built artifact
  -> run cloud transition fixtures
  -> publish Pages artifact
  -> run deployed-origin smoke
  -> compare source/build/Pages membership digest sequence
```

## Claim boundary

Until these fixtures pass, do not claim temporal LOD stability, capacity-transition correctness, source/build/Pages parity or production readiness.