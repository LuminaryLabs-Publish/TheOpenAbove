# Next Steps: TheOpenAbove Cloud Depth Composite

**Last aligned:** `2026-07-15T02-09-29-04-00`  
**Status:** `cloud-low-resolution-composite-depth-occlusion-authority-audited`

## Summary

The cloud-only color target and LOD scale are implemented. The next work should add representative cloud depth and scene-depth-aware reconstruction to the existing path, then publish typed pass, timing, fallback, retirement, and visible-frame receipts.

## Plan ledger

**Goal:** complete the smallest depth-aware extension without replacing the current ray marcher, HDR composer, weather model, or whole-scene dynamic resolution controller.

### Completed foundation

- [x] Move volumetric clouds into a private cloud scene.
- [x] Allocate a cloud-only RGBA half-float target.
- [x] Size the target from drawing buffer × LOD `renderScale`.
- [x] Execute the cloud pass before the main composer.
- [x] Composite cloud color/alpha through the main scene.
- [x] Add target size readback and disposal.

### Gate 1: frame and resource identity

- [ ] Add `FrameId`, renderer generation, `CloudLodProfileRevision`, and `CloudTargetGeneration`.
- [ ] Bind quality, viewport, DPR, weather, camera, and scene-depth revisions.
- [ ] Reject stale, superseded, or cross-generation frames.
- [ ] Publish target dimensions, formats, scale, and estimated bytes.

### Gate 2: cloud depth output

- [ ] Choose a capability-admitted representative linear cloud-depth encoding.
- [ ] Preserve accumulated color and transmittance semantics.
- [ ] Emit cloud depth using the same camera, target dimensions, and ray-march revision.
- [ ] Publish actual view/light sample receipts.

### Gate 3: scene-depth reconstruction

- [ ] Expose the accepted main-scene depth texture and its projection parameters.
- [ ] Convert scene and cloud depth into one linear coordinate space.
- [ ] Reconstruct cloud color/transmittance/depth without crossing nearer geometry edges.
- [ ] Preserve clouds in front of farther terrain, mountains, towns, and vegetation.
- [ ] Occlude clouds behind nearer terrain, balloon geometry, ropes, and props.

### Gate 4: HDR composite and fallback

- [ ] Composite in one explicit HDR order before color grading.
- [ ] Classify `Full`, `Reduced`, `ColorOnly`, `FarDepthFallback`, `Disabled`, or `Rejected`.
- [ ] Record fallback reasons and capability decisions.
- [ ] Preserve a safe predecessor frame on allocation or render failure.

### Gate 5: lifecycle and telemetry

- [ ] Retire old targets on resize, DPR, quality change, context recovery, and disposal.
- [ ] Prevent in-flight predecessor frames from publishing after retirement.
- [ ] Add cloud pass GPU/CPU timing receipts.
- [ ] Bind terrain shadow policy to the same weather and quality revisions.
- [ ] Publish `CloudFrameResult` and `FirstVisibleCloudFrameAck`.

### Gate 6: fixtures

- [ ] Exact high/medium/low target dimensions and sample budgets.
- [ ] Cloud before and behind mountain geometry.
- [ ] Terrain, balloon, rope, town, and vegetation silhouette edges.
- [ ] Resize, DPR, quality transition, and context recovery.
- [ ] Full/reduced/color-only/far-depth/disabled/rejected profiles.
- [ ] Terrain shadow policy correlation.
- [ ] Source, production build, artifact, and Pages parity.

## Recommended file cut

```txt
src/visual/cloud-frame/
  cloud-low-resolution-depth-upscale-authority-domain.js
  cloud-frame-identity-kit.js
  cloud-target-generation-kit.js
  cloud-transmittance-depth-kit.js
  cloud-scene-depth-reconstruction-kit.js
  cloud-hdr-composite-kit.js
  cloud-execution-profile-kit.js
  cloud-frame-result-kit.js
  cloud-target-retirement-kit.js
  terrain-cloud-shadow-policy-kit.js

tests/
  cloud-depth-composite.mjs
```

## Compatibility constraints

Preserve the existing weather, density, lighting, sample budgets, target scale, balloon and mail APIs, visual-domain API, terrain material, HDR grade, and browser host.

## Retained next steps

Ground-contact delivery eligibility, immutable provider/build identity, route retirement, world adoption, Air Mail history, and flight persistence remain open.

## Do not claim

Do not claim depth-aware correctness, visual equivalence, measured performance improvement, resource retirement, or deployment parity until the complete fixture matrix passes.