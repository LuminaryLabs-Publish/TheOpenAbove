# Gameplay Audit: Meadow Lift and Air Mail Source Split

**Timestamp:** `2026-07-11T09-21-50-04-00`

## Current declared loop

```txt
start above canopy
  -> catch 3 thermals
  -> clear 5 wind gates
  -> return to perch
  -> unlock Cloud Basin
  -> R restarts mission
```

## Current executable loop

```txt
start hot-air balloon at [0, 105, 0]
  -> Space/W/Up increases burner
  -> S/Down/Shift vents
  -> altitude selects one of three airstreams
  -> drift toward Brookhaven
  -> destination-volume membership delivers parcel
  -> continue drifting indefinitely
```

## Authority mismatch

`CAMPAIGN` and `WORLD` still describe Meadow Lift. `createDefaultMailRoute()` independently defines Air Mail. `src/main.js` imports both, but no schema states whether Air Mail replaces Meadow Lift, is a sub-mission, or is a separate selectable mode.

Consequences:

```txt
no authoritative active objective
no authoritative completion/failure phase
no documented migration from old mode state
no selected-mode version or fingerprint
no guarantee that controls match selected mode
no progression rule connecting Brookhaven delivery to Cloud Basin
no stable save/replay compatibility boundary
```

## Required gameplay decision

Choose and encode exactly one:

```txt
A. Air Mail supersedes Meadow Lift
B. Air Mail is a versioned mission inside Meadow Lift
C. Air Mail and Meadow Lift are separately selectable modes
```

The recommended minimal path is A for the current published runtime. Preserve the old Meadow Lift descriptor as archived source or a future mode, but do not continue projecting it as active session identity.

## Required accepted source result

```txt
{
  status: "accepted",
  productId: "the-open-above",
  modeId: "air-mail",
  missionId: "meadow-mail-run",
  routeId: "meadow-mail-run",
  parcelId: "parcel-001",
  destinationTownId: "brookhaven",
  controlContractId: "balloon-burner-vent-v1",
  supersedes: ["meadow-lift-v0"],
  sourceFingerprint: "..."
}
```

## Gameplay fixtures

```txt
selected mode activates exactly one objective graph
legacy objectives cannot advance an Air Mail run
Air Mail completion produces a typed mission result
controls accepted by runtime equal controls projected to docs/HUD
same source manifest creates the same initial gameplay fingerprint
```
