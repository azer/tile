import { CSS } from "@stitches/react";

import { Chain, MethodRegistrar } from "./types";
import { applyAlign, StackAlignment } from "./align";

export type Methods = {
  appear: (value: Appearance | "none") => Chain;
  box: (options: BoxOptions) => Chain;
  content: (value: string) => Chain;
  frame: (options: BoxOptions) => Chain;
  display: (display: string, options?: BoxOptions) => Chain;
  absolute: (
    xOrOptions?: string | number | BoxOptions,
    yOrOptions?: string | number | BoxOptions,
    options?: BoxOptions,
  ) => Chain;
  position: (
    xOrOptions: string | number | BoxOptions,
    yOrOptions?: string | number | BoxOptions,
    options?: BoxOptions,
  ) => Chain;
  pin: (
    xOrOptions?: string | number | BoxOptions,
    yOrOptions?: string | number | BoxOptions,
    options?: BoxOptions,
  ) => Chain;
  relative: (
    xOrOptions?: string | number | BoxOptions,
    yOrOptions?: string | number | BoxOptions,
    options?: BoxOptions,
  ) => Chain;
  opacity: (value: number | string) => Chain;
  zIndex: (value: number) => Chain;
};

declare module "./types" {
  interface ChainMethods extends Methods {}
}

export function register(method: MethodRegistrar) {
  method("box", applyBoxOptions);
  method("frame", applyFrame);
  method("display", applyDisplay);
  method("absolute", applyAbsolute);
  method("position", applyPosition);
  method("pin", applyPin);
  method("relative", applyRelative);
  method("opacity", applyOpacity);
  method("zIndex", applyZIndex);
  method("content", applyContent);
  method("appear", applyAppearance);
}

export interface BoxOptions {
  width?: string | number;
  height?: string | number;
  maxWidth?: string | number;
  maxHeight?: string | number;
  minWidth?: string | number;
  minHeight?: string | number;
  top?: string | number;
  right?: string | number;
  bottom?: string | number;
  left?: string | number;
  x?: string | number;
  y?: string | number;
  position?: "static" | "relative" | "absolute" | "fixed" | "sticky";
  flexDir?: "row" | "column" | "row-reverse" | "column-reverse";
  justify?: "start" | "end" | "center" | "between" | "around" | "evenly";
  items?: "start" | "end" | "center" | "baseline" | "stretch";
  aspect?: string | number;
  display?:
    | "flex"
    | "grid"
    | "inline-flex"
    | "inline-grid"
    | "block"
    | "inline"
    | "none"
    | string;
  align?:
    | StackAlignment
    | [StackAlignment, StackAlignment]
    | { horizontal?: StackAlignment; vertical?: StackAlignment };
  placeSelf?: string;
  alignSelf?: string;
  opacity?: number | string;
  zIndex?: number;
  content?: string;
}

export enum Appearance {
  None = "none",
  Auto = "auto",
  MenuList = "menulist",
  TextField = "textfield",
  Button = "button",
  SearchField = "searchfield",
  Textarea = "textarea",
}

/**
 * Applies frame styling options to the CSS object, centering content by default.
 *
 * @param input - The current CSS object
 * @param options - Frame styling options to be applied
 * @returns Updated CSS object with frame styles applied
 */
function applyFrame(input: CSS, options: BoxOptions): CSS {
  const defaultFrameOptions: BoxOptions = {
    display: "flex",
    justify: "center",
    items: "center",
  };

  return applyBoxOptions(input, { ...defaultFrameOptions, ...options });
}

/**
 * Applies box styling options to the CSS object.
 *
 * @param input - The current CSS object
 * @param options - Box styling options to be applied
 * @returns Updated CSS object with box styles applied
 *
 * @example
 * // Input:
 * applyBoxOptions({}, { width: '100px', height: '100px', backgroundColor: 'red' })
 * // Output:
 * { width: '100px', height: '100px', backgroundColor: 'red' }
 */
export function applyBoxOptions(input: CSS, options: BoxOptions) {
  let css = { ...input } as CSS;

  const map = {
    justify: "justifyContent",
    items: "alignItems",
    flexDir: "flexDirection",
    x: "left",
    y: "top",
    aspect: "aspectRatio",
  };

  for (const key in options) {
    if (key in map) {
      // @ts-ignore
      css[map[key]] = options[key];
    } else {
      css[key] = options[key];
    }
  }

  if (options.align) {
    css = applyAlign(css, options.align);
  }

  if (options.opacity) {
    css = applyOpacity(css, options.opacity);
  }

  if (options.zIndex) {
    css = applyZIndex(css, options.zIndex);
  }

  if (options.content !== undefined) {
    css.content = options.content;
  }

  return css;
}

/**
 * Applies display property and additional box options to the CSS object.
 *
 * @param input - The current CSS object
 * @param display - The display value to be applied
 * @param options - Additional box options to be applied
 * @returns Updated CSS object with display and box styles applied
 *
 * @example
 * // Input:
 * applyDisplay({}, 'flex', { justifyContent: 'center' })
 * // Output:
 * { display: 'flex', justifyContent: 'center' }
 */
function applyDisplay(
  input: CSS,
  display: string,
  options: BoxOptions = {},
): CSS {
  return applyBoxOptions(input, { display, ...options });
}

/**
 * Applies absolute positioning to the CSS object.
 *
 * @param input - The current CSS object
 * @param xOrOptions - X-coordinate or BoxOptions object
 * @param y - Y-coordinate (optional if xOrOptions is an object)
 * @param options - Additional box options to be applied
 * @returns Updated CSS object with absolute positioning applied
 *
 * @example
 * // Input:
 * applyAbsolute({}, 10, 20)
 * // Output:
 * { position: 'absolute', left: 10, top: 20 }
 *
 * @example
 * // Input:
 * applyAbsolute({}, { left: '10px', top: '20px', width: '100px' })
 * // Output:
 * { position: 'absolute', left: '10px', top: '20px', width: '100px' }
 */
