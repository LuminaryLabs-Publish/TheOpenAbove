# START HERE: TheOpenAbove

**Last aligned:** `2026-07-12T07-00-48-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`  
**Branch:** `main`

## Summary

The current audit isolates HUD accessibility announcement ownership. `#hud` is an `aria-live="polite"` region, while `updateHud()` replaces its complete `innerHTML` before the first frame and after every rendered frame. Continuously changing visual telemetry and meaningful mission status therefore share one unbounded assistive channel.

Fatal output is also split without authority: the HUD receives a generic error message while a stack-bearing `<pre>` is revealed with no alert role, focus target, terminal ID or acknowledgement.

## Plan ledger

**Goal:** separate visual telemetry from semantic announcements, then make live-region and fatal output bounded, revisioned, lifecycle-safe and correlated with mission and visible-frame state.

- [x] Compare the complete Publish organization inventory with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` coverage.
- [x] Select only `TheOpenAbove` as the oldest eligible repository.
- [x] Trace page semantics, frame HUD projection, mission events, fatal output and current tests.
- [x] Identify the interaction loop, domains, all kits and every offered service.
- [x] Define the missing HUD accessibility announcement authority.
- [x] Add timestamped tracker, turn ledger and system audits.
- [x] Refresh root `.agent` state and kit registry.
- [x] Push directly to `main`; create no branch or pull request.
- [ ] Implement the authority and executable browser/Pages accessibility fixtures.

## Read this first

```txt
.agent/trackers/2026-07-12T07-00-48-04-00/project-breakdown.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/architecture-audit/2026-07-12T07-00-48-04-00-hud-accessibility-announcement-authority-dsk-map.md
.agent/render-audit/2026-07-12T07-00-48-04-00-visual-hud-live-region-frame-gap.md
.agent/gameplay-audit/2026-07-12T07-00-48-04-00-flight-telemetry-announcement-loop.md
.agent/interaction-audit/2026-07-12T07-00-48-04-00-semantic-event-announcement-result-map.md
.agent/accessibility-audit/2026-07-12T07-00-48-04-00-live-region-rate-fatal-focus-contract.md
.agent/deploy-audit/2026-07-12T07-00-48-04-00-hud-accessibility-fixture-gate.md
.agent/turn-ledger/2026-07-12T07-00-48-04-00.md
.agent/kit-registry.json
```

Retained audits remain authoritative for HDR attachments, frame failure, public host isolation, model/profile loading, steering, world surface, grass, terrain, committed observation, mission reset, lifecycle, import purity and fixed-step/input boundaries.

## Interaction loop

```txt
page
  -> create canvas
  -> create #hud with aria-live="polite"
  -> create hidden #error <pre>

boot
  -> replace HUD content with loading status
  -> create game owners
  -> run initial updates
  -> call updateHud()
  -> schedule RAF

frame
  -> update simulation, mail, airstream, model, camera and visuals
  -> tick telemetry
  -> render canvas
  -> replace the entire live-region innerHTML
  -> schedule next RAF

fatal startup
  -> reveal #error and write stack/message
  -> replace live HUD with generic failure text
  -> provide no alert/focus/result contract
```

## Domains in use

```txt
browser shell, semantic HTML, canvas and DOM projection
runtime admission, session, startup failure and RAF ownership
keyboard, blur, wheel and variable frame time
balloon simulation, airstream, steering, clearance and snapshots
mail route, town, volume, delivery progress and reset
balloon profile, model assembly, loading and resources
envelope, basket, burner, rigging, rope and presentation
camera follow, zoom, clipping and steering response
quality, dynamic resolution, HDR surface and post processing
terrain, grass, atmosphere, water, lighting and lens response
telemetry, visual HUD, GameHost and headless inspection
semantic mission status and visual telemetry classification
accessible announcement admission, dedupe, priority and rate budgeting
live-region projection, fatal alert and focus transfer
visible-frame and accessible-status correlation
checks, tests, build and Pages deployment
```

## Kits and services

```txt
active source-backed kits: 59
  runtime/gameplay: 15
  balloon/object/presentation: 15
  visual environment: 26
  tooling/proof: 3
runtime-implied adapters: 12
inactive legacy kits: 11
planned HUD accessibility kits: 27 including parent
```

The exact kit names and per-kit service map are recorded in the timestamped tracker and `.agent/kit-registry.json`.

## Main finding

```txt
visual HUD node is also the polite live region
complete innerHTML replacement occurs after every rendered frame
altitude, capture, burner, trim, camera and mission text share one channel
no semantic event identity or announcement result exists
no dedupe, elapsed-time budget or verbosity policy exists
no frame/mission/announcement provenance exists
fatal details have no alert role or focus transfer
current tests contain no DOM accessibility execution
```

## Required parent domain

```txt
open-above-hud-accessibility-announcement-authority-domain
  -> visual HUD and semantic status separation
  -> projection, event and announcement identity
  -> policy, priority, dedupe and elapsed-time budgeting
  -> dedicated atomic live-region adapter
  -> DOM diff projection
  -> fatal alert and focus transfer
  -> detached observation, journal and frame acknowledgement
  -> browser and Pages accessibility fixtures
```

## Ordered implementation queue

```txt
1. immutable runtime admission
2. import purity and single frame ownership
3. balloon profile/model authority
4. runtime lifecycle, fixed-step clock and sequenced input
5. product source, Air Mail route and mission reset
6. committed observation, public host and frame-failure containment
7. terrain, grass and world-surface authorities
8. steering and presentation coherence
9. HDR attachment and render-surface resolution authority
10. HUD accessibility announcement authority
```

## Next safe ledge

```txt
HUD Accessibility Announcement Authority
+ Visual/Assistive Channel Separation
+ Semantic Mission Event Admission
+ Dedupe and Elapsed-Time Rate Budget
+ Fatal Alert and Focus Transfer
+ Frame/Mission/Announcement Receipt
```