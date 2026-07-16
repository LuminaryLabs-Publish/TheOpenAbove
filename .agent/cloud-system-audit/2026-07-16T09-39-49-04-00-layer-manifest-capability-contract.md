# Cloud System Audit: Layer Manifest and Capability Contract

## Summary

The current cloud system is a coherent single-layer renderer. The new reference expands the target into a layered atmosphere, but no capability contract describes how existing kits, embedded passes and future Core World features compose.

## Plan ledger

**Goal:** preserve the current cloud renderer while defining a manifest that can add layers without duplicate weather, fog, world-feature or GPU ownership.

- [x] Identify current cloud and fog owners.
- [x] Classify existing, embedded and missing capabilities.
- [x] Define the minimum layer descriptor.
- [x] Define provider and renderer boundaries.
- [ ] Implement and validate manifest admission.

## Current capabilities

```txt
weather field:
  one coverage value
  one density value
  one erosion value
  one wind vector and offset

volumetric renderer:
  one shell
  base 360
  top 960
  one raymarch profile
  one lighting profile
  one low-resolution target
  one embedded composite

aerial perspective:
  one global FogExp2 field
  altitude-based clearing
  cloud-coverage density boost

Core World:
  foundation and semantic feature infrastructure
  landform family only in current installed catalog
```

## Required layer descriptor

```txt
AtmosphereLayerDescriptor
  id
  kind: fog | cumulus | high-cloud | cirrus
  baseAltitude
  topAltitude
  densityFloor
  coverageRange
  densityRange
  erosionProfile
  windScale
  worldQueryDependencies
  rendererMode
  qualityPolicy
  compositePolicy
  gameplayMeaning: none | visibility | wind | route
```

## Initial reference mapping

```txt
ground-fog
  kind: fog
  rendererMode: aerial/local volume
  dependencies: terrain height, moisture, water proximity

low-mid-cumulus
  kind: cumulus
  rendererMode: volumetric raymarch
  dependencies: weather field and wind

high-cloud
  kind: high-cloud
  rendererMode: thin volumetric or projected layer
  dependencies: weather field and altitude

cirrus
  kind: cirrus
  rendererMode: procedural projected layer
  dependencies: high-altitude wind
```

These are target classifications, not implemented runtime descriptors.

## Ownership rules

- Weather state is produced once and may expose layer channels.
- Each layer has one render owner and one composite policy.
- The composite pass may remain embedded, but the manifest must identify that ownership.
- Aerial perspective remains global unless a local fog-volume kit is explicitly admitted.
- Core World atmosphere features provide semantic placement and queries, not Three.js objects.
- Terrain moisture and water proximity enter through world sampling interfaces.
- Sparse floors are bounded policy values, not unconditional shader opacity.
- Every adopted layer must publish disposal and quality behavior.

## Capability result

```txt
implemented:
  cloud-weather-map
  volumetric-cloud single layer
  embedded cloud composite
  aerial perspective
  cloud LOD
  cloud lighting

planned:
  atmosphere-layer controller
  ground fog profile
  high cloud profile
  cirrus profile
  sparse density floors
  terrain/moisture bridge
  Core World atmosphere family bridge

unsupported today:
  cloud-layer feature type
  cloud-bank feature type
  fog-bank feature type
  visibility-zone feature type
```

## Validation boundary

No layer descriptor, atmosphere feature, shader, render pass or world query was implemented.