# Render Audit: Deployed Route Visible-Frame Gap

**Timestamp:** `2026-07-14T11-39-41-04-00`

## Plan ledger

**Goal:** require the published Pages URL to prove one exact deployed Air Mail frame rather than only exposing a deployment link.

- [x] Identify the deployment-to-render boundary.
- [x] Identify current render and diagnostic surfaces.
- [x] Separate URL publication from frame admission.
- [ ] Add deployed browser and frame fixtures.

## Current boundary

The publish job returns `page_url` and GitHub displays it on the environment. No workflow step opens that URL. The deployment therefore has no accepted evidence for:

```txt
HTTP reachability
correct base path
expected HTML identity
module/import success
WebGL renderer creation
Core World composition
balloon creation
GameHost publication
first non-blank frame
Air Mail route visibility
fatal-panel absence
```

## Required frame receipt

```txt
FirstDeployedAirMailFrameAck
  deploymentId
  artifactId
  pageUrl
  routeFingerprint
  gameHostGeneration
  rendererFrameId
  viewport
  devicePixelRatio
  screenshotHash
  visibleStateHash
```

The acknowledgement must be emitted from the same browser page and renderer generation used for the captured deployed frame.

## Required checks

```txt
status 200 and expected content type
expected repository/build manifest reachable
no fatal startup panel
canvas leaves aria-busy
GameHost identifies accepted deployment
renderer presents a non-empty frame
balloon and world revisions match the manifest
screenshot and state evidence share one frame identity
```

## Retained rendering gaps

Route-runtime retirement, WebGL resource disposal, stale callback rejection and same-document re-entry remain open. Deployment frame proof does not replace lifecycle proof.
