# Next Steps: TheOpenAbove

**Last aligned:** `2026-07-12T07-00-48-04-00`

## Plan ledger

**Goal:** move runtime, simulation, mission, presentation, render-surface and accessible status behind explicit identities, typed results and executable proof gates.

### Checklist

#### Gate 1: immutable runtime admission
- [ ] Pin NexusEngine instead of importing `@main`.
- [ ] Validate Three.js, NexusEngine and product capabilities before construction.
- [ ] Return typed boot results and a module-graph fingerprint.
- [ ] Add `fixture:runtime-admission`.

#### Gate 2: import purity and frame ownership
- [ ] Remove module-scope compatibility work and mutable public defaults.
- [ ] Register all RAF callbacks through one runtime-session owner.
- [ ] Fence callbacks after stop, failure, retry and disposal.
- [ ] Add import-purity and single-owner fixtures.

#### Gates 3–8: model, lifecycle, mission and world
- [ ] Preserve balloon profile/model, lifecycle, fixed-step input, product-source, Air Mail, mission-reset, observation, host, frame-failure, terrain, grass, world-surface and steering plans.
- [ ] Add session, mission, simulation-step, model-load and consumer generations.
- [ ] Require typed commit, rollback and first-frame results.

#### Gate 9: HDR attachment and render-surface resolution
- [ ] Route startup, browser resize, DPR change, degradation and recovery through one surface transaction.
- [ ] Keep CSS, DPR, dynamic scale and physical dimensions separate.
- [ ] Verify color/depth parity and framebuffer completeness before commit.
- [ ] Transfer attachment leases and retire predecessors exactly once.
- [ ] Acknowledge the first visible frame from the committed surface revision.

#### Gate 10: HUD accessibility announcement authority
- [ ] Make the visual HUD non-live.
- [ ] Add a dedicated semantic status live region.
- [ ] Allocate HUD projection, source-event and announcement identities.
- [ ] Classify mission, control, mode, warning and fatal events.
- [ ] Admit only committed semantic events.
- [ ] Reject stale runtime and mission revisions.
- [ ] Deduplicate by event ID and semantic text.
- [ ] Enforce elapsed-time rate budgets by priority.
- [ ] Add explicit polite/assertive and atomicity policy.
- [ ] Add reduced-verbosity preference support.
- [ ] Replace complete `innerHTML` writes with field-level visual HUD updates.
- [ ] Add typed announcement results and detached observations.
- [ ] Correlate mission, HUD, announcement and visible-frame revisions.
- [ ] Give fatal details an alert/focus transaction.
- [ ] Add local browser, accessibility-tree and deployed Pages fixtures.

## HUD accessibility kit order

```txt
open-above-hud-accessibility-announcement-authority-domain
open-above-hud-visual-frame-projection-kit
open-above-hud-semantic-status-kit
open-above-hud-projection-revision-kit
open-above-accessible-announcement-id-kit
open-above-accessible-announcement-kind-kit
open-above-accessible-announcement-priority-kit
open-above-accessible-announcement-policy-kit
open-above-accessible-announcement-admission-kit
open-above-accessible-announcement-dedupe-kit
open-above-accessible-announcement-rate-budget-kit
open-above-mission-event-announcement-kit
open-above-control-hint-announcement-kit
open-above-telemetry-quiet-channel-kit
open-above-accessible-live-region-adapter-kit
open-above-fatal-error-announcement-kit
open-above-fatal-focus-transfer-kit
open-above-aria-atomic-policy-kit
open-above-reduced-verbosity-preference-kit
open-above-hud-dom-diff-kit
open-above-accessible-announcement-result-kit
open-above-accessible-announcement-observation-kit
open-above-accessible-announcement-journal-kit
open-above-accessible-frame-ack-kit
open-above-hud-accessibility-fixture-kit
open-above-screen-reader-event-rate-smoke-kit
open-above-fatal-announcement-smoke-kit
```

## Validation order

```txt
fixture:hud-visual-live-region-separation
fixture:semantic-event-classification
fixture:announcement-deduplication
fixture:announcement-elapsed-rate-budget
fixture:stale-session-mission-rejection
fixture:cadence-independent-announcement-sequence
fixture:route-capture-announcement
fixture:mail-delivery-announcement
fixture:fatal-alert-focus-exactly-once
fixture:replacement-session-status-cleanup
npm run check
npm run headless:check
npm run build
browser accessibility mutation matrix
Pages accessibility smoke
```