# Next Steps: TheOpenAbove World Domain Composition and Provider Admission

**Last aligned:** `2026-07-13T22-58-22-04-00`  
**Status:** `world-domain-composition-provider-admission-authority-audited`

## Plan ledger

**Goal:** turn the targeted explicit-composition fix into a real-provider, duplicate-safe and visibly proven startup contract without restructuring Nexus Engine.

### Gate 1: provider API manifest

- [ ] Declare the pinned provider revision.
- [ ] Validate `defineResource`, `defineEvent`, `defineRuntimeKit` and `createRealtimeGame`.
- [ ] Validate the four required Core World domain factories.
- [ ] Return a typed provider-admission result before kit creation.

### Gate 2: composition manifest

- [ ] Declare the ordered participant list.
- [ ] Keep `createCoreWorldDomain({ childDomains: false })`.
- [ ] Record expected IDs, `requires` and `provides` tokens.
- [ ] Reject duplicate token providers and implicit-child conflicts.
- [ ] Record one composition revision and host generation.

### Gate 3: real-provider fixture

- [ ] Import Nexus Engine revision `112de886131c00121c36f004c257bd50ff122589`.
- [ ] Compose the actual engine.
- [ ] Assert `worldFeatures` and `worldFoundation` capabilities.
- [ ] Assert one owner per required namespace/token.
- [ ] Assert no duplicate child installation.

### Gate 4: feature-set transaction

- [ ] Fingerprint the complete authored landform set.
- [ ] Validate every feature before mutation.
- [ ] Define identical-duplicate idempotence and conflicting-duplicate rejection.
- [ ] Adopt all features or none.
- [ ] Return per-feature receipts and one aggregate result.

### Gate 5: visual bootstrap admission

- [ ] Bind visual construction to composition and feature registry revisions.
- [ ] Bind world generation and terrain sampling to the same revisions.
- [ ] Publish a typed visual-bootstrap result.
- [ ] Expose immutable revision readback through GameHost diagnostics.

### Gate 6: visible-frame proof

- [ ] Add a frame envelope carrying provider, composition, registry and world-generation revisions.
- [ ] Publish `FirstRegisteredWorldFrameAck`.
- [ ] Reject a frame produced from predecessor or mixed revisions.

### Gate 7: source/build/Pages fixtures

- [ ] Run `npm run check`.
- [ ] Run the real-provider Node fixture.
- [ ] Run a source browser boot fixture.
- [ ] Run the production Vite build and browser fixture.
- [ ] Run the deployed Pages fixture.
- [ ] Exercise missing factory, duplicate provider, partial registration and visible-frame timeout failures.

## Recommended file cut

```txt
src/runtime/world-composition/
  world-domain-composition-authority-domain.js
  nexus-provider-api-manifest-kit.js
  world-domain-composition-manifest-kit.js
  world-domain-composition-result-kit.js
  feature-set-registration-kit.js
  visual-bootstrap-admission-kit.js

tests/
  world-domain-composition.real-provider.mjs
  world-domain-composition.browser.mjs
  world-domain-composition.build.mjs
  world-domain-composition.pages.mjs
```

## Compatibility constraints

Preserve the explicit domain list, `childDomains:false`, existing telemetry API, authored world features, deterministic generation, terrain and flora output, flight behavior, Air Mail, map behavior and the pinned provider until a deliberate provider upgrade is separately admitted.

## Retained next steps

The grass-seed import-purity and compatibility-publication work remains open. It should proceed independently after the startup-critical world composition fixture is established.

## Do not claim

Do not claim real-provider compatibility, duplicate-safe composition, atomic feature registration, browser readiness or visible-frame convergence until every gate passes on `main`.