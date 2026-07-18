# Known Gaps: TheOpenAbove Map-Open Dual-Surface Render Work Budget

**Last aligned:** `2026-07-18T12-38-04-04-00`  
**Status:** `map-open-dual-surface-render-work-budget-authority-audited`

## Summary

Map-open gameplay suspension is explicit, but presentation ownership is split between Journey's continuing Three.js/HDR render loop and the parchment overlay's independent Canvas2D RAF. The combined policy, dirty state, work budget and frame identity are not explicit.

## Intent

Keep performance and correctness claims provisional until one authority owns map-open generation, surface policy, redraw admission, RAF leases, work settlement, retirement, diagnostics and visible-frame proof.

## Generation and policy gaps

```txt
MapOpenGeneration: absent
JourneyGeneration binding: absent
NavigationGeneration binding: absent
accepted WorldRevision: absent
accepted CaptureRevision: absent
accepted PlayerPoseRevision: absent
accepted ViewportRevision: absent
MapSurfacePlanResult: absent
explicit background policy: absent
explicit background cadence: absent
explicit map redraw cadence: absent
stale generation rejection: absent
```

## Work and redraw gaps

```txt
Journey RAF remains active while map open: yes
map RAF remains active while map open: yes
scheduled loops while map open: 2
Experience.render with dt zero: yes
map redraw every map RAF: yes
fixed decorative circles per map draw: 90
reference gradient creations per map draw: 1

MapDirtyState: absent
redraw reason: absent
unchanged redraw rejection: absent
measured Journey callback count: absent
measured map callback count: absent
measured Experience render count: absent
measured map draw count: absent
measured Canvas2D duration: absent
measured background render duration: absent
MapRenderWorkBudgetResult: absent
```

At a hypothetical 60 displayed frames per second, source arithmetic yields 120 RAF callbacks, 60 Experience renders, 60 map draws, 5,400 decorative-circle iterations and 60 gradient creations per second. This is not a measured browser result.

## Projection and lifecycle gaps

```txt
main/map surface generation binding: absent
MapRedrawAdmissionResult: absent
MapRenderResult: absent
MapSurfaceDigest: absent
FirstMapBoundFrameAck: absent
duplicate map RAF rejection result: absent
stale callback rejection result: absent
repeated close result: absent
public map render diagnostics: absent
```

## Proof gaps

```txt
dual-RAF browser trace: absent
steady-open dirty-redraw fixture: absent
open/close/open duplicate-loop fixture: absent
resize while open fixture: absent
dispose callback-retirement fixture: absent
translucent background policy fixture: absent
map/player/capture revision fixture: absent
source/build/Pages parity: absent
```

## Current risk boundary

Source inspection proves two scheduling paths and recurring Canvas2D redraw logic. It does not prove that the browser executes both at exactly 60 Hz, that the work is harmful, that the 3D background should stop, or that dirty redraw will improve performance.

## Retained product gaps

Balloon simulation scratch/query budgeting, wind-particle budgeting, balloon rigging allocation/retirement, camera pointer admission, Gaussian cloud membership, camera zoom, photo artifacts, validation severity, weather-clock ownership, page lifecycle, WebGL recovery, audio, control coverage, fixed-step pacing, HDR/depth coherence, provider identity, route retirement, terrain/flora proof, and persistence remain unresolved.

## Do not claim

Do not claim measured RAF cadence, Canvas2D cost, GPU cost, battery or thermal impact, reduced work, frame-time improvement, exact map/world convergence, artifact parity, Pages parity, or production readiness until implementation and fixtures exist.