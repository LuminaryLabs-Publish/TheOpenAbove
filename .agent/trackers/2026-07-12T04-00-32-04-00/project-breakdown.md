# Project Breakdown: Frame Failure Containment Authority

**Timestamp:** `2026-07-12T04:00:32-04:00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`  
**Branch:** `main`

## Summary

The Air Mail runtime has a visible startup-failure panel, but normal frame execution is not inside the boot `try/catch`. Any exception after the first RAF begins can stop scheduling future frames without calling `showFatal()`. Because frame stages mutate live owners in sequence, the runtime can stop after simulation, mission, balloon, camera, visual or telemetry state has advanced while the canvas and HUD still show an older frame.

This pass defines a documentation-only boundary for stage identity, typed stage results, last-known-good frame retention, failure quarantine, capability revocation, terminal observation, ordered disposal and cold-restart admission.

## Plan ledger

**Goal:** make every runtime-frame failure produce one typed terminal result and one coherent visible failure state instead of leaving a partially advanced, silently frozen owner graph.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger entries and root `.agent` state.
- [x] Select only `LuminaryLabs-Publish/TheOpenAbove` as the oldest eligible central entry.
- [x] Read `AGENTS.md`, `src/main.js`, current `.agent` routing state and retained lifecycle/observation audits.
- [x] Trace startup, each RAF stage, error projection, public readback and next-frame scheduling.
- [x] Identify the interaction loop, all domains, all 59 active source-backed kits and their services.
- [x] Confirm `boot()` catches startup failure but no frame-stage exception is routed to `showFatal()`.
- [x] Confirm frame stages mutate sequentially before render/HUD commit.
- [x] Define frame-stage, failure, quarantine, last-known-good, disposal and restart contracts.
- [x] Add timestamped architecture and system audits.
- [x] Refresh required root `.agent` files and machine registry.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Implement runtime containment and executable browser/Pages failure fixtures.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

TheOpenAbove       2026-07-12T02-29-50-04-00 selected
IntoTheMeadow      2026-07-12T02-38-23-04-00
HorrorCorridor     2026-07-12T02-49-19-04-00
PhantomCommand     2026-07-12T03-00-46-04-00
ZombieOrchard      2026-07-12T03-11-51-04-00
TheUnmappedHouse   2026-07-12T03-21-27-04-00
AetherVale         2026-07-12T03-28-44-04-00
MyCozyIsland       2026-07-12T03-39-52-04-00
PrehistoricRush    2026-07-12T03-51-15-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/TheOpenAbove` was modified in the Publish organization.

## Interaction loop

```txt
boot
  -> await createGame()
  -> catch startup construction failures
  -> show fatal panel only for failures reaching boot()

committed startup
  -> publish live GameHost owners
  -> schedule recursive RAF

frame
  -> derive frameMs and dt
  -> simulation.update
  -> mail.update
  -> airstream.update
  -> simulation.applyToBalloon
  -> animateHotAirBalloon
  -> balloonPresentation.update
  -> cameraRig.update
  -> visual.update
  -> engine.tick
  -> visual.render
  -> updateHud
  -> schedule next RAF

frame-stage failure
  -> exception escapes callback
  -> later stages do not run
  -> next RAF is not scheduled
  -> showFatal is not called
  -> no terminal result, quarantine, rollback or disposal
  -> GameHost may expose partially advanced state
  -> canvas and HUD may remain on different revisions
```

## Source-backed failure examples

```txt
simulation succeeds, mail throws
  -> balloon state advanced
  -> delivery, visual, render and HUD not committed

mail succeeds, visual.render throws
  -> delivery may be committed
  -> simulation, balloon, camera, visual and telemetry may be advanced
  -> canvas remains last successfully presented frame
  -> HUD remains older

render succeeds, updateHud throws
  -> canvas shows the new frame
  -> HUD remains older
  -> no future frame is scheduled
```

## Domains in use

```txt
browser shell, DOM, Vite and Pages
runtime admission, session, startup failure and RAF ownership
frame-stage execution, failure containment and terminal observation
public host capabilities and readback
keyboard, blur, wheel and variable frame time
balloon simulation, airstream, steering, clearance and snapshots
mail route, town, volume, delivery progress and reset
balloon profile, model assembly, async loading and resources
envelope profile, shell, pattern, seams and mouth
basket, burner, rigging, rope and part presentation
camera follow, zoom, clipping and steering look
terrain, grass, atmosphere, water, HDR and dynamic resolution
Nexus telemetry, HUD and headless readback
checks, fixtures, build and Pages deployment
```

## Active source-backed kits and services

### Runtime and gameplay: 15

```txt
open-above-balloon-simulation-kit
  mutable flight state, input sampling, wind integration, clearance, transforms, snapshots and disposal
open-above-balloon-telemetry-kit
  NexusEngine composition, telemetry ticking and state projection
open-above-airstream-domain
  route, sampler, field, force, visual and debug composition
open-above-airstream-route-kit
  authored current-route descriptors
open-above-airstream-sampler-kit
  spatial route influence sampling
open-above-airstream-field-kit
  local wind-vector field evaluation
open-above-airstream-balloon-force-kit
  airstream-to-balloon force derivation
open-above-airstream-visual-kit
  scene visualization and animation of currents
open-above-airstream-debug-kit
  debug descriptors and state projection
open-above-mail-delivery-domain
  parcel, route, town, volume, progress, reset and disposal composition
open-above-mail-parcel-kit
  parcel creation and reset
open-above-mail-route-kit
  route, destination and correct-current descriptors
open-above-delivery-volume-kit
  destination-volume spatial sampling
open-above-delivery-progress-kit
  selected-current tracking, delivery commit, message and event production
