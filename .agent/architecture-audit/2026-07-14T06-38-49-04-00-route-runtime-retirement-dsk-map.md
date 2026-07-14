# Architecture Audit: Route Runtime Retirement DSK Map

**Timestamp:** `2026-07-14T06-38-49-04-00`

## Plan ledger

**Goal:** define one semantic owner for the browser route, its active frame generation, component resources, public host references, failure rollback, and terminal retirement.

- [x] Map current route construction order.
- [x] Map existing component disposal services.
- [x] Identify missing aggregate ownership.
- [x] Preserve current domain and kit boundaries.
- [ ] Implement the authority and fixture matrix.

## Current ownership graph

```txt
src/main.js
  -> Nexus Engine telemetry engine
  -> visual domain
  -> balloon object
  -> airstream domain
  -> mail delivery domain
  -> balloon simulation
  -> parchment map overlay
  -> camera rig
  -> balloon presentation
  -> window.GameHost
  -> recursive gameplay RAF
```

Current disposal capabilities:

```txt
balloon simulation -> removes keydown, keyup and blur listeners
airstream domain   -> disposes visual and debug children
mail domain        -> disposes town visuals
map overlay        -> cancels map RAF, disconnects ResizeObserver, removes key listener
visual domain      -> removes resize listener, unsubscribes generation, disposes world and major visual children
```

Missing parent:

```txt
open-above-route-runtime-resource-retirement-authority-domain
```

## Proposed DSK family

```txt
open-above-route-runtime-resource-retirement-authority-domain
open-above-route-generation-kit
open-above-session-generation-kit
open-above-startup-stage-ledger-kit
open-above-owned-callback-registry-kit
open-above-owned-listener-registry-kit
open-above-owned-observer-registry-kit
open-above-owned-scene-resource-registry-kit
open-above-gameplay-frame-admission-kit
open-above-route-runtime-start-command-kit
open-above-route-runtime-start-result-kit
open-above-route-runtime-stop-command-kit
open-above-route-runtime-retirement-result-kit
open-above-startup-failure-rollback-kit
open-above-map-runtime-retirement-kit
open-above-simulation-input-retirement-kit
open-above-airstream-runtime-retirement-kit
open-above-mail-runtime-retirement-kit
open-above-visual-world-retirement-kit
open-above-webgl-renderer-retirement-kit
open-above-public-gamehost-retirement-kit
open-above-stale-callback-quarantine-kit
open-above-first-successor-route-frame-ack-kit
```

## Required services

```txt
route generation allocation
session generation allocation
candidate resource registration
callback/listener/observer ownership
frame admission and stale rejection
ordered component disposal
scene graph and GPU resource retirement
renderer/context retirement policy
public reference replacement or removal
startup failure rollback
per-owner retirement receipts
terminal aggregate result
successor route first-frame acknowledgement
```

## Dependency order

```txt
stop frame admission
  -> cancel gameplay and map RAFs
  -> block new input and updates
  -> clear pending input
  -> retire map and gameplay domains
  -> retire world and presentation resources
  -> retire renderer/context ownership
  -> retire engine subscriptions
  -> clear GameHost
  -> publish terminal result
  -> admit successor generation
```

## Boundary

This audit does not recommend moving rendering, gameplay, mail, map, or Core World into one monolith. It adds one parent transaction that coordinates existing semantic owners and leaves their internal services intact.