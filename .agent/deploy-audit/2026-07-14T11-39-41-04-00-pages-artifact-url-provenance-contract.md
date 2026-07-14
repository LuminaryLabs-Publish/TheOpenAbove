# Deploy Audit: Pages Artifact and URL Provenance Contract

**Timestamp:** `2026-07-14T11-39-41-04-00`

## Plan ledger

**Goal:** make the GitHub Pages environment URL a projection of an accepted deployment result whose source, provider, artifact and public content are independently verifiable.

- [x] Inspect checkout, validation, build, upload, deploy and environment URL steps.
- [x] Record mutable-reference and missing-manifest risks.
- [x] Define the deployment evidence contract.
- [ ] Add workflow implementation and executable post-deploy proof.

## Current workflow facts

```txt
product checkout ref: main
NexusEngine checkout ref: main
Node: 24
install: npm install
proof: headless status, inspect, renderer, world and smoke
build: headless production build
artifact path: dist
Pages deploy action: actions/deploy-pages@v5
environment URL: steps.deployment.outputs.page_url
post-deploy verification: absent
artifact content manifest: absent
```

## Required artifact manifest

```json
{
  "schemaVersion": 1,
  "workflowRunId": "...",
  "productRevision": "...",
  "nexusEngineRevision": "...",
  "dependencyLockFingerprint": "...",
  "buildPolicyRevision": "...",
  "files": [
    {"path": "index.html", "size": 0, "sha256": "..."}
  ],
  "manifestSha256": "..."
}
```

The manifest must be created before upload, included in the artifact and retained with the deployment result.

## Required workflow changes

```txt
checkout product at github.sha or an explicitly admitted revision
resolve and record the exact NexusEngine commit before checkout
use lockfile-governed installation
emit immutable headless proof results
hash dist and write deployment-manifest.json
capture artifact and deployment identities
publish environment URL from the accepted deployment result
perform bounded HTTP checks with retry
run a browser proof against the returned PageUrl
bind the first matching Air Mail frame to the deployment manifest
retain logs, manifest and browser evidence
```

## Failure matrix

```txt
branch moved before checkout -> reject MutableSource
provider moved before checkout -> reject MutableProvider
headless proof failed -> reject BuildAdmission
artifact hash mismatch -> reject ArtifactPublication
Pages deploy failed -> reject Deployment
URL missing or malformed -> reject UrlPublication
wrong content at URL -> reject WrongArtifact
fatal boot or no frame -> reject PublicRuntime
superseded run -> classify Superseded, do not promote readiness
```

## Validation gate

No deployment-readiness claim is valid until source, built artifact and deployed origin produce matching manifest identities and one accepted visible frame.
