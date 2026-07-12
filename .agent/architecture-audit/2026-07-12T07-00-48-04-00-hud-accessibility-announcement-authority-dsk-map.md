# Architecture Audit: HUD Accessibility Announcement Authority DSK Map

**Timestamp:** `2026-07-12T07-00-48-04-00`

## Problem boundary

The product currently treats the visible HUD and the assistive status channel as one mutable DOM surface. The architecture must split:

```txt
visual telemetry projection
semantic mission status
assistive announcement admission
live-region delivery
fatal alert and focus
frame/mission/announcement correlation
```

## Parent domain

```txt
open-above-hud-accessibility-announcement-authority-domain
```

## DSK composition

### Projection identity

```txt
open-above-hud-visual-frame-projection-kit
open-above-hud-semantic-status-kit
open-above-hud-projection-revision-kit
```

Services:

```txt
derive non-live visual telemetry from one committed observation
classify durable mission status separately from decorative telemetry
allocate a projection revision shared by visual and semantic consumers
```

### Announcement identity and policy

```txt
open-above-accessible-announcement-id-kit
open-above-accessible-announcement-kind-kit
open-above-accessible-announcement-priority-kit
open-above-accessible-announcement-policy-kit
```

Services:

```txt
stable announcement identity
mission, control, mode, warning and fatal classification
polite/assertive priority resolution
user and product announcement policy
```

### Admission and budgeting

```txt
open-above-accessible-announcement-admission-kit
open-above-accessible-announcement-dedupe-kit
open-above-accessible-announcement-rate-budget-kit
open-above-mission-event-announcement-kit
open-above-control-hint-announcement-kit
```

Services:

```txt
admit only committed semantic events
reject stale session, mission or projection revisions
make duplicate event delivery idempotent
bound announcement frequency by elapsed time
map route, delivery, camera and control events to concise text
```

### Channel separation and DOM projection

```txt
open-above-telemetry-quiet-channel-kit
open-above-accessible-live-region-adapter-kit
open-above-aria-atomic-policy-kit
open-above-reduced-verbosity-preference-kit
open-above-hud-dom-diff-kit
```

Services:

```txt
keep per-frame numbers out of the live region
project one committed announcement to a dedicated status node
choose atomicity and relevant-change behavior explicitly
apply user verbosity preference
update visual HUD nodes without complete subtree replacement
```

### Fatal projection

```txt
open-above-fatal-error-announcement-kit
open-above-fatal-focus-transfer-kit
```

Services:

```txt
publish one concise terminal alert
expose detailed error information separately
move focus to a deterministic keyboard-focusable error surface
prevent repeated fatal announcements
```

### Results, observation and proof

```txt
open-above-accessible-announcement-result-kit
open-above-accessible-announcement-observation-kit
open-above-accessible-announcement-journal-kit
open-above-accessible-frame-ack-kit
open-above-hud-accessibility-fixture-kit
open-above-screen-reader-event-rate-smoke-kit
open-above-fatal-announcement-smoke-kit
```

Services:

```txt
typed accepted, deduplicated, rate-limited, stale and failed results
detached current announcement observation
ordered source/event/result journal
mission, visual-frame and announcement acknowledgement
pure DOM and timing fixtures
browser announcement-rate smoke
fatal alert and focus smoke
```

## Command and result shapes

```js
{
  commandId,
  runtimeSessionId,
  missionRevision,
  projectionRevision,
  sourceEventId,
  kind,
  priority,
  text,
  requestedAt
}
```

```js
{
  commandId,
  announcementId,
  status: "accepted" | "deduplicated" | "rate-limited" | "stale" | "rejected" | "failed",
  reason,
  runtimeSessionId,
  missionRevision,
  projectionRevision,
  committedAt,
  liveRegionRevision
}
```

## Required transaction

```txt
committed observation
  -> derive visual HUD projection
  -> patch non-live HUD nodes
  -> derive semantic events
  -> admit by session, mission, kind, priority and policy
  -> dedupe and rate-budget
  -> commit announcement result
  -> update dedicated live region atomically
  -> acknowledge compatible visible frame
```

Fatal path:

```txt
fatal result
  -> fence normal announcements
  -> commit one assertive fatal announcement
  -> reveal and focus detailed error surface
  -> record terminal acknowledgement
```

## Invariants

```txt
visual telemetry cannot write directly to the live region
announcement ordering is derived from committed semantic events
refresh rate cannot change the semantic announcement sequence
identical event IDs cannot be announced twice
rate limiting uses elapsed time, not frame count
fatal status is announced once
fatal details are keyboard reachable
replacement sessions cannot receive predecessor announcements
frame, mission and announcement provenance is observable
```

## Integration map

```txt
src/main.js updateHud
  -> split into visual projection and semantic event adapters

index.html #hud
  -> remain visual and non-live

new dedicated status node
  -> own polite semantic announcements

#error
  -> own focusable detailed terminal output

mail delivery event
  -> source mission announcement

airstream/camera mode transitions
  -> source policy-governed announcements

telemetry/GameHost
  -> expose detached revision/result snapshots only
```

## Non-goals

```txt
no gameplay balance change
no visual redesign
no new persistent dashboard
no raw Event or DOM node exposure through GameHost
no speech-synthesis implementation
no runtime change in this documentation pass
```