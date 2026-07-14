# Next Steps: TheOpenAbove Pages Deployment URL Publication

**Last aligned:** `2026-07-14T11-39-41-04-00`  
**Status:** `pages-deployment-url-artifact-publication-authority-audited`

## Plan ledger

**Goal:** make every public Pages link traceable to immutable source, a hashed artifact, an accepted deployment and a matching browser frame.

### Gate 1: immutable workflow inputs

- [ ] Checkout TheOpenAbove at `${{ github.sha }}` or an explicitly admitted revision.
- [ ] Resolve and record the exact NexusEngine commit before checkout.
- [ ] Bind `WorkflowRunId`, product revision and provider revision.
- [ ] Use lockfile-governed dependency installation and record its fingerprint.

### Gate 2: typed build proof

- [ ] Publish structured results for headless status, inspection, renderer, world and smoke checks.
- [ ] Bind each result to the same source/provider pair.
- [ ] Fail stale or mixed-revision work before artifact creation.

### Gate 3: artifact manifest

- [ ] Generate `dist/deployment-manifest.json`.
- [ ] Record product revision, NexusEngine revision, lockfile fingerprint and build policy.
- [ ] Record every deployed file path, byte size and SHA-256 hash.
- [ ] Hash the manifest and retain it with artifact metadata.

### Gate 4: deployment settlement

- [ ] Capture the uploaded artifact identity.
- [ ] Capture the Pages deployment identity.
- [ ] Publish `PageUrl` only from the accepted deployment result.
- [ ] Classify failed, cancelled, superseded and timed-out deployments.

### Gate 5: public-origin proof

- [ ] Fetch the returned URL with bounded retry.
- [ ] Validate HTTP status, content type, base path and manifest identity.
- [ ] Open one browser page against the deployed origin.
- [ ] Require no fatal panel and require canvas readiness.
- [ ] Admit the deployed `GameHost` generation.
- [ ] Capture one matching Air Mail renderer frame and screenshot hash.
- [ ] Publish `FirstDeployedAirMailFrameAck`.

### Gate 6: parity and retention

- [ ] Compare source, built and deployed manifest identities.
- [ ] Retain artifact manifest, workflow results, deployment result and browser evidence.
- [ ] Ensure superseded runs cannot promote public readiness.
- [ ] Add a central ledger receipt for the accepted deployment.

## Recommended file cut

```txt
scripts/deployment/
  create-deployment-manifest.mjs
  verify-pages-origin.mjs
  verify-pages-browser.mjs

src/deployment/
  pages-deployment-url-artifact-publication-authority-domain.js
  pages-deployment-result-kit.js
  deployed-route-admission-kit.js
  first-deployed-airmail-frame-ack-kit.js
```

## Compatibility constraints

Preserve current gameplay, provider pin used by the product, Core World composition, world generation, Air Mail behavior, visual quality and environment URL projection. Add immutable admission and evidence around the existing workflow rather than moving gameplay ownership into deployment tooling.

## Retained next steps

Route runtime retirement, failure rollback, WebGL cleanup, re-entry, provider contract proof, feature registration, world/foundation revision adoption, grass publication, Air Mail completion and persistence remain open.

## Do not claim

Do not claim exact deployment identity, artifact integrity, deployed-origin readiness, visible-frame equivalence or production readiness until the full source/build/Pages matrix passes on `main`.
