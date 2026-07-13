# World Feature Audit: Foundation Channel and Revision Contract

**Timestamp:** `2026-07-13T18-40-52-04-00`

## Summary

The new bridge proves the intended semantic direction but does not expose the revisioned artifact needed by the rest of the game. This audit defines the minimum portable contract for compiling and adopting Core World feature/foundation data.

## Plan ledger

**Goal:** preserve Core World ownership and make every adopted channel traceable from semantic feature to visible and physical consumer.

- [x] Identify semantic feature inputs.
- [x] Identify compiler outputs.
- [x] Identify currently consumed channels.
- [x] Define portable artifacts and invariants.
- [ ] Implement and validate.

## Required artifact

```txt
ResolvedWorldFoundationArtifact {
  schemaVersion
  artifactId
  runtimeGeneration
  coreWorldProviderRevision
  worldId
  cellId
  cellBounds
  baseCandidateId
  baseGenerationRevision
  featureRegistryRevision
  featureLifecycleRevision
  foundationCellRevision
  featureIds
  contributionIds
  channels {
    elevation
    material
    collision
  }
  fidelityRequirements
  fingerprint
}
```

## Invariants

```txt
one artifact cites one immutable base candidate
all contribution dependencies resolve before publication
all channels cite the same foundation cell revision
feature lifecycle changes invalidate predecessor artifacts
reset/dispose retires pending artifacts
consumer preparation cannot mutate the active predecessor
public sampling changes only at accepted adoption commit
visible acknowledgement cites the adopted artifact fingerprint
```

## Product adapters

```txt
elevation adapter
  -> generic terrain and gameplay height sampling

material adapter
  -> terrain shader/material zones and map palette

collision adapter
  -> terrain-height collision descriptor and gameplay consumers

fidelity adapter
  -> near feature mesh, middle foundation field, far silhouette
```

## Relationship to staged generation

```txt
base WorldCandidateArtifact
  -> WorldFeatureCompileCommand
  -> ResolvedWorldFoundationArtifact
  -> staged consumer preparation
  -> atomic world/foundation adoption
  -> first visible world/landform acknowledgement
```

This contract should extend the existing staged-generation adoption plan instead of creating a parallel world commit path.
