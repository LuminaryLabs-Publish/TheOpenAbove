# Deploy Audit: Dual-Surface Frame Fixture Gate

## Summary

Existing static and headless checks do not execute the browser's concurrent WebGL and Canvas2D RAF chains. Deployment readiness requires browser and Pages evidence that map transitions and world rendering share one accepted frame envelope.

## Plan ledger

**Goal:** prevent source, build or deployed Pages promotion from claiming map/world coherence without executable browser evidence.

- [x] Inspect declared package checks and build scripts.
- [x] Identify missing dual-surface browser coverage.
- [x] Define pure, browser, build and Pages gates.
- [ ] Implement and run the gates.

## Required gate matrix

```txt
pure domain
  immutable frame-envelope fingerprint
  duplicate/stale transition handling
  required-surface policy
  partial commit recovery

browser source
  map opening waits for accepted first map frame
  world/map frame envelope IDs match
  rapid M/Escape rejects stale callbacks
  resize revision is reflected in map result
  GameHost readback cites committed surface pair

production build
  same behavior from dist
  no development-only scheduler assumptions
  capture world/map receipts as artifacts

GitHub Pages
  live origin loads
  map first frame is nonblank and current
  world/map revisions match
  failure result remains visible and bounded
```

## Existing proof boundary

`npm run check` currently executes source/static and terrain/world tests. The headless editor declares project and renderer checks. None of those surfaces instantiate the map overlay in a real browser, observe both RAF chains, inspect Canvas2D pixels, correlate WebGL and map frames or exercise deployed Pages.

## Promotion rule

No map/world frame-coherence or production-readiness claim should be made until the complete matrix produces revisioned receipts and retained artifacts.