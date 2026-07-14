# START HERE: TheOpenAbove Pinned Provider Capability Contract Forwarding

**Last aligned:** `2026-07-14T01-39-09-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`  
**Branch:** `main`  
**Runtime revision reviewed:** `09bb6b95549d9480dfc2caa4517575ab4009ba98`  
**Nexus Engine provider:** `ea973811342fe3ba2a35bb018323d987d3fec4b5`  
**Status:** `pinned-provider-capability-contract-forwarding-authority-audited`

## Summary

The latest runtime pins the Nexus Engine revision that repairs Core capability DSK contract forwarding. `domainPath`, `parentDomainPath`, `apiPath`, visibility, `requires`, `provides`, and custom `install` hooks now reach `defineDomainServiceKit()`.

The fix is directly relevant to TheOpenAbove's explicit Core World composition. The remaining gap is real-provider proof: the product test still uses fake factories and a handcrafted engine namespace, so the pinned provider's actual metadata, tokens, API addressability, install aliases, feature registration, and first visible world frame are not yet proven.

## Plan ledger

**Goal:** make the immutable provider revision and its complete Core World capability contract an admitted, inspectable prerequisite for authored landforms and the playable world.

- [x] Compare all ten accessible Publish repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm nine eligible central ledgers and root `.agent` states.
- [x] Select only TheOpenAbove as the sole runtime-ahead repository.
- [x] Inspect product commit `09bb6b9...` and provider commit `ea973811...`.
- [x] Inspect the Core capability wrapper, DSK constructor, World Features domain, product boot, fake-provider test, and package wiring.
- [x] Preserve all 100 active kit, adapter, and Core World surfaces.
- [x] Add the `2026-07-14T01-39-09-04-00` audit family.
- [x] Use `main`; create no branch or pull request.
- [ ] Execute real-provider, browser, build, and Pages fixtures.

## Read this pass first

```txt
.agent/trackers/2026-07-14T01-39-09-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-14T01-39-09-04-00.md
.agent/architecture-audit/2026-07-14T01-39-09-04-00-pinned-provider-capability-contract-dsk-map.md
.agent/render-audit/2026-07-14T01-39-09-04-00-provider-contract-visible-frame-gap.md
.agent/gameplay-audit/2026-07-14T01-39-09-04-00-provider-contract-world-boot-loop.md
.agent/interaction-audit/2026-07-14T01-39-09-04-00-provider-admission-result-map.md
.agent/provider-contract-audit/2026-07-14T01-39-09-04-00-core-capability-forwarding-contract.md
.agent/deploy-audit/2026-07-14T01-39-09-04-00-pinned-provider-contract-fixture-gate.md
.agent/central-sync-audit/2026-07-14T01-39-09-04-00-provider-pin-runtime-reconciliation.md
```

## Selection

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
central ledger entries: 9
root .agent states: 9
new or missing eligible repositories: 0
runtime-ahead repositories: 1
selected: LuminaryLabs-Publish/TheOpenAbove
prior documentation head: c06f9a7df59a605ac22619dbefef831d412d619a
reviewed runtime head: 09bb6b95549d9480dfc2caa4517575ab4009ba98
```

## Main finding

```txt
pinned provider repair
  -> forwards canonical domain and API paths
  -> forwards parent hierarchy and visibility
  -> forwards requires and provides tokens
  -> forwards custom install hooks
  -> restores World Features alias/addressability semantics

remaining proof gap
  -> fake provider only
  -> no real kit metadata/token assertion
  -> no provider contract fingerprint
  -> no feature-set transaction
  -> no visual bootstrap revision
  -> no FirstProviderContractWorldFrameAck
```

## Required parent domain

```txt
open-above-pinned-provider-capability-contract-admission-authority-domain
```

## Next safe ledge

Add a Node real-provider fixture for revision `ea973811...` that inspects exact kit metadata, requires/provides, addressability, custom install aliases, unique token ownership, feature registration, and candidate retirement. Then bind the accepted contract fingerprint to visual bootstrap and source/build/Pages first-frame proof.

## Retained audits

Explicit world composition, grass-seed publication, world-generation public contracts, Core World feature/foundation adoption, staged generation, map/world coherence, runtime provider admission, Air Mail completion, and flight persistence audits remain valid.

## Do not claim

Do not claim real-provider contract parity, unique capability ownership, alias correctness, transactional feature registration, browser readiness, source/build/Pages parity, or first matching world-frame proof until the fixture matrix passes on `main`.