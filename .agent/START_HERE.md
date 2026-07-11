# START HERE: TheOpenAbove

**Last aligned:** `2026-07-11T11-31-06-04-00`

**Repository:** `LuminaryLabs-Publish/TheOpenAbove`

**Branch:** `main`

## Summary

`TheOpenAbove` runs a hot-air-balloon Air Mail mission, but restart is not an authoritative mission transaction. `KeyR` is documented but ignored, the simulation and airstream expose no reset service, and the existing `mail.reset()` only clears parcel fields.

Resetting the parcel while the balloon remains inside Brookhaven allows the next `mail.update()` to deliver it again immediately. The current ledge is a mission epoch and atomic reset contract spanning input, simulation, airstream, mail, camera, presentation, telemetry and the first post-reset frame.

## Current ledge

```txt
TheOpenAbove Air Mail Mission Restart Authority
+ Mission Epoch / Atomic Reset / First Post-Reset Frame Fixture Gate
```

## Required implementation order

```txt
1. Immutable Runtime Admission
2. Import Purity and Frame Ownership
3. Runtime Session Lifecycle and Ordered Disposal
4. Fixed-Step Clock and Sequenced Input
4a. Product Source Supersession and Parity
5. Air Mail Route and Delivery Authority
5a. Air Mail Mission Restart Transaction and Mission Epoch
6. Terrain Surface/Horizon Continuity and Work Budget
```

## Read first

```txt
.agent/trackers/2026-07-11T11-31-06-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-11T11-31-06-04-00.md
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/kit-registry.json
.agent/architecture-audit/2026-07-11T11-31-06-04-00-air-mail-mission-restart-dsk-map.md
.agent/render-audit/2026-07-11T11-31-06-04-00-first-post-restart-frame-correlation-gap.md
.agent/gameplay-audit/2026-07-11T11-31-06-04-00-partial-mail-reset-state-divergence-loop.md
.agent/interaction-audit/2026-07-11T11-31-06-04-00-keyr-reset-command-admission-map.md
.agent/mission-restart-audit/2026-07-11T11-31-06-04-00-mission-epoch-atomic-reset-contract.md
.agent/deploy-audit/2026-07-11T11-31-06-04-00-air-mail-reset-fixture-gate.md
```

Retained prerequisite context:

```txt
.agent/source-authority-audit/2026-07-11T09-21-50-04-00-product-mode-manifest-contract.md
.agent/mail-authority-audit/2026-07-11T05-25-29-04-00-correct-current-delivery-transaction.md
.agent/lifecycle-audit/2026-07-10T21-31-01-04-00-session-frame-listener-resource-contract.md
```

## Selection result

All ten accessible Publish repositories were compared. `TheCavalryOfRome` remains excluded. All nine eligible repositories have central ledger entries and root `.agent` state.

```txt
TheOpenAbove         selected / 2026-07-11T09-21-50-04-00
HorrorCorridor       tracked  / 2026-07-11T09-29-07-04-00
PhantomCommand       tracked  / 2026-07-11T09-40-19-04-00
ZombieOrchard        tracked  / 2026-07-11T10-00-12-04-00
TheUnmappedHouse     tracked  / 2026-07-11T10-18-05-04-00
AetherVale           tracked  / 2026-07-11T10-38-55-04-00
IntoTheMeadow        tracked  / 2026-07-11T10-50-14-04-00
PrehistoricRush      tracked  / 2026-07-11T10-58-10-04-00
MyCozyIsland         tracked  / 2026-07-11T11-19-10-04-00
TheCavalryOfRome     excluded by rule
```

Only `LuminaryLabs-Publish/TheOpenAbove` is in scope for this pass.

## Current restart failure path

```txt
same-page caller invokes GameHost.mail.reset()
  -> parcel becomes in-transit
  -> balloon position, velocity, elapsed and held keys remain
  -> airstream and camera state remain
  -> mission epoch does not change
  -> next mail.update samples the same destination volume
  -> parcel can immediately deliver again
```

## Required restart path

```txt
ResetMission command
  -> session/epoch/lifecycle admission
  -> retire held input and queued commands
  -> stage every mission-owned subsystem reset
  -> advance mission epoch
  -> invalidate predecessor route and delivery proof
  -> atomic commit
  -> first new-epoch simulation tick
  -> first new-epoch rendered frame
  -> typed reset receipt and bounded journal
```

## Current product-source warning

The repository still mixes legacy Meadow Lift source and documentation with the active Air Mail runtime. Do not implement restart against hard-coded Brookhaven or `meadow-lift` identity. First bind reset to the accepted product and mission manifest produced by the product-source authority gate.

## Validation boundary

This pass changed documentation only. No runtime, dependency, rendering, package-script or deployment claim is made.