# Architecture Audit: World Feature/Foundation Adoption DSK Map

**Timestamp:** `2026-07-13T18-40-52-04-00`  
**Runtime:** `bde5e6f5ca660715d2c1b4592d508431e89587cd`

## Summary

The product now uses the correct Nexus Engine semantic split: World Features describes a mountain and World Foundation resolves physical elevation. The missing boundary is product adoption. One local bridge bypasses the parent Core World builder, collapses the feature set into a global cell, and forwards only elevation into existing consumers.

## Plan ledger

**Goal:** retain the Core World semantic model while defining a minimal product authority that compiles, versions, adopts, rolls back, and proves all required foundation channels.

- [x] Map installed Core World domains.
- [x] Map local product composition.
- [x] Identify owned and unowned state.
- [x] Identify service and channel loss.
- [x] Define the authority boundary and kit cut.
- [ ] Implement and validate it.

## Current domain tree

```txt
n:world
├─ Core World parent
│  ├─ world definitions
│  ├─ partitions and cells
│  ├─ surfaces
│  ├─ provider lifecycle
│  ├─ effects
│  └─ snapshots
├─ n:world:foundation
│  ├─ definitions
│  ├─ contributions
│  ├─ composition
│  ├─ sampling
│  ├─ cell resolution
│  └─ snapshots
└─ n:world:features
   ├─ registry
   ├─ lifecycle
   ├─ query
   ├─ composition
   ├─ compile
   ├─ samplers
   ├─ snapshots
   └─ n:world:features:landform
      ├─ mountain
      ├─ canyon contract
      ├─ cliff contract
      └─ plateau contract
```

## Product composition

```txt
WORLD.features.landforms
  -> telemetry engine registers northern-wall
  -> World Features normalizes mountain
  -> local bridge compileCell(open-above-global-foundation)
  -> World Foundation resolves contribution channels
  -> local bridge reads sampleElevation only
  -> baseWorld.sampleHeight + feature elevation
  -> terrain / collision height / flora / map
```

## Ownership mismatch

```txt
Core World parent owns:
  world identity, partitions, cells, surfaces, providers, effects and snapshots

Product currently owns outside Core World:
  base generated arrays
  one global feature cell identity
  feature compilation timing
  sampling composition
  terrain/vegetation/flora/map adoption
  collision-height use
  visible-frame timing
```

No `registerWorld`, partition, focus, `updateWorld`, provider preparation, effect descriptor, world snapshot, or cell lifecycle call connects the rendered world to the parent Core World domain.

## Channel loss

The mountain compiler creates:

```txt
elevation:
  world-feature-field

material:
  mountain-material-zones

collision:
  foundation-heightfield

metadata:
  fidelity
  cliffThreshold
```

The product bridge consumes:

```txt
elevation: yes
material: no
collision descriptor: no
fidelity: no
cliff threshold: no
```

The map color is a local elevation tint, not a material-channel adapter.

## Revision gap

```txt
base generation revision: exposed
foundation compiled boolean: exposed
feature count: exposed

feature registry revision: absent
feature lifecycle revision: absent
foundation cell revision: absent
contribution IDs/fingerprint: absent
channel manifest revision: absent
consumer adoption revision: absent
visible frame revision: absent
```

## Required parent

```txt
open-above-world-feature-foundation-adoption-authority-domain
```

This is a product child authority. It should participate in the previously documented staged-world-generation scheduler/adoption authority rather than replace it.

## DSK cut

```txt
open-above-world-feature-foundation-adoption-authority-domain
├─ world-feature-compile-command-kit
├─ world-feature-registry-revision-kit
├─ foundation-cell-artifact-kit
├─ foundation-channel-manifest-kit
├─ foundation-elevation-adapter-kit
├─ foundation-material-adapter-kit
├─ foundation-collision-adapter-kit
├─ landform-fidelity-plan-kit
├─ world-feature-consumer-registry-kit
├─ world-feature-adoption-plan-kit
├─ world-feature-adoption-result-kit
├─ world-feature-adoption-rollback-kit
├─ first-visible-landform-frame-ack-kit
└─ world-feature-foundation-fixture-gate-kit
```

## Command contract

```txt
WorldFeatureCompileCommand {
  commandId
  runtimeGeneration
  worldId
  baseCandidateId
  baseGenerationRevision
  featureRegistryRevision
  featureLifecycleRevision
  cellId
  cellBounds
  expectedFoundationRevision
}

ResolvedWorldFoundationArtifact {
  artifactId
  worldId
  cellId
  baseCandidateId
  featureIds
  contributionIds
  elevationRevision
  materialRevision
  collisionRevision
  fidelityRevision
  fingerprint
}

WorldFoundationAdoptionResult {
  commandId
  artifactId
  result
  consumerReceipts
  rollbackReceipt
  visibleFrameId
}
```

## Compatibility constraints

Preserve the existing 500 metre profile, route/town protection, fallback world, staged generation, terrain sampling signatures, Air Mail behavior, map style, and current public host. Do not fold provider admission, persistence, or dual-surface frame coherence into the first implementation cut.
