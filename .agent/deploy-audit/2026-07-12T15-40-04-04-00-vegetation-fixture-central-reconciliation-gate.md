# Deploy Audit: Vegetation Fixture Central Reconciliation Gate

**Timestamp:** `2026-07-12T15-40-04-04-00`

## Summary

The normal validation path does not execute long-traversal vegetation coverage, deterministic chunk identity, failure rollback, exclusion parity, disposal or visible-frame correlation. This gate reconciles the repo-local vegetation proof requirements with central tracking.

## Plan ledger

**Goal:** prevent source, build or Pages readiness claims until vegetation coverage is executable and correlated with committed frames.

- [x] Inspect current check/build coverage.
- [x] Identify missing pure, failure, browser and Pages matrices.
- [x] Define source/dist/deployment parity evidence.
- [ ] Implement fixtures and wire them into `npm run check`.
- [ ] Run browser and Pages traversal matrices.

## Required pure fixtures

```txt
fixture:vegetation-chunk-id-determinism
fixture:vegetation-query-order-independence
fixture:vegetation-world-membership
fixture:vegetation-adjacent-cell-continuity
fixture:vegetation-biome-treeless-classification
fixture:vegetation-route-town-lake-exclusion
fixture:vegetation-grass-flower-exclusion-generation-parity
fixture:vegetation-budget-admission
fixture:vegetation-retirement-exactly-once
```

## Required failure fixtures

```txt
terrain-height sample failure
world flora/biome sample failure
candidate allocation failure
instance-buffer construction failure
stale world/camera candidate completion
prove last-good coverage remains current
prove failed candidate resources retire
prove registry and exclusions do not advance
```

## Required browser matrix

```txt
initial camera cell
positive/negative X and Z boundaries
diagonal traversal
travel beyond boot cluster extent
world-edge approach
map open/close during traversal
low, medium and high quality
forced deferred-budget and failed-candidate states
VegetationVisibleFrameAck paired with every capture
```

## Required deployment parity

```txt
source/dist vegetation schema and configuration fingerprints match
source/dist deterministic chunk fingerprints match
built imports resolve under Pages base path
Pages observations cite expected repository/runtime revision
Pages screenshots cite the matching vegetation frame acknowledgement
```

## Commands not run

```txt
npm install
npm run check
npm run headless:check
npm run build
browser traversal matrix
Pages traversal smoke
```

No deployment-readiness claim is made.