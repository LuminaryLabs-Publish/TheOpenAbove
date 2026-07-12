# START HERE: TheOpenAbove

**Last aligned:** `2026-07-12T02-29-50-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`  
**Branch:** `main`

## Summary

The Air Mail runtime is still publicly exporting its live engine, Three.js, simulation, mission, camera, presentation and renderer owners through `window.GameHost`. This makes the browser-global diagnostics surface a second control plane: same-page code can mutate state, advance simulation, complete or reset delivery, submit frames, corrupt camera values or dispose subsystems outside the host RAF. The current audit defines owner quarantine, capability-scoped commands and one immutable committed read model.

## Plan ledger

**Goal:** preserve useful readback and controlled automation without exposing the mutable owners that define gameplay, mission, rendering and lifecycle authority.

- [x] Compare all ten accessible Publish repositories with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have ledger and root `.agent` coverage.
- [x] Select only `TheOpenAbove` as the oldest eligible documented repository.
- [x] Read current guidance, startup host, RAF loop and exposed domain APIs.
- [x] Identify the interaction loop, domains, all active kits and services.
- [x] Trace public simulation, mission, camera, render and disposal bypasses.
- [x] Define capability, command, epoch, finite-value, result and read-model contracts.
- [x] Add timestamped architecture and system audits.
- [x] Refresh required root `.agent` state and kit registry.
- [x] Push directly to `main`; create no branch or pull request.
- [ ] Implement the gateway and executable browser/Pages isolation fixtures.

## Read this first

```txt
.agent/trackers/2026-07-12T02-29-50-04-00/project-breakdown.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/architecture-audit/2026-07-12T02-29-50-04-00-public-host-capability-authority-dsk-map.md
.agent/render-audit/2026-07-12T02-29-50-04-00-raw-render-owner-host-exposure-gap.md
.agent/gameplay-audit/2026-07-12T02-29-50-04-00-public-owner-bypass-loop.md
.agent/interaction-audit/2026-07-12T02-29-50-04-00-window-gamehost-command-admission-map.md
.agent/host-capability-audit/2026-07-12T02-29-50-04-00-owner-quarantine-read-model-command-contract.md
.agent/deploy-audit/2026-07-12T02-29-50-04-00-public-host-isolation-fixture-gate.md
.agent/turn-ledger/2026-07-12T02-29-50-04-00.md
.agent/kit-registry.json
```

Retained audits remain authoritative for runtime admission, import purity, balloon profile/model ownership, lifecycle, mission reset, committed observation, terrain, grass, world-surface and steering boundaries.

## Interaction loop

```txt
startup
  -> create all live subsystem owners
  -> publish raw owners through window.GameHost
  -> start recursive RAF

RAF
  -> simulation
  -> mail
  -> airstream
  -> balloon and presentation
  -> camera
  -> visual update
  -> telemetry
  -> render
  -> HUD

public path
  -> mutate or invoke any exposed owner between stages
  -> receive no command ID, capability decision, epoch fence or typed result
```

## Current public exposure

```txt
engine, NexusEngine, THREE
scene, renderer, camera, balloon
visual, simulation, airstream, mail
cameraRig, balloonPresentation
getState
```

`getState()` independently samples Nexus telemetry and a new local snapshot. It has no shared `simulationTickId`, `renderFrameId`, `missionEpoch` or state fingerprint.

## Domains in use

```txt
browser shell, Vite and Pages
runtime admission, session, failure and RAF ownership
public host capability and readback
keyboard, blur, wheel and frame time
balloon simulation, airstream, steering and clearance
mail route, town, delivery volume, progress and reset
balloon profile, model assembly, async load and resources
envelope, pattern, seams, mouth, basket, burner, rigging and rope
balloon presentation and camera response
terrain, grass, atmosphere, water, HDR and dynamic resolution
Nexus telemetry, HUD and headless inspection
checks, tests, build and deployment
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

The exact kit names and service map are retained in the current tracker and `.agent/kit-registry.json`.

## Required parent domain

```txt
open-above-public-host-capability-authority-domain
  -> host session identity and capability descriptors
  -> raw owner-handle quarantine
  -> command envelopes, IDs and admission
  -> session, mission and frame revision fences
  -> finite bounded payload policy
  -> typed command results
  -> immutable committed read model
  -> state fingerprint and frame provenance
  -> bounded journal and legacy compatibility adapter
  -> owner-isolation, command and coherence fixtures
```

## Intended public surface

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
5c. public host owner quarantine, command gateway and committed read model
6. terrain source and LOD transition authority
6a. bounded terrain build and atomic replacement
7. grass spatial identity and backend truth
7a. world surface membership and consumer parity
8. balloon steering and presentation authority
```

## Next safe ledge

```txt
Committed Observation Frame
+ Public Owner Quarantine
+ Capability-Scoped Command Admission
+ Immutable Host Read Model
+ Browser and Pages Isolation Fixtures
```