# Next Steps: TheOpenAbove Gaussian Cloud LOD Membership Transition

**Last aligned:** `2026-07-17T02-32-08-04-00`  
**Status:** `gaussian-cloud-lod-membership-transition-authority-audited`

## Summary

Keep the implemented deterministic bank field, live weather visibility and nearby-priority capacity policy. Add stable membership admission and bounded transitions before expanding cloud fidelity further.

## Intent

Produce one deterministic path from field inputs and camera evidence to stable LOD membership, instance-buffer commit and matching-frame acknowledgement.

## What needs to happen

### Gate 1: Field identity

- [ ] Add `CloudFieldRevision` and `CloudFieldDigest`.
- [ ] Bind world surface, weather-layer descriptors, seed, supported kinds and LOD tiers.
- [ ] Reject stale fields after config, route or quality-generation changes.

### Gate 2: Rebatch admission

- [ ] Add `CloudRebatchGeneration`, camera revision, weather revision and predecessor membership revision.
- [ ] Record rebatch reason: initial, movement, age, weather, quality, teleport or recovery.
- [ ] Reject duplicate and stale rebatches.

### Gate 3: Capacity and quotas

- [ ] Preserve nearest-first global overflow priority.
- [ ] Add stable per-bank minimum and maximum quotas.
- [ ] Bound how many prior members one newly close bank can evict in a frame.
- [ ] Publish `CloudSplatBudgetResult`.

### Gate 4: LOD transitions

- [ ] Add distinct enter and leave distances around each tier threshold.
- [ ] Retain predecessor membership during small camera movement.
- [ ] Crossfade entering, leaving and tier-changing splats.
- [ ] Reset explicitly on teleport or field revision replacement.
- [ ] Publish `CloudLodMembershipResult`.

### Gate 5: Projection commit

- [ ] Make the Three.js adapter consume one immutable membership result.
- [ ] Commit one buffer generation and membership digest.
- [ ] Preserve far-to-near order across blended membership.
- [ ] Publish `CloudProjectionResult` and `FirstGaussianCloudFrameAck`.

### Gate 6: Lifecycle and fixtures

- [ ] Define map-open, page-suspension and resume transition-clock policy.
- [ ] Settle WebGL context loss/recovery and route disposal.
- [ ] Verify still-camera stability, all tier boundaries and forced overflow.
- [ ] Verify low/medium/high quality capacities.
- [ ] Verify source, Vite artifact and Pages parity.

## Recommended file cut

```txt
src/domains/sky/cloud-form/
  gaussian-cloud-lod-membership-transition-authority-domain.js
  cloud-field-generation-admission-kit.js
  cloud-field-revision-kit.js
  cloud-splat-budget-admission-kit.js
  cloud-bank-quota-kit.js
  cloud-membership-retention-kit.js
  cloud-lod-hysteresis-kit.js
  cloud-splat-crossfade-kit.js
  cloud-lod-membership-result-kit.js

src/visual/atmosphere/
  gaussian-instance-buffer-commit-kit.js
  cloud-projection-result-kit.js

tests/
  cloud-membership-stability.mjs
  cloud-lod-hysteresis.mjs
  cloud-capacity-transition.mjs
```

## Compatibility constraints

Preserve existing field seed output, five tier descriptors, nearby-priority overflow behavior, far-to-near blending, live weather visibility, distant high/cirrus volumetric rendering, balloon controls, camera behavior, map pause and Pages deployment.

## Retained next steps

Camera zoom projection, rendered-photo artifacts, validation severity, weather-clock ownership, lifecycle, WebGL recovery, audio, fixed-step pacing, HDR/depth, provider and persistence gaps remain open.

## Do not claim

Do not claim temporal LOD stability, bounded capacity transitions, exact cloud-frame convergence, source/build/Pages parity or production readiness until implementation and fixtures exist.