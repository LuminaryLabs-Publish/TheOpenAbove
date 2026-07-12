# Next Steps: TheOpenAbove

**Last aligned:** `2026-07-11T22-51-09-04-00`

## Plan ledger

**Goal:** preserve Air Mail while moving runtime, balloon construction, session, mission, terrain, grass and world-boundary behavior behind explicit authorities and executable gates.

### Checklist

#### Gate 1: immutable runtime admission
- [ ] Pin NexusEngine instead of importing `@main`.
- [ ] Validate Three.js, NexusEngine, ProtoKit and postprocess capabilities before construction.
- [ ] Return typed boot results and module-graph fingerprints.
- [ ] Add `fixture:runtime-admission`.

#### Gate 2: import purity and frame ownership
- [ ] Remove module-scope compatibility work.
- [ ] Register all RAF callbacks through one runtime-session owner.
- [ ] Fence callbacks after stop, failure, retry and disposal.
- [ ] Add import-purity and single-owner fixtures.

#### Gate 2a: balloon model assembly, loading and resources
- [ ] Define a versioned `BalloonModelDescriptor`.
- [ ] Canonicalize, validate, deep-freeze and fingerprint the complete nested profile.
- [ ] Make envelope, mouth, basket, burner frame, rigging, camera focus and materials explicit consumers.
- [ ] Validate shell-to-mouth and gondola-to-rigging attachment contracts.
- [ ] Replace direct `buildHotAirBalloon()` startup use with a session-fenced load command.
- [ ] Build detached candidates and support cancellation, stale rejection and rollback.
- [ ] Produce a complete geometry/material/texture resource inventory.
- [ ] Commit one ready model atomically and acknowledge its first visible frame.
- [ ] Add idempotent disposal and predecessor-retirement results.
- [ ] Add custom-profile, initial-load, cancellation, leak and frame fixtures.

#### Gate 3: lifecycle and teardown
- [ ] Make `createGame()` return a root runtime-session owner.
- [ ] Retain and cancel every frame handle and listener.
- [ ] Compose simulation, camera, mail, airstream, presentation, visual, model and telemetry disposal.
- [ ] Distinguish mission reset from full-runtime restart.
- [ ] Add `fixture:runtime-lifecycle`.

#### Gate 4: fixed-step clock and input
- [ ] Add a session-owned fixed-step clock.
- [ ] Separate simulation tick IDs from render frame IDs.
- [ ] Convert burner, vent and reset transitions into sequenced commands.
- [ ] Add cadence and visibility fixtures.

#### Gate 4a: product and acceptance
- [ ] Add one versioned product manifest and supersession policy.
- [ ] Derive controls, objective, HUD, README and AGENTS projections.
- [ ] Add browser and Pages acceptance fixtures.

#### Gate 5: Air Mail route and delivery
- [ ] Version route, parcel, town and airstream identities.
- [ ] Add mission phases and command/result IDs.
- [ ] Require correct-current proof before delivery.
- [ ] Add wrong-current and duplicate-delivery fixtures.

#### Gate 5a: mission restart
- [ ] Add mission session, epoch and reset transaction identities.
- [ ] Reset simulation, input, airstream, mail, camera, presentation and telemetry atomically.
- [ ] Fence predecessor commands and delivery proof.
- [ ] Correlate the first post-reset tick and frame.

#### Gate 5b: committed observation
- [ ] Add runtime session, mission epoch, simulation tick and render frame IDs.
- [ ] Freeze a render-frame plan after simulation and delivery commit.
- [ ] Replace mutable GameHost subsystem exposure with detached read models.
- [ ] Include committed balloon model identity and resource fingerprint.

#### Gate 6–7a: terrain, grass and world surface
- [ ] Preserve the retained terrain LOD, build, grass spatial and world-surface authority plans.
- [ ] Execute traversal, parity and first-visible-frame fixtures.

## Balloon model kit order

```txt
open-above-balloon-model-assembly-authority-domain
open-above-balloon-model-descriptor-kit
open-above-balloon-model-schema-kit
open-above-balloon-model-id-kit
open-above-balloon-model-version-kit
open-above-balloon-profile-canonicalization-kit
open-above-balloon-profile-admission-kit
open-above-balloon-profile-deep-freeze-kit
open-above-balloon-profile-fingerprint-kit
open-above-balloon-attachment-contract-kit
open-above-balloon-build-plan-kit
open-above-balloon-load-command-kit
open-above-balloon-load-cancellation-kit
open-above-balloon-resource-lease-kit
open-above-balloon-resource-inventory-kit
open-above-balloon-ready-commit-kit
open-above-balloon-load-result-kit
open-above-balloon-disposal-result-kit
open-above-balloon-model-observation-kit
open-above-balloon-frame-ack-kit
open-above-balloon-custom-profile-parity-fixture-kit
open-above-balloon-initial-setup-load-fixture-kit
open-above-balloon-resource-retirement-fixture-kit
open-above-browser-balloon-frame-smoke-kit
```

## Validation order

```txt
fixture:balloon-profile-schema
fixture:balloon-custom-profile-parity
fixture:balloon-attachment-parity
fixture:balloon-initial-setup-load
fixture:balloon-load-cancellation
fixture:balloon-stale-load-rejection
fixture:balloon-resource-inventory
fixture:balloon-resource-retirement
fixture:balloon-first-visible-frame
npm run check
npm run headless:check
npm run build
browser acceptance smoke
Pages model-parity smoke
```
