# Current Audit: TheOpenAbove

**Last aligned:** `2026-07-11T19-28-28-04-00`

## Status

```txt
status: import-purity-compatibility-frame-ownership-authority-audited
runtime source changed by this pass: no
branch: main
root .agent state: refreshed
central ledger sync: pending until repo-local completion
central internal change log: pending until repo-local completion
```

## Summary

`src/hot-air-balloon-object-kit.js` is imported by the active Air Mail host and schedules `requestAnimationFrame(attachWhenReady)` at module scope. `src/main.js` separately schedules the active game loop. Once `window.GameHost` appears, the compatibility path starts a second recursive frame loop even when no compatible legacy vehicle was found.

The current product therefore has one intended Air Mail loop plus one hidden compatibility scene-traversal loop. If startup throws before GameHost publication, the compatibility wait loop continues polling despite the fatal UI.

## Plan ledger

**Goal:** define one explicit authority for module purity, compatibility installation, recurring frame registration, runtime generation and failure/disposal retirement.

- [x] Compare the full Publish inventory and central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `TheOpenAbove` after reconciling repo-local timestamps.
- [x] Read current root `.agent` state and retained lifecycle audits.
- [x] Inspect `src/main.js` and `src/hot-air-balloon-object-kit.js`.
- [x] Identify successful-startup and failed-startup callback paths.
- [x] Inventory all domains, kits and service families.
- [x] Define explicit install, frame registration, stale-callback and disposal contracts.
- [x] Add timestamped tracker and system audits.
- [x] Refresh root `.agent` state.
- [ ] Implement runtime changes and execute browser fixtures.

## Interaction loop

```txt
import phase
  -> main imports balloon object kit
  -> balloon object kit schedules attachWhenReady

host construction
  -> create visual, active balloon, airstream, mail, simulation, camera and telemetry
  -> publish window.GameHost
  -> schedule active frame

active frame
  -> simulation and delivery
  -> airstream and presentation
  -> camera and visual update
  -> telemetry
  -> render and HUD
  -> next active frame

compatibility frame
  -> traverse scene for legacy vehicle markers
  -> current product returns no target
  -> animate no object
  -> next compatibility frame
```

## Source-backed findings

```txt
module evaluation side effect:
  requestAnimationFrame(attachWhenReady)

before GameHost:
  attachWhenReady reschedules itself

when GameHost exists:
  installHotAirBalloonVisual may return null
  compatibility tick still starts

compatibility tick:
  findVehicle(host.scene)
  scene.traverse every frame
  requestAnimationFrame(tick)

active host:
  builds balloon directly
  calls animateHotAirBalloon from main frame
  schedules independent requestAnimationFrame(frame)
```

## Consequences

```txt
successful startup has two independent RAF chains
current compatibility chain performs recurring no-target scene traversal
failed startup can retain a live wait loop indefinitely
retry can retain predecessor callbacks
optional legacy installation has no product-mode admission
callbacks have no session, generation, frame-loop ID or disposer
GameHost and telemetry cannot observe hidden callback ownership
```

## Domains in use

```txt
browser shell and Vite/Pages publishing
mutable CDN and runtime admission
module import and compatibility installation
runtime session, startup, failure and frame ownership
legacy Meadow Lift and active Air Mail product sources
keyboard, blur, wheel and variable RAF time
balloon simulation, terrain clearance and snapshots
airstream route, sampler, field, force, visual and debug
mail parcel, route, town, volume, progress, reset and disposal
mission delivery, restart and epoch authority
balloon geometry, materials, rigging, burner, rope and animation
camera follow, basket mode, clipping and zoom
quality, dynamic resolution, sky, weather, clouds and lighting
terrain source, near/horizon streaming, LOD transition and edge policy
vegetation, deterministic grass, culling, water and landmarks
HDR rendering, lens response and renderer diagnostics
Nexus telemetry, HUD, GameHost and headless readback
checks, pure tests, build and Pages deployment
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

The complete names and grouped services are retained in `.agent/kit-registry.json` and the timestamped tracker.

## Services offered

```txt
boot, fatal UI and global host publication
burner, vent, blur and wheel input
balloon simulation, terrain clearance, transforms, snapshots and disposal
airstream validation, sampling, blending, force adaptation, visuals and diagnostics
mail parcel construction, reset, route, town, delivery volume, progress and events
procedural balloon object, envelope, basket, rigging, burner, rope and animation
camera follow, basket blend, zoom, clipping and disposal
quality, atmosphere, terrain, grass, water, landmarks and HDR rendering
Nexus resources/events, telemetry, HUD, GameHost and headless readback
source checks, pure tests, Vite build and Pages deployment
legacy compatibility target discovery, replacement and animation
```

## Required parent domain

```txt
open-above-import-purity-frame-authority-domain
  -> module-side-effect-policy-kit
  -> compatibility-install-command-kit
  -> compatibility-target-discovery-kit
  -> compatibility-install-result-kit
  -> frame-loop-registration-kit
  -> frame-loop-identity-kit
  -> runtime-generation-fence-kit
  -> compatibility-loop-disposal-kit
  -> scene-traversal-budget-kit
  -> startup-failure-loop-retirement-kit
  -> compatibility-observation-kit
  -> import-purity-fixture-kit
  -> browser-frame-owner-smoke-kit
```

## Required invariant

```txt
kit import creates zero recurring work
optional compatibility behavior requires explicit admission
no-compatible-target creates zero recurring work
all RAF callbacks belong to one runtime session and generation
failure and disposal retire every callback before terminal publication
active frame-loop count and owner IDs are observable
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
6. terrain source and LOD transition authority
6a. bounded terrain build and atomic replacement
7. grass spatial culling and backend truth authority
```

Documentation only. No runtime source, package, rendering or deployment behavior changed.