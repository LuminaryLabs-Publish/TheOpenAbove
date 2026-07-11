# Airstream System Audit: Route, Field, Force and Visual Contract

**Timestamp:** `2026-07-11T05-25-29-04-00`

## Goal

Record the complete airstream kit graph and separate pure field authority from simulation and presentation adapters.

## Kit graph

```txt
open-above-airstream-domain
  -> open-above-airstream-route-kit
  -> open-above-airstream-field-kit
       -> open-above-airstream-sampler-kit
  -> open-above-airstream-visual-kit
  -> open-above-airstream-debug-kit

open-above-balloon-simulation-kit
  -> open-above-airstream-balloon-force-kit
```

## Kit services

```txt
route-kit
  normalize and freeze route identity, points, radius, speed, lift, turbulence, destination, color and family

sampler-kit
  nearest point on polyline segment
  center distance and influence
  tangent and turbulent velocity
  capture state and segment coordinates
  overlap blending

field-kit
  evaluate all routes
  create altitude-sensitive ambient wind
  choose dominant route
  blend routed and ambient velocity

balloon-force-kit
  normalize sample/fallback shape
  apply velocity to simulation wind
  project route metadata into balloon state

visual-kit
  build route ribbons and wisps
  animate route emphasis and particle motion
  dispose geometry and materials

debug-kit
  optional diagnostic projection

domain
  compose field, visuals and diagnostics
  retain last sample
  publish snapshot
  dispose presentation resources
```

## Active default routes

```txt
lowland-to-sunvale      start altitude 92   speed 17
meadow-to-brookhaven    start altitude 165  speed 19
highland-to-cloudmere   start altitude 285  speed 22
```

## Strengths

```txt
route normalization is explicit
field and delivery tests can run without Three.js scene creation
same position and elapsed input produce deterministic samples
route overlap produces finite blended velocity
visuals are separate from field sampling
balloon force is a dedicated adapter
```

## Gaps

```txt
elapsed is sourced from variable RAF simulation time
sample rows have no simulation tick or manifest revision
route entry/exit is inferred but not journaled
segment progression is not retained
selected route can switch instantly at overlap boundaries
no hysteresis or retention policy
visual curve interpolation is not the same primitive as polyline field sampling
visual centerline and authoritative field can therefore differ between control points
no field/visual alignment fixture
no bounded sample or transition journal
```

## Required contracts

```txt
versioned route manifest
fixed-tick sample identity
stable route-transition policy
bounded entry/dwell/segment/exit ledger
field-to-visual alignment tolerance
route-source and sample fingerprints
detached observations for simulation, renderer and GameHost
```

## Fixture gate

```txt
route samples deterministic at fixed ticks
route transition hysteresis deterministic at overlaps
visual curve stays within declared tolerance of authoritative field corridor
same command schedule produces equal route ledger at multiple render rates
```