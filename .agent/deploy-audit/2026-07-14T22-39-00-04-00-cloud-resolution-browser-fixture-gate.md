# Deploy Audit: Cloud Resolution Browser Fixture Gate

**Timestamp:** `2026-07-14T22-39-00-04-00`

## Plan ledger

**Goal:** prove source, built artifact and Pages execute the same cloud profile and visible composite.

- [x] Define source-derived assertions.
- [x] Define browser instrumentation requirements.
- [x] Define artifact parity requirements.
- [ ] Execute the fixture matrix.

## Required fixture matrix

```txt
high/medium/low profile -> exact target dimensions and sample budgets
renderScale 0.50/0.42/0.32 -> cloud-only target changes, main scene target unchanged
cloud target + scene depth -> edge-preserving upscale at terrain and balloon silhouettes
camera motion -> history accepted or reset deterministically
coverage zero -> early skip or bounded minimal path
full/reduced/impostor/disabled -> explicit result classification
terrain shadow policy -> procedural/cached/disabled receipt
resize and DPR change -> old targets retired, new generation admitted
source, built artifact and Pages -> matching CloudFrameResult and visible frame
```

## Required browser readback

```txt
product revision
NexusEngine revision
renderer generation
quality tier and profile revision
viewport, DPR and dynamic whole-scene scale
cloud scale and target dimensions
view/light sample budget
history generation/reset reason
terrain shadow policy
CloudFrameResultId
frame id and image hash
```

## Gate

Do not mark the optimization complete until local source, built `dist` and the deployed Pages origin report matching identities and materially matching frames for each admitted profile.
