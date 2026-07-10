# START HERE: TheOpenAbove

**Last aligned:** `2026-07-10T17-51-35-04-00`

**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

**Branch:** `main`

## Summary

`TheOpenAbove` is a Vite-hosted cinematic hot-air-balloon drift route using Three.js and NexusEngine from public CDN imports. It already has separated simulation, camera, presentation, visual, terrain, grass, volumetric atmosphere, adaptive quality, telemetry, smoke, and headless-editor boundaries.

The newest audit finding is a root runtime-lifecycle gap. The route constructs a complete session, installs global listeners, starts recursive animation frames, and publishes live objects through `GameHost`, but it has no composed owner that can stop, dispose, roll back, or restart that session.

## Current safe ledge

```txt
TheOpenAbove Runtime Session Lifecycle Authority + Dispose/Reboot Fixture Gate
```

The previously documented frame-phase authority remains required, but its frame IDs should be scoped under a lifecycle-owned `sessionId`.

## Read this first

```txt
.agent/trackers/2026-07-10T17-51-35-04-00/project-breakdown.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
```

Then read:

```txt
.agent/architecture-audit/2026-07-10T17-51-35-04-00-runtime-session-lifecycle-authority-dsk-map.md
.agent/render-audit/2026-07-10T17-51-35-04-00-renderer-resource-disposal-coverage-gap.md
.agent/gameplay-audit/2026-07-10T17-51-35-04-00-balloon-session-start-frame-stop-loop.md
.agent/interaction-audit/2026-07-10T17-51-35-04-00-listener-ownership-restart-result-map.md
.agent/lifecycle-audit/2026-07-10T17-51-35-04-00-runtime-session-teardown-reboot-contract.md
.agent/deploy-audit/2026-07-10T17-51-35-04-00-lifecycle-restart-fixture-check-gate.md
.agent/turn-ledger/2026-07-10T17-51-35-04-00.md
```

## Active session loop

```txt
createGame()
  -> create visual domain and install resize listener
  -> create balloon
  -> create simulation and install keydown/keyup/blur listeners
  -> create camera rig and install wheel listener
  -> create presentation and telemetry
  -> seed initial state
  -> requestAnimationFrame recursion
       -> simulation
       -> transform/presentation
       -> camera
       -> visual update
       -> telemetry
       -> render/adaptive resolution
       -> HUD
  -> window.GameHost live-object readback
```

## Missing end loop

```txt
no returned session owner
no retained animation-frame request ID
no cancelAnimationFrame path
no route-level call to simulation.dispose()
no route-level call to cameraRig.dispose()
no route-level call to visual.dispose()
no partial-start rollback
no GameHost stop/dispose/restart surface
no lifecycle journal or fixture
```

## Local teardown capability already present

```txt
simulation.dispose() -> keyboard/blur listeners
cameraRig.dispose() -> wheel listener
visual.dispose() -> resize listener plus grass/terrain/composer cleanup
composer.dispose() -> depth textures, target, composer
```

The problem is composition and proof, not the total absence of disposal primitives.

## Main finding

The runtime assumes one page load, one session, and no teardown. Re-running `createGame()` in HMR, repeated browser fixtures, or an explicit restart can create parallel frame loops and duplicate global listeners. A fatal error after partial construction displays the error but does not roll back already-created listeners or resources.

## Guardrails

```txt
Push only to main.
Do not create branches or pull requests.
Do not work on TheCavalryOfRome.
Do not retune simulation, camera, terrain, clouds, water, grass, lighting, post-process, or quality thresholds during lifecycle work.
Preserve current GameHost fields additively.
Keep stop/dispose idempotent.
Keep lifecycle rows bounded, deterministic, and JSON-safe.
Allow only one active session/frame chain per canvas.
Do not delete the inactive grass-detail implementation during this pass.
```
