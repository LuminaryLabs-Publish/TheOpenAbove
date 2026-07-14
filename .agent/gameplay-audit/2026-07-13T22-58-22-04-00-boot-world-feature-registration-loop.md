# Gameplay Audit: Boot and World Feature Registration Loop

**Timestamp:** `2026-07-13T22-58-22-04-00`

## Summary

The playable loop depends on a successful world-domain composition before terrain, airstream, Air Mail and balloon simulation can start. The latest fix restores that prerequisite, but registration and readiness remain unversioned.

## Plan ledger

**Goal:** document the complete player-facing dependency chain and the points where incomplete composition can prevent or desynchronize play.

- [x] Trace startup into world generation.
- [x] Trace world APIs into terrain and gameplay.
- [x] Identify fatal and partial-adoption paths.
- [x] Define the required terminal results.
- [ ] Execute gameplay boot fixtures.

## Loop

```txt
load page
  -> compose Core World domains
  -> register mountain/landform features
  -> create world and terrain surfaces
  -> load balloon
  -> create airstream routes and field
  -> create Air Mail towns and delivery volumes
  -> create balloon simulation against terrain height
  -> initialize camera and presentation
  -> initial engine tick
  -> start playable RAF

playable RAF
  -> update flight state
  -> sample airstream
  -> update delivery progress
  -> update terrain/world visuals
  -> tick telemetry
  -> render frame
```

## Dependency consequences

```txt
missing World Features API
  -> startup throws before visual creation
  -> fatal panel appears

partial feature registration
  -> terrain and landmarks may not match authored world intent

Foundation/Features revision mismatch
  -> generation and sampling can disagree about landform contributions

stale visual generation
  -> gameplay samples one world while the frame shows another
```

## Required gameplay results

```txt
WorldDomainCompositionResult
FeatureSetRegistrationResult
VisualBootstrapResult
PlayableWorldReadyResult
FirstRegisteredWorldFrameAck
```

`PlayableWorldReadyResult` must not be published until the simulation terrain sampler and visible world share the accepted feature and foundation revisions.

## Validation boundary

No gameplay behavior changed and no browser boot was executed.