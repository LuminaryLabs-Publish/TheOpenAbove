# Validation: TheOpenAbove Device-Control Action Coverage

**Last aligned:** `2026-07-15T16-58-19-04-00`

## Scope

Documentation-only audit of the full Publish selection comparison, TheOpenAbove interaction loop, 101-surface inventory, HTML input surface, keyboard flight state, wheel camera zoom, map keyboard control, missing touch/gamepad/on-screen producers, required device-control authority, browser fixtures, and central tracking.

## Plan ledger

**Goal:** distinguish the source-backed action-coverage gap from unproven physical-device behavior and define the exact executable proof required before support claims.

- [x] Enumerate all 11 accessible Publish repositories.
- [x] Exclude TheCavalryOfRome.
- [x] Confirm ten eligible central ledgers, root `.agent` states, and synchronized heads.
- [x] Confirm no new, missing, undocumented, root-agent-missing, or runtime-ahead repository.
- [x] Select TheOpenAbove by the oldest synchronized eligible rule.
- [x] Inspect HTML, main host, balloon simulation, camera rig, map overlay, package scripts, workflow, current audits, and registry.
- [x] Preserve all domains, kits, adapters, providers, and services.
- [x] Add and route the timestamped device-control audit family.
- [ ] Execute physical-device browser, build, artifact, and Pages fixtures.

## Source inspection performed

```txt
LuminaryLabs-Publish organization inventory
LuminaryLabs-Dev/LuminaryLabs Publish repo ledgers
all ten eligible current repository heads
TheOpenAbove root .agent documents latest tracker and kit registry
index.html
src/main.js
src/runtime/balloon-simulation-kit.js
src/visual/camera-presentation/balloon-camera-rig-kit.js
src/ui/parchment-map-overlay.js
package.json
.github/workflows/deploy-pages.yml
```

## Confirmed by inspection

```txt
reviewed pre-audit repository head: 86d3847e89a148671dca8487a9afbbb0a1e04951
reviewed runtime source revision: 1417c80309218c7c61def3b2f09a977eaab8b953
runtime-ahead eligible repositories: 0
selected by oldest synchronized rule: yes
canvas touch-action none: yes
keyboard burner vent steering producer: yes
wheel zoom producer: yes
keyboard map toggle and close producer: yes
pointer or touch flight producer: no
gamepad flight producer: no
on-screen flight map or zoom controls: no
complete profile admission result: no
hybrid duplicate suppression: no
FirstDeviceControlSurfaceFrameAck: no
FirstDeviceActionEffectFrameAck: no
```

## What source inspection proves

```txt
flight action state is currently derived from a global keyboard key set
camera zoom is currently mutated by a global wheel listener
map state is currently mutated by M and Escape
no active current-route pointer touch or gamepad producer was found
no current on-screen controls were found
no authority verifies complete action coverage before a profile is used
the touch-only path has no intentional flight map or zoom action producer
```

## What is not proven

```txt
physical touch-device behavior
browser gesture compatibility
control ergonomics or hit-target quality
gamepad compatibility
keyboard-only route completion without wheel input
hybrid producer behavior
stuck-action or duplicate-action behavior
same-seed completion parity across devices
production artifact or Pages behavior
production readiness
```

## Required fixtures

```txt
keyboard plus wheel desktop
keyboard-only desktop with zoom fallback
phone portrait touch
phone landscape touch
tablet touch
multi-touch steering and zoom conflict
gamepad connect use and disconnect
keyboard plus touch hybrid
keyboard plus gamepad hybrid
pointercancel touchcancel blur visibility pagehide
map open close and overlay ownership
orientation viewport and safe-area changes
runtime replacement and retirement
same seeded delivery completion per admitted profile
FirstDeviceControlSurfaceFrameAck
FirstDeviceActionEffectFrameAck
source dist artifact Pages identity comparison
```

## Change scope

```txt
documentation changed: yes
runtime JavaScript changed: no
HTML or CSS changed: no
shader changed: no
gameplay changed: no
render behavior changed: no
packages or dependencies changed: no
tests or workflows changed: no
deployment changed: no
branch created: no
pull request created: no

npm run check: not run
npm run build: not run
physical-device browser fixture: not run
gamepad fixture: not run
hybrid-input fixture: not run
artifact downloaded: no
Pages URL fetched: no
```

## Claims intentionally withheld

No claim is made for touch playability, gamepad support, keyboard-only completeness, hybrid-input safety, action cancellation, visible-control correctness, action-effect convergence, artifact parity, deployed parity, or production readiness.
