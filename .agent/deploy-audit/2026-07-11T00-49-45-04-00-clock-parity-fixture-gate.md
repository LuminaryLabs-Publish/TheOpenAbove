# Deploy Audit: Clock Parity Fixture Gate

**Timestamp:** `2026-07-11T00-49-45-04-00`

## Current gate

```txt
npm run build
  -> npm run check
       -> source-string smoke
  -> vite build
```

The gate does not execute simulation timing.

## Required fixture

```txt
npm run fixture:clock-parity
```

Run a DOM-free injected clock and input adapter against:

```txt
20 Hz
30 Hz
60 Hz
120 Hz
irregular jitter
250ms stall
hidden -> visible suspension
```

## Required assertions

```txt
equal fixed tick counts for equal admitted active time
equal final physical fingerprints
equal consumed input sequence ranges
different render-frame counts are allowed
max-substep saturation is bounded
dropped backlog returns an explicit result
hidden duration follows the declared policy
resume resets render baseline
telemetry correlates session/render/tick IDs
```

## Build order

```txt
fixture:runtime-admission
fixture:runtime-lifecycle
fixture:clock-parity
fixture:meadow-lift-route
npm run check
npm run headless:check
npm run build
browser smoke
Pages smoke
```
