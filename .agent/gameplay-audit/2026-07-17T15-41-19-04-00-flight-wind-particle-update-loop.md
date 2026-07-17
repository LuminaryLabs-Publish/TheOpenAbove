# Gameplay Audit: Flight Wind Particle Update Loop

**Timestamp:** `2026-07-17T15-41-19-04-00`

## Summary

Wind particles are presentation-only. Balloon flight truth remains owned by Ballooning and Airstream sampling. Sky consumes the same accepted airstream sample used by the flight frame, but no revision identity proves that the displayed dust belongs to that exact sample or policy generation.

## Current loop

```txt
Journey accepts flight frame
  -> Ballooning consumes controls and updates simulation
  -> Ballooning returns position, elapsed and airstream sample
  -> Sky receives that supplied sample
  -> Airstream state updates
  -> dust field centers on balloon position
  -> dust particles advance along sampled velocity plus local 3D noise
  -> Experience updates balloon/camera/world
  -> frame renders
```

Map behavior:

```txt
map opens
  -> Journey sets state.status = map
  -> simulation and Sky updates stop
  -> render continues with dt = 0
```

## Gameplay strengths

- Wind visualization does not alter simulation truth.
- Sky receives the already sampled flight evidence instead of independently resampling.
- Map suspension prevents hidden wind-particle simulation while reading the map.
- Particle volume follows the balloon and remains locally readable.
- Legacy route trails no longer imply authored rail guidance in the world.

## Gap

The runtime passes an object reference as `sample`, but does not publish:

```txt
FlightFrameId
WindSampleRevision
WindVisualGeneration
WindPolicyRevision
WindParticleUpdateResult
WindVisualBudgetResult
FirstWindParticleBoundFrameAck
```

Therefore diagnostics cannot prove that a visible particle frame corresponds to one accepted flight/wind sample, nor whether visual degradation occurred without affecting flight truth.

## Required gameplay contract

```txt
accepted flight frame
  -> immutable WindSampleRevision
  -> WindParticleUpdateCommand
  -> WindParticleUpdateResult
  -> presentation-only degradation state
  -> rendered WindParticleFrameDigest
```

Any capacity, cadence or noise reduction must remain presentation-only. Balloon forces, route influence, steering and capture state must continue to consume full authoritative Airstream data.

## Required fixtures

- Same flight/wind sample produces deterministic particle update state under one policy.
- Visual quality changes do not change balloon simulation or Airstream snapshots.
- Map-open state prevents particle buffer mutation.
- Resume uses the next accepted flight sample without a large accumulated step.
- Rendered diagnostics identify the matching flight, sample, policy and buffer revisions.

## Boundary

No gameplay behavior changed. No claim is made that the current particles are visually inaccurate or materially expensive.
