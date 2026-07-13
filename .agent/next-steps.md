# Next Steps: TheOpenAbove

**Last aligned:** `2026-07-13T05-19-21-04-00`

## Plan ledger

**Goal:** replace implicit static-provider trust with one immutable provider manifest, provider-set admission result, provider-independent failure shell and browser/headless/build/Pages parity proof.

### Gate 1: freeze provider identity

- [ ] Add `open-above-runtime-module-provider-admission-authority-domain`.
- [ ] Define a versioned runtime-provider manifest.
- [ ] Replace the NexusEngine `@main` browser reference with an immutable commit or release identity.
- [ ] Record exact Three.js source identity and approved content fingerprint policy.
- [ ] Make the same NexusEngine revision available to browser and headless validation.

### Gate 2: create a provider-independent bootstrap shell

- [ ] Move provider resolution behind a bootstrap module that imports no Three.js or NexusEngine code.
- [ ] Keep loading, rejection and fallback UI entirely provider-independent.
- [ ] Add bounded timeout and explicit retry policy.
- [ ] Preserve the current HTML error surface and accessibility semantics.

### Gate 3: verify providers before adoption

- [ ] Validate manifest schema and immutable source identities.
- [ ] Verify content fingerprints or an explicit integrity policy.
- [ ] Validate module MIME/evaluation outcome.
- [ ] Validate required exports.
- [ ] Probe the NexusEngine API contract without mutating gameplay.
- [ ] Reject partial provider sets.

### Gate 4: commit one provider generation

- [ ] Add command ID, runtime-session ID and expected provider generation.
- [ ] Add provider IDs, source revisions and fingerprints.
- [ ] Atomically commit one provider-set generation.
- [ ] Publish `RuntimeProviderAdmissionResult`.
- [ ] Return the prior result for duplicate command IDs.
- [ ] Reject stale expected generations with zero gameplay mutation.

### Gate 5: compose runtime only after acceptance

- [ ] Create visual, simulation, airstream, mail, map and telemetry owners only after provider acceptance.
- [ ] Prevent partially constructed owner graphs from becoming public.
- [ ] Publish provider identity through telemetry and `GameHost` as detached readback.
- [ ] Keep raw provider objects behind an explicit capability boundary.

### Gate 6: visible proof

- [ ] Add provider loading, accepted, rejected and fallback-selected projections.
- [ ] Add first provider-backed visible-frame acknowledgement.
- [ ] Add first provider-failure visible-frame acknowledgement.
- [ ] Correlate each visible frame with provider-set generation and result ID.

### Gate 7: deployment parity

- [ ] Make the Pages workflow checkout the exact manifest NexusEngine revision.
- [ ] Validate the browser artifact references the same provider identity.
- [ ] Inspect `dist` for mutable provider references.
- [ ] Publish a provider manifest with the Pages artifact.
- [ ] Compare source, headless, build and live Pages receipts.

### Gate 8: proof

- [ ] Add mutable-branch rejection fixture.
- [ ] Add exact-revision acceptance fixture.
- [ ] Add fingerprint mismatch fixture.
- [ ] Add missing-export and API-drift fixtures.
- [ ] Add timeout and provider-unavailable fixtures.
- [ ] Add partial-set rollback fixture.
- [ ] Add duplicate/stale command fixtures.
- [ ] Add browser/headless revision parity fixture.
- [ ] Add provider-independent failure UI fixture.
- [ ] Add first-visible-provider-frame fixture.
- [ ] Add source/build/Pages parity fixture.

## Implementation order

```txt
1. provider manifest and immutable identities
2. provider-independent bootstrap shell
3. source resolution and bounded timeout
4. fingerprint/integrity verification
5. export and API-contract probes
6. provider-set generation and typed result
7. accepted-owner composition
8. telemetry and GameHost receipts
9. provider-independent failure projection
10. browser/headless/build/Pages parity
11. first visible frame acknowledgements
12. pure, browser, build and Pages fixtures
```

## Recommended file cut

```txt
src/bootstrap/
  runtime-provider-manifest.js
  provider-resolution-command.js
  provider-verification.js
  provider-admission-result.js
  provider-independent-shell.js

src/runtime/provider-admission/
  runtime-module-provider-admission-authority-domain.js
  provider-set-generation-kit.js
  provider-api-contract-kit.js
  provider-parity-kit.js
  provider-telemetry-receipt-kit.js

src/main.js
  consume accepted provider set instead of static remote imports

.github/workflows/deploy-pages.yml
  checkout and validate the exact manifest NexusEngine revision

tests/
  provider-admission.mjs
  provider-failure-browser.mjs
  provider-parity.mjs
```

## Compatibility constraints

Preserve current Three.js version, controls, Air Mail gameplay, world generation, visual quality, map behavior and telemetry schema during the first provider-admission cut. Do not combine provider admission with delivery-completion or persistence implementation.

## Current documentation state

Repo-local documentation is aligned through the `2026-07-13T05-19-21-04-00` runtime module/provider admission audit family. Runtime implementation and executable proof remain open.