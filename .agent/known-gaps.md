# Known Gaps: TheOpenAbove

**Last aligned:** `2026-07-12T07-00-48-04-00`

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
14. HUD accessibility announcement authority
```

## HUD accessibility gaps

```txt
visual HUD and assistive status share one node
#hud is aria-live="polite"
updateHud replaces complete innerHTML after every rendered frame
loading, telemetry, mission copy, controls and errors share one channel
no semantic source-event identity
no announcement ID, kind, priority or policy
no mission or projection revision
no admission or stale-result rejection
no duplicate-event idempotency
no semantic-text deduplication
no elapsed-time rate budget
no reduced-verbosity preference
no explicit aria-atomic/relevant policy
no dedicated semantic status node
no field-level visual DOM projection
no typed announcement result
no detached announcement observation
no announcement journal
no mission/frame/announcement acknowledgement
fatal details have no alert role
fatal details have no deterministic focus target
no exactly-once fatal announcement
no browser or Pages accessibility fixture
```

## Concrete mutation path

```txt
frame
  -> visual.render()
  -> updateHud()
  -> hud.innerHTML = complete HUD string
  -> aria-live region subtree replaced
  -> next RAF
```

The string contains changing altitude, capture, burner, trim, camera and mission values. Setting `innerHTML` recreates descendants even when serialized text is unchanged.

## Fatal path gap

```txt
showFatal(error)
  -> unhide #error <pre>
  -> write stack/message
  -> replace live HUD with generic error
  -> no alert/focus/result transaction
```

## Retained HDR and frame-failure gaps

```txt
color/depth surface sizing paths remain inconsistent
attachment ownership and rollback remain unimplemented
post-start RAF stages still lack complete failure containment
last-known-good frame and failed-session capability revocation remain unimplemented
```

## Retained host, lifecycle and model gaps

```txt
window.GameHost exposes raw mutable owners
runtime session does not own all callbacks/listeners/resources
balloon profile and async model load lack complete identity/fingerprint/generation fences
mission reset is not one atomic cross-owner transaction
```

## Required accessibility fixtures

```txt
fixture:hud-visual-live-region-separation
fixture:semantic-event-classification
fixture:announcement-dedupe
fixture:announcement-rate-budget
fixture:cadence-independent-announcement-sequence
fixture:route-capture-announcement
fixture:delivery-announcement
fixture:fatal-alert-focus-exactly-once
fixture:replacement-session-status-cleanup
fixture:pages-accessibility-parity
```

Do not treat a visually correct HUD, browser live-region coalescing, a successful render, a passing static build or the absence of console errors as proof that assistive announcements are bounded, meaningful, discoverable or lifecycle-safe.