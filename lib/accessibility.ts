import { CSS } from "@stitches/react";
import { MethodRegistrar, Chain } from "./chain";

export type Methods = {
  selection: (options: SelectionOptions) => Chain;
};

declare module "./types" {
  interface ChainMethods extends Methods {}
}

export function register(method: MethodRegistrar) {
  method("selection", applySelection);
}

type UserSelectValue =
  | "none"
  | "auto"
  | "text"
  | "all"
  | "contain"
  | "element"
  | boolean;

export type SelectionOptions = {
  bg?: string;
  fg?: string;
  enabled?: boolean;
  userSelect?: UserSelectValue;
};

/**
 * Applies selection styles to the CSS object.
 *
 * @param css - The current CSS object
 * @param options - Selection options
 * @returns Updated CSS object with selection styles applied
 *
 * @example
 * applySelection({}, { bg: 'blue', fg: 'white', userSelect: 'none' })
 * // Output: { "::selection": { backgroundColor: 'blue', color: 'white' }, userSelect: 'none' }
 */
export function applySelection(
  css: CSS,
  options: SelectionOptions | boolean,
): CSS {
  const output = { ...css };

  if (options === false) {
    output.userSelect = "none";
    return output;
  }

  if (options === true) {
    output.userselect = "auto";
    return output;
  }

  if (options.bg || options.fg) {
    output["::selection"] = {
      ...(output["::selection"] as object),
      backgroundColor: options.bg,
      color: options.fg,
    };
  }

  if (options.enabled !== undefined) {
    output.userSelect = options.enabled ? "auto" : "none";
  }

  if (options.userSelect !== undefined) {
    output.userSelect =
      options.userSelect === true
        ? "auto"
        : options.userSelect === false
          ? "none"
          : options.userSelect;
  }

  return output;
}
