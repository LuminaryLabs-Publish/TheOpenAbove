# Known Gaps: TheOpenAbove Pages Deployment URL Publication

**Last aligned:** `2026-07-14T11-39-41-04-00`  
**Status:** `pages-deployment-url-artifact-publication-authority-audited`

## Summary

The deployment URL is now visible in GitHub, but source identity, provider identity, artifact contents, deployment settlement, public-route admission and the first visible frame are not bound into one evidence chain.

## Plan ledger

**Goal:** keep deployment gaps dependency ordered and prevent a clickable URL from being promoted into readiness evidence.

- [ ] Immutable product checkout.
- [ ] Immutable NexusEngine checkout.
- [ ] Lockfile and build-policy fingerprints.
- [ ] Typed headless proof results.
- [ ] Hashed artifact manifest.
- [ ] Artifact and deployment identities.
- [ ] HTTP and route-content admission.
- [ ] Deployed GameHost and renderer-frame admission.
- [ ] Source/build/Pages parity.
- [ ] Evidence retention and supersession policy.

## Identity gaps

```txt
WorkflowRunId in product evidence: absent
trigger ProductRevision binding: absent from artifact
resolved NexusEngineRevision: absent from artifact
DependencyLockFingerprint: absent
BuildPolicyRevision: absent
ArtifactId in repo evidence: absent
ArtifactManifestHash: absent
DeploymentId in repo evidence: absent
PageUrlPublicationResult: absent
```

## Checkout gaps

```txt
product checkout ref: mutable main
provider checkout ref: mutable main
mixed-revision detection: absent
branch-moved classification: absent
provider-moved classification: absent
```

## Artifact gaps

```txt
deployment-manifest.json: absent
deployed file list: absent
file byte sizes: absent
file SHA-256 hashes: absent
manifest hash: absent
artifact/source equivalence receipt: absent
```

## Deployment gaps

```txt
environment URL projection: present
typed deployment result: absent
failed/cancelled/superseded classification: workflow-native only
accepted deployment journal: absent
artifact retention receipt: absent
```

## Public-origin gaps

```txt
post-deploy HTTP request: absent
status/content-type admission: absent
base-path validation: absent
manifest fetch and comparison: absent
browser boot against PageUrl: absent
fatal-panel assertion: absent
GameHost admission: absent
renderer-frame identity: absent
FirstDeployedAirMailFrameAck: absent
```

## Status and workflow evidence gaps

```txt
combined commit statuses observed: empty
workflow run accepted by this audit: no
job logs inspected: no
artifact downloaded: no
PageUrl fetched: no
browser fixture run: no
```

The empty combined-status surface is not treated as proof of failure or success.

## Dependency order

```txt
immutable revisions
  -> dependency/build fingerprints
  -> typed headless proof
  -> hashed artifact manifest
  -> artifact upload result
  -> deployment result
  -> PageUrl publication
  -> HTTP/content admission
  -> GameHost/frame admission
  -> source/build/Pages parity
```

## Retained gaps

Route retirement, startup rollback, stale callback rejection, renderer cleanup, provider contract proof, Core World revision adoption, grass publication, Air Mail completion and flight persistence remain open.

## Do not claim

Do not treat `environment.url` as evidence that the reviewed source was built, the intended artifact was deployed, the public route is reachable, or the game rendered correctly.
