import test from "node:test";
import assert from "node:assert/strict";
import { parseSandboxCode } from "./sandboxParse.js";

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
  const source = "{\n  // tweak\n  chaos: 40,\n  'colourPreset': 'acidHouse',\n  \"backgroundColor\": \"#ff00aa\", /* hex */\n}";
  assert.deepEqual(parseSandboxCode(source).value, { chaos: 40, colourPreset: "acidHouse", backgroundColor: "#ff00aa" });
});

test("unrecoverable input reports the offending line", () => {
  assert.throws(() => parseSandboxCode('{\n  "chaos": 30,\n  "proof": white\n}'), /Line 3: "proof": white/);
});
