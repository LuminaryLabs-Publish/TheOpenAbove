# START HERE: TheOpenAbove

**Last aligned:** `2026-07-11T22-51-09-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`  
**Branch:** `main`

## Summary

Nine balloon-model source commits landed after the prior audit. They replaced the old envelope construction with a shared spline profile, unified shell, integrated pattern, fitted load tapes, refined mouth, tapered basket, burner frame, twin burners and retained rope geometry. The visual assembly is improved, but production still has no canonical model descriptor, staged initial-level load, resource inventory, disposal result or first-visible-frame proof.

## Plan ledger

**Goal:** preserve the new balloon while making model profile admission, assembly, startup loading, resource ownership and render provenance explicit.

- [x] Compare all 10 Publish repositories with the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central and root `.agent` state.
- [x] Select only `TheOpenAbove`, the oldest ledger entry with nine newer undocumented source commits.
- [x] Review root guidance and the complete balloon construction path.
- [x] Identify the interaction loop, domains, all kits and offered services.
- [x] Add timestamped architecture and system audits.
- [x] Refresh root `.agent` state and kit registry.
- [ ] Implement the model authority and executable fixtures.

## Read this first

```txt
.agent/trackers/2026-07-11T22-51-09-04-00/project-breakdown.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/architecture-audit/2026-07-11T22-51-09-04-00-balloon-model-assembly-authority-dsk-map.md
.agent/render-audit/2026-07-11T22-51-09-04-00-balloon-model-resource-frame-provenance-gap.md
.agent/interaction-audit/2026-07-11T22-51-09-04-00-balloon-load-admission-result-map.md
.agent/balloon-geometry-audit/2026-07-11T22-51-09-04-00-profile-assembly-loading-resource-contract.md
.agent/deploy-audit/2026-07-11T22-51-09-04-00-balloon-model-fixture-gate.md
.agent/turn-ledger/2026-07-11T22-51-09-04-00.md
.agent/kit-registry.json
```

## Interaction loop

```txt
browser boot
  -> create visual domain
  -> synchronously build procedural balloon
  -> allocate envelope, mouth, seam, basket, frame, burner and rope resources
  -> add completed object to the live scene
  -> create simulation, camera and presentation against that object
  -> publish mutable GameHost

balloon construction
  -> root profile selects panel profile as the de facto envelope shape
  -> panel shell, seams and mouth sample the shared envelope profile
  -> basket, burner frame, rigging and ropes use separate coordinate profiles
  -> root marks modelReady and persistentGpuResources without an admission or resource receipt

animation frame
  -> animate burner
  -> update persistent rope geometry
  -> update camera, presentation and world
  -> render without a balloon model/profile/resource fingerprint
```

## Main findings

```txt
new shared envelope profile: present
unified shell and fitted seams: present
profile-aware mouth: present
tapered gondola, frame and twin burner: present
persistent rope geometry: present

canonical root model descriptor: absent
profile schema/version/fingerprint: absent
cross-component attachment admission: absent
production initial-setup load authority: absent
load cancellation/rollback: absent
root resource inventory/dispose: absent
model-to-visible-frame receipt: absent
```

The new `loadHotAirBalloonModel()` helper yields once and then performs the same synchronous build. `src/main.js` still calls `buildHotAirBalloon()` directly.

## Domains in use

```txt
browser shell, Vite and Pages
runtime admission, lifecycle and frame ownership
campaign, world and Air Mail product sources
balloon model descriptor, profile composition and assembly
envelope profile sampling, unified shell, pattern, seams and mouth
basket, burner frame, burners, cylinders, load cables and soft-rope animation
model loading, readiness, cancellation, resource leasing and disposal
balloon simulation, airstream, mail, camera and presentation
terrain, grass, atmosphere, water, HDR and dynamic resolution
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

```txt
runtime boot, fatal projection and global host publication
procedural envelope radius, point, normal, mouth and crown sampling
continuous envelope shell, integrated color pattern and load-tape geometry
open mouth, skirt and inner-shadow construction
tapered basket, reinforced rims, floor, ribs, propane cylinders and controls
burner frame, twin burner assembly, load-cable placement and rope animation
persistent dynamic rope geometry updates
synchronous build, one-frame-yield load helper and compatibility installation
balloon transform, burner animation, presentation and camera focus
simulation, airstream sampling, mail delivery, world rendering and diagnostics
source checks, headless checks, Vite build and Pages deployment
```

## Required parent domain

```txt
open-above-balloon-model-assembly-authority-domain
  -> canonical model descriptor and admitted profile
  -> detached assembly build plan
  -> cross-component attachment validation
  -> initial-level load command and cancellation
  -> resource leases and inventory
  -> atomic scene commit and ready result
  -> model observation and visible-frame acknowledgement
  -> idempotent resource retirement
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
```

## Next safe ledge

```txt
Balloon Model Descriptor + Profile Admission
+ Detached Initial-Setup Load
+ Resource Inventory/Retirement
+ First-Visible-Frame Fixture Gate
```
