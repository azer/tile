import { CSS } from "@stitches/react";
import { MethodRegistrar, Chain } from "./types";
import { SelectionOptions, applySelection } from "./accessibility";

export type Methods = {
  color: (options: ColorOptions) => Chain;
  fg: (color: string) => Chain;
  bg: (options: BGOptions) => Chain;
  placeholder: (fg: string) => Chain;
  fill: (options: BGOptions) => Chain;
};

declare module "./types" {
  interface ChainMethods extends Methods {}
}

export function register(method: MethodRegistrar) {
  method("color", applyColor);
  method("fg", applyFg);
  method("bg", applyBg);
  method("fill", applyBg);
  method("placeholder", applyPlaceholder);
}

export interface ColorOptions {
  fg?: string;
  bg?: string | BGOptions;
  border?: string;
  caret?: string;
  placeholder?: string;
  selectionBg?: string;
  selectionFg?: string;
  outline?: string;
}

export type BGOptions =
  | {
      color?: string;
      url?: string;
      src?: string;
      base64?: string;
      size?: "cover" | "contain" | "auto";
      position?: string | [string, string];
      repeat?: "repeat" | "repeat-x" | "repeat-y" | "no-repeat";
    }
  | string;

function applyColor(input: CSS, options: ColorOptions): CSS {
  return applyColorOptions(input, options);
}

function applyFg(input: CSS, color: string): CSS {
  return applyColorOptions(input, { fg: color });
}

function applyBg(input: CSS, options: BGOptions): CSS {
  return applyBackgroundOptions(input, options);
}

function applyPlaceholder(input: CSS, fg: string): CSS {
  return applyColorOptions(input, { placeholder: fg });
}

function applyColorOptions(css: CSS, options: ColorOptions): CSS {
  let output = { ...css };
  const map = {
    fg: "color",
    bg: "backgroundColor",
    caret: "caretColor",
    border: "borderColor",
  };

  for (const key in options) {
    if (key in map) {
      output[map[key]] = options[key];
    } else {
      output[key] = options[key];
    }
  }

  if (options.placeholder) {
    output["&::placeholder"] = {
      color: options.placeholder,
    };
  }

  if (options.selectionBg || options.selectionFg) {
    output = applySelection(output, {
      fg: options.selectionFg,
      bg: options.selectionBg,
    });
  }

  if (typeof options.bg === "object") {
    Object.assign(output, applyBackgroundOptions({}, options.bg));
  }

  return output;
}

function applyBackgroundOptions(input: CSS, options: BGOptions): CSS {
  const output = { ...input };

  if (typeof options === "string") {
    output.background = options;
    return output;
  }

  if (options.color) {
    output.backgroundColor = options.color;
  }

  if (options.url) {
    output.backgroundImage = `url(${options.url})`;
  }

  if (options.src) {
    output.backgroundImage = options.src;
  }

  if (options.base64) {
    output.backgroundImage = `url(data:image/png;base64,${options.base64})`;
  }

  if (options.size) {
    output.backgroundSize = options.size;
  }
  if (options.position) {
    output.backgroundPosition = Array.isArray(options.position)
      ? options.position.join(" ")
      : options.position;
  }

  if (options.repeat) {
    output.backgroundRepeat = options.repeat;
  }

  return output;
}
