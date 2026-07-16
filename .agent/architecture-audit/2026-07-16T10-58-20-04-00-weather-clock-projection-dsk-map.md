# Architecture Audit: Weather Clock and Projection DSK Map

**Timestamp:** `2026-07-16T10-58-20-04-00`  
**Status:** `weather-simulation-clock-projection-ownership-authority-audited`

## Summary

The new layered-weather stack has correct semantic owners for conditions and altitude layers, but the product visual adapter currently owns when those domains advance. The missing boundary is a simulation-clock command/result between the host scheduler and renderer-neutral Weather domains.

## Plan ledger

**Goal:** keep Core Weather and Layered Weather authoritative while making cloud, fog, terrain and telemetry read-only projection consumers.

- [x] Identify current domain ownership.
- [x] Identify the mutation path and frame ordering.
- [x] Separate semantic weather state from world-feature placement and GPU resources.
- [x] Define the missing parent authority and coordinating kits.
- [ ] Move weather advance out of the visual adapter.
- [ ] Prove exactly one advance per accepted simulation tick.

## Current domain map

```txt
n:world
├─ n:world:foundation
└─ n:world:features
   ├─ n:world:features:landforms
   └─ n:world:features:atmosphere
      ├─ cloud-layer
      ├─ cloud-bank
      ├─ fog-bank
      ├─ storm-cell
      ├─ wind-corridor
      ├─ thermal-column
      ├─ downdraft-zone
      ├─ turbulence-zone
      ├─ precipitation
      └─ visibility-zone

n:weather
├─ conditions
├─ tendencies
├─ evolution
├─ regional sampling
└─ n:weather:layered
   ├─ descriptors
   ├─ layer evolution
   ├─ altitude sampling
   ├─ composition
   └─ snapshots

open-above visual domain
├─ cloud-weather-map adapter
├─ volumetric-cloud renderer
├─ aerial perspective
├─ terrain/weather projection
└─ visual snapshot
```

## Current mutation path

```txt
host RAF
  -> visual.update(dt)
  -> open-above-cloud-weather-map-kit.update(dt)
  -> engine.n.weather.advance(dt)
  -> engine.n.layeredWeather.advance(0, weatherSnapshot)
  -> cloud/fog/terrain consumers
  -> engine.tick(dt)
```

The renderer-neutral domains are correctly separate from feature placement and GPU ownership, but their mutation admission is located in presentation code.

## Required DSK map

```txt
open-above-weather-simulation-clock-projection-ownership-authority-domain
├─ weather-clock-source-kit
├─ weather-tick-admission-kit
├─ weather-advance-command-kit
├─ weather-advance-result-kit
├─ weather-revision-identity-kit
├─ layered-weather-revision-bridge-kit
├─ atmosphere-feature-layer-binding-kit
├─ weather-snapshot-publication-kit
├─ visual-weather-read-only-adapter-kit
├─ map-pause-weather-policy-kit
├─ page-suspension-weather-policy-kit
├─ bounded-weather-catchup-kit
├─ duplicate-weather-step-rejection-kit
├─ stale-weather-snapshot-rejection-kit
├─ weather-frame-convergence-kit
├─ first-weather-bound-frame-ack-kit
└─ proof fixtures
```

## Ownership contract

```txt
simulation scheduler owns:
  accepted delta
  tick identity
  running/map/pause/suspend policy
  catch-up budget

n:weather owns:
  conditions
  tendencies
  elapsed
  weather revision

n:weather:layered owns:
  layer descriptors
  evolved layer snapshot
  layer revision
  altitude composition

n:world:features:atmosphere owns:
  where semantic atmosphere features exist
  spatial and altitude influence

visual domain owns:
  immutable snapshot adaptation
  uniforms
  raymarch resources
  composite
  visible-frame acknowledgement

visual domain must not own:
  weather elapsed
  weather advance admission
  duplicate-step policy
  pause or catch-up truth
```

## Required result

```txt
WeatherAdvanceResult {
  sessionRevision
  simulationFrame
  acceptedDelta
  policy
  previousWeatherRevision
  weatherRevision
  layeredWeatherRevision
  atmosphereFeatureRevision
  snapshot
  rejectedReason?
}
```

No runtime implementation was changed in this audit.