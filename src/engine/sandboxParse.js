const VALUE_END = String.raw`(?:"|\d|true|false|null|\}|\])`;

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
