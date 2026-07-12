# Project Breakdown: TheOpenAbove Steering and Presentation Authority

Timestamp: `2026-07-11T22-58-50-04-00`
Repository: `LuminaryLabs-Publish/TheOpenAbove`
Branch: `main`
Source revision reviewed: `fd634acc03cce9c568e1a61a64690a5aa6022eff`

## Summary

Recent runtime commits added cross-current steering, separate envelope and gondola inertia, and steering-reactive camera framing. The controls are responsive, but simulation, root transform, part presentation, camera, HUD, telemetry and visible rendering do not share one committed steering result or revision. The same source update also added a shared envelope profile kit that was not yet represented in the active kit registry.

## Plan ledger

**Goal:** preserve the light A/D steering feel while giving every steering sample one authoritative identity from input admission through simulation, balloon-part response, camera response, HUD/readback and first visible frame.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` coverage.
- [x] Select only `TheOpenAbove` because substantive balloon construction, steering, inertia and camera commits landed after its prior audit.
- [x] Read repository guidance, current root `.agent` state and retained lifecycle, mission, observation, terrain, grass and world-surface audits.
- [x] Trace keyboard state, airstream application, lateral trim, root transform, envelope/gondola pivots, camera steering look, HUD projection and GameHost snapshot.
- [x] Reconcile the active kit inventory, including the new envelope-profile kit.
- [x] Define a composed DSK/domain boundary and executable fixture gate.
- [x] Add timestamped architecture, render, gameplay, interaction, presentation and deployment audits.
- [x] Refresh required root `.agent` documents and the kit registry.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Runtime implementation and browser fixtures remain future work.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or central-ledger-missing repositories: 0
root-.agent-missing repositories: 0

recent undocumented source work:
  TheOpenAbove
    unified envelope/profile construction
    integrated color-pattern refactor
    tapered basket rebuild
    cross-current steering
    envelope and gondola inertia
    steering-reactive camera

selection result:
  LuminaryLabs-Publish/TheOpenAbove only
```

## Current interaction loop

```txt
startup
  -> create visual domain and procedural balloon
  -> create airstream and mail domains
  -> create balloon simulation with ambient keyboard listeners
  -> create presentation domain and camera rig
  -> publish GameHost
  -> start one product RAF

input
  -> keydown/keyup mutate an internal Set
  -> A/D or arrows become steeringInput -1/0/1

frame
  -> sample airstream
  -> copy flow velocity into state.wind
  -> derive cross-current right vector
  -> smooth lateralTrim toward +/-3.6
  -> add trim to state.wind
  -> derive heading, visualBank and lateralAcceleration
  -> integrate velocity and position
  -> copy position/root rotation to balloon
  -> animate burner and rigging
  -> smooth envelope and gondola presentation state
  -> smooth steering-reactive camera look
  -> update visual domain, telemetry and HUD
  -> render
  -> expose only a partial snapshot through GameHost
```

## Main findings

### Steering has no committed input/result identity

The simulation reads ambient key state directly. There is no input sequence, command ID, simulation tick ID, steering policy revision or typed steering result. A blur clears held keys, but no result explains whether a steering sample was admitted, replaced, retired or ignored.

### Visible consumers maintain independent smoothing state

```txt
simulation:
  steeringInput
  lateralTrim
  lateralAcceleration
  visualBank
  heading

balloon root:
  rotation derived from heading and visualBank

presentation domain:
  envelopeBank
  envelopePitch
  gondolaBank
  gondolaPitch
  gondolaOffsetX

camera rig:
  steeringLook
  independently smoothed target and position
```

These states are updated in order but do not share a steering-frame ID or commit receipt.

### Readback cannot prove visible steering parity

`simulation.snapshot()` includes steering input, trim, visual bank and heading. It does not include the presentation domain's envelope/gondola state. `getSnapshot()` includes camera mode/zoom/blend but not `cameraRig.state.steeringLook`, target or committed camera transform. No frame receipt identifies which steering state was rendered.

### Stateful steering lacks restart/epoch ownership

Trim, bank, presentation inertia and camera look are retained in separate closures. The current product path does not expose one reset transaction that retires all four state owners and proves the first neutral replacement frame.

### Balloon profile catalog is stale and partially disconnected

`open-above-balloon-envelope-profile-kit` is now active but was absent from the previous registry. The shell builder accepts an optional color-pattern profile, while the object assembly builds the pattern metadata separately and calls the shell builder without that pattern. The default shell still renders, but accent-pattern configuration has no direct assembly handoff.

## Domains in use

```txt
browser shell, DOM, Vite and Pages
mutable CDN/runtime admission
runtime session, startup, failure, RAF ownership and disposal
keyboard, blur, wheel and variable frame time
balloon simulation, airstream force, steering, clearance and snapshots
steering input admission and result authority: missing
balloon root transform and procedural object assembly
shared envelope shape/profile sampling
continuous envelope shell, integrated pattern metadata, seams and mouth
basket, rigging, rope, burner and material presentation
part-level envelope/gondola inertia
camera follow, zoom, first-person blend and steering look
mail route, town, volume and delivery progress
airstream route, field, force, visual and diagnostics
bounded terrain, near/horizon streaming, vegetation and grass
sky, clouds, weather, water, lighting and HDR composition
HUD, Nexus telemetry, GameHost and headless readback
checks, pure tests, build and deployment
```

## Active source-backed kits and offered services

### Runtime and gameplay: 15

