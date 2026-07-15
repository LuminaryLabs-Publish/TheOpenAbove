# Next Steps: TheOpenAbove Cloud Low-Resolution Rendering

**Last aligned:** `2026-07-14T22-39-00-04-00`  
**Status:** `cloud-low-resolution-depth-upscale-authority-audited`

## Plan ledger

**Goal:** implement the smallest cloud-only target and depth-aware composite that honors the existing LOD descriptor.

### Gate 1: frame and profile identity

- [ ] Allocate `FrameId`, renderer generation and `CloudLodProfileRevision`.
- [ ] Bind quality tier, viewport, DPR, weather and camera revisions.
- [ ] Validate scale and sample budgets.
- [ ] Reject stale or superseded frames.

### Gate 2: cloud-only targets

- [ ] Allocate color, transmittance and representative-depth targets at the declared scale.
- [ ] Keep the main scene target at the admitted whole-scene resolution.
- [ ] Publish dimensions, formats, generation and byte estimates.
- [ ] Retire old targets on resize, quality transition and context recovery.

### Gate 3: ray march and history

- [ ] Dispatch existing density and light logic into the cloud target.
- [ ] Publish actual view/light sample receipts.
- [ ] Add optional jitter/history ownership.
- [ ] Reset history on camera, weather, scale or renderer discontinuity.

### Gate 4: depth-aware upscale and HDR composite

- [ ] Consume the accepted scene-depth revision.
- [ ] Prevent cloud bleeding across terrain, balloon, rope and town silhouettes.
- [ ] Composite in one explicit HDR order.
- [ ] Publish upscale and composite receipts.

### Gate 5: shadow and fallback policy

- [ ] Admit terrain cloud shadows under the same weather and budget revision.
- [ ] Support procedural, cached, disabled and future impostor policies.
- [ ] Classify Full, Reduced, Impostor, Disabled or Rejected execution.
- [ ] Expose fallback reasons in telemetry.

### Gate 6: fixtures

- [ ] Run the target, scale, edge, history, fallback and retirement matrix.
- [ ] Capture GPU timings without asserting a fixed threshold prematurely.
- [ ] Correlate `GameHost`, `CloudFrameResult` and `FirstVisibleCloudFrameAck`.
- [ ] Prove source, built artifact and Pages parity.

## Recommended file cut

```txt
src/visual/cloud-frame/
  cloud-low-resolution-depth-upscale-authority-domain.js
  cloud-frame-identity-kit.js
  cloud-target-allocation-kit.js
  cloud-raymarch-dispatch-kit.js
  cloud-temporal-history-kit.js
  cloud-depth-aware-upscale-kit.js
  cloud-hdr-composite-kit.js
  terrain-cloud-shadow-policy-kit.js
  cloud-frame-result-kit.js
  cloud-target-retirement-kit.js

tests/
  cloud-low-resolution-depth-upscale.mjs
```

## Compatibility constraints

Preserve current weather, cloud density, lighting, quality tiers, scene depth, color grading, terrain material and gameplay APIs. Wire the existing `renderScale` into rendering rather than replacing the cloud look.

## Retained next steps

Ground-contact delivery eligibility, immutable provider/build identity, route retirement, world adoption, Air Mail history and flight persistence remain open.

## Do not claim

Do not claim faster rendering, visual equivalence, temporal stability, correct silhouette reconstruction or deployment parity until the full fixture matrix passes.
