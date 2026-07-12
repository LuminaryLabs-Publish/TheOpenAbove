# Known Gaps: TheOpenAbove

**Last aligned:** `2026-07-12T08-50-32-04-00`

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
14. parchment map pause and input authority
15. semantic mission status and fatal accessibility authority
```

## Parchment map gaps

```txt
map state is one mutable open Boolean
no map transition command or transition ID
no map phase or generation
no pause revision
no pause participant registry
no prepare/commit/rollback barrier
no typed pause or resume result
simulation and map own independent global keyboard listeners
no FLIGHT versus MAP input context
no single-consumer result for one physical key event
flight key Set remains mutable while map is open
no held-key retirement policy
no fresh gameplay input generation on close
no stale map/input generation rejection
main RAF remains active while map RAF starts
no single map-frame owner
no immutable map frame plan
no map projection revision
no world/route/town/parcel/player source fingerprint
no first visible map frame acknowledgement
no first resumed flight frame acknowledgement
map dialog has no focus transfer or restoration
no real close control
no semantic route/destination/player summary
map snapshot exposes only { open }
map dispose is not invoked through host lifecycle
no map transition journal
no browser or Pages map/input fixture
```

## Concrete input path

```txt
window keydown
  -> simulation adds code to held-key Set
  -> map independently checks M/Escape

map open
  -> host skips gameplay updates
  -> held-key Set continues changing

map close
  -> simulation immediately consumes current Set
```

## Concrete frame path

```txt
main RAF while map open
  -> update timestamp
  -> skip simulation owners
  -> render 3D scene with dt=0
  -> schedule successor

map RAF while map open
  -> read mutable player and parcel state
  -> redraw map canvas
  -> schedule successor
```

## Accessibility and product-feedback gaps after HUD removal

```txt
old per-frame live HUD path is removed
semantic mission announcement authority was not implemented
ordinary control hints are no longer visible
current parcel message is not visible outside diagnostics
map canvas content has no semantic equivalent
fatal <pre> still lacks alert role and focus transaction
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

## Required map fixtures

```txt
fixture:map-transition-idempotency
fixture:single-consumer-per-key-event
fixture:map-open-clears-flight-keys
fixture:map-context-key-isolation
fixture:map-close-neutral-first-step
fixture:pause-participant-parity
fixture:single-map-frame-owner
fixture:map-source-fingerprint
fixture:map-open-first-visible-frame
fixture:map-close-first-resumed-frame
fixture:map-focus-enter-exit
fixture:map-dispose-and-callback-fence
fixture:map-30-60-120hz-parity
fixture:pages-map-pause-resume-parity
```

Do not treat a visible parchment map, a frozen flight path, a passing source-pattern smoke test, a successful build or the absence of console errors as proof that pause, input isolation, focus, lifecycle and map/frame provenance are correct.