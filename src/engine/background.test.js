import test from "node:test";
import assert from "node:assert/strict";
import { getBackgroundFilenameSegment, getBackgroundProof, hexToHsv, hexToRgb, hsvToHex, normalizeBackground, rgbToHex } from "./background.js";

test("legacy proof backgrounds and filenames stay compatible", () => {
  assert.deepEqual(normalizeBackground({ proof: "white" }), { backgroundColor: "#f7f5ef", backgroundOpacity: 100 });
  assert.deepEqual(normalizeBackground({ proof: "black" }), { backgroundColor: "#050607", backgroundOpacity: 100 });
  assert.equal(getBackgroundFilenameSegment({ proof: "white" }), "white");
  assert.equal(getBackgroundFilenameSegment({ proof: "black" }), "black");
});

test("custom backgrounds preserve colour and opacity including zero", () => {
  assert.deepEqual(normalizeBackground({ backgroundColor: "#AABBCC", backgroundOpacity: 0 }), { backgroundColor: "#aabbcc", backgroundOpacity: 0 });
  assert.equal(getBackgroundFilenameSegment({ backgroundColor: "#0066ff", backgroundOpacity: 42 }), "bg-0066ff-opacity-42");
  assert.equal(getBackgroundFilenameSegment({ backgroundColor: "#f7f5ef", backgroundOpacity: 0 }), "bg-f7f5ef-opacity-0");
});

test("invalid background inputs report explicit errors", () => {
  for (const backgroundColor of ["red", "#fff", "#gggggg", 123]) {
    assert.throws(() => normalizeBackground({ backgroundColor }), /six-digit hex/);
  }
  for (const backgroundOpacity of [-1, 101, "bad", Infinity]) {
    assert.throws(() => normalizeBackground({ backgroundOpacity }), /between 0 and 100/);
  }
});

test("colour conversions round trip across the RGB range", () => {
  for (const red of [0, 51, 128, 255]) {
    for (const green of [0, 51, 128, 255]) {
      for (const blue of [0, 51, 128, 255]) {
        const hex = rgbToHex(red, green, blue);
        assert.deepEqual(hexToRgb(hex), [red, green, blue]);
        const hsv = hexToHsv(hex);
        assert.equal(hsvToHex(hsv.hue, hsv.saturation, hsv.value), hex);
      }
    }
  }
});

test("background brightness selects contrasting artwork", () => {
  assert.equal(getBackgroundProof("#ffffff"), "white");
  assert.equal(getBackgroundProof("#000000"), "black");
  assert.equal(getBackgroundProof("#0066ff"), "black");
  assert.equal(getBackgroundProof("#facc15"), "white");
});
