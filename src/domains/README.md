# The Open Above semantic domains

Each folder owns one game concept and may be changed independently.

- `journey`: session, region, map pause policy, frame progression, snapshots.
- `ballooning`: balloon object, controls, buoyancy, drift, terrain contact.
- `sky`: weather, layered weather, wind fields and airstreams.
- `land`: world configuration, terrain, water, ecology and landmarks.
- `navigation`: map state, routes, markers and destination awareness.
- `air-mail`: parcel, towns, delivery validation and completion.
- `experience`: camera, world presentation, balloon presentation and rendering.

Existing low-level kits remain implementation details behind these semantic boundaries. Scene files compose domains but do not implement their internal behavior.
