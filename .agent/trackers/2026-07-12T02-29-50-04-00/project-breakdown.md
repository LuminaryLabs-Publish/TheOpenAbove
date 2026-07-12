# Project Breakdown: TheOpenAbove Public Host Capability Authority

**Timestamp:** `2026-07-12T02-29-50-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`  
**Branch:** `main`  
**Source revision reviewed:** `0e5ede8760e32d9082e19f880992380b0c5e9cb4`  
**Change type:** documentation-only audit

## Summary

The Air Mail product publishes nearly every live runtime owner through `window.GameHost`: NexusEngine, Three.js, scene, renderer, camera, balloon, visual domain, simulation, airstream, mail, camera rig and balloon presentation. Those objects expose mutable state and imperative methods. A same-page caller can therefore advance simulation, teleport the balloon, mutate delivery state, submit renders, dispose systems or corrupt camera state outside the normal RAF order. `getState()` separately samples mutable owners and does not prove that its values belong to one committed visible frame.

## Plan ledger

**Goal:** preserve useful diagnostics and controlled automation while making one capability-scoped gateway the only public path to immutable committed state or admitted runtime commands.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger entries.
- [x] Confirm all nine eligible repositories have root `.agent` state.
- [x] Select only `TheOpenAbove` as the oldest eligible documented repository.
- [x] Read repository guidance and current audit state.
- [x] Trace startup, RAF ordering, host publication and host readback.
- [x] Trace every raw owner and callable service exposed through `window.GameHost`.
- [x] Identify the interaction loop, domains, all active kits and offered services.
- [x] Define owner quarantine, capability descriptors, command admission, epoch fences, finite-value policy, typed results and committed read-model contracts.
- [x] Add timestamped architecture, render, gameplay, interaction, host-capability and deploy audits.
- [x] Refresh required root `.agent` files and kit registry.
- [x] Create no branch or pull request.
- [ ] Implement the gateway and execute browser/Pages isolation fixtures.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

TheOpenAbove       2026-07-12T00-39-05-04-00 selected
IntoTheMeadow      2026-07-12T00-58-12-04-00
HorrorCorridor     2026-07-12T01-08-06-04-00
PhantomCommand     2026-07-12T01-20-00-04-00
ZombieOrchard      2026-07-12T01-30-07-04-00
TheUnmappedHouse   2026-07-12T01-41-56-04-00
AetherVale         2026-07-12T01-58-43-04-00
MyCozyIsland       2026-07-12T02-10-14-04-00
PrehistoricRush    2026-07-12T02-21-55-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/TheOpenAbove` is modified by this breakdown.

## Interaction loop

```txt
startup
  -> create visual, balloon, airstream, mail, simulation, camera and presentation owners
  -> create Nexus telemetry engine
  -> publish every live owner through window.GameHost
  -> start recursive requestAnimationFrame

normal RAF
  -> simulation.update(dt)
  -> mail.update(position, airstream, elapsed)
  -> airstream.update(...)
  -> simulation.applyToBalloon(balloon)
  -> animateHotAirBalloon(...)
  -> balloonPresentation.update(state)
  -> cameraRig.update(dt, state)
  -> visual.update(...)
  -> engine.tick(dt)
  -> visual.render(dt, frameMs)
  -> update HUD

public-host bypass
  -> read or mutate a live owner between any two stages
  -> invoke update/render/reset/dispose methods outside RAF ownership
  -> independently sample getState()
  -> receive no command ID, capability decision, epoch fence or typed result
```

## Source-backed host surface

```txt
window.GameHost.engine
window.GameHost.NexusEngine
window.GameHost.THREE
window.GameHost.scene
window.GameHost.renderer
window.GameHost.camera
window.GameHost.balloon
window.GameHost.visual
window.GameHost.simulation
window.GameHost.airstream
window.GameHost.mail
window.GameHost.cameraRig
window.GameHost.balloonPresentation
window.GameHost.getState
```

### Exposed mutation paths

```txt
simulation
  state, update, applyToBalloon, dispose

airstream
  routes, field, visual, diagnostics, state, sample, update, dispose

mail
  route, towns, parcel, state, visuals, update, reset, dispose

cameraRig
  mutable state, update, dispose

balloonPresentation
  mutable state, material kits, update

visual
  scene, camera, renderer, composer, resolution, landscape owners,
  update, render, resize, dispose

raw Three objects
  scene graph mutation, camera mutation, renderer mutation and direct render submission
```

## Concrete reachable failures

```txt
out-of-band simulation advancement
  -> public caller invokes simulation.update()
  -> state advances without the host frame clock, mail order, telemetry or frame receipt

out-of-band mission mutation
  -> public caller mutates mail.parcel or invokes mail.update/reset()
  -> delivery status changes without a mission command, epoch or result

camera corruption
  -> public caller writes cameraRig.state.zoom = NaN
  -> next camera update derives non-finite camera placement
  -> render failure is outside any typed host-command result

uncommitted presentation
  -> public caller invokes visual.render() or renderer.render()
  -> pixels can be submitted without the simulation, telemetry, HUD or committed observation stages

