# Deploy Audit: Cloud Depth Composite Browser Fixture Gate

**Timestamp:** `2026-07-15T02-09-29-04-00`

## Summary

Source confirms a low-resolution cloud target and a color-only far-depth composite. No executable source, build, or deployed-origin fixture currently proves target sizing, relative-depth occlusion, edge reconstruction, resource retirement, GPU cost, or visible-frame correlation.

## Plan ledger

**Goal:** require the same cloud-depth contract on local source, production build, and GitHub Pages before declaring the implementation complete.

- [x] Define source-backed expectations.
- [x] Define browser, GPU, lifecycle, and parity rows.
- [ ] Implement and execute all rows.

## Required fixtures

| Fixture | Required evidence |
|---|---|
| profile scale | exact 0.50 / 0.42 / 0.32 target dimensions from drawing buffer |
| main-scene isolation | cloud scale changes without changing accepted main-scene scale |
| cloud before mountain | cloud remains visible where cloud depth is nearer |
| cloud behind mountain | mountain correctly occludes cloud |
| balloon silhouette | no halo or color bleed across envelope and rope edges |
| terrain edge | no low-resolution spill across ridges and canyon silhouettes |
| camera motion | stable reconstruction or explicit history-disabled result |
| resize and DPR | old target generation retired and new generation adopted |
| quality transition | target and sample budgets change under one result |
| context recovery | stale resources rejected and replacement acknowledged |
| color-only fallback | explicit fallback status and telemetry |
| terrain shadow policy | procedural/cached/disabled receipt cites matching weather revision |
| GPU timing | per-pass timing captured without inventing a fixed threshold |
| first visible frame | `CloudFrameResult` and `FirstVisibleCloudFrameAck` correlate |
| parity | source, `dist`, artifact, and Pages expose the same result contract |

## Current evidence

```txt
source inspected: yes
runtime commits inspected: yes
combined statuses returned: 0
npm/check/build: not run
browser launched: no
GPU capture: no
pixel/depth probe: no
artifact downloaded: no
Pages URL fetched: no
```

## Gate

Do not claim correct depth-aware upscaling, visual equivalence, measured performance improvement, target retirement, artifact parity, or production readiness until all mandatory rows pass on `main`.