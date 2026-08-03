import { OPEN_ABOVE_RELEASE_IDENTITY } from "../release-identity.js";

const DIAGNOSTICS_PATH = "./nexusengine-build-diagnostics.json";

function fallbackDiagnostics() {
  return Object.freeze({
    schema: "open-above.release-diagnostics/1",
    status: "runtime-candidate",
    ...OPEN_ABOVE_RELEASE_IDENTITY,
    planId: null,
    target: "vite-development",
    sourceRecords: []
  });
}

async function readBuildDiagnostics() {
  try {
    const response = await fetch(DIAGNOSTICS_PATH, { cache: "no-store" });
    if (!response.ok) throw new Error(`Build diagnostics returned HTTP ${response.status}.`);
    const record = await response.json();
    return Object.freeze({
      ...record,
      engineCommit: record.engineSource?.commit ?? OPEN_ABOVE_RELEASE_IDENTITY.engineCommit,
      engineVersion: OPEN_ABOVE_RELEASE_IDENTITY.engineVersion
    });
  } catch {
    return fallbackDiagnostics();
  }
}

function createDialog() {
  const dialog = document.createElement("dialog");
  dialog.setAttribute("aria-label", "NexusEngine build diagnostics");
  dialog.style.cssText = "max-width:min(760px,92vw);max-height:82vh;padding:0;border:1px solid #60717a;background:#101820;color:#edf5f7;box-shadow:0 20px 70px #000a";
  const close = document.createElement("button");
  close.type = "button";
  close.textContent = "Close";
  close.style.cssText = "margin:12px;padding:8px 12px";
  const output = document.createElement("pre");
  output.style.cssText = "margin:0;padding:16px;overflow:auto;white-space:pre-wrap;overflow-wrap:anywhere;word-break:break-word;font:12px/1.5 ui-monospace,monospace";
  close.addEventListener("click", () => dialog.close());
  dialog.append(close, output);
  document.body.append(dialog);
  return { dialog, output };
}

export function installBuildDiagnostics(gameHost) {
  let diagnostics = fallbackDiagnostics();
  let ready = null;
  let view = null;

  function ensureDiagnostics() {
    ready ??= readBuildDiagnostics().then((record) => {
      diagnostics = record;
      return record;
    });
    return ready;
  }

  async function showBuildDiagnostics() {
    const record = await ensureDiagnostics();
    view ??= createDialog();
    view.output.textContent = JSON.stringify(record, null, 2);
    view.dialog.showModal();
    return record;
  }

  globalThis.addEventListener?.("keydown", (event) => {
    if (event.code === "F9") {
      event.preventDefault();
      void showBuildDiagnostics();
    }
  });

  if (new URLSearchParams(globalThis.location?.search ?? "").get("diagnostics") === "1") {
    void showBuildDiagnostics();
  }

  return Object.freeze({
    ...gameHost,
    getBuildDiagnostics: () => structuredClone(diagnostics),
    get buildDiagnosticsReady() { return ensureDiagnostics(); },
    showBuildDiagnostics
  });
}
