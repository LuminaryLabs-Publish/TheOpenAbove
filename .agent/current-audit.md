# Current Audit: TheOpenAbove Balloon Simulation Tick Allocation and Terrain Sample Authority

**Last aligned:** `2026-07-18T01-41-38-04-00`  
**Status:** `balloon-simulation-tick-allocation-terrain-sample-budget-authority-audited`  
**Reviewed pre-audit repository head:** `3446d1c65796bdd57bc1aa1ad7dfc59674292b7e`

## Summary

The active Meadow Lift scene retains Journey, Ballooning, Sky, Land, Navigation, Image Capture, and Experience. The focused audit covers the accepted balloon simulation tick between bounded frame admission and visible pose projection.

The simulation keeps persistent position, velocity, and wind vectors, but the source-local tick path creates at least nine short-lived objects or arrays before live sampler and renderer allocations. It also evaluates fallback wind before sampler need is known and requests the same post-integration terrain height twice.

## Intent

Make one Balloon Simulation generation authoritative for scratch resources, normalized flow, fallback evaluation, terrain sampling, tick budgets, deterministic parity, diagnostics, retirement, and the matching frame.

## Interaction loop

```txt
boot
  -> Ballooning mounts the balloon and creates Balloon Simulation
  -> Simulation installs keyboard and blur listeners

accepted flight tick
  -> Journey admits bounded dt while map is closed
  -> controls resolve burner, vent, and steering
  -> fallback wind is eagerly built
  -> live Airstream flow is normalized and copied
  -> steering resolves heading and horizontal velocity
  -> velocity and position integrate
  -> terrain height is requested for floor settlement
  -> terrain height is requested again for altitude
  -> balloon pose, Sky, Experience, capture, engine, and rendering advance

retirement
  -> map-open state suppresses simulation updates
  -> Ballooning disposal removes simulation listeners and detaches the balloon
```

## Domains in use

```txt
Journey: frame admission, map pause, failure containment, snapshots, disposal
Ballooning: model mount, simulation update, pose, animation, state, disposal
Balloon Simulation: input, flow, steering, buoyancy, integration, terrain, telemetry
Sky/Airstream: route and field sampling, flow evidence, wind visuals, diagnostics
Land/Core World: terrain provider, world generation, foundation/features
Navigation/Image Capture: map, Snap Points, shutter, recognition, completion
Experience/Presentation: balloon pose, camera, visual update/render, diagnostics
Validation/Deploy: source checks, Vite artifact, revision stamping, Pages
```

## Current finding

```txt
persistent position/velocity/wind vectors: present
bounded dt and map suspension: present
named input listener retirement: present

source-local minimum objects/arrays per accepted tick: 9
source-local minimum at 60 accepted ticks/second: 540
fallback wind evaluated before sampler need: yes
public airstream identity replaced each tick: yes
contributors copied twice: yes
steering result allocated each tick: yes
velocity target vector allocated each tick: yes
same-coordinate post-integration terrain queries: 2

BalloonSimulationGeneration: absent
BalloonTerrainSampleResult: absent
BalloonSimulationBudgetResult: absent
BalloonSimulationTickDigest: absent
FirstAllocationBoundFlightFrameAck: absent
```

No hitch, garbage-collection pause, terrain defect, or determinism regression was reproduced.

## Required authority

`open-above-balloon-simulation-tick-allocation-terrain-sample-budget-authority-domain`

## Inventory

The complete 125-surface kit/provider/adapter inventory and offered services are recorded in:

```txt
.agent/trackers/2026-07-18T01-41-38-04-00/project-breakdown.md
```

## Boundary

Documentation only. Runtime, simulation, gameplay, rendering, input, tests, build, and deployment were not changed by this audit.