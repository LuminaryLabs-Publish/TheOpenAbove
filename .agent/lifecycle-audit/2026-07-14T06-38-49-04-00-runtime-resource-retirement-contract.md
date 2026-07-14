# Lifecycle Audit: Runtime Resource Retirement Contract

**Timestamp:** `2026-07-14T06-38-49-04-00`

## Plan ledger

**Goal:** establish complete ownership and terminal cleanup for every resource created during route bootstrap.

- [x] Classify callbacks, listeners, observers, subscriptions, DOM/public references, scene objects and GPU resources.
- [x] Identify existing local disposal services.
- [x] Define ordered aggregate retirement.
- [ ] Implement owned registries and failure injection.

## Owned resource classes

```txt
callbacks
  gameplay RAF
  map RAF

listeners
  simulation keydown/keyup/blur
  map keydown
  visual resize
  camera input listeners where installed

observers and subscriptions
  map ResizeObserver
  world-generation subscription
  engine/runtime subscriptions

public and DOM state
  window.GameHost
  canvas aria-busy
  fatal panel
  map open state

scene and GPU resources
  balloon object tree
  airstream visuals/debug
  town visuals
  world, terrain, horizon, vegetation, grass, flowers, water and landmarks
  sky, cloud, lighting and lens resources
  composer, render targets and renderer
```

## Contract

Every startup stage must register acquired ownership before moving to the next stage. Retirement must be idempotent, dependency ordered and terminal. A failed stage must roll back only resources acquired by that generation and must not disturb an accepted predecessor.

## Required receipts

```txt
OwnedResourceManifest
CallbackRetirementReceipt
ListenerRetirementReceipt
ObserverRetirementReceipt
SubscriptionRetirementReceipt
SceneResourceRetirementReceipt
GpuResourceRetirementReceipt
PublicReferenceRetirementReceipt
RouteRuntimeRetirementResult
```

## Acceptance

A route is retired only when no owned callback can commit, every mandatory participant reports terminal cleanup, `window.GameHost` no longer exposes the predecessor as active, and a successor can start without duplicate listeners, observers or GPU ownership.