# Project Breakdown — TheOpenAbove

Timestamp: `2026-07-10T16-20-09-04-00`

## Plan ledger

### Goal

Compare the complete accessible `LuminaryLabs-Publish` inventory against central tracking and root `.agent` state, select one eligible repository, and document its interaction loop, domains, services, kits, and safest next implementation boundary without changing runtime behavior.

### Checklist

- [x] Enumerate the complete accessible Publish inventory.
- [x] Exclude `TheCavalryOfRome`.
- [x] Compare all eligible repositories against `LuminaryLabs-Dev/LuminaryLabs` ledger entries.
- [x] Confirm root `.agent/START_HERE.md` state for all nine eligible repositories.
- [x] Select only one repository.
- [x] Apply the oldest eligible documented fallback rule.
- [x] Read the active route and frame order.
- [x] Read simulation, telemetry, visual, quality, camera, grass, smoke, and headless boundaries.
- [x] Identify the interaction loop.
- [x] Identify all domains in use.
- [x] Identify all kit-provided services.
- [x] Reconcile all active, inactive, implied, and planned kits.
- [x] Add timestamped architecture, render, gameplay, interaction, grass, telemetry, deploy, tracker, and turn-ledger records.
- [x] Refresh required root `.agent` documents.
- [x] Push documentation directly to `main`.
- [x] Prepare the central ledger and internal change-log sync.

## Inventory comparison

```txt
TheOpenAbove       selected / prior 2026-07-10T14-50-38-04-00
PrehistoricRush    tracked / root .agent present / 2026-07-10T14-59-00-04-00
AetherVale         tracked / root .agent present / 2026-07-10T15-09-26-04-00
IntoTheMeadow      tracked / root .agent present / 2026-07-10T15-18-29-04-00
HorrorCorridor     tracked / root .agent present / 2026-07-10T15-31-03-04-00
PhantomCommand     tracked / root .agent present / 2026-07-10T15-38-40-04-00
ZombieOrchard      tracked / root .agent present / 2026-07-10T15-48-18-04-00
TheUnmappedHouse   tracked / root .agent present / 2026-07-10T15-58-47-04-00
MyCozyIsland       tracked / root .agent present / 2026-07-10T16-08-56-04-00
TheCavalryOfRome   excluded by rule
```

No eligible repository was new, central-ledger-missing, or root-`.agent`-missing. `TheOpenAbove` had the oldest eligible central timestamp and was selected as the only product repository for this run.

## Product read

A cinematic hot-air-balloon drift route with keyboard burner/vent input, wheel-driven camera zoom, deterministic wind and buoyancy, a high-fidelity Three.js environment, adaptive render scale, NexusEngine telemetry, HUD/GameHost readback, static smoke checks, and a headless validation adapter.

## Interaction loop

```txt
boot route
  -> create visual environment
  -> build balloon
  -> create simulation, camera, presentation, and telemetry
  -> capture keyboard and wheel state
  -> each animation frame:
       simulation
       object/presentation
       camera
       visual pre-render update
       telemetry tick
       render
       adaptive-resolution sample
       renderer stats
       HUD
  -> expose local and Nexus snapshots through GameHost
```

## Main finding

The runtime does not commit one authoritative frame after rendering. Telemetry samples before render; adaptive resolution changes scale during render; render statistics are written after submission; HUD and local GameHost readback can then combine current render statistics with the pre-sample scale. The Nexus snapshot remains the earlier pre-render publication.

The kit registry also needed correction: the active grass service is the grass-field domain plus six supporting kits, while `open-above-grass-detail-kit` remains source-backed but inactive.

## Next safe ledge

```txt
TheOpenAbove Render Phase Authority Ledger + Adaptive Resolution Fixture Gate
```

## Validation note

Documentation only. No runtime, dependency, script, route, renderer, deployment, branch, or pull-request changes were made. Existing tests were not run because the proposed runtime fixture does not exist and no executable source was changed.