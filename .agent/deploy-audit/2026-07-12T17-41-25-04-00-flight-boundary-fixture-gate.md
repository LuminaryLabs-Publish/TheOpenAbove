# Deploy Audit: Flight Boundary Fixture Gate

**Generated:** `2026-07-12T17-41-25-04-00`

## Summary

The current checks do not prove world-edge behavior. Deployment must remain blocked from a boundary-authority claim until pure, browser, built-output and Pages fixtures agree.

## Plan ledger

**Goal:** require reproducible boundary behavior across source, build and deployed runtime.

- [x] Identify missing pure and visible fixtures.
- [x] Define source/build/Pages parity requirements.
- [x] Preserve existing deployment workflow.
- [ ] Add and execute fixtures.

## Required pure fixtures

```txt
flight-center-membership
flight-edge-transition
flight-outside-policy
flight-high-speed-swept-crossing
flight-rejection-zero-mutation
flight-world-revision-stale-result
flight-consumer-receipt-completeness
```

## Required browser fixtures

```txt
fly from center into edge band
cross radius under low speed
cross radius under maximum admitted speed
open map before/during/after crossing
verify terrain/flora/map consume one result
capture FlightBoundaryVisibleFrameAck
```

## Required parity gate

```txt
source world/policy fingerprint == built fingerprint == Pages fingerprint
source result sequence == built result sequence == Pages result sequence
screenshots cite the same committed frame and boundary result
```

## Current validation

No fixture was available or run. Runtime, build scripts, dependencies and deployment workflow were unchanged.
