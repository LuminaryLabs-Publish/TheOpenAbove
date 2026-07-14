# Render Audit: World Feature Startup and Visible Frame Gap

**Timestamp:** `2026-07-13T22-58-22-04-00`

## Summary

World Features and World Foundation are now present before visual construction, but no revision-bearing envelope proves that the rendered terrain and flora came from the accepted provider composition and registered feature set.

## Plan ledger

**Goal:** connect provider composition and feature registration to one admitted visual generation and first visible frame.

- [x] Trace engine creation into `createVisualDomain`.
- [x] Identify world feature and foundation API handoff.
- [x] Identify current startup and RAF readiness signals.
- [x] Define missing frame provenance.
- [ ] Add executable browser correlation fixtures.

## Current render path

```txt
explicit domain composition
  -> register authored landforms
  -> pass engine.n.worldFeatures to visual domain
  -> pass engine.n.worldFoundation to visual domain
  -> generate world, terrain and flora
  -> render initial state
  -> clear canvas aria-busy
  -> schedule RAF
```

## Missing envelope

```txt
ProviderRevision
CompositionRevision
FeatureSetFingerprint
FeatureRegistryRevision
FoundationRevision
VisualBootstrapRevision
WorldGenerationRevision
FrameRevision
FirstRegisteredWorldFrameAck
```

## Failure windows

```txt
feature registration partially succeeds
  -> registry may contain a prefix of the authored feature set

visual construction fails after registration
  -> engine composition exists but no accepted visual generation exists

provider semantics differ from fake test
  -> startup fails only in real browser/provider execution

frame appears after stale rebuild
  -> no revision distinguishes predecessor and successor world surfaces
```

## Required frame contract

```txt
FrameWorldCompositionEnvelope {
  providerRevision
  compositionRevision
  featureRegistryRevision
  featureSetFingerprint
  worldGenerationRevision
  frameRevision
}
```

The first visible frame must acknowledge the same composition and feature revisions accepted by startup. Canvas readiness alone is insufficient.

## Validation boundary

No browser, build or Pages frame fixture was executed. Rendering behavior was not changed.