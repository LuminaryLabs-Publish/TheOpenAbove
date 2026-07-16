# Current Audit: TheOpenAbove Layered Weather Clock and Projection Ownership

**Last aligned:** `2026-07-16T10-58-20-04-00`  
**Status:** `weather-simulation-clock-projection-ownership-authority-audited`  
**Reviewed pre-audit repository head:** `a2291f95e9eb9447512e00a5fc60a4a7ca83ad10`  
**Previous central repo-local head:** `e9e0465d3d72995e8e398ab7b821d38fd332bc33`

## Summary

The layered-atmosphere target is now implemented across Core Weather, Layered Weather, Atmosphere Features and a five-layer volumetric renderer. The highest-value remaining gap is that presentation code owns weather advancement instead of consuming an accepted simulation result.

## Plan ledger

**Goal:** admit exactly one weather evolution step per accepted simulation tick and bind every visible weather consumer to the resulting immutable revision.

- [x] Compare the current Publish inventory, central ledgers and root `.agent` coverage.
- [x] Select only TheOpenAbove by runtime-ahead priority.
- [x] Inspect the layered-weather configuration, provider composition, visual adapter, shader and integration test.
- [x] Preserve the full 115-surface kit and service inventory.
- [x] Add the timestamped weather-clock audit family.
- [ ] Implement and prove simulation-owned advancement, map policy and frame convergence.

## Complete interaction loop

```txt
boot
  -> install World Foundation, Features, Landforms and Atmosphere Features
  -> install Core Weather and Layered Weather
  -> register five atmosphere features and five weather layers
  -> create visual world and five-layer cloud renderer
  -> create balloon, airstream, Air Mail, map, camera and telemetry

flight frame
  -> simulation, Air Mail, airstream and camera update
  -> visual adapter advances Core Weather
  -> visual adapter advances Layered Weather
  -> clouds, fog, terrain and telemetry read resulting state
  -> engine tick
  -> cloud target and HDR frame render

map-open frame
  -> simulation, visual update, weather advance and engine tick are skipped
  -> render continues
  -> no explicit weather pause/resume result exists
```

## Domains in use

```txt
workflow, provider checkout, build, artifact and Pages deployment
browser route, RAF, resize, input, map and GameHost
balloon flight, telemetry, presentation, camera and clipping
airstream and Air Mail
Core World foundation, features, landforms and atmosphere features
Core Weather and Layered Weather
world generation, terrain, vegetation, grass, flowers, water and landmarks
quality, sky, sun, aerial perspective, five-layer clouds, HDR and grading
weather-clock admission, feature/layer binding, immutable projection and frame proof
```

## Kit and service census

```txt
local source-backed kits:           72
runtime-implied adapters:           13
Nexus Engine provider surfaces:     30
active named surface total:        115
planned weather-clock surfaces:     20
```

The complete inventory and service table is in `.agent/trackers/2026-07-16T10-58-20-04-00/project-breakdown.md`.

## Source-backed findings

```txt
five semantic atmosphere features: present
five weather layers: present
five-layer renderer: present
layered-weather integration test: present
weather mutation caller: visual adapter
engine tick after weather mutation: yes
map-open skips weather mutation: yes
map-open still renders: yes
single-step weather command/result: absent
duplicate-step rejection: absent
explicit map/pause policy: absent
feature/layer binding result: absent
weather-bound frame acknowledgement: absent
```

## Required parent domain

`open-above-weather-simulation-clock-projection-ownership-authority-domain`

## Required transaction

```txt
WeatherAdvanceCommand
  -> bind session, simulation frame, clock and expected revisions
  -> apply running/map/pause/suspend policy
  -> advance Core Weather once
  -> advance Layered Weather once from that snapshot
  -> validate atmosphere-feature/layer bindings
  -> publish WeatherAdvanceResult

WeatherProjectionCommand
  -> consume the immutable result without mutation
  -> update clouds, fog, terrain and telemetry
  -> reject stale revisions
  -> render and publish FirstWeatherBoundFrameAck
```

## Validation boundary

Documentation only. The layered-weather runtime was inspected but not changed by this audit. No npm check, Vite build, browser fixture, artifact download or Pages smoke was executed.