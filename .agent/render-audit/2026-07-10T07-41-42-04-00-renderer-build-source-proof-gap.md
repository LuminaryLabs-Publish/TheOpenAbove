# Render Audit: Renderer Build Source Proof Gap

Timestamp: 2026-07-10T07-41-42-04-00
Repo: LuminaryLabs-Publish/TheOpenAbove

## Current render surface

The repo has a visual/render surface through `index.html`, Three.js `0.165.0`, `src/main.js`, `createVisualDomain`, WebGLRenderer, streamed terrain, grass, vegetation, water, sky, sun, volumetric clouds, aerial perspective, HDR composer, neutral color grade, dynamic resolution, and lens response.

## Existing render validation

`tests/smoke.mjs` and `tools/headless-editor-environment.mjs` check renderer/build contracts, including:

```txt
visual-domain route use
neutral exposure
bloom and god rays disabled
neutral color grade
streamed terrain
soft cloud shadows in terrain shader
water explicit fog
headless renderer.validate
headless project.check
headless project.build
```

## Gap

The render validation path proves file contracts and renderer safety, but not source authority.

It does not prove:

```txt
which product source rows are current
which campaign rows are legacy-compatible
which runtime rows consumed source
which visual rows consumed source
which GameHost rows expose source
which headless rows prove source
```

## Required render/readback proof

Add source rows that can be attached to the existing renderer/build checks:

```txt
render_source_current
visual_domain_consumer_current
headless_renderer_consumer_current
smoke_renderer_consumer_current
gamehost_source_readback_current
legacy_visual_copy_compatible
```

## Main finding

Do not extract or rewrite the renderer next. Extend the existing smoke/headless render validation path so it also proves source/readback rows.

## Next safe ledge

```txt
TheOpenAbove Source Readback Ledger Catch-up + Headless Fixture Gate
```
