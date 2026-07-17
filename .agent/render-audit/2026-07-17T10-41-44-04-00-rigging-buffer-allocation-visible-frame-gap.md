# Render Audit: Rigging Buffer Allocation and Visible-Frame Gap

**Timestamp:** `2026-07-17T10-41-44-04-00`

## Current render path

```txt
flight state
  -> animateHotAirBalloon
  -> animateRigging
  -> four updateSoftRope calls
  -> fresh CPU vectors and point arrays
  -> persistent position/normal BufferAttribute writes
  -> HDR frame
```

## Confirmed behavior

- Rope topology is bounded at four ropes, 10 segments, and 5 radial segments by the default rigging profile.
- Position and normal typed arrays are allocated once and updated in place.
- Each accepted animation frame still creates temporary endpoint vectors, point arrays, point clones, tangent/frame/binormal vectors, ring normals, and ring-position vectors.
- Public render diagnostics do not identify the rigging generation, update revision, buffer-write count, allocation budget, or retirement state.

## Visible-frame gap

A rendered frame cannot prove which rigging generation and dynamic-buffer revision it contains. A long-flight frame also cannot prove that the rope update stayed within an accepted CPU/allocation budget.

## Required proof

```txt
RiggingFrameDigest
  hostSessionId
  balloonModelGeneration
  riggingGeneration
  simulationRevision
  tensionRevision
  ropeBufferRevisions[]
  updatedVertexCount
  temporaryAllocationCount
  updateDurationMs
  degradationState

FirstRiggingBoundFrameAck
  renderFrameId
  riggingFrameDigest
  visibleRiggingGeneration
```

## Fixtures

- Long-flight allocation plateau.
- Stable typed-array identities across updates.
- No stale buffer write after replacement.
- One visible frame for the accepted rigging generation.
- Source, Vite artifact, and Pages parity.

No profiler or browser fixture was run.