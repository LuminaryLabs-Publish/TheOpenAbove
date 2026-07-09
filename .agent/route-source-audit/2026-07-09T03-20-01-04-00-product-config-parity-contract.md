# Route Source Audit — Product Config Parity Contract

**Timestamp:** `2026-07-09T03-20-01-04-00`

## Source surfaces

```txt
README.md
  current stale role: free-flight product copy

package.json
  current stale role: free-flight package description

index.html
  current accurate role: Balloon Drift browser title and description

src/data/campaign.config.js
  current stale role: Meadow Lift thermal/gate/perch config and FLIGHT constants

src/main.js
  current accurate role: Balloon Drift runtime source of truth

src/hot-air-balloon-object-kit.js
  current accurate role: composed procedural hot-air-balloon object source

tests/smoke.mjs
  current partial role: confirms route/object kit markers but not source authority
```

## Required parity contracts

```txt
README route copy must identify Balloon Drift as the active route.
package description must identify hot-air-balloon drift instead of free-flight exploration.
campaign config must mark legacy FLIGHT as compatibility-only or introduce current Balloon Drift config.
src/main.js constants must be mirrored into pure source modules.
object-kit metadata must be included in SourceSnapshot.
smoke/check must execute a DOM-free source fixture.
GameHost must expose additive source readback.
```

## Proposed source module chain

```txt
src/source/open-above-product.js
  -> product id/title/summary/current route/control copy

src/source/balloon-drift.config.js
  -> burner, vent, wind, buoyancy, ceiling, camera, ground clearance defaults

src/source/altitude-bands.js
  -> ground clearance, low drift, cruising, high drift, soft ceiling labels

src/source/route-descriptors.js
  -> lift guide, wind lane, scenic drift, landing descriptors

src/source/wind-lane-hints.js
  -> deterministic source hints for fixture rows

src/source/source-manifest.js
  -> source files and consumers

src/source/source-fingerprint.js
  -> stable source markers

src/source/source-snapshot.js
  -> current route readback

src/source/source-acceptance.js
  -> accepted/rejected parity rows

src/source/source-readback-ledger.js
  -> complete source ledger

src/source/gamehost-source-readback.js
  -> additive browser projection
```

## Main finding

The route source should be made authoritative before any route copy or runtime constants are manually edited. That avoids replacing one mismatch with another and gives future implementation runs a deterministic source ledger.
