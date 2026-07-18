# Simulation System Audit: Flow Scratch and Terrain Sample Contract

**Timestamp:** `2026-07-18T01-41-38-04-00`  
**Status:** `balloon-simulation-tick-allocation-terrain-sample-budget-authority-audited`

## Current versus proposed ownership

| Concern | Current | Proposed owner |
|---|---|---|
| Fallback wind | Eager object and trigonometric evaluation every tick | `lazy-fallback-wind-kit` |
| Normalized flow | New result, velocity, and contributors | `airstream-flow-scratch-kit` |
| Public airstream state | Replaced each tick | `airstream-state-in-place-copy-kit` or a versioned immutable result |
| Contributor storage | Copied twice | `airstream-contributor-scratch-kit` |
| Steering output | New object each resolve | `wind-relative-steering-result-scratch-kit` |
| Velocity target | New `THREE.Vector3` each tick | `balloon-velocity-target-scratch-kit` |
| Terrain floor and altitude | Two same-coordinate provider calls | `balloon-terrain-sample-reuse-kit` |
| Tick work evidence | Not published | allocation and terrain-query budget kits |
| Frame correlation | Not published | tick digest and frame acknowledgement kits |

## Scratch-resource contract

Generation-owned scratch state should:

1. Be allocated once when Balloon Simulation is admitted.
2. Have stable identity for the generation lifetime.
3. Never escape as mutable public evidence unless explicitly documented.
4. Be cleared or overwritten deterministically each accepted tick.
5. Reject writes after generation retirement.
6. Be harmless under repeated retirement.
7. Publish identity and capacity through diagnostics without exposing live mutable objects.

## Terrain-sample contract

```txt
position integration completes
  -> sample terrain once at accepted x/z
  -> assign TerrainSampleRevision
  -> settle floor clearance from height
  -> calculate altitude from the same height
  -> publish BalloonTerrainSampleResult
```

If floor correction changes only `y`, the same terrain height remains valid for altitude. A new query is required only if accepted horizontal coordinates or provider revision change.

## Determinism contract

Scratch reuse is valid only when a deterministic trace produces identical accepted values for:

```txt
position
velocity
wind
verticalVelocity
altitude
burner
vent
steering input and angle
heading
distance
airstream identity/influence/contributors
balloon pose and animation inputs
```

## Measurement contract

Record, do not infer:

- allocations attributed to the simulation path;
- reused scratch writes;
- live-sampler and fallback evaluation counts;
- terrain-provider call count;
- warm and long-flight tick duration;
- browser heap and garbage-collection observations where available.

## Boundary

The source count is a conservative construction-site census. It is not a measured heap allocation, retained-memory, or garbage-collection claim.