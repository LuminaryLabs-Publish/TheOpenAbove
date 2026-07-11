# START HERE: TheOpenAbove

**Last aligned:** `2026-07-11T05-25-29-04-00`

**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

**Branch:** `main`

## Summary

`TheOpenAbove` is now an altitude-routing air-mail game. The player carries a Brookhaven parcel, changes altitude with burner and vent, enters one of three visible airstreams, rides the selected current toward a town, and completes delivery inside the destination volume.

This documentation pass reconciles runtime commit `a67cc952995727a3ddb29e61ed66a72f338a58fd`, which added the airstream domain, mail-delivery domain, three town visuals, executable airstream/mail tests, and far-horizon terrain. The route is playable, but delivery authority does not prove that the parcel used the declared correct airstream, the active `CAMPAIGN` identity still reports Meadow Lift, restart is not wired, and the new horizon increases synchronous terrain work without a committed workload result.

## Plan ledger

**Goal:** preserve the new air-mail experience while making route choice, delivery completion, reset, observations, and horizon-terrain consumption deterministic and causally provable.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories with the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm the nine eligible repositories are centrally tracked with root `.agent` state.
- [x] Select only `TheOpenAbove` because its new air-mail runtime commit is newer than the central documentation.
- [x] Trace browser input through simulation, airstream sampling, mail progress, rendering, telemetry, HUD, and GameHost.
- [x] Identify active domains, services, source-backed kits, runtime adapters, inactive legacy kits, and proposed proof kits.
- [x] Add timestamped architecture, render, gameplay, interaction, airstream, mail-authority, terrain, and deploy audits.
- [x] Refresh the required root `.agent` documents.
- [x] Push documentation only to `main`.
- [x] Synchronize the central ledger and internal change log.
- [ ] Runtime implementation and new fixture gates remain future work.

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

`TheCavalryOfRome` was excluded. All nine eligible repositories were already tracked. `TheOpenAbove` was selected because the following runtime commit landed after its `2026-07-11T03-01-38-04-00` central audit:

```txt
a67cc952995727a3ddb29e61ed66a72f338a58fd  feat: add air-mail airstream routes and horizon terrain
```

Only `LuminaryLabs-Publish/TheOpenAbove` was changed in the Publish organization.

## Read first

```txt
.agent/trackers/2026-07-11T05-25-29-04-00/project-breakdown.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
```

Then read:

```txt
.agent/turn-ledger/2026-07-11T05-25-29-04-00.md
.agent/architecture-audit/2026-07-11T05-25-29-04-00-air-mail-route-authority-dsk-map.md
.agent/render-audit/2026-07-11T05-25-29-04-00-airstream-town-horizon-consumption-gap.md
.agent/gameplay-audit/2026-07-11T05-25-29-04-00-altitude-route-delivery-loop.md
.agent/interaction-audit/2026-07-11T05-25-29-04-00-burner-vent-route-admission-map.md
.agent/airstream-system-audit/2026-07-11T05-25-29-04-00-route-field-force-visual-contract.md
.agent/mail-authority-audit/2026-07-11T05-25-29-04-00-correct-current-delivery-transaction.md
.agent/terrain-system-audit/2026-07-11T05-25-29-04-00-horizon-streaming-workload-contract.md
.agent/deploy-audit/2026-07-11T05-25-29-04-00-air-mail-causality-fixture-gate.md
```

## Active interaction loop

```txt
browser resolves Three.js and NexusEngine ESM
  -> visual domain creates near terrain, horizon terrain, atmosphere, grass, water and postprocess
  -> airstream domain creates three deterministic route fields and visible route geometry
  -> mail domain creates one Brookhaven parcel, three towns and delivery volumes
  -> keyboard state drives burner and vent
  -> variable-dt RAF samples the airstream at the balloon position
  -> flow velocity becomes balloon wind and horizontal movement
  -> mail progress records the latest influential route
  -> entering Brookhaven's volume commits delivery
  -> airstream/town/terrain visuals update
  -> telemetry snapshots before render
  -> renderer and HUD update
  -> GameHost exposes live domains and aggregate snapshots
  -> next RAF repeats
```

## Main finding

The route declares `correctAirstreamId: "meadow-to-brookhaven"`, but that value is only stored and projected. `updateDeliveryProgress()` commits delivery whenever the balloon is inside Brookhaven's delivery volume, regardless of the current route or the parcel's previously selected route. Any influential route can overwrite `selectedAirstreamId`, and no route-entry, route-exit, wrong-current rejection, delivery-admission result, mission phase, reset transaction, or bounded event journal exists.

The new pure tests prove deterministic field sampling, volume geometry, and one-shot delivery. They do not prove correct-current causality, wrong-current rejection, route retention, reset from browser input, frame-rate parity, or rendered/telemetry correlation.

## Ordered safe ledges

```txt
1. Immutable Runtime Admission + Boot Capability Fixture Gate
2. Import-Pure Balloon Object Kit + Frame Ownership Fixture Gate
3. Runtime Session Lifecycle + Ordered Disposal/Reboot Fixture Gate
4. Fixed-Step Simulation Clock + Visibility/Input Parity Fixture Gate
5. Air-Mail Route Authority + Correct-Current Delivery Fixture Gate
6. Terrain Surface/Horizon Authority + Continuity/Work-Budget Fixture Gate
```

## Guardrails

```txt
Push only to main.
Create no branches or pull requests.
Do not work on TheCavalryOfRome.
Preserve altitude-only routing: burner and vent choose the current.
Do not add direct left/right steering.
Keep renderer code presentation-only.
Use route, parcel, town and event IDs from versioned data rather than HUD literals.
Require correct-current proof before delivery completion.
Keep proof deterministic, bounded, detached and JSON-safe.
Do not claim browser or deployment success without execution evidence.
```