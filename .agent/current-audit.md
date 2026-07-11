# Current Audit: TheOpenAbove

**Last aligned:** `2026-07-11T14-50-59-04-00`

## Status

```txt
status: committed-observation-frame-authority-audited
runtime source changed by this pass: no
branch: main
root .agent state: refreshed
central ledger sync: pending until repo-local push completes
```

## Summary

The active Air Mail loop mutates simulation, delivery, airstream, balloon presentation, camera and visual state, then calls the Nexus telemetry engine before rendering and HUD projection. The telemetry system synchronously calls `getSnapshot()`, stores that object as Nexus resources and emits `openAbove.balloonTicked`.

`visual.render()` runs afterward. It submits the frame, samples dynamic resolution and only then updates `state.drawCalls` and `state.triangles`. Consequently, current simulation and parcel state can be paired with previous-frame render statistics. No frame identity or acknowledgement proves which visible frame consumed a delivery event, quality state, HUD string or telemetry snapshot.

## Plan ledger

**Goal:** define one committed observation boundary that correlates simulation, delivery, rendering, HUD, telemetry and external readback.

- [x] Compare the complete Publish inventory and central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `TheOpenAbove` under the oldest eligible fallback rule.
- [x] Read `src/main.js`, telemetry, visual and mail-delivery sources.
- [x] Identify the interaction loop, domains, kits and services.
- [x] Record the exact publication and rendering order.
- [x] Define typed tick, frame, delivery and consumer acknowledgement contracts.
- [x] Add timestamped architecture and system audits.
- [x] Refresh required root `.agent` files.
- [ ] Runtime implementation and executable correlation fixtures remain future work.

## Interaction loop

```txt
browser boot
  -> construct visual, balloon, airstream, mail, simulation, camera, presentation and telemetry
  -> install private keyboard/wheel input and expose mutable GameHost

each RAF
  -> derive clamped variable dt
  -> advance balloon simulation
  -> admit mail delivery result
  -> update airstream, balloon, camera, presentation and visual plan
  -> publish Nexus telemetry from current mutable state
  -> submit visual frame and sample dynamic resolution
  -> update renderer statistics
  -> mutate HUD HTML
  -> schedule next RAF
```

## Domains in use

```txt
browser shell and Vite publishing
mutable CDN/ESM admission
legacy Meadow Lift and active Air Mail product sources
product controls objectives acceptance and supersession
keyboard blur wheel and variable RAF input/time
balloon simulation terrain clearance and state snapshots
airstream route sampling blending force visuals and diagnostics
mail parcel route town delivery volume progress and reset
mission lifecycle restart and delivery authority
camera balloon presentation clipping and procedural construction
quality resolution sky lighting weather cloud terrain vegetation grass water landmark and HDR rendering
Nexus telemetry resources events and clock frame
HUD and error projection
GameHost and headless external readback
runtime lifecycle disposal source checks build and Pages deployment
committed tick frame observation and consumer acknowledgement authority
```

## Kit inventory

```txt
runtime/gameplay source-backed kits: 15
balloon/presentation source-backed kits: 14
visual environment source-backed kits: 26
tooling source-backed kits: 3
active source-backed total: 58
runtime-implied adapters: 12
inactive legacy kits: 11
```

The complete kit names and service groups remain in `.agent/kit-registry.json` and the timestamped tracker.

## Services offered

```txt
burner vent blur and wheel input
balloon buoyancy wind integration terrain clearance state projection snapshots and disposal
airstream route validation sampling field blend force visuals and diagnostics
parcel route town volume and one-shot delivery-event services
procedural balloon geometry materials rigging burner rope and animation
camera follow basket mode zoom clipping and disposal
quality sky clouds terrain streaming grass water HDR render and dynamic resolution
Nexus resource/event telemetry HUD error GameHost and headless readback
source and pure checks Vite build and Pages deployment
```

## Main finding

```txt
simulation and delivery state: current RAF
visual planning state: current RAF
Nexus telemetry publication: before render
renderer statistics: updated after render
dynamic-resolution decision: sampled after render
HUD projection: after telemetry and render
GameHost subsystem objects: mutable and directly exposed
simulationTickId: absent
renderFrameId: absent
deliveryResultId: absent
observationRevision: absent
required-consumer acknowledgements: absent
immutable committed observation: absent
```

The current `openAbove.balloonTicked.frame` uses Nexus Engine's internal clock frame, but there is no declared mapping from that value to the browser RAF, submitted renderer frame, HUD projection or delivery event.

## Required parent domain

```txt
open-above-committed-observation-frame-authority-domain
  -> simulation tick receipt
  -> delivery result identity
  -> render frame plan
  -> render submission result
  -> dynamic-resolution result
  -> HUD projection acknowledgement
  -> telemetry publication barrier
  -> required-consumer acknowledgement set
  -> immutable committed observation
  -> detached external read model
  -> bounded frame journal and fixture gate
```

## Required invariant

```txt
one committed observation
  = one runtime session and mission epoch
  = one simulation tick
  = one admitted delivery result
  = one render frame and effective quality state
  = one HUD projection
  = one telemetry publication
  = one required-consumer acknowledgement set
  = one state and frame fingerprint
```

## Ordered safe ledges

```txt
1. immutable runtime admission
2. import purity and frame ownership
3. runtime session lifecycle and ordered disposal
4. fixed-step clock and sequenced input
4a. product source and acceptance parity
5. Air Mail route and delivery authority
5a. mission restart transaction and epoch
5b. committed observation frame authority
6. terrain surface and horizon continuity/work budget
```

Documentation only. No runtime source, dependency, package script, route behavior, renderer behavior or deployment configuration changed.
