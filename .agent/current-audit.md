# Current Audit: TheOpenAbove Pages Deployment URL Publication

**Last aligned:** `2026-07-14T11-39-41-04-00`  
**Status:** `pages-deployment-url-artifact-publication-authority-audited`  
**Reviewed pre-audit head:** `18307d0c07d525467f0357fb5110856d04f1265c`  
**Runtime revision retained:** `09bb6b95549d9480dfc2caa4517575ab4009ba98`  
**Nexus Engine provider retained:** `ea973811342fe3ba2a35bb018323d987d3fec4b5`

## Summary

The workflow now projects the Pages deployment output URL into the `github-pages` environment. The link is useful, but it is not an immutable deployment receipt. Product and NexusEngine checkouts still use mutable `main`, the uploaded `dist` tree has no retained content manifest, and the publish job runs no post-deploy route or browser proof.

## Plan ledger

**Goal:** turn URL publication into the final projection of an accepted source-to-artifact-to-deployment transaction.

- [x] Compare the full Publish inventory with central tracking.
- [x] Exclude TheCavalryOfRome.
- [x] Select only TheOpenAbove as the sole current-head mismatch.
- [x] Inspect the ahead commit and complete Pages workflow.
- [x] Preserve the complete 100-surface kit/service census.
- [x] Define parent authority, results and evidence gates.
- [x] Change documentation only.
- [ ] Implement and execute immutable deployment proof.

## Selection comparison

```txt
accessible Publish repositories: 11
eligible non-Cavalry repositories: 10
central ledger entries: 10
root .agent states: 10
new repositories: 0
ledger missing: 0
root .agent missing: 0
runtime ahead: 1
selected: LuminaryLabs-Publish/TheOpenAbove
```

## Complete interaction loop

```txt
push main
  -> workflow checks out product main
  -> workflow checks out NexusEngine main
  -> npm install and headless checks
  -> production build to dist
  -> upload Pages artifact
  -> deploy artifact
  -> expose deployment page_url

open page_url
  -> boot browser route
  -> compose Core World and authored features
  -> create WebGL world and balloon
  -> create airstream, Air Mail and map domains
  -> publish GameHost
  -> render and admit player interaction

current proof boundary
  -> no immutable source/provider binding
  -> no artifact manifest or hashes
  -> no post-deploy HTTP/content admission
  -> no deployed GameHost or frame acknowledgement
```

## Domains in use

```txt
GitHub workflow and deployment environment
source and provider revision admission
Node/npm dependency and build admission
headless proof and Vite build
artifact manifest, upload and deployment
Page URL publication and HTTP route admission
browser GameHost and visible-frame evidence
Nexus Engine Core World, simulation, Air Mail, airstream, map and WebGL presentation
route lifecycle and resource retirement
repo-local and central audit governance
```

## Kit and service census

```txt
local source-backed kits:          71
runtime-implied adapters:          12
pinned Core World surfaces:        17
current documented active total:  100
inactive or retired legacy:        12
planned Pages authority surfaces:  22
```

The complete kit-by-kit service inventory is in `.agent/trackers/2026-07-14T11-39-41-04-00/project-breakdown.md` and `.agent/kit-registry.json`.

## Source-backed findings

### Environment URL projection now exists

The publish job assigns `steps.deployment.outputs.page_url` to the `github-pages` environment URL.

### Product and provider admission remain mutable

Both checkouts use `ref: main`. The workflow-run event identity does not by itself prove the exact source and validation-provider commits that were checked out.

### Artifact identity is incomplete

`dist` is uploaded without a product evidence manifest containing exact source revisions, lockfile fingerprint, build policy, file sizes and content hashes.

### Deployed-route proof is absent

No publish step fetches the returned URL, validates the served artifact, opens a browser, admits `GameHost`, or acknowledges a renderer frame.

### Status evidence is incomplete

The inspected commit exposed no combined status records through the available commit-status surface. No success or failure inference is made from that absence.

## Required parent domain

```txt
open-above-pages-deployment-url-artifact-publication-authority-domain
```

## Required transaction

```txt
PagesDeploymentCommand
  -> bind workflow run and immutable product/provider revisions
  -> bind lockfile and build-policy fingerprints
  -> execute headless proof and build
  -> create and hash ArtifactManifest
  -> upload and bind ArtifactId
  -> deploy and bind DeploymentId
  -> publish canonical PageUrl
  -> verify HTTP and route fingerprints
  -> admit GameHost and one deployed renderer frame
  -> publish FirstDeployedAirMailFrameAck
  -> publish PagesDeploymentResult
```

## Validation boundary

Documentation only. No workflow rerun, job-log inspection, artifact download, URL fetch, browser launch, build execution or Pages frame proof was performed.
