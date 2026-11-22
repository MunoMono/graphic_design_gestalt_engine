import { ELEMENT_OPTIONS, PRINCIPLE_OPTIONS } from "./constants.js";

const elements = new Set(["element", "elements", ...ELEMENT_OPTIONS.map(({ value }) => value)]);
const principles = new Set(["principle", "principles", ...PRINCIPLE_OPTIONS.map(({ value }) => value)]);
const tokens = /"(?:\\[^\n]|[^"\\\n])*"?|'(?:\\[^\n]|[^'\\\n])*'?|\/\/[^\n]*|\/\*[\s\S]*?(?:\*\/|$)|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?|[A-Za-z_$][\w$]*/g;

export function highlightSandboxCode(code) {
  const result = [];
  let end = 0;

  for (const match of code.matchAll(tokens)) {
    const text = match[0];
    if (match.index > end) result.push({ text: code.slice(end, match.index) });

    const isKey = /^\s*:/.test(code.slice(match.index + text.length));
    const name = text.replace(/^["']|["']$/g, "");
    let type;
    if (text.startsWith("//") || text.startsWith("/*")) {
      type = "comment";
    } else if (isKey) {
      type = elements.has(name) ? "element" : principles.has(name) ? "principle" : "key";
    } else if (/^["']/.test(text)) {
      type = "string";
    } else if (/^(?:true|false|null)$/.test(text) || /^-?\d/.test(text)) {
      type = "value";
    }

    result.push({ text, type });
    end = match.index + text.length;
  }

  if (end < code.length) result.push({ text: code.slice(end) });
  return result;
}
