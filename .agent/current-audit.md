# Current Audit: TheOpenAbove

**Last aligned:** `2026-07-12T02-29-50-04-00`

## Status

```txt
status: public-host-capability-authority-audited
source revision reviewed: 0e5ede8760e32d9082e19f880992380b0c5e9cb4
runtime source changed by this pass: no
branch: main
root .agent state: refreshed
central ledger sync: complete
central internal change log: complete
```

## Summary

The current Air Mail runtime publishes the complete live owner graph through `window.GameHost`. This includes engine modules and instances, Three.js scene/camera/renderer objects, the balloon object, visual domain, simulation, airstream, mail, camera rig and balloon presentation. These are not detached diagnostics. They expose mutable state plus update, render, reset and dispose methods, allowing same-page callers to bypass normal clock, mission, presentation, lifecycle and committed-frame ordering.

`GameHost.getState()` also reads Nexus telemetry and a new local snapshot independently. It includes no shared simulation tick, render frame, mission epoch or state fingerprint proving that both reads describe the same visible frame.

## Plan ledger

**Goal:** make the browser-global host a capability-scoped diagnostics and command boundary rather than a second runtime authority.

- [x] Compare the full Publish inventory and central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central and root `.agent` coverage.
- [x] Select only `TheOpenAbove` as the oldest eligible documented repository.
- [x] Review root guidance and retained audit state.
- [x] Trace startup construction, RAF ordering, host publication and readback.
- [x] Trace exposed simulation, mission, camera, render and lifecycle methods.
- [x] Preserve the complete 59-kit source-backed inventory and service map.
- [x] Define owner quarantine, capability descriptors, command envelopes, epoch fences, finite-value policy, typed results and immutable read models.
- [x] Add timestamped tracker and system audits.
- [x] Refresh root `.agent` routing state and kit registry.
- [x] Synchronize the central ledger and internal change log.
- [ ] Implement runtime changes and execute isolation/coherence fixtures.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or central-ledger-missing repositories: 0
root-.agent-missing repositories: 0

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

## Interaction loop

```txt
startup
  -> construct all subsystem owners
  -> publish raw owner references through window.GameHost
  -> start one recursive product RAF

product RAF
  -> simulation.update
  -> mail.update
  -> airstream.update
  -> apply and animate balloon
  -> presentation.update
  -> cameraRig.update
  -> visual.update
  -> engine.tick
  -> visual.render
  -> HUD update

public host
  -> caller can mutate owners or call methods at any time
  -> no command admission or ordering relationship to RAF
  -> getState independently samples mutable owners
```

## Source-backed findings

### Raw gameplay and mission owners are public

`simulation` exposes its mutable state plus `update`, `applyToBalloon` and `dispose`. `mail` exposes its route, towns, parcel, mutable state, `update`, `reset` and `dispose`. `airstream` exposes routes, field, state, sampling, updating and disposal.

### Raw render and camera owners are public

The host exports the Three.js scene, renderer, camera and balloon directly. It also exports the visual domain with composer, dynamic resolution, landscape owners, update, render, resize and disposal methods. The camera rig exposes mutable state and its update/dispose methods.

### Public calls bypass ordered authority

A caller can advance simulation without the host clock, mutate or complete delivery without a mission command, submit an uncommitted render, change scene/camera state, or partially dispose the runtime while RAF continues.

### Numeric state is not protected

Direct writes bypass clamping. For example, assigning `NaN` to camera zoom reaches camera placement math on the next update and can produce non-finite camera transforms.

### Readback is not frame-coherent

`getState()` returns Nexus telemetry plus a freshly assembled local snapshot. There is no common `simulationTickId`, `renderFrameId`, `missionEpoch`, profile/model receipt or state fingerprint.

### Existing tests do not isolate the host

No source or browser fixture proves raw owner keys are absent, read records are detached, invalid or stale commands mutate nothing, or one command result correlates to one later visible frame.

## Consequences

```txt
same-page code has equivalent authority to the product host
simulation can advance outside the admitted clock
mission completion/reset can bypass epoch and result policy
camera and renderer can be corrupted outside typed results
runtime can be partially disposed while callbacks continue
HUD, telemetry, readback and visible pixels can describe different states
future restart/lifecycle fences cannot contain leaked owner references
```

## Domains in use

```txt
browser shell, DOM, Vite and Pages
runtime admission, session, failure and frame ownership
public host capabilities and readback
keyboard, blur, wheel and variable RAF time
balloon simulation, airstream, steering, clearance and snapshots
mail route, town, volume, progress and reset
balloon profile, model assembly, async load and resources
envelope shell, pattern, seams and mouth
basket, burner, rigging, rope and part inertia
camera follow, zoom, clipping and steering look
terrain, grass, atmosphere, water, HDR and dynamic resolution
Nexus telemetry, HUD and headless readback
checks, pure tests, build and Pages deployment
```

## Kit inventory

```txt
runtime/gameplay source-backed kits: 15
balloon/object/presentation source-backed kits: 15
visual environment source-backed kits: 26
tooling/proof source-backed kits: 3
active source-backed total: 59
runtime-implied adapters: 12
inactive legacy kits: 11
```

The exact kit list and per-kit services are recorded in the timestamped tracker and `.agent/kit-registry.json`.

## Services offered

```txt
runtime boot, fatal projection and host publication
keyboard burner/vent/steering input and wheel camera input
wind-driven simulation, clearance, transforms and snapshots
airstream route/field/force/visual/debug services
mail parcel/route/town/volume/progress/reset services
procedural balloon profile/model and shell construction
basket, burner, rigging, rope, materials and animation
camera follow, steering look, zoom, clipping and basket blend
terrain, grass, sky, cloud, water, lighting and HDR rendering
dynamic-resolution and renderer observations
Nexus telemetry, HUD, GameHost and headless readback
checks, fixtures, Vite build and Pages deployment
```

## Required parent domain

```txt
open-above-public-host-capability-authority-domain
  -> host session identity
  -> capability descriptors
  -> owner-handle quarantine
  -> command envelopes, IDs and admission
  -> session, mission and frame revision fences
  -> finite-value validation
  -> typed command results
  -> immutable committed read model
  -> state fingerprint and frame provenance
  -> bounded journal and legacy adapter
  -> isolation, command and coherence fixtures
```

## Required public contract

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

No live subsystem, Three.js, GPU or Nexus engine object crosses this boundary.

## Required invariants

```txt
public reads cannot mutate runtime state
public commands cannot call subsystem owners directly
rejected/stale/duplicate commands perform zero mutation
numeric payloads are finite and bounded
commands are fenced by runtime session and mission epoch
frame-sensitive commands are fenced by frame revision
one accepted command routes to one authoritative service
read model describes one committed visible frame
capabilities are revoked after failure, reset, stop and disposal
```

## Ordered safe ledges

```txt
1. immutable runtime admission
2. import purity and frame ownership
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

Documentation only. No runtime source, package, rendering or deployment behavior changed.