```txt
open-above-balloon-simulation-kit
  keyboard listeners, buoyancy, vent/burner state, cross-current steering, integration, terrain clearance, root transform, snapshots, disposal
open-above-balloon-telemetry-kit
  Nexus resource/event projection and telemetry state
open-above-airstream-domain
  route/field/visual/debug composition, update, sample, snapshot and disposal
open-above-airstream-route-kit
  route descriptors and validation
open-above-airstream-sampler-kit
  route influence and velocity sampling
open-above-airstream-field-kit
  field contribution composition
open-above-airstream-balloon-force-kit
  flow normalization and application to balloon state
open-above-airstream-visual-kit
  current visualization updates
open-above-airstream-debug-kit
  airstream diagnostic projection
open-above-mail-delivery-domain
  parcel, route, town, progress, update, snapshot, reset and disposal composition
open-above-mail-parcel-kit
  parcel state and delivery message
open-above-mail-route-kit
  delivery route data
open-above-delivery-volume-kit
  destination-volume admission
open-above-delivery-progress-kit
  delivery progress and completion
open-above-mail-town-kit
  town object and destination presentation
```

### Balloon object and presentation: 15

```txt
open-above-hot-air-balloon-object-kit
  procedural assembly, animation, compatibility installation and part registry
open-above-balloon-envelope-profile-kit
  profile resolution, radius/point/normal sampling, mouth radius and top-height queries
open-above-balloon-envelope-panel-kit
  continuous colored gore shell, normals, UVs, crown valve and shell metadata
open-above-balloon-mouth-kit
  mouth ring, inner shadow, skirt and mouth metrics
open-above-balloon-streamer-fit-kit
  integrated palette/accent pattern metadata
open-above-balloon-fabric-seam-kit
  fitted load-tape mesh generation
open-above-hot-air-balloon-basket-kit
  tapered basket shell, rims, floor, ribs, propane cylinders, controls and rider metrics
open-above-hot-air-balloon-rigging-kit
  burner frame, cable anchors, soft ropes and rope animation
open-above-hot-air-balloon-burner-kit
  burner geometry, flame/light state and animation
open-above-rope-kit
  segmented rope construction and dynamic curve updates
open-above-balloon-presentation-domain
  materials, burner illumination, envelope/gondola inertia and presentation state
open-above-envelope-fabric-material-kit
  envelope material installation and fabric animation
open-above-basket-material-kit
  basket material replacement
open-above-balloon-camera-rig-kit
  third-person/basket-view blend, zoom, clipping, steering look and camera transforms
open-above-clipping-fade-kit
  near-camera clipping/fade support
```

### Visual environment: 26

```txt
open-above-visual-domain: visual-system composition, update, render and state
open-above-quality-tier-kit: quality policy selection
open-above-dynamic-resolution-kit: render-scale adaptation
open-above-physical-sky-kit: sky construction and update
open-above-sun-light-kit: sun and illumination state
open-above-aerial-perspective-kit: distance haze
open-above-cloud-weather-map-kit: cloud weather field
open-above-volumetric-cloud-kit: volumetric cloud construction/update
open-above-cloud-lod-kit: cloud LOD policy
open-above-cloud-lighting-kit: cloud lighting
open-above-terrain-surface-kit: bounded height and surface descriptor
open-above-terrain-chunk-streaming-kit: near terrain chunk membership/streaming
open-above-terrain-horizon-streaming-kit: horizon terrain streaming
open-above-vegetation-cluster-kit: vegetation placement
open-above-grass-world-seed-kit: deterministic grass seed
open-above-grass-biome-density-kit: biome density
open-above-grass-exclusion-mask-kit: grass exclusion
open-above-grass-chunk-placement-kit: chunk candidates and instances
open-above-grass-lod-kit: grass LOD classification
open-above-grass-compute-culling-kit: current CPU culling helper/backend label
open-above-grass-field-domain: grass required-set, mesh cache, update and disposal
open-above-water-surface-kit: water surface
open-above-distant-landmark-kit: distant landmarks
open-above-hdr-composer-kit: HDR composition
open-above-color-grade-kit: color grading
open-above-lens-response-kit: lens response
```

### Tooling and proof: 3

```txt
open-above-headless-editor-environment: project/renderer inspection and command routing
open-above-static-smoke-test-kit: source-pattern and static checks
open-above-airstream-mail-test-kit: airstream/mail pure fixtures
```

### Runtime-implied adapters: 12

```txt
route shell
import map
runtime composer
keyboard input
wheel zoom input
HUD projection
error panel
GameHost readback
NexusEngine CDN adapter
campaign source
RAF clock adapter
Pages deploy
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
open-above-balloon-steering-presentation-authority-domain
  -> steering-input-sample-kit
  -> steering-input-sequence-kit
  -> steering-policy-descriptor-kit
  -> steering-admission-kit
  -> steering-simulation-result-kit
  -> balloon-root-transform-result-kit
  -> balloon-part-presentation-result-kit
  -> camera-steering-result-kit
  -> steering-hud-projection-kit
  -> steering-observation-frame-kit
  -> steering-frame-commit-kit
  -> stale-steering-result-rejection-kit
  -> steering-reset-transaction-kit
  -> steering-journal-kit
  -> steering-response-fixture-kit
  -> steering-visible-frame-smoke-kit
```

## Required invariants

```txt
one input sample is admitted once against one simulation tick
simulation, root, part presentation and camera reference the same steering result
neutral input converges every state owner to a documented neutral envelope
blur, pause, reset and restart retire prior steering authority
HUD and GameHost expose the committed steering result, not independently sampled state
first visible frame references the steering result it rendered
stale or duplicate input cannot mutate trim or presentation state
```

## Validation boundary

```txt
runtime source changed by this audit: no
package/dependencies changed: no
render/gameplay behavior changed: no
branch created: no
pull request created: no
npm run check: not run
npm run build: not run
browser steering fixture: unavailable
Pages steering smoke: unavailable
```
