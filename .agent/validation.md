# Validation: TheOpenAbove

**Last aligned:** `2026-07-11T14-50-59-04-00`

## Scope

Documentation-only audit of the committed observation boundary. This pass inspected current runtime ordering, Nexus telemetry publication, visual update/render behavior, mail delivery mutation, HUD projection and GameHost readback.

## Plan ledger

**Goal:** distinguish mutable current state from an externally committed visible frame and define the fixture gate required before telemetry or GameHost can claim frame fidelity.

- [x] Review the complete Publish inventory.
- [x] Compare all eligible repositories with the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `TheOpenAbove`.
- [x] Read `src/main.js`.
- [x] Read `src/runtime/balloon-telemetry-kit.js`.
- [x] Read `src/visual/visual-domain.js`.
- [x] Read `src/gameplay/mail-delivery-domain/mail-delivery-domain.js`.
- [x] Identify the interaction loop, domains, kits and services.
- [x] Define observation ordering, delivery/frame, render-stat, HUD/telemetry and GameHost fixtures.
- [x] Change no runtime source, dependency, package script or workflow.
- [x] Create no branch or pull request.

## Source-backed ordering

```txt
simulation.update
mail.update
airstream.update
simulation.applyToBalloon
animateHotAirBalloon
balloonPresentation.update
cameraRig.update
visual.update
engine.tick -> getSnapshot -> Nexus resources/events
visual.render -> composer.render -> resolution.sample -> renderer statistics
updateHud
```

## Source-backed mismatch

```txt
current simulation and delivery state can be published
  with previous render statistics
  before current dynamic-resolution sampling
  before current HUD projection
  without a shared render frame identity
```

This result follows directly from checked-in source order. It was not executed in a browser during this documentation pass.

## Existing proof

`npm run check` runs `tests/smoke.mjs`. The package also exposes headless status/inspect/renderer/check/build commands. No current fixture proves:

```txt
browser RAF to Nexus clock mapping
delivery event to first visible frame
renderer statistics to frame identity
dynamic-resolution decision to effective frame
HUD and telemetry revision parity
required-consumer acknowledgement
GameHost snapshot detachment
cross-epoch stale acknowledgement rejection
deployed Pages observation fingerprint
```

## Required pure fixtures

```txt
fixture:observation-envelope
fixture:simulation-tick-receipt
fixture:delivery-result
fixture:render-frame-plan
fixture:consumer-ack-set
fixture:observation-fingerprint
fixture:detached-read-model
```

## Required host/browser fixtures

```txt
fixture:observation-order
fixture:delivery-visible-frame
fixture:render-stat-frame
fixture:effective-quality-frame
fixture:hud-telemetry-parity
fixture:gamehost-detachment
fixture:stale-frame-ack
fixture:cross-epoch-frame-ack
fixture:headless-committed-observation
fixture:browser-committed-observation
fixture:pages-committed-observation
```

## Commands not run

```txt
npm install
npm run check
npm run build
headless commands
browser smoke
Pages smoke
```

The connector environment provided source and write access, not a checked-out browser/GPU runtime. No command execution is claimed.

## Change-state validation

```txt
runtime JavaScript changed: no
package scripts changed: no
dependencies changed: no
route behavior changed: no
gameplay behavior changed: no
render behavior changed: no
deployment workflow changed: no
branch created: no
pull request created: no
.agent documentation changed: yes
```

## Completion boundary

Do not claim a telemetry or GameHost snapshot represents a committed visible frame until one observation receipt correlates the runtime session, mission epoch, simulation tick, delivery result, render submission, effective quality, HUD projection and required consumer acknowledgements.
