# Wind System Audit: Dust Field Budget and Quality Contract

**Timestamp:** `2026-07-17T15-41-19-04-00`

## Summary

The active wind visual is now one deterministic dust field under Sky. It replaces the prior spline route renderer and exposes a clearer local flow signal. Its visual policy is still hardcoded and unmeasured.

## Current policy

```txt
particle count: 3,200
horizontal radius: 50 m
vertical radius: 27.5 m
particle size: 0.11
opacity: 0.5
blend mode: NormalBlending
size attenuation: enabled
depth test: enabled
depth write: disabled
frustum culling: disabled
position buffer: persistent DynamicDraw Float32Array
phase buffer: persistent Float32Array
noise model: directional-layered-3d
update cadence: every accepted flight frame
```

## Current update cost shape

For each particle and accepted flight frame:

```txt
read 3 local position scalars
read 1 phase scalar
evaluate layered 3D flow noise
combine normalized wind and local noise
write 3 wrapped position scalars
```

Default frame totals:

```txt
particle evaluations: 3,200
position scalar writes: 9,600
position upload payload: approximately 38,400 bytes
noise calls: 3,200
primary trigonometric terms in noise function: 9 per particle
```

The byte figure describes the position array size, not a measured GPU transfer. The source does not expose actual driver upload cost.

## Strengths

- Deterministic initial positions and phases.
- Stable typed-array identities.
- One draw surface.
- Explicit resource disposal.
- Bounded dt and travel speed.
- Bounded wrapping volume.
- Source-policy test protects the intended visual constants and legacy removal.

## Gaps

```txt
policy object: implicit in constructor defaults and Sky literals
quality-tier binding: absent
capacity tiers: absent
noise tiers: absent
cadence tiers: absent
visibility admission: absent
frame-pressure feedback: absent
measured CPU budget: absent
measured upload budget: absent
degradation result: absent
sample/buffer/frame correlation: absent
runtime fixture: absent
browser performance fixture: absent
```

## Proposed quality policy

```txt
low
  particle capacity: policy-defined lower tier
  update cadence: reduced or staggered
  noise profile: reduced complexity

medium
  particle capacity: balanced tier
  update cadence: every frame or staggered by pressure
  noise profile: standard

high
  particle capacity: current 3,200 default or measured successor
  update cadence: every accepted frame
  noise profile: full directional-layered-3d
```

Exact values must come from measured fixtures. This audit does not prescribe untested counts.

## Required budget result

```txt
WindVisualBudgetResult {
  generation,
  policyRevision,
  qualityTierRevision,
  flightFrameId,
  windSampleRevision,
  particleCapacity,
  particlesEvaluated,
  noiseEvaluations,
  scalarWrites,
  positionBytes,
  updateDurationMs,
  cadence,
  degradation,
  accepted
}
```

## Required retirement result

```txt
WindVisualRetirementResult {
  generation,
  pointsDetached,
  geometryDisposed,
  materialDisposed,
  textureDisposed,
  repeatedRetirement,
  accepted
}
```

## Required fixtures

- Construct the field with a test scene and verify defaults.
- Verify stable positions/phases/attribute identities across updates.
- Verify one update mutates only the admitted generation.
- Verify map suspension performs no update.
- Measure update cost after warm-up at each admitted tier.
- Verify degradation is presentation-only.
- Verify disposal and repeated disposal behavior.
- Run in browser, built artifact and Pages origin.

## Boundary

No target budget, device tier, improvement percentage or visual correctness is claimed until runtime measurements exist.
