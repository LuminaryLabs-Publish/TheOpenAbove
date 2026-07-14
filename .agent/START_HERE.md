# START HERE: TheOpenAbove Pages Deployment URL Publication

**Last aligned:** `2026-07-14T11-39-41-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`  
**Branch:** `main`  
**Reviewed pre-audit head:** `18307d0c07d525467f0357fb5110856d04f1265c`  
**Runtime revision retained:** `09bb6b95549d9480dfc2caa4517575ab4009ba98`  
**Nexus Engine provider retained:** `ea973811342fe3ba2a35bb018323d987d3fec4b5`  
**Status:** `pages-deployment-url-artifact-publication-authority-audited`

## Summary

The Pages workflow now exposes the deployed `page_url` on the `github-pages` environment. This creates the missing clickable deployment link, but the workflow still checks out mutable `main` refs, uploads `dist` without an immutable content manifest, and performs no HTTP or browser verification against the returned URL.

## Plan ledger

**Goal:** bind the public URL to one immutable product/provider pair, one hashed artifact, one deployment result and one matching Air Mail frame.

- [x] Compare all 11 Publish repositories with ten eligible central ledgers.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all ten eligible repositories have root `.agent` state.
- [x] Compare every eligible current head with its recorded documentation head.
- [x] Select only TheOpenAbove as the sole runtime-ahead repository.
- [x] Inspect the workflow commit and full Pages workflow.
- [x] Preserve the complete 100-surface kit/service census.
- [x] Add the `2026-07-14T11-39-41-04-00` audit family.
- [x] Use `main`; create no branch or pull request.
- [ ] Implement immutable source, artifact, deployment and deployed-frame proof.

## Read this pass first

```txt
.agent/trackers/2026-07-14T11-39-41-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-14T11-39-41-04-00.md
.agent/architecture-audit/2026-07-14T11-39-41-04-00-pages-deployment-publication-dsk-map.md
.agent/render-audit/2026-07-14T11-39-41-04-00-deployed-route-visible-frame-gap.md
.agent/gameplay-audit/2026-07-14T11-39-41-04-00-source-to-pages-airmail-loop.md
.agent/interaction-audit/2026-07-14T11-39-41-04-00-pages-url-publication-result-map.md
.agent/deploy-audit/2026-07-14T11-39-41-04-00-pages-artifact-url-provenance-contract.md
.agent/central-sync-audit/2026-07-14T11-39-41-04-00-pages-url-runtime-reconciliation.md
```

## Main finding

```txt
new capability
  -> GitHub environment displays deployment page_url

remaining evidence gap
  -> product checkout uses mutable main
  -> NexusEngine checkout uses mutable main
  -> artifact manifest and hashes are absent
  -> deployment and artifact IDs are not retained in product evidence
  -> PageUrl is not fetched after deployment
  -> no deployed GameHost or renderer frame is acknowledged
```

## Required parent domain

```txt
open-above-pages-deployment-url-artifact-publication-authority-domain
```

## Next safe ledge

Pin the workflow to the triggering product revision and an explicitly resolved NexusEngine revision, generate a hashed deployment manifest inside `dist`, retain artifact/deployment identities, verify the returned URL, and capture one matching deployed Air Mail frame.

## Retained audits

Route-runtime retirement, provider contracts, Core World composition, world generation, grass publication, map/world coherence, Air Mail completion and flight persistence remain valid and open.

## Do not claim

Do not claim exact deployed source identity, artifact integrity, public-route readiness, visible-frame proof, source/build/Pages parity or production readiness from the environment URL alone.
