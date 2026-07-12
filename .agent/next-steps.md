# Next Steps: TheOpenAbove

**Last aligned:** `2026-07-12T09-02-10-04-00`

## Plan ledger

**Goal:** move runtime, simulation, mission, map, presentation and rendering behind explicit identities, typed results and executable proof gates.

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
- [ ] Add transition command, ID, phase, generation and pause revision.
- [ ] Register and coordinate pause/resume participants.
- [ ] Route keys through one FLIGHT/MAP context authority.
- [ ] Retire held flight keys on map open and allocate a fresh input generation on close.
- [ ] Replace dual uncoordinated RAF ownership with one admitted map-frame owner.
- [ ] Add deterministic focus transfer, restoration and close control.
- [ ] Retire the map through runtime-session disposal.
- [ ] Acknowledge first visible map and first resumed-flight frames.

#### Gate 11: parchment map spatial-navigation authority
- [ ] Add `open-above-parchment-map-spatial-navigation-authority-domain`.
- [ ] Declare world axes, map axes, handedness, north and marker-forward convention.
- [ ] Replace direct `-heading` rotation with a canonical map-bearing service.
- [ ] Derive bearing from committed horizontal velocity with an explicit zero-speed policy.
- [ ] Add cardinal and diagonal bearing fixtures.
- [ ] Add world, mission-content and player-context bounds.
- [ ] Select and expose a named viewport-fit policy.
- [ ] Fit route/town content with declared padding across portrait, square and wide viewports.
- [ ] Add route-style policy for normal, active, correct and destination routes.
- [ ] Pass committed airstream capture and mail correct-route state into the map projection.
- [ ] Add off-map behavior: expanded fit, edge clamp, edge arrow or typed hidden state.
- [ ] Add map projection command, revision, source fingerprint and typed result.
- [ ] Expose detached map-navigation observation through GameHost.
- [ ] Acknowledge the first visible frame for each committed projection.
- [ ] Add DPR, aspect, off-map, browser pixel-probe and Pages fixtures.

#### Gate 12: semantic mission status and fatal accessibility
- [ ] Reintroduce concise mission status without restoring retired per-frame HUD mutation.
- [ ] Separate visual telemetry from event-driven semantic status.
- [ ] Add route-capture, delivery, control-mode and failure event identities.
- [ ] Add dedupe, priority, elapsed-time rate budget and verbosity policy.
- [ ] Give fatal details an alert/focus transaction.
- [ ] Correlate mission, map, status and visible-frame revisions.

## Spatial-navigation kit order

```txt
open-above-parchment-map-spatial-navigation-authority-domain
open-above-map-coordinate-space-schema-kit
open-above-map-world-bounds-kit
open-above-map-content-bounds-kit
open-above-map-viewport-fit-policy-kit
open-above-map-projection-transform-kit
open-above-map-heading-convention-kit
open-above-map-player-bearing-kit
open-above-map-player-marker-pose-kit
open-above-map-route-style-policy-kit
open-above-map-destination-route-resolution-kit
open-above-map-active-route-projection-kit
open-above-map-off-map-policy-kit
open-above-map-edge-clamp-kit
open-above-map-compass-orientation-kit
open-above-map-navigation-revision-kit
open-above-map-navigation-source-fingerprint-kit
open-above-map-projection-result-kit
open-above-map-navigation-observation-kit
open-above-map-navigation-journal-kit
open-above-map-heading-fixture-kit
open-above-map-route-fit-fixture-kit
open-above-map-off-map-fixture-kit
open-above-map-browser-pixel-probe-kit
open-above-map-pages-navigation-smoke-kit
```

## Validation order

```txt
fixture:map-heading-cardinals
fixture:map-heading-diagonals
fixture:map-zero-speed-bearing
fixture:map-route-content-bounds
fixture:map-fit-wide-square-portrait
fixture:map-dpr-parity
fixture:map-active-destination-route-style
fixture:map-off-map-policy
fixture:map-source-fingerprint
fixture:map-visible-frame-ack
browser map pixel probe
npm run check
npm run headless:check
npm run build
built-output geometry parity
Pages map navigation smoke
```
