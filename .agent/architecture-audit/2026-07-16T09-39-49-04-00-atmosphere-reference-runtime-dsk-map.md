# Architecture Audit: Atmosphere Reference-to-Runtime DSK Map

## Summary

The new reference asset spans the Visual domain, world configuration and a proposed Core World atmosphere feature family. Current ownership is split between existing cloud/fog kits and landform-only Core World composition; no atmosphere-layer parent authority connects them.

## Plan ledger

**Goal:** map every reference requirement to its current owner and define the smallest authority needed to close the traceability gap.

- [x] Map existing visual and Core World surfaces.
- [x] Classify reference module names.
- [x] Identify missing domain and service boundaries.
- [x] Preserve existing cloud, fog and world owners.
- [ ] Add a manifest-driven adoption boundary before adding new runtime layers.

## Current DSK/domain map

```txt
open-above-visual-domain
  -> open-above-cloud-weather-map-kit
       services: coverage, density, wind, offset, update
  -> open-above-volumetric-cloud-kit
       services: one cloud shell, raymarch, private render target,
                 embedded composite pass, resize, update, render, dispose
  -> open-above-cloud-lod-kit
       services: render scale, sample budgets, max distance
  -> open-above-cloud-lighting-kit
       services: sun color and sky fill
  -> open-above-aerial-perspective-kit
       services: global FogExp2, altitude clearing, weather boost
  -> open-above-hdr-composer-kit
       services: HDR scene pass and final presentation

open-above-campaign-source-kit
  -> WORLD.features.landforms
       services: one mountain descriptor
  -> no WORLD.features.atmosphere

open-above-balloon-telemetry-kit
  -> n-world-domain
  -> n-world-foundation-domain
  -> n-world-feature-domain
  -> n-world-landform-feature-domain
  -> registers WORLD.features.landforms only
```

## Reference classification

| Reference name | Current classification | Current owner |
|---|---|---|
| `cloud-weather-map-kit` | implemented | `open-above-cloud-weather-map-kit` |
| `volumetric-cloud-kit` | implemented | `open-above-volumetric-cloud-kit` |
| `cloud-composite-pass` | embedded, not an independent kit | `open-above-volumetric-cloud-kit` |
| `aerial-perspective-kit` | implemented | `open-above-aerial-perspective-kit` |
| `atmosphere-layer-controller` | planned only | none |
| `cloud-layer` | unsupported as a Core World feature type | none |
| `cloud-bank` | unsupported as a Core World feature type | none |
| `fog-bank` | unsupported as a Core World feature type | none |
| `visibility-zone` | unsupported as a Core World feature type | none |
| `wind-corridor` | conceptually adjacent to airstreams, not an atmosphere feature | `open-above-airstream-domain` |

## Required parent domain

`open-above-atmosphere-reference-layer-runtime-traceability-authority-domain`

```txt
reference asset revision
  -> AtmosphereLayerManifest
  -> module and provider capability classification
  -> four layer profiles
  -> terrain/moisture/wind dependency descriptors
  -> adoption result
  -> matching runtime/world generations
  -> first reference-bound atmosphere frame acknowledgement
```

## Ownership constraints

- The reference asset must remain design evidence, not executable state.
- Cloud weather remains the weather-field owner unless explicitly replaced.
- Volumetric cloud rendering remains the GPU owner for raymarched layers.
- Aerial perspective remains the global-distance haze owner.
- Core World features may provide semantic atmosphere descriptors, but must not directly own Three.js resources.
- Terrain and moisture sampling must be consumed through stable world queries.
- A new controller must orchestrate existing owners instead of duplicating them.

## Planned surfaces

The complete 20-surface plan is recorded in the tracker. The critical dependency order is:

```txt
reference revision
  -> manifest and module classification
  -> layer profiles and sparse floors
  -> terrain/moisture/provider capability bridges
  -> renderer scheduling and composite contract
  -> adoption result
  -> altitude-sweep fixture
  -> first matching frame acknowledgement
```

## Validation boundary

Source inspection only. No DSK, provider, world feature, shader or composition code changed.