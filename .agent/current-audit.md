# Current Audit: TheOpenAbove Host Clock Fixed-Step Flight Simulation

**Last aligned:** `2026-07-15T12-02-38-04-00`  
**Status:** `host-clock-fixed-step-flight-simulation-authority-audited`  
**Reviewed repository head:** `d122f875e321eb3a52fda37af4de9abc4ca47105`  
**Reviewed runtime source revision:** `1417c80309218c7c61def3b2f09a977eaab8b953`

## Summary

The active browser host derives `frameMs` from `performance.now()`, caps it at 80 ms, derives `dt`, caps that at `1/30` second, and executes one update batch per RAF callback. No accumulator or residual-time state carries the unconsumed interval. Sustained callback rates below 30 FPS therefore permit flight and simulation time to advance slower than wall time.

## Plan ledger

**Goal:** isolate the smallest authority boundary that makes browser time admission, fixed-step execution, map suspension, overload handling, render interpolation, telemetry, and visible proof consume one clock generation.

- [x] Compare the full Publish inventory, central ledger, root `.agent` coverage, and current heads.
- [x] Select only TheOpenAbove using the oldest synchronized eligible rule.
- [x] Inspect `src/main.js`, balloon simulation, Air Mail, airstream, visual, map, telemetry, current audits, and machine registry.
- [x] Trace boot, active callbacks, map-suspended callbacks, delayed callbacks, rendering, and public readback.
- [x] Preserve all 101 active named surfaces and their service ownership.
- [x] Add the timestamped tracker and host-clock-specific audit family.
- [ ] Implement and prove deterministic fixed steps, residual time, bounded overload, suspension, resume, interpolation, and first-frame acknowledgement.

## Complete interaction loop

```txt
workflow and browser admission
  -> checkout product and NexusEngine provider
  -> test build artifact and Pages deployment
  -> compose balloon airstream Air Mail Core World visual and UI domains
  -> create renderer scene camera world cloud HDR map and GameHost

active callback
  -> read performance timestamp
  -> clamp callback interval to 80 ms
  -> clamp simulation delta to 33.333 ms
  -> update balloon once
  -> update Air Mail once
  -> update airstream once
  -> update balloon model presentation camera and visual world once
  -> tick NexusEngine once
  -> render one cloud/HDR frame

map-suspended callback
  -> update host timestamp
  -> skip simulation mail airstream camera world and engine updates
  -> render with zero simulation delta

low-FPS callback
  -> callback interval exceeds 33.333 ms
  -> execute one capped update batch
  -> discard all remaining interval
  -> publish no discarded-time or overload receipt
```

## Domains in use

```txt
GitHub workflow provider checkout Vite build artifact and Pages deployment
browser route import map RAF input resize errors visibility and GameHost
host-clock identity interval admission accumulator fixed steps suspension resume overload and interpolation
Nexus Engine telemetry and Core World foundations features and landforms
balloon flight telemetry presentation camera clipping and model lifecycle
airstream routes fields forces visuals and diagnostics
Air Mail parcels routes towns volumes progress timestamps and completion
staged world generation terrain vegetation grass flowers water and landmarks
quality detection DPR policy dynamic resolution and render-surface sizing
weather sky sun aerial perspective volumetric clouds and cloud LOD
HDR targets depth attachments composer passes color grading and lens response
parchment map validation tests and central tracking
```

## Kit and service census

```txt
local source-backed kits:           71
runtime-implied adapters:           13
Core World provider surfaces:       17
active documented total:           101
inactive or retired legacy:         13
planned host-clock surfaces:        20
new runtime kit IDs:                 0
```

The complete kit-by-kit service inventory is in `.agent/trackers/2026-07-15T12-02-38-04-00/project-breakdown.md` and `.agent/kit-registry.json`.

## Source-backed findings

```txt
host frameMs cap: 80 ms
host dt cap: 1/30 second
simulation updates per callback: 1
active accumulator: absent
residual time: absent
fixed-step batch result: absent
catch-up budget: absent
discarded-time receipt: absent
map suspension result: absent
resume rebase result: absent
interpolation alpha: absent
FirstClockAlignedFrameAck: absent
```

## Source-permitted examples

```txt
10 FPS
  -> 100 ms callback interval
  -> 33.333 ms simulation admitted
  -> about 66.667 ms discarded
  -> simulation advances at about one-third wall speed

5 FPS
  -> 200 ms callback interval
  -> 33.333 ms simulation admitted
  -> about 166.667 ms discarded
  -> simulation advances at about one-sixth wall speed
```

These are source-derived timing paths. No browser pacing defect was reproduced.

## Affected consumers

```txt
state.elapsed
fallback wind phase and speed
airstream sampling and force contribution
burner vent steering and bank smoothing
buoyancy velocity position altitude and distance
Air Mail progress deliveredAt and town visuals
balloon animation and presentation
camera update
visual world weather terrain vegetation and cloud update
NexusEngine tick and telemetry
```

## Required parent domain

```txt
open-above-host-clock-fixed-step-flight-simulation-authority-domain
```

## Required transaction

```txt
HostClockFrameCommand
  -> bind document runtime RAF clock map input and simulation revisions
  -> admit one monotonic callback interval
  -> classify active suspended resumed and overload states
  -> accumulate active elapsed time
  -> execute bounded deterministic fixed steps in declared domain order
  -> retain residual time or publish explicit discarded-time receipts
  -> publish HostClockFrameResult ClockSnapshot and per-domain step receipts
  -> render previous/current accepted revisions with interpolation
  -> publish FirstClockAlignedFrameAck
```

## Validation boundary

Documentation only. Runtime code, shaders, gameplay, packages, tests, workflows, and deployment were not changed. No browser, controlled-clock, build, artifact, or Pages fixture was run.