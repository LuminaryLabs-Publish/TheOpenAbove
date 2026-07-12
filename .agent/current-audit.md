# Current Audit: TheOpenAbove

**Last aligned:** `2026-07-11T22-51-09-04-00`

## Status

```txt
status: balloon-model-assembly-loading-resource-authority-audited
runtime source changed by this pass: no
branch: main
root .agent state: refreshed
central ledger sync: pending
central internal change log: pending
```

## Summary

The active runtime now builds a materially improved procedural hot-air balloon from a shared envelope sampler, continuous shell, integrated color pattern, fitted load tapes, profile-aware mouth, tapered basket, burner frame, twin burners and persistent dynamic load cables. These pieces are source-backed, but the root assembly remains a mutable profile object constructed synchronously into the live scene without typed admission, staged resource ownership, cancellation, rollback, disposal or frame provenance.

## Plan ledger

**Goal:** make one admitted balloon-model revision authoritative from profile validation through construction, level-start loading, scene commit, animation, observation and retirement.

- [x] Compare the full Publish inventory and central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `TheOpenAbove` because nine balloon source commits landed after its previous audit.
- [x] Read `AGENTS.md`, prior `.agent` state and the post-audit balloon source graph.
- [x] Trace model profile, shell, pattern, seams, mouth, basket, burner frame, burners, ropes, root assembly, load helper, production startup and animation.
- [x] Identify the interaction loop, domains, all kits and service families.
- [x] Define model admission, attachment parity, resource inventory, load commit, disposal and visible-frame contracts.
- [x] Add timestamped tracker and system audits.
- [x] Refresh root `.agent` state and kit registry.
- [ ] Synchronize central ledger and change log.
- [ ] Implement runtime changes and fixtures.

## Source revisions reviewed

```txt
89bbe9ea  shared balloon envelope profile
ce638794  unified envelope mesh
cafc32ac  integrated color pattern
6c81dbab  profile-fitted load tapes
4b40470f  refined profile-aware mouth and skirt
f1391a7f  tapered basket
19138753  burner frame and load cables
c121cbda  twin burner assembly
ca12583b  retained rope geometry
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

## Source-backed findings

```txt
root profile:
  defaultHotAirBalloonProfile is a mutable nested object
  no modelId, schemaVersion, profileVersion or fingerprint
  profile.panels is the de facto shared envelope shape

envelope:
  shared spline sampler is present
  continuous shell and derived normals are present
  color pattern is integrated into shell
  load tapes and mouth consume profile.panels

gondola:
  basket, burner frame, burner and cable coordinates use separate profiles
  no cross-component attachment validator
  camera focus remains a fixed Vector3 offset

loading:
  loadHotAirBalloonModel yields at most one frame
  build still occurs synchronously after the yield
  production main.js does not use the load helper
  no cancellation, progress, staging, rollback or typed load result

resources:
  root sets modelReady and persistentGpuResources metadata
  no complete geometry/material/texture inventory
  no root dispose service or retirement receipt
  no model/resource fingerprint in telemetry or GameHost
```

## Consequences

```txt
custom profiles can produce attachment drift without rejection
level setup cannot await one authoritative model-ready commit
failed or stale model candidates have no rollback boundary
persistent resources have no lifecycle owner
replacement cannot prove predecessor retirement
GameHost cannot identify the model revision visible in a frame
source checks can pass without constructing a custom model
```

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

## Kit inventory

```txt
active source-backed kits: 59
  runtime/gameplay: 15
  balloon/object/presentation: 15
  visual environment: 26
  tooling/proof: 3
runtime-implied adapters: 12
inactive legacy kits: 11
```

## Services offered

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
```

Planned kits:

```txt
open-above-balloon-model-assembly-authority-domain
open-above-balloon-model-descriptor-kit
open-above-balloon-model-schema-kit
open-above-balloon-model-id-kit
open-above-balloon-model-version-kit
open-above-balloon-profile-canonicalization-kit
open-above-balloon-profile-admission-kit
open-above-balloon-profile-deep-freeze-kit
open-above-balloon-profile-fingerprint-kit
open-above-balloon-attachment-contract-kit
open-above-balloon-build-plan-kit
open-above-balloon-load-command-kit
open-above-balloon-load-cancellation-kit
open-above-balloon-resource-lease-kit
open-above-balloon-resource-inventory-kit
open-above-balloon-ready-commit-kit
open-above-balloon-load-result-kit
open-above-balloon-disposal-result-kit
open-above-balloon-model-observation-kit
open-above-balloon-frame-ack-kit
open-above-balloon-custom-profile-parity-fixture-kit
open-above-balloon-initial-setup-load-fixture-kit
open-above-balloon-resource-retirement-fixture-kit
open-above-browser-balloon-frame-smoke-kit
```

## Required invariants

```txt
one canonical, deep-frozen profile drives all model consumers
every attachment contract is validated before live-scene mutation
initial-level loading commits one complete detached candidate atomically
cancelled, failed and stale candidates leak no resources
modelReady derives from a typed committed result
every owned geometry, material and texture appears in one inventory
replacement and disposal are idempotent and ordered
visible frames acknowledge modelId, profileFingerprint and resourceFingerprint
```

## Ordered safe ledges

```txt
1. immutable runtime admission
2. import purity and frame ownership
2a. balloon model assembly/loading/resource authority
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

Documentation only. No runtime, package, render or deployment behavior changed.
