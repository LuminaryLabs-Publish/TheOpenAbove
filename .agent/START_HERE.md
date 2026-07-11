# START HERE: TheOpenAbove

**Last aligned:** `2026-07-10T19-58-34-04-00`

**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

**Branch:** `main`

## Summary

`TheOpenAbove` is a Vite-hosted Three.js hot-air-balloon drift route with separated simulation, camera, presentation, visual environment, deterministic streamed grass, adaptive resolution, Nexus telemetry, GameHost readback, smoke checks, and headless commands.

The current blocker is runtime dependency admission. Three.js is version-pinned, but NexusEngine is imported from the mutable `main` branch. Static module resolution happens before the route-level `try/catch`, so an unavailable or incompatible remote module can prevent both runtime construction and the existing error panel.

## Current safe ledge

```txt
TheOpenAbove Immutable Runtime Admission + Boot Capability Fixture Gate
```

The existing session-generation and terminal-GameHost plan remains the immediate consumer after admission succeeds.

## Selection result

The complete accessible `LuminaryLabs-Publish` inventory was compared with the central ledger and root `.agent` state. All nine eligible non-Cavalry repositories were tracked. `TheOpenAbove` was selected because its repo-local audit had advanced to `2026-07-10T19-18-39-04-00` while the central ledger still reported `2026-07-10T17-51-35-04-00`, leaving its current state centrally undocumented. `TheCavalryOfRome` remained excluded.

## Read this first

```txt
.agent/trackers/2026-07-10T19-58-34-04-00/project-breakdown.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
```

Then read:

```txt
.agent/turn-ledger/2026-07-10T19-58-34-04-00.md
.agent/architecture-audit/2026-07-10T19-58-34-04-00-runtime-admission-authority-dsk-map.md
.agent/render-audit/2026-07-10T19-58-34-04-00-source-provenance-render-boot-gap.md
.agent/gameplay-audit/2026-07-10T19-58-34-04-00-balloon-runtime-admission-loop.md
.agent/interaction-audit/2026-07-10T19-58-34-04-00-input-admission-readiness-map.md
.agent/runtime-admission-audit/2026-07-10T19-58-34-04-00-immutable-cdn-capability-contract.md
.agent/deploy-audit/2026-07-10T19-58-34-04-00-runtime-admission-build-pages-gate.md
```

## Active interaction loop

```txt
browser resolves static ESM graph
  -> Three.js 0.165.0 URL
  -> NexusEngine @main URL
  -> local modules
  -> create visual, balloon, simulation, camera, presentation and telemetry
  -> install resize, keyboard, blur and wheel listeners
  -> seed initial state
  -> recursive animation frame
       -> simulation
       -> balloon presentation
       -> camera
       -> visual environment
       -> telemetry
       -> render/adaptive scale
       -> HUD
       -> next frame
  -> GameHost live-object readback
```

## Main finding

```txt
NexusEngine source is mutable for a fixed TheOpenAbove commit.
No source manifest records the exact resolved NexusEngine revision.
No capability preflight validates the NexusEngine APIs consumed by telemetry.
Static import failures occur before createGame() and its try/catch.
The local smoke and headless checks do not resolve the remote runtime graph.
GameHost and HUD expose no source coordinate, capability result, boot status or source fingerprint.
```

## Required order

```txt
immutable source manifest
  -> dependency admission
  -> capability preflight
  -> boot transaction and proof
  -> sessionId/generation allocation
  -> frame/listener/resource ownership
  -> terminal GameHost lifecycle proof
```

## Guardrails

```txt
Push only to main.
Do not create branches or pull requests.
Do not work on TheCavalryOfRome.
Preserve the visible Balloon Drift route.
Do not retune simulation, camera, terrain, grass, atmosphere, water, lighting, postprocess or quality thresholds.
Keep proof bounded, deterministic and JSON-safe.
Reject mutable required production sources.
Do not allocate a runtime session before required capability admission passes.
```