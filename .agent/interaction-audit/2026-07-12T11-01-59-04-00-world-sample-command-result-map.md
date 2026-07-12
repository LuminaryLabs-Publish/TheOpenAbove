# Interaction Audit: World Sample Command and Result Map

**Timestamp:** `2026-07-12T11-01-59-04-00`

## Summary

World generation exposes direct synchronous functions rather than admitted sample commands. Callers receive raw values, can mutate cache state indirectly and cannot prove which build revision served the query.

## Current calls

```txt
terrainHeight(x,z)        -> number
sampleMoisture(x,z)       -> number
sampleTemperature(x,z)    -> number
sampleFertility(x,z)      -> number
sampleBiome(x,z,context)  -> object
sampleFlora(x,z,context)  -> object
sampleMapColor(x,z)       -> RGB tuple
sampleFeatureCell(x,z)    -> cached object
getDescriptor()           -> mutable-observation-dependent descriptor
```

## Current call graph

```txt
map sampleMapColor
  -> sampleHeight
  -> sampleMoisture
  -> sampleFlora
     -> sampleBiome
        -> sampleFeatureCell
           -> featureCells.set when absent

terrain/grass/flower callers
  -> invoke overlapping query chains independently
```

## Missing request envelope

```txt
queryId
worldBuildId
expectedWorldRevision
coordinateSpaceId
position
requested fields
membership policy
consumerId
cache policy
```

## Missing result envelope

```txt
queryId
worldBuildId
worldRevision
artifactFingerprint
membership result
sample values
source grid/cell identity
cache hit/miss as diagnostics only
result fingerprint
terminal status
```

## Required interaction contract

```txt
WorldSampleQuery
  -> validate coordinate space and world revision
  -> resolve membership
  -> sample immutable artifact
  -> return typed WorldSampleResult
  -> never mutate authoritative descriptor
  -> optionally update non-authoritative bounded cache metrics
```

## Rejection results

```txt
stale-world-revision
outside-world-rejected
outside-world-clamped
outside-world-edge-floor
invalid-coordinate
unsupported-field
cancelled-build
retired-consumer
```

## Proof requirements

```txt
query order does not affect values or world fingerprint
map sampling does not alter gameplay snapshots
same query against same revision is idempotent
stale revision is rejected
all consumers receive the same membership classification
cache diagnostics cannot participate in deterministic state fingerprints
```