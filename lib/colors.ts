import { CSS } from "@stitches/react";
import { MethodRegistrar, Chain } from "./chain";

export type Methods = {
  color: (options: ColorOptions) => Chain;
  fg: (color: string) => Chain;
  bg: (options: BGOptions) => Chain;
  placeholder: (fg: string) => Chain;
  fill: (options: BGOptions) => Chain;
  selection: (bg: string, fg: string) => Chain;
};

export function register(method: MethodRegistrar) {
  method("color", applyColor);
  method("fg", applyFg);
  method("bg", applyBg);
  method("fill", applyBg);
  method("placeholder", applyPlaceholder);
  method("selection", applySelection);
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
      color: string;
      url?: string;
      src?: string;
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

function applySelection(input: CSS, bg: string, fg: string): CSS {
  return applyColorOptions(input, { selectionBg: bg, selectionFg: fg });
}

function applyColorOptions(css: CSS, options: ColorOptions): CSS {
  const output = { ...css };
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
    output["::selection"] = {
      ...(output["::selection"] as object),
      backgroundColor: options.selectionBg,
      color: options.selectionFg,
    };
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
