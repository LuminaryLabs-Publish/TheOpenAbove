# Project Breakdown: TheOpenAbove Balloon Model Assembly Authority

**Timestamp:** `2026-07-11T22-51-09-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`  
**Branch:** `main`

## Summary

Nine balloon-model source commits landed after the previous repo audit. They introduced a shared envelope profile, unified shell, fitted load tapes, refined mouth, tapered basket, burner frame, twin burners and retained rope geometry. The visual result is materially improved, but the model still has no canonical descriptor, typed admission, staged initial-setup load, resource inventory, disposal result or visible-frame provenance.

## Plan ledger

**Goal:** preserve the improved balloon while making profile composition, model loading, GPU-resource ownership and visible readiness one explicit authority.

- [x] Compare the 10-repository Publish inventory against the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central and root `.agent` coverage.
- [x] Select only `TheOpenAbove`, both the oldest ledger entry and the repo with undocumented source changes.
- [x] Review the nine balloon source commits after the prior audit.
- [x] Trace root profile composition, envelope sampling, shell, seams, mouth, basket, burner, rigging, ropes, loading, main startup and render use.
- [x] Identify the interaction loop, domains, all kits and offered services.
- [x] Define model admission, attachment parity, resource ownership, load commit and frame proof.
- [x] Add timestamped architecture and system audits.
- [ ] Implement runtime changes and executable fixtures.

## Selection

```txt
TheOpenAbove       2026-07-11T21-08-57-04-00 selected; 9 balloon source commits landed after audit
HorrorCorridor     2026-07-11T21-21-12-04-00
PhantomCommand     2026-07-11T21-31-19-04-00
ZombieOrchard      2026-07-11T21-40-49-04-00
TheUnmappedHouse   2026-07-11T21-48-44-04-00
AetherVale         2026-07-11T22-02-01-04-00
IntoTheMeadow      2026-07-11T22-08-13-04-00
MyCozyIsland       2026-07-11T22-20-00-04-00
PrehistoricRush    2026-07-11T22-29-24-04-00
TheCavalryOfRome   excluded
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

## Domains

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

The complete kit census remains in `.agent/kit-registry.json`.

## Main findings

```txt
shared envelope profile kit: present
root canonical model descriptor: absent
profile schema/version/fingerprint: absent
deep-frozen admitted profile: absent
shell/seam/mouth shared sampling: present
gondola attachment derivation from envelope/basket: absent
async load helper: present
production startup uses async load helper: no
staged resource acquisition: absent
cancellation and rollback: absent
root geometry/material inventory: absent
root dispose service: absent
modelReady typed commit: absent
visible-frame model fingerprint: absent
```

`loadHotAirBalloonModel()` yields once and then performs the same synchronous build. `src/main.js` continues to call `buildHotAirBalloon()` directly, so the new loading service is not part of initial level setup.

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

## Required transaction

```txt
BalloonLoadCommand
  -> validate session, generation, model descriptor and expected profile version
  -> canonicalize and deep-freeze the complete model profile
  -> fingerprint envelope, gondola, burner, rigging and material inputs
  -> build a detached assembly candidate
  -> validate attachment points and resource inventory
  -> commit one ready model into the scene
  -> bind simulation, camera and presentation to the committed model
  -> acknowledge the first visible model frame
  -> retire predecessor resources through a typed disposal result
```

## Validation boundary

Documentation only. Runtime source, dependencies, package scripts and deployment configuration were not changed. Existing source-pattern checks do not execute custom-profile parity, load cancellation, resource retirement or first-visible-frame proof.
