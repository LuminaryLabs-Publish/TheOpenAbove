# Project Breakdown: HUD Accessibility Announcement Authority

**Timestamp:** `2026-07-12T07-00-48-04-00`  
**Repository:** `LuminaryLabs-Publish/TheOpenAbove`  
**Branch:** `main`  
**Repository revision reviewed:** `e0f40064e935170dabc642242ce0b25a28527929`

## Summary

The current HUD uses the same DOM node for continuously changing visual telemetry and assistive announcements. `#hud` is an `aria-live="polite"` region, while `updateHud()` replaces its complete `innerHTML` before the first frame and after every rendered frame. Altitude, current capture, burner state, steering trim, camera mode and mission copy therefore share one high-frequency live region with no semantic event admission, deduplication, rate budget or announcement result.

The fatal surface is separate but also incomplete: `showFatal()` reveals a `<pre>` and writes a stack or message, while the live HUD receives a generic error string. The error surface has no alert role, focus target, announcement identity or terminal acknowledgement.

## Plan ledger

**Goal:** separate per-frame visual telemetry from event-driven accessible status, then make every admitted announcement bounded, revisioned, observable and correlated with the mission and visible frame that produced it.

- [x] Compare all ten current `LuminaryLabs-Publish` repositories with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have a central ledger and root `.agent` state.
- [x] Select only `TheOpenAbove`, the oldest eligible ledger entry.
- [x] Read `AGENTS.md`, `index.html`, `src/main.js`, the simulation/camera surfaces, smoke tests and current `.agent` state.
- [x] Identify the complete interaction loop, domains, implemented kits and offered services.
- [x] Trace visual HUD updates, live-region mutations, fatal projection and current validation coverage.
- [x] Define the missing HUD accessibility and announcement authority.
- [x] Add timestamped architecture, render, gameplay, interaction, accessibility and deployment audits.
- [x] Change no runtime source, dependency, package script or workflow.
- [x] Create no branch or pull request.
- [ ] Implement the authority and execute browser, assistive-technology and deployed Pages fixtures.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
central ledger entries: 9
root .agent folders: 9
new or ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

TheOpenAbove       2026-07-12T05-11-46-04-00 selected
PrehistoricRush    2026-07-12T05-21-52-04-00
IntoTheMeadow      2026-07-12T05-39-42-04-00
PhantomCommand     2026-07-12T05-49-04-04-00
HorrorCorridor     2026-07-12T05-59-28-04-00
ZombieOrchard      2026-07-12T06-19-56-04-00
TheUnmappedHouse   2026-07-12T06-30-34-04-00
AetherVale         2026-07-12T06-41-32-04-00
MyCozyIsland       2026-07-12T06-51-27-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/TheOpenAbove` is modified in the Publish organization by this run.

## Complete interaction loop

```txt
page construction
  -> create full-screen canvas
  -> create #hud as aria-live="polite"
  -> create hidden #error <pre>
  -> load src/main.js

boot
  -> write loading text by replacing #hud.innerHTML
  -> create visual, balloon, simulation, route, telemetry and camera owners
  -> perform initial updates
  -> call updateHud()
  -> schedule RAF

visual frame
  -> clamp frame time
  -> update simulation and mail
  -> update airstream, balloon, presentation, camera and visual domain
  -> tick Nexus telemetry
  -> render the frame
  -> call updateHud()
  -> replace the complete live-region innerHTML
  -> schedule the next RAF

fatal startup path
  -> unhide #error
  -> write stack/message into the <pre>
  -> replace #hud live-region content with a generic runtime-error message
  -> publish no fatal announcement result or focus transfer
