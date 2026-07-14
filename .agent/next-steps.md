# Next Steps: TheOpenAbove Provider Build Identity

**Last aligned:** `2026-07-14T12-38-21-04-00`  
**Status:** `checked-out-provider-build-browser-identity-authority-audited`

## Plan ledger

**Goal:** make the real-provider test, Vite bundle, browser host and deployed frame cite one immutable product/provider identity.

### Gate 1: immutable source admission

- [ ] Checkout TheOpenAbove at `${{ github.sha }}` or another explicitly admitted immutable revision.
- [ ] Replace NexusEngine `ref: main` selection with an exact revision resolved from a checked-in provider policy.
- [ ] Record workflow run, attempt, product SHA, provider policy revision and provider SHA.
- [ ] Reject event/checkout drift before tests run.

### Gate 2: local provider setup

- [ ] Add a checked-in setup/preflight command for `.nexus-engine`.
- [ ] Return typed `MissingCheckout`, `WrongRevision` and `ProviderUnavailable` results.
- [ ] Prevent `local-main` from qualifying as a release identity.
- [ ] Keep development override explicit and visibly non-releasable.

### Gate 3: byte and dependency identity

- [ ] Hash `.nexus-engine/src/index.js` and any required provider manifest.
- [ ] Add and enforce a package lock.
- [ ] Replace `npm install` with lock-governed installation.
- [ ] Record dependency and build-policy fingerprints.

### Gate 4: contract and bundle proof

- [ ] Preserve the real-provider World Features/Foundation test.
- [ ] Bind the test receipt to the exact product/provider pair.
- [ ] Add a Vite bundle fixture proving `@nexus-engine` resolves to the accepted checkout.
- [ ] Inspect emitted bundle identity and fail mixed-provider artifacts.

### Gate 5: artifact identity

- [ ] Generate `dist/product-build-identity.json`.
- [ ] Record product SHA, provider SHA, provider entry hash, dependency fingerprint and bundle file hashes.
- [ ] Bind upload and deployment identities to the manifest hash.

### Gate 6: browser and frame admission

- [ ] Open the built artifact and deployed origin in a browser.
- [ ] Require `GameHost.nexusEngineSha` to match the manifest.
- [ ] Require Core World feature/foundation APIs and `northern-wall` registration.
- [ ] Capture renderer generation, frame ID and image hash.
- [ ] Publish `FirstBuildIdentityFrameAck`.

### Gate 7: parity and retirement

- [ ] Compare source, local build, workflow artifact and Pages identities.
- [ ] Reject stale/superseded candidates.
- [ ] Retain test, bundle, artifact, deployment and browser receipts.
- [ ] Preserve route-runtime retirement and rollback requirements.

## Recommended file cut

```txt
scripts/provider/
  resolve-provider-revision.mjs
  prepare-provider-checkout.mjs
  create-build-identity-manifest.mjs
  verify-build-identity-browser.mjs

src/provider-build/
  checked-out-provider-build-browser-identity-authority-domain.js
  provider-build-identity-result-kit.js
  first-build-identity-frame-ack-kit.js
```

## Compatibility constraints

Preserve the checked-out real-provider test, Vite bundling path, current Core World composition, gameplay, presentation and Pages URL projection. Add admission and evidence around them rather than moving gameplay ownership into CI.

## Retained next steps

Route retirement, startup rollback, WebGL cleanup, provider capability contracts, world/foundation adoption, grass publication, Air Mail completion, persistence and deployed-origin proof remain open.

## Do not claim

Do not claim reproducible provider selection, browser/provider equality, bundle provenance, deployed-frame identity or production readiness until the full identity matrix passes.