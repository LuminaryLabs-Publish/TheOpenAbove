# Interaction Audit: Wind Visual Command and Result Map

**Timestamp:** `2026-07-17T15-41-19-04-00`

## Summary

The wind field has no direct player command surface. Its interaction role is ambient feedback: controls change balloon state, the accepted Airstream sample changes, and the visual should reflect that evidence without affecting simulation.

## Evidence flow

```txt
keyboard burner / vent / steering evidence
  -> Ballooning update
  -> balloon position and sampled wind evidence
  -> Sky update
  -> wind particle buffer mutation
  -> visible dust frame

map-open evidence
  -> Journey suspends update
  -> no wind particle buffer mutation
  -> render-only frame
```

## Current implicit commands

| Implicit operation | Current result |
|---|---|
| mount Sky | creates Airstream and fixed-policy particle field |
| sample Airstream | mutable sample object |
| update Sky | Airstream state plus in-place particle buffer mutation |
| read wind snapshot | count/radius/size/opacity/noise model only |
| dispose Sky | removes and disposes wind particle resources |

## Missing typed command/result surfaces

```txt
WindVisualAdmissionCommand
WindVisualAdmissionResult
WindParticleUpdateCommand
WindParticleUpdateResult
WindVisualBudgetSettlementCommand
WindVisualBudgetResult
WindVisualProjectionCommitCommand
WindParticleFrameDigest
FirstWindParticleBoundFrameAck
WindVisualRetirementCommand
WindVisualRetirementResult
```

## Required admission evidence

`WindVisualAdmissionCommand` should bind:

```txt
HostSessionId
SceneGeneration
SkyGeneration
WindVisualGeneration
WindPolicyRevision
QualityTierRevision
particle capacity
field radii
particle size and opacity
noise profile
update cadence
```

`WindParticleUpdateCommand` should bind:

```txt
FlightFrameId
WindSampleRevision
position revision
elapsed revision
dt
active visual generation
```

## Settlement rules

- Reject updates for retired visual generations.
- Reject stale wind samples when a newer accepted sample owns the frame.
- Keep quality degradation visible in results but isolated from simulation truth.
- Settle map suspension without accumulating hidden simulation time.
- Dispose each geometry, material and texture exactly once.
- Publish the first frame acknowledgement only after the accepted buffer revision is rendered.

## Diagnostics

The public snapshot should add generation, sample revision, quality tier, capacity, update cadence, particles evaluated, scalar writes, update duration, degradation and retirement state. Raw Three.js resources should remain outside renderer-neutral diagnostics.

## Boundary

This command/result map is proposed documentation. No input, simulation, visual or lifecycle implementation changed.
