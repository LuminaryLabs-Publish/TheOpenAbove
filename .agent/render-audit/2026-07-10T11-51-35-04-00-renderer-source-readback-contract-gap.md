# Render audit: renderer source readback contract gap

Timestamp: `2026-07-10T11-51-35-04-00`

## Current render surface

`TheOpenAbove` has an active visual/render surface through `createVisualDomain()`.

```txt
visual-domain
  -> WebGLRenderer
  -> scene/camera
  -> terrain surface + terrain chunk streaming
  -> vegetation clusters + grass detail
  -> water surfaces
  -> physical sky + sun light + aerial perspective
  -> cloud weather map + volumetric clouds
  -> HDR composer + neutral color grade + lens response
  -> dynamic resolution + quality tier
```

## What is already useful

```txt
tests/smoke.mjs checks route file presence
smoke checks importmap and src/main.js route
smoke checks visual-domain ownership
smoke checks neutral lighting and disabled bloom/god rays/auto exposure
smoke checks streamed terrain and soft cloud shadow shader factor
smoke checks water explicit fog
headless renderer.validate checks renderer/build contracts
```

## Gap

Renderer proof is still source-file/static-contract oriented.

It does not prove source authority rows such as:

```txt
which source rows fed visual-domain
which visual config was accepted
which visual config was legacy-compatible
which renderer consumers ignored source rows
which GameHost readback rows summarize render source state
which headless fixture rows prove render source state without browser rendering
```

## Not next

```txt
renderer extraction
terrain extraction
visual-domain rewrite
new cloud visuals
camera retune
balloon visual retune
```

## Required next render proof

```txt
open-above-source-consumer-ledger-kit
open-above-render-source-consumer-row
open-above-render-readback-row
open-above-headless-source-fixture-kit
```
