# Known Gaps: TheOpenAbove

**Last aligned:** `2026-07-10T21-31-01-04-00`

## Primary ordered gaps

```txt
1. immutable runtime admission
2. import-pure balloon object kit and compatibility admission
3. root session/frame/listener/resource ownership
4. ordered teardown and restart proof
```

## Runtime source identity gaps

```txt
NexusEngine is imported from LuminaryLabs-Dev/NexusEngine@main.
No immutable NexusEngine coordinate is declared.
No versioned source manifest or source fingerprint exists.
Static module failures can occur before the route try/catch.
No capability preflight validates consumed remote APIs.
GameHost exposes no source or boot proof.
```

## Import-purity gaps

```txt
hot-air-balloon-object-kit schedules attachWhenReady during module evaluation.
Importing buildHotAirBalloon creates process lifetime unexpectedly.
The compatibility installer is not an explicit command.
No host-shape admission result exists.
Unsupported legacy hosts still enter a recursive compatibility tick.
No import-only fixture counts RAFs or listeners.
```

## Frame ownership gaps

```txt
main route RAF request ID is discarded.
compatibility RAF request IDs are discarded.
No frame owner, label, sessionId or generation exists.
No stale-generation callback fence exists.
No stop or cancel-all-frames transaction exists.
```

## Listener and resource gaps

```txt
simulation.dispose() exists but is never composed.
cameraRig.dispose() exists but is never composed.
visual.dispose() exists but is never composed and is partial.
No route-owned listener ledger exists.
No balloon geometry/material disposal transaction exists.
No renderer/resource terminal counts exist.
No pagehide/unload lifecycle contract exists.
```

## GameHost gaps

```txt
No start result.
No stop result.
No dispose result.
No restart result.
No session or generation state.
No frame/listener/resource ownership snapshot.
No detached terminal lifecycle proof.
```

## Validation gaps

```txt
tests/smoke.mjs checks source text only.
No fixture resolves immutable runtime admission.
No fixture instruments module evaluation.
No fixture proves import schedules zero frames.
No fixture proves unsupported legacy installation owns nothing.
No fixture proves stop cancels all callbacks and listeners.
No fixture proves restart creates one active generation.
```

## Required guarantees

```txt
required runtime sources are immutable and capability-admitted
reusable kit imports are side-effect free
explicit compatibility installation returns a typed result
one active runtime session owns all frames/listeners/resources
stop and dispose are idempotent
stale callbacks cannot mutate a newer generation
terminal proof is bounded, detached and JSON-safe
```

## Do not prioritize

```txt
visual fidelity expansion
renderer replacement
terrain, cloud, water or grass rewrite
camera or balloon retuning
simulation constant changes
new routes, regions or objectives
```

## Next safe ledges

```txt
1. TheOpenAbove Immutable Runtime Admission + Boot Capability Fixture Gate
2. TheOpenAbove Import-Pure Balloon Object Kit + Frame Ownership Fixture Gate
3. TheOpenAbove Runtime Session Lifecycle + Ordered Disposal/Reboot Fixture Gate
```