# Render Audit: Visual HUD and Live-Region Frame Gap

**Timestamp:** `2026-07-12T07-00-48-04-00`

## Current render path

```txt
visual.render(dt, frameMs)
  -> updateHud()
     -> serialize parcel, route, capture, heat, trim, camera and altitude
     -> replace #hud.innerHTML
  -> request next RAF
```

`#hud` is also `aria-live="polite"`. The render projection therefore mutates the assistive status surface as part of every successful visual frame.

## Gap

```txt
visual frame revision: absent
HUD projection revision: absent
semantic status revision: absent
announcement revision: absent
live-region commit result: absent
visible-frame/accessibility acknowledgement: absent
```

The canvas may be visually current while assistive output is queued, coalesced or stale. Conversely, a live-region mutation can occur after the frame render but before the next frame without any provenance identifying the canvas state that the text describes.

## Required separation

```txt
canvas frame
  -> visual HUD projection
  -> non-live telemetry nodes

semantic event
  -> announcement admission
  -> dedicated live region
  -> announcement result
```

## Required render receipt

```js
{
  frameId,
  runtimeSessionId,
  missionRevision,
  observationRevision,
  hudProjectionRevision,
  announcementRevision: null | string,
  canvasCommitted: true,
  hudCommitted: true,
  accessibleStatusCommitted: true | false
}
```

## Invariants

```txt
per-frame telemetry does not create live-region mutations
HUD DOM updates are field-level rather than full subtree replacement
announcement text cites a committed mission/status revision
a visible-frame receipt can identify the announcement revision it presents
fatal projection cannot leave the canvas, HUD and alert on unrelated terminal states
```

## Required proof

```txt
steady flight updates canvas and visual HUD without live-region churn
route capture produces one semantic announcement tied to a committed frame
mail delivery produces one durable announcement tied to the delivery event
30, 60 and 120 Hz produce equivalent announcement receipts
fatal projection records one terminal frame/alert relationship
```