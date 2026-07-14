# Project Breakdown: Checked-out NexusEngine Build and Browser Identity

**Timestamp:** `2026-07-14T12-38-21-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`  
**Reviewed pre-audit head:** `0d9ea6f6f977b63d09f22f8ae36107bfccd81811`  
**Status:** `checked-out-provider-build-browser-identity-authority-audited`

## Summary

Four runtime/build commits replace the pinned jsDelivr NexusEngine import with a Vite alias to `.nexus-engine/src/index.js`, record the checked-out NexusEngine SHA in CI, expose that value through `GameHost.nexusEngineSha`, and replace the fake-provider composition smoke with a real checked-out-provider contract test.

This materially improves test/build source convergence. It does not yet make provider selection reproducible: both product and provider are checked out from mutable `main`, local builds use the non-identity value `local-main`, no setup contract guarantees `.nexus-engine` exists, and no browser or artifact proof binds the reported SHA to the module bytes that produced a visible frame.

## Plan ledger

**Goal:** preserve the stronger real-provider test and same-checkout build path while binding product revision, NexusEngine revision, module fingerprint, artifact and first visible frame into one accepted build identity.

- [x] Enumerate all 11 accessible Publish repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm ten central ledgers and ten root `.agent` states.
- [x] Compare all eligible current heads with their recorded documentation heads.
- [x] Select only `LuminaryLabs-Publish/TheOpenAbove`, the sole runtime-ahead repository.
- [x] Inspect all four ahead commits and all changed files.
- [x] Identify the complete interaction loop, domains, kits and services.
- [x] Reconcile the adapter census from 100 to 101 active surfaces.
- [x] Add this timestamped audit family and refresh root `.agent` state.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Implement immutable provider admission, local setup, artifact identity and browser-frame proof.

## Selection comparison

```txt
accessible Publish repositories: 11
eligible after Cavalry exclusion: 10
central ledger entries: 10
root .agent states: 10
new or ledger-missing: 0
root-agent-missing: 0
runtime-ahead: 1
selected: LuminaryLabs-Publish/TheOpenAbove
ahead commits: 4
```

## Ahead commits

```txt
0ff6d20 build: resolve NexusEngine from checked-out main
6613698 build: bundle checked-out NexusEngine revision
1994b0d ci: test and stamp NexusEngine main
0d9ea6f test: boot Open Above against NexusEngine main
```

## Complete interaction loop

```txt
push or dispatch workflow
  -> checkout TheOpenAbove using ref: main
  -> checkout NexusEngine using ref: main into .nexus-engine
  -> calculate checkout HEAD and export VITE_NEXUS_ENGINE_SHA
  -> npm install
  -> headless checks
  -> world-domain-composition test imports .nexus-engine/src/index.js
  -> test creates real Core World domains and samples northern-wall
  -> Vite resolves @nexus-engine to the same checkout path
  -> Vite embeds VITE_NEXUS_ENGINE_SHA into the browser bundle
  -> upload and deploy dist

browser boot
  -> import bundled NexusEngine module
  -> compose Core World, foundation, features and landforms
  -> create balloon, world, airstream, Air Mail, map and renderer
  -> publish GameHost.nexusEngineSha
  -> tick simulation and render frames

current evidence boundary
  -> mutable branch names choose product and provider
  -> local builds may expose local-main
  -> no module-byte fingerprint or product SHA is embedded
  -> no browser assertion correlates reported SHA with loaded module
  -> no artifact manifest or first matching deployed frame exists
```

## Domains in use

```txt
GitHub event, checkout and workflow lifecycle
product revision admission
NexusEngine provider selection and checkout
provider revision recording and environment propagation
Node module loading and real-provider contract validation
Vite alias resolution, compile-time constants and bundling
artifact upload, Pages deployment and URL publication
browser route and GameHost identity projection
Core World, foundation, features and landforms
balloon simulation and telemetry
airstream and Air Mail gameplay
terrain, vegetation, grass, flowers and atmosphere
Three.js/WebGL/HDR presentation
parchment map and browser input
route lifecycle and resource retirement
repo-local and central audit governance
```

## Implemented kit and adapter census

```txt
local source-backed kits:           71
runtime-implied adapters:           13
Core World provider surfaces:       17
active documented total:           101
inactive or retired legacy:         13
planned identity authority family:  23
```

### Runtime and gameplay kits, 15

```txt
open-above-balloon-simulation-kit
open-above-balloon-telemetry-kit
open-above-airstream-domain
open-above-airstream-route-kit
open-above-airstream-sampler-kit
open-above-airstream-field-kit
open-above-airstream-balloon-force-kit
open-above-airstream-visual-kit
open-above-airstream-debug-kit
open-above-mail-delivery-domain
open-above-mail-parcel-kit
open-above-mail-route-kit
open-above-delivery-volume-kit
open-above-delivery-progress-kit
open-above-mail-town-kit
```

### Balloon object and presentation kits, 15

```txt
open-above-hot-air-balloon-object-kit
open-above-balloon-envelope-profile-kit
open-above-balloon-envelope-panel-kit
open-above-balloon-mouth-kit
open-above-balloon-streamer-fit-kit
open-above-balloon-fabric-seam-kit
open-above-hot-air-balloon-basket-kit
open-above-hot-air-balloon-rigging-kit
open-above-hot-air-balloon-burner-kit
open-above-rope-kit
open-above-balloon-presentation-domain
open-above-envelope-fabric-material-kit
open-above-basket-material-kit
open-above-balloon-camera-rig-kit
open-above-clipping-fade-kit
```

