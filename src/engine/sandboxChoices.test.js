import test from "node:test";
import assert from "node:assert/strict";
import { getSandboxChoice } from "./sandboxChoices.js";

test("finds the choices for the selected control, not other mode fields", () => {
  const source = '{\n  "gestaltControls": {\n    "elements": {\n      "line": { "mode": "mixed" },\n      "shape": { "mode": "mixed" },\n      "space": { "mode": "mixed" }\n    },\n    "principles": { "rhythm": { "mode": "regular" } }\n  }\n}';
  const line = getSandboxChoice(source, source.indexOf('"mode"'));
  assert.equal(line.label, "Line mode");
  assert.deepEqual(line.options.map(({ value }) => value), ["mixed", "actual", "implied"]);
  const shape = getSandboxChoice(source, source.indexOf('"mixed"', line.end));
  assert.equal(shape.label, "Shape mode");
  assert.deepEqual(shape.options.map(({ value }) => value), ["mixed", "organic", "geometric"]);
  assert.equal(getSandboxChoice(source, source.lastIndexOf('"mixed"')), null);
  assert.equal(getSandboxChoice(source, source.indexOf('"regular"')).label, "Rhythm mode");
});

test("supports root choices and ignores comments, unrelated strings, and incomplete input", () => {
  const source = '{\n // "process": "Clean"\n "process": "Chromatic Offset",\n "colourPreset": "Graphic Punk",\n "backgroundColor": "#123456",\n "mode": "mixed"\n}';
  assert.equal(getSandboxChoice(source, source.indexOf('"Clean"')), null);
  assert.equal(getSandboxChoice(source, source.indexOf('"Chromatic Offset"')).value, "Chromatic Offset");
  assert.equal(getSandboxChoice(source, source.indexOf('"Graphic Punk"')).label, "Colour preset");
  assert.equal(getSandboxChoice(source, source.indexOf('"#123456"')), null);
  assert.equal(getSandboxChoice(source, source.lastIndexOf('"mixed"')), null);
  assert.equal(getSandboxChoice('{"process": "unclosed', 15), null);
});

test("works with repaired-style keys, comments and single-quoted strings", () => {
  const source = "{ gestaltControls: { elements: { line: { /* comment */ mode: 'actual' } } } }";
  const choice = getSandboxChoice(source, source.indexOf("'actual'") + 2);
  assert.equal(choice.label, "Line mode");
  assert.equal(source.slice(choice.start, choice.end), "'actual'");
});

test("finds true and false activation choices for the selected element or principle", () => {
  const source = '{"gestaltControls":{"elements":{"line":{"active":false}},"principles":{"unityHarmony":{"active":true}}}}';
  const line = getSandboxChoice(source, source.indexOf("false") + 2);
  assert.equal(line.label, "Line status");
  assert.equal(line.value, "false");
  assert.equal(line.boolean, true);
  assert.deepEqual(line.options.map(({ value }) => value), ["false", "true"]);
  const principle = getSandboxChoice(source, source.indexOf("true") + 2);
  assert.equal(principle.label, "Unity/Harmony status");
  assert.equal(principle.value, "true");
  assert.equal(getSandboxChoice('{"active": false}', 12), null);
});
