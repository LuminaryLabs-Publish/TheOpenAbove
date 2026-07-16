# Known Gaps: TheOpenAbove Layered Weather Clock and Projection Ownership

**Last aligned:** `2026-07-16T10-58-20-04-00`  
**Status:** `weather-simulation-clock-projection-ownership-authority-audited`

## Summary

The atmosphere is now genuinely layered, but the visual adapter owns the Core Weather mutation path. Deterministic step admission, pause policy, feature/layer binding and frame convergence remain unimplemented.

## Plan ledger

**Goal:** keep the new implementation and remaining ownership/proof gaps clearly separated and dependency ordered.

- [x] Reconcile the five-layer runtime implementation.
- [x] Identify all domains, kits and services.
- [x] Isolate weather-clock ownership as the focused gap.
- [x] Define command, result, snapshot and frame acknowledgement surfaces.
- [ ] Implement single-owner advancement and projection.
- [ ] Prove source, build, artifact and Pages behavior.

## Implemented state

```txt
Core World Atmosphere Feature Domain: present
Core Weather Domain: present
Layered Weather Domain: present
atmosphere features: 5
weather layer descriptors: 5
altitude sampling and composition: present
layer evolution and minimum floors: present
five-layer volumetric raymarch: present
per-layer sample allocation: present
layered visual snapshot: present
layered-weather integration test: present
```

## Primary ownership gaps

```txt
simulation-owned WeatherAdvanceCommand: absent
WeatherAdvanceResult: absent
single accepted delta owner: absent
duplicate-step rejection: absent
stale expected-revision rejection: absent
visual adapter read-only contract: absent
immutable WeatherProjectionSnapshot: absent
```

## Policy gaps

```txt
map-open weather policy: implicit only
pause weather policy: absent
hidden/frozen weather policy: absent
resume clock rebase: absent
bounded catch-up policy: absent
route/session retirement result: absent
```

## Feature and configuration gaps

```txt
feature-to-layer binding registry: absent
meadow-ground-fog -> ground-fog binding: implicit
meadow-low-clouds -> low-clouds binding: implicit
meadow-mid-clouds -> mid-clouds binding: implicit
meadow-high-clouds -> high-clouds binding: implicit
meadow-cirrus -> cirrus binding: implicit
altitude/kind compatibility result: absent
configuration digest: absent
```

## Projection and proof gaps

```txt
weather revision required by render: absent
layered revision required by render: absent
cloud/fog/terrain/telemetry convergence receipt: absent
FirstWeatherBoundFrameAck: absent
visual-call-count independence fixture: absent
map-open browser fixture: absent
suspend/resume fixture: absent
source/build/artifact/Pages parity: unproven
```

## Dependency order

```txt
simulation clock identity
  -> WeatherAdvanceCommand admission
  -> Core Weather single step
  -> Layered Weather single step
  -> feature/layer binding validation
  -> immutable projection snapshot
  -> read-only visual consumers
  -> matching frame acknowledgement
  -> artifact and Pages parity
```

## Retained product gaps

Page lifecycle, WebGL recovery, game audio, device-control coverage, fixed-step pacing, HDR/depth attachment coherence, cloud composite/depth proof, delivery eligibility, provider/build identity, route retirement, world/terrain/flora proof, Air Mail history and flight persistence remain unresolved.

## Do not claim

Do not claim weather determinism, correct map/pause evolution, duplicate safety, feature/layer binding, frame convergence, deployment parity or production readiness until the required fixtures pass.