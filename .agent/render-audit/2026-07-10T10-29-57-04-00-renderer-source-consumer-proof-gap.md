# Render Audit: Renderer Source Consumer Proof Gap

Timestamp: 2026-07-10T10-29-57-04-00
Repo: LuminaryLabs-Publish/TheOpenAbove

## Render surface

`TheOpenAbove` has a visual surface through `index.html`, `src/main.js`, `createVisualDomain`, Three.js, terrain, vegetation, grass, water, sky, clouds, composer, and HUD.

## Current render path

```txt
CAMPAIGN/WORLD config
  -> src/main.js
  -> createVisualDomain
  -> renderer / scene / camera
  -> terrain / vegetation / grass / water / sky / sun / clouds
  -> composer / quality policy / render stats
  -> visual.update(...)
  -> visual.render(...)
  -> HUD and GameHost local snapshot
```

## Gap

The renderer path is reachable and smoke-tested, but there is no source consumer ledger proving which product, campaign, runtime, visual, smoke, headless, HUD, telemetry, and GameHost rows were consumed or treated as legacy-compatible.

## Required next render/source rows

```txt
visual_domain_consumer_current
renderer_contract_current
terrain_consumer_current
cloud_consumer_current
water_consumer_current
hud_consumer_current
smoke_contract_current
headless_renderer_contract_current
gamehost_source_readback_missing
```

## Not next

- renderer extraction
- visual-domain rewrite
- terrain extraction
- balloon visual changes
- cloud visual retune
- simulation constant retune

## Next render-safe ledge

```txt
Renderer source consumer ledger + GameHost .source readback
```
