# Architecture Audit: Pinned Provider Capability Contract DSK Map

**Timestamp:** `2026-07-14T01-39-09-04-00`  
**Runtime revision:** `09bb6b95549d9480dfc2caa4517575ab4009ba98`  
**Provider revision:** `ea973811342fe3ba2a35bb018323d987d3fec4b5`

## Summary

The product-side change is one immutable provider-pin update. The architectural effect is larger: the pinned provider now preserves the DSK contract fields declared by Core capability domains instead of dropping them inside `createCoreCapabilityKit()`.

## Plan ledger

**Goal:** map the repaired provider fields to the exact Core World domains used by TheOpenAbove and define the missing product-level admission authority.

- [x] Inspect `createCoreCapabilityKit()` at the pinned revision.
- [x] Inspect `defineDomainServiceKit()` validation and API installation.
- [x] Inspect `createWorldFeatureDomain()` declarations and install alias.
- [x] Map the product's explicit composition order.
- [x] Preserve the complete 100-surface inventory.
- [x] Define planned coordinating surfaces.
- [ ] Add executable real-provider assertions.

## Current composition graph

```txt
createRealtimeGame
  -> n-world-domain
       domainPath: n:world
       childDomains: false
  -> n-world-foundation-domain
       canonical child of n:world
  -> n-world-feature-domain
       domainPath: n:world:features
       parentDomainPath: n:world
       requires: n:world
       apiName: worldFeatures
       install alias: engine.worldFeatures = engine.n.worldFeatures
  -> n-world-landform-feature-domain
       child of n:world:features
       requires World Features
  -> open-above-balloon-telemetry-kit
       requires: n:world:features
```

## Repaired wrapper fields

```txt
domainPath -> canonical service path and mandatory provide token
parentDomainPath -> hierarchy validation
apiPath -> addressable API path metadata
visibility / apiVisibility -> API exposure policy
requires -> dependency graph admission
provides -> extra capability publication
install -> custom post-API installation and aliases
```

## DSK constructor behavior used by the repair

`defineDomainServiceKit()`:

```txt
normalizes domain paths and capability tokens
requires domainPath to sit under parentDomainPath
adds domainPath and service capability tokens to provides
preserves requires
rejects malformed tokens
rejects engine.n API overwrite
installs engine.n[apiName]
runs the forwarded custom install hook
registers addressable domain APIs
validates that the kit provides its canonical domainPath
```

## Existing product ownership

```txt
TheOpenAbove owns:
  explicit participant order
  childDomains:false policy
  telemetry dependency
  authored landform descriptors
  feature registration calls
  visual bridge and game boot

Nexus Engine owns:
  DSK contract construction
  dependency and provides metadata
  API namespace installation
  addressability registration
  Core World domain implementation
```

## Missing ownership boundary

The product does not currently own a runtime result proving that its exact provider pin exposes the expected contract. A static URL selects the revision, but no command inspects the instantiated kits before adoption.

## Required parent domain

```txt
open-above-pinned-provider-capability-contract-admission-authority-domain
```

## Planned coordinating surfaces

```txt
provider identity
  open-above-provider-revision-manifest-kit
  open-above-provider-export-probe-kit

contract inspection
  open-above-core-capability-contract-manifest-kit
  open-above-domain-path-forwarding-proof-kit
  open-above-parent-domain-path-forwarding-proof-kit
  open-above-api-path-forwarding-proof-kit
  open-above-api-visibility-forwarding-proof-kit
  open-above-requires-forwarding-proof-kit
  open-above-provides-forwarding-proof-kit
  open-above-install-hook-forwarding-proof-kit

composition proof
  open-above-canonical-token-ownership-proof-kit
  open-above-domain-api-addressability-proof-kit
  open-above-core-world-candidate-kit
  open-above-world-foundation-candidate-kit
  open-above-world-features-candidate-kit
  open-above-landform-features-candidate-kit
  open-above-telemetry-candidate-kit

results and adoption
  open-above-provider-contract-fingerprint-kit
  open-above-provider-capability-contract-result-kit
  open-above-feature-set-registration-result-kit
  open-above-visual-bootstrap-contract-admission-kit
  open-above-first-provider-contract-world-frame-ack-kit
```

## Command contract

```txt
PinnedProviderCapabilityAdmissionCommand {
  commandId
  providerUrl
  providerRevision
  expectedHostGeneration
  expectedCompositionRevision
  expectedFeatureRegistryRevision
}

ProviderCapabilityContractResult {
  status: Accepted | Rejected | Failed | Stale | Superseded | Cancelled
  providerRevision
  exportFingerprint
  participantContracts[]
  canonicalTokenOwners
  apiAddressability
  aliasProof
  compositionRevision
  featureRegistryRevision
  issues[]
}
```

## Admission invariants

```txt
one immutable provider revision per accepted host generation
one canonical owner for n:world
one canonical owner for n:world:foundation
one canonical owner for n:world:features
one canonical owner for n:world:features:landform
all child paths nested under their declared parents
all requires satisfied before install
engine.n API paths installed once
custom aliases point to the accepted engine.n API
no authored feature registration before contract acceptance
no visual bootstrap before feature-set acceptance
```

## Validation boundary

The upstream source repair was inspected, but no real provider module was executed in this run. The product fake-provider test cannot prove these invariants.