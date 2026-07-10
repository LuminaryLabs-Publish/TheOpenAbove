# START HERE: TheOpenAbove

**Last aligned:** `2026-07-10T19-18-39-04-00`

**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

**Branch:** `main`

## Summary

`TheOpenAbove` is a Vite-hosted Three.js hot-air-balloon drift route using NexusEngine from a public CDN. The runtime already separates simulation, camera, presentation, visual composition, terrain, deterministic grass, volumetric atmosphere, adaptive resolution, telemetry, smoke validation, and headless commands.

The current blocker is restart-safe session identity. The route has local disposal methods but no root `sessionId` and generation fence. A frame or input callback queued by an old session can remain capable of mutating state after stop, failed startup, or restart, and `GameHost` has no terminal immutable projection.

## Current safe ledge

```txt
TheOpenAbove Session Generation Fence + Terminal GameHost Fixture Gate
```

## Read this first

```txt
.agent/trackers/2026-07-10T19-18-39-04-00/project-breakdown.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
```

Then read:

```txt
.agent/architecture-audit/2026-07-10T19-18-39-04-00-session-generation-fence-dsk-map.md
.agent/render-audit/2026-07-10T19-18-39-04-00-render-generation-terminal-readback-gap.md
.agent/gameplay-audit/2026-07-10T19-18-39-04-00-balloon-session-generation-loop.md
.agent/interaction-audit/2026-07-10T19-18-39-04-00-input-generation-rejection-map.md
.agent/lifecycle-audit/2026-07-10T19-18-39-04-00-session-generation-terminal-gamehost-contract.md
.agent/deploy-audit/2026-07-10T19-18-39-04-00-session-generation-fixture-check-gate.md
.agent/turn-ledger/2026-07-10T19-18-39-04-00.md
```

## Active interaction loop

```txt
route boot
  -> visual construction and resize listener
  -> balloon construction
  -> simulation construction and keyboard/blur listeners
  -> camera construction and wheel listener
  -> presentation and telemetry construction
  -> initial state publication
  -> recursive animation frame
       -> simulation
       -> balloon transform/presentation
       -> camera
       -> visual update
       -> telemetry
       -> render/adaptive scale
       -> HUD
       -> queue next frame
  -> GameHost live-object readback
```

## Missing authority

```txt
no returned root session owner
no retained animation-frame request ID
no sessionId or callback generation token
no stale callback rejection
no reverse-order partial-start rollback
no terminal GameHost snapshot
no root listener/resource ownership ledger
no lifecycle fixture
```

## Existing local disposal

```txt
simulation.dispose() -> keyboard and blur listeners
cameraRig.dispose() -> wheel listener
visual.dispose() -> resize listener plus grass, terrain and composer cleanup
```

The missing work is composition, generation fencing, terminal readback, and proof.

## Guardrails

```txt
Push only to main.
Do not create branches or pull requests.
Do not work on TheCavalryOfRome.
Preserve the visible route and current GameHost fields additively.
Invalidate generation before cancellation or teardown.
Keep stop/dispose idempotent.
Keep journals bounded, deterministic and JSON-safe.
Do not retune simulation, camera, terrain, grass, atmosphere, water, lighting, postprocess or quality thresholds.
```
