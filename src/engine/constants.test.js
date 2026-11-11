import test from "node:test";
import assert from "node:assert/strict";
import { createDefaultGestaltControls, getActiveRenderableElementItems } from "./constants.js";

test("colour renders on its own and modifies other active elements without duplicating them", () => {
  const controls = createDefaultGestaltControls();
  assert.deepEqual(getActiveRenderableElementItems(controls), []);

  controls.elements.colour.active = true;
  assert.deepEqual(getActiveRenderableElementItems(controls).map((item) => item.key), ["colour"]);

  controls.elements.shape.active = true;
  assert.deepEqual(getActiveRenderableElementItems(controls).map((item) => item.key), ["shape"]);
});
