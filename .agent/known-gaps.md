# Known Gaps — TheOpenAbove

**Timestamp:** `2026-07-08T03:21:22-04:00`

## Product / source authority gaps

```txt
README.md still describes free-flight carving, gliding, diving, boosting, thermals, wind gates, and sky-perch return.
package.json still describes free-flight exploration.
src/data/campaign.config.js still carries legacy bird/free-flight CAMPAIGN/WORLD/FLIGHT shape.
src/main.js imports CAMPAIGN and WORLD but owns the live balloon drift constants inline.
There is no canonical BALLOON_DRIFT config yet.
There is no product-copy source object proving balloon drift is canonical.
There is no source fingerprint/snapshot proving docs/config/runtime agreement.
```

## Gameplay authority gaps

```txt
Burner, vent, wind, altitude, and distance integration live inline in src/main.js.
No RouteObject descriptors exist for balloon route goals.
No AltitudeBand descriptors exist for low-clearance, buoyancy-gate, high-drift, or landing states.
No RouteEventResult envelope exists.
No route event rejection reason catalog exists.
No route event journal exists.
No mission state reducer exists for the current balloon route.
No progression snapshot exists for unlocking Cloud Basin from balloon route completion.
```

## Render / host gaps

```txt
Renderer creation, world generation, physics integration, camera, HUD, and GameHost exposure are all colocated in src/main.js.
Clouds, trees, lakes, terrain, and wind ribbons are generated as renderer-side loops instead of descriptor-backed domains.
HUD text is renderer/DOM-owned rather than projected from a mission snapshot.
GameHost exposes useful state but does not yet expose source fingerprint, route diagnostics, mission snapshot, or route fixture status.
```

## Kit gaps

```txt
The hot-air-balloon object family is split into useful files, but the runtime host, input, physics, wind field, altitude safety, route, mission, and progression domains are still inline or only ledger-planned.
There is no DOM-free fixture harness for balloon route replay.
There is no smoke proving product-copy/config/runtime parity.
```

## Validation gaps

```txt
No validation was run during this documentation-only pass.
No local npm install was performed.
No npm run check was performed.
No npm run build was performed.
No browser route check was performed.
No live GitHub Pages verification was performed.
```
