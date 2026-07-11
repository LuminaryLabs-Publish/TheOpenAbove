# START HERE: TheOpenAbove

**Last aligned:** `2026-07-11T19-28-28-04-00`

**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

**Branch:** `main`

## Summary

The active Air Mail runtime imports `hot-air-balloon-object-kit.js`, which starts a compatibility `requestAnimationFrame` chain at module evaluation time. The host later starts its own Air Mail RAF. Successful startup therefore leaves a second unowned scene-traversal loop, while failed startup can leave the import-time wait loop polling forever because `window.GameHost` is never published.

## Plan ledger

**Goal:** make reusable kit imports side-effect free and require every recurring callback to be explicitly registered, generation-fenced and retired by one runtime session.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` coverage.
- [x] Reconcile central and repo-local timestamps.
- [x] Select only `TheOpenAbove` as the oldest stable eligible repository.
- [x] Trace module evaluation, GameHost publication, active RAF and compatibility RAF behavior.
- [x] Identify the interaction loop, domains, kits and offered services.
- [x] Define explicit compatibility installation and frame-loop ownership contracts.
- [x] Add timestamped architecture and system audits.
- [x] Refresh required root `.agent` files.
- [x] Push documentation directly to `main` with no branch or pull request.
- [ ] Implement and execute import-purity, single-frame-owner and failed-startup retirement fixtures.

## Read this first

```txt
.agent/trackers/2026-07-11T19-28-28-04-00/project-breakdown.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/architecture-audit/2026-07-11T19-28-28-04-00-import-purity-frame-authority-dsk-map.md
.agent/render-audit/2026-07-11T19-28-28-04-00-orphan-compatibility-scene-traversal-gap.md
.agent/gameplay-audit/2026-07-11T19-28-28-04-00-success-failure-dual-raf-loop.md
.agent/interaction-audit/2026-07-11T19-28-28-04-00-module-import-gamehost-frame-map.md
.agent/import-purity-audit/2026-07-11T19-28-28-04-00-explicit-compatibility-installer-contract.md
.agent/performance-audit/2026-07-11T19-28-28-04-00-per-frame-scene-traversal-work-contract.md
.agent/deploy-audit/2026-07-11T19-28-28-04-00-import-purity-lifecycle-fixture-gate.md
.agent/turn-ledger/2026-07-11T19-28-28-04-00.md
.agent/kit-registry.json
```

## Interaction loop

```txt
module loader
  -> imports hot-air-balloon-object-kit.js
  -> module schedules attachWhenReady RAF

createGame
  -> constructs active Air Mail domains
  -> publishes window.GameHost
  -> schedules active Air Mail RAF

compatibility path
  -> traverses scene for legacy wing/tail vehicle
  -> current Air Mail composition has no active target
  -> starts recurring compatibility tick anyway
  -> traverses scene every frame forever

startup failure before GameHost
  -> showFatal displays error
  -> attachWhenReady continues polling every frame
```

## Main findings

```txt
module-scope RAF: present
explicit compatibility command: absent
compatibility install result: absent
no-target terminal result: absent
frame-loop IDs: absent
runtime-generation fence: absent
compatibility disposer: absent
failed-startup callback retirement: absent
active frame-loop observation: absent
scene-traversal work budget: absent
```

## Domains in use

```txt
browser shell, DOM, Vite and Pages
mutable CDN/runtime admission
module import and compatibility installation
runtime session, startup, failure and frame ownership
legacy Meadow Lift and active Air Mail product sources
input and variable RAF time
balloon simulation and terrain clearance
airstream routing, force, visuals and diagnostics
mail route, parcel, towns, delivery and reset
mission lifecycle, restart and epoch
balloon construction, rigging, burner and animation
camera and presentation
quality, atmosphere, terrain, grass, water and HDR rendering
Nexus telemetry, HUD, GameHost and headless readback
checks, build and deployment
```

## Kits and services

```txt
active source-backed kits: 58
runtime-implied adapters: 12
inactive legacy kits: 11
```

Services cover runtime boot, input, balloon simulation, airstream sampling, mail delivery, procedural balloon construction, camera projection, terrain and grass streaming, atmosphere, rendering, telemetry, HUD, diagnostics, tests, build, headless inspection and Pages deployment. The complete names and per-family mapping are in the timestamped tracker and `.agent/kit-registry.json`.

## Required parent domain

```txt
open-above-import-purity-frame-authority-domain
  -> module side-effect policy
  -> explicit compatibility install command and result
  -> one-shot target discovery
  -> frame-loop identity and registration
  -> runtime-generation fencing
  -> compatibility disposal
  -> startup-failure callback retirement
  -> scene-traversal work observation
  -> import and browser fixture gates
```

## Ordered implementation queue

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

## Next safe ledge

```txt
Import-Pure Balloon Object Kit
+ Explicit Compatibility Installer
+ Single Frame Owner
+ Failed-Startup Zero-Callback Fixture Gate
```