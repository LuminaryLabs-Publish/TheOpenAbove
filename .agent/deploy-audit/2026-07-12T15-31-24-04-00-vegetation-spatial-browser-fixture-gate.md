# Deploy Audit: Vegetation Spatial Browser Fixture Gate

**Timestamp:** `2026-07-12T15-31-24-04-00`

## Summary

The normal check/build path validates smoke behavior, terrain ownership, route protection and terrain overlays. It does not prove camera-relative tree coverage, deterministic chunk identity, world-edge policy, failure rollback, disposal or source/dist/Pages vegetation parity.

## Plan ledger

**Goal:** prevent deployment from declaring the streamed world ready until long-traversal vegetation coverage is executable, observable and correlated with visible frames.

- [x] Inspect package check/build scripts.
- [x] Identify missing pure, failure, browser and Pages fixtures.
- [x] Define source/dist/deployment parity requirements.
- [ ] Implement and wire vegetation fixtures into `npm run check`.
- [ ] Run the browser and Pages matrices.

## Current gate

```txt
npm run check
  -> tests/smoke.mjs
  -> tests/terrain-streaming.mjs
  -> tests/world-route-protection.mjs
  -> tests/terrain-overlays.mjs

npm run build
  -> npm run check
  -> vite build
```

## Required pure fixtures

```txt
fixture:vegetation-chunk-id-determinism
fixture:vegetation-query-order-independence
fixture:vegetation-world-membership
fixture:vegetation-route-town-lake-exclusion
fixture:vegetation-adjacent-cell-continuity
fixture:vegetation-biome-treeless-classification
fixture:vegetation-grass-exclusion-generation-parity
fixture:vegetation-budget-admission
fixture:vegetation-retirement-exactly-once
```

## Required failure fixtures

```txt
inject terrain-height sample failure
inject world-flora sample failure
inject candidate allocation failure
inject instance-buffer construction failure
prove last-good chunks remain current
prove failed candidate resources retire
prove stale world/camera results are rejected
prove no exclusion artifact advances after failed adoption
```

## Required browser matrix

```txt
initial center coverage
cross positive/negative vegetation chunk boundaries
cross diagonal boundaries
travel beyond current boot-cluster extent
approach admitted world edge
open and close parchment map during traversal
low, medium and high quality profiles
forced deferred-budget state
forced failed-candidate state
capture VegetationVisibleFrameAck with each screenshot
```

## Required deployment parity

```txt
source and dist vegetation schema/config fingerprints match
source and dist produce the same deterministic chunk fingerprints
built imports resolve under the GitHub Pages base path
Pages observations cite the expected repository/runtime revision
Pages screenshots correlate with vegetation frame acknowledgements
no deployment uses the boot-only fallback without a typed degraded result
```

## Completion boundary

Do not claim complete procedural-world vegetation coverage until tests prove deterministic camera-relative chunks, world/exclusion parity, rollback safety, exactly-once disposal and visible-frame continuity in source, built output and Pages.

No commands were run in this documentation pass.