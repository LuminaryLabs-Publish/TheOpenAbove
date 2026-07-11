# Render Audit: Orphan Compatibility Scene Traversal Gap

**Timestamp:** `2026-07-11T19-28-28-04-00`

## Finding

The active Air Mail renderer has one intended RAF in `src/main.js`. Importing `src/hot-air-balloon-object-kit.js` creates another RAF chain that traverses the full scene every frame looking for a legacy object with `leftWing`, `rightWing` and `tail` markers.

The current Air Mail balloon is built directly and does not use that legacy marker contract. The compatibility loop therefore performs recurring scene traversal without producing a current-product render mutation.

## Current frame paths

```txt
active frame
  -> simulation
  -> delivery
  -> airstream visual update
  -> active balloon animation
  -> camera/environment
  -> render
  -> HUD

compatibility frame
  -> scene.traverse(find legacy vehicle)
  -> no target in current Air Mail composition
  -> animate no object
  -> schedule another frame
```

## Render risks

```txt
unbounded extra scene traversal
independent frame cadence
no frame ID or owner ID
no render-session generation fence
no disposal handle
no startup-failure retirement
possible legacy child removal and duplicate balloon installation when a target exists
no correlation with the submitted Air Mail frame
```

## Required render contract

```txt
compatibility target discovery is one-shot
no target means no recurring frame work
installed compatibility animation consumes the active render frame time
or registers a typed optional loop owned by the same runtime session
all presentation mutations carry runtimeGeneration and frameId
render disposal retires compatibility work before scene disposal
```

## Validation gate

A browser fixture must instrument `requestAnimationFrame` and `scene.traverse` to prove current Air Mail startup has one required frame chain and zero compatibility traversals after a no-target result.