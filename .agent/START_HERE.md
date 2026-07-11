# START HERE: TheOpenAbove

**Last aligned:** `2026-07-11T07-18-44-04-00`

**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

**Branch:** `main`

## Summary

`TheOpenAbove` is an altitude-routing hot-air-balloon mail game. Burner and vent control altitude, altitude selects one of three visible airstreams, routed flow moves the balloon toward a town, and the active parcel targets Brookhaven.

The current audit focuses on restart authority. The runtime exposes `mail.reset()`, but it resets only parcel fields. It does not reset balloon position, velocity, elapsed time, held input, airstream state, camera state, telemetry or the rendered frame. Calling it while the balloon remains inside Brookhaven can cause immediate redelivery on the next RAF.

## Plan ledger

**Goal:** define one deterministic Air Mail restart transaction that creates a new mission epoch, retires stale input and route proof, restores all participating domains, and publishes a correlated first post-restart frame.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories with the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories are tracked and have root `.agent` state.
- [x] Select only `TheOpenAbove` by the oldest-documented fallback rule.
- [x] Trace input, simulation, airstream, mail, camera, render, telemetry, HUD and GameHost behavior.
- [x] Identify all active domains, services and kits.
- [x] Trace the parcel-only reset path and immediate-redelivery failure mode.
- [x] Add timestamped restart architecture, render, gameplay, interaction, authority and fixture audits.
- [x] Refresh required root `.agent` documents.
- [x] Push documentation only to `main`.
- [x] Synchronize `LuminaryLabs-Dev/LuminaryLabs`.
- [ ] Runtime implementation and executable restart fixtures remain future work.

## Selection result

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or ledger-missing eligible repositories: 0
root-undocumented eligible repositories: 0
selected: TheOpenAbove
excluded: TheCavalryOfRome
```

`TheOpenAbove` had the oldest eligible central timestamp before this run.

## Read first

```txt
.agent/trackers/2026-07-11T07-18-44-04-00/project-breakdown.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
```

Then read:

```txt
.agent/turn-ledger/2026-07-11T07-18-44-04-00.md
.agent/architecture-audit/2026-07-11T07-18-44-04-00-air-mail-restart-transaction-dsk-map.md
.agent/render-audit/2026-07-11T07-18-44-04-00-restart-first-frame-correlation-gap.md
.agent/gameplay-audit/2026-07-11T07-18-44-04-00-delivery-reset-immediate-redelivery-loop.md
.agent/interaction-audit/2026-07-11T07-18-44-04-00-keyr-reset-command-admission-map.md
.agent/reset-authority-audit/2026-07-11T07-18-44-04-00-mission-epoch-clean-restart-contract.md
.agent/deploy-audit/2026-07-11T07-18-44-04-00-air-mail-restart-fixture-gate.md
```

## Active interaction loop

```txt
browser resolves Three.js and NexusEngine ESM
  -> visual domain creates terrain, horizon, atmosphere, grass, water and postprocess
  -> airstream domain creates three routes, field samples and route visuals
  -> mail domain creates parcel, towns and delivery volumes
  -> keyboard state drives burner and vent
  -> variable-dt RAF updates balloon simulation
  -> flow sample changes wind and horizontal movement
  -> mail progress records the latest influential route
  -> destination-volume membership may commit delivery
  -> balloon, camera, environment and route visuals update
  -> telemetry snapshots before render
  -> HDR render and HUD update
  -> mutable GameHost exposes the runtime graph
```

## Restart finding

```txt
GameHost.mail.reset()
  -> parcel fields reset
  -> last mail event clears
  -> balloon remains where it was
  -> simulation time and distance continue
  -> held input remains
  -> airstream state remains
  -> camera and visual state remain
  -> next mail.update can immediately deliver again
```

`KeyR` is never consumed, even though repository instructions require `R` restart.

## Domains in use

```txt
browser shell and Vite publishing
ESM/CDN source admission
legacy Meadow Lift campaign source
Air Mail route, parcel and town source
keyboard, blur and wheel input
variable RAF cadence
balloon buoyancy and terrain clearance
airstream route validation and sampling
airstream field blending and balloon-force adaptation
airstream state, visuals and diagnostics
parcel state and delivery progress
delivery-volume geometry and town visuals
camera follow, basket mode, clipping and zoom
quality tier and dynamic resolution
physical sky, light, weather and clouds
near and horizon terrain streaming
terrain color, vegetation, grass, water and landmarks
HDR composition and grading
telemetry, HUD and GameHost projection
partial lifecycle and disposal
source smoke, pure tests, headless routing and Pages deployment
```

## Active source-backed kits

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
open-above-headless-editor-environment
open-above-static-smoke-test-kit
open-above-airstream-mail-test-kit
```

## Ordered safe ledges

```txt
1. Immutable Runtime Admission + Boot Capability Fixture Gate
2. Import-Pure Balloon Object Kit + Frame Ownership Fixture Gate
3. Runtime Session Lifecycle + Ordered Disposal/Reboot Fixture Gate
4. Fixed-Step Simulation Clock + Visibility/Input Parity Fixture Gate
5. Air Mail Route and Delivery Authority
5a. Air Mail Restart Transaction + Mission Epoch/First-Frame Fixture Gate
6. Terrain Surface/Horizon Authority + Continuity/Work-Budget Fixture Gate
```

## Guardrails

```txt
Push only to main.
Create no branches or pull requests.
Do not work on TheCavalryOfRome.
Preserve altitude-only routing.
Keep renderer code presentation-only.
Do not treat parcel reset as mission restart.
Reset must create a new mission epoch.
Old input, route proof and delivery results must not cross epochs.
Do not claim browser or deployment success without execution evidence.
```
