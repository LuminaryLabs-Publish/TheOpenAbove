# Next Steps: TheOpenAbove

**Last aligned:** `2026-07-12T05-11-46-04-00`

## Plan ledger

**Goal:** move runtime, simulation, mission, presentation, public readback, failure handling and HDR render-surface ownership behind explicit identities, typed results and executable proof gates.

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

#### Gate 3–5: model, lifecycle, clock and mission
- [ ] Preserve the balloon profile/model, lifecycle, fixed-step input, product-source, Air Mail and mission-reset plans.
- [ ] Add session, mission, simulation-step and model-load generations.
- [ ] Require typed commit and rollback results.

#### Gate 5b–5d: observation, host and frame failure
- [ ] Publish one committed observation shared by telemetry, HUD, GameHost and visible frame.
- [ ] Remove raw owner exposure from `window.GameHost`.
- [ ] Admit public commands through versioned capabilities.
- [ ] Contain every frame-stage failure and retain one last-known-good surface.
- [ ] Revoke failed-session capabilities and dispose owners in order.

#### Gate 6–8: world and steering
- [ ] Preserve terrain, grass, world-surface and steering authority plans.
- [ ] Keep all live owners private behind command/read capabilities.

#### Gate 9: HDR attachment and render-surface resolution authority
- [ ] Allocate render-surface, quality-state, resize-generation, target and attachment identities.
- [ ] Separate CSS dimensions, observed DPR, dynamic scale, effective pixel ratio and physical dimensions.
- [ ] Route startup, browser resize, DPR change, degradation and recovery through one transaction.
- [ ] Derive one bounded color/depth target plan.
- [ ] Prepare replacement targets and attachments without mutating the committed predecessor.
- [ ] Verify color/depth physical-size parity.
- [ ] Check framebuffer completeness before commit.
- [ ] Reject stale resize generations.
- [ ] Commit one surface revision or roll back with zero partial replacement.
- [ ] Transfer attachment leases explicitly.
- [ ] Retire predecessor targets and attachments exactly once.
- [ ] Publish detached actual dimensions and resource IDs.
- [ ] Acknowledge the first frame rendered with the committed surface revision.
- [ ] Add local browser and deployed Pages DPR/quality fixtures.

## HDR kit order

```txt
open-above-hdr-attachment-resolution-authority-domain
open-above-render-surface-id-kit
open-above-render-surface-revision-kit
open-above-resize-source-kit
open-above-resize-generation-kit
open-above-quality-state-revision-kit
open-above-effective-pixel-ratio-plan-kit
open-above-composer-target-plan-kit
open-above-depth-attachment-id-kit
open-above-depth-attachment-plan-kit
open-above-attachment-dimension-admission-kit
open-above-framebuffer-completeness-result-kit
open-above-render-surface-commit-kit
open-above-render-surface-rollback-kit
open-above-stale-resize-rejection-kit
open-above-dynamic-scale-transition-result-kit
open-above-attachment-replacement-kit
open-above-attachment-resource-lease-kit
open-above-attachment-retirement-result-kit
open-above-render-surface-observation-kit
open-above-visible-render-surface-frame-ack-kit
open-above-hdr-attachment-resolution-fixture-kit
open-above-browser-dpr-resize-smoke-kit
open-above-pages-render-surface-smoke-kit
```

## Validation order

```txt
fixture:hdr-initial-attachment-ownership
fixture:hdr-color-depth-dimension-parity
fixture:hdr-browser-resize-path
fixture:hdr-dynamic-scale-path
fixture:hdr-resize-source-parity
fixture:hdr-stale-resize-rejection
fixture:hdr-framebuffer-incomplete-rollback
fixture:hdr-retirement-exactly-once
fixture:hdr-first-visible-surface-frame
npm run check
npm run headless:check
npm run build
browser DPR and quality-transition matrix
Pages resize and quality smoke
```
