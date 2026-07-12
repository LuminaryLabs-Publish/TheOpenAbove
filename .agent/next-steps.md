# Next Steps: TheOpenAbove

**Last aligned:** `2026-07-12T00-39-05-04-00`

## Plan ledger

**Goal:** move runtime boot, balloon profile admission, model loading, lifecycle, simulation and visible presentation behind explicit authorities and executable gates.

### Checklist

#### Gate 1: immutable runtime admission
- [ ] Pin NexusEngine instead of importing `@main`.
- [ ] Validate Three.js, NexusEngine and required product capabilities before construction.
- [ ] Return typed boot results and a module-graph fingerprint.
- [ ] Add `fixture:runtime-admission`.

#### Gate 2: import purity and frame ownership
- [ ] Remove module-scope compatibility work and mutable public defaults.
- [ ] Register all RAF callbacks through one runtime-session owner.
- [ ] Fence callbacks after stop, failure, retry and disposal.
- [ ] Add import-purity and single-owner fixtures.

#### Gate 2a: balloon profile snapshot and admission
- [ ] Define a versioned schema for the complete nested balloon profile.
- [ ] Deep-clone at command admission before any asynchronous yield.
- [ ] Canonicalize numeric fields, arrays, palette values and profile points.
- [ ] Validate cross-component profile inputs and reject invalid values.
- [ ] Deep-freeze the admitted snapshot.
- [ ] Assign profile ID, version, revision and deterministic fingerprint.
- [ ] Remove mutable canonical profile exposure from `window`.
- [ ] Add default-alias isolation and mutation-during-yield fixtures.

#### Gate 2b: balloon model assembly, loading and resources
- [ ] Build only from an admitted profile snapshot.
- [ ] Allocate load command and load-generation identities.
- [ ] Reject cancelled and stale generations before scene mutation.
- [ ] Build detached from the live scene and collect a complete resource inventory.
- [ ] Atomically install the model and profile receipt.
- [ ] Add rollback, disposal and first-visible-profile-frame proof.

#### Gate 3: lifecycle and teardown
- [ ] Make `createGame()` return a root runtime-session owner.
- [ ] Retain and cancel every frame handle and listener.
- [ ] Compose simulation, camera, mail, airstream, presentation, visual, model and telemetry disposal.
- [ ] Add `fixture:runtime-lifecycle`.

#### Gate 4: fixed-step clock and sequenced input
- [ ] Add a session-owned fixed-step clock.
- [ ] Separate simulation tick IDs from render frame IDs.
- [ ] Convert burner, vent, steering and reset transitions into sequenced commands.
- [ ] Add cadence, visibility, stale and duplicate-input fixtures.

#### Gate 4a–7a: product, mission, observation and world systems
- [ ] Preserve the retained product-source, Air Mail route, mission restart, committed observation, terrain, grass and world-surface plans.
- [ ] Include profile/model revision in mission restart and committed observation.
- [ ] Include steering state retirement in mission reset.

#### Gate 8: balloon steering and presentation coherence
- [ ] Define a versioned steering policy and sequenced input sample.
- [ ] Return one typed steering result per admitted fixed tick.
- [ ] Derive root, envelope, gondola and camera response from that result.
- [ ] Commit one steering observation frame with consumer revisions.
- [ ] Add cadence, reset, reversal and first-visible-frame fixtures.

## Profile authority kit order

```txt
open-above-balloon-profile-admission-authority-domain
open-above-balloon-profile-schema-kit
open-above-balloon-profile-canonicalization-kit
open-above-balloon-profile-deep-clone-kit
open-above-balloon-profile-validation-kit
open-above-balloon-profile-deep-freeze-kit
open-above-balloon-profile-id-kit
open-above-balloon-profile-version-kit
open-above-balloon-profile-revision-kit
open-above-balloon-profile-fingerprint-kit
open-above-balloon-load-command-kit
open-above-balloon-load-generation-kit
open-above-balloon-build-plan-kit
open-above-stale-profile-load-rejection-kit
open-above-balloon-model-profile-commit-kit
open-above-balloon-model-profile-receipt-kit
open-above-balloon-profile-observation-kit
open-above-balloon-profile-frame-ack-kit
open-above-profile-alias-isolation-fixture-kit
open-above-profile-mutation-race-fixture-kit
open-above-profile-fingerprint-frame-fixture-kit
```

## Validation order

```txt
fixture:balloon-profile-schema
fixture:balloon-profile-canonicalization
fixture:balloon-default-alias-isolation
fixture:balloon-profile-mutation-during-yield
fixture:balloon-profile-fingerprint-stability
fixture:balloon-stale-load-generation
fixture:balloon-model-profile-receipt
fixture:balloon-first-visible-profile-frame
npm run check
npm run headless:check
npm run build
browser acceptance smoke
Pages model/profile smoke
```