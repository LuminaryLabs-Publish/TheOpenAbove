# Next Steps: TheOpenAbove

**Last aligned:** `2026-07-11T13-10-35-04-00`

## Plan ledger

**Goal:** preserve the Air Mail flight feel while making product identity, controls, objectives, public guidance and acceptance evidence derive from one admitted source.

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

#### Gate 4a: product source and acceptance contract authority

- [ ] Add one versioned product manifest with selected mode, mission and supersession policy.
- [ ] Define an immutable `ControlContract` for burner, vent, zoom and restart availability.
- [ ] Define an immutable `ObjectiveContract` for route capture and Brookhaven delivery.
- [ ] Derive HUD labels and help text from the admitted contracts.
- [ ] Generate README controls/objectives from the admitted contract.
- [ ] Generate AGENTS manual smoke and acceptance criteria from the same contract.
- [ ] Publish product, control, objective and acceptance fingerprints through telemetry and headless tools.
- [ ] Return typed missing, stale, conflicting and mismatched projection results.
- [ ] Add bounded acceptance evidence and parity journals.
- [ ] Add product, controls, objectives, HUD, docs and deployment parity fixtures.

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
- [ ] Wire `KeyR`, GameHost and headless reset through one command adapter only when restart is declared available.
- [ ] Retire held burner/vent input and queued predecessor commands.
- [ ] Add simulation, airstream, mail, camera, presentation and telemetry reset adapters.
- [ ] Stage all subsystem reset state before commit.
- [ ] Advance the mission epoch atomically.
- [ ] Invalidate predecessor route and delivery proof.
- [ ] Block delivery admission until the first post-reset tick commits.
- [ ] Return typed reset results and correlate the first post-reset frame.
- [ ] Prove reset inside Brookhaven cannot immediately redeliver.

#### Gate 6: terrain surface and horizon authority

- [ ] Add one terrain source revision and fingerprint.
- [ ] Define near/horizon edge and replacement policy.
- [ ] Queue and budget terrain geometry generation.
- [ ] Publish build journals and seam results.
- [ ] Add continuity and work-budget fixtures.

## Product acceptance DSK order

```txt
1. open-above-product-mode-admission-kit
2. open-above-acceptance-contract-schema-kit
3. open-above-control-contract-kit
4. open-above-objective-contract-kit
5. open-above-manual-smoke-contract-kit
6. open-above-documentation-projection-kit
7. open-above-agent-guidance-projection-kit
8. open-above-hud-contract-projection-kit
9. open-above-runtime-binding-observation-kit
10. open-above-acceptance-parity-result-kit
11. open-above-acceptance-fingerprint-kit
12. open-above-acceptance-evidence-kit
13. open-above-acceptance-journal-kit
14. open-above-product-acceptance-fixture-kit
15. open-above-browser-acceptance-smoke-kit
16. open-above-pages-acceptance-smoke-kit
```

## Required acceptance cases

```txt
selected product is Air Mail
runtime object type is hot-air-balloon
burner bindings match runtime
vent bindings match runtime
wheel zoom matches runtime
restart is documented only when a ResetMission consumer exists
objective source names Brookhaven and the correct current
HUD contains no independent product/control/objective literals
README and AGENTS are generated from the same contract revision
headless state publishes the same product and acceptance fingerprints
browser smoke performs each declared control and objective step
Pages smoke proves the deployed build reports the same contract
```

## Required mismatch cases

```txt
legacy Meadow Lift copy active under Air Mail mode
README documents a missing control
AGENTS requires a missing objective
HUD mission ID differs from the product manifest
runtime binding is absent for a declared control
source smoke passes while browser acceptance fails
stale documentation revision after a manifest change
partial projection update across README, AGENTS and HUD
```

## Validation order

```txt
fixture:runtime-admission
fixture:import-purity
fixture:runtime-lifecycle
fixture:clock-route-parity
fixture:product-manifest
fixture:acceptance-contract
fixture:control-parity
fixture:objective-parity
fixture:hud-docs-agent-parity
fixture:acceptance-evidence
fixture:air-mail-route
fixture:air-mail-wrong-current
fixture:air-mail-reset-pure
fixture:air-mail-reset-host
fixture:air-mail-reset-keyboard
npm run check
npm run headless:check
npm run build
browser acceptance smoke
Pages acceptance smoke
```

Do not manually repair README, AGENTS and HUD as independent copies. Admit the product contract first, then project every acceptance surface from that source.
