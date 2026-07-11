# Project Breakdown: TheOpenAbove Fixed-Step Simulation Clock Authority

**Timestamp:** `2026-07-11T00-49-45-04-00`

## Plan ledger

### Goal

Reconcile the complete Publish inventory, select exactly one eligible repository, map its interaction loop, domains, services and kits, then define the smallest authority boundary needed to make timed mission behavior deterministic across browser cadence and visibility changes.

### Checklist

- [x] Compared all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Excluded `TheCavalryOfRome`.
- [x] Compared all eligible repositories against the central ledger.
- [x] Confirmed root `.agent` state for all nine eligible repositories.
- [x] Selected only `TheOpenAbove`, the oldest eligible ledger entry.
- [x] Inspected route, simulation, telemetry, camera, campaign source and smoke coverage.
- [x] Identified the interaction loop.
- [x] Identified all domains in use.
- [x] Identified all kit services.
- [x] Identified active, inactive and runtime-implied kits.
- [x] Defined fixed-step clock, visibility and input-admission candidate kits.
- [x] Added architecture, render, gameplay, interaction, time-authority and deploy audits.
- [x] Refreshed the required root `.agent` files.
- [x] Pushed repo-local documentation to `main`.
- [x] Updated the central repository ledger.
- [x] Added the central internal change-log entry.

## Selection comparison

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

## Interaction loop

```txt
RAF now
  -> clamp frame duration
  -> clamp simulation dt
  -> poll keyboard state
  -> mutate physical state and elapsed
  -> update camera/environment/telemetry
  -> render and HUD
  -> next RAF
```

## Main finding

The route has no independent simulation-clock owner. It drops time after slow frames and hidden-tab suspension, samples input once per rendered frame, and gives telemetry only a render-driven frame identity. A fixed-step accumulator, explicit visibility policy, sequenced input admission and separate render/simulation observations are required before the five-minute Meadow Lift limit or objective progression can be authoritative.

## Next safe ledge

```txt
TheOpenAbove Fixed-Step Simulation Clock
+ Visibility/Cadence Parity Fixture Gate
```
