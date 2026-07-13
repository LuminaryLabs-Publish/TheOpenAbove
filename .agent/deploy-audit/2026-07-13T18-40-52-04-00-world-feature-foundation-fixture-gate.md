# Deploy Audit: World Feature/Foundation Fixture Gate

**Timestamp:** `2026-07-13T18-40-52-04-00`

## Summary

The new feature test is included in `npm run check`, which is an improvement over the still-unwired staged-generation test. Its stubs validate bridge math only. Release confidence requires a real pinned-engine integration fixture plus browser, build, and Pages parity.

## Plan ledger

**Goal:** make the mountain integration executable from pure Core World compilation through deployed visible and collision behavior.

- [x] Inspect `package.json`.
- [x] Inspect `tests/world-feature-foundation.mjs`.
- [x] Compare stub coverage with runtime composition.
- [x] Define required fixture rows.
- [ ] Execute and publish evidence.

## Existing gate

```txt
npm run check
  -> smoke
  -> world-feature-foundation stub test
  -> terrain streaming
  -> route protection
  -> terrain overlays
```

Covered by the stub test:

```txt
fallback hides feature elevation while base is working
ready height adds 500
outside point stays unchanged
biome and flora receive composed height
map color changes
descriptor lists northern-wall
reset and dispose delegate
```

Not covered:

```txt
real Nexus Engine import at pinned commit
Core World and child-domain installation
actual mountain normalization/compile/sample
foundation contribution and cell revisions
material and collision channels
fidelity consumers
feature lifecycle invalidation
parent Core World registration and snapshots
browser terrain/horizon/map/collision parity
first visible mountain frame
dist and Pages parity
```

## Required fixture matrix

```txt
pure-real-engine-feature-compile
foundation-channel-manifest
feature-lifecycle-recompile
reset-stale-artifact-rejection
near-middle-far-fidelity
material-zone-selection
collision-height-parity
route-town-nonintersection
atomic-consumer-adoption
partial-failure-rollback
first-visible-mountain-frame
source-dist-pages-parity
```

## Gate recommendation

```txt
npm run check
  -> include tests/world-generation.mjs
  -> include real Core World feature/foundation integration

npm run build
  -> pure checks
  -> built browser mountain smoke

Pages workflow
  -> deployed module/provider identity
  -> visible mountain and collision parity evidence
```
