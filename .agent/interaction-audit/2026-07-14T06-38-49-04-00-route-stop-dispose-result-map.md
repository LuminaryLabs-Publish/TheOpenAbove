# Interaction Audit: Route Stop and Dispose Result Map

**Timestamp:** `2026-07-14T06-38-49-04-00`

## Plan ledger

**Goal:** replace implicit browser teardown with typed route-runtime commands and terminal results.

- [x] Identify current implicit start and missing stop interactions.
- [x] Map duplicate, stale, partial and failure outcomes.
- [x] Define public readback requirements.
- [ ] Implement command admission and browser fixtures.

## Commands

```txt
RouteRuntimeStartCommand
RouteRuntimeStopCommand
RouteRuntimeDisposeCommand
RouteRuntimeFailureCommand
RouteRuntimeReplaceCommand
```

## Required envelope

```txt
commandId
routeGeneration
sessionGeneration
expectedStatus
expectedLastFrameId
reason
requestedAt
```

## Results

```txt
Started
Stopped
Disposed
FailedAndRolledBack
Replaced
Duplicate
Stale
Superseded
TimedOut
PartialRetirementFailed
AlreadyRetired
Rejected
```

## Participant receipts

```txt
gameplay-frame receipt
simulation-input receipt
map RAF/listener/observer receipt
airstream visual/debug receipt
mail town-visual receipt
world-generation subscription receipt
terrain/flora/world receipt
composer/render-target receipt
renderer/context receipt
engine subscription receipt
GameHost publication receipt
```

## Public readback

`window.GameHost` should expose an immutable route-runtime status/result rather than remaining a permanently live bag of mutable objects. After retirement, predecessor methods must either be absent or return `Retired` without mutation.

## Ordering

```txt
accept stop
  -> freeze command admission
  -> quarantine frame callbacks
  -> dispose participants
  -> clear public ownership
  -> publish terminal result
  -> permit successor start
```