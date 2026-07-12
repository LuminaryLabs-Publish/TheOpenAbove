# Interaction Audit: Exclusion Artifact Consumer Admission Map

**Timestamp:** `2026-07-12T19-31-06-04-00`

## Summary

Grass and flower chunk generation currently accepts raw callbacks with no authoritative identity. The required interaction boundary is an admission step that binds each candidate request to the current vegetation and exclusion artifact before any live geometry is replaced.

## Plan ledger

**Goal:** convert local callback access into explicit, revision-checked flora consumer commands and typed results.

- [x] Map current call sequence.
- [x] Identify missing command and source identity.
- [x] Define admission, rejection and paired commit states.
- [x] Define stale callback behavior.
- [ ] Implement the command path and fixtures.

## Current sequence

```txt
camera center changes
  -> grass.rebuild(center)
  -> generateGrassChunkCandidates(callbacks)
  -> root.add(mesh)

camera center changes
  -> flowers.rebuild(center)
  -> generateFlowerChunkCandidates(callbacks)
  -> root.add(mesh)
```

The callbacks close over private construction-time indexes. No command identifies their source generation.

## Required command

```txt
GenerateFloraChunkPairCommand {
  runtimeSessionId
  frameId
  worldRevision
  qualityRevision
  vegetationGenerationId
  floraExclusionRevision
  floraExclusionFingerprint
  chunkX
  chunkZ
  grassProfile
  flowerProfile
  expectedPredecessorPairRevision
}
```

## Admission checks

```txt
runtime session is current
frame sequence is monotonic
world and quality revisions are current
vegetation generation is committed
exclusion artifact revision/fingerprint match
chunk request is still required
predecessor pair revision matches
budget and cancellation remain valid
```

## Results

```txt
Accepted -> detached grass and flower candidates may proceed
Rejected -> zero mutation and typed reason
Stale -> zero mutation and predecessor remains current
Failed -> preserve last-good pair
Duplicate -> return prior terminal result
```

## Commit rule

A grass result cannot become live without its matching flower result and one successful cross-consumer parity check. Empty candidate sets are valid terminal results and must still cite the artifact revision.

## Late-event rule

Completion from an older world, quality, vegetation, artifact, frame or chunk-pair generation must be quarantined and must not dispose or replace current geometry.