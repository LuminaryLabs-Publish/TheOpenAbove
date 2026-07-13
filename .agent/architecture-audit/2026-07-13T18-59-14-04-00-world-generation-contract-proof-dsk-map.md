# Architecture Audit: World Generation Contract Proof DSK Map

**Timestamp:** `2026-07-13T18-59-14-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

## Summary

World generation has a healthy implementation split: an internal support module owns constants and helpers, while the kit module exposes the public factory and re-exports stable constants. Proof architecture does not yet mirror that ownership. Internal file layout and public behavior are both treated as terminal evidence without an explicit parent authority.

## Plan ledger

**Goal:** keep implementation modules free to evolve while one DSK owns contract identity, proof classification, parity and terminal results.

- [x] Map facade, support and test dependencies.
- [x] Separate runtime ownership from proof ownership.
- [x] Preserve Core World and product world-generation boundaries.
- [x] Define one parent proof domain.
- [x] Define source, behavior, build, Pages and visible proof children.
- [ ] Implement the DSK family.

## Current dependency graph

```txt
world-generation-support.js
  owns constants, phases, math, noise, anchors, cells, biomes and worksets
        |
        v
world-generation-kit.js
  owns generator state, sampling, staging, replacement, reset and disposal
  re-exports the intended public constants
        |
        +--> runtime terrain/flora/map/gameplay consumers
        +--> tests/world-generation.mjs
        |
tests/smoke.mjs
  also reads both source files directly
```

## Target domain tree

```txt
open-above-world-generation-contract-proof-authority-domain
├─ public contract identity
│  ├─ manifest
│  ├─ revision
│  └─ fingerprint
├─ dependency evidence
│  ├─ module graph
│  └─ support dependency diagnostics
├─ source proof
│  ├─ facade export proof
│  ├─ deterministic behavior proof
│  ├─ staged lifecycle proof
│  └─ route protection proof
├─ artifact parity
│  ├─ build artifact proof
│  └─ Pages artifact proof
├─ consumer proof
│  ├─ terrain and horizon
│  ├─ vegetation and flora
│  ├─ map and collision height
│  └─ visible frame
└─ terminal result
   ├─ drift rejection
   ├─ evidence fingerprint
   └─ fixture gate
```

## Ownership

```txt
world-generation-support.js
  internal implementation only

world-generation-kit.js
  canonical public API and manifest producer

Core World / Foundation / Features
  semantic world and resolved foundation ownership

product world generation
  deterministic base-world implementation

contract proof authority
  proof classification, execution, parity and result ownership

Vite and Pages adapters
  artifact production and deployed evidence providers

terrain/map/gameplay consumers
  adopted contract revision receipts
```

## Planned kits

- `open-above-world-generation-contract-proof-authority-domain`
- `open-above-world-generation-public-api-manifest-kit`
- `open-above-world-generation-contract-revision-kit`
- `open-above-world-generation-module-graph-kit`
- `open-above-world-generation-support-dependency-kit`
- `open-above-world-generation-source-import-proof-kit`
- `open-above-world-generation-public-export-proof-kit`
- `open-above-world-generation-behavior-proof-kit`
- `open-above-world-generation-staged-lifecycle-proof-kit`
- `open-above-world-generation-route-protection-proof-kit`
- `open-above-world-generation-consumer-contract-kit`
- `open-above-world-generation-build-artifact-proof-kit`
- `open-above-world-generation-pages-artifact-proof-kit`
- `open-above-world-generation-proof-result-kit`
- `open-above-world-generation-proof-fingerprint-kit`
- `open-above-world-generation-proof-drift-rejection-kit`
- `open-above-world-generation-visible-frame-proof-kit`
- `open-above-world-generation-proof-fixture-gate-kit`

## DSK command/result contract

```txt
command
  WorldGenerationContractChange
  expectedContractRevision
  repositoryRevision
  sourceFacade
  artifactTargets
  requiredConsumers

result
  WorldGenerationProofResult
  contractRevision
  manifestFingerprint
  sourceEvidence
  behaviorEvidence
  buildEvidence
  pagesEvidence
  consumerReceipts
  visibleFrameAck
  status: accepted | rejected | partial | stale | failed
```

## Constraint

Structural source checks may remain, but they must be labeled diagnostics. They cannot independently establish public API or deployed parity.
