# Validation: TheOpenAbove

**Last aligned:** `2026-07-11T11-31-06-04-00`

## Scope

Documentation-only audit of the Air Mail mission restart boundary. This pass inspected repository rules, current audit state, runtime composition, balloon input/state, mail reset, delivery admission, airstream state, camera state, telemetry timing and existing smoke coverage.

## Plan ledger

**Goal:** separate source-backed restart findings from executable proof and define the exact fixture gate required before claiming mission restart support.

- [x] Review the complete Publish inventory.
- [x] Compare all eligible repositories with the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `TheOpenAbove`.
- [x] Read `AGENTS.md`, root `.agent` state and package scripts.
- [x] Read `src/main.js`.
- [x] Read balloon simulation input and state ownership.
- [x] Read mail domain, parcel reset and delivery progress.
- [x] Read airstream and camera ownership.
- [x] Read telemetry publication order.
- [x] Read current smoke assertions.
- [x] Identify all domains, kits and services.
- [x] Define mission epoch, reset transaction and first-frame fixtures.
- [x] Change no runtime source, dependency, package script or workflow.
- [x] Create no branch or pull request.

## Source inspection completed

```txt
KeyR consumed: no
ResetMission command: no
mission epoch: no
simulation reset service: no
airstream reset service: no
camera reset service: no
mail parcel reset service: yes
complete mission reset service: no
post-reset delivery lockout: no
first post-reset simulation receipt: no
first post-reset render receipt: no
```

## Source-backed failure case

```txt
place balloon inside destination volume
invoke mail.reset()
assert parcel.delivered becomes false
run one mail.update with unchanged position
parcel can become delivered again
```

This follows directly from parcel-only reset plus destination-volume admission on every update. It has not been executed as a fixture in this documentation pass.

## Existing proof

`npm run check` currently proves source presence and selected implementation patterns. It does not prove:

```txt
KeyR reset behavior
mission epoch creation
atomic subsystem reset
held-input retirement
stale route/delivery proof rejection
reset idempotency
reset rollback
reset-inside-destination behavior
first post-reset frame correlation
browser/GameHost/headless reset parity
```

## Required pure fixtures

```txt
fixture:air-mail-reset-pure
fixture:air-mail-reset-held-input
fixture:air-mail-reset-stale-proof
fixture:air-mail-reset-repeat
fixture:air-mail-reset-rollback
```

## Required host/browser fixtures

```txt
fixture:air-mail-reset-host
fixture:air-mail-reset-keyboard
fixture:air-mail-reset-inside-destination
fixture:air-mail-reset-first-frame
fixture:air-mail-reset-render-failure
```

## Required assertions

```txt
one accepted reset creates one new mission epoch
all mission-owned subsystem state changes atomically
held burner and vent input are neutral
predecessor commands and delivery proof are stale
reset inside Brookhaven cannot immediately redeliver
duplicate command returns the original result
stale epoch rejects without mutation
partial failure yields rollback or terminal failed state
HUD, telemetry, GameHost, headless and canvas agree on epoch
first simulation tick and rendered frame are observable
```

## Commands not run

```txt
npm install
npm run check
npm run build
headless commands
browser smoke
Pages smoke
```

The connector environment provided repository source and write access, not a checked-out browser/GPU runtime. No command execution is claimed.

## Change-state validation

```txt
runtime JavaScript changed: no
package scripts changed: no
dependencies changed: no
route behavior changed: no
gameplay behavior changed: no
render behavior changed: no
deployment workflow changed: no
branch created: no
pull request created: no
.agent documentation changed: yes
```

## Completion boundary

Do not claim restart support because `mail.reset()` exists. Completion requires a fixed-tick, mission-epoch transaction with input retirement, atomic subsystem commit, stale-proof rejection and a correlated first post-reset frame.