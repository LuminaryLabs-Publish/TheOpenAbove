# Known Gaps: TheOpenAbove

**Last aligned:** `2026-07-10T19-58-34-04-00`

## Primary gap

The route has no explicit runtime dependency-admission authority. A fixed `TheOpenAbove` commit imports NexusEngine from a mutable branch and cannot prove the exact source, capability set, or boot decision used by a browser session.

## Source identity gaps

```txt
NexusEngine is imported from LuminaryLabs-Dev/NexusEngine@main.
No immutable NexusEngine commit or release is declared.
No versioned route source manifest exists.
No requested-versus-resolved source record exists.
No source or manifest fingerprint exists.
No production policy rejects mutable required source coordinates.
GameHost does not expose source proof.
HUD does not expose boot/source status.
```

## Module admission gaps

```txt
Remote dependencies are static imports in src/main.js.
Module resolution, parsing, linking or evaluation can fail before createGame().
The route-level try/catch is not a complete module-load error boundary.
No typed accepted, degraded or rejected admission result exists.
No required-versus-optional dependency policy exists.
No retry or reload result exists.
```

## Capability gaps

```txt
No preflight validates the NexusEngine APIs consumed by createBalloonTelemetryEngine.
No preflight validates the Three.js APIs consumed by active visual kits.
No compatibility matrix exists.
No explicit optional telemetry degradation policy exists.
Runtime construction begins without an accepted capability record.
```

## Boot transaction gaps

```txt
No bootId or boot state machine exists.
No construction-step journal exists.
No admission-to-session handoff exists.
Rejected admission cannot prove zero listeners, frames and resources.
Partial construction failure has no route-owned rollback transaction.
No terminal immutable boot proof exists.
```

## Validation gaps

```txt
tests/smoke.mjs checks local files and source text only.
headless project.check delegates to the same smoke.
No check resolves the production CDN graph.
No check rejects NexusEngine @main.
No check validates required exports.
No check injects remote resolution or compatibility failure.
No browser/fixture boot-proof parity exists.
No fixture:runtime-admission package script exists.
```

## Lifecycle gaps retained

```txt
createGame() returns no root session owner.
The animation-frame request ID is discarded.
No sessionId or generation fence exists.
No route-owned listener/resource ledger exists.
Local dispose methods are not composed by the route.
No terminal GameHost lifecycle snapshot exists.
```

These remain next after immutable runtime admission.

## Required guarantees

```txt
required production sources are immutable
requested and resolved coordinates are inspectable
capabilities are checked before construction
rejected boot allocates no runtime session
rejected boot installs no runtime listeners or frames
accepted boot produces one source fingerprint and session handoff
construction failure produces one rollback result
source and boot proof remain bounded and JSON-safe
session generation scopes all later callbacks and resources
```

## Do not prioritize next

```txt
visual fidelity expansion
renderer replacement
terrain/cloud/water/grass rewrite
camera or balloon changes
simulation constant changes
new regions or objectives
quality threshold retuning
legacy grass deletion
```

## Next safe ledge

```txt
TheOpenAbove Immutable Runtime Admission + Boot Capability Fixture Gate
```