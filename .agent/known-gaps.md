# Known Gaps: TheOpenAbove

**Last aligned:** `2026-07-12T05-11-46-04-00`

## Primary ordered gaps

```txt
1. immutable runtime admission
2. import purity and single frame owner
3. balloon profile and model authority
4. runtime session/listener/resource ownership
5. fixed-step clock and sequenced input
6. product source and acceptance parity
7. Air Mail route, delivery and mission reset
8. committed observation and public host capabilities
9. frame-stage failure containment
10. terrain source, LOD and atomic replacement
11. grass spatial identity and world-surface parity
12. balloon steering and presentation coherence
13. HDR attachment and render-surface resolution authority
```

## HDR attachment and resolution gaps

```txt
no render-surface ID or revision
no resize source or generation
no quality-state revision
no distinct CSS, DPR, dynamic-scale and physical-size record
browser resize and dynamic-scale paths differ
browser resize calls composer sizing twice
tracked depth dimensions are manually rewritten to CSS size
color/depth physical-size parity is not checked
no target or depth-attachment identity
initial depth attachment replacement has no ownership-transfer record
no framebuffer-completeness admission
no fallback classification
no atomic candidate commit
no predecessor rollback
no stale resize rejection
no resource lease ledger
no exactly-once attachment retirement result
no actual target/attachment readback
no first-visible-frame surface acknowledgement
```

## Concrete mismatch

```txt
high tier at 1920 × 1080 and effective pixel ratio 1.6

color targets:
  3072 × 1728

manual depth image assignment:
  1920 × 1080
```

## Retained frame-failure gaps

```txt
post-start RAF stages have no enclosing failure boundary
no typed stage result or single failure admission
no last-known-good canvas/HUD/readback correlation
no failed-session capability revocation
no ordered terminal disposal and cold-restart result
```

## Retained host, lifecycle and model gaps

```txt
window.GameHost exposes raw mutable owners
runtime session does not own all callbacks/listeners/resources
balloon profile and async model load lack complete identity/fingerprint/generation fences
mission reset is not one atomic cross-owner transaction
```

## Required HDR fixtures

```txt
fixture:hdr-initial-attachment-ownership
fixture:hdr-replacement-retirement-exactly-once
fixture:hdr-color-depth-dimension-parity
fixture:hdr-browser-resize-path
fixture:hdr-dynamic-scale-path
fixture:hdr-resize-source-parity
fixture:hdr-stale-resize-rejection
fixture:hdr-framebuffer-incomplete-rollback
fixture:hdr-first-visible-surface-frame
fixture:pages-hdr-resize-quality-parity
```

Do not treat a successful `composer.render()`, absence of a console error, a reported render scale or a completed static build as proof that the color/depth attachment set is compatible, rollback-safe or fully retired.
