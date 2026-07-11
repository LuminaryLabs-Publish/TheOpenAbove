# Current Audit: TheOpenAbove

**Last aligned:** `2026-07-11T11-31-06-04-00`

## Status

```txt
status: air-mail-mission-restart-authority-audited
runtime source changed by this pass: no
branch: main
root .agent state: refreshed
central ledger sync: pending until repo-local push completes
```

## Summary

The active Air Mail mission has no atomic restart boundary. `KeyR` is documented but not consumed; `createBalloonSimulation()` has no reset service; `createAirstreamDomain()` and `createBalloonCameraRig()` have no reset service; and `mail.reset()` mutates only parcel fields.

Because delivery admission evaluates the live balloon position every frame, parcel-only reset inside Brookhaven can immediately redeliver on the next update. Restart must become an epoch-changing transaction across every mission-owned subsystem.

## Plan ledger

**Goal:** define one mission restart authority that resets state coherently, rejects stale proof and publishes the first committed post-reset frame.

- [x] Compare the complete Publish inventory with the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `TheOpenAbove` under the oldest eligible fallback rule.
- [x] Read repo rules and current audit history.
- [x] Trace keyboard, simulation, mail, airstream, camera, telemetry, visual and GameHost paths.
- [x] Identify all domains, kits and services.
- [x] Trace parcel-only reset and immediate-redelivery behavior.
- [x] Define mission epoch, reset transaction, result, journal and first-frame kits.
- [x] Add timestamped architecture and system audits.
- [x] Refresh required root `.agent` files.
- [ ] Runtime implementation and executable fixtures remain future work.

## Interaction loop

```txt
boot
  -> construct visual, balloon, airstream and mail domains
  -> construct simulation, camera, presentation and telemetry
  -> private key Set receives burner/vent state
  -> variable-dt RAF advances simulation and delivery
  -> update airstream, balloon, camera and visual domains
  -> publish telemetry before render
  -> render and update HUD
```

Restart route today:

```txt
KeyR -> no consumer
GameHost.mail.reset -> parcel-only mutation
next mail.update -> live destination-volume admission
```

## Domains in use

```txt
browser shell and Vite publish
mutable CDN/ESM admission
legacy Meadow Lift product source
active Air Mail route/parcel/town source
keyboard, blur and wheel input
variable RAF clock
balloon physics and terrain clearance
airstream route, sample, blend, force, visual and debug
mail parcel, route, town, delivery volume and progress
mission session, phase, epoch and restart authority
camera and clipping presentation
procedural balloon object and materials
quality, dynamic resolution, sky, weather and clouds
near/horizon terrain, vegetation, grass, water and landmarks
HDR composition, grade and lens response
telemetry, HUD and mutable GameHost projection
lifecycle, disposal, testing, headless and Pages deployment
```

## Complete kit inventory

The exact source-backed and runtime-implied inventory is recorded in:

```txt
.agent/trackers/2026-07-11T11-31-06-04-00/project-breakdown.md
.agent/kit-registry.json
```

Inventory groups:

```txt
runtime/gameplay source-backed kits: 15
balloon/presentation source-backed kits: 14
visual environment source-backed kits: 26
tooling source-backed kits: 3
runtime-implied adapters: 13
```

## Services offered

```txt
balloon input polling, wind sampling, buoyancy, integration, terrain clearance and snapshots
airstream route validation, sampling, blending, force application, visuals and diagnostics
parcel construction, parcel-field reset, route/town source, volume sampling and delivery events
camera zoom, basket blending, clipping and balloon presentation
quality, terrain, atmosphere, grass, water and HDR rendering
telemetry resources/events, HUD projection and GameHost readback
source smoke, pure tests, headless project operations, Vite build and Pages deployment
```

## Primary finding

```txt
complete ResetMission command: absent
KeyR binding: absent
mission epoch: absent
canonical initial mission snapshot: absent
simulation reset: absent
airstream reset: absent
camera reset: absent
telemetry reset receipt: absent
parcel-only reset: present
post-reset delivery lockout: absent
first post-reset frame receipt: absent
```

`resetMailParcel()` clears parcel fields but retains the balloon's current position and elapsed time. `updateDeliveryProgress()` delivers whenever the live position is inside the destination volume. The next frame can therefore redeliver a just-reset parcel.

## Required parent domain

```txt
open-above-mission-restart-authority-domain
```

Core coordinating kits:

```txt
open-above-mission-session-kit
open-above-mission-epoch-kit
open-above-reset-command-kit
open-above-reset-admission-kit
open-above-input-retirement-kit
open-above-initial-mission-snapshot-kit
open-above-reset-transaction-kit
open-above-reset-result-kit
open-above-reset-journal-kit
open-above-post-reset-delivery-lock-kit
open-above-first-post-reset-frame-kit
open-above-reset-fixture-kit
```

Subsystem adapters:

```txt
open-above-simulation-reset-adapter-kit
open-above-airstream-reset-adapter-kit
open-above-mail-reset-adapter-kit
open-above-camera-reset-adapter-kit
open-above-presentation-reset-adapter-kit
open-above-telemetry-reset-adapter-kit
```

## Required invariant

```txt
accepted reset
  = one new mission epoch
  = neutral input
  = canonical simulation state
  = empty airstream/delivery proof
  = in-transit parcel
  = reset camera/presentation policy
  = telemetry/HUD/GameHost epoch agreement
  = one first committed post-reset frame
```

## Ordered safe ledges

```txt
1. immutable runtime admission
2. import purity and frame ownership
3. runtime session lifecycle and ordered disposal
4. fixed-step clock and sequenced input
4a. product source supersession and parity
5. Air Mail route and delivery authority
5a. Air Mail mission restart transaction and mission epoch
6. terrain near/horizon continuity and work budget
```

Documentation only. No runtime source, dependency, package script, route behavior, renderer behavior or deployment configuration changed.