# Renderer-Recovery Audit: WebGL Resource-Rehydration Contract

**Timestamp:** `2026-07-16T03-03-22-04-00`

## Summary

Ordinary object disposal is not a recovery protocol. Recovery requires a dependency-ordered manifest that can rebuild and verify every GPU-backed resource against one replacement context generation.

## Plan ledger

**Goal:** make renderer reconstruction complete, ordered, idempotent, cancellable, and verifiable.

- [x] Inventory renderer, target, depth, shader, geometry, material, texture, instancing, and streamed-resource owners.
- [x] Define registration and dependency metadata.
- [x] Define prepare, rebuild, verify, adopt, and retire phases.
- [ ] Register every active resource owner.
- [ ] Implement reconstruction and forced-loss fixtures.

## Resource families

```txt
renderer state
  shadows physically-correct lights color space tone mapping size DPR

post process
  EffectComposer renderTarget1 renderTarget2 depth textures RenderPass color grade

clouds
  private scene sphere geometry shader material half-float target composite geometry/material

world
  terrain chunks horizon chunks vegetation instances grass and flower atlases/buffers water landmarks

balloon and Air Mail
  balloon geometry materials ropes burner town geometry and route visuals

presentation
  sky sun aerial lens camera uniforms and dynamic-resolution bindings
```

## Registration contract

Each owner registers:

```txt
resourceOwnerId
dependencyIds
runtimeGeneration
rendererGeneration
resourceManifestRevision
prepareForLoss()
rebuild(context)
verify(context)
adopt()
retire()
timeoutMs
criticality
```

## Reconstruction order

```txt
renderer state
  -> shared textures/material foundations
  -> scene geometry and streamed world resources
  -> balloon/airstream/Air Mail presentation
  -> cloud private target and composite
  -> HDR composer targets depth textures and passes
  -> dynamic-resolution size/DPR bindings
  -> verification frame
  -> adopted recovered frame
```

## Invariants

- One resource instance belongs to exactly one renderer generation.
- Rebuild callbacks are idempotent within their command identity.
- Adoption occurs only after critical dependencies verify.
- Late results from retired generations are ignored and disposed.
- Partial recovery cannot publish `FirstRecoveredFrameAck`.
- Optional resource failure follows declared degradation policy.
- Critical resource failure settles to typed fallback.
- Repeated loss consumes a bounded retry budget.

## Existing disposal distinction

`open-above-visual-domain.dispose()` retires world, cloud, flora, terrain, and composer resources during ordinary teardown. It does not observe context loss, recreate the renderer, rebuild the graph, version resources, or verify a recovered frame. The proposed contract complements rather than replaces normal disposal.

## Boundary

No resource owner or runtime file changed.