import { ALIGNMENT_MODE_OPTIONS, ELEMENT_OPTIONS, GESTALT_CONTROL_SECTIONS, PRINCIPLE_OPTIONS, PROCESS_OPTIONS } from "./constants.js";
import { COLOUR_PRESET_OPTIONS } from "./colourPresets.js";

const rootChoices = {
  element: { label: "Element", options: ELEMENT_OPTIONS },
  principle: { label: "Principle", options: PRINCIPLE_OPTIONS },
  alignmentMode: { label: "Alignment mode", options: ALIGNMENT_MODE_OPTIONS },
  process: { label: "Process", options: PROCESS_OPTIONS, useLabels: true },
  colourPreset: { label: "Colour preset", options: COLOUR_PRESET_OPTIONS, useLabels: true },
};

const tokenPattern = /"(?:\\[^\n]|[^"\\\n])*"|(?:'(?:\\[^\n]|[^'\\\n])*')|\/\/[^\n]*|\/\*[\s\S]*?(?:\*\/|$)|[{}[\]:,]|[A-Za-z_$][\w$]*|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g;

function getOptions(path) {
  if (path.length === 1 && Object.hasOwn(rootChoices, path[0])) {
    return rootChoices[path[0]];
  }
  if (path.length === 4 && path[0] === "gestaltControls") {
    const section = GESTALT_CONTROL_SECTIONS[path[1]];
    const control = section?.find(({ key }) => key === path[2]);
    if (control && path[3] === "active") {
      return {
        label: `${control.title} status`,
        options: [{ value: "false", label: "Inactive (false)" }, { value: "true", label: "Active (true)" }],
        boolean: true,
      };
    }
    if (path[3] === "mode" && control?.modeOptions) {
      return { label: `${control.title} mode`, options: control.modeOptions };
    }
  }
  return null;
}

export function getSandboxChoice(code, position) {
  const tokens = [...code.matchAll(tokenPattern)].filter(([text]) => !text.startsWith("//") && !text.startsWith("/*"));
  const stack = [];

  for (let index = 0; index < tokens.length; index += 1) {
    const token = tokens[index];
    const text = token[0];
    const frame = stack.at(-1);
    if (text === "{" || text === "[") {
      stack.push({ path: frame ? [...frame.path, frame.key] : [], key: null, keyStart: null, array: text === "[" });
    } else if (text === "}" || text === "]") {
      stack.pop();
    } else if (frame && !frame.array && tokens[index + 1]?.[0] === ":") {
      if (text.startsWith('"')) {
        try {
          frame.key = JSON.parse(text);
        } catch (error) {
          if (!(error instanceof SyntaxError)) throw error;
          frame.key = null;
        }
      } else {
        frame.key = text.startsWith("'") ? text.slice(1, -1) : text;
      }
      frame.keyStart = token.index;
    } else if (frame && !frame.array && frame.key && (text.startsWith('"') || text.startsWith("'") || text === "true" || text === "false")) {
      const definition = getOptions([...frame.path, frame.key]);
      const end = token.index + text.length;
      const isBoolean = text === "true" || text === "false";
      if (definition && Boolean(definition.boolean) === isBoolean && position >= frame.keyStart && position <= end) {
        let value;
        try {
          value = isBoolean ? text : text.startsWith('"') ? JSON.parse(text) : text.slice(1, -1);
        } catch (error) {
          if (!(error instanceof SyntaxError)) throw error;
          return null;
        }
        return { ...definition, start: token.index, end, value };
      }
      frame.key = null;
    }
  }
  return null;
}
