# Current Audit: TheOpenAbove Cloud Low-Resolution Rendering

**Last aligned:** `2026-07-14T22-39-00-04-00`  
**Status:** `cloud-low-resolution-depth-upscale-authority-audited`  
**Reviewed repository head:** `e407aa0c8ae98406f467e05c0fadfff988bdd304`  
**Reviewed runtime revision:** `0d9ea6f6f977b63d09f22f8ae36107bfccd81811`

## Summary

The cloud LOD profile declares a cloud-only render scale of 0.50, 0.42 or 0.32, but the active renderer never consumes that value. The camera-centered, non-culled volumetric sphere is rendered by the main HDR scene pass at the same resolution as the rest of the world, while whole-scene dynamic resolution is the only resolution control.

## Plan ledger

**Goal:** turn the existing cloud LOD descriptor into an authoritative render path without restructuring weather, world generation or gameplay.

- [x] Compare repository inventory, central ledger and root `.agent` coverage.
- [x] Exclude TheCavalryOfRome and select one repository only.
- [x] Inspect all cloud profile, shader, scene, composer and shadow paths.
- [x] Preserve the 101-surface inventory.
- [x] Define typed results and fixture gates.
- [x] Change documentation only.
- [ ] Implement and execute the authority.

## Selection comparison

```txt
accessible Publish repositories: 11
eligible after Cavalry exclusion: 10
central ledger entries: 10
root .agent states: 10
new eligible repositories: 0
central-ledger missing: 0
root-agent missing: 0
runtime-ahead candidates: 0
selected: LuminaryLabs-Publish/TheOpenAbove
selection reason: oldest synchronized central documentation timestamp
selected prior timestamp: 2026-07-14T17-39-01-04-00
next oldest: AetherVale at 2026-07-14T17-58-14-04-00
excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

## Complete interaction loop

```txt
workflow and browser admission
  -> checkout product and NexusEngine provider
  -> test, bundle, upload and deploy
  -> compose Core World, balloon, mail and visual domains
  -> create one Three.js scene and HDR composer
  -> enter recursive RAF

cloud frame
  -> detect high, medium or low quality tier
  -> create cloud LOD profile with renderScale, viewSamples and lightSamples
  -> create camera-centered sphere with frustumCulled=false
  -> attach ray-marched transparent cloud material directly to the main scene
  -> update weather, lighting and camera-centered sphere
  -> HDR RenderPass draws terrain, vegetation, balloon and clouds together
  -> cloud fragment shader marches up to the tier view-sample count
  -> each occupied sample launches up to the tier light-sample count
  -> color-grade pass composites the same full-scene target
  -> whole-scene dynamic resolution may resize renderer and composer every 90 samples

terrain shadow path
  -> terrain material runs two procedural fbm2 cloud fields per terrain fragment
  -> shadow cost is independent of cloud LOD renderScale
  -> no cloud-only target, scene-depth input or depth-aware upscaler exists
```

## Domains in use

```txt
GitHub workflow, checked-out provider, Vite build and Pages deployment
browser route, RAF clock, input, errors and GameHost publication
Nexus Engine telemetry and Core World composition
balloon flight, airstream and Air Mail gameplay
world generation, terrain, vegetation, grass and flowers
quality-tier detection and whole-scene dynamic resolution
weather, physical sky, sun, aerial perspective and volumetric clouds
cloud ray marching, lighting, LOD descriptors and terrain cloud shadows
HDR scene rendering, color grading, depth textures and visible-frame evidence
balloon, camera, parchment map and UI presentation
validation, repo-local audit governance and central tracking
```

## Kit and service census

```txt
local source-backed kits:           71
runtime-implied adapters:           13
Core World surfaces:                17
active documented total:           101
inactive or retired legacy:         13
planned cloud authority including parent: 20
```

The complete kit-by-kit list and service map are in the timestamped tracker and `.agent/kit-registry.json`.

## Source-backed findings

### Cloud LOD scale is not executed

`createCloudLodProfile()` returns `renderScale`, but `createVolumetricClouds()` reads only the view and light sample counts.

### Clouds render in the shared scene pass

The camera-centered cloud sphere is added directly to the main scene. The HDR composer owns one full-scene `RenderPass`, so no cloud-only target exists.

### Dynamic resolution is whole-scene

The controller changes renderer and composer pixel ratio together. It can reduce cloud cost only by reducing terrain, balloon, vegetation and post-process resolution at the same time.

### Terrain cloud shadows are a separate cost

The terrain shader injects two `fbm2` fields per terrain fragment and is not governed by the cloud LOD profile.

### Frame evidence is absent

No result identifies target dimensions, executed sample counts, history, upscale policy, fallback, shadow policy, timing or the first matching visible frame.

## Required parent domain

```txt
open-above-cloud-low-resolution-depth-upscale-authority-domain
```

## Required transaction

```txt
CloudFrameAdmissionCommand
  -> bind FrameId, renderer generation, quality tier, viewport, DPR, weather and camera revisions
  -> validate one CloudLodProfileRevision
  -> allocate cloud color, transmittance and depth candidates at the declared cloud render scale
  -> execute the admitted view/light sample budget
  -> optionally adopt motion-aware temporal history
  -> depth-aware upscale against the accepted scene-depth revision
  -> composite clouds into the HDR scene in explicit order
  -> classify full, reduced, impostor, disabled or rejected execution
  -> publish CloudFrameResult with target, timing, pass and fallback receipts
  -> publish FirstVisibleCloudFrameAck

TerrainCloudShadowCommand
  -> bind the same weather and quality revisions
  -> admit procedural, cached-texture or disabled shadow policy
  -> publish TerrainCloudShadowResult and cost receipts
  -> prevent an untracked shadow path from bypassing the cloud budget
```

## Validation boundary

Documentation only. No shader, runtime, render target, test, build or deployment behavior changed, and no GPU timing or browser fixture was run.
