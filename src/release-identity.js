import {
  CORE_REGISTRY_SHA256,
  NEXUS_ENGINE_VERSION
} from "nexusengine";

export const NEXUS_ENGINE_CHANNEL = "main";
export const NEXUS_ENGINE_REGISTRY_HASH = CORE_REGISTRY_SHA256;
export const NEXUS_ENGINE_RELEASE_VERSION = NEXUS_ENGINE_VERSION;

export const OPEN_ABOVE_RELEASE_IDENTITY = Object.freeze({
  engineChannel: NEXUS_ENGINE_CHANNEL,
  engineCommit: null,
  engineVersion: NEXUS_ENGINE_RELEASE_VERSION,
  registryHash: NEXUS_ENGINE_REGISTRY_HASH
});
