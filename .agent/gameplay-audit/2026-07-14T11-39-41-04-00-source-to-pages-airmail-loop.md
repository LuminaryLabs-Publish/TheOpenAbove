# Gameplay Audit: Source-to-Pages Air Mail Loop

**Timestamp:** `2026-07-14T11-39-41-04-00`

## Plan ledger

**Goal:** preserve the Air Mail interaction loop while making the public deployment cite the exact source and artifact that produced it.

- [x] Record the complete build-to-gameplay path.
- [x] Preserve gameplay domain ownership.
- [x] Identify the deployment admission gap.
- [ ] Prove the public loop from immutable source to first playable frame.

## Complete loop

```txt
push main
  -> workflow starts
  -> product and NexusEngine are checked out from mutable main
  -> headless checks and production build run
  -> dist is uploaded and deployed
  -> page_url is exposed

player opens page_url
  -> product route boots
  -> Core World domains compose
  -> authored landforms register
  -> WebGL world and balloon load
  -> airstream and Air Mail domains start
  -> keyboard and map interaction become available
  -> gameplay frame loop advances
  -> player steers through airstreams and delivers the parcel
```

## Gameplay truth boundary

The gameplay source remains unchanged by the URL-publication commit. The new workflow line does not prove that the deployed site contains the reviewed gameplay revision or that the public loop reaches an interactive frame.

## Required admission

The deployed run must cite:

```txt
ProductRevision
NexusEngineRevision
ArtifactManifestHash
DeploymentId
PageUrl
GameHostGeneration
FirstDeployedAirMailFrameAck
```

## Do not infer

A clickable environment link must not be interpreted as proof that controls, simulation, Core World composition, Air Mail progress, rendering or map interaction are functional on the deployed origin.