### Visual, world and environment kits, 34

```txt
open-above-visual-domain
open-above-world-generation-kit
open-above-world-feature-foundation-kit
open-above-quality-tier-kit
open-above-dynamic-resolution-kit
open-above-physical-sky-kit
open-above-sun-light-kit
open-above-aerial-perspective-kit
open-above-cloud-weather-map-kit
open-above-volumetric-cloud-kit
open-above-cloud-lod-kit
open-above-cloud-lighting-kit
open-above-terrain-surface-kit
open-above-terrain-streaming-contract-kit
open-above-terrain-chunk-streaming-kit
open-above-terrain-horizon-streaming-kit
open-above-vegetation-cluster-kit
open-above-grass-world-seed-kit
open-above-grass-biome-density-kit
open-above-grass-exclusion-mask-kit
open-above-grass-patch-density-kit
open-above-grass-texture-atlas-kit
open-above-grass-chunk-placement-kit
open-above-grass-lod-kit
open-above-grass-compute-culling-kit
open-above-grass-field-domain
open-above-flower-chunk-placement-kit
open-above-flower-texture-atlas-kit
open-above-flower-field-domain
open-above-water-surface-kit
open-above-distant-landmark-kit
open-above-hdr-composer-kit
open-above-color-grade-kit
open-above-lens-response-kit
```

### UI and tooling kits, 7

```txt
open-above-parchment-map-overlay-kit
open-above-headless-editor-environment
open-above-static-smoke-test-kit
open-above-airstream-mail-test-kit
open-above-world-flora-test-kit
open-above-world-feature-foundation-test-kit
open-above-world-domain-composition-test-kit
```

### Runtime-implied adapters, 13

```txt
open-above-route-shell-kit
open-above-importmap-kit
open-above-runtime-composer-kit
open-above-keyboard-input-kit
open-above-wheel-zoom-input-kit
open-above-parchment-map-shell-kit
open-above-error-panel-kit
open-above-gamehost-legacy-readback-kit
open-above-vite-nexusengine-checkout-alias-kit
open-above-nexusengine-revision-stamp-kit
open-above-campaign-source-kit
open-above-raf-clock-adapter-kit
open-above-pages-deploy-kit
```

### Core World provider surfaces, 17

```txt
n-world-domain
world-builder-runtime-kit
n-world-foundation-domain
foundation-definition-kit
foundation-composition-kit
foundation-sampling-kit
foundation-cell-resolution-kit
n-world-feature-domain
feature-registry-kit
feature-lifecycle-kit
feature-query-kit
feature-composition-kit
n-world-landform-feature-domain
mountain-feature-kit
canyon-feature-kit
cliff-feature-kit
plateau-feature-kit
```

## Services offered

```txt
simulation and gameplay
  balloon integration, keyboard admission/disposal, telemetry resources/events/readback
  airstream route/field sampling, forces, visuals and debug
  parcel, route, town, delivery-volume and progress services

balloon presentation
  procedural envelope, mouth, streamer fit, seams, basket, rigging, burner and rope
  material, camera and clipping presentation

world and rendering
  staged generation and Core World feature/foundation bridging
  terrain/horizon/vegetation streaming
  grass and flower generation, LOD, compute culling and disposal
  sky, sun, clouds, water, atmosphere, HDR, grading and dynamic resolution

host and UI
  parchment map drawing/lifecycle, browser input, RAF clock, fatal-error projection
  GameHost state and provider-identity projection

provider/build/deploy
  local checkout aliasing, provider SHA recording, real-provider Node contract test
  Vite build, headless inspection, Pages artifact upload, deployment and URL projection
```

## Source-backed findings

1. **Same-checkout convergence improved.** The composition test and Vite bundle now consume `.nexus-engine/src/index.js` rather than separate fake/CDN providers.
2. **The recorded SHA is observational.** `ref: main` still selects a mutable provider; rerunning the same product revision can select different NexusEngine bytes.
3. **The product checkout is mutable too.** Explicit `ref: main` can build a different product commit than the workflow event SHA.
4. **Local setup is implicit.** Vite and the real-provider test require `.nexus-engine`, but no checked-in setup command or typed preflight owns that dependency.
5. **`local-main` is not identity.** Manual builds can publish a non-unique provider label.
6. **Reported SHA is not byte-bound.** No manifest hashes `.nexus-engine/src/index.js` or correlates the embedded value with bundle contents.
7. **The test is Node proof, not browser boot.** It validates Core World APIs, feature compilation, elevation sampling and `engine.tick(0)`, but not Vite output, DOM boot, WebGL, `GameHost`, or a frame.
8. **Dependency reproducibility remains open.** `npm install` is used and no lockfile is present.

## Required parent domain

```txt
open-above-checked-out-provider-build-browser-identity-authority-domain
```

## Required transaction

```txt
ProviderBuildIdentityCommand
  -> bind workflow event and exact product revision
  -> resolve NexusEngine policy to an exact accepted revision
  -> checkout both revisions without mutable-ref drift
  -> fingerprint provider entry bytes and dependency state
  -> execute real-provider Node contract proof
  -> execute Vite bundle proof using the same provider candidate
  -> write ProductBuildIdentityManifest into dist
  -> admit GameHost product/provider identity
  -> acknowledge one matching visible frame
  -> publish ProviderBuildIdentityResult
  -> otherwise reject or retire the candidate artifact
```

## Validation boundary

Documentation only. Source, diffs and commit status were inspected. No workflow run, local setup, `npm install`, check, build, browser, artifact, Pages or visible-frame fixture was executed.