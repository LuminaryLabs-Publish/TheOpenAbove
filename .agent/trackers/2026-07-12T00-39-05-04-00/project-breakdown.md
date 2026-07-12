# Project Breakdown: TheOpenAbove Balloon Profile Admission Authority

Timestamp: `2026-07-12T00-39-05-04-00`  
Repository: `LuminaryLabs-Publish/TheOpenAbove`  
Branch: `main`  
Source revision reviewed: `6b2753b63263c9238952d387214bc7ff91afe83e`

## Summary

The current procedural balloon is assembled from a root profile plus nested panel, pattern, mouth, seam, basket, rigging and burner profiles. The visual pattern is correctly passed into the unified shell. The remaining defect is profile authority: the root profile and several nested defaults are shared mutable objects, the root is exposed on `window`, and the async loader yields before reading the live object. No immutable snapshot, schema version, fingerprint, load generation, model/profile receipt or visible-frame acknowledgement proves which profile produced the installed balloon.

## Plan ledger

**Goal:** establish one canonical immutable balloon profile from command admission through asynchronous construction, scene commit, diagnostics and first visible frame.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` coverage.
- [x] Select only `TheOpenAbove` as the oldest eligible documented repository.
- [x] Read root guidance, recent audits, startup, profile, shell, pattern, model and tests.
- [x] Identify the complete interaction loop and all active domains.
- [x] Reuse and verify the 59 source-backed kits, 12 runtime-implied adapters and 11 inactive legacy kits.
- [x] Correct the stale pattern-handoff finding.
- [x] Define profile snapshot, identity, fingerprint, load-generation, commit and frame-proof contracts.
- [x] Add architecture, render, gameplay, interaction, profile and deployment audits.
- [x] Refresh required root `.agent` files and registry.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Runtime implementation and executable fixtures remain future work.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

TheOpenAbove       2026-07-11T22-58-50-04-00 selected
IntoTheMeadow      2026-07-11T23-10-51-04-00
HorrorCorridor     2026-07-11T23-18-16-04-00
PhantomCommand     2026-07-11T23-28-29-04-00
ZombieOrchard      2026-07-11T23-48-14-04-00
TheUnmappedHouse   2026-07-12T00-01-25-04-00
AetherVale         2026-07-12T00-10-23-04-00
MyCozyIsland       2026-07-12T00-20-01-04-00
PrehistoricRush    2026-07-12T00-30-49-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/TheOpenAbove` was changed in the Publish organization.

## Current interaction loop

```txt
module evaluation
  -> define mutable root/subprofile objects
  -> expose kit globals and root profile on window

startup
  -> create visual domain
  -> loadHotAirBalloonModel(undefined, { yieldToFrame: true })
  -> await one animation frame
  -> build from the then-current live default profile
  -> create integrated pattern metadata
  -> pass pattern into continuous shell construction
  -> build seams, mouth, basket, rigging and burner
  -> set readiness booleans
  -> add model to scene

runtime
  -> simulate, animate, present and render
  -> expose model readiness booleans without profile identity
```

## Main findings

### Public mutable alias

`window.OpenAboveHotAirBalloonObjectKit.profile` aliases the root default object. The root directly references imported nested defaults. Public or internal mutation can affect later builds.

### Async mutation window

The loader yields before `buildHotAirBalloon(profile)`. It does not clone, validate, freeze or fingerprint at admission time. A mutation during the yield changes the built model.

### Pattern handoff correction

The current source passes `streamers.userData.pattern` into `buildEnvelopePanels()`. The prior claim that the handoff was absent is incorrect and is removed from current routing docs.

### Missing model/profile receipt

The installed model records only `modelReady`, `loadedDuringLevelSetup` and `persistentGpuResources`. GameHost cannot identify the source profile, fingerprint or load generation rendered.

### Proof gap

Static checks inspect source strings and profile math. They do not exercise alias isolation, async mutation, overlapping generations, stale rejection, model/profile commit or first visible frame provenance.

## Domains in use

```txt
browser shell, DOM, Vite and Pages
runtime admission, session, failure, RAF and disposal
keyboard, blur, wheel and variable time
balloon simulation, steering, airstream and clearance
balloon profile composition, async model loading and resources
envelope sampling, unified shell, pattern, seams and mouth
basket, burner, rigging, rope, materials and inertia
camera follow, zoom, clipping and steering look
mail route, town, volume and delivery progress
terrain, grass, atmosphere, water, HDR and dynamic resolution
telemetry, HUD, GameHost and headless readback
checks, pure tests, build and deployment
```

## Active source-backed kits and services

### Runtime and gameplay: 15

