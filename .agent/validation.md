# Validation: TheOpenAbove

**Last aligned:** `2026-07-11T19-28-28-04-00`

## Scope

Documentation-only audit of module-evaluation side effects, compatibility target discovery, active and compatibility RAF ownership, successful-startup hidden work, failed-startup callback retention, scene-traversal cost and disposal proof.

## Plan ledger

**Goal:** separate source-backed control-flow findings from executable proof and define the minimum fixture gate for import purity and one authoritative frame owner.

- [x] Compare the complete Publish inventory and central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `TheOpenAbove`.
- [x] Read current root `.agent` state and retained lifecycle audits.
- [x] Read `src/main.js`.
- [x] Read `src/hot-air-balloon-object-kit.js`.
- [x] Confirm module-scope RAF scheduling.
- [x] Confirm current host owns a separate recursive RAF.
- [x] Confirm no-target compatibility tick still recurs.
- [x] Confirm fatal startup does not retire the wait loop.
- [x] Identify all domains, kits and service families.
- [x] Define pure, browser, lifecycle and Pages fixtures.
- [x] Change no runtime source, dependency, script or workflow.
- [x] Create no branch or pull request.

## Source-backed behavior

```txt
module evaluation
  -> requestAnimationFrame(attachWhenReady)

attachWhenReady without GameHost
  -> requestAnimationFrame(attachWhenReady)

attachWhenReady with GameHost
  -> installHotAirBalloonVisual(host)
  -> requestAnimationFrame(tick)

compatibility tick
  -> findVehicle(host.scene)
  -> scene.traverse(...)
  -> animateHotAirBalloon(balloonOrUndefined)
  -> requestAnimationFrame(tick)

active host frame
  -> animateHotAirBalloon(activeBalloon, now, burner)
  -> render and HUD
  -> requestAnimationFrame(frame)
```

## Source-backed conclusions

```txt
successful current startup creates two recursive RAF chains
current compatibility chain can traverse the scene with no target every frame
failed startup before GameHost publication leaves a recursive wait loop
neither compatibility chain retains a handle or exposes disposal
callbacks carry no runtime generation or owner identity
```

These conclusions follow from checked-in control flow. They were not measured in a browser during this pass.

## Existing proof surface

`npm run check` executes `tests/smoke.mjs`. The current checks do not instrument:

```txt
requestAnimationFrame registration count
module-import side effects
callback ownership
callback cancellation
scene traversal count
failed-startup live work
retry predecessor callbacks
compatibility installation and disposal
Pages frame-owner count
```

## Required pure fixture

```txt
fixture:balloon-kit-import-purity
  import module with instrumented globals
  assert RAF calls = 0
  assert timers = 0
  assert listeners = 0
  assert scene mutations = 0
  assert GameHost reads/polling = 0
```

## Required browser fixtures

```txt
fixture:single-active-frame-owner
fixture:no-target-no-compatibility-loop
fixture:failed-startup-zero-live-callbacks
fixture:retry-no-predecessor-callbacks
fixture:compatibility-single-install
fixture:compatibility-stale-generation
fixture:compatibility-install-and-dispose
fixture:pages-single-frame-owner
```

## Required observations

```txt
runtimeSessionId
runtimeGeneration
frameLoopId
frameLoopOwnerId
frameLoopPurpose
activeFrameLoopCount
scheduledCallbackCount
cancelledCallbackCount
compatibilityInstallResult
compatibilityTargetScanCount
compatibilityNodesVisited
firstCommittedFrameId
terminalFailureOrDisposeResult
```

## Commands not run

```txt
npm install
npm run check
npm run headless:check
npm run build
browser smoke
Pages smoke
```

The connector environment provided repository source and write access, not a checked-out browser runtime. No command execution is claimed.

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

Do not claim import purity until importing `hot-air-balloon-object-kit.js` produces zero RAF registrations and ambient GameHost polling. Do not claim one authoritative runtime frame owner until the browser and deployed Pages fixtures report exactly one required Air Mail loop and zero no-target compatibility callbacks. Do not claim failed-startup cleanup until a failure-injection fixture reports zero live callbacks after terminal failure publication.