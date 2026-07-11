# Next Steps: TheOpenAbove

**Last aligned:** `2026-07-11T07-18-44-04-00`

## Plan ledger

**Goal:** preserve altitude-routing Air Mail while establishing immutable source admission, one runtime owner, fixed-step commands, correct-current delivery, a complete mission restart and bounded terrain work.

### Checklist

#### Gate 1: immutable runtime admission

- [ ] Add a versioned runtime source manifest.
- [ ] Replace NexusEngine `@main` with an immutable coordinate.
- [ ] Validate NexusEngine, Three.js and postprocess capabilities before construction.
- [ ] Return typed boot results and source fingerprints.
- [ ] Add `fixture:runtime-admission`.

#### Gate 2: import purity and frame ownership

- [ ] Remove module-scope RAF scheduling from the balloon object kit.
- [ ] Move compatibility installation behind an explicit installer.
- [ ] Register every RAF with one session owner.
- [ ] Add session and generation fences.
- [ ] Add `fixture:import-purity`.

#### Gate 3: lifecycle and teardown

- [ ] Make `createGame()` return a root runtime-session owner.
- [ ] Compose simulation, camera, mail, airstream, visual, telemetry and GameHost disposal.
- [ ] Retain and cancel RAF IDs.
- [ ] Add idempotent `stop()`, `dispose()` and full-runtime `restart()`.
- [ ] Retire listeners, geometry, materials and globals before a successor session.
- [ ] Add `fixture:runtime-lifecycle`.

#### Gate 4: fixed-step clock and input admission

- [ ] Add a session-owned monotonic clock adapter.
- [ ] Separate simulation tick IDs from render frame IDs.
- [ ] Use fixed `1/60` simulation ticks with a bounded accumulator.
- [ ] Declare `maxSubsteps`, overrun and dropped-time behavior.
- [ ] Convert key transitions into sequenced burner, vent and reset commands.
- [ ] Commit input state only at tick boundaries.
- [ ] Keep camera smoothing, visuals and dynamic resolution on render cadence.
- [ ] Add `fixture:clock-route-parity` for 20/30/60/120 Hz, stalls and visibility changes.

#### Gate 5: Air Mail route and delivery authority

- [ ] Create one versioned Air Mail manifest for route, parcel, towns and airstream IDs.
- [ ] Declare Meadow Lift as superseded, migrated or separately selectable.
- [ ] Add mission, parcel, route, town, command, tick and transaction IDs.
- [ ] Add phases: `ready`, `in-transit`, `approach`, `delivered`, `restarting`, `failed`.
- [ ] Record route entry, exit, dwell and segment progression.
- [ ] Define correct-current proof for `meadow-to-brookhaven`.
- [ ] Reject destination-volume entry without valid route proof.
- [ ] Return accepted, rejected and no-op delivery results.
- [ ] Include selected route and proof range in the delivery receipt.
- [ ] Project route/parcel/town data into HUD without Brookhaven literals.
- [ ] Publish bounded detached mission journals through telemetry and GameHost.
- [ ] Add `fixture:air-mail-route` and `fixture:air-mail-wrong-current`.

#### Gate 5a: Air Mail mission restart transaction

- [ ] Add `missionEpoch` and `resetTransactionId` authority.
- [ ] Add a typed `ResetMission` command consumed at a fixed tick boundary.
- [ ] Wire `KeyR` and GameHost/headless reset through the same command adapter.
- [ ] Reject stale runtime-session and mission-epoch commands.
- [ ] Enter `restarting` phase before any state mutation.
- [ ] Retire held burner/vent input and queued pre-reset commands.
- [ ] Reset balloon position, velocity, wind, vertical velocity, burner, vent, elapsed and distance.
- [ ] Reset airstream active route, influence, capture state and last sample.
- [ ] Reset parcel, selected route, route proof and delivery results.
- [ ] Reset camera mode, zoom and smoothing state to declared initial values.
- [ ] Prevent delivery admission until reset staging commits.
- [ ] Commit a typed `ResetMissionResult` with before/after fingerprints.
- [ ] Commit and correlate the first post-reset simulation tick and rendered frame.
- [ ] Ensure reset from inside Brookhaven cannot immediately redeliver.
- [ ] Add `fixture:air-mail-reset-pure`.
- [ ] Add `fixture:air-mail-reset-host`.
- [ ] Add `fixture:air-mail-reset-held-input`.
- [ ] Add `fixture:air-mail-reset-stale-proof`.
- [ ] Add `fixture:air-mail-reset-first-frame`.
- [ ] Add `fixture:air-mail-reset-repeat`.

#### Gate 6: terrain surface and horizon authority

- [ ] Extend the terrain descriptor with near and horizon streamer parameters.
- [ ] Publish a shared terrain source revision and fingerprint.
- [ ] Use LOD-invariant authoritative slope sampling.
- [ ] Define near/near, horizon/horizon and near/horizon edge policies.
- [ ] Preflight height, color and normal continuity before replacement.
- [ ] Return typed build results for both streamers.
- [ ] Queue and budget geometry generation across frames or off-thread.
- [ ] Publish active chunk maps, build journals and seam results.
- [ ] Add terrain continuity and work-budget fixtures.

## Proposed restart DSKs

```txt
open-above-mission-epoch-kit
open-above-reset-command-kit
open-above-reset-admission-kit
open-above-input-retirement-kit
open-above-balloon-reset-kit
open-above-airstream-reset-kit
open-above-mail-reset-transaction-kit
open-above-camera-reset-kit
open-above-reset-result-kit
open-above-first-post-reset-frame-kit
open-above-air-mail-restart-fixture-kit
```

## Required restart proof

```txt
one KeyR press produces at most one accepted reset
reset advances missionEpoch exactly once
old input and route proof cannot mutate the successor epoch
balloon returns to the declared start state
first post-reset tick remains undelivered
reset inside Brookhaven does not immediately redeliver
held burner/vent state does not leak across reset
HUD, telemetry, renderer and GameHost identify the same first post-reset frame
same manifest and reset command produce the same successor fingerprint
```

## Validation order

```txt
fixture:runtime-admission
fixture:import-purity
fixture:runtime-lifecycle
fixture:clock-route-parity
fixture:air-mail-route
fixture:air-mail-wrong-current
fixture:air-mail-reset-pure
fixture:air-mail-reset-host
fixture:air-mail-reset-held-input
fixture:air-mail-reset-stale-proof
fixture:air-mail-reset-first-frame
fixture:air-mail-reset-repeat
fixture:terrain-surface
fixture:terrain-near-horizon-seams
fixture:terrain-work-budget
npm run check
npm run headless:check
npm run build
browser smoke
Pages smoke
```
