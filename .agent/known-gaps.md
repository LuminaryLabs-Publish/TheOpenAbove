# Known Gaps: TheOpenAbove Host Clock Fixed-Step Flight Simulation

**Last aligned:** `2026-07-15T12-02-38-04-00`  
**Status:** `host-clock-fixed-step-flight-simulation-authority-audited`

## Summary

The RAF host admits at most `1/30` second per callback and performs one update batch. No accumulator, residual time, bounded catch-up policy, suspension result, overload receipt, interpolation descriptor, or clock-aligned frame acknowledgement exists.

## Plan ledger

**Goal:** keep clock identity, fixed-step execution, suspension, overload handling, rendering, browser proof, and retained product gaps dependency ordered.

- [x] Identify the callback-time loss path.
- [x] Trace all time-dependent simulation and presentation consumers.
- [x] Preserve existing HDR, cloud, world, mail, and lifecycle findings.
- [ ] Add one host-clock generation and policy descriptor.
- [ ] Add an active elapsed-time accumulator and residual state.
- [ ] Add bounded fixed-step execution and explicit overload receipts.
- [ ] Add map, visibility, and runtime suspension/resume settlement.
- [ ] Add interpolation and first clock-aligned frame evidence.
- [ ] Prove source, build, artifact, and Pages parity.

## Implemented state

```txt
performance.now callback timestamps: present
frameMs cap at 80 ms: present
dt cap at 1/30 second: present
one update batch per callback: present
map-open update suppression: present
render while map is open: present
dynamic-resolution frameMs sampling: present
```

## Primary host-clock gaps

```txt
HostClockGeneration: absent
ClockPolicyRevision: absent
monotonic interval admission result: absent
fixed-step descriptor: absent
elapsed-time accumulator: absent
residual time: absent
bounded catch-up step count: absent
overload policy: absent
discarded-time receipt: absent
input revision binding: absent
per-domain step receipts: absent
```

## Source-permitted timing paths

### Sustained 20 FPS

```txt
50 ms callback interval
  -> 33.333 ms simulation admitted
  -> about 16.667 ms discarded
  -> simulation pace about 0.667x wall time
```

### Sustained 10 FPS

```txt
100 ms callback interval
  -> frameMs capped to 80 ms
  -> dt capped to 33.333 ms
  -> about 66.667 ms discarded
  -> simulation pace about 0.333x wall time
```

### Sustained 5 FPS

```txt
200 ms callback interval
  -> frameMs capped to 80 ms
  -> dt capped to 33.333 ms
  -> about 166.667 ms discarded
  -> simulation pace about 0.167x wall time
```

These are source-derived pacing ratios. They were not reproduced in a browser.

## Suspension and lifecycle gaps

```txt
map suspension identity: absent
map suspension result: absent
resume result: absent
visibility suspension policy: absent
pagehide settlement: absent
runtime replacement clock retirement: absent
stale callback rejection: absent
input-edge reset receipt: absent
```

The current map-open loop updates `last` on every callback, so hidden catch-up debt is not accumulated. That behavior is useful but implicit and unversioned.

## Rendering and evidence gaps

```txt
previous/current simulation snapshots: absent
interpolation alpha: absent
rendered simulation revision: absent
rendered clock generation: absent
HostClockFrameResult: absent
ClockSnapshot: absent
FirstClockAlignedFrameAck: absent
controlled-clock browser fixture: absent
source/build/artifact/Pages parity: unproven
```

## Dependency order

```txt
clock identity and policy
  -> monotonic interval admission
  -> active accumulator
  -> bounded fixed-step batch
  -> per-domain deterministic order
  -> residual and overload settlement
  -> suspension and resume rebasing
  -> render interpolation
  -> visible-frame acknowledgement
  -> build artifact and Pages parity
```

## Retained product gaps

HDR color/depth target coherence, cloud relative depth, ground-contact delivery eligibility, provider/build identity, route lifecycle, world adoption, terrain and vegetation proof, Air Mail history, and flight persistence remain unresolved.

## Do not claim

Do not claim observed slow motion, real-time pacing, fixed-step correctness, overload recovery, pause safety, interpolation quality, artifact parity, deployed parity, or production readiness until the required fixtures pass.