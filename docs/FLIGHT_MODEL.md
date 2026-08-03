# Flight Model

The current vehicle is a hot-air balloon governed by buoyancy, venting,
altitude-dependent wind, and limited steering relative to the active airflow.

## Player Inputs

```txt
burner    increases lift
vent      releases lift
steering  rotates up to 15 degrees around the sampled wind direction
```

The player does not command absolute horizontal velocity. The airstream Domain
selects ambient or route flow, then the steering Kit applies a bounded heading
offset. Vertical velocity combines burner heat, venting, stream lift, damping,
and a soft ceiling.

## Ownership

```txt
src/runtime/balloon-simulation-kit.js
  browser input, Three.js state, terrain contact, and presentation snapshot

src/runtime/airstream-domain/
  deterministic route and ambient wind sampling

src/domains/ballooning/wind-relative-steering-kit.js
  bounded steering around flow direction

src/native/balloon-flight-kernel.js
  portable numeric vertical acceleration and altitude functions
```

The native kernel is imported by the Web simulation and is also the Android XR
and PCVR Build entry. This keeps one proved numeric behavior across targets
without claiming that the Three.js browser presentation is native.
