# Deploy Audit: HDR Depth Size Browser Fixture Gate

**Timestamp:** `2026-07-15T07-39-52-04-00`

## Summary

Source inspection establishes independent color and depth sizing rules, but deployment confidence requires an executable browser matrix across DPR, quality, dynamic scale, resize, orientation, context recovery, production build, artifact, and Pages.

## Plan ledger

**Goal:** define the minimum proof gate before claiming coherent HDR attachments or deployed parity.

- [x] Identify available package checks and build commands.
- [x] Identify missing browser and GPU fixtures.
- [x] Define source-to-Pages parity requirements.
- [ ] Implement and execute the gate.

## Existing commands

```txt
npm run check
npm run build
npm run headless:renderer
npm run headless:world
npm run headless:check
npm run headless:build
```

None currently proves exact composer color/depth attachment dimensions under dynamic resolution.

## Required source fixture

```txt
create renderer and HDR composer in a controlled browser
set viewport DPR tier and dynamic scale
invoke boot resize and dynamic-scale transitions
read both composer target dimensions
read both depth texture image dimensions
assert exact equality with accepted physical dimensions
assert both framebuffers complete
assert pass sizes match
assert RenderSurfaceResizeResult contents
```

## Browser matrix

```txt
viewport: 1280x720 1920x1080 720x1280
DPR: 1 1.25 1.5 1.6 2
quality: high medium low
dynamic scale: tier default each decrement floor 0.62 recovery
transition: boot resize orientation DPR quality context loss/recovery
map: open and closed
clouds: enabled at high medium low LOD scales
```

## Required visible proof

```txt
render known near and far depth geometry
capture accepted RenderSurfaceGeneration
render one frame
confirm depth test and color output are stable
publish FirstHdrResizeFrameAck
correlate cloud target and gameplay presentation revisions
```

## Artifact and Pages gate

```txt
source fixture passes
  -> npm run check
  -> npm run build
  -> inspect dist imports and provider stamp
  -> run fixture against dist
  -> download workflow artifact
  -> run fixture against artifact
  -> fetch deployed Pages origin
  -> run the same descriptor and frame checks
  -> compare generation schema dimensions and results
```

## Failure policy

```txt
any target dimension mismatch -> fail
any incomplete framebuffer -> fail
missing result or frame acknowledgement -> fail
stale predecessor frame -> fail
source/dist/artifact/Pages descriptor mismatch -> fail
```

## Validation boundary

No source, browser, GPU, build, artifact, or Pages fixture was executed during this documentation pass.