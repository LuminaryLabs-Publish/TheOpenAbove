# Validation: TheOpenAbove

**Last aligned:** `2026-07-11T07-18-44-04-00`

## Scope

Documentation-only audit of the active Air Mail restart path. The pass inspected the browser host, balloon simulation, airstream domain, mail parcel/progress/domain code and existing tests. It changed no runtime source or deployment configuration.

## Plan ledger

**Goal:** separate source-backed findings from executable proof and record exactly what the current reset surface establishes.

- [x] Review the complete Publish inventory.
- [x] Compare all eligible repositories with the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `TheOpenAbove`.
- [x] Read repository rules and current `.agent` state.
- [x] Read `src/main.js` and the active RAF composition.
- [x] Read balloon simulation input/state/disposal code.
- [x] Read airstream state/snapshot/disposal code.
- [x] Read mail parcel, progress and domain reset code.
- [x] Read current pure airstream/mail tests.
- [x] Trace the immediate-redelivery failure mode from source.
- [x] Identify all domains, services and kits.
- [x] Define the restart transaction and fixture matrix.
- [x] Change no runtime source, dependency, package script or workflow.
- [x] Create no branch or pull request.
- [x] Push documentation directly to `main`.

## Validation performed

```txt
full Publish inventory reviewed: yes
eligible repositories compared with central ledger: yes
TheCavalryOfRome excluded: yes
selected only TheOpenAbove: yes
AGENTS.md read: yes
current root .agent state read: yes
main composition read: yes
balloon simulation read: yes
airstream domain read: yes
mail parcel/progress/domain reset read: yes
pure airstream/mail tests read: yes
active domains cataloged: yes
active and inactive kits cataloged: yes
kit-family services cataloged: yes
runtime source changed: no
branch created: no
pull request created: no
push target: main
```

## Source-backed findings

The source establishes:

```txt
KeyR has no consumer
mail.reset is callable through the mutable GameHost mail object
mail.reset resets parcel fields and lastEvent only
balloon simulation has no reset method
held input, movement, elapsed and distance survive parcel reset
airstream domain has no reset method
camera and render state are not reset
mail.update runs every RAF
volume membership alone commits delivery
therefore reset inside Brookhaven can immediately redeliver
```

## Existing proof

`tests/airstream-mail.mjs` currently proves:

```txt
identical route samples are deterministic
three altitudes select three routes
route flow points toward its destination
overlap blending produces finite velocity
wrong-town position does not deliver Brookhaven mail
Brookhaven volume membership delivers once
resetMailParcel clears parcel.delivered and parcel.status
```

The test does not construct or reset the full mission graph.

## Existing commands

```txt
npm run check
npm run build
npm run headless:status
npm run headless:inspect
npm run headless:renderer
npm run headless:check
npm run headless:build
```

## Missing fixture commands

```txt
npm run fixture:air-mail-reset-pure
npm run fixture:air-mail-reset-host
npm run fixture:air-mail-reset-held-input
npm run fixture:air-mail-reset-stale-proof
npm run fixture:air-mail-reset-first-frame
npm run fixture:air-mail-reset-repeat
```

## Required fixture evidence

```txt
KeyR creates one ResetMission command
reset advances missionEpoch exactly once
balloon returns to declared initial state
held burner and vent input are retired
route and delivery proof from the old epoch are rejected
reset inside Brookhaven remains undelivered on first post-reset tick
repeated reset follows a deterministic accepted/no-op policy
first simulation tick and first rendered frame identify the new epoch
HUD, telemetry and GameHost match the presented first frame
all observations are bounded, detached and JSON-safe
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
.agent documentation changed: yes
central ledger changed: yes
central internal change log added: yes
```

## Push state

```txt
repo-local docs pushed to main: yes
central ledger updated: yes
central internal change log added: yes
```
