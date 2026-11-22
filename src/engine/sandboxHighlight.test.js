import test from "node:test";
import assert from "node:assert/strict";
import { highlightSandboxCode } from "./sandboxHighlight.js";

test("highlights element and principle names, settings, and values without changing the source", () => {
  const source = '{\n  "elements": { "shape": { "active": true, "scale": 50 } },\n  "principles": { "balance": { "mode": "radial" } }\n}';
  const result = highlightSandboxCode(source);
  assert.equal(result.map(({ text }) => text).join(""), source);
  for (const [text, type] of [
    ['"elements"', "element"], ['"shape"', "element"], ['"principles"', "principle"],
    ['"balance"', "principle"], ['"active"', "key"], ["true", "value"],
    ["50", "value"], ['"radial"', "string"],
  ]) {
    assert.ok(result.some((token) => token.text === text && token.type === type), text);
  }
});

test("keeps incomplete edits, escaped strings, and comments intact", () => {
  const source = '{\n // "shape": true\n shape: \'text\\\'s value\',\n "scale": -2.5e+3,\n "mode": "unfinished\n}';
  const result = highlightSandboxCode(source);
  assert.equal(result.map(({ text }) => text).join(""), source);
  assert.ok(result.some(({ text, type }) => text === '// "shape": true' && type === "comment"));
  assert.ok(result.some(({ text, type }) => text === "shape" && type === "element"));
  assert.ok(result.some(({ text, type }) => text === "-2.5e+3" && type === "value"));
  assert.ok(result.some(({ text, type }) => text === '"unfinished' && type === "string"));
});
