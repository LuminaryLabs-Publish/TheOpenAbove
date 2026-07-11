# Project Breakdown Tracker: TheOpenAbove

**Timestamp:** `2026-07-10T23-20-41-04-00`

## Goal

Reconcile the full `LuminaryLabs-Publish` inventory against the central ledger, select one eligible repository, and document the gap between TheOpenAbove's declared Meadow Lift campaign and the executable Balloon Drift runtime without changing product code.

## Plan ledger

- [x] Enumerate the complete accessible `LuminaryLabs-Publish` repository list.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Compare all nine eligible repositories with `LuminaryLabs-Dev/LuminaryLabs/repo-ledger/LuminaryLabs-Publish/`.
- [x] Confirm all nine eligible repositories are tracked and have root `.agent` state.
- [x] Select only `LuminaryLabs-Publish/TheOpenAbove` by the oldest documented-selection rule.
- [x] Read `AGENTS.md`, `README.md`, campaign/world configuration, route composition, simulation, telemetry, visual composition, smoke checks, package scripts, and existing audits.
- [x] Identify the active interaction loop.
- [x] Identify active, declared, and missing authority domains.
- [x] Catalog active, inactive, implied, and proposed kits.
- [x] Catalog the services currently offered by those kits.
- [x] Add timestamped architecture, render, gameplay, interaction, campaign-authority, and deploy audits.
- [x] Refresh the required root `.agent` files.
- [x] Push only to `main` in `LuminaryLabs-Publish/TheOpenAbove`.
- [x] Update the central repo ledger and internal change log in `LuminaryLabs-Dev/LuminaryLabs`.
- [x] Create no branch or pull request.

## Selection result

The accessible Publish inventory contains:

```txt
AetherVale
HorrorCorridor
IntoTheMeadow
MyCozyIsland
PhantomCommand
PrehistoricRush
TheCavalryOfRome
TheOpenAbove
TheUnmappedHouse
ZombieOrchard
```

`TheCavalryOfRome` remained excluded. No eligible repository was new, ledger-missing, or missing root `.agent` state. The central ledger showed `TheOpenAbove` at `2026-07-10T21-31-01-04-00`, the oldest eligible direct review timestamp at selection, so it was the only product repository changed.

## Interaction loop found

```txt
static ESM resolution
  -> create visual domain, balloon, simulation, camera, presentation, telemetry
  -> publish live GameHost objects
  -> keyboard input changes burner/vent; wheel input changes zoom
  -> primary RAF computes variable dt
  -> simulation updates wind, buoyancy, altitude and distance
  -> balloon/camera/environment/presentation update
  -> telemetry snapshots current aggregate state
  -> renderer submits the frame and samples adaptive resolution
  -> HUD projects drift state
  -> no thermal, gate, perch, timer, completion, unlock, failure or restart authority runs
  -> loop repeats indefinitely
```

## Main finding

The product contract and source configuration describe a Meadow Lift mission with three thermals, five gates, a return-to-perch condition, a time limit, restart, and Cloud Basin unlock. The active runtime only uses the first region ID for telemetry and the world configuration for presentation. It does not instantiate route objectives, evaluate progress, commit mission phases, render objective volumes, accept a restart command, or publish mission results.

## Next safe ledge

```txt
TheOpenAbove Meadow Lift Objective Authority
+ Deterministic Route Fixture Gate
```

This is the first product-behavior gate after immutable runtime admission, import purity/frame ownership, and root session lifecycle are established.
