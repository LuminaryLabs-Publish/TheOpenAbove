# Deploy Audit: Atmosphere Altitude-Sweep Fixture Gate

## Summary

The new reference cannot be validated by static source checks alone. A deploy gate must compare accepted layer descriptors, visible frames and GPU cost across source, built artifact and deployed Pages.

## Plan ledger

**Goal:** define a bounded browser matrix that proves persistent sparse atmosphere coverage without accepting stale assets or uncontrolled performance cost.

- [x] Identify required source and browser evidence.
- [x] Define altitude, location, weather and quality rows.
- [x] Define artifact and Pages parity requirements.
- [ ] Implement and run the fixture matrix.

## Required preconditions

```txt
accepted AtmosphereLayerManifest
resolved module classifications
provider capability result
stable product and Nexus Engine revisions
layer and composite snapshots
reference content digest
```

## Browser matrix

| Axis | Required rows |
|---|---|
| Altitude | ground clearance, 25 m, 100 m, 360 m, 660 m, 960 m, 1500 m, 3000 m |
| Location | valley, ridge, water-adjacent, open plain, town route |
| Weather | minimum sparse floor, ordinary, dense |
| Quality | low, medium, high |
| Route | boot, steady flight, map open/close, delivery approach |
| Lifecycle | resize, hidden/resume, context restore where supported |

## Assertions

```txt
every admitted layer has a stable descriptor
minimum sparse coverage never silently becomes an empty manifest
inactive layers are explicitly classified
camera altitude selects the expected layer set
terrain/moisture dependencies resolve or return an explicit fallback
cloud and HDR composites preserve frame identity
GPU time and draw cost remain within declared tier budgets
FirstReferenceBoundAtmosphereFrameAck cites the accepted manifest
```

## Publication parity

```txt
source module graph
  == built artifact module graph
  == deployed Pages module graph

reference digest
  == manifest reference digest

layer descriptor snapshot
  == browser frame acknowledgement
```

## Failure classes

- Missing reference asset or digest mismatch.
- Unsupported provider feature family treated as implemented.
- Layer descriptor admitted without a renderer owner.
- Empty or stale layer set after deployment.
- Source/artifact/Pages manifest mismatch.
- GPU budget exceeded without a quality fallback.
- First visible frame cites an older manifest.

## Validation boundary

No browser, build, artifact or Pages row was run during this documentation audit.