```

## Source-backed findings

### One node serves incompatible channels

The visible HUD is both:

```txt
high-frequency visual telemetry
and
polite assistive live region
```

Those channels need different update semantics. Visual altitude and capture values may update every frame, while assistive announcements should be admitted only for meaningful events such as route capture, delivery, control-mode change, blocked action or fatal failure.

### Complete DOM replacement occurs every frame

`updateHud()` assigns `hud.innerHTML` after every render. Even when the serialized text is identical, this recreates descendants in an `aria-live` region. When rounded telemetry changes, the accessible text also changes continuously.

### Announcement behavior is refresh-rate and browser dependent

There is no event ID, semantic status revision, dedupe rule, cooldown, rate budget or terminal result. Browser coalescing and assistive-technology queue behavior therefore determine which changes are spoken and whether a stable message is ever reached.

### Visual telemetry and mission events are not separated

The same string combines:

```txt
parcel.message
delivery status
current route and capture percentage
burner state
steering trim
camera mode
altitude
control hints
```

No source classification identifies which fields are decorative telemetry, durable mission status, transient guidance or an announcement-worthy event.

### Fatal projection is not an authoritative alert

The detailed error surface has no `role="alert"`, live-region policy, focus target, fatal ID or acknowledgement. The polite HUD receives a generic message, while the stack-bearing `<pre>` may remain undiscovered by keyboard and screen-reader users.

### Current tests do not exercise accessibility behavior

`tests/smoke.mjs` checks source files and selected implementation patterns. It does not create a DOM, observe live-region mutations, measure announcement frequency, verify semantic event mapping, test fatal focus or inspect deployed accessibility behavior.

## Domains in use

```txt
browser shell, semantic HTML, canvas and DOM projection
runtime admission, session, startup failure and RAF ownership
keyboard, blur, wheel and variable frame time
balloon simulation, airstream, steering, clearance and snapshots
mail route, town, delivery volume, progress and reset
balloon profile, geometry, model loading and GPU resources
envelope, basket, burner, rigging, rope and part presentation
camera follow, zoom, clipping and steering response
quality classification, dynamic resolution and HDR presentation
terrain, horizon, vegetation, grass, water, atmosphere and lighting
telemetry, visual HUD, GameHost and headless inspection
semantic mission status and visual telemetry classification
accessible announcement admission, dedupe, priority and rate budgeting
live-region projection, fatal alert and focus transfer
visible-frame and accessible-status correlation
checks, tests, build and Pages deployment
```

## Implemented kit and service census

```txt
runtime/gameplay source-backed kits: 15
balloon/object/presentation source-backed kits: 15
visual-environment source-backed kits: 26
tooling/proof source-backed kits: 3
active source-backed total: 59
runtime-implied adapters: 12
inactive legacy kits: 11
planned HUD accessibility kits: 27 including parent
```

### Runtime and gameplay kits

```txt
open-above-balloon-simulation-kit
  keyboard state, wind/buoyancy/steering integration, transform application, snapshot, disposal
open-above-balloon-telemetry-kit
  Nexus kit installation, tick and state projection
open-above-airstream-domain
  route, field, sampling, force, visual, debug and snapshot composition
open-above-airstream-route-kit
  authored current routes and destination relationships
open-above-airstream-sampler-kit
  position/time sampling and contributor resolution
open-above-airstream-field-kit
  ambient and route-field velocity evaluation
open-above-airstream-balloon-force-kit
  sampled current application to balloon state
open-above-airstream-visual-kit
  route/current visual projection
open-above-airstream-debug-kit
  airstream debug readback
open-above-mail-delivery-domain
  parcel, route, town visuals, progress, reset, snapshot and disposal
open-above-mail-parcel-kit
  parcel creation and reset
open-above-mail-route-kit
  default route, town and destination data
open-above-delivery-volume-kit
  destination-volume sampling against terrain
open-above-delivery-progress-kit
  route capture, delivery admission, message and event production
open-above-mail-town-kit
  destination-town visual creation, update and disposal
```

### Balloon, object and presentation kits

```txt
open-above-hot-air-balloon-object-kit
open-above-balloon-envelope-profile-kit
open-above-balloon-envelope-panel-kit
open-above-balloon-mouth-kit
open-above-balloon-streamer-fit-kit
open-above-balloon-fabric-seam-kit
open-above-hot-air-balloon-basket-kit
open-above-hot-air-balloon-rigging-kit
open-above-hot-air-balloon-burner-kit
open-above-rope-kit
open-above-balloon-presentation-domain
open-above-envelope-fabric-material-kit
open-above-basket-material-kit
open-above-balloon-camera-rig-kit
open-above-clipping-fade-kit
```

Services include shared envelope profile sampling, unified shell construction, seams and mouth integration, basket/burner/rigging/rope construction, material creation, asynchronous model loading, animation, inertia presentation, camera follow/zoom/mode, clipping fade and exact local disposal surfaces.

### Visual-environment kits

```txt
open-above-visual-domain
open-above-quality-tier-kit
open-above-dynamic-resolution-kit
open-above-physical-sky-kit
open-above-sun-light-kit
open-above-aerial-perspective-kit
open-above-cloud-weather-map-kit
open-above-volumetric-cloud-kit
open-above-cloud-lod-kit
open-above-cloud-lighting-kit
open-above-terrain-surface-kit
open-above-terrain-chunk-streaming-kit
open-above-terrain-horizon-streaming-kit
open-above-vegetation-cluster-kit
open-above-grass-world-seed-kit
open-above-grass-biome-density-kit
open-above-grass-exclusion-mask-kit
open-above-grass-chunk-placement-kit
open-above-grass-lod-kit
open-above-grass-compute-culling-kit
open-above-grass-field-domain
open-above-water-surface-kit
open-above-distant-landmark-kit
open-above-hdr-composer-kit
open-above-color-grade-kit
open-above-lens-response-kit
```

Services include renderer/scene/camera ownership, quality selection, dynamic scale, atmosphere and cloud rendering, terrain/horizon streaming, vegetation and grass generation/culling/LOD, water and landmarks, HDR target/composer management, color grading, lens response, rendering, resize, state observation and disposal.

### Tooling and proof kits

```txt
open-above-headless-editor-environment
  project inspection, renderer validation, checks and build commands
open-above-static-smoke-test-kit
  required-file and source-pattern checks
