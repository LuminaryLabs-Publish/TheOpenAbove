# Project Breakdown: TheOpenAbove Air Mail Restart Authority

**Timestamp:** `2026-07-11T07-18-44-04-00`

## Summary

This run selected `LuminaryLabs-Publish/TheOpenAbove` as the oldest eligible centrally documented Publish repository. The audit found that Air Mail exposes a parcel-only `mail.reset()` but has no browser restart command or composed mission restart transaction. A manual reset at Brookhaven leaves the balloon inside the delivery volume, so the next frame can immediately deliver the parcel again.

## Plan ledger

**Goal:** document one deterministic restart transaction that resets the complete Air Mail mission, creates a new mission epoch, retires stale route/delivery proof, and correlates the first post-restart simulation and rendered frame.

- [x] Enumerate all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Compare all nine eligible repositories with `LuminaryLabs-Dev/LuminaryLabs`.
- [x] Confirm all nine eligible repositories are centrally tracked and have root `.agent` state.
- [x] Select only `TheOpenAbove` by the oldest-documented fallback rule.
- [x] Read `AGENTS.md`, current `.agent` state, current source, tests and central ledger.
- [x] Trace input, simulation, airstream, mail, camera, render, telemetry, HUD and GameHost behavior.
- [x] Identify all active domains, services and kits.
- [x] Trace the existing parcel reset and prove the partial-reset/immediate-redelivery gap from source.
- [x] Define the Air Mail restart DSK boundary and required result contracts.
- [x] Add timestamped architecture, render, gameplay, interaction, reset-authority and deploy audits.
- [x] Refresh required root `.agent` documents.
- [x] Push documentation only to `main`.
- [x] Update the central repository ledger and internal change log.
- [ ] Runtime implementation and executable restart fixtures remain future work.

## Selection result

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or central-ledger-missing repositories: 0
root-undocumented eligible repositories: 0
selected: TheOpenAbove
excluded: TheCavalryOfRome
```

Central timestamps observed before this run:

```txt
TheOpenAbove         2026-07-11T05-25-29-04-00 selected
HorrorCorridor       2026-07-11T05-28-29-04-00
PhantomCommand       2026-07-11T05-50-43-04-00
ZombieOrchard        2026-07-11T06-02-00-04-00
TheUnmappedHouse     2026-07-11T06-21-57-04-00
AetherVale           2026-07-11T06-29-11-04-00
IntoTheMeadow        2026-07-11T06-38-59-04-00
MyCozyIsland         2026-07-11T07-01-49-04-00
PrehistoricRush      2026-07-11T07-08-45-04-00
TheCavalryOfRome     excluded
```

## Primary finding

```txt
mail.reset()
  -> clears parcel delivery fields only
  -> does not reset balloon position or velocity
  -> does not clear simulation elapsed or distance
  -> does not clear held input
  -> does not reset airstream state
  -> does not reset camera state
  -> does not create a mission epoch
  -> does not publish a reset result
```

Because `main.js` calls `mail.update(...)` every frame and delivery currently depends only on destination-volume membership, calling `GameHost.mail.reset()` while the balloon remains inside Brookhaven can cause immediate redelivery on the next frame.

## Required transaction

```txt
ResetMission command
  -> command admission
  -> enter restarting phase
  -> increment mission epoch
  -> retire held input and pending commands
  -> reset simulation position, velocity, time and distance
  -> reset airstream observation state
  -> reset parcel, route proof and delivery state
  -> reset camera/presentation state where required
  -> commit one restart result
  -> commit the first post-restart simulation tick
  -> render and publish one correlated first frame
```
