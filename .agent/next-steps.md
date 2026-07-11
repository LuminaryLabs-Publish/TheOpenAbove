# Next Steps: TheOpenAbove

**Last aligned:** `2026-07-11T14-50-59-04-00`

## Plan ledger

**Goal:** preserve the Air Mail experience while making every externally visible observation refer to one committed simulation tick, delivery result and rendered frame.

### Checklist

#### Gate 1: immutable runtime admission
- [ ] Pin NexusEngine instead of importing `@main`.
- [ ] Validate Three.js, NexusEngine and postprocess capabilities before construction.
- [ ] Return typed boot results and module-graph fingerprints.
- [ ] Add `fixture:runtime-admission`.

#### Gate 2: import purity and frame ownership
- [ ] Remove module-scope compatibility RAF behavior.
- [ ] Move compatibility installation behind an explicit installer.
- [ ] Register every callback with one runtime-session owner.
- [ ] Add `fixture:import-purity`.

#### Gate 3: lifecycle and teardown
- [ ] Make `createGame()` return a root runtime-session owner.
- [ ] Retain and cancel RAF IDs.
- [ ] Compose simulation, camera, mail, airstream, presentation, visual, telemetry and GameHost disposal.
- [ ] Distinguish mission reset from full-runtime restart.
- [ ] Add `fixture:runtime-lifecycle`.

#### Gate 4: fixed-step clock and input admission
- [ ] Add a session-owned fixed-step clock.
- [ ] Separate simulation tick IDs from render frame IDs.
- [ ] Convert burner, vent and reset transitions into sequenced commands.
- [ ] Add `fixture:clock-route-parity`.

#### Gate 4a: product and acceptance authority
- [ ] Add one versioned product manifest and supersession policy.
- [ ] Derive control, objective, HUD, README and AGENTS projections from it.
- [ ] Publish product and acceptance fingerprints.
- [ ] Add browser and Pages acceptance fixtures.

#### Gate 5: Air Mail route and delivery authority
- [ ] Version route, parcel, town and airstream identities.
- [ ] Add mission phases and command/result IDs.
- [ ] Require correct-current proof before delivery.
- [ ] Add route, wrong-current and duplicate-delivery fixtures.

#### Gate 5a: mission restart transaction
- [ ] Add mission session, epoch and reset transaction identities.
- [ ] Reset simulation, input, airstream, mail, camera, presentation and telemetry atomically.
- [ ] Fence predecessor commands and delivery proof.
- [ ] Correlate the first post-reset tick and frame.
- [ ] Add reset-inside-destination and stale-result fixtures.

#### Gate 5b: committed observation frame authority
- [ ] Add `RuntimeSessionId`, `MissionEpoch`, `SimulationTickId` and `RenderFrameId`.
- [ ] Return a typed `DeliveryResult` from mail progression.
- [ ] Freeze a `RenderFramePlan` after simulation and delivery commit.
- [ ] Make `visual.render()` return render submission, renderer statistics and effective-quality results.
- [ ] Project HUD from the same immutable frame plan.
- [ ] Delay telemetry publication until render and HUD acknowledgements are available.
- [ ] Replace mutable GameHost subsystem exposure with detached read models.
- [ ] Publish a `CommittedObservation` with state and frame fingerprints.
- [ ] Keep a bounded frame journal.
- [ ] Reject stale, partial and cross-epoch consumer acknowledgements.
- [ ] Add delivery-to-visible-frame, quality-frame and GameHost-detachment fixtures.

#### Gate 6: terrain surface and horizon authority
- [ ] Add one terrain source revision and fingerprint.
- [ ] Define near/horizon edge and replacement policy.
- [ ] Queue and budget terrain geometry generation.
- [ ] Publish build journals and seam results.
- [ ] Add continuity and work-budget fixtures.

## Observation authority kit order

```txt
1. open-above-runtime-session-observation-id-kit
2. open-above-simulation-tick-receipt-kit
3. open-above-delivery-result-kit
4. open-above-render-frame-id-kit
5. open-above-render-frame-plan-kit
6. open-above-render-submission-result-kit
7. open-above-effective-quality-result-kit
8. open-above-hud-projection-ack-kit
9. open-above-telemetry-publication-barrier-kit
10. open-above-frame-consumer-ack-kit
11. open-above-committed-observation-kit
12. open-above-observation-fingerprint-kit
13. open-above-detached-gamehost-read-model-kit
14. open-above-observation-journal-kit
15. open-above-observation-frame-fixture-kit
```

## Required fixture cases

```txt
delivery event and parcel status appear in the same committed observation
renderer statistics belong to the acknowledged render frame
dynamic-resolution state belongs to the frame after its sample is applied
HUD text and telemetry share one observation revision
GameHost snapshots are detached and immutable
stale acknowledgements cannot commit a successor frame
cross-mission-epoch acknowledgements are rejected
a failed required consumer prevents committed observation publication
```

## Validation order

```txt
fixture:runtime-admission
fixture:import-purity
fixture:runtime-lifecycle
fixture:clock-route-parity
fixture:product-acceptance
fixture:air-mail-route
fixture:air-mail-reset
fixture:observation-order
fixture:delivery-visible-frame
fixture:render-stat-frame
fixture:hud-telemetry-parity
fixture:gamehost-detachment
npm run check
npm run headless:check
npm run build
browser acceptance smoke
Pages acceptance smoke
```

Do not expose a state as committed merely because simulation mutated. Commit external observation only after the required frame consumers acknowledge the same tick and mission epoch.
