# Interaction Audit: Contract Change to Proof Result Map

**Timestamp:** `2026-07-13T18-59-14-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

## Summary

A source edit, internal module move, public API change, behavior change, build or deployment can each affect proof differently. The current pipeline reduces them to regex assertions and process exit.

## Plan ledger

**Goal:** map each change class to explicit proof admission, rejection and terminal results.

- [x] Classify current change and proof paths.
- [x] Define identities and expected revisions.
- [x] Define source, behavior, build, deployed and visible receipts.
- [ ] Implement typed proof routing.

## Change classification

| Change | Expected result |
|---|---|
| Internal support-file move with identical public manifest and behavior | Accept; structural diagnostic updates only |
| Public export added or removed | Require contract revision and manifest update |
| Constant value changed | Require revision, behavior proof and consumer adoption |
| Generator behavior changed with same exports | Require behavior fingerprint change and consumer proof |
| Source changed but build artifact stale | Reject artifact parity |
| Pages artifact differs from accepted build | Reject deployed parity |
| Consumer still on predecessor revision | Reject visible-frame acknowledgement |

## Identity map

```txt
RepositoryRevision
WorldGenerationContractRevision
WorldGenerationModuleGraphRevision
SourceProofGeneration
BehaviorProofGeneration
BuildArtifactRevision
PagesArtifactRevision
ConsumerAdoptionGeneration
FrameSequence
```

## Result map

```txt
SourceImportResult
PublicExportResult
BehaviorProofResult
StagedLifecycleProofResult
RouteProtectionProofResult
BuildArtifactProofResult
PagesArtifactProofResult
ConsumerAdoptionResult
WorldGenerationProofResult
FirstContractRevisionFrameAck
```

## Admission rule

No structural regex or required-file check may publish `accepted` for the public contract. Acceptance requires the public manifest, executable behavior and every configured artifact/consumer gate.
