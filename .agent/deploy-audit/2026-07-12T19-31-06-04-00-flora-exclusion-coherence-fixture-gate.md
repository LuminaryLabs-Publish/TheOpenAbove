# Deploy Audit: Flora Exclusion Coherence Fixture Gate

**Timestamp:** `2026-07-12T19-31-06-04-00`

## Summary

Current checks cover source, terrain, route and local world/flora behavior, but no fixture replaces vegetation while grass and flower chunks are active or proves source/build/Pages exclusion parity.

## Plan ledger

**Goal:** block deployment-readiness claims until vegetation replacement and visible flora coherence are proven across source, built output and Pages.

- [x] Read current package scripts.
- [x] Identify missing pure and browser fixtures.
- [x] Define required result and fingerprint evidence.
- [x] Preserve current deployment behavior.
- [ ] Implement and run the fixture matrix.

## Existing command surface

```txt
npm run check
npm run build
npm run headless:check
```

`check` currently runs smoke, terrain streaming, route protection and terrain overlay tests. None performs a vegetation generation replacement with loaded grass and flower chunks.

## Required pure fixtures

```txt
flora-exclusion-artifact-determinism
shared-artifact-revision-for-grass-and-flowers
new-tree-no-overlap
removed-tree-clearing-repopulation
configured-clearance-policy-parity
stale-exclusion-zero-mutation
paired-candidate-failure-last-good-retention
paired-adoption-no-mixed-generation
predecessor-retirement-exactly-once
```

## Required browser matrix

```txt
high, medium and low quality tiers
camera traversal across chunk boundaries
vegetation replacement with active flora
world reset with active flora
partial grass generation failure
partial flower generation failure
rapid successive vegetation generations
visible frame acknowledgement correlation
```

## Required deployment evidence

```txt
source revision
built artifact hash
Pages deployment revision
vegetation generation ID
flora exclusion fingerprint
grass and flower generation fingerprints
paired adoption result
first visible frame acknowledgement
screenshots around replacement boundaries
```

## Gate

Do not claim flora coherence or deployment readiness unless source, built output and Pages produce the same accepted exclusion fingerprint and no mixed-generation frame is observed.

## Current result

```txt
fixtures available: no
commands run this turn: no
browser matrix run: no
Pages smoke run: no
deployment changed: no
```
