# Next Steps: TheOpenAbove

**Last aligned:** `2026-07-11T22-58-50-04-00`

## Plan ledger

**Goal:** preserve Air Mail and the upgraded balloon while moving runtime, model construction, steering, mission, terrain, grass and visible presentation behind explicit authorities and executable gates.

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
- [ ] Pass integrated pattern policy into the unified shell builder.
- [ ] Validate all cross-component attachment contracts.
- [ ] Replace direct startup build with a session-fenced detached load command.
- [ ] Add resource inventory, rollback, disposal and first-visible-frame proof.

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
- [ ] Include steering state retirement in mission reset.
- [ ] Include steering results in committed observation frames.

#### Gate 8: balloon steering and presentation coherence
- [ ] Define a versioned steering policy and sequenced input sample.
- [ ] Return one typed simulation steering result per admitted fixed tick.
- [ ] Derive root, envelope, gondola and camera response from that result.
- [ ] Commit one steering observation frame with consumer revisions.
- [ ] Project the committed result to HUD, telemetry and GameHost.
- [ ] Add blur, pause, reset and restart retirement semantics.
- [ ] Add 30/60/120 Hz response-parity fixtures.
- [ ] Add neutral convergence, reversal and first-visible-steering-frame fixtures.

## Steering authority kit order

```txt
open-above-balloon-steering-presentation-authority-domain
open-above-steering-input-sample-kit
open-above-steering-input-sequence-kit
open-above-steering-policy-descriptor-kit
open-above-steering-admission-kit
open-above-steering-simulation-result-kit
open-above-balloon-root-transform-result-kit
open-above-balloon-part-presentation-result-kit
open-above-camera-steering-result-kit
open-above-steering-hud-projection-kit
open-above-steering-observation-frame-kit
open-above-steering-frame-commit-kit
open-above-stale-steering-result-rejection-kit
open-above-steering-reset-transaction-kit
open-above-steering-journal-kit
open-above-steering-response-fixture-kit
open-above-steering-visible-frame-smoke-kit
```

## Validation order

```txt
fixture:balloon-profile-schema
fixture:balloon-initial-setup-load
fixture:runtime-lifecycle
fixture:fixed-step-input
fixture:steering-response
fixture:steering-cadence-parity
fixture:steering-reset-neutralization
fixture:steering-first-visible-frame
npm run check
npm run headless:check
npm run build
browser acceptance smoke
Pages steering/presentation smoke
```
