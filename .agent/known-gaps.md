# Known Gaps: TheOpenAbove

**Last aligned:** `2026-07-12T21-18-18-04-00`

## Primary ordered gaps

```txt
1. immutable runtime and module admission
2. session, listener, frame and failure ownership
3. fixed-step clock and sequenced input
4. telemetry snapshot immutability and public readback isolation
5. procedural world identity and flight membership provenance
6. terrain streaming aggregate ownership and rollback
7. vegetation spatial coverage, adoption and disposal
8. flora exclusion artifact coherence
9. HDR surface and visible-frame coherence
10. parchment map spatial navigation and accessibility
```

## Telemetry immutability gaps

```txt
no runtime session, frame or telemetry snapshot identity
no expected-predecessor snapshot admission
no provider source-revision bundle
no canonical telemetry schema version
no detached normalized candidate
no content fingerprint
BalloonSnapshot stores the supplied object reference
VisualSnapshot stores BalloonSnapshot.visual by reference
complete and visual resources share a writable subtree
Nexus getResource returns stored references
resource journals retain mutable previous/value references
engine.openAbove returns engine-owned references
GameHost exposes the complete resource reference
no deep-freeze or clone-on-read policy
no alias detector
no atomic complete/visual multi-resource commit result
no public readback envelope or consumer identity
no stale-snapshot result
no mutation rejection observation
no first visible telemetry-frame acknowledgement
no source/build/Pages immutability fixture
```

## Concrete risks

```txt
external visual readback mutation changes two resources without a tick
external complete readback mutation changes engine telemetry in place
journal evidence can drift after publication
retained predecessor references have no stale identity
local getSnapshot and Nexus resource can disagree without a result
telemetry can change after the visible frame without new presentation
future editor or gameplay consumers can treat mutable diagnostics as authority
failed partial publication can leave resource projections without an explicit parity result
```

## Retained world and rendering gaps

```txt
Nexus Engine import remains pinned to @main rather than an immutable revision
no unified runtime session owns RAF, listeners and teardown
simulation remains variable-step at the browser host boundary
no immutable WorldGridArtifact with complete consumer receipts
flight movement does not admit bounded-world membership
terrain near/horizon generations lack atomic aggregate adoption
vegetation remains boot-time and centrally bounded
flora chunks lack one shared exclusion artifact revision
HDR attachments and visible frame receipts remain incomplete
map projection has unresolved heading, bounds and focus semantics
```

## Required telemetry fixtures

```txt
telemetry-normalization-determinism
telemetry-content-fingerprint-stability
complete-visual-resource-shared-snapshot-id
complete-visual-writable-alias-rejected
engine-getter-mutation-isolation
GameHost-readback-mutation-isolation
journal-publication-value-does-not-drift
failed-candidate-preserves-predecessor-pair
stale-snapshot-zero-mutation
retained-predecessor-readback-identifiable
telemetry-visible-frame-ack
browser-telemetry-mutation-matrix
built-output-telemetry-parity
pages-telemetry-parity
```

## Non-claim

Do not treat fresh top-level snapshot allocation, scalar event fields, successful engine ticks, stable debug output or the absence of known external mutation as proof that telemetry resources, journals and public readbacks are immutable or publication-consistent.
