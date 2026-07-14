# START HERE: TheOpenAbove Checked-out Provider Build Identity

**Last aligned:** `2026-07-14T12-38-21-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`  
**Branch:** `main`  
**Reviewed pre-audit head:** `0d9ea6f6f977b63d09f22f8ae36107bfccd81811`  
**Status:** `checked-out-provider-build-browser-identity-authority-audited`

## Summary

The Node composition test and Vite browser build now consume the same checked-out NexusEngine source. CI records the checkout SHA and the browser exposes it through `GameHost.nexusEngineSha`. Provider selection is still mutable, local setup is implicit, and no byte fingerprint, artifact manifest or visible-frame acknowledgement proves that the reported SHA produced the deployed experience.

## Plan ledger

**Goal:** bind exact product/provider revisions, provider bytes, bundle identity, browser host state and one visible Air Mail frame.

- [x] Compare all 11 Publish repositories and ten eligible central ledgers.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only TheOpenAbove as the sole runtime-ahead repository.
- [x] Inspect four ahead commits and four changed files.
- [x] Reconcile the complete interaction loop, domains, services and 101 active surfaces.
- [x] Add the `2026-07-14T12-38-21-04-00` audit family.
- [x] Push on `main`; create no branch or pull request.
- [ ] Implement immutable provider admission and executable browser/artifact proof.

## Read this pass first

```txt
.agent/trackers/2026-07-14T12-38-21-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-14T12-38-21-04-00.md
.agent/architecture-audit/2026-07-14T12-38-21-04-00-checked-out-provider-build-identity-dsk-map.md
.agent/render-audit/2026-07-14T12-38-21-04-00-provider-sha-visible-frame-gap.md
.agent/gameplay-audit/2026-07-14T12-38-21-04-00-provider-build-to-airmail-loop.md
.agent/interaction-audit/2026-07-14T12-38-21-04-00-provider-build-command-result-map.md
.agent/provider-build-audit/2026-07-14T12-38-21-04-00-provider-checkout-bundle-identity-contract.md
.agent/deploy-audit/2026-07-14T12-38-21-04-00-provider-build-identity-fixture-gate.md
.agent/central-sync-audit/2026-07-14T12-38-21-04-00-provider-build-runtime-reconciliation.md
```

## Main finding

```txt
improved
  -> real checked-out provider used by Node contract test
  -> same checkout bundled through Vite alias
  -> checkout SHA exposed by GameHost

still missing
  -> immutable product and provider selection
  -> provider entry and bundle hashes
  -> deterministic local provider setup
  -> release rejection for local-main
  -> browser identity admission and first matching frame
```

## Required parent domain

```txt
open-above-checked-out-provider-build-browser-identity-authority-domain
```

## Next safe ledge

Resolve both product and provider to exact revisions before checkout, hash the provider entry, add a local preflight/setup command, write a build identity manifest into `dist`, and require the browser to acknowledge one matching frame.

## Do not claim

Do not claim reproducible provider selection, bundle provenance, browser/provider identity, deployed-frame identity or production readiness from `GameHost.nexusEngineSha` alone.