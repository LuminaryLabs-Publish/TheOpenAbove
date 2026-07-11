# Next Steps: TheOpenAbove

**Last aligned:** `2026-07-11T11-31-06-04-00`

## Plan ledger

**Goal:** preserve the Air Mail flight feel while implementing one mission restart transaction after product source, route authority and session ownership are established.

### Checklist

#### Gate 1: immutable runtime admission

- [ ] Pin NexusEngine instead of importing `@main`.
- [ ] Validate Three.js, NexusEngine and postprocess capabilities before construction.
- [ ] Return typed boot results and module-graph fingerprints.
- [ ] Add `fixture:runtime-admission`.

#### Gate 2: import purity and frame ownership

- [ ] Remove module-scope compatibility RAF behavior from the balloon object module.
- [ ] Move compatibility installation behind an explicit installer.
- [ ] Register every callback with one runtime session owner.
- [ ] Add `fixture:import-purity`.

#### Gate 3: lifecycle and teardown

- [ ] Make `createGame()` return a root runtime-session owner.
- [ ] Retain and cancel RAF IDs.
- [ ] Compose simulation, camera, mail, airstream, presentation, visual, telemetry and GameHost disposal.
- [ ] Distinguish mission reset from full-runtime restart.
- [ ] Add `fixture:runtime-lifecycle`.

#### Gate 4: fixed-step clock and input admission

- [ ] Add a session-owned monotonic fixed-step clock.
- [ ] Separate simulation tick IDs from render frame IDs.
- [ ] Convert burner, vent and reset key transitions into sequenced commands.
- [ ] Commit held-input state only at tick boundaries.
- [ ] Add `fixture:clock-route-parity`.

#### Gate 4a: product source supersession

- [ ] Admit one versioned product and mission manifest per session.
- [ ] Declare Air Mail's relation to Meadow Lift.
- [ ] Generate controls, HUD and documentation from the accepted source.
- [ ] Publish a product-source fingerprint through telemetry and tools.
- [ ] Add product, mode, control, HUD and documentation parity fixtures.

#### Gate 5: Air Mail route and delivery authority

- [ ] Version route, parcel, town and airstream identities.
- [ ] Add mission phases and command/result IDs.
- [ ] Record route entry, exit, dwell and progression.
- [ ] Require correct-current proof before delivery.
- [ ] Publish bounded mission journals.
- [ ] Add route and wrong-current fixtures.

#### Gate 5a: Air Mail mission restart transaction

- [ ] Add `open-above-mission-restart-authority-domain`.
- [ ] Add `missionSessionId`, `missionEpoch` and `resetTransactionId`.
- [ ] Define a canonical initial mission snapshot from the accepted product manifest.
- [ ] Add a typed `ResetMission` command consumed at a fixed tick boundary.
- [ ] Wire `KeyR`, GameHost and headless reset through one command adapter.
- [ ] Retire held burner/vent input and queued predecessor commands.
- [ ] Add simulation, airstream, mail, camera, presentation and telemetry reset adapters.
- [ ] Stage all subsystem reset state before commit.
- [ ] Advance the mission epoch atomically.
- [ ] Invalidate predecessor route and delivery proof.
- [ ] Block delivery admission until the first post-reset tick commits.
- [ ] Return typed accepted, rejected, duplicate, stale and failed reset results.
- [ ] Record before/after fingerprints and bounded journal rows.
- [ ] Correlate the first post-reset simulation tick and rendered frame.
- [ ] Prove reset inside Brookhaven cannot immediately redeliver.
- [ ] Add pure, host, keyboard, held-input, stale-proof, repeat, rollback and first-frame fixtures.

#### Gate 6: terrain surface and horizon authority

- [ ] Add one terrain source revision and fingerprint.
- [ ] Define near/horizon edge and replacement policy.
- [ ] Queue and budget terrain geometry generation.
- [ ] Publish build journals and seam results.
- [ ] Add continuity and work-budget fixtures.

## Mission restart DSK order

```txt
1. open-above-mission-session-kit
2. open-above-mission-epoch-kit
3. open-above-reset-command-kit
4. open-above-reset-admission-kit
5. open-above-input-retirement-kit
6. open-above-initial-mission-snapshot-kit
7. subsystem reset adapters
8. open-above-reset-transaction-kit
9. open-above-post-reset-delivery-lock-kit
10. open-above-reset-result-kit
11. open-above-reset-journal-kit
12. open-above-first-post-reset-frame-kit
13. open-above-reset-fixture-kit
```

## Reset acceptance cases

```txt
reset during normal flight
reset while burner held
reset while vent held
reset while captured by a current
reset inside destination volume
reset immediately after delivery
repeat same command ID
reset from GameHost
reset from headless environment
```

## Reset rejection and failure cases

```txt
missing command ID
stale mission epoch
future mission epoch
runtime stopped or disposed
reset already in progress
invalid product/mission source
subsystem staging failure
render failure after epoch commit
```

## Acceptance criteria

```txt
one accepted command creates one mission epoch
all mission-owned subsystem states commit together
held and queued predecessor input is retired
predecessor route/delivery proof is stale
reset inside Brookhaven cannot redeliver immediately
repeat command returns the original result without side effects
HUD, telemetry, GameHost and headless observations share the epoch
first post-reset simulation tick and frame are recorded
```

## Validation order

```txt
fixture:runtime-admission
fixture:import-purity
fixture:runtime-lifecycle
fixture:clock-route-parity
fixture:product-manifest
fixture:air-mail-route
fixture:air-mail-wrong-current
fixture:air-mail-reset-pure
fixture:air-mail-reset-host
fixture:air-mail-reset-keyboard
fixture:air-mail-reset-held-input
fixture:air-mail-reset-inside-destination
fixture:air-mail-reset-stale-proof
fixture:air-mail-reset-repeat
fixture:air-mail-reset-rollback
fixture:air-mail-reset-first-frame
npm run check
npm run headless:check
npm run build
browser smoke
Pages smoke
```

Do not wire a direct `KeyR -> mail.reset()` shortcut. Restart must enter the mission transaction authority.