# START HERE: TheOpenAbove

**Last aligned:** `2026-07-12T04-00-32-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`  
**Branch:** `main`

## Summary

The Air Mail runtime catches startup construction failures, but normal RAF execution runs outside that catch. Any exception during simulation, mail, airstream, balloon, presentation, camera, visual, telemetry, render or HUD stages can stop the frame chain without showing the fatal panel. Because these stages mutate live owners sequentially, the runtime can freeze with state newer than the last canvas or HUD.

## Plan ledger

**Goal:** make every frame-stage failure produce one typed terminal result, one coherent last-known-good visible state and one clean cold-restart boundary.

- [x] Compare all ten accessible Publish repositories with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have ledger and root `.agent` coverage.
- [x] Select only `TheOpenAbove` as the oldest eligible repository.
- [x] Read root guidance, current audits and `src/main.js`.
- [x] Trace startup catch behavior and all ordered frame stages.
- [x] Identify the interaction loop, domains, all active kits and offered services.
- [x] Confirm frame-stage exceptions do not reach `showFatal()`.
- [x] Define frame identity, stage results, failure admission, last-known-good state, quarantine, disposal and restart contracts.
- [x] Add timestamped architecture and system audits.
- [x] Refresh root `.agent` state and kit registry.
- [x] Push directly to `main`; create no branch or pull request.
- [ ] Implement containment and executable browser/Pages failure fixtures.

## Read this first

```txt
.agent/trackers/2026-07-12T04-00-32-04-00/project-breakdown.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/architecture-audit/2026-07-12T04-00-32-04-00-frame-failure-containment-authority-dsk-map.md
.agent/render-audit/2026-07-12T04-00-32-04-00-partial-frame-last-known-good-correlation-gap.md
.agent/gameplay-audit/2026-07-12T04-00-32-04-00-frame-stage-partial-mutation-loop.md
.agent/interaction-audit/2026-07-12T04-00-32-04-00-frame-failure-admission-result-map.md
.agent/frame-failure-audit/2026-07-12T04-00-32-04-00-stage-containment-last-good-restart-contract.md
.agent/deploy-audit/2026-07-12T04-00-32-04-00-frame-failure-containment-fixture-gate.md
.agent/turn-ledger/2026-07-12T04-00-32-04-00.md
.agent/kit-registry.json
```

Retained audits remain authoritative for runtime admission, import purity, balloon profile/model ownership, lifecycle, mission reset, committed observation, public host isolation, terrain, grass, world-surface and steering boundaries.

## Interaction loop

```txt
boot
  -> await createGame
  -> catch startup failures only

frame
  -> simulation
  -> mail
  -> airstream
  -> balloon and presentation
  -> camera
  -> visual update
  -> telemetry
  -> render
  -> HUD
  -> schedule successor RAF

stage failure
  -> exception escapes callback
  -> later stages and successor RAF do not run
  -> fatal panel is not shown
  -> live owners may be partially advanced
  -> canvas, HUD and readback can disagree
```

## Domains in use

```txt
browser shell, Vite and Pages
runtime admission, session, failure and RAF ownership
frame-stage execution, containment and terminal observation
public host capabilities and readback
keyboard, blur, wheel and frame time
balloon simulation, airstream, steering and clearance
mail route, town, delivery volume, progress and reset
balloon profile, model assembly, async loading and resources
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

The exact kit names and per-kit service map are recorded in the current tracker and `.agent/kit-registry.json`.

## Main finding

```txt
showFatal handles createGame rejection
frame callbacks execute later outside boot try/catch
successor RAF is scheduled only after all stages
any stage exception can silently terminate the loop
failed frame has no ID, stage result or terminal observation
last-known-good canvas/HUD/readback is not represented
```

## Required parent domain

```txt
open-above-frame-failure-containment-authority-domain
  -> frame and stage identity
  -> immutable frame execution plan
  -> typed stage and failure results
  -> mutation journal and single failure admission
  -> last-known-good frame retention
  -> mutation quarantine and capability revocation
  -> render freeze and failure overlay
  -> ordered disposal and terminal observation
  -> cold-restart adapter
  -> stage-failure, last-good, HUD and Pages fixtures
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
5c. public host capability authority
5d. frame-stage failure containment and last-known-good authority
6. terrain source and LOD transition authority
6a. bounded terrain build and atomic replacement
7. grass spatial identity and backend truth
7a. world-surface consumer parity
8. balloon steering and presentation authority
```

## Next safe ledge

```txt
Runtime Session Lifecycle
+ Committed Observation Frame
+ Ordered Frame-Stage Results
+ Last-Known-Good Failure Containment
+ Browser and Pages Fault-Injection Fixtures
```