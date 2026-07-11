# Next Steps: TheOpenAbove

**Last aligned:** `2026-07-11T05-25-29-04-00`

## Plan ledger

### Goal

Preserve the new altitude-routing mail game while making runtime admission, frame ownership, fixed-step input, route traversal, correct-current delivery, reset, observations, and near+horizon terrain work deterministic and verifiable.

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

- [ ] Make `createGame()` return a root session owner.
- [ ] Compose simulation, camera, mail, airstream, visual, telemetry and GameHost disposal.
- [ ] Add idempotent `stop()`, `dispose()` and `restart()`.
- [ ] Retire listeners, RAFs, geometry, materials and globals before a successor session.
- [ ] Add `fixture:runtime-lifecycle`.

#### Gate 4: fixed-step clock and input admission

- [ ] Add a session-owned monotonic clock adapter.
- [ ] Separate simulation tick IDs from render frame IDs.
- [ ] Use fixed `1/60` simulation ticks with a bounded accumulator.
- [ ] Declare `maxSubsteps`, overrun and dropped-time behavior.
- [ ] Convert key transitions into sequenced burner/vent/reset commands.
- [ ] Commit input state only at tick boundaries.
- [ ] Keep camera smoothing, visuals and dynamic resolution on render cadence.
- [ ] Add `fixture:clock-route-parity` for 20/30/60/120 Hz, stalls and visibility changes.

#### Gate 5: Air Mail route authority

- [ ] Create one versioned Air Mail manifest for route, parcel, towns and airstream IDs.
- [ ] Declare the previous Meadow Lift campaign as superseded, migrated or separately selectable.
- [ ] Add stable mission, parcel, route, town, command, tick and transaction IDs.
- [ ] Add explicit mission phases: `ready`, `in-transit`, `approach`, `delivered`, `failed`, `restarting`.
- [ ] Record route-entry, route-exit, dwell and segment-progression rows.
- [ ] Define correct-current proof for `meadow-to-brookhaven`.
- [ ] Reject destination-volume entry without valid route proof.
- [ ] Return typed accepted, rejected and no-op delivery results.
- [ ] Include selected route, proof range and destination-volume sample in the delivery receipt.
- [ ] Wire `R` to a typed reset command and new mission epoch.
- [ ] Project route/parcel/town data into HUD without Brookhaven literals.
- [ ] Publish bounded detached mission journals through telemetry and GameHost.
- [ ] Add `fixture:air-mail-route`.
- [ ] Add `fixture:air-mail-wrong-current`.
- [ ] Add `fixture:air-mail-reset`.
- [ ] Add `fixture:air-mail-frame-correlation`.

#### Gate 6: terrain surface and horizon authority

- [ ] Extend the terrain descriptor to include near and horizon streamer parameters.
- [ ] Publish a shared terrain source revision and fingerprint.
- [ ] Use LOD-invariant authoritative slope sampling across near and horizon meshes.
- [ ] Define near/near, horizon/horizon and near/horizon edge policies.
- [ ] Preflight height, color and normal continuity before replacement.
- [ ] Return typed build results for both streamers.
- [ ] Queue and budget geometry generation across frames or move pure generation off-thread.
- [ ] Publish active near/horizon chunk maps, build journals and seam results.
- [ ] Add `fixture:terrain-surface`.
- [ ] Add `fixture:terrain-near-horizon-seams`.
- [ ] Add `fixture:terrain-work-budget`.

## Recommended Air Mail DSKs

```txt
open-above-air-mail-manifest-kit
open-above-air-mail-source-revision-kit
open-above-air-mail-mission-phase-kit
open-above-airstream-traversal-ledger-kit
open-above-airstream-route-proof-kit
open-above-delivery-admission-kit
open-above-delivery-result-kit
open-above-delivery-receipt-kit
open-above-mail-reset-transaction-kit
open-above-air-mail-observation-kit
open-above-air-mail-route-fixture-kit
open-above-air-mail-frame-correlation-fixture-kit
```

## Required route proof

```txt
same manifest and command schedule produce the same mission fingerprint
the correct route can complete Brookhaven delivery
wrong routes cannot complete Brookhaven delivery
ambient arrival cannot complete delivery
route entry, dwell, segment progress and exit rows are ordered and bounded
delivery fires once and includes the route-proof range
R creates a clean mission epoch with no retained route or delivery state
HUD, telemetry, renderer and GameHost identify the same committed mission frame
```

## Validation order

```txt
fixture:runtime-admission
fixture:import-purity
fixture:runtime-lifecycle
fixture:clock-route-parity
fixture:air-mail-route
fixture:air-mail-wrong-current
fixture:air-mail-reset
fixture:air-mail-frame-correlation
fixture:terrain-surface
fixture:terrain-near-horizon-seams
fixture:terrain-work-budget
npm run check
npm run headless:check
npm run build
browser smoke
Pages smoke
```