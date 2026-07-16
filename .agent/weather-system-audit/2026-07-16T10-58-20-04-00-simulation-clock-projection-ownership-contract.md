# Weather System Audit: Simulation Clock and Projection Ownership Contract

**Timestamp:** `2026-07-16T10-58-20-04-00`  
**Status:** `weather-simulation-clock-projection-ownership-authority-audited`

## Summary

Core Weather and Layered Weather now exist and are correctly renderer-neutral. The product must preserve that boundary by moving `advance()` admission out of `open-above-cloud-weather-map-kit` and into one simulation-clock owner.

## Plan ledger

**Goal:** enforce one writer, immutable snapshots and deterministic layer projection.

- [x] Confirm Core Weather owns conditions/evolution.
- [x] Confirm Layered Weather owns descriptors/evolution/composition.
- [x] Confirm Atmosphere Features own spatial placement.
- [x] Confirm the visual adapter currently calls both `advance()` methods.
- [x] Define the one-writer contract.
- [ ] Implement and prove it.

## One-writer contract

```txt
allowed writer:
  weather simulation scheduler / weather authority domain

forbidden writers:
  cloud weather map adapter
  volumetric cloud renderer
  aerial perspective
  terrain renderer
  telemetry reader
  map renderer
  GameHost diagnostics
```

## Snapshot contract

```txt
WeatherProjectionSnapshot {
  sessionRevision
  simulationFrame
  weatherRevision
  layeredWeatherRevision
  atmosphereFeatureRevision
  elapsed
  conditions
  layers
  altitudeBands
  bindings
}
```

The snapshot must be immutable for the entire presentation frame. Consumers may derive GPU uniforms or local aggregate values but may not advance or patch the underlying domains.

## Feature/layer binding contract

Current source defines parallel records:

```txt
WORLD.features.atmosphere
  meadow-ground-fog
  meadow-low-clouds
  meadow-mid-clouds
  meadow-high-clouds
  meadow-cirrus

WORLD.weather.layers
  ground-fog
  low-clouds
  mid-clouds
  high-clouds
  cirrus
```

The authority should publish explicit bindings and reject incompatible altitude ranges, kinds or missing records. Feature placement and weather evolution remain separate owners; the binding only proves intended correspondence.

## Time policy

```txt
running:
  exactly one advance per accepted simulation tick

map-open:
  explicit paused, continuous or bounded-catchup result

hidden/frozen:
  consume PageLifecycleResult and stop implicit wall-clock advancement

resume:
  rebase clock, apply bounded catch-up if configured and reject stale generations

reset/route retirement:
  retire pending commands and reset revisions through domain APIs
```

## Proof requirements

```txt
same seed + same accepted ticks -> same snapshots
one tick -> one weather revision transition
repeated command -> rejected/no-op
visual update count does not affect weather elapsed
map render count does not affect weather elapsed
all consumers use one snapshot revision
feature/layer binding mismatch fails admission
```

No Weather or Layered Weather runtime code was changed in this audit.