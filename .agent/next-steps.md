# Next Steps: TheOpenAbove

**Last aligned:** `2026-07-12T02-29-50-04-00`

## Plan ledger

**Goal:** move runtime boot, lifecycle, simulation, mission, presentation, public readback and automation behind explicit owners, typed commands and executable proof gates.

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
- [ ] Remove raw `engine`, `NexusEngine`, `THREE`, scene, renderer, camera and subsystem owners from `window.GameHost`.
- [ ] Define versioned read and command capability descriptors.
- [ ] Expose only `getCommittedState()`, `getJournal()` and `submit(command)`.
- [ ] Make read records detached, serializable and immutable.
- [ ] Require command ID, capability, session, mission epoch and relevant frame revision.
- [ ] Reject non-finite, stale, duplicate and unauthorized commands with zero mutation.
- [ ] Route each accepted command to one existing authoritative service.
- [ ] Publish typed command results and frame acknowledgements.
- [ ] Add owner-absence, detachment, stale-command and coherence fixtures.
- [ ] Add local and Pages public-host contract parity smoke.

#### Gate 6–8: world and steering systems
- [ ] Preserve terrain source, LOD, bounded build, grass identity, world-surface and steering plans.
- [ ] Keep those owners private behind command/read capabilities.

## Public-host kit order

```txt
open-above-public-host-capability-authority-domain
open-above-host-session-identity-kit
open-above-host-capability-descriptor-kit
open-above-host-read-capability-kit
open-above-host-command-capability-kit
open-above-host-owner-handle-quarantine-kit
open-above-host-command-envelope-kit
open-above-host-command-id-kit
open-above-host-command-admission-kit
open-above-host-session-epoch-fence-kit
open-above-host-mission-epoch-fence-kit
open-above-host-frame-revision-fence-kit
open-above-host-finite-value-policy-kit
open-above-host-command-result-kit
open-above-host-committed-read-model-kit
open-above-host-state-fingerprint-kit
open-above-host-frame-provenance-kit
open-above-host-observation-journal-kit
open-above-legacy-gamehost-compatibility-adapter-kit
open-above-host-owner-isolation-fixture-kit
open-above-host-command-admission-fixture-kit
open-above-host-read-model-coherence-fixture-kit
```

## Validation order

```txt
fixture:host-public-key-surface
fixture:host-owner-handle-absence
fixture:host-read-model-detachment
fixture:host-read-model-deep-immutability
fixture:host-non-finite-command-rejection
fixture:host-stale-session-command
fixture:host-stale-mission-command
fixture:host-stale-frame-command
fixture:host-duplicate-command
fixture:host-command-result-frame-ack
fixture:host-capability-revocation
npm run check
npm run headless:check
npm run build
browser acceptance smoke
Pages host-contract smoke
```