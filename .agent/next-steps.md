# Next Steps: TheOpenAbove

**Last aligned:** `2026-07-12T04-00-32-04-00`

## Plan ledger

**Goal:** move runtime boot, lifecycle, simulation, mission, presentation, public readback and failure handling behind explicit owners, typed results and executable proof gates.

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
- [ ] Deep-clone before any asynchronous yield.
- [ ] Canonicalize, validate and deeply freeze the admitted snapshot.
- [ ] Assign profile ID, version, revision and deterministic fingerprint.
- [ ] Remove mutable canonical profile exposure from `window`.
- [ ] Add alias-isolation and mutation-during-yield fixtures.

#### Gate 2b: balloon model assembly, loading and resources
- [ ] Build only from an admitted profile snapshot.
- [ ] Allocate load command and generation identities.
- [ ] Reject cancelled and stale generations before scene mutation.
- [ ] Build detached and collect a complete resource inventory.
- [ ] Atomically install the model and profile receipt.
- [ ] Add rollback, disposal and first-visible-profile-frame proof.

#### Gate 3: lifecycle and teardown
- [ ] Make `createGame()` return a root runtime-session owner.
- [ ] Retain and cancel every frame handle and listener.
- [ ] Compose simulation, camera, mail, airstream, presentation, visual, model and telemetry disposal.
- [ ] Revoke public capabilities during failure, stop and disposal.
- [ ] Add `fixture:runtime-lifecycle`.

#### Gate 4: fixed-step clock and sequenced input
- [ ] Add a session-owned fixed-step clock.
- [ ] Separate simulation tick IDs from render frame IDs.
- [ ] Convert burner, vent, steering and reset transitions into sequenced commands.
- [ ] Add cadence, visibility, stale and duplicate-input fixtures.

#### Gate 4a–5b: product, mission and committed observation
- [ ] Preserve product-source, Air Mail route, mission restart and committed-frame plans.
- [ ] Add session and mission epochs to every committed observation.
- [ ] Publish one state fingerprint shared by telemetry, HUD and visible frame.
- [ ] Include profile/model and steering receipts.

#### Gate 5c: public host capability authority
- [ ] Remove raw engine, library, scene, renderer, camera and subsystem owners from `window.GameHost`.
- [ ] Define versioned read and command capability descriptors.
- [ ] Expose only detached committed reads, bounded journals and admitted commands.
- [ ] Reject non-finite, stale, duplicate and unauthorized commands with zero mutation.
- [ ] Revoke capabilities on failure, stop, reset and disposal.
- [ ] Add owner-absence, detachment, stale-command and coherence fixtures.

#### Gate 5d: frame failure containment and last-known-good authority
- [ ] Wrap the entire ordered frame attempt in one containment boundary.
- [ ] Allocate frame IDs and canonical stage IDs.
- [ ] Bind one immutable input snapshot to each frame attempt.
- [ ] Return typed result records from every required stage.
- [ ] Admit at most one failure ID per failed frame.
- [ ] Record the completed stage prefix and failed stage.
- [ ] Stop all later-stage mutation after failure.
- [ ] Schedule a successor RAF only from a fully committed frame result.
- [ ] Advance last-known-good only after render, presentation, HUD and observation acknowledgement.
- [ ] Quarantine failed-session mutation and revoke public capabilities.
- [ ] Preserve or explicitly replace the last-known-good visible output.
- [ ] Publish one bounded terminal failure overlay and observation.
- [ ] Run ordered disposal and retain all secondary cleanup failures.
- [ ] Admit restart only through a fresh runtime session and mission epoch.
- [ ] Add stage-by-stage browser fault-injection fixtures.
- [ ] Add local and Pages terminal-surface parity smoke.

#### Gate 6–8: world and steering systems
- [ ] Preserve terrain source, LOD, bounded build, grass identity, world-surface and steering plans.
- [ ] Keep those owners private behind command/read capabilities.

## Frame-failure kit order

```txt
open-above-frame-failure-containment-authority-domain
open-above-frame-id-kit
open-above-frame-stage-schema-kit
open-above-frame-stage-id-kit
open-above-frame-execution-plan-kit
open-above-frame-stage-result-kit
open-above-frame-failure-id-kit
open-above-frame-failure-classification-kit
open-above-frame-failure-admission-kit
open-above-frame-mutation-journal-kit
open-above-last-known-good-frame-kit
open-above-frame-failure-quarantine-kit
open-above-frame-failure-render-freeze-kit
open-above-frame-failure-capability-revocation-kit
open-above-frame-failure-overlay-kit
open-above-frame-failure-disposal-plan-kit
open-above-frame-failure-result-kit
open-above-frame-failure-observation-kit
open-above-frame-failure-journal-kit
open-above-frame-cold-restart-adapter-kit
open-above-frame-stage-failure-fixture-kit
open-above-render-failure-last-good-frame-fixture-kit
open-above-hud-failure-coherence-fixture-kit
open-above-pages-frame-failure-smoke-kit
```

## Validation order

```txt
fixture:frame-stage-schema
fixture:frame-single-failure-admission
fixture:frame-no-later-stage-mutation
fixture:frame-no-successor-after-failure
fixture:frame-last-known-good-coherence
fixture:frame-capability-revocation
fixture:frame-ordered-disposal
fixture:frame-cold-restart
npm run check
npm run headless:check
npm run build
browser stage-failure matrix
Pages terminal-surface smoke
```