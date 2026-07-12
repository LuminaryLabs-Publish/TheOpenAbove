# Vegetation System Audit: Coverage Registry Reconciliation Contract

**Timestamp:** `2026-07-12T15-40-04-04-00`

## Summary

The current `treePositions` array is a boot artifact passed by object reference into grass and flower construction. A streamed successor requires a revisioned spatial registry that keeps rendered tree ownership, exclusions and consumer receipts on one vegetation generation.

## Plan ledger

**Goal:** replace the unversioned boot array with a deterministic, queryable and transactionally published vegetation coverage registry.

- [x] Trace current tree-position production.
- [x] Trace grass/flower exclusion consumption.
- [x] Define chunk, exclusion and registry records.
- [x] Define publication and retirement invariants.
- [ ] Implement the registry and migrate consumers.

## Required registry

```txt
VegetationCoverageRegistry {
  vegetationFrameId
  worldBuildId
  worldArtifactFingerprint
  configurationFingerprint
  coveredCells
  chunksById
  treeVolumesByCell
  treelessCells
  deferredCells
  failedCells
  fingerprint
}
```

## Chunk record

```txt
VegetationChunkRecord {
  chunkId
  bounds
  seed
  biomeClass
  candidateFingerprint
  renderGeneration
  instanceCount
  exclusionVolumes
  status
}
```

## Publication flow

```txt
candidate aggregate validated
  -> attach successor render resources
  -> publish successor coverage registry
  -> collect grass/flower consumer receipts
  -> expose observation state
  -> acknowledge first visible frame
  -> retire predecessor registry and resources exactly once
```

## Consumer contract

Grass and flower domains must cite:

```txt
vegetationFrameId
coverageRegistryFingerprint
cells queried
exclusion volumes consumed
accepted/rejected candidate counts
consumer revision
```

## Invariants

```txt
rendered trees and exclusion volumes share one vegetation frame
registry publication occurs only after successful adoption
failed candidates cannot advance the registry
stale grass/flower consumers are rejected after vegetation replacement
retired registries cannot be queried as current
query order cannot change chunk identity or candidate results
```

Documentation only. The boot `treePositions` array remains unchanged.