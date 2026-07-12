# Deploy Audit: World Generation Fixture Gate

**Timestamp:** `2026-07-12T11-01-59-04-00`

## Current gate

`npm run check` now imports world, grass and flower Node tests before Vite build. Those tests verify deterministic coordinate samples, protected route/town terrain, species coverage, density contrast and local chunk budgets.

## Missing gate coverage

```txt
world build ID/revision/fingerprint
canonical artifact serialization
query-order and cache-purity parity
map-prewarm versus no-map snapshot parity
startup duration/allocation budget
build cancellation and failure rollback
inside/edge/outside membership parity
terrain/grass/flower/map consumer receipts
stale consumer rejection after replacement
browser first-frame world acknowledgement
built-output and deployed Pages parity
```

## Required check order

```txt
fixture:world-input-fingerprint
fixture:world-independent-build-fingerprint
fixture:world-query-order-purity
fixture:world-map-prewarm-purity
fixture:world-membership-matrix
fixture:world-anchor-protection-fingerprint
fixture:world-consumer-parity
fixture:world-stale-consumer-rejection
fixture:world-startup-budget
fixture:world-visible-frame-ack
npm run check
npm run headless:check
npm run build
browser world-edge pixel probe
built-output fingerprint parity
Pages world-generation smoke
```

## Browser proof

```txt
capture world build result before first frame
confirm map construction does not change authoritative descriptor
fly through center and edge chunks
verify terrain/grass/flower membership agrees
open and close map
verify world fingerprint remains stable
capture first coherent frame receipt
```

## Pages proof

```txt
load exact deployed commit
compare source and deployed world fingerprints
verify startup completes within declared budget
verify map/scene world parity
verify edge membership and no stale chunks
retain screenshot plus machine-readable frame acknowledgement
```

A passing Node sample test or Vite build is not sufficient proof that the world is pure, bounded, transactionally adopted or render-coherent.