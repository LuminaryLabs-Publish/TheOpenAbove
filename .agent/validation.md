# Validation: TheOpenAbove

**Last aligned:** `2026-07-12T07-00-48-04-00`

## Scope

Documentation-only audit of visual HUD, live-region, semantic announcement and fatal-focus behavior through repository revision `e0f40064e935170dabc642242ce0b25a28527929`.

## Plan ledger

**Goal:** distinguish source-backed live-region and fatal-discovery defects from executable proof that announcements are meaningful, bounded, cadence-independent and lifecycle-safe.

- [x] Compare the complete Publish inventory and central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `TheOpenAbove` as the oldest eligible repository.
- [x] Read `AGENTS.md`, `index.html`, `src/main.js`, simulation, camera, tests and root `.agent` state.
- [x] Confirm `#hud` is a polite live region.
- [x] Confirm `updateHud()` replaces its complete `innerHTML` after every render.
- [x] Confirm no semantic event, dedupe, rate, result or frame-correlation authority exists.
- [x] Confirm fatal details have no alert/focus contract.
- [x] Preserve all 59 source-backed kits and services.
- [x] Define static, pure, browser, accessibility-tree and Pages proof requirements.
- [x] Change no runtime source, HTML, dependency, script or workflow.
- [x] Create no branch or pull request.

## Source-backed behavior

```txt
index.html marks #hud aria-live="polite"
boot writes loading content through hud.innerHTML
initial setup calls updateHud()
frame loop calls updateHud() after visual.render()
updateHud serializes mission and rapidly changing telemetry together
updateHud replaces the complete HUD innerHTML
showFatal reveals #error and writes stack/message
showFatal writes a generic error into the live HUD
#error has no alert role or focus contract
```

## Source-backed gaps

```txt
no visual/assistive channel separation
no semantic source-event identity
no announcement identity, kind or priority
no product/user announcement policy
no mission/projection revision
no admission or stale-result rejection
no dedupe or elapsed-time rate budget
no dedicated atomic live region
no field-level visual HUD update
no typed announcement result
no detached observation or journal
no mission/frame/announcement acknowledgement
no exactly-once fatal alert
no fatal focus transfer
no replacement-session status cleanup
```

## Required static fixtures

```txt
fixture:hud-visual-node-is-non-live
fixture:semantic-status-node-present
fixture:fatal-detail-surface-focusable
fixture:announcement-authority-present
fixture:per-frame-live-region-write-absent
fixture:typed-announcement-result-present
```

## Required pure fixtures

```txt
fixture:semantic-event-classification
fixture:announcement-priority-policy
fixture:event-id-deduplication
fixture:semantic-text-deduplication
fixture:elapsed-time-rate-budget
fixture:verbosity-policy
fixture:stale-session-rejection
fixture:stale-mission-revision-rejection
fixture:fatal-priority-supersession
```

## Required browser fixtures

```txt
boot real page DOM
observe #hud and semantic status with MutationObserver
run steady flight at 30, 60 and 120 Hz schedules
confirm visual telemetry updates without live-region churn
trigger airstream entry/capture/exit
trigger camera-mode transitions
trigger one mail delivery
submit duplicate semantic events
inject startup and frame fatal failures
verify one concise fatal alert
verify detailed error focus exactly once
replace runtime and confirm predecessor status is retired
record frame, mission and announcement receipts
```

## Required assistive-technology checks

```txt
status output is concise and intelligible
steady flight does not create a continuous speech queue
important mission events are discoverable once
control hints follow verbosity and cooldown policy
fatal failure interrupts appropriately
error details are keyboard and screen-reader reachable
focus remains recoverable after the terminal surface opens
```

## Required Pages smoke

```txt
load deployed route
confirm visual HUD and canvas label
confirm dedicated semantic status remains quiet during ordinary telemetry
capture one route and complete one delivery
confirm one announcement per committed event
inject or exercise visible failure path
confirm one fatal alert and focusable details
resize and force quality transitions without accessibility regression
```

## Commands not run

```txt
npm install
npm run check
npm run headless:check
npm run build
browser DOM mutation matrix
screen-reader smoke
Pages accessibility smoke
```

The connector environment supplied repository source and write access, not a checked-out browser or assistive-technology runtime. No executable accessibility correctness claim is made.

## Change-state validation

```txt
runtime JavaScript changed: no
HTML changed: no
package scripts changed: no
dependencies changed: no
gameplay changed: no
render behavior changed: no
accessibility behavior changed: no
deployment workflow changed: no
branch created: no
pull request created: no
.agent documentation changed: yes
```

## Completion boundary

Do not claim HUD accessibility correctness until executable browser and Pages proof shows visual/live-region separation, bounded cadence-independent announcements, committed mission-event mapping, duplicate idempotency, stale-session rejection, exactly-once fatal alert/focus behavior and frame/mission/announcement provenance.