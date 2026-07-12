# Known Gaps: TheOpenAbove

**Last aligned:** `2026-07-12T04-00-32-04-00`

## Primary ordered gaps

```txt
1. immutable runtime admission
2. import purity and single frame owner
3. balloon profile snapshot, schema, admission and fingerprint
4. balloon model assembly, load generation and resource ownership
5. runtime session/listener/resource ownership
6. fixed-step clock and sequenced input
7. product source and acceptance parity
8. Air Mail route and delivery authority
9. mission reset transaction and epoch
10. committed observation correlation
11. public host owner quarantine and capability authority
12. frame-stage failure containment and last-known-good authority
13. terrain source, LOD and atomic replacement
14. grass spatial identity and backend truth
15. world-surface consumer parity
16. balloon steering input/result authority
17. simulation/root/part/camera steering coherence
18. steering reset neutralization and visible-frame proof
```

## Frame-failure gaps

```txt
boot catch covers startup construction only
normal RAF callback has no enclosing failure boundary
no frame ID or immutable frame input
no canonical frame-stage schema or stage ID
no typed stage result
no failure ID or classification
no completed-stage mutation journal
no single failure admission rule
no later-stage mutation fence
no last-known-good frame identity
no canvas/HUD/readback last-good correlation
no failed-session mutation quarantine
no automatic public capability revocation
no render-freeze or bounded terminal overlay contract
no ordered disposal plan/result for frame failure
no terminal failure observation
no cold-restart admission into a fresh session
```

## Concrete partial-frame cases

```txt
simulation succeeds and mail throws
  -> flight state is newer than visible output

mail commits delivery and render throws
  -> parcel may be delivered while canvas and HUD remain old

render succeeds and HUD throws
  -> canvas is newer than HUD and no successor frame runs

telemetry succeeds and render throws
  -> diagnostics may report state never presented visibly
```

## Public host capability gaps

```txt
window.GameHost exports live engine and library objects
window.GameHost exports raw scene, renderer, camera and balloon objects
window.GameHost exports visual, simulation, airstream and mail domains
window.GameHost exports camera rig and balloon presentation domains
public owner references remain valid across future reset/lifecycle boundaries
public callers can invoke update, render, reset and dispose methods directly
public callers can mutate simulation, parcel, route, camera and presentation state
no capability descriptors
no command envelope or command ID
no session, mission or frame revision fences
no finite-value validation for public mutation
no duplicate or stale command rejection
no typed public command result
no bounded public command journal
no immutable committed read model
no state fingerprint shared by host, telemetry, HUD and visible frame
no capability revocation on failure, reset, stop or disposal
```

## Retained balloon profile gaps

```txt
root default profile is mutable
nested root-profile references are aliased
public balloon kit exposes the root profile
loader does not clone before async yield
no complete schema, canonicalization or deep validation
no profile ID/revision/fingerprint
no load generation or stale-load rejection
no model/profile aggregate receipt
no first visible profile-frame proof
```

## Retained reset and lifecycle gaps

```txt
no root runtime session owns all callbacks/listeners/resources
no transaction resets held input, mission, profile/model, steering, camera and presentation together
no mission epoch fences predecessor owner references
no neutral convergence or first replacement-frame receipt
```

## Required frame-failure fixtures

```txt
fixture:frame-failure-simulation-stage
fixture:frame-failure-mail-stage
fixture:frame-failure-airstream-stage
fixture:frame-failure-balloon-stage
fixture:frame-failure-presentation-stage
fixture:frame-failure-camera-stage
fixture:frame-failure-visual-update-stage
fixture:frame-failure-telemetry-stage
fixture:frame-failure-render-stage
fixture:frame-failure-hud-stage
fixture:frame-failure-no-successor-raf
fixture:frame-failure-last-known-good-coherence
fixture:frame-failure-capability-revocation
fixture:frame-failure-ordered-disposal
fixture:frame-failure-cold-restart
fixture:pages-frame-failure-terminal-surface
```

Do not treat a frozen canvas, an uncaught console error, stale `GameHost.getState()`, or a previously successful frame as proof that a runtime failure was contained.