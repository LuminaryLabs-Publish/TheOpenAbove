# Wind Trails

The Open Above renders exactly seven wind trails around the balloon. They replace the former 3,200-point CPU wind field without changing the airstream simulation, authored routes, balloon forces, or wind-relative steering.

## Authority

- `src/runtime/airstream-domain/` owns wind velocity, route influence, capture state, and gameplay sampling.
- `airstream-trail-proto-kit.js` consumes the read-only `queryFlow(position, elapsed)` contract and produces numeric descriptors. It never mutates the Airstream Domain and imports no renderer.
- `src/visual/airstream-trails/` owns ribbon geometry, shaders, GPU buffers, drawing, morphing, and disposal.
- `meadow-lift-scene.js` owns the exact count, world seed, lifecycle order, and game-specific presentation policy.

## Descriptor contract

Each descriptor contains a stable ID, placement band, local centerline points, width, flow speed, intensity, phase, RGB color, and opacity. High, medium, and low quality use 64, 48, and 32 points per trail respectively; every tier keeps seven trails and one combined draw.

## Lifecycle

The composition root creates the presentation after the renderer and Airstream Domain exist. It mounts the first curves from the initial balloon state before the first playable frame, updates time and the player-relative group from the existing journey loop, and disposes GPU resources before disposing the renderer.

Mount and disposal are idempotent. The system creates no animation loop, worker, scheduler, asset registry, or secondary wind state.

The game-facing lifecycle is intentionally small:

```js
trails.mount({ position, elapsed, sample });
trails.update(position, elapsed, sample, fieldRevision);
trails.dispose();
```

## Regeneration

Geometry is static during normal frames. Curves regenerate only when the player moves beyond the anchor radius, the active route or capture state changes, wind direction or speed changes materially, or an optional future field revision changes. Revisions are rate-limited and morph between old and new centerlines in one draw.

Normal frames update only the presentation transform and shader uniforms. They do not iterate centerline points, run CPU noise, allocate arrays, or upload geometry.

## GPU resources

The Three.js adapter owns one `BufferGeometry`, one `ShaderMaterial`, one `Mesh`, and their disposal. All seven indexed ribbons share the same geometry and material. Camera-facing extrusion, continuous internal flow, waves, edge softening, endpoint fading, distance fading, and camera-proximity dissolve run in shaders. The shader keeps a visible ribbon body at every point along the centerline; moving light gradients communicate speed without fragmenting the trail into particle-like dashes.

## Performance contract

- Seven trails.
- One mesh, one material, one draw call.
- Zero stable-frame geometry uploads.
- Zero independent animation loops.
- Revision-only centerline generation and buffer uploads.
- Frustum culling remains enabled with shader displacement included in the bounds.

The source and lifecycle tests enforce this contract and also prove that presentation queries cannot change Airstream Domain state.

## Backend replacement and Nexus promotion

The renderer-neutral ProtoKit accepts a `sampleFlow(position, elapsed)` function and returns plain numeric descriptors. A future Three.js, WebGPU, native, Unity, ocean-current, smoke-channel, or racing-line adapter can consume the same meaning without changing the flow owner.

Promotion into Nexus Engine is intentionally deferred until this implementation is measured in The Open Above and a credible second consumer proves the boundary. The game's trail count, placement, palette, and art direction remain game-owned after any promotion.

## Removed implementation

`src/domains/sky/wind-particle-field-kit.js` and all of its creation, frame update, snapshot, disposal, test, and host references were removed. No disabled legacy fallback remains.
