# Interaction Audit: Resize Source to Surface Result Map

**Timestamp:** `2026-07-12T05:11:46-04:00`

## Ingress sources

```txt
startup resize
browser window resize
browser zoom or DPR change observed through resize
dynamic-resolution degradation
dynamic-resolution recovery
manual public owner call through current GameHost exposure
future context recovery
```

## Current behavior

```txt
startup/browser resize
  -> visual.resize
  -> resolution.resize
  -> hdrComposer.resize

dynamic quality
  -> resolution.sample
  -> resolution.resize only
```

The two sources do not share one complete result path.

## Required map

```txt
source observation
  -> ResizeCommand
  -> session and expected-revision admission
  -> resize-generation allocation
  -> bounded physical-size plan
  -> color/depth preparation
  -> completeness result
  -> stale-generation rejection
  -> atomic commit or rollback
  -> resource-retirement result
  -> visible-frame acknowledgement
```

## Typed outcomes

```txt
committed
unchanged
superseded
rejected-invalid-size
rejected-stale-session
rejected-stale-revision
rejected-capability
fallback-committed
allocation-failed-rolled-back
framebuffer-incomplete-rolled-back
retirement-partial-failure
```
