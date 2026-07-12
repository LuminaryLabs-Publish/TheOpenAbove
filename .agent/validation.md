# Validation: TheOpenAbove

**Last aligned:** `2026-07-12T08-50-32-04-00`

## Scope

Documentation-only audit of parchment-map open/close, gameplay pause, input isolation, focus, dual RAF ownership, lifecycle and visible-frame provenance through repository revision `a5dd665a80cfe594ebaf05085633d4006e012b32`.

## Plan ledger

**Goal:** distinguish source-backed map behavior from executable proof that pause/resume is atomic, input is context-isolated, focus is deterministic and visible frames cite one transition.

- [x] Compare the complete Publish inventory and central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `TheOpenAbove`.
- [x] Read guidance, page shell, host loop, map overlay, simulation input, mail domain, tests and root `.agent` state.
- [x] Confirm map-open causes the host to skip gameplay-owner updates.
- [x] Confirm simulation input remains globally active while the map is open.
- [x] Confirm main and map RAF loops both run while open.
- [x] Confirm map snapshot contains only the open Boolean.
- [x] Confirm no focus-transfer, pause-result, source-fingerprint or frame-ack contract exists.
- [x] Reconcile 60 active source-backed kits and services.
- [x] Define static, pure, browser, build and Pages proof requirements.
- [x] Change no runtime source, HTML, dependency, script or workflow.
- [x] Create no branch or pull request.

## Source-backed behavior

```txt
index.html contains map dialog shell and map canvas
map overlay installs a global keydown listener and ResizeObserver
M toggles open; Escape closes
open starts a recursive map RAF
close cancels the retained map RAF ID
main RAF reads mapOverlay.isOpen()
main RAF skips simulation/mail/airstream/presentation/camera/visual-update/telemetry while open
main RAF continues visual.render() and schedules itself
simulation owns separate global keydown/keyup/blur listeners
simulation held-key Set continues changing while map is open
closing map resumes simulation from current held-key state
map snapshot returns only { open }
map provides dispose(), but main does not invoke it
```

## Source-backed gaps

```txt
no transition command, ID or idempotency receipt
no map phase, generation or revision
no pause participant barrier
no input context or generation
no held-key retirement policy
no stale callback/input rejection
no single map-frame owner
no immutable map frame plan
no map source or surface fingerprint
no projection result or no-op result
no first map frame or resumed flight frame receipt
no focus lease, close control or semantic map summary
no runtime-session map retirement
```

## Required static fixtures

```txt
fixture:map-authority-present
fixture:single-browser-input-owner
fixture:map-dialog-focus-target-present
fixture:map-close-control-present
fixture:map-semantic-summary-present
fixture:raw-open-boolean-not-pause-authority
fixture:map-owner-disposed-by-session
```

## Required pure fixtures

```txt
fixture:map-transition-idempotency
fixture:map-state-machine
fixture:map-transition-stale-revision-rejection
fixture:map-input-context-admission
fixture:held-key-retirement-policy
fixture:pause-participant-prepare-commit-rollback
fixture:map-source-fingerprint
fixture:map-projection-no-op
fixture:stale-map-generation-rejection
```

## Required browser fixtures

```txt
boot actual page
focus game canvas
open map using M
verify all gameplay participants share one pause revision
verify held flight keys are retired by policy
press flight keys while map owns input
verify no map-context key reaches simulation
verify one map-frame producer
verify first visible map frame receipt
close by M and Escape
verify neutral first resumed simulation step
verify first resumed flight frame receipt
verify focus enter and restoration
resize and change DPR while open
blur and hide tab during map session
rapidly open/close and reject stale callbacks
retire runtime and confirm listener/observer/RAF cleanup
run at 30, 60 and 120 Hz schedules
```

## Required built-output checks

```txt
dist includes map module and shell
dist excludes retired HUD dependency
built imports resolve under project base path
map authority and fixture modules are included
source and built map fingerprints match
```

## Required Pages smoke

```txt
load deployed route
open map and confirm deterministic pause
confirm route, towns, destination and player projection
confirm semantic map summary and close control
confirm gameplay input isolation
close and confirm neutral deterministic resume
repeat after resize, visibility change and reload
confirm no duplicate callbacks after repeated sessions
capture map-open and resumed-flight frame receipts
```

## Commands not run

```txt
npm install
npm run check
npm run headless:check
npm run build
browser map/input/focus matrix
Pages map pause/resume smoke
```

The connector environment supplied repository source and write access, not a checked-out browser runtime. No executable pause, input, focus, lifecycle or rendering correctness claim is made.

## Change-state validation

```txt
runtime JavaScript changed: no
HTML changed: no
package scripts changed: no
dependencies changed: no
gameplay changed: no
input behavior changed: no
render behavior changed: no
accessibility behavior changed: no
deployment workflow changed: no
branch created: no
pull request created: no
.agent documentation changed: yes
```

## Completion boundary

Do not claim the parchment map is an authoritative pause surface until executable browser and Pages proof shows transition idempotency, participant parity, map-context input isolation, neutral resume, deterministic focus, single frame ownership, stale-callback retirement and map/resumed-frame provenance.