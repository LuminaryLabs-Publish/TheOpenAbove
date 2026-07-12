# World Generation Audit: Concurrent Runtime Fix Reconciliation

**Audit timestamp:** `2026-07-12T11-01-59-04-00`  
**Runtime fix reviewed:** `74f9b8a212f0b9eedeefdc8f7a5a1eb06fa24cec`

## Summary

A runtime fix landed while this documentation pass was in progress. It removed `cachedFeatureCells` from the public world descriptor, added `world.contains(x,z)`, and made `sampleFlora()` return a zero-density `outside-world` profile beyond the disk radius.

The original audit correctly identified the pre-fix defects at source revision `f24e1b11063a566ff011168ffd89a0609f21328c`. Those two concrete defects are now resolved in current `main`; the broader build, identity, lifecycle, consumer-revision and frame-provenance gaps remain.

## Resolved during this run

```txt
[x] feature-cell cache size no longer changes the authoritative descriptor
[x] map/query history no longer changes the public world descriptor
[x] world exposes a disk membership predicate
[x] outside-world flora returns zero grass and flower density
[x] grass and flower candidate paths inherit bounded flora density
```

## Still unresolved

```txt
world build has no WorldBuildId or generation revision
seed/config/route/town inputs have no canonical fingerprint
build stages have no typed results, budget, progress or cancellation
world grid has no canonical artifact fingerprint
sample queries return raw values without build identity
sampleFeatureCell remains a direct cache-populating public method
cache capacity, eviction and disposal are not specified
sampleHeight/moisture/temperature still clamp outside coordinates
consumers do not cite one world revision or return adoption receipts
map background, terrain and flora have no parity result
no stale consumer rejection exists for a future world replacement
no first visible frame acknowledges the world build
```

## Updated primary finding

The current world is deterministic and now avoids the originally observed public-descriptor drift, but it remains an unversioned synchronous utility graph. There is still no authoritative transaction proving which immutable build terrain, vegetation, grass, flowers, landmarks and the map adopted or rendered.

## Documentation policy

The original tracker and source-specific audits remain as historical evidence of the defect found at `f24e1b...`. Root routing documents, the registry and central ledger must use this reconciliation as the current status and must not claim that descriptor purity or outside-world flora are still broken.