# Architecture Audit: Wind Particle Budget and Quality Admission DSK Map

**Timestamp:** `2026-07-17T15-41-19-04-00`  
**Status:** `wind-particle-simulation-budget-quality-admission-authority-audited`

## Summary

Wind truth and wind presentation are now cleanly separated: Airstream owns sampling/state, while Sky owns the dust particle field. The remaining architecture gap is that Sky hardcodes one visual policy and executes it every accepted flight frame without a generation-bound admission, quality or budget result.

## Current ownership

```txt
Journey
  -> admits flight frames and map suspension

Ballooning
  -> produces position, elapsed time and sampled airstream velocity

Airstream Domain
  -> routes
  -> field sampling
  -> active-route state
  -> optional debug diagnostics
  -> no production route-trail renderer

Sky Domain
  -> consumes supplied airstream sample
  -> updates Airstream state
  -> owns Wind Particle Field
  -> owns close-cloud field

Wind Particle Field
  -> 3,200 particles
  -> persistent positions/phases
  -> layered 3D noise
  -> DynamicDraw buffer writes
  -> procedural texture/material
  -> disposal
```

## DSK breakdown

### Implemented source-backed surfaces

| Surface | Services |
|---|---|
| `open-above-sky-domain` | mount, engine binding, airstream sampling/update, wind-particle update/snapshot, Weather readback, cloud-field snapshot and disposal |
| `open-above-airstream-domain` | route/field composition, sample, state update, snapshot, optional debug diagnostics and disposal |
| `open-above-airstream-route-kit` | route descriptors, control points, colors and destination identity |
| `open-above-airstream-sampler-kit` | route and ambient-flow sampling |
| `open-above-airstream-field-kit` | spatial wind evaluation and contributor blending |
| `open-above-airstream-balloon-force-kit` | normalized flow and balloon force resolution |
| `open-above-airstream-debug-kit` | optional diagnostic geometry/update/readback |
| `open-above-wind-particle-field-kit` | deterministic allocation, dust texture, flow noise, centered advection, wrapping, buffer update, policy readback and disposal |
| `open-above-wind-visual-policy-test-kit` | static policy assertions and legacy visual retirement checks |

### Retired surface

`open-above-airstream-visual-kit` is deleted and no longer exported or composed. It must remain historical, not active inventory.

## Required parent authority

`open-above-wind-particle-simulation-budget-quality-admission-authority-domain`

```txt
WindVisualAdmission
  -> wind-visual-generation-kit
  -> wind-particle-policy-kit
  -> wind-particle-quality-tier-kit
  -> wind-particle-capacity-kit

WindParticleSimulation
  -> wind-sample-revision-kit
  -> wind-particle-update-plan-kit
  -> wind-particle-update-cadence-kit
  -> wind-particle-noise-profile-kit
  -> stale-wind-visual-update-rejection-kit
  -> wind-particle-update-result-kit

WindVisualBudget
  -> wind-particle-cpu-budget-kit
  -> wind-particle-buffer-write-budget-kit
  -> wind-particle-degradation-policy-kit
  -> wind-particle-visibility-admission-kit

WindVisualProjection
  -> wind-particle-frame-digest-kit
  -> first-wind-particle-bound-frame-ack-kit

WindVisualLifecycle
  -> wind-particle-retirement-kit
  -> wind-particle-runtime-fixture-kit
  -> wind-particle-browser-budget-fixture-kit
```

## Required command/result flow

```txt
WindVisualAdmissionCommand
  -> WindVisualAdmissionResult

WindParticleUpdateCommand
  -> WindParticleUpdateResult

WindVisualBudgetSettlementCommand
  -> WindVisualBudgetResult

WindVisualProjectionCommitCommand
  -> WindParticleFrameDigest
  -> FirstWindParticleBoundFrameAck

WindVisualRetirementCommand
  -> WindVisualRetirementResult
```

## Constraints

- Preserve Airstream as renderer-neutral wind truth.
- Keep production wind presentation under Sky, not Airstream.
- Preserve the new dust aesthetic, 50 m field and deterministic seeding as policy defaults, not universal constants.
- Reuse existing `open-above-quality-tier-kit` rather than introducing a parallel device classifier.
- Keep visual degradation separate from balloon simulation and wind truth.
- Retain explicit disposal and map-open update suspension.

## Boundary

This audit defines proposed ownership only. No DSK, runtime, test, package, workflow or deployment implementation changed.
