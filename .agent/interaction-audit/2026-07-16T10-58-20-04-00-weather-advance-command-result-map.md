# Interaction Audit: Weather Advance Command and Result Map

**Timestamp:** `2026-07-16T10-58-20-04-00`  
**Status:** `weather-simulation-clock-projection-ownership-authority-audited`

## Summary

Weather evolution currently occurs as an ordinary method call inside presentation. It has no command identity, expected revisions, terminal result or rejection reason.

## Plan ledger

**Goal:** represent every weather step as one accepted or rejected transaction before projection.

- [x] Trace current method-call ownership.
- [x] Identify revision and policy inputs.
- [x] Define command, result and acknowledgement fields.
- [ ] Implement command admission.
- [ ] Reject duplicate and stale work.

## Current call map

```txt
visual.update(dt)
  -> cloudWeatherMap.update(dt)
  -> weather.advance(dt)
  -> layeredWeather.advance(0, weatherSnapshot)
  -> return mutable adapter state
```

## Required command map

```txt
WeatherAdvanceCommand {
  commandId
  sessionRevision
  routeRevision
  simulationFrame
  clockRevision
  expectedWeatherRevision
  expectedLayeredWeatherRevision
  expectedAtmosphereFeatureRevision
  delta
  mode: running | map-open | paused | hidden | resume-catchup
}

WeatherAdvanceResult {
  commandId
  status: applied | no-op | rejected | retired
  simulationFrame
  acceptedDelta
  weatherRevision
  layeredWeatherRevision
  atmosphereFeatureRevision
  snapshot
  reason?
}

WeatherProjectionResult {
  commandId
  frame
  weatherRevision
  layeredWeatherRevision
  consumers: [clouds, aerial, terrain, telemetry]
  status: projected | stale | rejected
}

FirstWeatherBoundFrameAck {
  commandId
  frame
  weatherRevision
  layeredWeatherRevision
  layerIds
}
```

## Rejection conditions

```txt
duplicate commandId
simulation frame already settled
negative or non-finite delta
expected weather revision mismatch
expected layered revision mismatch
retired session or route
map/pause policy conflict
catch-up budget exceeded
feature/layer binding mismatch
stale projection snapshot
```

## Required ordering

```txt
clock evidence
  -> WeatherAdvanceCommand
  -> WeatherAdvanceResult
  -> WeatherProjectionSnapshot
  -> visual consumers
  -> render
  -> FirstWeatherBoundFrameAck
```

No runtime command surface was added by this documentation pass.