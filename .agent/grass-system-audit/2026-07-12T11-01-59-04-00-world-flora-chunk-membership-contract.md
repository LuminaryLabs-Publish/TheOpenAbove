# Grass System Audit: World Flora and Chunk Membership Contract

**Timestamp:** `2026-07-12T11-01-59-04-00`

## Summary

Grass and flowers now share seeded world flora profiles and camera-centered chunk streaming. Their placement is deterministic, but neither domain owns a world-surface membership service or cites a committed world revision.

## Grass path

```txt
camera chunk center
  -> required 3 x 3 high-LOD chunks
  -> generate candidates
  -> bounded terrain height and world moisture
  -> legacy biome density
  -> world flora profile
  -> world grass density multiplied by legacy biome density
  -> exclusion/obstacle tests
  -> instanced clumps and atlas species
```

## Flower path

```txt
camera chunk center
  -> required 3 x 3 flower chunks
  -> generate candidates
  -> bounded terrain height and world moisture
  -> world flower density/type
  -> shared grass exclusion and tree obstacle tests
  -> instanced flower clumps and atlas types
```

## Findings

```txt
no worldSurface membership query is passed to either domain
chunk key contains only integer x:z, not WorldBuildId or revision
mesh userData has chunk coordinates and counts, not world fingerprint
world replacement cannot distinguish stale chunks
outside-disk climate samples clamp to grid edge
feature-cell identity can continue outside the disk
getState reports counts/types but no world revision or membership result
grass density composes world density with legacy biome density without a named blending policy
```

## Required contract

```txt
FloraChunkPlan {
  worldBuildId
  worldRevision
  chunkId
  chunkBounds
  membershipPolicyId
  qualityRevision
  candidateBudget
}

FloraChunkResult {
  planId
  worldArtifactFingerprint
  admittedCandidateCount
  rejectedOutsideWorldCount
  grass/flower type histogram
  resultFingerprint
  terminal status
}
```

## Invariants

```txt
chunk identity includes world revision
outside-world candidates follow one declared policy
terrain and flora membership agree
same chunk plan is deterministic
stale chunks cannot survive world replacement
quality changes cannot silently change world identity
state/readback exposes world and chunk revisions
first frame after chunk rebuild acknowledges committed chunk results
```

## Fixture matrix

```txt
center/edge/outside chunk membership
same chunk across independent world builds
map-prewarmed versus cold cache chunk parity
world replacement stale-chunk rejection
grass/flower type and density histogram parity
terrain/flora visible edge pixel probe
```