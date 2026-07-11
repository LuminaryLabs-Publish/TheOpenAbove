# Gameplay Audit: Meadow Lift Guidance Versus Air Mail Runtime

**Timestamp:** `2026-07-11T13-10-35-04-00`

## Documented loop

```txt
start above canopy
  -> pitch, bank and boost
  -> catch three thermals
  -> clear five wind gates
  -> return to sky perch
  -> unlock Cloud Basin
  -> press R to restart
```

## Active runtime loop

```txt
spawn hot-air balloon with parcel-001
  -> burn upward or vent downward
  -> locate visible meadow current
  -> ride route meadow-to-brookhaven
  -> enter Brookhaven delivery volume
  -> deliver parcel
  -> continue flying with no authoritative mission restart
```

## Finding

The documented gameplay loop cannot be used as acceptance proof for the active runtime. Thermals, gate counts, perch completion and Cloud Basin progression are not the active mission objective graph. The documented restart key is also not consumed.

## Required gameplay contract

```txt
ProductManifest
  -> selected mission
  -> ordered objectives
  -> objective admission rules
  -> completion and failure results
  -> declared restart availability
  -> manual smoke sequence
```

## Required assertions

```txt
manual smoke uses only installed controls
manual objectives map to active domain rules
completion condition maps to Air Mail delivery authority
restart step is omitted until ResetMission exists
legacy Meadow Lift remains archived or separately selectable
```
