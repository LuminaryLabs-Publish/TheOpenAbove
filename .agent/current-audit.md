# Current Audit: TheOpenAbove Balloon Rigging Frame Budget and Resource Retirement

**Last aligned:** `2026-07-17T10-41-44-04-00`  
**Status:** `balloon-rigging-frame-budget-resource-retirement-authority-audited`  
**Reviewed pre-audit repository head:** `9d9214b8c8cdbadf5c2ce40e6a794b1f88189877`

## Summary

The active Meadow Lift scene retains Journey, Ballooning, Sky, Land, Navigation, Image Capture, and Experience. The focused audit covers the animated balloon rigging path from flight-state tension through four soft-rope buffer updates and into the rendered frame.

Persistent typed arrays are reused, but the CPU path creates fresh endpoint vectors, point arrays, point clones, tangent frames, ring normals, and ring positions every frame. The balloon, rigging, and rope kits expose no authoritative resource inventory, update result, stale-update rejection, or dispose result.

## Intent

Make one rigging generation authoritative for CPU scratch capacity, dynamic GPU buffers, frame budgets, replacement, retirement, diagnostics, and visible-frame proof.

## What needs to happen

```txt
RiggingResourceAdmissionCommand
  -> resource manifest
  -> RiggingResourceAdmissionResult

RiggingFrameUpdateCommand
  -> reusable scratch
  -> buffer writes
  -> RiggingFrameUpdateResult

RiggingFrameBudgetSettlementCommand
  -> RiggingFrameBudgetResult

RiggingResourceRetirementCommand
  -> RiggingResourceRetirementResult

RiggingFrameCommitCommand
  -> RiggingFrameDigest
  -> FirstRiggingBoundFrameAck
```

## Interaction loop

```txt
boot
  -> build balloon, rigging, four ropes, geometries, materials, and buffers

flight
  -> simulation produces vertical velocity and lateral trim
  -> rigging derives tension
  -> every rope recomputes CPU points and local frames
  -> persistent position/normal buffers update
  -> frame renders

replacement/disposal
  -> previous vehicle children can be detached
  -> no explicit resource retirement result exists
```

## Domains in use

```txt
Journey: session, map policy, RAF, failure containment, snapshots, disposal
Ballooning: simulation, controls, steering, terrain contact, pose, model animation
Sky: airstreams, weather readback, particles, cloud field
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
persistent dynamic rope buffers: present
in-place position/normal writes: present
bounded default topology: present
flight-derived tension: present

rigging/resource generation IDs: absent
resource manifest: absent
reusable CPU scratch state: absent
per-frame allocation/update budget: absent
stale update rejection: absent
replacement retirement: absent
idempotent dispose result: absent
public rigging diagnostics: absent
RiggingFrameDigest: absent
FirstRiggingBoundFrameAck: absent
```

No stutter, memory leak, or GPU exhaustion was reproduced.

## Inventory

The complete 125-surface kit/provider/adapter inventory and offered services are recorded in:

```txt
.agent/trackers/2026-07-17T10-41-44-04-00/project-breakdown.md
```

## Required parent domain

`open-above-balloon-rigging-frame-budget-resource-retirement-authority-domain`

## Boundary

Documentation only. Runtime, rendering, gameplay, tests, build, and deployment were not changed.