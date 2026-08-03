# Migration From Experiment

The historical NexusRealtime experiments supplied early flight, terrain,
atmosphere, camera, and world-scale evidence. This repository now owns the
product behavior directly.

## Final Disposition

```txt
authored balloon campaign and rendering  -> The Open Above
browser/Three.js adapters                -> The Open Above
universal runtime and world contracts    -> NexusEngine semantic Domains
build targets and package production     -> NexusEngine n:build
historical ProtoKit source               -> frozen lineage only
```

The disk world surface was extracted from ProtoKits commit
`dd8d68f5635a64f34043edd3ac757067a02eb43c` into a game-owned local module.
Runtime fetching from the retired repository has been removed.

This is a hard cutover. There is no `.nexus-engine` checkout, Vite source alias,
CDN import map, moving Engine branch, or compatibility forwarding layer.
