# Render Audit — Visual Domain Render Readback Gap

**Timestamp:** `2026-07-09T23-51-04-04-00`

## Current render surface

```txt
createVisualDomain
  -> detectQualityTier
  -> WebGLRenderer
  -> PerspectiveCamera
  -> createTerrainSurface
  -> createVegetationClusters
  -> createGrassDetail
  -> createDistantLandmarks
  -> createCloudWeatherMap
  -> createSunLight
  -> createPhysicalSky
  -> createVolumetricClouds
  -> createAerialPerspective
  -> createCloudShadowOverlay
  -> createWaterSurfaces
  -> createLensResponse
  -> createHdrComposer
  -> createDynamicResolutionController
  -> update visual state
  -> composer.render(dt)
  -> renderer.info drawCalls/triangles
```

## Readback already present

`getSnapshot()` includes a compact visual block:

```txt
quality
exposure
averageLuminance
sunFacing
sunOnScreen
renderScale
drawCalls
triangles
```

## Gaps

```txt
No source-owned visual-domain manifest.
No visual kit source fingerprint.
No fixture-readable list of installed visual sub-kits.
No stable render-consumer ledger for terrain, vegetation, grass, clouds, water, sky, post-process, or dynamic resolution.
No GameHost source projection that explains whether the visual stack matches product/campaign/runtime source.
No DOM-free source fixture for visual-domain source/readback parity.
```

## Non-goals

```txt
Do not rewrite renderer.
Do not remove HDR composer or dynamic resolution.
Do not retune terrain, vegetation, grass, water, cloud, sky, or post-process constants.
Do not change the current frame route before source/readback rows exist.
```

## Next proof rows

```txt
visual_domain_declares_subkits
visual_snapshot_reports_quality_and_render_stats
camera_snapshot_reports_mode_zoom_first_person_blend
simulation_snapshot_reports_balloon_drift_source
presentation_snapshot_reports_material_subkits
GameHost_source_links_visual_simulation_camera_presentation
DOM_free_fixture_reads_source_without_canvas_or_webgl
```