lifecycle bypass
  -> public caller invokes dispose() on simulation, camera, mail, airstream or visual
  -> the active RAF continues against partially retired owners

mixed readback
  -> getState() reads Nexus telemetry and a fresh local snapshot independently
  -> no shared renderFrameId, simulationTickId, missionEpoch or state fingerprint proves coherence
```

## Domains in use

```txt
browser shell, DOM, Vite and Pages
runtime admission, startup failure, session and RAF ownership
public host capabilities, raw owner exposure and readback
keyboard, blur, wheel and variable frame time
balloon simulation, airstream, steering, terrain clearance and snapshots
mail route, town, delivery volume, progress and reset
balloon profile, procedural model assembly, async load and resources
envelope profile, shell, pattern, seams and mouth
basket, burner, rigging, rope and part inertia
camera follow, zoom, clipping and steering look
terrain, near/horizon streaming, grass, water and landmarks
sky, clouds, weather, lighting, HDR and dynamic resolution
Nexus telemetry, HUD and headless inspection
checks, pure tests, build and Pages deployment
```

## Active source-backed kits

### Runtime and gameplay: 15

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

### Balloon object and presentation: 15

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

### Tooling and proof: 3

```txt
open-above-headless-editor-environment
open-above-static-smoke-test-kit
open-above-airstream-mail-test-kit
```

## Runtime-implied adapters: 12

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

## Services offered

```txt
runtime boot, fatal projection and host publication
keyboard burner/vent/steering input and wheel camera input
wind-driven balloon simulation, terrain clearance and snapshots
airstream route, field, force, visual and diagnostics
mail parcel, route, town, volume, progress, reset and disposal
procedural balloon profile/model, shell, pattern, mouth and seams
basket, burner, rigging, rope, materials and animation
camera follow, zoom, clipping and basket-view blend
terrain, grass, sky, cloud, water, lighting and HDR rendering
dynamic resolution, draw-call and triangle observations
Nexus telemetry, HUD, GameHost and headless readback
source checks, pure fixtures, Vite build and Pages deployment
```

## Required parent domain

```txt
open-above-public-host-capability-authority-domain
  -> open-above-host-session-identity-kit
  -> open-above-host-capability-descriptor-kit
  -> open-above-host-read-capability-kit
  -> open-above-host-command-capability-kit
  -> open-above-host-owner-handle-quarantine-kit
  -> open-above-host-command-envelope-kit
  -> open-above-host-command-id-kit
  -> open-above-host-command-admission-kit
  -> open-above-host-session-epoch-fence-kit
  -> open-above-host-mission-epoch-fence-kit
  -> open-above-host-frame-revision-fence-kit
  -> open-above-host-finite-value-policy-kit
  -> open-above-host-command-result-kit
  -> open-above-host-committed-read-model-kit
  -> open-above-host-state-fingerprint-kit
  -> open-above-host-frame-provenance-kit
  -> open-above-host-observation-journal-kit
  -> open-above-legacy-gamehost-compatibility-adapter-kit
  -> open-above-host-owner-isolation-fixture-kit
  -> open-above-host-command-admission-fixture-kit
  -> open-above-host-read-model-coherence-fixture-kit
```

## Intended public surface

```txt
window.GameHost = {
  version,
  sessionId,
  capabilities,
  getCommittedState(),
  getJournal(),
  submit(command)
}
```

No live scene, renderer, camera, simulation, mission, presentation or engine owner is returned. Read results are detached immutable copies of one committed frame. Commands declare capability, command ID, expected session, mission epoch and relevant revision before routing to the existing authoritative owner.

## Required invariants

```txt
public reads cannot mutate runtime owners
public commands cannot bypass RAF/fixed-step admission
rejected or stale commands perform zero mutation
all numeric command fields are finite and bounded
one command ID commits at most once
mission mutations require the current mission epoch
render/camera commands require current frame or presentation revision
committed read model has one simulationTickId and renderFrameId
read-model fingerprint matches the frame acknowledged by HUD and telemetry
stop, failure, reset and disposal revoke all prior capabilities
```

## Ordered implementation queue

```txt
1. immutable runtime admission
2. import purity and single frame ownership
2a. balloon profile snapshot/admission/fingerprint authority
2b. balloon model assembly/loading/resource authority
3. runtime session lifecycle and ordered disposal
4. fixed-step clock and sequenced input
4a. product source and acceptance parity
5. Air Mail route and delivery authority
5a. mission restart transaction and epoch
5b. committed observation frame authority
5c. public host owner quarantine, command gateway and committed read model
6. terrain source and LOD transition authority
6a. bounded terrain build and atomic replacement
7. grass spatial identity and backend truth
7a. world surface membership and consumer parity
8. balloon steering and presentation authority
```

## Validation boundary

Documentation and current source were inspected. Runtime JavaScript, package files and deployment configuration were not changed. Browser, Pages and executable isolation fixtures were not run or available in this environment. No host-isolation, command-safety, committed-read-model coherence or frame-correlation claim is made.