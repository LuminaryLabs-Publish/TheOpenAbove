# Source Authority Audit: Product Mode Manifest Contract

**Timestamp:** `2026-07-11T09-21-50-04-00`

## Problem

The repository has no immutable source that answers: what game mode is running, which source it supersedes, which controls are valid, which objective is authoritative and which public copy should describe it.

## Required manifest

```json
{
  "schemaVersion": 1,
  "productId": "the-open-above",
  "productVersion": "0.3.0",
  "selectedMode": {
    "id": "air-mail",
    "version": 1,
    "missionId": "meadow-mail-run",
    "supersedes": ["meadow-lift-v0"]
  },
  "sources": {
    "world": "open-above-world-v1",
    "airstreams": "open-above-airstream-routes-v1",
    "mail": "open-above-mail-route-v1",
    "controls": "balloon-burner-vent-v1"
  },
  "entry": {
    "parcelId": "parcel-001",
    "destinationTownId": "brookhaven",
    "correctAirstreamId": "meadow-to-brookhaven"
  }
}
```

## Admission result

```txt
accepted
  -> immutable selected source
  -> source fingerprint
  -> control contract fingerprint
  -> initial state fingerprint
  -> projection revision

rejected
  -> stable reason code
  -> missing or conflicting source IDs
  -> unsupported supersession edge
  -> no runtime construction
```

## Supersession policy

The old Meadow Lift source must be explicitly:

```txt
archived
migrated
or separately selectable
```

Silently importing it and using its region label inside an Air Mail session is not an acceptable policy.

## Consumer contract

The accepted source identity must be consumed by:

```txt
runtime composer
balloon simulation
mail domain
airstream domain
mission/reset authority
HUD
telemetry
GameHost
headless editor
save/replay envelope
README and AGENTS projections
build fixtures
```

## Proof requirements

```txt
manifest validates without runtime construction
source fingerprint is stable for identical content
conflicting active modes are rejected
legacy Meadow Lift objectives are inactive in Air Mail mode
HUD and public controls contain no independent literals
all runtime/readback surfaces report the same selected mode and fingerprint
```
