# START HERE: TheOpenAbove

**Last aligned:** `2026-07-10T21-31-01-04-00`

**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

**Branch:** `main`

## Summary

`TheOpenAbove` is a Vite-hosted Three.js hot-air-balloon drift route with procedural balloon presentation, physical atmosphere, streamed terrain, deterministic grass, adaptive rendering, Nexus telemetry and GameHost readback.

The current first blocker remains immutable runtime admission because NexusEngine is imported from mutable `main`. This audit adds a second concrete blocker: importing `hot-air-balloon-object-kit.js` starts an unowned compatibility animation loop at module evaluation time.

## Current safe ledges

```txt
1. TheOpenAbove Immutable Runtime Admission + Boot Capability Fixture Gate
2. TheOpenAbove Import-Pure Balloon Object Kit + Frame Ownership Fixture Gate
3. TheOpenAbove Runtime Session Lifecycle + Ordered Disposal/Reboot Fixture Gate
```

## Selection result

All nine eligible non-Cavalry Publish repositories were tracked and had root `.agent` state. `TheOpenAbove` had the oldest eligible central review timestamp when this pass began. `TheCavalryOfRome` remained excluded.

## Read first

```txt
.agent/trackers/2026-07-10T21-31-01-04-00/project-breakdown.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
```

Then read:

```txt
.agent/turn-ledger/2026-07-10T21-31-01-04-00.md
.agent/architecture-audit/2026-07-10T21-31-01-04-00-import-purity-frame-authority-dsk-map.md
.agent/render-audit/2026-07-10T21-31-01-04-00-hidden-compatibility-raf-render-lifetime-gap.md
.agent/gameplay-audit/2026-07-10T21-31-01-04-00-balloon-route-frame-ownership-loop.md
.agent/interaction-audit/2026-07-10T21-31-01-04-00-import-side-effect-admission-map.md
.agent/lifecycle-audit/2026-07-10T21-31-01-04-00-session-frame-listener-resource-contract.md
.agent/deploy-audit/2026-07-10T21-31-01-04-00-import-purity-frame-lifecycle-fixture-gate.md
```

## Active interaction loop

```txt
static ESM resolution
  -> balloon object module schedules attachWhenReady
  -> createGame constructs the direct-balloon route
  -> GameHost publication
  -> compatibility loop starts despite unsupported legacy host shape
  -> primary route loop advances simulation, camera, visuals, telemetry, render and HUD
```

## Main finding

The reusable balloon object kit mixes pure construction exports with browser auto-install side effects. Its module-scope `requestAnimationFrame(attachWhenReady)` creates hidden process lifetime. For the active route, the legacy vehicle lookup fails, but the compatibility `tick()` still runs every frame forever. No root session owns either RAF, composes kit disposers or publishes terminal lifecycle proof.

## Guardrails

```txt
Push only to main.
Create no branches or pull requests.
Do not work on TheCavalryOfRome.
Preserve the visible Balloon Drift route.
Do not retune simulation, camera, terrain, grass, atmosphere, water, lighting or postprocess.
Keep reusable kits import-pure.
Keep proof deterministic, bounded and JSON-safe.
```