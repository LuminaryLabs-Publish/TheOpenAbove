# The Open Above Agent Notes

This folder stores repo-local agent findings for `LuminaryLabs-Publish/TheOpenAbove`.

## Latest tracker

```txt
.agent/trackers/2026-07-07T04-08-29-04-00/project-breakdown.md
```

## Latest kit registry

```txt
.agent/kit-registry.json
```

## Tracker history

```txt
.agent/trackers/2026-07-07T03-00-32-04-00/project-breakdown.md
.agent/trackers/2026-07-07T04-08-29-04-00/project-breakdown.md
```

## Current repo read

`TheOpenAbove` is currently a standalone Vite/Three.js publish repo for a cozy hot-air-balloon wind-drift experience. The live runtime has moved beyond the older bird/free-flight language: it now runs a balloon vehicle loop with burner/vent input, procedural valley terrain, lakes, trees, clouds, wind ribbons, a basket-follow camera, a balloon object kit, and a Nexus Engine telemetry DSK.

The public README, design docs, and `src/data/campaign.config.js` still contain bird/free-flight milestone language. Treat that as stale product language until the repo either restores the bird controller or formally reframes the product around balloon drift.

## Active agent rules

- Work on only one publish repo per run.
- Do not work on `LuminaryLabs-Publish/TheCavalryOfRome`.
- Keep findings in root `.agent`.
- Create a timestamped tracker entry for each run.
- Push directly to `main` when the workflow permits it.
- Mirror the central tracking note into `LuminaryLabs-Dev/LuminaryLabs`.

## Current kit inventory

```txt
open-above-balloon-telemetry-kit
open-above-hot-air-balloon-object-kit
open-above-hot-air-balloon-envelope-kit
open-above-hot-air-balloon-basket-kit
open-above-hot-air-balloon-rigging-kit
open-above-hot-air-balloon-burner-kit
open-above-rope-kit
```

## Immediate next product direction

Commit to `TheOpenAbove Balloon Drift Mission Cutover`:

```txt
boot scene
  -> load BALLOON_DRIFT config
  -> install input, drift physics, wind field, terrain sampler, objective, camera, HUD, telemetry, and GameHost kits
  -> spawn three buoyancy gates along a wind-lane path
  -> detect altitude-band entry and gate pass-through
  -> detect return / landing zone
  -> write meadow-lift-complete and cloud-basin-unlocked to local state
  -> expose mission status through GameHost
  -> add behavior smoke for burner lift, vent descent, wind drift, ground clamp, gate completion, and unlock
```
