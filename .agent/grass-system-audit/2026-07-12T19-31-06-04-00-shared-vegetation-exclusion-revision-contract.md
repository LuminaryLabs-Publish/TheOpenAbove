# Grass System Audit: Shared Vegetation Exclusion Revision Contract

**Timestamp:** `2026-07-12T19-31-06-04-00`

## Summary

Grass and flowers currently share only the base `grassExcluded()` mask. Tree and cluster exclusions are separate consumer-local snapshots with different behavior and no revision identity.

## Plan ledger

**Goal:** define the shared artifact contract while preserving species-specific and flower-specific placement logic.

- [x] Identify shared and divergent exclusion inputs.
- [x] Separate canonical obstacle ownership from consumer adapters.
- [x] Define artifact schema and fingerprint inputs.
- [x] Define replacement and retirement behavior.
- [ ] Implement and test the artifact.

## Current shared mask

```txt
moisture > 0.86
slope > 0.42
origin clearing radius 95
procedural road band
```

## Current vegetation-derived divergence

```txt
grass:
  tree clearance = tree.radius
  cluster-edge proximity affects density

flowers:
  tree clearance = tree.radius + 1.2
  no cluster-proximity field
```

## Required artifact

```txt
FloraExclusionArtifact {
  runtimeSessionId
  worldRevision
  qualityRevision
  vegetationGenerationId
  exclusionRevision
  policyRevision
  treeRecords[]
  treeSpatialIndex
  clusterRecords[]
  clusterProximityField
  baseMaskDescriptor
  fingerprint
}
```

## Adapter rule

Grass and flower adapters may derive consumer-specific clearance from the canonical policy, but they may not copy raw vegetation arrays or invent unversioned constants.

## Fingerprint inputs

```txt
world revision
quality tier and tree budget
vegetation seed/configuration
committed tree and cluster records
base mask descriptor
consumer clearance policy
grid/index parameters
```

## Replacement rule

```txt
commit successor vegetation
  -> build successor exclusion artifact
  -> invalidate incompatible candidate work
  -> build paired grass/flower successors
  -> adopt all or preserve last-good pair
  -> retire predecessor artifact and geometry exactly once
```

## Snapshot rule

`getState()` must expose at least the current vegetation generation, exclusion revision, exclusion fingerprint, visible chunk-pair generation and last adoption result, not only counts.

## Non-claim

The shared `grassExcluded()` function does not constitute a shared vegetation-exclusion authority.