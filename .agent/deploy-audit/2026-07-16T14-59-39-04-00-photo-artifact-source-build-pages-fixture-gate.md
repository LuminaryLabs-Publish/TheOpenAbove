# Deploy Audit: Photo Artifact Source, Build and Pages Fixture Gate

## Summary

The sightseeing feature needs executable proof across source modules, the Vite artifact and the deployed Pages origin. Static source assertions alone cannot prove that browser canvas capture, encoding, object URLs or journal projection work under the deployed origin.

## Required fixture matrix

| Fixture | Required result |
|---|---|
| source contract | semantic domains, capture authority and journal projection modules exist and import |
| recognized capture | exact bitmap produced with stable ID, dimensions, digest and recognized result |
| unidentified capture | artifact policy settles explicitly without false completion |
| camera revision | stale request rejected after FOV/zoom/mode change |
| world/weather revision | capture binds matching generation or rejects drift |
| resize/render scale | no mixed-size or mixed-generation artifact |
| map-open policy | request rejected or deferred through a typed result |
| renderer loss | inflight capture fails/recovers without hanging |
| object URL lifecycle | URL loads, then is revoked after retirement |
| storage quota | bounded failure result; no partial completion |
| journal projection | actual artifact appears with matching capture ID |
| source/build parity | built module graph preserves behavior |
| Pages-origin parity | deployed origin permits capture, encoding and journal display |

## Build binding

```txt
source revision
  -> accepted validation result
  -> Vite artifact digest
  -> deployed Pages revision
  -> browser capture result
  -> photo artifact digest
  -> journal frame acknowledgement
```

## Browser requirements

- Test at DPR 1 and high DPR.
- Test supported desktop Chromium, Firefox and WebKit paths.
- Verify canvas origin-clean state.
- Verify image encoding does not block the flight loop excessively.
- Verify object URL and IndexedDB behavior under Pages origin.
- Verify reload/route retirement behavior.

## Current state

```txt
npm run check: not run by this audit
npm run build: not run by this audit
browser capture fixture: absent
artifact downloaded: no
Pages origin fetched: no
source/build/Pages parity: unproven
```

## Release gate

Do not claim shipped photo capture until the recognized-capture, artifact lifecycle, journal projection and Pages-origin fixtures pass against one exact release identity.