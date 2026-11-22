import test from "node:test";
import assert from "node:assert/strict";
import { formatSandboxOptions, parseSandboxCode, resolveSandboxOptions } from "./sandboxParse.js";
import { PROCESS_OPTIONS } from "./constants.js";
import { COLOUR_PRESET_OPTIONS } from "./colourPresets.js";

test("strict JSON parses unchanged", () => {
  assert.deepEqual(parseSandboxCode('{"chaos": 30}'), { value: { chaos: 30 }, repaired: false });
});

test("missing comma after an edited value is repaired", () => {
  const source = '{\n  "element": "line",\n  "chaos": 100\n  "proof": "white",\n  "nested": {\n    "a": 1\n  }\n  "seed": 5\n}';
  const { value, repaired } = parseSandboxCode(source);
  assert.equal(repaired, true);
  assert.deepEqual(value, { element: "line", chaos: 100, proof: "white", nested: { a: 1 }, seed: 5 });
});

test("trailing commas, comments, unquoted keys and single quotes are repaired", () => {
  const source = "{\n  // tweak\n  chaos: 40,\n  'colourPreset': 'waldi',\n  \"backgroundColor\": \"#ff00aa\", /* hex */\n}";
  assert.deepEqual(parseSandboxCode(source).value, { chaos: 40, colourPreset: "waldi", backgroundColor: "#ff00aa" });
});

test("unrecoverable input reports the offending line", () => {
  assert.throws(() => parseSandboxCode('{\n  "chaos": 30,\n  "proof": white\n}'), /Line 3: "proof": white/);
});

test("process and colour preset names round-trip and legacy values remain supported", () => {
  for (const [key, options] of [["process", PROCESS_OPTIONS], ["colourPreset", COLOUR_PRESET_OPTIONS]]) {
    for (const { value, label } of options) {
      assert.equal(formatSandboxOptions({ [key]: value })[key], label);
      assert.equal(resolveSandboxOptions({ [key]: label })[key], value);
      assert.equal(resolveSandboxOptions({ [key]: value })[key], value);
    }
  }
  assert.deepEqual(resolveSandboxOptions({ chaos: 30 }), { chaos: 30 });
});

test("unknown process and colour preset names produce actionable errors", () => {
  assert.throws(() => resolveSandboxOptions({ process: "Chromatic Offest" }), /Unknown process: Chromatic Offest.*Chromatic Offset/);
  assert.throws(() => resolveSandboxOptions({ colourPreset: "Graphic Punkk" }), /Unknown colourPreset: Graphic Punkk.*Graphic Punk/);
});
