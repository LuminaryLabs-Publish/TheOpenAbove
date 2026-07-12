# Accessibility Audit: Live-Region Rate and Fatal Focus Contract

**Timestamp:** `2026-07-12T07-00-48-04-00`

## Current state

```txt
#hud
  element: aside
  aria-live: polite
  update source: frame loop
  update operation: complete innerHTML replacement
  semantic event filter: none
  dedupe: none
  rate budget: none
  atomicity policy: implicit

#error
  element: pre
  initially hidden: yes
  alert role: none
  tabindex/focus target: none
  terminal announcement identity: none
```

## Required surface contract

### Visual HUD

```txt
non-live
field-level DOM updates
contains current visual telemetry and control hints
may update every frame without producing announcements
```

### Semantic status region

```txt
dedicated node
role=status or equivalent polite semantics
explicit aria-atomic policy
updated only by committed announcement results
bounded and deduplicated
```

### Fatal surface

```txt
concise assertive alert
separate detailed error output
keyboard-focusable detail container
single focus transfer after terminal commit
no repeated announcement from subsequent mutations
```

## Announcement budget

The exact product values need implementation approval, but the authority must support:

```txt
minimum interval by priority
coalescing window for related status
deduplication by event ID and semantic text
terminal priority that supersedes pending polite status
verbosity preference
```

The budget must use monotonic elapsed time, never RAF count.

## Data minimization

```txt
announce concise user-facing failure summary
retain stack details in the visible/focusable detail surface
never require raw stack speech for error discovery
never serialize raw DOM nodes or browser Event objects into diagnostics
```

## Lifecycle contract

```txt
runtime start
  -> allocate announcement generation and clear stale status

mission reset
  -> retire predecessor mission announcements

visibility pause
  -> follow explicit queue/suspension policy

fatal result
  -> fence normal status, announce once, focus details

runtime replacement
  -> reject predecessor announcement results
```

## Required checks

```txt
live-region mutation count remains bounded during steady flight
important mission events are announced once
announcement sequence is cadence independent
same event ID is idempotent
fatal alert occurs once
fatal details receive focus once
focus remains recoverable by keyboard
replacement session receives no predecessor status
```