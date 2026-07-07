# The Open Above Agent Notes

This folder stores repo-local agent findings for `LuminaryLabs-Publish/TheOpenAbove`.

## Latest tracker

```txt
.agent/trackers/2026-07-07T03-00-32-04-00/project-breakdown.md
```

## Current repo read

`TheOpenAbove` is currently a standalone Vite/Three.js publish repo for a cozy hot-air-balloon wind-drift experience. The source still carries older bird/free-flight product language in the docs and config, but the playable runtime has moved to a balloon vehicle loop with burner/vent input, procedural valley terrain, lakes, trees, clouds, wind ribbons, a balloon object kit, and a Nexus Engine telemetry DSK.

## Active agent rules

- Work on only one publish repo per run.
- Do not work on `LuminaryLabs-Publish/TheCavalryOfRome`.
- Keep findings in root `.agent`.
- Create a timestamped tracker entry for each run.
- Push directly to `main` when the workflow permits it.
- Mirror the central tracking note into `LuminaryLabs-Dev/LuminaryLabs`.

## Immediate next product direction

The repo needs a decision pass: either return the product to bird free-flight or formally reframe the milestone as `Balloon Drift`. Given the live runtime and object kits, the fastest high-value route is to accept the balloon direction and extract the runtime into formal domain kits: balloon-drift physics, wind field, world generation, mission objectives, camera, telemetry, and object visual kits.
