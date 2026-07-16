# Next Steps: TheOpenAbove Layered Weather Clock and Projection Ownership

**Last aligned:** `2026-07-16T10-58-20-04-00`  
**Status:** `weather-simulation-clock-projection-ownership-authority-audited`

## Summary

The five-layer atmosphere is implemented. The next work should remove weather mutation from presentation, establish one simulation-clock owner and prove that cloud, fog, terrain and telemetry consume the same accepted revision.

## Plan ledger

**Goal:** make weather deterministic, pause-aware and revision-bound without replacing Core Weather, Layered Weather or the five-layer renderer.

### Completed understanding

- [x] Confirm Core Weather, Layered Weather and Atmosphere Features are installed.
- [x] Confirm five semantic features and five weather layers exist.
- [x] Confirm the volumetric renderer projects up to five layers.
- [x] Confirm the visual weather adapter currently advances both Core domains.
- [x] Preserve the 115-surface inventory and services.

### Gate 1: simulation-clock ownership

- [ ] Add a stable simulation-frame and weather-command identity.
- [ ] Move `weather.advance(dt)` out of `open-above-cloud-weather-map-kit`.
- [ ] Advance Core Weather exactly once per accepted simulation tick.
- [ ] Advance Layered Weather exactly once from the accepted Weather snapshot.
- [ ] Reject negative, non-finite, duplicate, stale and retired steps.

### Gate 2: immutable projection

- [ ] Publish `WeatherAdvanceResult` with weather and layered revisions.
- [ ] Publish one immutable `WeatherProjectionSnapshot` per accepted step.
- [ ] Make cloud-weather-map a read-only adapter.
- [ ] Bind clouds, aerial fog, terrain and telemetry to the same snapshot.
- [ ] Reject stale visual projections.

### Gate 3: map, pause and lifecycle policy

- [ ] Choose explicit weather behavior for map-open: paused, continuous or bounded catch-up.
- [ ] Consume page-lifecycle suspension/resume results.
- [ ] Rebase clocks on resume.
- [ ] Bound catch-up work and publish rejected/limited results.
- [ ] Retire pending work on route or session disposal.

### Gate 4: feature/layer binding

- [ ] Map each `WORLD.features.atmosphere` record to its `WORLD.weather.layers` record.
- [ ] Validate kind, altitude range, coverage and density compatibility.
- [ ] Preserve feature placement and weather evolution as separate owners.
- [ ] Publish binding diagnostics through GameHost.

### Gate 5: executable proof

- [ ] Add deterministic 60-tick and replay tests.
- [ ] Add duplicate/stale/invalid command rows.
- [ ] Prove repeated render or visual calls do not advance weather.
- [ ] Add map-open, close, pause, hidden and resume browser rows.
- [ ] Publish `FirstWeatherBoundFrameAck`.

### Gate 6: artifact and deployment parity

- [ ] Run `npm run check` and `npm run build`.
- [ ] Record provider SHA, weather revisions and layer IDs in the artifact.
- [ ] Compare source, built artifact and deployed Pages behavior.
- [ ] Validate low, medium and high quality tiers.
- [ ] Block readiness on stale provider or weather identities.

## Recommended file cut

```txt
src/runtime/weather/
  weather-simulation-clock-projection-ownership-authority-domain.js
  weather-clock-source-kit.js
  weather-tick-admission-kit.js
  weather-advance-command-kit.js
  weather-advance-result-kit.js
  weather-revision-identity-kit.js
  layered-weather-revision-bridge-kit.js
  map-pause-weather-policy-kit.js
  page-suspension-weather-policy-kit.js
  bounded-weather-catchup-kit.js

src/visual/atmosphere/
  visual-weather-read-only-adapter-kit.js
  weather-frame-convergence-kit.js

src/world/
  atmosphere-feature-layer-binding-kit.js

tests/
  weather-clock-ownership.mjs
  weather-map-pause-browser.mjs
```

## Compatibility constraints

Preserve Three.js `0.165.0`, Core Weather and Layered Weather contracts, the five layer descriptors, balloon simulation, Air Mail, airstreams, terrain generation, dynamic resolution, HDR composition, map behavior, GameHost diagnostics, Vite build and Pages deployment.

## Retained next steps

Page lifecycle, renderer recovery, audio, controls, fixed-step pacing, HDR/depth coherence, cloud-composite proof, delivery eligibility, provider/build identity, route retirement, terrain/flora proof, Air Mail history and persistence remain open.

## Do not claim

Do not claim deterministic weather clock ownership, correct map/pause behavior, feature/layer binding, matching-frame convergence, artifact parity, Pages parity or production readiness until the fixture matrix passes.