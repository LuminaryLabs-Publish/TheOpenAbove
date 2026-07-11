# Next Steps: TheOpenAbove

**Last aligned:** `2026-07-11T09-21-50-04-00`

## Plan ledger

**Goal:** preserve the Air Mail balloon experience while establishing immutable runtime admission, one session owner, fixed-step commands, one authoritative product source, correct-current delivery, clean restart and bounded terrain work.

### Checklist

#### Gate 1: immutable runtime admission

- [ ] Add a versioned runtime source manifest.
- [ ] Replace NexusEngine `@main` with an immutable coordinate.
- [ ] Validate NexusEngine, Three.js and postprocess capabilities before construction.
- [ ] Return typed boot results and module-graph fingerprints.
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
- [ ] Declare substep, overrun and dropped-time behavior.
- [ ] Convert key transitions into sequenced burner, vent and reset commands.
- [ ] Commit held-input state only at tick boundaries.
- [ ] Keep camera smoothing, visuals and dynamic resolution on render cadence.
- [ ] Add `fixture:clock-route-parity`.

#### Gate 4a: product source supersession authority

- [ ] Add `open-above-product-source-authority-domain`.
- [ ] Create one versioned product manifest.
- [ ] Select one active mode per runtime session.
- [ ] Declare Air Mail as superseding, migrating from or coexisting with Meadow Lift.
- [ ] Archive or adapt legacy Meadow Lift objective/world data explicitly.
- [ ] Add immutable product, mode, objective, route and control revisions.
- [ ] Add a runtime source-selection and admission result.
- [ ] Add one canonical balloon control contract.
- [ ] Project HUD destination and instructions from route/source data.
- [ ] Project README and AGENTS control tables from the accepted contract.
- [ ] Publish source identity through telemetry, GameHost and headless status.
- [ ] Add `fixture:product-manifest`.
- [ ] Add `fixture:mode-supersession`.
- [ ] Add `fixture:control-contract`.
- [ ] Add `fixture:hud-source-parity`.
- [ ] Add `fixture:documentation-parity`.
- [ ] Add `fixture:product-frame-identity`.

#### Gate 5: Air Mail route and delivery authority

- [ ] Move route, parcel, towns and airstream IDs under the accepted product manifest.
- [ ] Add mission, parcel, route, town, command, tick and transaction IDs.
- [ ] Add phases: `ready`, `in-transit`, `approach`, `delivered`, `restarting`, `failed`.
- [ ] Record route entry, exit, dwell and segment progression.
- [ ] Define correct-current proof for `meadow-to-brookhaven`.
- [ ] Reject destination-volume entry without valid route proof.
- [ ] Return accepted, rejected and no-op delivery results.
- [ ] Include selected route and proof range in the delivery receipt.
- [ ] Publish bounded detached mission journals.
- [ ] Add `fixture:air-mail-route` and `fixture:air-mail-wrong-current`.

#### Gate 5a: Air Mail mission restart transaction

- [ ] Add `missionEpoch` and `resetTransactionId` authority.
- [ ] Add a typed `ResetMission` command consumed at a fixed tick boundary.
- [ ] Wire `KeyR` and GameHost/headless reset through the same adapter.
- [ ] Retire held burner/vent input and queued pre-reset commands.
- [ ] Reset balloon, airstream, parcel, route proof, camera and presentation state.
- [ ] Prevent delivery admission until reset staging commits.
- [ ] Commit a typed reset result with before/after fingerprints.
- [ ] Correlate the first post-reset simulation tick and rendered frame.
- [ ] Ensure reset inside Brookhaven cannot immediately redeliver.
- [ ] Add pure, host, held-input, stale-proof, first-frame and repeat-reset fixtures.

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

## Proposed product-source DSKs

```txt
open-above-product-source-authority-domain
open-above-product-manifest-kit
open-above-mode-supersession-kit
open-above-runtime-source-selection-kit
open-above-control-contract-kit
open-above-objective-source-adapter-kit
open-above-product-identity-fingerprint-kit
open-above-source-admission-result-kit
open-above-hud-content-projection-kit
open-above-documentation-projection-kit
open-above-headless-source-observation-kit
open-above-source-parity-fixture-kit
```

## Required source proof

```txt
exactly one mode is admitted
Air Mail relation to Meadow Lift is explicit
runtime region/mode/mission IDs belong to one manifest
HUD destination equals source destination
public controls equal accepted runtime bindings
GameHost, telemetry, headless and rendered frame share one source fingerprint
same manifest creates the same initial state fingerprint
conflicting or incomplete sources reject before runtime construction
```

## Validation order

```txt
fixture:runtime-admission
fixture:import-purity
fixture:runtime-lifecycle
fixture:clock-route-parity
fixture:product-manifest
fixture:mode-supersession
fixture:control-contract
fixture:hud-source-parity
fixture:documentation-parity
fixture:product-frame-identity
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
