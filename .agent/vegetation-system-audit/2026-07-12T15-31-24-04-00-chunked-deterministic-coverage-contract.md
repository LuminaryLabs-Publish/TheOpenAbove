# Vegetation System Audit: Chunked Deterministic Coverage Contract

**Timestamp:** `2026-07-12T15-31-24-04-00`

## Summary

The current tree generator is deterministic for one boot, but it does not define stable world-space chunks, coverage requirements, transition budgets or lifecycle ownership. This contract keeps deterministic placement while converting the boot artifact into a bounded world consumer.

## Plan ledger

**Goal:** establish stable vegetation chunks that can be generated independently, reused across movement, atomically adopted and retired without changing candidate identity.

- [x] Identify deterministic inputs in the current generator.
- [x] Separate placement meaning from render-buffer ownership.
- [x] Define chunk identity, coverage, candidate and adoption contracts.
- [x] Define exclusion and grass/flower parity requirements.
- [x] Define lifecycle and failure invariants.
- [ ] Implement a pure candidate generator and runtime chunk manager.

## Chunk identity

```txt
VegetationChunkId = hash(
  worldArtifactFingerprint,
  vegetationSchemaVersion,
  vegetationConfigFingerprint,
  chunkX,
  chunkZ
)
```

Chunk identity must not depend on query order, current camera position, map-open state, frame timing or previously generated chunks.

## Coverage plan

```txt
camera cell
  -> near tree coverage ring
  -> transition coverage ring
  -> optional distant silhouette ring
  -> intersect each requirement with world membership
  -> assign quality-specific instance and construction budgets
```

The plan must distinguish intentionally treeless biome cells from missing or deferred coverage.

## Candidate contract

Each detached candidate record must include:

```txt
chunkId
worldBuildId
worldArtifactFingerprint
seed
bounds
biome and density source
terrain revision used
accepted/rejected candidate counts
route/town/lake/spacing rejection counts
instance transforms
instance colors/material class
coverage classification
candidate fingerprint
```

## Adoption contract

```txt
complete candidate set
  -> validate expected world and vegetation generations
  -> validate required-cell coverage
  -> validate resource and frame budgets
  -> construct detached instance resources
  -> atomically attach successor chunks
  -> publish active exclusion artifact
  -> retire obsolete predecessor chunks exactly once
```

No live predecessor should be detached until the successor aggregate can be committed.

## Grass and flower parity

Current grass exclusion receives a boot-time `treePositions` list. The successor contract must publish a revisioned spatial exclusion artifact:

```txt
VegetationExclusionArtifact {
  vegetationFrameId
  worldArtifactFingerprint
  coveredCells
  treeVolumesByCell
  fingerprint
}
```

Grass and flower domains must cite the artifact generation they consumed and reject stale exclusion data after vegetation replacement.

## Budget contract

```txt
maximum planned cells per frame
maximum candidate samples per work slice
maximum new instances per frame
maximum geometry/buffer bytes
maximum adoption wall time
maximum retired instances per frame
degraded policy when budget is exceeded
```

## Disposal contract

```txt
remove chunk group from scene
retire instance buffers exactly once
release chunk-local geometry/material references
remove exclusion volumes
record retirement reason and counts
reject late work for retired generation
```

## Required invariants

```txt
candidate identity is independent of camera query order
coverage is continuous across adjacent admitted cells unless biome policy says otherwise
same chunk never has two current owners
all active chunks cite one world artifact
failure preserves last-good coverage
retired chunks cannot re-enter through late callbacks
exclusion artifact and rendered trees share one vegetation frame
```

Documentation only. The existing boot-time generator remains unchanged.