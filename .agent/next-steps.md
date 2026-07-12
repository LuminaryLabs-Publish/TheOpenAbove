# Next Steps: TheOpenAbove

**Last aligned:** `2026-07-12T08-50-32-04-00`

## Plan ledger

**Goal:** move runtime, simulation, map, mission, presentation and rendering behind explicit identities, typed results and executable proof gates.

### Checklist

#### Gate 1: immutable runtime admission
- [ ] Pin NexusEngine instead of importing `@main`.
- [ ] Validate Three.js, NexusEngine and product capabilities before construction.
- [ ] Return typed boot results and a module-graph fingerprint.
- [ ] Add `fixture:runtime-admission`.

#### Gate 2: import purity and frame ownership
- [ ] Remove module-scope compatibility work and mutable public defaults.
- [ ] Register every RAF callback through one runtime-session owner.
- [ ] Fence callbacks after stop, failure, retry and disposal.
- [ ] Add import-purity and single-owner fixtures.

#### Gates 3–9: retained model, lifecycle, mission and world authorities
- [ ] Preserve balloon profile/model, lifecycle, fixed-step input, product-source, Air Mail, mission-reset, observation, host, frame-failure, terrain, grass, world-surface, steering and HDR plans.
- [ ] Add session, mission, simulation-step, model-load, surface and consumer generations.
- [ ] Require typed commit, rollback and first-frame results.

#### Gate 10: parchment map pause and input authority
- [ ] Add `MapTransitionCommand` and stable transition IDs.
- [ ] Add map phase, generation, pause revision and projection revision.
- [ ] Register simulation, mail, airstream, presentation, camera, visual, telemetry and render participants.
- [ ] Prepare and commit one pause/resume barrier.
- [ ] Route browser keys through one context-aware input authority.
- [ ] Retire or explicitly preserve held flight keys on map open.
- [ ] Reject map-context keys from gameplay state.
- [ ] Allocate a fresh gameplay input generation on close.
- [ ] Replace dual uncoordinated RAF ownership with one admitted map-frame owner.
- [ ] Build immutable map frame plans from admitted world, route, town, parcel and player observations.
- [ ] Add map surface and source fingerprints.
- [ ] Add deterministic focus transfer, restoration and a real close control.
- [ ] Add semantic map summary for route, destination, player and controls.
- [ ] Expose detached map observation through GameHost.
- [ ] Call map disposal through runtime-session retirement.
- [ ] Acknowledge the first visible map frame and first resumed flight frame.
- [ ] Add local browser, built-output and deployed Pages fixtures.

#### Gate 11: semantic mission status and fatal accessibility
- [ ] Reintroduce concise mission status without restoring the retired per-frame HUD mutation path.
- [ ] Separate visual telemetry from event-driven semantic status.
- [ ] Add route-capture, delivery, control-mode and failure event identities.
- [ ] Add dedupe, priority, elapsed-time rate budget and verbosity policy.
- [ ] Give fatal details an alert/focus transaction.
- [ ] Correlate mission, map, status and visible-frame revisions.

## Map authority kit order

```txt
open-above-parchment-map-pause-input-authority-domain
open-above-map-transition-command-kit
open-above-map-transition-id-kit
open-above-map-state-kit
open-above-map-generation-kit
open-above-map-transition-admission-kit
open-above-map-pause-participant-kit
open-above-map-pause-barrier-kit
open-above-map-pause-result-kit
open-above-flight-input-suspension-kit
open-above-flight-key-state-retirement-kit
open-above-map-input-context-kit
open-above-map-keyboard-scope-kit
open-above-map-focus-lease-kit
open-above-map-focus-result-kit
open-above-map-frame-plan-kit
open-above-map-projection-revision-kit
open-above-map-world-source-fingerprint-kit
open-above-map-render-loop-ownership-kit
open-above-map-open-close-result-kit
open-above-map-visible-frame-ack-kit
open-above-map-observation-kit
open-above-map-journal-kit
open-above-map-input-isolation-fixture-kit
open-above-map-cadence-parity-fixture-kit
open-above-map-focus-lifecycle-fixture-kit
open-above-map-pages-smoke-kit
```

## Validation order

```txt
fixture:map-transition-idempotency
fixture:single-consumer-per-key-event
fixture:map-open-clears-flight-keys
fixture:map-context-key-isolation
fixture:map-close-neutral-first-step
fixture:pause-participant-parity
fixture:single-map-frame-owner
fixture:map-source-fingerprint
fixture:map-open-first-visible-frame
fixture:map-close-first-resumed-frame
fixture:map-focus-enter-exit
fixture:map-dispose-and-callback-fence
fixture:map-30-60-120hz-parity
npm run check
npm run headless:check
npm run build
browser map/input/focus matrix
Pages map pause/resume smoke
```