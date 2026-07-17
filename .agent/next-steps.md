# Next Steps: TheOpenAbove Wind Particle Budget and Frame Authority

**Last aligned:** `2026-07-17T15-41-19-04-00`  
**Status:** `wind-particle-simulation-budget-quality-admission-authority-audited`

## Summary

Keep the new dust-stream visual and retired spline renderer. Replace the fixed implicit policy with one admitted, measured and observable wind-visual generation.

## Intent

Produce one deterministic path from accepted wind evidence through quality policy, bounded particle updates, degradation, retirement and the matching rendered frame.

## What needs to happen

### Gate 1: Policy admission

- [ ] Add `WindVisualGeneration`, `WindPolicyRevision` and `QualityTierRevision`.
- [ ] Move count, radii, size, opacity, noise profile and cadence into one immutable policy.
- [ ] Bind the policy to the existing `open-above-quality-tier-kit`.
- [ ] Publish `WindVisualAdmissionResult`.

### Gate 2: Sample and update admission

- [ ] Publish an immutable `WindSampleRevision` from the accepted flight frame.
- [ ] Bind frame, sample, visual generation, policy and dt before buffer mutation.
- [ ] Reject stale or retired generations.
- [ ] Publish `WindParticleUpdateResult`.

### Gate 3: Budget settlement

- [ ] Record particles evaluated, noise evaluations and scalar writes.
- [ ] Record position-buffer bytes and measured update duration.
- [ ] Define measured low, medium and high policies.
- [ ] Add explicit capacity, cadence or noise degradation without changing wind truth.
- [ ] Publish `WindVisualBudgetResult`.

### Gate 4: Diagnostics and frame proof

- [ ] Add generation, sample, policy, quality, capacity, cadence, update and degradation state to diagnostics.
- [ ] Publish `WindParticleFrameDigest` after the accepted buffer revision is rendered.
- [ ] Publish `FirstWindParticleBoundFrameAck`.

### Gate 5: Retirement

- [ ] Stop updates before detaching the active Points object.
- [ ] Dispose geometry, material and texture exactly once.
- [ ] Make repeated retirement harmless and observable.
- [ ] Publish `WindVisualRetirementResult`.

### Gate 6: Fixtures

- [ ] Construct the real field in a controlled runtime scene.
- [ ] Assert stable array, attribute and resource identities across updates.
- [ ] Assert map-open suspension causes no buffer mutation.
- [ ] Measure warm and long-flight cost at each admitted quality tier.
- [ ] Assert degradation does not alter Ballooning or Airstream truth.
- [ ] Assert stale generation writes are rejected.
- [ ] Verify source, Vite artifact and Pages parity.

## Recommended file cut

```txt
src/domains/sky/wind/
  wind-particle-simulation-budget-quality-admission-authority-domain.js
  wind-particle-policy-kit.js
  wind-particle-quality-tier-kit.js
  wind-particle-update-plan-kit.js
  wind-particle-update-budget-kit.js
  wind-particle-frame-digest-kit.js

src/domains/sky/
  sky-domain.js
  wind-particle-field-kit.js

tests/
  wind-particle-runtime.mjs
  wind-particle-budget.mjs
  wind-particle-frame-correlation.mjs
```

## Compatibility constraints

Preserve Airstream as renderer-neutral wind truth, Sky as production wind-visual owner, the 50 m player-centered field, deterministic seeding, normal blending, map suspension, explicit disposal, balloon simulation, steering, camera, clouds, sightseeing and deployment.

## Do not claim

Do not claim an accepted device budget, performance improvement, visual correctness, stale-update rejection, exact wind-sample/frame convergence, artifact parity, Pages parity or production readiness until implementation and fixtures exist.
