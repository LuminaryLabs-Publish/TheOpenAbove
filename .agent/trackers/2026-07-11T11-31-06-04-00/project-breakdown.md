# TheOpenAbove Project Breakdown

**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

**Timestamp:** `2026-07-11T11-31-06-04-00`

**Scope:** documentation and architecture audit only

## Summary

`TheOpenAbove` has an active hot-air-balloon Air Mail loop, but it has no complete mission restart transaction. `KeyR` is documented but never consumed, the balloon simulation exposes no reset service, the airstream and camera retain live state, and the only existing reset clears parcel fields in place.

A direct `mail.reset()` while the balloon remains inside Brookhaven can be undone by the next `mail.update()`, which immediately delivers the parcel again. The required boundary is one mission epoch and one atomic reset result spanning input, simulation, airstream, parcel, camera, telemetry, presentation and the first post-reset frame.

## Plan ledger

**Goal:** define a single restart transaction that retires the current mission epoch, resets every mission-owned subsystem, blocks stale delivery admission and proves the first committed post-reset frame.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger entries and root `.agent` state.
- [x] Select only `TheOpenAbove` under the oldest eligible central-ledger rule.
- [x] Read `AGENTS.md`, current root audit state and prior Air Mail audits.
- [x] Trace browser boot, simulation, mail, airstream, camera, telemetry, render and GameHost paths.
- [x] Trace documented and implemented restart controls.
- [x] Identify the interaction loop, all domains, all source-backed kits and offered services.
- [x] Define the mission-restart authority and fixture gate.
- [x] Change documentation only.
- [ ] Runtime implementation and executable fixtures remain future work.

## Repository selection comparison

```txt
accessible Publish repositories: 10
eligible after Cavalry exclusion: 9
central ledger entries present: 9
root .agent state present: 9
new or ledger-missing eligible repositories: 0
selected repository: LuminaryLabs-Publish/TheOpenAbove
selection basis: oldest eligible central-ledger timestamp
```

```txt
TheOpenAbove         selected / 2026-07-11T09-21-50-04-00
HorrorCorridor       tracked  / 2026-07-11T09-29-07-04-00
PhantomCommand       tracked  / 2026-07-11T09-40-19-04-00
ZombieOrchard        tracked  / 2026-07-11T10-00-12-04-00
TheUnmappedHouse     tracked  / 2026-07-11T10-18-05-04-00
AetherVale           tracked  / 2026-07-11T10-38-55-04-00
IntoTheMeadow        tracked  / 2026-07-11T10-50-14-04-00
PrehistoricRush      tracked  / 2026-07-11T10-58-10-04-00
MyCozyIsland         tracked  / 2026-07-11T11-19-10-04-00
TheCavalryOfRome     excluded by rule
```

Only `LuminaryLabs-Publish/TheOpenAbove` is changed in the Publish organization.

## Interaction loop

```txt
static ESM boot
  -> import mutable NexusEngine main and Three.js
  -> construct visual domain, balloon, airstream routes and Air Mail domain
  -> create balloon simulation with private held-key Set
  -> create camera, presentation and telemetry owners
  -> variable-dt RAF
  -> simulation.update
  -> mail.update
  -> airstream.update
  -> balloon/camera/visual updates
  -> telemetry tick before render
  -> visual render and HUD projection
  -> next RAF
```

Current restart-related route:

```txt
documented KeyR
  -> no key consumer
  -> no ResetMission command

same-page script
  -> GameHost.mail.reset()
  -> parcel fields reset only
  -> balloon position, velocity, elapsed and held input remain
  -> airstream sample and camera state remain
  -> next mail.update evaluates current position
  -> if still inside destination volume, parcel immediately redelivers
```

## Domains in use

```txt
browser shell and Vite publishing
mutable CDN and ESM runtime admission
legacy Meadow Lift campaign/world source
active Air Mail route, parcel and town source
keyboard, blur and wheel input
variable RAF timing
balloon buoyancy, wind, airstream flow and terrain clearance
airstream route validation, sampling, blending, visuals and diagnostics
mail parcel state, route state, delivery-volume sampling and town visuals
mission phase and restart authority
camera follow, basket mode, clipping and zoom
balloon procedural object and presentation
quality tier and dynamic resolution
physical sky, lighting, weather and clouds
near and horizon terrain streaming
vegetation, deterministic grass, water and landmarks
HDR composition, grading and lens response
telemetry, HUD and mutable GameHost projection
runtime lifecycle, listener ownership and disposal
source smoke, pure tests, headless routing and Pages deployment
```

Missing restart authority domains:

```txt
mission session identity
mission epoch and reset transaction identity
sequenced ResetMission command
fixed-tick reset admission
held-input and queued-command retirement
canonical initial mission snapshot
subsystem reset staging and rollback
stale delivery-proof rejection
post-reset delivery lockout
reset result and bounded journal
first post-reset simulation/render receipt
browser, GameHost and headless reset parity
```

## Source-backed kit inventory

### Runtime and gameplay

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

### Balloon object and presentation

```txt
open-above-hot-air-balloon-object-kit
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

### Visual environment

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

### Tooling and runtime-implied adapters

```txt
open-above-headless-editor-environment
open-above-static-smoke-test-kit
open-above-airstream-mail-test-kit
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

## Services offered by the current kits

