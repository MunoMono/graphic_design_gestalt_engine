import test from "node:test";
import assert from "node:assert/strict";
import { buildActiveBatchVariation } from "./batchVariations.js";
import { DEFAULT_MACHINE_STATE, createDefaultGestaltControls } from "./constants.js";

function activeState(colour = false) {
  const gestaltControls = createDefaultGestaltControls();
  gestaltControls.elements.shape.active = true;
  gestaltControls.elements.line.active = true;
  gestaltControls.elements.colour.active = colour;
  gestaltControls.principles.balance.active = true;
  return { ...DEFAULT_MACHINE_STATE, gestaltControls };
}

test("batch variations are deterministic, preserve selected elements, and leave the source untouched", () => {
  const state = activeState(true);
  const before = structuredClone(state);
  const first = buildActiveBatchVariation(state, 12345);

  assert.deepEqual(first, buildActiveBatchVariation(state, 12345));
  assert.deepEqual(state, before);
  assert.deepEqual(
    Object.fromEntries(Object.entries(first.gestaltControls.elements).map(([key, value]) => [key, value.active])),
    Object.fromEntries(Object.entries(state.gestaltControls.elements).map(([key, value]) => [key, value.active])),
  );
  assert.equal(first.seed, 12345);
  assert.equal(first.gestaltControls.principles[first.principle].active, true);
});

test("batch variations span a wide range of settings, principles, colour, and process", () => {
  const state = activeState(true);
  const variations = Array.from({ length: 60 }, (_, index) => buildActiveBatchVariation(state, index + 1));
  const values = (selector) => new Set(variations.map(selector));

  assert.ok(values((item) => item.principle).size >= 5);
  assert.ok(values((item) => item.process).size >= 5);
  assert.ok(values((item) => item.colourPreset).size >= 5);
  assert.ok(values((item) => item.gestaltControls.elements.shape.mode).size >= 2);
  assert.ok(variations.some((item) => Math.abs(item.gestaltControls.elements.shape.scale - 50) >= 40));
  assert.ok(variations.some((item) => Math.abs(item.gestaltControls.elements.shape.angle) >= 75));
  for (const item of variations) {
    assert.ok(Math.abs(item.gestaltControls.elements.shape.scale - 50) <= 50);
    assert.ok(Math.abs(item.gestaltControls.elements.shape.angle) <= 90);
    assert.ok(item.colourHue >= -180 && item.colourHue <= 180);
    assert.ok(item.colourSaturation >= 0 && item.colourSaturation <= 200);
  }
});

test("inactive colour and elements remain unchanged", () => {
  const state = activeState();
  const variation = buildActiveBatchVariation(state, 42);
  assert.deepEqual(variation.gestaltControls.elements.colour, state.gestaltControls.elements.colour);
  assert.deepEqual(variation.gestaltControls.elements.texture, state.gestaltControls.elements.texture);
  assert.equal(variation.colourPreset, state.colourPreset);
  assert.equal(variation.colourHue, state.colourHue);
  assert.equal(variation.backgroundColor, state.backgroundColor);
});
