# Next Steps: TheOpenAbove WebGL Context-Loss Recovery

**Last aligned:** `2026-07-16T03-03-22-04-00`  
**Status:** `webgl-context-resource-recovery-authority-audited`

## Summary

The next work should add one context-loss recovery authority around the existing visual domain. Loss admission, renderer generations, resource registration, reconstruction, stale-work rejection, fallback, and recovered-frame proof must land as one bounded system.

## Plan ledger

**Goal:** recover presentation without changing flight equations, delivery eligibility, Core World meaning, camera behavior, map behavior, or deployment ownership.

### Completed understanding

- [x] Confirm one renderer and one current GPU-resource graph are constructed at boot.
- [x] Confirm ordinary disposal exists but no context-loss recovery protocol exists.
- [x] Inventory renderer, HDR, cloud, terrain, flora, water, balloon, and presentation resources.
- [x] Define 20 planned recovery surfaces.
- [x] Preserve the 101-surface architecture and service inventory.

### Gate 1: capability and generation identity

- [ ] Add `RenderCapabilityRevision`, `RendererGeneration`, `ContextGeneration`, and `ResourceManifestRevision`.
- [ ] Observe WebGL capability and context restoration support.
- [ ] Register `webglcontextlost` and `webglcontextrestored` listeners with explicit lifecycle ownership.
- [ ] Deduplicate repeated evidence and reject stale document/runtime generations.

### Gate 2: loss admission and policy

- [ ] Publish `RenderLossResult` once per accepted loss generation.
- [ ] Stop stale draw submission immediately.
- [ ] Choose explicit simulation, Air Mail, elapsed-time, and input policy during loss.
- [ ] Project recovering state without relying on the invalid canvas.

### Gate 3: resource manifest

- [ ] Register every renderer, target, texture, material, geometry, buffer, pass, and streamed-resource owner.
- [ ] Record dependencies, rebuild/verify/adopt/retire callbacks, criticality, and timeout.
- [ ] Ensure resources belong to exactly one renderer generation.
- [ ] Reject late callbacks and dispose partial resources from retired generations.

### Gate 4: renderer and post-process reconstruction

- [ ] Recreate or restore renderer state, shadows, color space, tone mapping, size, and DPR.
- [ ] Rebuild composer color targets, independent depth textures, passes, and uniforms.
- [ ] Rebind dynamic-resolution control to the replacement renderer/composer.
- [ ] Verify drawing-buffer and attachment dimensions before adoption.

### Gate 5: scene and environment rehydration

- [ ] Rebuild cloud private target, shader resources, and composite binding.
- [ ] Rebuild terrain/horizon chunks, vegetation, grass/flower atlases and buffers, water, and landmarks.
- [ ] Rebuild balloon, airstream, town, sky, sun, aerial, and lens GPU state.
- [ ] Preserve accepted simulation/world identities while replacing presentation resources.

### Gate 6: deadlines, fallback, and frame proof

- [ ] Add bounded restoration deadline and retry budget.
- [ ] Publish `RenderRecoveryResult` or `RenderFallbackResult`.
- [ ] Present one verified frame from the new generation.
- [ ] Publish `FirstRecoveredFrameAck` only after critical resources verify.

### Gate 7: executable fixtures

- [ ] Force loss before first frame and during flight, map, resize, clouds, terrain streaming, and delivery.
- [ ] Force repeated loss, timeout, pagehide, and runtime replacement.
- [ ] Run source, Vite build, downloaded artifact, and deployed Pages rows.
- [ ] Compare renderer/resource/frame identities across every row.

## Recommended file cut

```txt
src/visual/recovery/
  webgl-context-resource-recovery-authority-domain.js
  render-capability-observation-kit.js
  render-generation-identity-kit.js
  webgl-context-loss-observation-kit.js
  webgl-context-restoration-observation-kit.js
  render-loss-classification-kit.js
  presentation-suspension-policy-kit.js
  simulation-input-loss-policy-kit.js
  gpu-resource-registration-kit.js
  renderer-reconstruction-kit.js
  scene-resource-rehydration-kit.js
  post-process-resource-rehydration-kit.js
  cloud-resource-rehydration-kit.js
  terrain-flora-resource-rehydration-kit.js
  stale-render-generation-rejection-kit.js
  render-recovery-deadline-budget-kit.js
  render-fallback-projection-kit.js
  render-loss-result-kit.js
  render-recovery-result-kit.js
  first-recovered-frame-ack-kit.js

tests/webgl-context-recovery-browser-fixture.mjs
```

## Compatibility constraints

Preserve Three.js `0.165.0`, current renderer-neutral simulation state, balloon forces, Air Mail settlement, Core World composition, cloud/HDR appearance, dynamic-resolution policy, map behavior, `GameHost`, and Pages deployment.

## Retained next steps

Game audio, device controls, fixed-step pacing, HDR/depth coherence, cloud depth, ground-contact delivery eligibility, provider/build identity, route retirement, world adoption, terrain/flora proof, Air Mail history, and flight persistence remain open.

## Do not claim

Do not claim renderer recovery, context restoration, GPU-resource rehydration, fallback correctness, recovered-frame convergence, artifact parity, Pages parity, or production readiness until the full fixture matrix passes.