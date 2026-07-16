# Interaction Audit: Atmosphere Reference Command and Result Map

## Summary

The reference asset currently enters the repository as an untyped file. No command admits it, no result classifies its requirements, and no runtime or frame revision cites it.

## Plan ledger

**Goal:** convert design-reference changes into explicit evidence and results before runtime or provider work is accepted.

- [x] Identify the current untyped reference path.
- [x] Define admission, classification, adoption and acknowledgement stages.
- [x] Keep browser and SVG handling outside gameplay truth.
- [ ] Implement typed commands and immutable results.

## Current path

```txt
commit adds SVG
  -> repository now contains design intent
  -> no loader or registry observes it
  -> no semantic manifest is created
  -> no module names are resolved
  -> no runtime capability result is published
  -> no visible frame cites the reference
```

## Required command/result path

```txt
AtmosphereReferenceAdmissionCommand
  input:
    reference path and content digest
    product release revision
    runtime source revision
    world config revision
    provider capability revision
  result:
    AtmosphereReferenceAdmissionResult
    accepted / partial / invalid / stale / duplicate
    normalized layer manifest
    module classifications
    unresolved identifiers

AtmosphereLayerAdoptionCommand
  input:
    accepted manifest revision
    expected visual and world generations
    adoption policy
  result:
    AtmosphereLayerAdoptionResult
    adopted / deferred / rejected / incompatible
    owned layer descriptors
    retained owners

AtmosphereFrameProjectionCommand
  input:
    adopted layer result
    camera and weather revisions
  result:
    AtmosphereFrameProjectionResult
    active layers and render descriptors
    FirstReferenceBoundAtmosphereFrameAck
```

## Rejection cases

```txt
asset digest changed without a new revision
module ID exists only in artwork
provider feature family unavailable
layer altitude ranges overlap illegally
sparse floor exceeds coverage policy
terrain or moisture dependency unavailable
runtime generation retired
frame cites a stale manifest
```

## Validation boundary

Documentation only. The SVG remains unparsed and no runtime command/result surface exists yet.