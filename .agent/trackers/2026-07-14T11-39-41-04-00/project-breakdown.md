# Project Breakdown: TheOpenAbove Pages URL Publication Evidence

**Timestamp:** `2026-07-14T11-39-41-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`  
**Branch:** `main`  
**Reviewed pre-audit head:** `18307d0c07d525467f0357fb5110856d04f1265c`  
**Runtime revision retained:** `09bb6b95549d9480dfc2caa4517575ab4009ba98`  
**Nexus Engine provider retained:** `ea973811342fe3ba2a35bb018323d987d3fec4b5`  
**Status:** `pages-deployment-url-artifact-publication-authority-audited`

## Summary

The new workflow line publishes `steps.deployment.outputs.page_url` as the `github-pages` environment URL. This improves the GitHub deployment surface by exposing a clickable link, but it does not prove which product commit, Nexus Engine commit, dependency graph, uploaded artifact, deployed release or visible browser frame the URL represents.

The workflow checks out both TheOpenAbove and NexusEngine from mutable `main` refs. A workflow triggered by one commit can therefore build a later branch state if either branch advances before checkout. The uploaded `dist` artifact has no checked-in manifest containing source revisions and file hashes, and the publish job performs no HTTP, content, browser or first-frame verification after deployment.

## Plan ledger

**Goal:** bind one immutable source/provider pair to one build artifact, one Pages deployment result, one published URL and one matching visible Air Mail frame.

- [x] Enumerate all 11 current `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm all ten eligible repositories have central ledger entries and root `.agent` state.
- [x] Compare every eligible `main` head with its recorded repo-local documentation head.
- [x] Select only `LuminaryLabs-Publish/TheOpenAbove`, the sole runtime-ahead repository.
- [x] Inspect commit `18307d0c07d525467f0357fb5110856d04f1265c` and `.github/workflows/deploy-pages.yml`.
- [x] Identify the complete source-to-Pages-to-gameplay interaction loop.
- [x] Preserve all 100 active kit, adapter and Core World surfaces and offered services.
- [x] Define Pages deployment URL and artifact publication authority.
- [x] Add a timestamped tracker, turn ledger and focused audit family.
- [x] Change documentation only.
- [ ] Implement immutable checkout, artifact manifest, deployment settlement and deployed-frame fixtures.

## Selection comparison

```txt
accessible Publish repositories: 11
eligible non-Cavalry repositories: 10
central ledger entries: 10
root .agent states: 10
new eligible repositories: 0
central-ledger-missing repositories: 0
root-agent-missing repositories: 0
runtime-ahead repositories: 1
selected: LuminaryLabs-Publish/TheOpenAbove
selection reason: only eligible repository ahead of its recorded documentation head
excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

The sole ahead commit was:

```txt
18307d0c07d525467f0357fb5110856d04f1265c
fix(pages): expose deployed site URL
.github/workflows/deploy-pages.yml +1
```

## Complete interaction loop

```txt
source publication
  -> push a commit to main
  -> GitHub creates a workflow run for that event

build admission
  -> checkout TheOpenAbove using ref: main
  -> checkout LuminaryLabs-Dev/NexusEngine using ref: main
  -> setup Node 24
  -> npm install
  -> run headless status, inspect, renderer, world and smoke checks
  -> run headless production build
  -> add dist/.nojekyll
  -> upload dist as the Pages artifact

publish
  -> deploy the uploaded Pages artifact
  -> expose deployment output page_url on the github-pages environment
  -> publish no immutable source/provider/artifact manifest
  -> run no post-deploy HTTP or browser verification

public interaction
  -> user opens the environment URL
  -> browser imports Three.js and the pinned product provider
  -> compose Core World and authored landforms
  -> create WebGL world, balloon, airstreams, Air Mail and map
  -> publish GameHost
  -> start the perpetual Air Mail frame loop

proof boundary
  -> environment URL proves link projection only
  -> it does not prove exact source identity, artifact identity, deployed content or first visible frame
```

## Domains in use

```txt
GitHub push, workflow-run and deployment-environment identity
mutable and immutable Git reference admission
product and NexusEngine source checkout
Node, npm and dependency installation
headless editor status, inspection, renderer, world and smoke validation
Vite production build and dist ownership
Pages configuration, artifact upload and deployment
Pages environment URL projection
artifact manifest, hashes and deployment settlement
HTTP route, content fingerprint and browser visible-frame verification
browser ESM, DOM, canvas, accessibility and fatal-error projection
Nexus Engine runtime, telemetry and Core World composition
balloon simulation, Air Mail, airstreams, world generation and map interaction
Three.js/WebGL/HDR presentation
route lifecycle and resource retirement
central ledger and repo-local audit governance
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

### Runtime and gameplay kits

```txt
open-above-balloon-simulation-kit
  balloon state integration, keyboard admission, terrain clearance, snapshots and listener disposal
