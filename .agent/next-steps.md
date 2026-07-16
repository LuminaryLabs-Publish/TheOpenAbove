# Next Steps: TheOpenAbove Atmosphere Reference-to-Runtime Traceability

**Last aligned:** `2026-07-16T09-39-49-04-00`  
**Status:** `atmosphere-reference-layer-runtime-traceability-authority-audited`

## Summary

The next work should turn the SVG target into a machine-readable manifest and capability result before changing shaders or adding new feature families.

## Plan ledger

**Goal:** add persistent sparse atmosphere layers through existing owners and explicit bridges, not through a second weather system or renderer-specific world features.

### Completed understanding

- [x] Confirm the new reference defines four altitude regimes.
- [x] Confirm the runtime has one `360..960` volumetric layer and global fog.
- [x] Confirm current world feature registration is landform-only.
- [x] Classify existing, embedded and missing module names.
- [x] Preserve the 101-surface kit and service inventory.

### Gate 1: reference identity and manifest

- [ ] Add a content digest and semantic revision for the SVG reference.
- [ ] Create `AtmosphereLayerManifest` with explicit ground, low/mid, high and cirrus descriptors.
- [ ] Separate illustration text from authoritative requirements.
- [ ] Classify every module and feature type as implemented, embedded, provider-backed, planned, unsupported or stale.
- [ ] Reject duplicate IDs, invalid altitude ranges and unresolved references.

### Gate 2: capability ownership

- [ ] Keep `open-above-cloud-weather-map-kit` as the weather-field owner.
- [ ] Keep `open-above-volumetric-cloud-kit` as the raymarch/GPU owner.
- [ ] Identify the embedded composite pass explicitly in the manifest.
- [ ] Keep `open-above-aerial-perspective-kit` as the global haze owner.
- [ ] Add a controller that coordinates existing owners rather than duplicating them.

### Gate 3: layer data and world bridges

- [ ] Define altitude bands and bounded sparse density floors.
- [ ] Add terrain-height, moisture and water-proximity query contracts.
- [ ] Define wind/advection inputs for every layer.
- [ ] Add a Core World atmosphere capability bridge only after provider support exists.
- [ ] Keep semantic world features independent from Three.js resource ownership.

### Gate 4: runtime adoption

- [ ] Publish `AtmosphereReferenceAdmissionResult`.
- [ ] Publish `AtmosphereLayerAdoptionResult` as adopted, partial, deferred or rejected.
- [ ] Stage layer creation and retirement by visual generation.
- [ ] Define quality-tier sample, render-scale and fallback policy per layer.
- [ ] Publish explicit no-gameplay-effect results until gameplay consumers are authored.

### Gate 5: visible-frame proof

- [ ] Add `AtmosphereFrameDescriptor` and reference revision to public diagnostics.
- [ ] Capture altitude sweeps at ground, 25, 100, 360, 660, 960, 1500 and 3000 units.
- [ ] Exercise valley, ridge, water-adjacent, town-route and open-sky locations.
- [ ] Validate minimum sparse coverage, ordinary and dense profiles.
- [ ] Publish `FirstReferenceBoundAtmosphereFrameAck`.

### Gate 6: artifact and deployment proof

- [ ] Run source checks and Vite build.
- [ ] Validate low, medium and high quality tiers.
- [ ] Record per-layer GPU timing and frame cost.
- [ ] Compare source, built artifact and deployed Pages manifests and frames.
- [ ] Fail publication on stale reference or layer-manifest identity.

## Recommended file cut

```txt
src/visual/atmosphere/
  atmosphere-reference-layer-runtime-traceability-authority-domain.js
  reference-asset-revision-kit.js
  atmosphere-layer-manifest-kit.js
  reference-module-classification-kit.js
  atmosphere-layer-controller-kit.js
  ground-fog-layer-profile-kit.js
  low-mid-cumulus-layer-profile-kit.js
  high-cloud-layer-profile-kit.js
  cirrus-layer-profile-kit.js
  sparse-density-floor-policy-kit.js
  atmosphere-altitude-band-kit.js
  weather-field-layer-adapter-kit.js
  volumetric-layer-scheduler-kit.js
  cloud-composite-pass-contract-kit.js
  aerial-perspective-layer-bridge-kit.js

src/world/
  terrain-moisture-atmosphere-bridge-kit.js
  core-world-atmosphere-capability-bridge-kit.js

tests/
  atmosphere-reference-manifest.mjs
  atmosphere-altitude-sweep-browser.mjs
```

## Compatibility constraints

Preserve Three.js `0.165.0`, current balloon simulation, Air Mail, airstream ownership, terrain generation, dynamic-resolution tiers, HDR composition, map behavior, GameHost diagnostics, Vite build and Pages deployment.

## Retained next steps

Page lifecycle, renderer recovery, game audio, device controls, fixed-step pacing, HDR/depth coherence, existing cloud composite/depth proof, delivery eligibility, provider/build identity, route retirement, world adoption, terrain/flora proof, Air Mail history and flight persistence remain open.

## Do not claim

Do not claim the reference is implemented, clouds persist at every altitude, fog is terrain-aware, Core World atmosphere features exist, GPU cost is acceptable, or deployed Pages match until the full fixture matrix passes.