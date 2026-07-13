# Public Readback Resource Alias Loop

**Timestamp:** `2026-07-12T21-18-18-04-00`

## Gameplay and runtime loop

```txt
simulation mutates flight state
  -> mail and airstream mutate their state
  -> visual domain mutates presentation state
  -> getSnapshot creates a telemetry projection
  -> Nexus stores that projection by reference
  -> GameHost publishes the stored reference
  -> external tooling reads or mutates it
  -> no command admission or new tick is required
```

## Source-backed alias

```txt
BalloonSnapshot = snapshot
VisualSnapshot = snapshot.visual

BalloonSnapshot.visual === VisualSnapshot
```

The same writable nested object is reachable through both engine getters. `GameHost.getState().nexusEngine` exposes the complete resource to any same-page script.

## Reachable state-distortion classes

```txt
visual telemetry mutation
  -> changes both complete and visual resource views

mail or map readback mutation
  -> changes the complete published snapshot only
  -> local getSnapshot can disagree immediately

retained predecessor reference
  -> consumer holds snapshot N after snapshot N+1 commits
  -> no lifecycle or stale-read result distinguishes it

journal reference mutation
  -> publication-time evidence can be changed after the fact
```

This gap does not directly prove authoritative flight-state mutation because the telemetry snapshot is a projection. It does prove that runtime diagnostics, tests, editor consumers and any future gameplay consumer cannot treat the resource as immutable authoritative evidence.

## Required authority

```txt
open-above-telemetry-snapshot-immutability-authority-domain
```

## Required admission path

```txt
provider projections
  -> detached canonical candidate
  -> source revision validation
  -> alias detection and normalization
  -> fingerprint and immutable commit
  -> revisioned public readback
  -> consumer receipt
  -> visible-frame acknowledgement
```

## Required gameplay safeguards

- Gameplay mutation must remain behind domain commands, never telemetry objects.
- Telemetry projections must contain primitive or immutable values only.
- Stale retained snapshots must carry identity and age.
- Consumers must not infer current gameplay truth from an unacknowledged snapshot.
- Reset and restart must invalidate predecessor readback generations.
