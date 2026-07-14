# Provider Contract Audit: Core Capability Forwarding Contract

**Timestamp:** `2026-07-14T01-39-09-04-00`  
**Pinned provider:** `LuminaryLabs-Dev/NexusEngine@ea973811342fe3ba2a35bb018323d987d3fec4b5`

## Summary

The pinned provider fixes a wrapper-level contract loss. Core capability domain factories already declared hierarchy, dependency, capability, visibility, and install behavior, but `createCoreCapabilityKit()` did not forward those values into `defineDomainServiceKit()`. The new revision forwards them.

## Plan ledger

**Goal:** record the exact forwarding contract TheOpenAbove depends on and the proof required before treating a future provider pin as compatible.

- [x] Compare old and new wrapper behavior.
- [x] Map every forwarded field to DSK behavior.
- [x] Map World Features declarations to product use.
- [x] Define compatibility invariants.
- [ ] Add provider-pin regression tests in the product.

## Exact upstream change

```txt
createCoreCapabilityKit(config)
  now forwards:
    domainPath: config.domainPath
    parentDomainPath: config.parentDomainPath
    apiPath: config.apiPath
    visibility: config.visibility ?? config.apiVisibility
    requires: config.requires ?? []
    provides: config.provides ?? []
    install: config.install
```

## Field-to-behavior map

| Field | DSK behavior | TheOpenAbove dependency |
|---|---|---|
| `domainPath` | Canonical API/capability path and mandatory provide token | `n:world:features` and other Core World paths must remain stable |
| `parentDomainPath` | Validates nested hierarchy | Features and Foundation must remain under `n:world` |
| `apiPath` | Registers addressable API metadata | Diagnostics and composition can resolve canonical API paths |
| `visibility` | Controls API exposure policy | Public Core World APIs must remain available to the product bridge |
| `requires` | Enforces dependency admission | World Features requires Core World; telemetry requires World Features |
| `provides` | Publishes additional capabilities | Composition and consumers can resolve declared tokens |
| `install` | Runs domain-specific post-API setup | World Features publishes `engine.worldFeatures` alias |

## World Features contract at the pinned revision

```txt
factory: createWorldFeatureDomain
id: n-world-feature-domain
domain: core-world-features
domainPath: n:world:features
parentDomainPath: n:world
apiName: worldFeatures
requires:
  n:world
services:
  definition
  registry
  lifecycle
  query
  composition
  compile
  snapshot
install:
  engine.worldFeatures = engine.n.worldFeatures
```

## Product assumptions

```txt
engine.n.worldFeatures exists
engine.n.worldFeatures.registerFeature is callable
engine.n.worldFoundation exists
Landform Features can register feature types
telemetry dependency n:world:features resolves
feature compilation can find engine.worldFoundation or engine.n.worldFoundation
```

## Required provider compatibility invariants

```txt
immutable provider revision is known
required exports exist
all instantiated Core domains validate as DSKs
canonical domain paths match product manifest
parent paths are valid
required tokens are satisfied
provided tokens have one owner
engine.n API names are unique
custom install hooks execute exactly once
legacy aliases reference the same accepted API object
feature type registration succeeds
product feature registration succeeds
candidate engine can be retired after failure
```

## Missing product proof

The current test bypasses all wrapper and DSK behavior. Its fake factories return plain objects and its fake engine directly exposes a handcrafted `worldFeatures` API. It cannot fail when the real wrapper drops contract fields.

## Minimum real-provider fixture

```txt
import exact provider revision
instantiate the four Core World domains
assert each kit metadata object
assert generated requires/provides
compose with childDomains:false
assert engine.n APIs
assert engine.worldFeatures alias
assert one token owner
register one authored mountain
compile one bounded cell through World Features and Foundation
dispose candidate
```

## Upgrade policy

Every future Nexus Engine pin should be treated as a provider-contract migration, even when the product diff changes only one URL. Admission must compare the previous and candidate provider contract fingerprints before the new revision becomes the playable default.

## Validation boundary

The exact upstream source was inspected. No provider module import or runtime contract assertion was executed.