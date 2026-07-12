# Deploy Audit: HUD Accessibility Fixture Gate

**Timestamp:** `2026-07-12T07-00-48-04-00`

## Current proof

```txt
npm run check
  -> Node source/file assertions

npm run build
  -> smoke plus Vite build

headless checks
  -> project and renderer inspection

current gap
  -> no DOM accessibility execution
  -> no live-region mutation observation
  -> no assistive event-rate proof
  -> no fatal focus proof
  -> no deployed Pages accessibility smoke
```

## Required static gate

```txt
visual HUD is not a live region
semantic status node exists
fatal detail surface is focusable
announcement authority and typed result surfaces exist
per-frame code cannot write directly to the live region
```

## Required pure fixture gate

```txt
semantic event classification
announcement deduplication
elapsed-time rate budgeting
priority and terminal supersession
stale session/mission rejection
verbosity policy
```

## Required browser gate

```txt
boot the real route
observe MutationObserver records for visual HUD and semantic status
run 60 seconds of steady flight at 30, 60 and 120 Hz simulation schedules
verify bounded live-region mutations
trigger route capture and delivery
verify one announcement per event ID
trigger camera-mode threshold oscillation
verify policy-controlled output
inject fatal startup and frame failures
verify one alert and one focus transfer
verify replacement session clears predecessor status
```

## Required Pages gate

```txt
load deployed route with accessibility tree available
confirm canvas label and visual HUD remain present
confirm semantic status is quiet during ordinary telemetry changes
confirm route/delivery announcements appear once
confirm fatal details are discoverable and keyboard focusable
confirm no console, DOM or accessibility regression after resize and quality changes
```

## Acceptance

```txt
same semantic announcement sequence across cadence matrix
no more than policy budget during steady flight
no per-frame altitude/capture speech
one delivery announcement
one terminal alert
one terminal focus transfer
no stale predecessor announcement after restart
frame, mission and announcement revisions correlate
```

## Commands not run

```txt
npm run check
npm run headless:check
npm run build
browser accessibility fixture matrix
screen-reader smoke
Pages accessibility smoke
```

No accessibility correctness claim is made until these executable gates pass.