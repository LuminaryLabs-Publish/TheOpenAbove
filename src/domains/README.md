# The Open Above semantic domains

Each folder owns one game concept and may be changed independently.

- `journey`: session, region, map pause policy, frame progression, snapshots.
- `ballooning`: balloon object, controls, buoyancy, drift, terrain contact.
- `sky`: weather, layered weather, wind fields and airstreams.
- `land`: world configuration, terrain, water, ecology and landmark identity.
- `navigation`: sightseeing map, Snap Point search regions, routes and reference cards.
- `image-capture`: camera mode, zoom, shutter requests, landmark recognition, photo scores and journal records.
- `experience`: physical camera, world presentation, balloon presentation and rendering.

`air-mail` is retired from the active Meadow Lift composition. Its files remain only as migration history until repository cleanup removes the obsolete implementation.

Existing low-level kits remain implementation details behind these semantic boundaries. Scene files compose domains but do not implement their internal behavior.
