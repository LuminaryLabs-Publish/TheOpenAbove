# Render Audit: Provider Contract Visible-Frame Gap

**Timestamp:** `2026-07-14T01-39-09-04-00`  
**Runtime revision:** `09bb6b95549d9480dfc2caa4517575ab4009ba98`

## Summary

The new provider pin repairs Core capability contract forwarding before the visual domain is created. The renderer still receives no provider-contract fingerprint or accepted composition revision, so a visible frame cannot prove which capability graph, feature registry, or foundation revision produced it.

## Plan ledger

**Goal:** bind visual bootstrap and the first visible world frame to the accepted provider and Core World contract revisions.

- [x] Trace provider import through engine and visual construction.
- [x] Trace initial update, `aria-busy` release, RAF, and render submission.
- [x] Identify missing render provenance.
- [x] Define a first-frame acknowledgement contract.
- [ ] Add executable browser and production-build fixtures.

## Current render path

```txt
provider import
  -> engine composition
  -> feature registration
  -> createVisualDomain(worldFeatures, worldFoundation)
  -> create balloon and presentation systems
  -> visual.update(dt:0)
  -> engine.tick(0)
  -> canvas aria-busy=false
  -> requestAnimationFrame
  -> visual.render
```

## Missing frame evidence

```txt
provider revision: not carried into visual state
provider contract fingerprint: absent
composition revision: absent
feature registry revision: absent
foundation revision: absent
world candidate revision: not correlated to provider contract
renderer submission ID: absent
canvas visibility acknowledgement: absent
FirstProviderContractWorldFrameAck: absent
```

## Risk

A successful module import and engine construction can still leave the visual surface on an unproven or mixed contract generation. The current public snapshot exposes terrain and world-generation descriptors, but it does not expose the provider revision or instantiated Core World contract metadata.

## Required frame envelope

```txt
ProviderContractWorldFrame {
  frameId
  hostGeneration
  providerRevision
  providerContractFingerprint
  compositionRevision
  featureRegistryRevision
  foundationRevision
  worldGenerationRevision
  rendererGeneration
  submissionId
}
```

## Required acknowledgement

```txt
FirstProviderContractWorldFrameAck {
  status: Visible | Failed | TimedOut | Stale | Superseded
  frameId
  providerRevision
  providerContractFingerprint
  canvasGeneration
  observedAt
  issues[]
}
```

## Acceptance rule

Do not clear startup readiness or report playable presentation until the renderer has submitted a frame whose provider, composition, feature, foundation, and world revisions match the accepted startup transaction.

## Validation boundary

No browser, WebGL, screenshot, build, or Pages render fixture was executed. No visible-frame readiness claim is made.