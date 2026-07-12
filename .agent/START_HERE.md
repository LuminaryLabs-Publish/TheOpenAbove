# START HERE: TheOpenAbove

**Last aligned:** `2026-07-11T22-58-50-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`  
**Branch:** `main`

## Summary

Recent source work added a unified balloon model, limited A/D cross-current steering, separate envelope/gondola inertia and a steering-reactive camera. The model audit remains valid, while this latest audit finds that simulation, root transform, part presentation, camera, HUD, GameHost and the visible frame do not share one committed steering result or reset revision.

## Plan ledger

**Goal:** preserve the wind-driven flight feel and new balloon model while making each steering sample deterministic, resettable, observable and correlated with the exact visible response.

- [x] Compare all ten accessible Publish repositories with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` state.
- [x] Select only `TheOpenAbove` because substantive source commits postdated its prior audits.
- [x] Review the new balloon model, steering, inertia, camera and HUD paths.
- [x] Identify the interaction loop, domains, all active kits and offered services.
- [x] Reconcile the active source-backed count to 59.
- [x] Add timestamped architecture and system audits.
- [x] Refresh required root `.agent` state.
- [x] Push directly to `main`; create no branch or pull request.
- [ ] Implement the authority and executable browser/Pages fixtures.

## Read this first

```txt
.agent/trackers/2026-07-11T22-58-50-04-00/project-breakdown.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/architecture-audit/2026-07-11T22-58-50-04-00-balloon-steering-presentation-dsk-map.md
.agent/render-audit/2026-07-11T22-58-50-04-00-steering-simulation-presentation-frame-gap.md
.agent/gameplay-audit/2026-07-11T22-58-50-04-00-key-trim-flight-response-loop.md
.agent/interaction-audit/2026-07-11T22-58-50-04-00-steering-input-command-result-map.md
.agent/balloon-presentation-audit/2026-07-11T22-58-50-04-00-steering-inertia-camera-coherence-contract.md
.agent/deploy-audit/2026-07-11T22-58-50-04-00-steering-presentation-fixture-gate.md
.agent/turn-ledger/2026-07-11T22-58-50-04-00.md
.agent/kit-registry.json
```

Retained model audit:

```txt
.agent/trackers/2026-07-11T22-51-09-04-00/project-breakdown.md
.agent/architecture-audit/2026-07-11T22-51-09-04-00-balloon-model-assembly-authority-dsk-map.md
.agent/balloon-geometry-audit/2026-07-11T22-51-09-04-00-profile-assembly-loading-resource-contract.md
```

## Interaction loop

```txt
startup
  -> construct visual world and procedural balloon
  -> create simulation, presentation, camera, mail and airstream domains
  -> install ambient keyboard listeners
  -> publish GameHost
  -> start product RAF

frame
  -> sample A/D or arrow key state
  -> smooth lateral trim and derive heading/bank
  -> integrate wind, velocity and position
  -> apply root balloon transform
  -> update burner/rigging animation
  -> smooth envelope and gondola inertia
  -> smooth steering-reactive camera look
  -> update visual domain and Nexus telemetry
  -> render and project HUD
  -> expose partial simulation/camera snapshot
```

## Main findings

```txt
sequenced steering input: absent
typed steering result: absent
simulation steering state: present
root transform response: present
envelope/gondola response: present
camera steering response: present
HUD trim projection: present
shared steering/result/frame revision: absent
presentation and camera readback: incomplete
reset/restart steering transaction: absent
first visible steering-frame receipt: absent
```

The newly active `open-above-balloon-envelope-profile-kit` is now included in the catalog. The integrated pattern kit still produces metadata separately from the unified shell call, leaving the accent-pattern configuration handoff incomplete.

## Domains in use

```txt
browser shell, Vite and Pages
runtime admission, session, failure, RAF ownership and disposal
keyboard, blur, wheel and variable frame time
balloon simulation, airstream force, steering, clearance and snapshots
balloon model descriptor, profile composition and assembly
envelope shape sampling, unified shell, pattern, seams and mouth
basket, burner frame, burners, cylinders, rigging and rope
root transform and envelope/gondola presentation inertia
camera follow, zoom, basket blend, clipping and steering look
mail route, town, volume and delivery progress
bounded terrain, grass, atmosphere, water and HDR
telemetry, HUD, GameHost and headless readback
checks, pure tests, build and deployment
```

## Kits and services

```txt
active source-backed kits: 59
  runtime/gameplay: 15
  balloon/object/presentation: 15
  visual environment: 26
  tooling/proof: 3
runtime-implied adapters: 12
inactive legacy kits: 11
```

Services cover boot, input, wind-driven balloon simulation, steering, airstream force, mail delivery, procedural model/profile assembly, burner and rope animation, part inertia, camera response, terrain/grass/atmosphere rendering, telemetry, HUD, diagnostics, tests, headless inspection, build and Pages deployment.

## Required parent domain

```txt
open-above-balloon-steering-presentation-authority-domain
  -> sequenced steering input and policy admission
  -> typed simulation result
  -> root-transform result
  -> envelope/gondola presentation result
  -> camera steering result
  -> HUD/readback acknowledgement
  -> atomic steering-frame commit
  -> stale-result rejection and reset transaction
  -> journal, deterministic fixture and visible-frame smoke
```

## Ordered implementation queue

```txt
1. immutable runtime admission
2. import purity and single frame ownership
2a. balloon model descriptor, assembly and loading authority
3. runtime session lifecycle and ordered disposal
4. fixed-step clock and sequenced input
4a. product source and acceptance parity
5. Air Mail route and delivery authority
5a. mission restart transaction and epoch
5b. committed observation frame authority
6. terrain source and LOD transition authority
6a. bounded terrain build and atomic replacement
7. grass spatial identity and backend truth
7a. world surface membership and consumer parity
8. balloon steering and presentation authority
```

## Next safe ledge

```txt
Fixed-Step Input Sequence
+ Steering Simulation/Presentation/Camera Commit
+ Reset Neutralization
+ First-Visible-Steering-Frame Fixture Gate
```