open-above-balloon-telemetry-kit
  Core composition, telemetry resources/events/readback and feature registration
open-above-airstream-domain
  airstream aggregate lifecycle, state projection, visual/debug update and disposal
open-above-airstream-route-kit
  authored airstream route descriptors
open-above-airstream-sampler-kit
  deterministic route and field sampling
open-above-airstream-field-kit
  world-space flow-field evaluation
open-above-airstream-balloon-force-kit
  sampled flow application to balloon motion
open-above-airstream-visual-kit
  airstream presentation
open-above-airstream-debug-kit
  airstream diagnostics
open-above-mail-delivery-domain
  Air Mail aggregate lifecycle and state
open-above-mail-parcel-kit
  parcel state and ownership
open-above-mail-route-kit
  route descriptors and progression
open-above-delivery-volume-kit
  delivery-volume sampling
open-above-delivery-progress-kit
  completion and progress projection
open-above-mail-town-kit
  town descriptors, presentation and disposal
```

### Balloon object and presentation kits

```txt
open-above-hot-air-balloon-object-kit
  complete procedural balloon composition
open-above-balloon-envelope-profile-kit
  envelope shape profile
open-above-balloon-envelope-panel-kit
  envelope panel geometry
open-above-balloon-mouth-kit
  mouth geometry
open-above-balloon-streamer-fit-kit
  streamer placement and fitting
open-above-balloon-fabric-seam-kit
  fabric seam presentation
open-above-hot-air-balloon-basket-kit
  basket construction
open-above-hot-air-balloon-rigging-kit
  basket-envelope rigging
open-above-hot-air-balloon-burner-kit
  burner geometry and animation
open-above-rope-kit
  rope construction and motion
open-above-balloon-presentation-domain
  aggregate balloon presentation
open-above-envelope-fabric-material-kit
  envelope material
open-above-basket-material-kit
  basket material
open-above-balloon-camera-rig-kit
  balloon-relative camera control
open-above-clipping-fade-kit
  near-camera clipping fade
```

### Visual world and environment kits

```txt
open-above-visual-domain
  renderer, scene, camera, update, render, resize and partial disposal
open-above-world-generation-kit
  deterministic staged world generation
open-above-world-feature-foundation-kit
  Core World feature/foundation bridge
open-above-quality-tier-kit
  quality selection
open-above-dynamic-resolution-kit
  frame-time resolution adaptation
open-above-physical-sky-kit
  physical sky presentation
open-above-sun-light-kit
  sun lighting
open-above-aerial-perspective-kit
  distance atmosphere
open-above-cloud-weather-map-kit
  cloud weather field
open-above-volumetric-cloud-kit
  volumetric cloud presentation
open-above-cloud-lod-kit
  cloud LOD
open-above-cloud-lighting-kit
  cloud lighting
open-above-terrain-surface-kit
  terrain surface and sampling
open-above-terrain-streaming-contract-kit
  terrain-streaming interface
open-above-terrain-chunk-streaming-kit
  nearby terrain chunk ownership
open-above-terrain-horizon-streaming-kit
  distant terrain horizon ownership
open-above-vegetation-cluster-kit
  vegetation cluster placement
open-above-grass-world-seed-kit
  deterministic grass seed
open-above-grass-biome-density-kit
  biome density
open-above-grass-exclusion-mask-kit
  exclusion masks
open-above-grass-patch-density-kit
  patch density
open-above-grass-texture-atlas-kit
  grass atlas generation
open-above-grass-chunk-placement-kit
  chunk grass placement
open-above-grass-lod-kit
  grass LOD
open-above-grass-compute-culling-kit
  grass visibility culling
open-above-grass-field-domain
  aggregate grass update and disposal
open-above-flower-chunk-placement-kit
  flower placement
open-above-flower-texture-atlas-kit
  flower atlas generation
open-above-flower-field-domain
  aggregate flower update and disposal
open-above-water-surface-kit
  water presentation
open-above-distant-landmark-kit
  distant landmark presentation
open-above-hdr-composer-kit
  HDR post-processing
open-above-color-grade-kit
  color grading
open-above-lens-response-kit
  lens response
```

### UI, host, tooling and deployment surfaces

```txt
open-above-parchment-map-overlay-kit
  map drawing, interaction, ResizeObserver, private RAF and disposal
open-above-route-shell-kit
  document and route hosting
open-above-importmap-kit
  browser module resolution
open-above-runtime-composer-kit
  product runtime composition
open-above-keyboard-input-kit
  keyboard adapter
open-above-wheel-zoom-input-kit
  wheel zoom adapter
open-above-parchment-map-shell-kit
  map DOM shell
open-above-error-panel-kit
  fatal-error projection
open-above-gamehost-legacy-readback-kit
  public runtime diagnostics
open-above-nexusengine-cdn-adapter-kit
  immutable provider import adapter
open-above-campaign-source-kit
  route and campaign source
