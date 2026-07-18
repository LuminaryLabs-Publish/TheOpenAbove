# Gameplay Audit: Balloon Flight Tick Allocation Loop

**Timestamp:** `2026-07-18T01-41-38-04-00`  
**Status:** `balloon-simulation-tick-allocation-terrain-sample-budget-authority-audited`

## Interaction loop

```txt
player holds burner, vent, or steering input
  -> Journey admits a bounded active tick
  -> Balloon Simulation resolves controls
  -> live Airstream or fallback wind supplies flow
  -> steering rotates horizontal flow by up to ±15 degrees
  -> buoyancy and damping update vertical velocity
  -> velocity interpolates toward wind plus vertical velocity
  -> position integrates
  -> terrain contact settles the floor
  -> altitude and distance update
  -> balloon pose, rigging, camera, wind visuals, capture, and rendering advance
```

## Source-backed workload

The local active-tick path creates at least nine short-lived objects or arrays before allocations inside the live sampler or renderer. It also requests `terrainHeight(x, z)` twice at the same post-integration coordinates.

At 60 accepted ticks per second, the source-local minimum is 540 allocations per second. This is arithmetic from visible construction sites, not a heap profile.

## Gameplay constraints

Any later optimization must preserve:

- identical burner and vent response;
- identical Airstream route, influence, contributor, and capture-state evidence;
- identical ±15-degree flow-relative steering;
- identical buoyancy, damping, ceiling, and velocity interpolation equations;
- identical 30-unit terrain floor clearance;
- identical altitude, distance, heading, animation, and message results;
- map-open simulation suspension;
- deterministic output for identical inputs, dt, sampler, terrain, and starting state.

## Required results

```txt
BalloonSimulationTickResult
BalloonTerrainSampleResult
BalloonSimulationBudgetResult
BalloonSimulationTickDigest
FirstAllocationBoundFlightFrameAck
```

## Proof gates

- Compare long deterministic traces before and after scratch-state adoption.
- Instrument terrain provider calls and require one post-integration sample per accepted tick.
- Verify fallback wind is evaluated only when required.
- Verify no stale or retired generation mutates flight state.
- Observe browser heap, GC, frame pacing, and gameplay parity during a long flight.

## Boundary

No gameplay equation, control, terrain response, animation, or runtime behavior changed in this audit.