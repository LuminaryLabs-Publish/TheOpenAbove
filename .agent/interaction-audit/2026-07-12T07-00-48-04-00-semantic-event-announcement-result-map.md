# Interaction Audit: Semantic Event to Announcement Result Map

**Timestamp:** `2026-07-12T07-00-48-04-00`

## Current map

```txt
frame data
  -> string interpolation
  -> #hud.innerHTML
  -> browser/assistive-technology implementation decides delivery
```

There is no explicit interaction result between a gameplay event and assistive output.

## Required map

```txt
source event
  -> classify kind
  -> validate runtime and mission revision
  -> apply user policy
  -> deduplicate by event ID
  -> apply elapsed-time budget
  -> resolve priority
  -> commit live-region update
  -> publish typed result
  -> acknowledge visible frame
```

## Source to result examples

```txt
mail-delivered event
  -> accepted / polite / durable

duplicate mail-delivered event ID
  -> deduplicated

camera mode unchanged
  -> no-change

camera mode toggles repeatedly inside cooldown
  -> rate-limited

predecessor-session event after restart
  -> stale

fatal runtime result
  -> accepted / assertive / terminal
```

## Result vocabulary

```txt
accepted
deduplicated
rate-limited
no-change
stale
rejected
failed
```

Reasons remain separate:

```txt
mission-event
control-hint
mode-change
same-event-id
same-semantic-text
budget-exhausted
verbosity-disabled
stale-session
stale-mission-revision
fatal-superseded
live-region-write-failed
```

## Required result row

```js
{
  commandId,
  announcementId,
  sourceEventId,
  runtimeSessionId,
  missionRevision,
  projectionRevision,
  kind,
  priority,
  status,
  reason,
  textFingerprint,
  liveRegionRevision,
  committedAt,
  acknowledgedFrameId
}
```

## Guardrails

```txt
do not expose raw DOM nodes or Event objects
do not announce continuously changing telemetry by default
do not derive rate budgets from frame count
do not use speech synthesis as the authority
do not place raw stack text in the concise announcement
do not let polite events overwrite a terminal alert
```