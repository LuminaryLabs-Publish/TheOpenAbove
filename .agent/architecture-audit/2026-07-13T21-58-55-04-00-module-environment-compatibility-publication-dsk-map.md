# Architecture Audit: Module Environment and Compatibility Publication DSK Map

**Timestamp:** `2026-07-13T21-58-55-04-00`

## Plan ledger

**Goal:** separate deterministic grass-seed services from browser-global compatibility publication and give the host explicit installation, ownership and retirement authority.

- [x] Identify current producers and consumers.
- [x] Classify the ambient side effect.
- [x] Define the parent domain and atomic result boundary.
- [x] Preserve current ESM exports and deterministic behavior.
- [ ] Implement the authority.

## Current dependency graph

```txt
open-above-grass-world-seed-kit
  exports deterministic seed math
  also mutates window during browser import

world-generation-support
  imports seed math
  -> world-generation-kit
  -> terrain, flora, map and gameplay consumers

grass and flower kits
  import seed math
  -> candidate placement
  -> texture variants
  -> visible instances

smoke and headless validation
  import world and grass tests
  -> evaluate seed module in Node
```

## Boundary defect

Deterministic math and compatibility publication are owned by the same module evaluation. Environment detection prevents a Node exception, but it does not provide an explicit command, result, collision policy, host generation or disposal.

## Required parent domain

```txt
open-above-module-environment-compatibility-publication-authority-domain
```

## DSK decomposition

```txt
module environment
  open-above-module-environment-classification-kit
  open-above-import-purity-contract-kit
  open-above-module-import-proof-kit
  open-above-worker-import-proof-kit
  open-above-browser-import-purity-proof-kit

seed contract
  open-above-grass-seed-public-api-manifest-kit
  open-above-grass-seed-algorithm-revision-kit
  open-above-seed-consumer-revision-kit

compatibility publication
  open-above-compatibility-publication-policy-kit
  open-above-compatibility-publication-command-kit
  open-above-compatibility-target-inspection-kit
  open-above-compatibility-namespace-collision-kit
  open-above-compatibility-publication-result-kit
  open-above-compatibility-publication-idempotence-kit
  open-above-compatibility-publication-generation-kit
  open-above-compatibility-retirement-kit

visible proof
  open-above-first-seed-revision-frame-ack-kit
```

## Required service contract

```txt
createGrassSeedApi()
  -> immutable ESM-facing deterministic API

inspectCompatibilityTarget(target, expectedRevision)
  -> vacant | owned-compatible | owned-stale | foreign-collision

installGrassSeedCompatibility(command)
  -> CompatibilityPublicationResult

disposeGrassSeedCompatibility(publicationId, ownerGeneration)
  -> CompatibilityRetirementResult
```

## Invariants

```txt
ESM import mutates no global
Node, browser and worker imports expose the same deterministic API
only the admitted host can publish the legacy global
foreign globals are never overwritten silently
same revision and generation are idempotent
retirement removes only the owned publication
world, grass and flower consumers bind one seed algorithm revision
```

## Migration ledge

Move the `window.OpenAboveGrassWorldSeedKit` assignment into a compatibility adapter imported by the browser host only. Keep `grass-world-seed-kit.js` limited to constants and pure functions. Add environment and lifecycle fixtures before removing the guard-based assignment.