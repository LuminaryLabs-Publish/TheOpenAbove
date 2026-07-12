# Deploy Audit: HDR Attachment and Resolution Fixture Gate

**Timestamp:** `2026-07-12T05:11:46-04:00`

## Current proof

`npm run check` executes `tests/smoke.mjs`. The smoke test confirms source files and selected code patterns but does not instantiate a browser WebGL context or inspect GPU attachments.

## Required local gate

```txt
npm run check
npm run headless:check
npm run build
browser WebGL attachment fixture
```

## Browser matrix

```txt
viewport:
  1280 × 720
  1920 × 1080
  2560 × 1440

DPR:
  1.0
  1.25
  1.6
  2.0

quality:
  high
  medium
  low

transition:
  startup
  browser resize
  dynamic degradation
  dynamic recovery
  rapid superseding resize
```

For every case assert:

```txt
renderer drawing-buffer dimensions equal committed plan
composer target dimensions equal committed plan
both depth attachment dimensions equal committed plan
framebuffer status is complete before commit
stale resize generations do not commit
failed candidate preserves predecessor
all replaced resources receive one retirement result
visible frame and diagnostics cite the same surface revision
```

## Pages gate

```txt
load deployed route
record first committed surface revision
resize through at least three viewport/DPR states
force one dynamic degradation and one recovery
verify no console framebuffer errors
verify flight continues
verify GameHost detached readback cites each visible revision
verify final resource counts remain bounded
```

## Completion boundary

Do not claim HDR resize correctness, dynamic-resolution recovery or attachment cleanup until the browser and deployed route prove physical color/depth parity, complete framebuffers, atomic rollback, exactly-once retirement and visible-frame correlation.
