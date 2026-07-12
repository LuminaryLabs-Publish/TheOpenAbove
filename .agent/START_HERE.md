# START HERE: TheOpenAbove

**Last aligned:** `2026-07-12T00-39-05-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`  
**Branch:** `main`

## Summary

The current procedural balloon is visually integrated and the color-pattern handoff is present, but model loading still accepts a live mutable profile object. The default root profile aliases mutable nested defaults, is exposed through `window.OpenAboveHotAirBalloonObjectKit.profile`, and is read only after an asynchronous frame yield. No canonical snapshot, schema version, fingerprint, load generation, stale-result rejection, or visible-frame profile receipt proves which profile actually produced the installed balloon.

## Plan ledger

**Goal:** make balloon construction consume one immutable, validated and fingerprinted profile snapshot from load admission through model commit and first visible frame.

- [x] Compare all ten accessible Publish repositories with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` state.
- [x] Select only `TheOpenAbove` as the oldest eligible documented repository.
- [x] Read current root guidance, model source, startup host and proof surface.
- [x] Identify the interaction loop, domains, all active kits and offered services.
- [x] Correct the stale finding that pattern metadata was not passed into the shell builder.
- [x] Define profile snapshot, admission, load-generation, commit and frame-proof contracts.
- [x] Add timestamped architecture and system audits.
- [x] Refresh required root `.agent` state and kit registry.
- [x] Push directly to `main`; create no branch or pull request.
- [ ] Implement the authority and executable mutation-race/browser fixtures.

## Read this first

```txt
.agent/trackers/2026-07-12T00-39-05-04-00/project-breakdown.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/architecture-audit/2026-07-12T00-39-05-04-00-balloon-profile-admission-dsk-map.md
.agent/render-audit/2026-07-12T00-39-05-04-00-model-profile-visible-frame-provenance-gap.md
.agent/gameplay-audit/2026-07-12T00-39-05-04-00-async-profile-mutation-load-loop.md
.agent/interaction-audit/2026-07-12T00-39-05-04-00-profile-load-command-result-map.md
.agent/balloon-profile-audit/2026-07-12T00-39-05-04-00-snapshot-fingerprint-load-generation-contract.md
.agent/deploy-audit/2026-07-12T00-39-05-04-00-balloon-profile-mutation-fixture-gate.md
.agent/turn-ledger/2026-07-12T00-39-05-04-00.md
.agent/kit-registry.json
```

Retained audits remain authoritative for steering, model resource ownership, lifecycle, mission, observation, terrain, grass and world-surface boundaries.

## Interaction loop

```txt
startup
  -> import mutable module-level default profiles
  -> expose kit/profile globals on window
  -> create visual domain
  -> call loadHotAirBalloonModel(undefined, { yieldToFrame: true })
  -> wait one animation frame
  -> read the current default profile object
  -> build envelope, pattern, mouth, seams, basket, rigging and burner
  -> install balloon into the live scene
  -> publish only ready/loading/resource booleans

frame
  -> simulate wind and steering
  -> update model, presentation and camera
  -> render without profile fingerprint or model receipt
```

## Main findings

```txt
root default profile frozen: no
nested root-profile references isolated: no
public global exposes the same root profile: yes
async loader snapshots before yielding: no
schema/version/revision: absent
canonicalization/validation: absent
profile fingerprint: absent
load generation and stale rejection: absent
model commit receipt: absent
visible-frame profile provenance: absent
pattern metadata handoff to shell: present
```

The envelope shape default itself is deeply frozen, but the root model profile, panel profile, pattern profile and palette arrays are not. The initial-level loader yields before construction and then uses the same live object.

## Domains in use

```txt
browser shell, DOM, Vite and Pages
runtime admission, session, failure, RAF ownership and disposal
keyboard, blur, wheel and variable frame time
balloon simulation, airstream force, steering, clearance and snapshots
balloon model profile, assembly, async loading and resources
envelope profile sampling, unified shell, pattern, seams and mouth
basket, burner, rigging, rope and part presentation
camera follow, zoom, clipping and steering look
mail route, town, volume and delivery progress
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

Services cover boot, input, wind-driven simulation, airstream force, mail delivery, model/profile assembly, envelope sampling and shell construction, pattern metadata, mouth/seams, basket/burner/rigging/rope, presentation inertia, camera control, terrain/grass/atmosphere rendering, telemetry, HUD, diagnostics, tests, headless inspection, build and Pages deployment.

## Required parent domain

```txt
open-above-balloon-profile-admission-authority-domain
  -> versioned profile schema
  -> canonical deep clone and validation
  -> immutable admitted profile snapshot
  -> profile identity, revision and fingerprint
  -> async load command and load generation
  -> stale/cancelled result rejection
  -> detached model build plan
  -> atomic model/profile commit receipt
  -> observation and first-visible-frame acknowledgement
  -> mutation-race, alias-isolation and frame-provenance fixtures
```

## Ordered implementation queue

```txt
1. immutable runtime admission
2. import purity and single frame ownership
2a. balloon profile snapshot/admission/fingerprint authority
2b. balloon model assembly/loading/resource authority
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
Canonical Profile Snapshot
+ Version/Fingerprint Admission
+ Async Load Generation Fence
+ Model/Profile Commit Receipt
+ First-Visible-Profile-Frame Fixture Gate
```