# START HERE: TheOpenAbove

**Last aligned:** `2026-07-11T00-49-45-04-00`

**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

**Branch:** `main`

## Summary

`TheOpenAbove` is a Vite-hosted Three.js hot-air-balloon drift route with procedural balloon presentation, physical atmosphere, streamed terrain, deterministic grass, adaptive rendering, Nexus telemetry, and GameHost readback.

This pass identifies the deterministic clock boundary required before the authored Meadow Lift mission can become authoritative. The active route advances physics, input sampling, telemetry, and future mission time from one clamped variable `requestAnimationFrame` step.

## Ordered safe ledges

```txt
1. Immutable Runtime Admission + Boot Capability Fixture Gate
2. Import-Pure Balloon Object Kit + Frame Ownership Fixture Gate
3. Runtime Session Lifecycle + Ordered Disposal/Reboot Fixture Gate
4. Fixed-Step Simulation Clock + Visibility/Cadence Parity Fixture Gate
5. Meadow Lift Objective Authority + Deterministic Route Fixture Gate
```

## Selection result

The accessible `LuminaryLabs-Publish` inventory contained ten repositories. `TheCavalryOfRome` remained excluded. All nine eligible repositories were centrally tracked and had root `.agent` state.

```txt
TheOpenAbove         selected / 2026-07-10T23-20-41-04-00
HorrorCorridor       tracked  / 2026-07-10T23-30-13-04-00
PhantomCommand       tracked  / 2026-07-10T23-40-35-04-00
ZombieOrchard        tracked  / 2026-07-10T23-50-53-04-00
TheUnmappedHouse     tracked  / 2026-07-11T00-00-26-04-00
MyCozyIsland         tracked  / 2026-07-11T00-10-28-04-00
AetherVale           tracked  / 2026-07-11T00-18-24-04-00
IntoTheMeadow        tracked  / 2026-07-11T00-30-48-04-00
PrehistoricRush      tracked  / 2026-07-11T00-39-25-04-00
TheCavalryOfRome     excluded by rule
```

`TheOpenAbove` was the oldest eligible entry and the only Publish product changed.

## Read first

```txt
.agent/trackers/2026-07-11T00-49-45-04-00/project-breakdown.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
```

Then read:

```txt
.agent/turn-ledger/2026-07-11T00-49-45-04-00.md
.agent/architecture-audit/2026-07-11T00-49-45-04-00-fixed-step-clock-authority-dsk-map.md
.agent/render-audit/2026-07-11T00-49-45-04-00-render-frame-simulation-tick-separation-gap.md
.agent/gameplay-audit/2026-07-11T00-49-45-04-00-raf-cadence-mission-time-loop.md
.agent/interaction-audit/2026-07-11T00-49-45-04-00-input-sample-tick-admission-map.md
.agent/time-authority-audit/2026-07-11T00-49-45-04-00-visibility-cadence-clock-contract.md
.agent/deploy-audit/2026-07-11T00-49-45-04-00-clock-parity-fixture-gate.md
```

## Active interaction loop

```txt
browser resolves ESM
  -> createGame constructs visual, balloon, simulation, camera, presentation and telemetry
  -> keyboard and wheel listeners sample browser state
  -> RAF computes frameMs from performance.now()
  -> frameMs is capped at 80ms
  -> simulation dt is capped at 1/30 second
  -> simulation, camera, environment and telemetry advance once
  -> renderer submits one frame and HUD projects latest state
  -> next RAF is scheduled
```

## Main finding

The route has no explicit simulation-clock authority. Below 30 Hz, after a long frame, or after hidden-tab suspension, elapsed time is silently discarded. Input is sampled once per RAF and Nexus telemetry advances once per rendered frame. The future five-minute Meadow Lift limit, objective contacts, replay, and same-command determinism would therefore depend on browser cadence and visibility behavior.

## Guardrails

```txt
Push only to main.
Create no branches or pull requests.
Do not work on TheCavalryOfRome.
Preserve the visible Balloon Drift route.
Do not retune simulation, camera, terrain, grass, atmosphere, water, lighting or postprocess.
Separate render frames from fixed simulation ticks.
Keep proof deterministic, bounded and JSON-safe.
```
