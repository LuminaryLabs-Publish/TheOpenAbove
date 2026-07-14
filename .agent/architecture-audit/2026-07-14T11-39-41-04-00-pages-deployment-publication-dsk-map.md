# Architecture Audit: Pages Deployment URL Publication DSK Map

**Timestamp:** `2026-07-14T11-39-41-04-00`  
**Status:** `pages-deployment-url-artifact-publication-authority-audited`

## Plan ledger

**Goal:** preserve current deployment mechanics while adding one parent authority that binds immutable inputs, artifact identity, deployment identity, public URL and visible-frame evidence.

- [x] Map current workflow participants.
- [x] Separate GitHub environment URL projection from deployment proof.
- [x] Preserve existing build, headless proof and Pages adapters.
- [x] Define missing command, result and receipt surfaces.
- [ ] Implement and execute the domain.

## Current architecture

```txt
push event
  -> checkout product main
  -> checkout NexusEngine main
  -> install dependencies
  -> headless checks
  -> production build
  -> upload dist
  -> deploy artifact
  -> project page_url into github-pages environment
```

Current participants are coordinated by workflow ordering only. They do not publish a shared immutable deployment identity.

## Required parent domain

```txt
open-above-pages-deployment-url-artifact-publication-authority-domain
```

## Required command and result surfaces

```txt
PagesDeploymentCommand
  ProductRevision
  NexusEngineRevision
  DependencyLockFingerprint
  BuildPolicyRevision
  WorkflowRunId

PagesArtifactManifest
  ArtifactId
  source revisions
  build command revision
  file paths, sizes and hashes

PagesDeploymentResult
  DeploymentId
  ArtifactId
  canonical PageUrl
  deployment status
  failure classification

DeployedRouteAdmissionResult
  HTTP result
  route fingerprint
  GameHost generation
  renderer frame identity
  screenshot/content fingerprints

FirstDeployedAirMailFrameAck
  DeploymentId
  PageUrl
  GameHost generation
  renderer frame ID
```

## Dependency order

```txt
immutable source admission
  -> dependency and build-policy admission
  -> headless proof
  -> build artifact manifest
  -> artifact upload result
  -> deployment result
  -> environment URL publication
  -> HTTP and route admission
  -> GameHost admission
  -> renderer-frame acknowledgement
  -> source/build/Pages parity result
```

## Existing kits retained

The existing `open-above-pages-deploy-kit`, headless proof kits, route shell, import map, runtime composer, CDN adapter, GameHost readback and render stack remain semantic participants. The new parent authority coordinates them without moving product gameplay or Core World ownership into the deployment domain.

## Boundary

A visible environment URL is an output projection. It must not become the source of truth for source revision, artifact identity, deployment success or runtime readiness.
