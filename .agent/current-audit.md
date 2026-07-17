# Current Audit: TheOpenAbove Wind Particle Budget and Frame Authority

**Last aligned:** `2026-07-17T15-41-19-04-00`  
**Status:** `wind-particle-simulation-budget-quality-admission-authority-audited`  
**Reviewed pre-audit repository head:** `c066a1f4315ac7e0db87eb30ffb4bbe4201089d4`

## Summary

The active Meadow Lift scene retains Journey, Ballooning, Sky, Land, Navigation, Image Capture and Experience. The focused audit covers the new Sky-owned dust wind field that replaced the retired Airstream spline renderer.

The field uses deterministic initialization, persistent typed arrays, one DynamicDraw position buffer, one Points draw, layered 3D noise and explicit disposal. Its 3,200-particle policy is hardcoded and runs on every accepted flight frame without quality-tier admission, measured CPU or write budgets, adaptive degradation or exact wind-sample-to-frame proof.

## Intent

Make one wind-visual generation authoritative for sample binding, visual policy, quality tier, capacity, cadence, update budgets, degradation, diagnostics, retirement and the matching rendered frame.

## Interaction loop

```txt
boot
  -> Sky mounts Airstream without production route trails
  -> Sky creates one 3,200-particle dust field

flight frame
  -> Ballooning produces position and accepted Airstream sample
  -> Sky updates Airstream state from the supplied sample
  -> particles center on the balloon
  -> 3,200 layered noise evaluations advance local positions
  -> 9,600 scalar positions are rewritten
  -> the DynamicDraw attribute is marked for upload
  -> Experience renders the frame

map / disposal
  -> map-open state suspends simulation and particle updates
  -> Sky disposal removes Points and disposes geometry, material and texture
```

## Domains in use

```txt
Journey: session, map policy, RAF, failure containment, snapshots, disposal
Ballooning: simulation, controls, steering, terrain contact, pose, model animation
Sky: Airstream composition, Weather readback, dust particles, cloud field
Airstream: routes, field sampling, state, optional debug diagnostics; no route trails
Land: Core World configuration, generation, terrain sampling
Navigation: map, routes, Snap Points, reference cards
Image Capture: sightseeing, shutter, recognition, score
Experience: renderer, camera, balloon presentation, update/render, diagnostics
Balloon object/presentation: envelope, basket, burner, rigging, ropes, materials
Core World/Weather: foundation, features, landforms, atmosphere, layered weather
Visual environment: sky, terrain, water, flora, clouds, HDR, resolution
Validation/deploy: source checks, Vite artifact, Pages
```

## Current finding

```txt
legacy spline route renderer: removed
single Sky-owned production wind visual: present
persistent position/phase arrays: present
DynamicDraw position attribute: present
explicit resource disposal: present
source-policy test: present

WindVisualGeneration: absent
WindSampleRevision: absent
quality-tier capacity/noise/cadence policy: absent
CPU and buffer-write budget result: absent
adaptive degradation result: absent
stale update rejection: absent
runtime/browser fixture: absent
WindParticleFrameDigest: absent
FirstWindParticleBoundFrameAck: absent
```

No visual defect or performance regression was reproduced.

## Required authority

`open-above-wind-particle-simulation-budget-quality-admission-authority-domain`

## Inventory

The complete 125-surface kit/provider/adapter inventory and offered services are recorded in:

```txt
.agent/trackers/2026-07-17T15-41-19-04-00/project-breakdown.md
```

## Boundary

Documentation only. Runtime, rendering, gameplay, tests, build and deployment were not changed by this audit.
