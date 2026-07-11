# START HERE: TheOpenAbove

**Last aligned:** `2026-07-10T23-20-41-04-00`

**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

**Branch:** `main`

## Summary

`TheOpenAbove` is a Vite-hosted Three.js hot-air-balloon drift route with procedural balloon presentation, physical atmosphere, streamed terrain, deterministic grass, adaptive rendering, Nexus telemetry, and GameHost readback.

The infrastructure queue remains immutable runtime admission, import-pure kit composition, and root session lifecycle. This pass adds the first product-behavior blocker after those gates: the authored Meadow Lift mission exists in README/configuration but is not executed by the active runtime.

## Ordered safe ledges

```txt
1. TheOpenAbove Immutable Runtime Admission + Boot Capability Fixture Gate
2. TheOpenAbove Import-Pure Balloon Object Kit + Frame Ownership Fixture Gate
3. TheOpenAbove Runtime Session Lifecycle + Ordered Disposal/Reboot Fixture Gate
4. TheOpenAbove Meadow Lift Objective Authority + Deterministic Route Fixture Gate
```

## Selection result

All nine eligible non-Cavalry Publish repositories were centrally tracked and had root `.agent` state. `TheOpenAbove` had the oldest eligible direct ledger timestamp at selection. `TheCavalryOfRome` remained excluded.

## Read first

```txt
.agent/trackers/2026-07-10T23-20-41-04-00/project-breakdown.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
```

Then read:

```txt
.agent/turn-ledger/2026-07-10T23-20-41-04-00.md
.agent/architecture-audit/2026-07-10T23-20-41-04-00-meadow-lift-objective-authority-dsk-map.md
.agent/render-audit/2026-07-10T23-20-41-04-00-objective-volume-render-consumption-gap.md
.agent/gameplay-audit/2026-07-10T23-20-41-04-00-declared-mission-endless-drift-loop.md
.agent/interaction-audit/2026-07-10T23-20-41-04-00-input-command-objective-result-map.md
.agent/campaign-authority-audit/2026-07-10T23-20-41-04-00-meadow-lift-phase-progress-contract.md
.agent/deploy-audit/2026-07-10T23-20-41-04-00-deterministic-route-fixture-gate.md
```

## Active interaction loop

```txt
browser resolves static ESM graph
  -> createGame builds visual, balloon, simulation, camera, presentation and telemetry
  -> GameHost exposes live objects
  -> keyboard controls burner/vent; wheel controls zoom
  -> primary RAF updates simulation, presentation, camera and environment
  -> telemetry publishes aggregate drift state
  -> visual domain renders and samples frame cost
  -> HUD displays drift status
  -> no mission objective authority runs
  -> drift continues indefinitely
```

## Main finding

The repository declares a Meadow Lift mission with three thermals, five gates, a return-to-perch condition, a five-minute limit, restart behavior, and Cloud Basin unlock. The active simulation only owns wind, buoyancy, altitude, distance, terrain clearance, and burner/vent input. No active kit instantiates or evaluates thermals, gates, perch return, mission phase, completion, failure, unlock, or restart results.

## Guardrails

```txt
Push only to main.
Create no branches or pull requests.
Do not work on TheCavalryOfRome.
Preserve the visible Balloon Drift route.
Do not retune simulation, camera, terrain, grass, atmosphere, water, lighting or postprocess.
Resolve runtime admission and lifecycle ownership before adding mission behavior.
Keep proof deterministic, bounded and JSON-safe.
```
