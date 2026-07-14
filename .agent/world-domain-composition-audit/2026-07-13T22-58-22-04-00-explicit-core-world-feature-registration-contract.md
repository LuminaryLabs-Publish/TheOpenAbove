# World Domain Composition Audit: Explicit Core World Feature Registration Contract

**Timestamp:** `2026-07-13T22-58-22-04-00`

## Summary

The product must own the exact Core World composition it depends on. Implicit nested installation is not an acceptable dependency contract for startup-critical APIs.

## Plan ledger

**Goal:** formalize the repaired composition as a provider-versioned, duplicate-safe and feature-transactional contract.

- [x] Record the accepted domain order.
- [x] Record parent/child installation policy.
- [x] Record capability and ownership requirements.
- [x] Record feature registration semantics.
- [x] Record visual readiness proof.
- [ ] Implement executable enforcement.

## Composition manifest

```txt
providerRevision: 112de886131c00121c36f004c257bd50ff122589

participants:
  Core World root
  World Foundation
  World Features
  Landform Features
  Open Above Balloon Telemetry

policy:
  Core World childDomains = false
  each child domain installed explicitly once
  each provided token has one owner
  telemetry requires n:world:features
  visual bootstrap requires worldFeatures and worldFoundation
```

## Feature registration contract

```txt
FeatureSetRegistrationCommand {
  compositionRevision
  expectedRegistryRevision
  featureSetFingerprint
  features[]
}

FeatureSetRegistrationResult {
  status
  predecessorRevision
  registryRevision
  featureSetFingerprint
  receipts[]
  error?
}
```

All features must validate before any are adopted. A duplicate feature with identical content may be idempotent; a conflicting definition must be rejected without replacing the accepted set implicitly.

## Provider proof contract

The real pinned Nexus Engine module must be imported and used to create the engine. Proof must verify exported factories, actual kit identities, dependency resolution, namespace ownership, `worldFeatures.registerFeature`, World Foundation access and zero duplicate child installation.

## Visual admission contract

```txt
VisualBootstrapCommand {
  compositionRevision
  featureRegistryRevision
  foundationRevision
  worldConfigRevision
}
```

The visual domain may become ready only when all revisions match. The first rendered world frame must acknowledge the same values.

## Compatibility constraint

Keep the targeted runtime fix. Do not re-enable implicit Core World children or restructure Nexus Engine. Add proof and typed admission around the explicit composition.

## Validation boundary

The current fake-provider test is useful structural coverage but does not satisfy this contract.