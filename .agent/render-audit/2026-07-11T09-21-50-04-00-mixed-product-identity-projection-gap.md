# Render Audit: Mixed Product Identity Projection Gap

**Timestamp:** `2026-07-11T09-21-50-04-00`

## Goal

Ensure the rendered frame, HUD, telemetry and GameHost identify the same selected product mode and source revision.

## Current projection order

```txt
simulation and mail mutate
  -> camera and visual domains update
  -> telemetry snapshots
  -> renderer submits
  -> HUD builds HTML from live state and hard-coded strings
```

## Mixed identity evidence

The runtime snapshot receives:

```txt
region: CAMPAIGN.regions[0].id -> meadow-lift
status: simulation.snapshot() -> mail-flight
objectType: hot-air-balloon
mail.routeId: meadow-mail-run
mail.destinationTownId: brookhaven
```

The HUD independently hard-codes:

```txt
Delivered to Brookhaven
Mail: Brookhaven · Find meadow current
```

The public README and AGENTS guidance describe thermals, gates, return-to-perch and bird-style flight controls instead of the displayed Air Mail loop.

## Failure modes

```txt
telemetry says meadow-lift while gameplay is Air Mail
HUD destination can drift from route source
future parcel or town changes require editing runtime presentation code
headless status cannot prove which product mode was admitted
screenshots cannot be correlated to a product/source fingerprint
public documentation can describe controls the frame does not accept
```

## Required committed projection

```txt
CommittedProductFrame
  productId
  productVersion
  modeId
  modeVersion
  objectiveId
  routeId
  parcelId
  destinationTownId
  controlContractRevision
  sourceFingerprint
  simulationTickId
  renderFrameId
  renderResult
  hudProjection
```

## Renderer rule

Renderer and HUD code may consume the committed product frame. They must not select product mode, infer supersession or contain authoritative route/destination literals.

## Fixture gate

```txt
select Air Mail manifest
  -> build one frame
  -> assert frame mode is air-mail
  -> assert legacy meadow-lift objectives are inactive
  -> assert HUD destination equals manifest destination
  -> assert GameHost and telemetry source fingerprints match
  -> assert public control projection matches runtime command bindings
```
