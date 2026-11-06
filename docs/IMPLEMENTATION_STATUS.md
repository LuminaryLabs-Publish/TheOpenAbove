# Implementation Status

## Release Integration

The `release-integration/nexusengine-0.0.4-showcase-20260802` branch consumes
NexusEngine candidate commit `16aee598c06efcb7b511e4827ee3f7e23ce3549b`.

Implemented and locally proven:

```txt
exact Git-SHA NexusEngine dependency
Three.js 0.165.0 package dependency and lockfile
no CDN, import-map, local symlink, or private Engine source dependency
canonical Runtime, Spatial, World, Foundation, Feature, Weather, and Startup APIs
game-owned browser Startup presentation adapter
game-owned disk world surface extracted from frozen ProtoKit history
shared deterministic balloon-flight native kernel
target-specific Web and native Build entries
MCP inspect, plan, exact approval, apply, receipt, no-op, and restart loop
on-demand GameHost build diagnostics
manual-only Pages deployment workflow
desktop and mobile Chromium gameplay proof with a clean console
```

Still externally gated:

```txt
Engine candidate push to its remote default branch
clean install from that remote exact SHA
Android XR package job on Linux
PCVR package job on Windows
consumer pin propagation after the final Engine SHA stops moving
hardware execution on Android XR and Windows OpenXR devices
```

The native package claim is intentionally limited to the portable flight kernel
and OpenXR host. The full Three.js Web presentation is not claimed to execute
natively in `0.0.4`.

## 2026-11-06 Implementation Cycle Reconciliation

Current main is locked to the NexusEngine commit 8a60167fc945109408851c586a9355b1147438d5, matching the dependency already resolved by the 2026-10-23 CI run. The earlier 16aee598 candidate referenced above is historical.

GitHub Pages deployment requires manual workflow dispatch. Every main push still triggers the independent Validate Main workflow (clean install, tests, showcase proof, production build) without publication.

A deterministic Meadow Lift mission authority and unit fixtures now establish the source/progress/phase/restart/timeout contract. World-space objective contacts, presentation, and Journey integration are NOT implemented by this step. Do not claim completion of TOA-006.

The parchment map now redraws on open/resize/explicit revision changes rather than owning a recurring RAF while paused. Journey's Three.js background RAF remains present. Browser performance claims are withheld until measured.

Browser flight behavior, mobile inputs, native XR, and the 10-minute expedition are still unverified and require build-pinned gameplay evidence.

## Meadow Lift world integration

Meadow Lift now instantiates in-world thermal and wind-gate markers and a destination landing ring, reports progress through an unobtrusive HUD, and wires proximity events into the deterministic reducer. The timer is 600 seconds and R reloads the flight. Source contract and headless world-contact tests cover success, timeout and restart. Real browser usability and sustained performance have not yet been verified.