function applyAbsolute(
  input: CSS,
  xOrOptions: string | number | BoxOptions,
  yOrOptions?: string | number | BoxOptions,
  options?: BoxOptions,
): CSS {
  if (arguments.length === 1) {
    return applyBoxOptions(input, { position: "absolute" });
  }

  if (typeof xOrOptions === "object") {
    return applyBoxOptions(input, { position: "absolute", ...xOrOptions });
  }

  if (typeof yOrOptions === "object") {
    return applyBoxOptions(input, {
      position: "absolute",
      x: xOrOptions,
      ...yOrOptions,
    });
  }

  return applyBoxOptions(input, {
    position: "absolute",
    x: xOrOptions,
    y: yOrOptions,
    ...options,
  });
}

/**
 * Applies absolute positioning to the CSS object.
 *
 * @param input - The current CSS object
 * @param x - X-coordinate
 * @param y - Y-coordinate
 * @param options - Additional box options to be applied
 * @returns Updated CSS object with absolute positioning applied
 *
 * @example
 * // Input:
 * applyPosition({}, 10, 20)
 * // Output:
 * { position: 'absolute', left: 10, top: 20 }
 */
function applyPosition(
  input: CSS,
  xOrOptions: string | number | BoxOptions,
  yOrOptions?: string | number | BoxOptions,
  options?: BoxOptions,
): CSS {
  return applyAbsolute(input, xOrOptions, yOrOptions, options);
}

/**
 * Applies fixed positioning to the CSS object.
 *
 * @param input - The current CSS object
 * @param xOrOptions - X-coordinate or BoxOptions object
 * @param y - Y-coordinate (optional if xOrOptions is an object)
 * @param options - Additional box options to be applied
 * @returns Updated CSS object with fixed positioning applied
 *
 * @example
 * // Input:
 * applyPin({}, 10, 20)
 * // Output:
 * { position: 'fixed', left: 10, top: 20 }
 *
 * @example
 * // Input:
 * applyPin({}, { right: '10px', bottom: '20px', width: '100px' })
 * // Output:
 * { position: 'fixed', right: '10px', bottom: '20px', width: '100px' }
 */
function applyPin(
  input: CSS,
  xOrOptions: string | number | BoxOptions,
  yOrOptions?: string | number | BoxOptions,
  options?: BoxOptions,
): CSS {
  if (arguments.length === 1) {
    return applyBoxOptions(input, { position: "fixed" });
  }

  let css = applyAbsolute(input, xOrOptions, yOrOptions, options);
  return applyBoxOptions(css, { position: "fixed" });
}

/**
 * Applies relative positioning to the CSS object.
 *
 * @param input - The current CSS object
 * @param options - Box options to be applied
 * @returns Updated CSS object with relative positioning applied
 *
 * @example
 * // Input:
 * applyRelative({}, { top: '10px', left: '20px' })
 * // Output:
 * { position: 'relative', top: '10px', left: '20px' }
 */
function applyRelative(
  input: CSS,
  xOrOptions: string | number | BoxOptions,
  yOrOptions?: string | number | BoxOptions,
  options?: BoxOptions,
): CSS {
  if (arguments.length === 1) {
    return applyBoxOptions(input, { position: "relative" });
  }

  let css = applyAbsolute(input, xOrOptions, yOrOptions, options);
  return applyBoxOptions(css, { position: "relative" });
}

/**
 * Applies opacity to the CSS object.
 *
 * @param css - The current CSS object
 * @param value - Opacity value (0 to 1)
 * @returns Updated CSS object with opacity applied
 *
 * @example
 * // Input:
 * applyOpacity({}, 0.5)
 * // Output:
 * { opacity: 0.5 }
 */
function applyOpacity(css: CSS, value: number | string): CSS {
  return {
    ...css,
    opacity: value,
  };
}

// Add this new function
/**
 * Applies z-index to the CSS object.
 *
 * @param css - The current CSS object
 * @param value - z-index value
 * @returns Updated CSS object with z-index applied
 *
 * @example
 * // Input:
 * applyZIndex({}, 10)
 * // Output:
 * { zIndex: 10 }
 */
function applyZIndex(css: CSS, value: number): CSS {
  return {
    ...css,
    zIndex: value,
  };
}

/**
 * Applies content to the CSS object.
 *
 * @param css - The current CSS object
 * @param value - Content value
 * @returns Updated CSS object with content applied
 *
 * @example
 * // Input:
 * applyContent({}, '"→"')
 * // Output:
 * { content: '"→"' }
 */
function applyContent(css: CSS, value: string): CSS {
  return {
    ...css,
    content: value,
  };
}

/**
 * Applies appearance styles to control how element is rendered by browser.
 * Handles vendor prefixes automatically.
 *
 * @param css - The current CSS object
 * @param value - Appearance value or 'none'
 * @returns Updated CSS object with appearance styles applied
 *
 * @example
 * // Reset native styling
 * applyAppearance({}, 'none')
 * // Output: { appearance: 'none', WebkitAppearance: 'none', MozAppearance: 'none' }
 *
 * @example
 * // Use system search styling
 * applyAppearance({}, Appearance.SearchField)
 * // Output: { appearance: 'searchfield', WebkitAppearance: 'searchfield' ... }
 */
function applyAppearance(css: CSS, value: Appearance | "none"): CSS {
  return {
    ...css,
    appearance: value,
    WebkitAppearance: value,
    MozAppearance: value,
  };
}
