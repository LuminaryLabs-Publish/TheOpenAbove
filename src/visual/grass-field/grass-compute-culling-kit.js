export const GRASS_COMPUTE_CULLING_KIT_ID = "open-above-grass-compute-culling-kit";

export const GRASS_CULL_WGSL = `
struct Instance { position: vec4<f32>, meta: vec4<f32> };
struct Params { camera: vec4<f32>, maxDistance: f32, count: u32, _pad0: vec2<u32> };
@group(0) @binding(0) var<storage, read> instances: array<Instance>;
@group(0) @binding(1) var<storage, read_write> visible: array<u32>;
@group(0) @binding(2) var<uniform> params: Params;
@compute @workgroup_size(64)
fn main(@builtin(global_invocation_id) id: vec3<u32>) {
  let i = id.x;
  if (i >= params.count) { return; }
  let delta = instances[i].position.xyz - params.camera.xyz;
  visible[i] = select(0u, 1u, dot(delta, delta) <= params.maxDistance * params.maxDistance);
}`;

export function createGrassComputeCullingKit() {
  const state = {
    backend: typeof navigator !== "undefined" && navigator.gpu ? "webgpu-compute" : "cpu-chunk-culling",
    shader: GRASS_CULL_WGSL,
    dispatchedWorkgroups: 0
  };
  return {
    id: GRASS_COMPUTE_CULLING_KIT_ID,
    state,
    cullChunk(distance, maxDistance) {
      state.dispatchedWorkgroups += 1;
      return distance <= maxDistance;
    }
  };
}

window.OpenAboveGrassComputeCullingKit = { id: GRASS_COMPUTE_CULLING_KIT_ID, GRASS_CULL_WGSL, createGrassComputeCullingKit };
