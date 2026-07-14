# Next Steps: TheOpenAbove Pinned Provider Capability Contract Forwarding

**Last aligned:** `2026-07-14T01-39-09-04-00`  
**Status:** `pinned-provider-capability-contract-forwarding-authority-audited`

## Plan ledger

**Goal:** prove the exact pinned provider contract before extending feature registration, visual readiness, or deployment claims.

### Gate 1: provider revision manifest

- [ ] Declare provider URL and revision `ea973811342fe3ba2a35bb018323d987d3fec4b5` in a local manifest.
- [ ] Validate required exports before domain construction.
- [ ] Calculate a provider-module fingerprint.
- [ ] Publish `ProviderModuleResult`.

### Gate 2: real Core capability contract inspection

- [ ] Instantiate Core World, Foundation, Features, and Landforms from the real provider.
- [ ] Assert IDs, domains, `domainPath`, `parentDomainPath`, and `apiPath`.
- [ ] Assert API visibility.
- [ ] Assert every `requires` and `provides` token.
- [ ] Assert service lists and metadata.
- [ ] Calculate one provider-contract fingerprint.

### Gate 3: install and addressability proof

- [ ] Compose with `childDomains:false`.
- [ ] Assert one owner for every mandatory capability token.
- [ ] Assert `engine.n.worldFeatures` and `engine.n.worldFoundation`.
- [ ] Assert `engine.worldFeatures === engine.n.worldFeatures`.
- [ ] Assert no API overwrite or duplicate child installation.
- [ ] Retire the candidate cleanly after the fixture.

### Gate 4: product feature-set transaction

- [ ] Validate all authored landforms before mutation.
- [ ] Fingerprint the complete feature set.
- [ ] Define identical-duplicate idempotence and conflicting-duplicate rejection.
- [ ] Adopt all features or none.
- [ ] Publish per-feature receipts and one aggregate result.

### Gate 5: visual bootstrap admission

- [ ] Bind visual creation to provider contract, composition, registry, and foundation revisions.
- [ ] Expose immutable revision readback through GameHost diagnostics.
- [ ] Prevent visual startup from a rejected or stale provider contract.

### Gate 6: visible-frame proof

- [ ] Add a frame envelope with provider and world revisions.
- [ ] Publish `FirstProviderContractWorldFrameAck`.
- [ ] Reject mixed, predecessor, stale, or timed-out frames.

### Gate 7: source/build/Pages parity

- [ ] Add `tests/world-domain-composition.real-provider.mjs`.
- [ ] Run `npm run check`.
- [ ] Run `npm run build`.
- [ ] Run source-browser, built-browser, and Pages fixtures.
- [ ] Compare provider and contract fingerprints across all surfaces.
- [ ] Exercise missing-export, wrong-path, unsatisfied-dependency, duplicate-owner, alias-failure, feature-conflict, and frame-timeout cases.

## Recommended file cut

```txt
src/runtime/provider-contract/
  pinned-provider-capability-contract-authority-domain.js
  provider-revision-manifest-kit.js
  provider-export-probe-kit.js
  core-capability-contract-manifest-kit.js
  provider-capability-contract-result-kit.js
  feature-set-registration-result-kit.js
  visual-bootstrap-contract-admission-kit.js

tests/
  world-domain-composition.real-provider.mjs
  world-domain-composition.browser.mjs
  world-domain-composition.build.mjs
  world-domain-composition.pages.mjs
```

## Compatibility constraints

Preserve the explicit domain order, `childDomains:false`, current telemetry API, authored world features, deterministic world generation, terrain and flora behavior, flight, Air Mail, map behavior, and immutable provider pin until a candidate revision passes the same contract matrix.

## Retained next steps

The earlier grass-seed publication, world-generation public contract, feature/foundation adoption, staged-generation, and frame-coherence work remains open. It should not replace the startup-critical real-provider fixture.

## Do not claim

Do not claim provider-contract parity, unique token ownership, correct install aliases, atomic feature registration, browser readiness, or visible-frame convergence until all gates pass on `main`.