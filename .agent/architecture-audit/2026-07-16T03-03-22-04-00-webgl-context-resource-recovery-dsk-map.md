# Architecture Audit: WebGL Context and Resource-Recovery DSK Map

**Timestamp:** `2026-07-16T03-03-22-04-00`  
**Status:** `webgl-context-resource-recovery-authority-audited`

## Summary

The current visual domain owns creation and ordinary disposal, but not renderer-generation identity, context-loss admission, resource reconstruction, stale-generation rejection, or recovered-frame proof.

## Plan ledger

**Goal:** place recovery between browser context evidence and presentation effects while preserving simulation, Core World, and render-provider boundaries.

- [x] Map current renderer and GPU-resource owners.
- [x] Map context-loss and restoration evidence gaps.
- [x] Separate simulation policy from presentation recovery.
- [x] Define command, result, generation, registry, deadline, fallback, and acknowledgement surfaces.
- [ ] Implement the recovery family.
- [ ] Prove forced loss and restoration in source, build, artifact, and Pages contexts.

## Current DSK composition

```txt
browser route shell
  -> open-above-runtime-composer-kit
  -> open-above-visual-domain
     -> THREE.WebGLRenderer
     -> open-above-hdr-composer-kit
     -> open-above-volumetric-cloud-kit
     -> terrain vegetation grass flower water landmark kits
     -> sky sun aerial and lens kits
  -> balloon object and presentation kits
  -> RAF clock adapter
```

## Missing authority

```txt
browser context event
  -X-> typed loss admission
  -X-> renderer generation retirement
  -X-> presentation suspension result
  -X-> GPU-resource reconstruction registry
  -X-> ordered renderer/composer/cloud/world rehydration
  -X-> stale callback rejection
  -X-> recovery deadline and retry budget
  -X-> fallback projection
  -X-> FirstRecoveredFrameAck
```

## Required parent domain

`open-above-webgl-context-resource-recovery-authority-domain`

## Child surfaces

| Surface | Responsibility |
|---|---|
| `open-above-render-capability-observation-kit` | observe WebGL capability and restoration support |
| `open-above-render-generation-identity-kit` | issue monotonic renderer/context/resource generations |
| `open-above-webgl-context-loss-observation-kit` | admit `webglcontextlost`, prevent default when policy allows, deduplicate evidence |
| `open-above-webgl-context-restoration-observation-kit` | admit restoration only for the active loss generation |
| `open-above-render-loss-classification-kit` | classify recoverable, unsupported, repeated, timed-out, or retired loss |
| `open-above-presentation-suspension-policy-kit` | stop stale draw submission and expose presentation state |
| `open-above-simulation-input-loss-policy-kit` | define continue, suspend, or bounded-input behavior during loss |
| `open-above-gpu-resource-registration-kit` | register resource owner, dependencies, rebuild, verify, and retire callbacks |
| `open-above-scene-resource-rehydration-kit` | rebuild geometry, textures, materials, and scene bindings |
| `open-above-post-process-resource-rehydration-kit` | rebuild composer targets, depth textures, passes, and uniforms |
| `open-above-cloud-resource-rehydration-kit` | rebuild cloud target, shaders, private scene, and composite binding |
| `open-above-terrain-flora-resource-rehydration-kit` | rebuild streamed terrain, vegetation, grass, flowers, water, and landmarks |
| `open-above-renderer-reconstruction-kit` | restore renderer state, shadows, color space, size, DPR, and target bindings |
| `open-above-stale-render-generation-rejection-kit` | reject old RAF callbacks, promises, resources, and acknowledgements |
| `open-above-render-recovery-deadline-budget-kit` | bound attempts, time, and repeated-loss recovery |
| `open-above-render-fallback-projection-kit` | expose semantic actionable fallback when recovery cannot complete |
| `open-above-render-loss-result-kit` | publish accepted loss and suspension result |
| `open-above-render-recovery-result-kit` | publish reconstruction, verification, or fallback result |
| `open-above-first-recovered-frame-ack-kit` | acknowledge the first visible frame from the accepted recovered generation |

## Command/result contract

```txt
RenderRecoveryAdmissionCommand
  documentRevision
  runtimeGeneration
  rendererGeneration
  contextGeneration
  resourceManifestRevision
  lossEventId
  observedAt

RenderLossResult
  accepted | duplicate | stale | retired | unsupported
  simulationPolicy
  presentationSuspended

RenderRecoveryResult
  recovered | failed | timedOut | superseded | fallback
  newRendererGeneration
  rebuiltResourceManifestRevision
  verificationReceipts

FirstRecoveredFrameAck
  rendererGeneration
  frameRevision
  presentedAt
```

## Dependency order

```txt
loss observation
  -> generation retirement
  -> presentation/simulation policy
  -> restoration admission
  -> renderer reconstruction
  -> dependency-ordered resource rehydration
  -> verification
  -> recovered frame
  -> acknowledgement or fallback
```

## Boundary

No runtime implementation or recovery behavior changed in this audit.