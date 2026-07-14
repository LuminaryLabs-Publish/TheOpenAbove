# Interaction Audit: Pages URL Publication Result Map

**Timestamp:** `2026-07-14T11-39-41-04-00`

## Plan ledger

**Goal:** replace implicit workflow success with typed results for build, artifact, deployment, URL publication and public-route admission.

- [x] Map existing workflow transitions.
- [x] Identify missing identities and terminal results.
- [x] Define accepted, failed and stale outcomes.
- [ ] Implement result publication and fixtures.

## Current result map

```txt
checkout/install/check/build failure
  -> workflow step failure only

artifact upload
  -> action output not persisted in a product evidence manifest

deployment
  -> deploy action result
  -> page_url projected to environment

public route
  -> no command
  -> no result
  -> no frame acknowledgement
```

## Required typed results

```txt
SourceAdmissionResult
  Accepted | Missing | Mutable | Stale | Failed

HeadlessProofResult
  Accepted | Failed | TimedOut | Stale

ArtifactPublicationResult
  Accepted | HashMismatch | Missing | Failed

PagesDeploymentResult
  Deployed | Failed | Cancelled | Superseded | TimedOut

PageUrlPublicationResult
  Published | Missing | Invalid | Stale

DeployedRouteAdmissionResult
  Ready | WrongArtifact | Unreachable | BootFailed | RenderFailed | TimedOut
```

## Identity map

Every result must bind the same:

```txt
WorkflowRunId
ProductRevision
NexusEngineRevision
DependencyLockFingerprint
BuildPolicyRevision
ArtifactId
ArtifactManifestHash
DeploymentId
PageUrl
```

The browser result additionally binds `GameHostGeneration` and `RendererFrameId`.

## Failure handling

A failed or superseded deployment must not update accepted public readiness. A URL can remain navigable while being rejected as stale or wrong-artifact evidence.
