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