```txt
open-above-balloon-simulation-kit: input, buoyancy, steering, integration, clearance, transform, snapshot, disposal
open-above-balloon-telemetry-kit: Nexus resource/event projection and telemetry
open-above-airstream-domain: route/field/visual/debug composition
open-above-airstream-route-kit: route descriptors and validation
open-above-airstream-sampler-kit: route influence and velocity sampling
open-above-airstream-field-kit: field contribution composition
open-above-airstream-balloon-force-kit: normalized flow application
open-above-airstream-visual-kit: current visualization
open-above-airstream-debug-kit: diagnostic projection
open-above-mail-delivery-domain: parcel/route/town/progress composition, reset and disposal
open-above-mail-parcel-kit: parcel state and messages
open-above-mail-route-kit: delivery route data
open-above-delivery-volume-kit: destination-volume admission
open-above-delivery-progress-kit: delivery progress/completion
open-above-mail-town-kit: town/destination presentation
```

### Balloon object and presentation: 15

```txt
open-above-hot-air-balloon-object-kit: root profile, procedural assembly, async load, animation, compatibility install
open-above-balloon-envelope-profile-kit: profile resolution and shape sampling
open-above-balloon-envelope-panel-kit: continuous colored shell, normals, UVs and crown
open-above-balloon-mouth-kit: ring, shadow, skirt and metrics
open-above-balloon-streamer-fit-kit: integrated palette/accent metadata
open-above-balloon-fabric-seam-kit: fitted load-tape generation
open-above-hot-air-balloon-basket-kit: basket, floor, ribs, cylinders and controls
open-above-hot-air-balloon-rigging-kit: frame, anchors, ropes and animation
open-above-hot-air-balloon-burner-kit: burner geometry, flame/light and animation
open-above-rope-kit: segmented persistent dynamic ropes
open-above-balloon-presentation-domain: materials, illumination and part inertia
open-above-envelope-fabric-material-kit: envelope material and fabric animation
open-above-basket-material-kit: basket material replacement
open-above-balloon-camera-rig-kit: follow, basket view, zoom, clipping and steering look
open-above-clipping-fade-kit: near-camera clipping/fade
```

### Visual environment: 26

```txt
open-above-visual-domain
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
open-above-terrain-chunk-streaming-kit
open-above-terrain-horizon-streaming-kit
open-above-vegetation-cluster-kit
open-above-grass-world-seed-kit
open-above-grass-biome-density-kit
open-above-grass-exclusion-mask-kit
open-above-grass-chunk-placement-kit
open-above-grass-lod-kit
open-above-grass-compute-culling-kit
open-above-grass-field-domain
open-above-water-surface-kit
open-above-distant-landmark-kit
open-above-hdr-composer-kit
open-above-color-grade-kit
open-above-lens-response-kit
```

These services cover visual composition, quality and render scale, sky/sun/haze, clouds, near/horizon terrain, vegetation/grass, water, landmarks and HDR/color/lens presentation.

### Tooling and proof: 3

```txt
open-above-headless-editor-environment: project/renderer inspection and command routing
open-above-static-smoke-test-kit: source-pattern/static checks
open-above-airstream-mail-test-kit: pure airstream/mail fixtures
```

### Runtime-implied adapters: 12

```txt
open-above-route-shell-kit
open-above-importmap-kit
open-above-runtime-composer-kit
open-above-keyboard-input-kit
open-above-wheel-zoom-input-kit
open-above-hud-projection-kit
open-above-error-panel-kit
open-above-gamehost-legacy-readback-kit
open-above-nexusengine-cdn-adapter-kit
open-above-campaign-source-kit
open-above-raf-clock-adapter-kit
open-above-pages-deploy-kit
```

### Inactive legacy kits: 11

```txt
open-above-hot-air-balloon-envelope-kit
open-above-grass-detail-kit
open-above-bloom-kit
open-above-god-ray-kit
open-above-auto-exposure-kit
open-above-bird-camera-kit
open-above-bird-posture-kit
open-above-bird-dive-domain-kit
open-above-bird-flight-frame-kit
open-above-bird-flight-input-kit
open-above-bird-flight-physics-kit
```

## Required composed domain

```txt
open-above-balloon-profile-admission-authority-domain
  -> profile schema/canonicalization/deep clone/validation/deep freeze
  -> profile ID/version/revision/fingerprint
  -> async load command/load generation/build plan
  -> stale/cancelled result rejection
  -> atomic model/profile commit and receipt
  -> observation and first-visible-frame acknowledgement
  -> alias-isolation, mutation-race and fingerprint-frame fixtures
```

## Validation boundary

```txt
runtime source changed: no
package/dependencies changed: no
render/gameplay behavior changed: no
branch created: no
pull request created: no
npm run check: not run
npm run build: not run
browser profile fixture: unavailable
Pages model/profile smoke: unavailable
```