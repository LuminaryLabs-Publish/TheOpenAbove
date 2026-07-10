# Render Audit: Renderer Source Result Readback Gap

Timestamp: `2026-07-10T13-21-23-04-00`

## Render surface exists

The route has a visual surface through:

```txt
canvas#game
  -> createVisualDomain
  -> WebGLRenderer
  -> terrain, vegetation, grass, water, sky, sun, clouds, aerial perspective, lens response, HDR composer
  -> visual.render(dt, frameMs)
```

## Existing render proof

`tests/smoke.mjs` and `tools/headless-editor-environment.mjs` already assert renderer/build contracts such as required files, neutral exposure, disabled bloom/god rays, streamed terrain, soft terrain cloud shadow, and water fog behavior.

## Gap

Render checks are not tied to source result rows.

Missing rows:

```txt
visual_domain_source_current
terrain_consumer_source_current
cloud_consumer_source_current
water_consumer_source_current
post_consumer_source_current
renderer_contract_source_fingerprint
renderer_contract_acceptance_rows
renderer_contract_headless_rows
```

## Why visual work should wait

The route is visually useful already. Changing visuals before source-result readback would make renderer, terrain, cloud, water, and post-process regressions harder to attribute to source rows.

## Next proof

Add source consumer rows that identify render consumers and expose those rows through both `GameHost.getState().source` and the headless editor `project.check` path.