open-above-mail-town-kit
  town scene construction, animation and disposal
```

### Balloon object and presentation: 15

```txt
open-above-hot-air-balloon-object-kit
  profile resolution, async construction, model metadata, animation and resources
open-above-balloon-envelope-profile-kit
  envelope radius, point, normal, mouth and top-height sampling
open-above-balloon-envelope-panel-kit
  panel geometry and integrated color-pattern construction
open-above-balloon-mouth-kit
  mouth geometry and attachment
open-above-balloon-streamer-fit-kit
  streamer fitting to the envelope profile
open-above-balloon-fabric-seam-kit
  fabric seam construction
open-above-hot-air-balloon-basket-kit
  basket and gondola object construction
open-above-hot-air-balloon-rigging-kit
  suspension and rigging construction
open-above-hot-air-balloon-burner-kit
  burner object and flame response
open-above-rope-kit
  segmented rope construction and animation
open-above-balloon-presentation-domain
  envelope and gondola inertia presentation
open-above-envelope-fabric-material-kit
  envelope fabric material construction
open-above-basket-material-kit
  basket material construction
open-above-balloon-camera-rig-kit
  follow camera, zoom, clipping, steering look and basket blend
open-above-clipping-fade-kit
  camera-near clipping fade policy
```

### Visual environment: 26

```txt
open-above-visual-domain
  scene, camera, renderer, environment composition, update, render, resize and disposal
open-above-quality-tier-kit
  visual quality policy
open-above-dynamic-resolution-kit
  render-scale adaptation and observations
open-above-physical-sky-kit
  physical sky construction and update
open-above-sun-light-kit
  sun light construction and update
open-above-aerial-perspective-kit
  atmospheric distance response
open-above-cloud-weather-map-kit
  cloud weather-field descriptors
open-above-volumetric-cloud-kit
  cloud volume construction and animation
open-above-cloud-lod-kit
  cloud LOD selection
open-above-cloud-lighting-kit
  cloud lighting response
open-above-terrain-surface-kit
  terrain surface generation and height service
open-above-terrain-chunk-streaming-kit
  near-terrain chunk membership and streaming
open-above-terrain-horizon-streaming-kit
  horizon chunk membership and LOD
open-above-vegetation-cluster-kit
  vegetation cluster generation
open-above-grass-world-seed-kit
  deterministic grass seed policy
open-above-grass-biome-density-kit
  biome density classification
open-above-grass-exclusion-mask-kit
  grass exclusion rules
open-above-grass-chunk-placement-kit
  deterministic world-space blade placement
open-above-grass-lod-kit
  grass LOD classification
open-above-grass-compute-culling-kit
  culling helper and backend observation
open-above-grass-field-domain
  grass chunk generation, membership, materials, update and disposal
open-above-water-surface-kit
  animated water surface construction
open-above-distant-landmark-kit
  distant landmark construction
open-above-hdr-composer-kit
  HDR render-composer construction and submission
open-above-color-grade-kit
  color-grade transform
open-above-lens-response-kit
  lens and exposure response
```

### Tooling and proof: 3

```txt
open-above-headless-editor-environment
  headless inspection and environment readback
open-above-static-smoke-test-kit
  source-level smoke assertions
open-above-airstream-mail-test-kit
  pure airstream and mail fixtures
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

These adapters provide HTML routing/imports, runtime composition, browser input, HUD/error projection, public readback, CDN integration, campaign data, RAF timing and Pages deployment.

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

## Main finding

`showFatal()` is a startup projection, not a runtime failure boundary. Once `createGame()` returns, frame callbacks execute outside the `boot()` catch. The callback schedules its successor only after all mutation, rendering and HUD stages complete. An exception therefore silently terminates the frame chain and can leave several authoritative owners newer than the last canvas or HUD.

## Required parent domain

```txt
open-above-frame-failure-containment-authority-domain
```

### Planned kits

```txt
open-above-frame-id-kit
open-above-frame-stage-schema-kit
open-above-frame-stage-id-kit
open-above-frame-execution-plan-kit
open-above-frame-stage-result-kit
open-above-frame-failure-id-kit
open-above-frame-failure-classification-kit
open-above-frame-failure-admission-kit
open-above-frame-mutation-journal-kit
open-above-last-known-good-frame-kit
open-above-frame-failure-quarantine-kit
open-above-frame-failure-render-freeze-kit
open-above-frame-failure-capability-revocation-kit
open-above-frame-failure-overlay-kit
open-above-frame-failure-disposal-plan-kit
open-above-frame-failure-result-kit
open-above-frame-failure-observation-kit
open-above-frame-failure-journal-kit
open-above-frame-cold-restart-adapter-kit
open-above-frame-stage-failure-fixture-kit
open-above-render-failure-last-good-frame-fixture-kit
open-above-hud-failure-coherence-fixture-kit
open-above-pages-frame-failure-smoke-kit
```

## Required invariants

```txt
every frame has one immutable input and ordered stage plan
every stage returns a typed result or throws into one containment boundary
no failed frame becomes the committed observation
last-known-good canvas/HUD/readback identity remains available
failure revokes mutation and public command capabilities
failure publishes failed stage, frame, session and mission identities
all remaining callbacks are cancelled before terminal publication
ordered disposal is attempted and recorded
restart creates a new session and rejects predecessor work
browser and Pages fixtures inject failure at each stage
```

## Validation boundary

Documentation only. Runtime JavaScript, dependencies, package scripts, gameplay, rendering and deployment were not changed. Existing tests do not inject frame-stage failures or prove last-known-good coherence, terminal projection, capability revocation, disposal or restart isolation.