# HDR Surface Audit: Attachment Identity, Lifecycle and Commit Contract

**Timestamp:** `2026-07-12T05:11:46-04:00`

## Current attachment lifecycle

```txt
create target
  -> assign initial depth texture

create EffectComposer
  -> adopt target as renderTarget1
  -> clone renderTarget2

install independent depth textures
  -> replace renderTarget1 depth texture
  -> replace renderTarget2 depth texture
  -> retain only the two replacements in depthTextures[]

dispose
  -> dispose two replacements
  -> dispose target
  -> dispose composer
```

The initial attachment has no explicit identity, replacement record, lease transfer or retirement receipt.

## Required resource model

```txt
RenderTargetLease
  targetId
  surfaceRevision
  role: composer-read | composer-write
  colorResourceId
  depthAttachmentId
  physicalWidth
  physicalHeight
  sampleCount
  state: preparing | committed | retiring | retired

DepthAttachmentLease
  attachmentId
  ownerTargetId
  format
  physicalWidth
  physicalHeight
  generation
  state
```

## Commit rules

```txt
one admitted surface plan owns renderer, composer color targets and depth attachments
physical color and depth dimensions match for every committed target
CSS dimensions, DPR, dynamic scale and physical dimensions remain distinct observations
browser resize and dynamic-scale transitions use the same transaction
only the latest resize generation can commit
attachment replacement transfers ownership explicitly
every replaced attachment is retired exactly once
framebuffer completeness is checked before commit
failed allocation or incomplete framebuffer preserves the previous committed surface
telemetry and GameHost cite the committed surface revision
the first rendered frame acknowledges the same surface and attachment set
```

## Retirement rules

```txt
replacement records predecessor attachment identity
predecessor stays alive until new surface commit
rollback retires only candidate resources
successful commit retires predecessor resources exactly once
duplicate disposal is classified rather than silently repeated
secondary disposal failures are retained in the result
```
