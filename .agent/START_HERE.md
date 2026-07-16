# START HERE: TheOpenAbove Layered Weather Clock and Projection Ownership

**Last aligned:** `2026-07-16T10-58-20-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`  
**Branch:** `main`  
**Reviewed pre-audit repository head:** `a2291f95e9eb9447512e00a5fc60a4a7ca83ad10`  
**Previous central repo-local head:** `e9e0465d3d72995e8e398ab7b821d38fd332bc33`  
**Status:** `weather-simulation-clock-projection-ownership-authority-audited`

## Summary

The runtime now implements Core Weather, Layered Weather, Core World Atmosphere Features, five persistent altitude layers and five-layer volumetric projection. The focused gap is ownership: `open-above-cloud-weather-map-kit`, a visual adapter, advances both renderer-neutral Weather domains, and map-open freezes those revisions implicitly while rendering continues.

## Plan ledger

**Goal:** preserve the implemented layered atmosphere while moving weather advancement to one simulation-clock authority and making presentation read immutable snapshots.

- [x] Compare all 11 Publish repositories with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only TheOpenAbove as the sole runtime-ahead repository.
- [x] Inspect the ten-commit, nine-file layered-weather change set.
- [x] Identify the interaction loop, domains, 115 active surfaces and their services.
- [x] Add the `2026-07-16T10-58-20-04-00` weather-clock audit family.
- [ ] Implement single-owner weather stepping, explicit pause policy and weather-bound frame proof.

## Read this pass first

```txt
.agent/trackers/2026-07-16T10-58-20-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-16T10-58-20-04-00.md
.agent/architecture-audit/2026-07-16T10-58-20-04-00-weather-clock-projection-dsk-map.md
.agent/render-audit/2026-07-16T10-58-20-04-00-render-owned-weather-revision-gap.md
.agent/gameplay-audit/2026-07-16T10-58-20-04-00-map-open-weather-freeze-loop.md
.agent/interaction-audit/2026-07-16T10-58-20-04-00-weather-advance-command-result-map.md
.agent/weather-system-audit/2026-07-16T10-58-20-04-00-simulation-clock-projection-ownership-contract.md
.agent/deploy-audit/2026-07-16T10-58-20-04-00-weather-clock-parity-fixture-gate.md
.agent/central-sync-audit/2026-07-16T10-58-20-04-00-runtime-ahead-layered-weather-reconciliation.md
```

## Source-backed state

```txt
Core Weather: implemented
Layered Weather: implemented
Atmosphere Feature Domain: implemented
semantic atmosphere features: 5
weather layer descriptors: 5
volumetric cloud layers supported: 5
layer integration test: present
weather advance owner: visual adapter
map-open weather policy: implicit freeze
WeatherAdvanceCommand/Result: absent
duplicate-step rejection: absent
WeatherProjectionSnapshot: absent
FirstWeatherBoundFrameAck: absent
```

## Required parent domain

`open-above-weather-simulation-clock-projection-ownership-authority-domain`

## Next safe ledge

Move `n:weather.advance()` and `n:weather:layered.advance()` into one simulation-owned step, publish an immutable revision-bound snapshot, make cloud/fog/terrain/telemetry adapters read-only, and prove map/pause/resume policy plus the matching rendered frame.

## Retained priority

Reference traceability is materially advanced by the new runtime. Page lifecycle, WebGL recovery, audio, controls, fixed-step pacing, HDR/depth coherence, cloud-composite proof, delivery eligibility, provider identity, route retirement, terrain/flora proof, Air Mail history and persistence remain open.

## Do not claim

Do not claim authoritative weather clock ownership, duplicate-step safety, explicit pause behavior, feature/layer binding correctness, frame convergence, artifact parity, Pages parity or production readiness until the required fixtures pass.