open-above-raf-clock-adapter-kit
  browser frame timing
open-above-pages-deploy-kit
  build, artifact upload, deployment and environment URL projection
open-above-headless-editor-environment
  headless editor admission
open-above-static-smoke-test-kit
  source smoke checks
open-above-airstream-mail-test-kit
  deterministic airstream and mail fixtures
open-above-world-flora-test-kit
  world and flora fixtures
open-above-world-feature-foundation-test-kit
  foundation bridge fixture
open-above-world-domain-composition-test-kit
  Core World composition fixture
```

### Pinned Core World surfaces

```txt
n-world-domain
  root world definition and runtime building
world-builder-runtime-kit
  world runtime construction
n-world-foundation-domain
  foundation aggregate
foundation-definition-kit
  foundation descriptors
foundation-composition-kit
  foundation composition
foundation-sampling-kit
  foundation sampling
foundation-cell-resolution-kit
  foundation cell resolution
n-world-feature-domain
  feature aggregate
feature-registry-kit
  feature registration
feature-lifecycle-kit
  feature lifecycle
feature-query-kit
  feature queries
feature-composition-kit
  feature composition
n-world-landform-feature-domain
  landform aggregate
mountain-feature-kit
  mountain descriptor
canyon-feature-kit
  canyon descriptor
cliff-feature-kit
  cliff descriptor
plateau-feature-kit
  plateau descriptor
```

## Source-backed findings

### The environment URL is projection, not proof

`environment.url` now reads from `steps.deployment.outputs.page_url`. GitHub can display the deployed link, but the line does not verify that the URL is reachable, that it serves the intended artifact, or that the Air Mail route reaches a valid frame.

### Product checkout is mutable

The workflow checks out TheOpenAbove using `ref: main` instead of the triggering commit identity. A branch advance between event creation and checkout can change the built source while the workflow remains associated with the older triggering event.

### Provider checkout is mutable

The headless editor checkout uses `LuminaryLabs-Dev/NexusEngine` at `ref: main`. The validation toolchain can therefore change independently of the product commit and without a recorded provider SHA in deployment evidence.

### Artifact identity is absent

The workflow uploads `dist` but produces no source-controlled manifest containing product SHA, NexusEngine SHA, dependency-lock fingerprint, build-command revision, file list, file hashes, artifact identifier or expected public-route fingerprint.

### Publish has no settlement verification

The publish job ends after `actions/deploy-pages@v5`. It does not fetch the URL, validate status and content type, verify an expected asset hash, boot a browser, inspect `GameHost`, or acknowledge the first matching visible frame.

### Combined commit statuses are empty

The reviewed commit exposed no combined status records through the available commit-status surface. This does not prove workflow failure or success; it means the audit has no accepted run/job/artifact result to cite.

## Required authority

```txt
open-above-pages-deployment-url-artifact-publication-authority-domain
```

```txt
PagesDeploymentCommand
  -> bind WorkflowRunId, triggering ProductRevision and immutable NexusEngineRevision
  -> checkout the exact accepted revisions
  -> bind lockfile and build-policy fingerprints
  -> execute declared headless validation and production build
  -> create ArtifactManifest with path, size and content hashes
  -> upload one artifact and bind ArtifactId
  -> deploy that artifact and bind DeploymentId
  -> accept canonical PageUrl from the deployment result
  -> verify HTTP status, route identity and expected content fingerprints
  -> boot one browser page from PageUrl
  -> admit GameHost and one renderer frame for the same deployment
  -> publish FirstDeployedAirMailFrameAck
  -> publish PagesDeploymentResult
```

## Planned coordinating surfaces

```txt
open-above-pages-deployment-url-artifact-publication-authority-domain
open-above-workflow-run-identity-kit
open-above-trigger-product-revision-kit
open-above-immutable-product-checkout-kit
open-above-immutable-nexusengine-checkout-kit
open-above-dependency-lock-fingerprint-kit
open-above-build-policy-revision-kit
open-above-headless-proof-result-kit
open-above-pages-artifact-manifest-kit
open-above-pages-artifact-hash-kit
open-above-pages-artifact-upload-result-kit
open-above-pages-deployment-command-kit
open-above-pages-deployment-result-kit
open-above-pages-environment-url-publication-kit
open-above-pages-http-admission-kit
open-above-pages-route-content-fingerprint-kit
open-above-deployed-gamehost-admission-kit
open-above-deployed-renderer-frame-admission-kit
open-above-first-deployed-airmail-frame-ack-kit
open-above-deployment-failure-classification-kit
open-above-deployment-artifact-retention-kit
open-above-source-build-pages-parity-kit
```

## Validation boundary

Documentation only. The workflow and commit were inspected. No workflow was rerun, no workflow run or job log was accepted, no artifact was downloaded, no Page URL was fetched, no browser was launched, and no source/build/Pages parity claim was made.