- Balloon simulation: held-key polling, airstream sampling, fallback wind, buoyancy, velocity and position integration, terrain clearance, balloon projection, snapshot and listener disposal.
- Airstream: immutable route descriptors, nearest-segment sampling, overlap blending, ambient fallback, balloon-force adaptation, visuals, diagnostics, snapshots and disposal.
- Mail: parcel construction, parcel-field reset, route and town descriptors, destination-volume sampling, selected-current mutation, one-shot delivery event, snapshots and visual disposal.
- Camera and balloon presentation: zoom, basket/third-person blending, clipping fade, procedural envelope, basket, rigging, ropes, burner, materials and animation.
- Visual domain: quality selection, dynamic resolution, sky, light, weather, clouds, terrain, vegetation, grass, water, landmarks, HDR composition, grading, render statistics and disposal.
- Telemetry and host: Nexus resource/event publication, HUD copy and mutable GameHost access to engine, scene, renderer, camera, simulation, airstream and mail.
- Validation and deployment: source smoke, pure airstream/mail tests, headless status/inspect/render/check/build and GitHub Pages deployment.

## Main finding: reset is a partial mutation, not a mission transaction

`createBalloonSimulation()` captures `startPosition`, but returns no reset method and does not retain a canonical initial mission snapshot. Its private key set accepts burner and vent controls only; `KeyR` is never interpreted.

`mail.reset()` calls `resetMailParcel()` and clears `lastEvent`. It does not reset the balloon, elapsed time, distance, airstream selection, camera zoom/blend, visual state, telemetry resources or route proof.

`updateDeliveryProgress()` delivers whenever the current balloon position is inside the destination volume. There is no mission epoch, reset phase, stale-proof fence or post-reset lockout. Resetting only the parcel while remaining in Brookhaven allows immediate delivery on the next update.

## Required parent domain

```txt
open-above-mission-restart-authority-domain
```

Update existing owners first:

```txt
open-above-balloon-simulation-kit
open-above-mail-delivery-domain
open-above-airstream-domain
open-above-balloon-camera-rig-kit
open-above-balloon-presentation-domain
open-above-balloon-telemetry-kit
open-above-visual-domain
open-above-runtime-composer-kit
open-above-keyboard-input-kit
open-above-gamehost-legacy-readback-kit
open-above-headless-editor-environment
```

Add coordinating kits only:

```txt
open-above-mission-session-kit
open-above-mission-epoch-kit
open-above-reset-command-kit
open-above-reset-admission-kit
open-above-input-retirement-kit
open-above-initial-mission-snapshot-kit
open-above-simulation-reset-adapter-kit
open-above-airstream-reset-adapter-kit
open-above-mail-reset-adapter-kit
open-above-camera-reset-adapter-kit
open-above-presentation-reset-adapter-kit
open-above-telemetry-reset-adapter-kit
open-above-reset-transaction-kit
open-above-reset-result-kit
open-above-reset-journal-kit
open-above-post-reset-delivery-lock-kit
open-above-first-post-reset-frame-kit
open-above-reset-fixture-kit
```

## Required restart sequence

```txt
receive ResetMission(commandId, expectedMissionEpoch)
  -> validate current session, epoch and lifecycle
  -> enter restarting phase
  -> retire held input and queued pre-reset commands
  -> advance missionEpoch
  -> stage canonical simulation, mail, airstream, camera and presentation state
  -> invalidate route and delivery proof from the predecessor epoch
  -> commit all staged subsystem states atomically
  -> block delivery until one post-reset tick leaves reset staging
  -> commit first post-reset simulation tick
  -> commit first post-reset rendered frame
  -> return one typed reset result and journal row
```

## Required result

```js
{
  resetTransactionId: "reset-0001",
  commandId: "command-0042",
  sessionId: "air-mail-session-1",
  previousMissionEpoch: 7,
  missionEpoch: 8,
  status: "accepted" | "rejected" | "duplicate" | "stale" | "failed",
  reason: "ok" | "epoch-mismatch" | "already-restarting" | "runtime-stopped" | "reset-failed",
  beforeFingerprint: "...",
  afterFingerprint: "...",
  firstSimulationTickId: 1,
  firstRenderFrameId: "frame-0001"
}
```

## Required proof

```txt
KeyR, GameHost and headless reset use one command adapter
held burner/vent input is cleared
pre-reset queued commands cannot affect the new epoch
balloon position, velocity, elapsed, distance and message reset
parcel, selected current, delivery proof and last event reset
camera zoom/blend/mode and presentation state reset
telemetry and HUD report the new epoch
reset inside Brookhaven cannot immediately redeliver
old delivery receipts reject as stale
repeat reset is idempotent or returns a typed duplicate result
partial subsystem failure rolls back or leaves a terminal failed result
first post-reset simulation and render identities are observable
```

## Ordered safe ledges

```txt
1. Immutable Runtime Admission
2. Import Purity and Frame Ownership
3. Runtime Session Lifecycle and Ordered Disposal
4. Fixed-Step Clock and Sequenced Input
4a. Product Source Supersession and Parity
5. Air Mail Route and Delivery Authority
5a. Air Mail Mission Restart Transaction and Mission Epoch
6. Terrain Surface/Horizon Continuity and Work Budget
```

## Validation boundary

```txt
runtime source changed: no
package scripts changed: no
dependencies changed: no
render output changed: no
deployment changed: no
branch created: no
pull request created: no
npm run check: not run
npm run build: not run
browser smoke: not run
mission reset fixtures: unavailable
first post-reset frame fixture: unavailable
```

Do not claim mission restart support because `mail.reset()` exists. Completion requires one epoch-changing transaction across every mission-owned subsystem and a correlated first post-reset frame.