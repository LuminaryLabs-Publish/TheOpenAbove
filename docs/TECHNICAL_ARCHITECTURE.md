# Technical Architecture

## Current architecture

The first standalone slice uses:

```txt
index.html
  thin semantic host

src/main.js
  Three.js renderer
  flight state
  mission state
  input adapter
  GameHost debug surface

src/data/campaign.config.js
  region, world, and flight tuning
```

This is intentionally small and playable.

## Long-term architecture

The product should move toward:

```txt
src/game/
  session state
  objective resolution
  progression
  save state

src/flight/
  bird controller
  flight model
  input map

src/world/
  terrain
  sky
  wind
  biomes
  points of interest

src/render/
  renderer
  bird mesh
  terrain renderer
  cloud renderer
  effects

src/camera/
  bird follow camera

src/data/
  campaign config
  world config
  flight config
```

## Boundary rule

Renderer presents state.

Flight/game modules own rules.

Data configures behavior.

Input requests actions.

## Debug contract

Every route should expose:

```js
window.GameHost = {
  restart,
  getState
};
```

Current `getState()` returns:

```txt
position
velocity
speed
mission progress
gates
thermals
completion/failure flags
```

## Extraction path

Refactor in this order:

```txt
1. move flight math into src/flight/flight-model.js
2. move objective checks into src/game/objectives.js
3. move terrain/tree generation into src/world/
4. move renderer construction into src/render/renderer.js
5. move camera follow into src/camera/bird-follow-camera.js
6. add save/progression state
7. add tests for objective and flight model logic
```
