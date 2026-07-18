# Render Audit: Simulation Tick Budget and Visible Frame Gap

**Timestamp:** `2026-07-18T01-41-38-04-00`  
**Status:** `balloon-simulation-tick-allocation-terrain-sample-budget-authority-audited`

## Summary

The rendered balloon pose is derived from the accepted simulation state, but the render path cannot identify which simulation generation, normalized flow, terrain sample, or allocation budget produced that pose.

The current tick creates short-lived flow, contributor, steering, and velocity-target objects and requests the same terrain height twice. This is a source-backed workload finding, not evidence of a visible rendering defect.

## Current projection path

```txt
Balloon Simulation update
  -> accepted state.position / velocity / heading / burner / vent
  -> Ballooning.applyToBalloon
  -> animateHotAirBalloon
  -> Balloon Presentation update
  -> Camera Rig update
  -> Visual world update
  -> HDR Composer render
  -> presented frame
```

## Missing render evidence

```txt
BalloonSimulationGeneration: absent
BalloonSimulationTickRevision: absent
TerrainSampleRevision: absent
SimulationTickAllocationResult: absent
SimulationTerrainQueryResult: absent
BalloonSimulationTickDigest: absent
rendered pose -> accepted tick correlation: absent
FirstAllocationBoundFlightFrameAck: absent
```

## Required contract

```txt
BalloonSimulationProjectionCommitCommand
  -> require accepted BalloonSimulationTickResult
  -> require accepted BalloonTerrainSampleResult
  -> bind pose, animation, camera and frame identity
  -> publish BalloonSimulationTickDigest
  -> publish FirstAllocationBoundFlightFrameAck
```

## Fixtures

- Render one deterministic accepted tick and record state, terrain sample, pose, camera, and frame digests.
- Reject presentation from a retired simulation generation.
- Verify scratch reuse does not change pose or camera results.
- Verify source, built artifact, and Pages produce matching digests.

## Boundary

No runtime renderer, animation, camera, simulation, or post-processing code changed. No frame-time or visual-quality claim is made.