open-above-airstream-mail-test-kit
  route, current and delivery-domain proof
```

### Runtime-implied adapters

```txt
open-above-route-shell-kit
open-above-importmap-kit
open-above-runtime-composer-kit
open-above-keyboard-input-kit
open-above-wheel-zoom-input-kit
open-above-hud-projection-kit
open-above-error-panel-kit
open-above-gamehost-legacy-readback-kit
open-above-nexusengine-cdn-adapter-kit
open-above-campaign-source-kit
open-above-raf-clock-adapter-kit
open-above-pages-deploy-kit
```

They provide the HTML route, module map, top-level owner composition, browser input adapters, visual HUD and fatal panel projection, global readback, Nexus CDN adaptation, campaign constants, RAF timing and static deployment.

## Required parent domain

```txt
open-above-hud-accessibility-announcement-authority-domain
```

## Candidate coordinating kits

```txt
open-above-hud-visual-frame-projection-kit
open-above-hud-semantic-status-kit
open-above-hud-projection-revision-kit
open-above-accessible-announcement-id-kit
open-above-accessible-announcement-kind-kit
open-above-accessible-announcement-priority-kit
open-above-accessible-announcement-policy-kit
open-above-accessible-announcement-admission-kit
open-above-accessible-announcement-dedupe-kit
open-above-accessible-announcement-rate-budget-kit
open-above-mission-event-announcement-kit
open-above-control-hint-announcement-kit
open-above-telemetry-quiet-channel-kit
open-above-accessible-live-region-adapter-kit
open-above-fatal-error-announcement-kit
open-above-fatal-focus-transfer-kit
open-above-aria-atomic-policy-kit
open-above-reduced-verbosity-preference-kit
open-above-hud-dom-diff-kit
open-above-accessible-announcement-result-kit
open-above-accessible-announcement-observation-kit
open-above-accessible-announcement-journal-kit
open-above-accessible-frame-ack-kit
open-above-hud-accessibility-fixture-kit
open-above-screen-reader-event-rate-smoke-kit
open-above-fatal-announcement-smoke-kit
```

## Required transaction

```txt
committed simulation/mail/camera observation
  -> derive visual telemetry projection
  -> update non-live visual HUD with minimal DOM changes
  -> derive semantic mission/control/failure events
  -> admit by kind, priority, revision and user policy
  -> dedupe and enforce elapsed-time rate budget
  -> commit one announcement result
  -> project to a dedicated atomic live region
  -> correlate announcement, mission and visible-frame revisions

fatal result
  -> stop normal announcement admission
  -> publish one concise assertive fatal status
  -> expose/focus the detailed error surface
  -> preserve one terminal acknowledgement
```

## Required invariants

```txt
per-frame telemetry never mutates the live region directly
only committed semantic events can create announcements
identical events are idempotent and deduplicated
announcement rate is bounded by elapsed time, not refresh rate
visual HUD remains useful without becoming assistive queue noise
mission status, announcement and visible frame cite compatible revisions
fatal failure is announced exactly once and exposes a keyboard-focusable detail surface
raw stack text is not the only assistive error message
restart or replacement session retires predecessor announcements
```

## Required proof

```txt
60 seconds of steady flight produces bounded announcements
30, 60 and 120 Hz produce the same semantic announcement sequence
continuously changing altitude/capture telemetry produces no live-region spam
route capture and mail delivery each produce one durable announcement
repeated identical mission events remain idempotent
camera-mode or control-hint announcements follow explicit policy
fatal startup failure produces one alert and focusable details
visible HUD, GameHost observation and accessible status share mission/frame provenance
local browser and deployed Pages behavior pass the same fixture matrix
```

## Output map

```txt
.agent/trackers/2026-07-12T07-00-48-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-12T07-00-48-04-00.md
.agent/architecture-audit/2026-07-12T07-00-48-04-00-hud-accessibility-announcement-authority-dsk-map.md
.agent/render-audit/2026-07-12T07-00-48-04-00-visual-hud-live-region-frame-gap.md
.agent/gameplay-audit/2026-07-12T07-00-48-04-00-flight-telemetry-announcement-loop.md
.agent/interaction-audit/2026-07-12T07-00-48-04-00-semantic-event-announcement-result-map.md
.agent/accessibility-audit/2026-07-12T07-00-48-04-00-live-region-rate-fatal-focus-contract.md
.agent/deploy-audit/2026-07-12T07-00-48-04-00-hud-accessibility-fixture-gate.md
```

## Validation boundary

```txt
runtime source changed: no
HTML changed: no
accessibility behavior changed: no
package scripts changed: no
dependencies changed: no
deployment changed: no
branch created: no
pull request created: no

npm run check: not run
npm run headless:check: not run
npm run build: not run
DOM mutation fixture: unavailable
screen-reader fixture: unavailable
fatal focus fixture: unavailable
Pages accessibility smoke: not run
```

This run documents the source-backed defect and target boundary. It does not claim that assistive announcement behavior is fixed.