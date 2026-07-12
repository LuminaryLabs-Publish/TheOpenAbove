# Architecture Audit: Flora Exclusion Artifact DSK Map

**Timestamp:** `2026-07-12T19-31-06-04-00`

## Summary

The existing vegetation, grass and flower kits expose useful local services, but no parent domain owns exclusion identity, revision, policy, consumer admission or paired adoption.

## Plan ledger

**Goal:** place vegetation-derived exclusion data behind one domain service kit instead of allowing grass and flower consumers to retain unversioned private copies.

- [x] Map current producers and consumers.
- [x] Separate existing local services from missing authority services.
- [x] Define identities, commands, results, observations and fixtures.
- [x] Preserve current kit boundaries where they remain valid.
- [ ] Implement and prove the new domain.

## Current composition

```txt
open-above-vegetation-cluster-kit
  -> clusters
  -> treePositions
  -> trunks and crowns inserted live

open-above-grass-field-domain
  -> private tree cell map
  -> private cluster-proximity query
  -> live chunk rebuild

open-above-flower-field-domain
  -> separate private tree cell map
  -> live chunk rebuild
```

## Missing parent

```txt
open-above-flora-exclusion-artifact-authority-domain
```

## Candidate DSK composition

```txt
identity
  open-above-vegetation-generation-id-kit
  open-above-flora-exclusion-revision-kit
  open-above-flora-consumer-id-kit
  open-above-flora-chunk-generation-kit

policy and artifact
  open-above-flora-exclusion-policy-kit
  open-above-tree-exclusion-record-kit
  open-above-tree-exclusion-spatial-index-kit
  open-above-cluster-proximity-field-kit
  open-above-flora-exclusion-artifact-kit
  open-above-flora-exclusion-fingerprint-kit

consumer admission
  open-above-flora-chunk-input-fingerprint-kit
  open-above-flora-exclusion-admission-kit
  open-above-grass-exclusion-adapter-kit
  open-above-flower-exclusion-adapter-kit

transaction
  open-above-flora-paired-candidate-result-kit
  open-above-flora-paired-adoption-kit
  open-above-flora-last-good-rollback-kit
  open-above-stale-flora-exclusion-rejection-kit

proof
  open-above-flora-exclusion-observation-kit
  open-above-flora-exclusion-journal-kit
  open-above-flora-exclusion-visible-frame-ack-kit
  overlap, removal, stale, parity and Pages fixtures
```

## Service ownership

```txt
vegetation producer owns:
  tree/canopy placement
  generation identity
  committed tree records

flora-exclusion authority owns:
  clearance policy
  normalized spatial artifact
  artifact revision/fingerprint
  consumer admission
  paired result/adoption/rollback
  observations and visible acknowledgement

grass and flower consumers own:
  species/type density
  candidate geometry
  material and animation
  culling and local presentation
```

## Required command

```txt
BuildFloraExclusionArtifactCommand {
  runtimeSessionId
  worldRevision
  qualityRevision
  vegetationGenerationId
  vegetationFingerprint
  exclusionPolicyRevision
  treeRecords
  clusterRecords
}
```

## Required results

```txt
FloraExclusionArtifactResult:
  Accepted | Rejected | Failed | Stale | Duplicate

FloraConsumerCandidateResult:
  Accepted | Empty | Rejected | Failed | Stale

FloraPairedAdoptionResult:
  Committed | LastGoodRetained | Rejected | Failed | Stale
```

## Invariants

```txt
one committed vegetation generation -> one canonical exclusion artifact
every grass/flower chunk cites the artifact revision and fingerprint
local adapter behavior is declared by policy, not hidden constants
stale predecessor results mutate nothing
paired adoption never publishes mixed vegetation/flora generations
visible frame acknowledgement cites tree, grass, flower and artifact generations
```

## Promotion boundary

Do not add this parent domain to stable Nexus Engine core. It is a game/domain kit boundary until at least one second procedural-world consumer proves the same abstraction without TheOpenAbove-specific semantics.