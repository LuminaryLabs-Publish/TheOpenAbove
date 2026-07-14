# Architecture Audit: World Domain Composition Admission DSK Map

**Timestamp:** `2026-07-13T22-58-22-04-00`  
**Runtime reviewed:** `3884cc509562c07c7c8eee15dd67fd707be64198`

## Summary

The runtime now composes the required Core World domains explicitly. The remaining architecture gap is a provider-bound admission boundary that validates factories, dependency tokens, ownership, feature registration and visual readiness as one revisioned result.

## Plan ledger

**Goal:** define the smallest authority that makes explicit domain composition executable, typed and observable without restructuring Nexus Engine.

- [x] Map current factories and dependency order.
- [x] Map provider, engine namespace and product feature participants.
- [x] Separate repaired runtime behavior from remaining proof gaps.
- [x] Define coordinating DSK surfaces and terminal results.
- [ ] Implement outside this documentation pass.

## Current composition

```txt
createCoreWorldDomain({ childDomains:false })
  provides n:world

createWorldFoundationDomain()
  requires n:world
  provides n:world:foundation

createWorldFeatureDomain()
  requires n:world
  provides n:world:features

createLandformFeatureDomain()
  requires n:world:features
  provides n:world:features:landform

open-above-balloon-telemetry-kit
  requires n:world:features
  provides telemetry, wind-drift-state and visual-state
```

## Required parent domain

```txt
open-above-world-domain-composition-admission-authority-domain
```

## DSK breakdown

| Surface | Responsibility |
|---|---|
| `open-above-nexus-provider-api-manifest-kit` | Declare required provider exports and pinned revision. |
| `open-above-world-domain-composition-manifest-kit` | Declare ordered domains, IDs, requires, provides and ownership expectations. |
| `open-above-core-world-child-policy-kit` | Make implicit-child policy explicit and testable. |
| `open-above-domain-capability-preflight-kit` | Validate factories before engine construction. |
| `open-above-domain-dependency-graph-kit` | Resolve and validate dependency tokens. |
| `open-above-duplicate-domain-provider-detection-kit` | Reject duplicate namespace or token owners. |
| `open-above-world-domain-composition-command-kit` | Carry provider, host and predecessor identity. |
| `open-above-world-domain-preparation-receipt-kit` | Record prepared participants without claiming adoption. |
| `open-above-real-provider-composition-proof-kit` | Execute composition against the pinned Nexus Engine module. |
| `open-above-world-domain-composition-result-kit` | Publish accepted, rejected or failed terminal state. |
| `open-above-world-features-api-probe-kit` | Verify registry and feature lifecycle operations. |
| `open-above-world-foundation-api-probe-kit` | Verify foundation contribution and sampling operations. |
| `open-above-feature-set-registration-command-kit` | Bind the complete authored feature set and expected revision. |
| `open-above-feature-set-registration-result-kit` | Report per-feature and aggregate registration evidence. |
| `open-above-visual-bootstrap-admission-kit` | Admit visual creation only against accepted composition. |
| `open-above-browser-world-boot-proof-kit` | Exercise real browser startup and fatal fallback. |
| `open-above-build-pages-world-composition-proof-kit` | Prove source, build and deployed provider parity. |
| `open-above-world-composition-readback-kit` | Expose provider, composition and feature revisions. |
| `open-above-first-registered-world-frame-ack-kit` | Confirm a visible frame from the accepted feature set. |

## Ownership boundary

```txt
provider adapter owns:
  provider revision and export manifest

composition authority owns:
  domain list
  child policy
  dependency proof
  duplicate-owner rejection
  engine generation

feature registration owns:
  feature-set fingerprint
  registration receipts
  registry revision

visual bootstrap owns:
  accepted composition revision
  accepted feature revision
  first visible frame acknowledgement
```

## Rejection conditions

```txt
missing provider factory
incompatible provider revision
missing required token
multiple providers for one token
implicit child installation still enabled
missing worldFeatures or worldFoundation API
stale host generation
duplicate or conflicting feature ID
partial feature registration
visual bootstrap against predecessor composition
```

## Validation boundary

The fake-provider smoke verifies call intent only. Real provider, build and browser adoption remain unproven.