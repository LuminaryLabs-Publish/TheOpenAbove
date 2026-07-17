# Current Audit: TheOpenAbove Gaussian Cloud LOD Membership Transition

**Last aligned:** `2026-07-17T02-32-08-04-00`  
**Status:** `gaussian-cloud-lod-membership-transition-authority-audited`  
**Previous central repo-local head:** `132f1c5998c86a0201b48215167f8bf28d921e6c`  
**Reviewed pre-audit repository head:** `5695e11ab7948ea6417b3ccf1c1d66550aa5c4df`

## Summary

The active Meadow Lift scene retains Journey, Ballooning, Sky, Land, Navigation, Image Capture and Experience. Sky now publishes a deterministic close-cloud bank field. Visual projects ground fog, low clouds and mid clouds through an instanced Gaussian adapter while high clouds and cirrus remain on the distant volumetric renderer.

The focused gap is membership settlement. Rebatching is deterministic from current inputs but does not preserve or acknowledge a stable cross-frame membership generation.

## Intent

Make one accepted cloud membership and instance-buffer generation authoritative for what the player sees during close-cloud traversal.

## What needs to happen

```txt
CloudFieldAdmissionCommand
  -> bind world, weather-layer, seed and quality revisions
  -> CloudFieldAdmissionResult
  -> CloudFieldRevision / CloudFieldDigest

CloudSplatBudgetCommand
  -> bind camera, weather, predecessor membership and capacity
  -> stable per-bank quotas
  -> CloudSplatBudgetResult

CloudMembershipTransitionCommand
  -> apply LOD hysteresis, retention and crossfade
  -> reject stale rebatches
  -> CloudLodMembershipResult

CloudProjectionCommitCommand
  -> commit one instance-buffer generation
  -> CloudProjectionResult / CloudProjectionDigest
  -> FirstGaussianCloudFrameAck
```

## Interaction loop

```txt
boot
  -> Sky builds deterministic close-cloud banks
  -> Experience passes field and live weather to Visual
  -> Visual separates Gaussian close layers from distant volumetric layers

frame
  -> Weather and Layered Weather advance
  -> camera movement or 0.2-second age requests rebatch
  -> field query returns volume-reachable banks
  -> bank distance selects one of five tiers
  -> candidates receive live weather opacity
  -> nearest-first sort and fixed-capacity truncation
  -> far-to-near sort
  -> direct instance-buffer replacement
  -> HDR presentation
```

## Domains in use

```txt
Journey: session, map policy, RAF and aggregate snapshots
Ballooning: flight simulation, wind-relative steering, terrain contact and pose
Sky: airstreams, Weather readback, wind particles and deterministic cloud field
Land: Core World configuration, features, foundation and terrain readback
Navigation: map lifecycle, routes, Snap Points and journal projection
Image Capture: camera mode, shutter, recognition and score
Experience: renderer, camera, visual update/render and diagnostics
Core World: Foundation, Features, Landforms and Atmosphere descriptors
Weather: base and semantic layered weather advancement/snapshots
Cloud presentation: Gaussian close layers plus volumetric high/cirrus layers
Build/deploy: tiered validation, Vite artifact and GitHub Pages
```

## Current finding

```txt
five deterministic LOD tiers: present
volume-reach bank query: present
nearest-first capacity retention: present
far-to-near transparency ordering: present
quality capacities 7000/4400/2400: present

accepted rebatch generation: absent
predecessor membership: absent
per-bank quota result: absent
LOD hysteresis: absent
membership retention: absent
enter/leave crossfade: absent
stale rebatch rejection: absent
CloudProjectionDigest: absent
FirstGaussianCloudFrameAck: absent
```

A rebatch overwrites all instance attributes and `instanceCount` after camera movement or a 0.2-second timeout. No specific browser-visible popping incident was reproduced.

## Inventory

The complete 124-surface kit/provider/adapter inventory and offered services are recorded in:

```txt
.agent/trackers/2026-07-17T02-32-08-04-00/project-breakdown.md
```

## Required parent domain

`open-above-gaussian-cloud-lod-membership-transition-authority-domain`

## Boundary

Documentation only. Runtime, rendering, gameplay, tests, build and deployment were not changed.