# Current Audit: TheOpenAbove Page-Lifecycle Suspension and Resume

**Last aligned:** `2026-07-16T07-58-10-04-00`  
**Status:** `page-lifecycle-flight-suspension-resume-authority-audited`  
**Reviewed pre-audit repository head:** `d1d48c49ff687d2a6aa10c1ffd152eb6a771b3ff`  
**Reviewed runtime source revision:** `1417c80309218c7c61def3b2f09a977eaab8b953`

## Summary

The highest-value current gap is document lifecycle ownership. Browser throttling can stop both RAF loops, but the product publishes no suspension generation, no accepted pause reason, no cross-domain settlement and no first resumed frame tied to a rebased clock.

## Plan ledger

**Goal:** isolate one lifecycle authority that keeps browser callbacks as evidence producers while simulation, Air Mail, world work, input and visible-frame adoption remain result driven.

- [x] Compare the current Publish inventory, central ledgers and root `.agent` coverage.
- [x] Select only TheOpenAbove by the oldest synchronized rule.
- [x] Inspect `src/main.js`, balloon input, map RAF, package checks and prior lifecycle audits.
- [x] Preserve all 101 active named surfaces and their services.
- [x] Add the timestamped lifecycle audit family.
- [ ] Implement and prove lifecycle transition settlement and resume convergence.

## Complete interaction loop

```txt
boot
  -> compose simulation Air Mail airstream world map camera and rendering
  -> attach global keyboard blur resize and map listeners
  -> start flight RAF

visible flight frame
  -> derive clamped frameMs and dt
  -> update simulation delivery airstream balloon camera world and engine
  -> render clouds HDR and canvas
  -> schedule the next flight RAF

map-open frame
  -> main RAF keeps rendering with dt=0
  -> map owns a second RAF and redraws the parchment surface

background or frozen document today
  -> browser may throttle or suspend both RAF loops
  -> no lifecycle command or result is published
  -> only window blur explicitly clears held flight keys
  -> no owned Air Mail world-generation camera or render suspension state exists

resume today
  -> next flight callback clamps the large wall interval to 80 ms
  -> simulation consumes at most 1/30 second
  -> last timestamp is replaced
  -> no resume clock result or first-resumed-frame acknowledgement exists
```

## Domains in use

```txt
workflow provider build artifact and Pages deployment
browser document visibility pagehide pageshow freeze resume RAF resize blur and GameHost
balloon simulation input telemetry presentation camera and clipping
airstream routes fields forces visuals and diagnostics
Air Mail parcels routes towns volumes progress completion and timestamps
Nexus Engine telemetry Core World foundation features and landforms
staged world generation terrain vegetation grass flowers water and landmarks
quality dynamic resolution sky clouds HDR depth and color grading
map overlay animation and suspension
lifecycle generation suspension resume retirement and frame proof
validation browser fixtures and central tracking
```

## Kit and service census

```txt
local source-backed kits:           71
runtime-implied adapters:           13
Core World provider surfaces:       17
active documented total:           101
inactive or retired legacy:         13
planned lifecycle surfaces:         20
new runtime kit IDs:                 0
```

The complete inventory and service table is in `.agent/trackers/2026-07-16T07-58-10-04-00/project-breakdown.md`.

## Source-backed findings

```txt
flight RAF handle ownership: absent
map RAF handle ownership: local only
visibilitychange observer: absent
pagehide/pageshow observer: absent
freeze/resume observer: absent
window blur key clearing: present
suspension reason and revision: absent
cross-domain suspend result: absent
resume clock rebase result: absent
BFCache restore generation: absent
stale lifecycle event rejection: absent
PageLifecycleResult: absent
FirstResumedFrameAck: absent
```

## Required parent domain

`open-above-page-lifecycle-flight-suspension-resume-authority-domain`

## Required transaction

```txt
PageLifecycleTransitionCommand
  -> bind document route session lifecycle clock input world and frame revisions
  -> normalize visibility pagehide pageshow freeze and resume evidence
  -> classify suspend resume or retire intent
  -> clear held actions and publish input settlement
  -> suspend or preserve simulation Air Mail airstream world work map camera and rendering by policy
  -> rebase host time on accepted resume
  -> reject stale lifecycle generations
  -> publish PageLifecycleResult
  -> present and publish FirstResumedFrameAck
```

## Validation boundary

Documentation only. Runtime JavaScript, HTML, CSS, shaders, gameplay, packages, tests, workflows and deployment were not changed. No browser, BFCache, build, artifact or Pages fixture was run.