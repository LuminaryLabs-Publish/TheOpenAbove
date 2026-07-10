# Render Audit: Renderer Source Consumption Readback Gap

**Timestamp:** `2026-07-10T08-59-04-04-00`

## Render surface

The repo has a browser visual/render surface:

```txt
index.html canvas#game
  -> src/main.js
  -> createVisualDomain
  -> WebGLRenderer
  -> terrain/vegetation/grass/water/sky/cloud/sun/composer kits
  -> visual.render(dt, frameMs)
  -> HUD text projection
```

## Current render proof

The current smoke/headless checks are useful and should remain.

They prove renderer contract facts such as:

```txt
required route/render files exist
importmap route exists
main route uses visual.render()
neutral exposure/color grade
streamed terrain
water explicit fog
no shared-depth regression
headless renderer.validate exists
```

## Gap

Renderer checks do not yet prove source-consumption rows.

Missing rows:

```txt
renderer_consumed_current_world_config
renderer_consumed_current_route_profile
renderer_classified_legacy_flight_fields
renderer_consumed_visual_domain_config
renderer_reported_source_fingerprint
renderer_reported_source_snapshot_version
gamehost_reported_render_source_readback
headless_reported_source_rows
```

## Next safe render ledge

Do not extract or rewrite the renderer next.

Add source-consumption readback rows and surface them through headless checks plus additive `GameHost.source`.
