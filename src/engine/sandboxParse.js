import { PROCESS_OPTIONS } from "./constants.js";
import { COLOUR_PRESET_OPTIONS } from "./colourPresets.js";

const VALUE_END = String.raw`(?:"|\d|true|false|null|\}|\])`;

const SANDBOX_OPTIONS = {
  process: PROCESS_OPTIONS,
  colourPreset: COLOUR_PRESET_OPTIONS,
};

export function formatSandboxOptions(state) {
  const formatted = { ...state };
  for (const [key, options] of Object.entries(SANDBOX_OPTIONS)) {
    if (Object.hasOwn(formatted, key)) {
      formatted[key] = options.find((option) => option.value === formatted[key])?.label ?? formatted[key];
    }
  }
  return formatted;
}

export function resolveSandboxOptions(state) {
  const resolved = { ...state };
  for (const [key, options] of Object.entries(SANDBOX_OPTIONS)) {
    if (!Object.hasOwn(resolved, key)) continue;
    const option = options.find(({ value, label }) => value === resolved[key] || label === resolved[key]);
    if (!option) {
      throw new Error(`Unknown ${key}: ${String(resolved[key])}. Choose one of: ${options.map(({ label }) => label).join(", ")}.`);
    }
    resolved[key] = option.value;
  }
  return resolved;
}

// Repairs common hand-editing slips: comments, missing/trailing commas, unquoted keys, single quotes.
export function repairSandboxJson(source) {
  return source
    .replace(/^\uFEFF/, "")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/(^|[^:"\\])\/\/.*$/gm, "$1")
    .replace(/'([^'"\\\n]*)'/g, '"$1"')
    .replace(/([{,]\s*)([A-Za-z_$][\w$]*)(\s*:)/g, '$1"$2"$3')
    .replace(new RegExp(`(${VALUE_END})(\\s*\\n\\s*)(?=["{\\[])`, "g"), "$1,$2")
    .replace(/,(\s*[}\]])/g, "$1");
}

function describeJsonError(source, error) {
  let position = Number(/position (\d+)/.exec(error.message)?.[1]);
  if (!Number.isFinite(position)) {
    // V8 sometimes reports `Unexpected token 'x', ..."<snippet>" is not valid JSON` without a position.
    const match = /Unexpected token '(.)', (?:\.\.\.)?"([\s\S]*?)"(?:\.\.\.)? is not valid JSON/.exec(error.message);
    const snippetStart = match ? source.indexOf(match[2]) : -1;
    if (snippetStart < 0) return error.message;
    position = snippetStart + match[2].indexOf(match[1]);
  }
  const lineNumber = source.slice(0, position).split("\n").length;
  const lines = source.split("\n");
  const current = lines[lineNumber - 1]?.trim();
  const hint = /Unexpected token '([A-Za-z])'/.test(error.message)
    ? " — text values need double quotes"
    : lineNumber > 1
      ? ` — check the line before: ${lines[lineNumber - 2]?.trim()}`
      : "";
  return `Line ${lineNumber}: ${current || "(blank)"}${hint}`;
}

export function parseSandboxCode(source) {
  try {
    return { value: JSON.parse(source), repaired: false };
  } catch (strictError) {
    const repairedSource = repairSandboxJson(source);
    try {
      return { value: JSON.parse(repairedSource), repaired: true };
    } catch {
      throw new Error(describeJsonError(source, strictError));
    }
  }
}
