import p5 from "p5";
import { DEFAULT_MACHINE_STATE, createDefaultGestaltControls } from "../src/engine/constants.js";
import { createGestaltEngine } from "../src/engine/gestaltRuntime.js";

export async function runPreviewPerformanceAudit() {
  const mount = document.createElement("div");
  document.body.appendChild(mount);
  const originalRedraw = p5.prototype.redraw;
  const originalToBlob = HTMLCanvasElement.prototype.toBlob;
  const originalClick = HTMLAnchorElement.prototype.click;
  let redraws = 0;
  let exportedBlob;
  p5.prototype.redraw = function (...args) {
    if (this.canvas?.parentElement === mount) redraws += 1;
    return originalRedraw.apply(this, args);
  };
  const failures = [];
  let checks = 0;
  const check = (condition, label) => {
    checks += 1;
    if (!condition) failures.push(label);
  };
  let engine;
  try {
    engine = createGestaltEngine(mount, { initialState: DEFAULT_MACHINE_STATE });
    const state = await engine.ready;
    const canvas = mount.querySelector("canvas");
    check(canvas.width === state.width && canvas.height === state.height, "Preview uses density 1");

    redraws = 0;
    const exportState = engine.updateGestaltEngine({ ...state, scale: 2, dpi: 300 });
    check(redraws === 0, "Export settings do not redraw the preview");
    check(exportState.exportWidth === state.baseWidth * 2 && exportState.dpi === 300, "Export settings remain updated");

    const controls = createDefaultGestaltControls();
    controls.elements.shape.active = true;
    const activeState = engine.updateGestaltEngine({ ...exportState, gestaltControls: controls });
    check(redraws === 1, "Artwork changes redraw once");

    redraws = 0;
    const resizedState = engine.updateGestaltEngine({ ...activeState, format: "square" });
    check(redraws === 1, "Canvas resize redraws once");
    check(canvas.width === resizedState.width && canvas.height === resizedState.height, "Resized preview keeps density 1");

    redraws = 0;
    engine.renderGestaltComposition();
    check(redraws === 1, "Explicit rendering still redraws");

    HTMLAnchorElement.prototype.click = function () {};
    HTMLCanvasElement.prototype.toBlob = function (callback, ...args) {
      return originalToBlob.call(this, (blob) => {
        exportedBlob = blob;
        callback(blob);
      }, ...args);
    };
    await engine.exportPng({ ...resizedState, format: "custom", customWidth: 120, customHeight: 80, scale: 2 });
    const image = await createImageBitmap(exportedBlob);
    check(image.width === 240 && image.height === 160, "PNG retains selected export dimensions");
    image.close();
  } finally {
    engine?.destroy();
    p5.prototype.redraw = originalRedraw;
    HTMLCanvasElement.prototype.toBlob = originalToBlob;
    HTMLAnchorElement.prototype.click = originalClick;
    mount.remove();
  }
  return { checks, failures };
}
